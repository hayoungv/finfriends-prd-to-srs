---
name: 301-prisma-supabase-rules
description: Prisma + Supabase PostgreSQL 스키마·마이그레이션·커넥션 규칙. prisma/ 및 services/ 작업 시 사용.
---

# Prisma + Supabase PostgreSQL

## 커넥션 (서버리스 필수)

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")   // pgbouncer, port 6543 — 런타임
  directUrl = env("DIRECT_URL")     // 직접 연결, port 5432 — 마이그레이션
}
```

`PrismaClient` 는 `lib/prisma.ts` 의 **글로벌 싱글톤**만 쓴다. 서버리스에서 요청마다 새 인스턴스를 만들면 무료 티어 커넥션이 즉시 고갈된다.

```ts
// lib/prisma.ts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 네이밍

- 모델은 `PascalCase`, 테이블은 `snake_case` — `@@map("star_ledger_entries")`
- 필드는 `camelCase`, 컬럼은 `snake_case` — `@map("balance_after")`
- PK 는 UUID. 금액·별 수량은 `Int` (부동소수점 금지).

## 제약조건은 애플리케이션이 아니라 DB 에

멱등성과 정합성을 코드로만 지키지 않는다. **DB 제약으로 강제**한다.

```prisma
model StarLedgerEntry {
  idempotencyKey String @unique @map("idempotency_key")
  @@index([childId, createdAt])
  @@map("star_ledger_entries")
}
```

- `star_ledger_entries.idempotency_key` UNIQUE
- `practice_credits.idempotency_key` UNIQUE
- 아동↔보호자 FK 는 `onDelete: Cascade`

## 트랜잭션

동시 쓰기가 있는 경로는 `prisma.$transaction` + **행 잠금**을 쓴다. 읽고-계산하고-쓰는 사이에 다른 요청이 끼어들면 잔액이 깨진다.

```ts
await prisma.$transaction(async (tx) => {
  const [row] = await tx.$queryRaw`SELECT balance FROM star_balances WHERE child_id = ${childId} FOR UPDATE`
  // ...
})
```

## 마이그레이션

- `npx prisma migrate dev --name <설명>` — 로컬
- 커밋 전 `npx prisma format && npx prisma validate && npx prisma generate`
- 생성된 SQL 을 **읽고 커밋한다.** 파괴적 변경(DROP COLUMN)이 섞이면 중단하고 보고한다.

## 좌표 컬럼 금지 (REG-002)

`latitude` · `longitude` · `geo*` 컬럼을 추가하지 않는다. 정적 스캔이 스키마도 검사한다.
