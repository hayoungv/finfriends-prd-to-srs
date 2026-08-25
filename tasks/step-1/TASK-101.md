---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-101] [STEP-1] Prisma Schema 및 Supabase PostgreSQL 마이그레이션 정의"
labels: ["enhancement", "ai-ready", "step-1", "database"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-101`
- **관련 SRS 요구사항:** `SRS §10`, `REQ-NF-012`, `REQ-NF-013`, `REG-005`
- **단계 (Step):** Step 1 (Contract & Data)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
핀프렌즈의 핵심 데이터 구조(보호자/아동 계정, 별 원장, 성장 나무 상태, 소비 계획 카드, 회고 내역 등)를 PostgreSQL에 정의하고, Prisma ORM 스키마(`schema.prisma`)로 1:1 매핑하여 안전한 타입 안전성과 무결성 제약을 구축합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `prisma/schema.prisma`
- `[NEW]` `prisma/migrations/0_init/migration.sql`
- `[NEW]` `lib/prisma.ts` (PrismaClient 글로벌 싱글톤 인스턴스)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **테이블 및 모델 정의 (11개 모델):**
   - `ParentAccount` (`parent_accounts`): `parentId`(UUID PK), `authSubject`(UQ), `consentStatus`(Enum: PENDING/COMPLETED/WITHDRAWN), `consentedAt`, `notificationWindow`
   - `ChildAccount` (`child_accounts`): `childId`(UUID PK), `parentId`(FK Cascade), `nickname`, `birthYear`, `status`(Enum: PENDING/ACTIVE/INACTIVE), `lastSessionAt`
   - `StarLedgerEntry` (`star_ledger_entries`): `ledgerEntryId`(UUID PK), `childId`(FK), `delta`, `balanceAfter`, `triggerCode`, `sourceId`, `idempotencyKey`(UQ), `createdAt`
   - `StarBalance` (`star_balances`): `childId`(PK FK), `balance`, `updatedAt`
   - `TreeState` (`tree_states`): `treeStateId`(UUID PK), `childId`(UQ FK), `stage`(1~4), `learnCount`, `quizCount`, `practiceCount`, `cycleStartAt`, `stallDays`
   - `MonthlyForestSnapshot` (`monthly_forest_snapshots`): `snapshotId`(UUID PK), `childId`(FK), `yearMonth`, `earnStage`, `spendWellStage`, `saveStage`, `growStage`, `practiceCount`, `spendingDelta`, `totalEarnedStars`, `snapshotJson`
   - `SpendingPlanCard` (`spending_plan_cards`): `planCardId`(UUID PK), `childId`(FK), `placeText`, `categoryCode`, `plannedAmount`, `itemText`, `status`(Enum: PENDING/MATCHED/EXPIRED), `expiresAt`
   - `SpendingRecord` (`spending_records`): `spendingRecordId`(UUID PK), `childId`(FK), `planCardId`(UQ FK nullable), `actualAmount`, `merchantName`, `categoryCode`, `planMet`, `aiFeedback`
   - `Wishlist` (`wishlists`): `wishlistId`(UUID PK), `childId`(FK), `itemName`, `targetAmount`, `savedAmount`, `paid30`, `paid70`, `paid100`
   - `LearningCompletion` (`learning_completions`): `completionId`(UUID PK), `childId`(FK), `topicId`, `quizCorrectCount`, `cycleId`
   - `PracticeCredit` (`practice_credits`): `creditId`(UUID PK), `childId`(FK), `practicePath`, `sourceId`, `creditedAt`, `cycleId`, `idempotencyKey`(UQ)

2. **인덱스 및 제약조건:**
   - `star_ledger_entries`: `@@index([childId, createdAt])`, `@@unique([idempotencyKey])`
   - `practice_credits`: `@@unique([idempotencyKey])`
   - `spending_records`: `@@index([childId, createdAt])`

3. **Prisma Connection Pooling:**
   - `DATABASE_URL` (Supabase pgbouncer port 6543) 및 `DIRECT_URL` (직접 연결 port 5432) 분리 설정

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: Prisma 마이그레이션 정상 실행**
  - **Given:** Supabase PostgreSQL 환경 변수가 설정된 상태에서
  - **When:** `npx prisma migrate dev --name init` 명령을 실행하면
  - **Then:** 모든 테이블과 외래키/유니크 제약이 오류 없이 DB에 생성되고 Prisma Client가 자동 생성된다.

- **시나리오 2: 원장 멱등키 및 외래키 무결성 제약 검증**
  - **Given:** 동일한 `idempotencyKey`를 가진 `StarLedgerEntry` 행이 이미 존재할 때
  - **When:** 동일한 `idempotencyKey`로 INSERT를 시도하면
  - **Then:** Unique constraint violation(`P2002`) 에러가 발생하며 삽입이 차단된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
# Prisma 스키마 문법 및 포맷 검사
npx prisma format

# Prisma Client 생성 및 유효성 확인
npx prisma generate

# 스키마 유효성 검사
npx prisma validate
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** 없음 (프로젝트 기본 셋업)
- **후행 태스크 (Dependents):** `TASK-102`, `TASK-103`, `TASK-104`, Step 2 전체
