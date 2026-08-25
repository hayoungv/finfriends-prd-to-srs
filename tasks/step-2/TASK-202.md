---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-202] [STEP-2] [Write] 법정대리인 동의 처리 및 아동 생성 Action"
labels: ["enhancement", "ai-ready", "step-2", "consent", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-202`
- **관련 SRS 요구사항:** `REQ-FUNC-001`, `REG-001`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
만 14세 미만 아동의 서비스 이용을 위한 법정대리인의 명시적 동의를 영속적으로 기록하고, 아동의 프로필(닉네임, 출생연도) 및 초기 원장/성장 나무 레코드를 초기화합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[MODIFY]` `actions/onboarding.ts`
- `[NEW]` `services/account.service.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`registerConsent(dto: RegisterConsentDto)`:**
   - `parent_accounts`의 `consent_status`를 `COMPLETED`로 변경하고 `consented_at = NOW()` 기록

2. **`createChildProfile(dto: CreateChildProfileDto)`:**
   - `prisma.$transaction`을 통해 다음을 원자적으로 생성:
     1. `child_accounts` (status = ACTIVE)
     2. `star_balances` (initial balance = 0)
     3. `tree_states` (stage = 1, cycleStartAt = NOW())
   - 생성 완료 후 온보딩 5단계 완료 처리

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 법정대리인 동의 및 아동 프로필 원자적 생성**
  - **Given:** 보호자 본인인증이 완료된 상태에서
  - **When:** `registerConsent` 및 `createChildProfile`을 호출하면
  - **Then:** 보호자의 동의 상태가 COMPLETED가 되고, 아동 계정과 함께 초기 별 잔액(0) 및 성장 나무(1단계)가 DB에 원자적으로 생성된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/consent.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-201`
- **후행 태스크 (Dependents):** `TASK-203`
