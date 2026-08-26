---
name: 303-star-ledger-idempotency-rules
description: 별 원장 멱등 지급/차감 엔진 구현 규칙 (REG-005). services/ledger.service.ts 및 별 지급 경로 작업 시 필수.
---

# 별 원장 — 멱등성과 불변식 (REG-005)

> 이 프로젝트에서 **가장 깨지기 쉽고 가장 비싼** 부분이다. 규제 검증 항목이며 Alpha Gate 통과 조건이다.

## 불변식

```
balance_after(n) = balance_after(n-1) + delta(n)      오차 0건
동일 idempotency_key → 원장 1건 이하
잔액 = 원장 delta 합계                                항상
```

## 유일한 진입점

별 증감은 **`services/ledger.service.ts` 의 `grantStar` / `deductStar` 만** 수행한다.
`prisma.starLedgerEntry.create()` 를 다른 파일에서 호출하면 리뷰에서 반려한다.

```ts
export async function grantStar(
  childId: string, delta: number, triggerCode: TriggerCode,
  sourceId: string, idempotencyKey: string,
) {
  // 1) 멱등 조회 — 이미 처리됐으면 기존 결과를 그대로 반환
  const existing = await prisma.starLedgerEntry.findUnique({ where: { idempotencyKey } })
  if (existing) return existing

  // 2) 트랜잭션 + 행 잠금
  return prisma.$transaction(async (tx) => {
    const [bal] = await tx.$queryRaw<{ balance: number }[]>`
      SELECT balance FROM star_balances WHERE child_id = ${childId}::uuid FOR UPDATE`

    const next = bal.balance + delta
    if (next < 0) throw new InsufficientStarError()   // 차감 시 음수 거부

    const entry = await tx.starLedgerEntry.create({
      data: { childId, delta, triggerCode, sourceId, idempotencyKey, balanceAfter: next },
    })
    await tx.starBalance.update({ where: { childId }, data: { balance: next } })
    return entry
  })
}
```

## 반드시 지킬 것 (TDS §15.2.1)

- 동일 `idempotency_key` 에 원장 **1건 이하**
- 잔액과 ledger 합계 **일치**
- 차감 시 **음수 거부** — 차감하지 않고 실패 반환
- 부분 성공 시 **전체 rollback**
- 재시도 가능한 API — 같은 키로 다시 불러도 안전

## 경쟁 조건

`findUnique` 통과 후 `create` 사이에 동시 요청이 끼어들 수 있다. **DB UNIQUE 제약이 최종 방어선**이다.
`P2002` 를 잡아 기존 행을 조회해 반환한다 — 에러로 올리지 않는다.

## 트리거 (TDS §15.1)

- 자동 7종은 즉시 지급, **미션(트리거 4)만 보호자 승인 후** 지급.
- 출석·학습 별은 원장에 기록하되 **WPA 분자에 산입하지 않는다** (ADR-008).
- 주기가 초기화돼도 **별 잔액은 유지**한다.

## 금지

- 별 → 현금/저금통 전환 함수·필드 (REG-005c)
- 원장 행 UPDATE·DELETE — append-only
- `balanceAfter` 를 클라이언트 입력으로 받기
- 트랜잭션·잠금 없는 read-modify-write

## 검증

```bash
npm run test tests/unit/ledger.test.ts
```
동일 키 **5회 동시 호출 → 지급 1회**가 통과 기준이다.
