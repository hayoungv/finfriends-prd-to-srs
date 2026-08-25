---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-210] [STEP-2] [Write] 결제 3단계 대조 알고리즘 Action"
labels: ["enhancement", "ai-ready", "step-2", "reconciliation", "algorithm"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-210`
- **관련 SRS 요구사항:** `REQ-FUNC-008`, `SRS §6.8`, `ADR-004`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
Sandbox 가상 결제 또는 제휴사 결제 발생 시 사전 작성된 소비 계획 카드와 3단계 우선순위(Category ➔ Merchant ➔ Amount)로 대조하고, 계획 금액 이하 지출 시 별 1개 지급 및 실천을 인정합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `services/reconciliation.service.ts`
- `[MODIFY]` `actions/plan.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **3단계 매칭 알고리즘 (`findMatchingPlanCard`):**
   - **1단계 (Category Match):** 결제 업종코드와 일치하는 유효 카드 우선 매칭
   - **2단계 (Merchant Fallback):** 업종 불일치 시 가맹점명(merchantName) 유사도 매칭
   - **3단계 (Amount Fallback):** 최근 미매칭 카드 중 계획금액과 오차가 가장 적은 카드 매칭

2. **판정 및 별 지급 로직:**
   - $\text{actualAmount} \le \text{plannedAmount} \implies \text{planMet} = \text{true} \implies \text{grantStar(+1)}$ 및 $\text{practice\_credits}$ 생성
   - $\text{actualAmount} > \text{plannedAmount} \implies \text{planMet} = \text{false} \implies \text{별 미지급 (차감 없음)}$
   - 매칭된 카드는 `status = MATCHED`로 갱신

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 계획 금액 내 지출 시 별 지급 및 실천 인정**
  - **Given:** 3,000원 편의점 계획 카드가 있을 때
  - **When:** 2,500원 편의점 결제가 발생하면
  - **Then:** `planMet: true`로 판정되어 별 1개가 지급되고 카드가 MATCHED 상태가 된다.

- **시나리오 2: 계획 금액 초과 지출 시 별 미지급**
  - **Given:** 3,000원 편의점 계획 카드가 있을 때
  - **When:** 4,000원 편의점 결제가 발생하면
  - **Then:** `planMet: false`로 판정되어 별이 지급되지 않고 보유 별도 차감되지 않는다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/reconciliation.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-103`, `TASK-209`
- **후행 태스크 (Dependents):** `TASK-211`, `TASK-303`
