---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-204] [STEP-2] [Write] 멱등성 보장형 별 지급/차감 엔진"
labels: ["enhancement", "ai-ready", "step-2", "ledger", "transaction"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-204`
- **관련 SRS 요구사항:** `REQ-FUNC-002`, `REQ-NF-003`, `REQ-NF-004`, `REG-005`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동의 실천과 학습에 대한 보상인 '별(Star)'을 지급 및 차감할 때, 불변 원장(Immutable Ledger) 패턴과 Prisma Interactive Transaction(`$transaction`)을 사용하여 멱등성 보장 및 잔액 무결성을 단일 원자적으로 달성합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/ledger.ts` (원장 Server Action)
- `[NEW]` `services/ledger.service.ts` (원장 도메인 서비스)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`grantStar(dto: GrantStarDto)`:**
   - 1) `prisma.starLedgerEntry.findUnique({ where: { idempotencyKey } })`로 기처리 여부 조회
   - 2) 이미 존재하면 추가 연산 없이 기존 `balanceAfter` 반환 (멱등성 보장)
   - 3) 신규 요청일 경우 `prisma.$transaction` 실행:
      - `star_balances` 행 조회 (FOR UPDATE)
      - `newBalance = currentBalance + delta` 계산
      - `star_ledger_entries` 행 INSERT (`delta`, `balanceAfter = newBalance`, `triggerCode`, `idempotencyKey`)
      - `star_balances` UPDATE (`balance = newBalance`)

2. **`deductStar(dto: DeductStarDto)`:**
   - 잔액 부족 검증: `currentBalance < delta`일 경우 `INSUFFICIENT_STARS` 에러 발생 (차감 차단)
   - 잔액 충분 시 `$transaction`으로 차감 기록 및 잔액 갱신

3. **불변식 강제:**
   - $\text{balance\_after}_n = \text{balance\_after}_{n-1} + \text{delta}_n$

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 멱등성 중복 호출 방지**
  - **Given:** `idempotencyKey: "quiz_topic1_attempt1"`로 1별 지급이 완료된 상태에서
  - **When:** 동일한 `idempotencyKey`로 다시 `grantStar`를 호출하면
  - **Then:** DB에 새로운 원장 행이 추가되지 않고, 기존 잔액이 그대로 반환된다.

- **시나리오 2: 잔액 부족 시 차감 거절**
  - **Given:** 보유 별이 2개인 아동이
  - **When:** 5개 별이 필요한 의상 구매(`deductStar(5)`)를 요청하면
  - **Then:** 에러가 발생하고 잔액은 2개로 유지된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/ledger.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-101`
- **후행 태스크 (Dependents):** `TASK-205`, `TASK-206`, `TASK-207`, `TASK-214`, `TASK-215`, `TASK-301`
