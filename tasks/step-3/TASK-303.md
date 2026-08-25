---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-303] [STEP-3] [Unit] 소비 계획 3단계 대조 및 판정 Vitest 단위 테스트"
labels: ["enhancement", "ai-ready", "step-3", "test", "unit"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-303`
- **관련 SRS 요구사항:** `REQ-FUNC-008`, `SRS §6.8`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
소비 계획 카드의 3단계 대조 알고리즘(Category ➔ Merchant ➔ Amount)과 예산 준수 시 별 지급, 초과 시 별 미지급(벌점 없음) 로직의 단위 테스트를 구현합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/unit/reconciliation.test.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **테스트 케이스:**
   - TC 1 (카테고리 매칭): 업종 일치 카드 우선 매칭 및 계획 금액 이하 결제 시 `planMet = true`
   - TC 2 (가맹점명 매칭): 업종 불일치 시 가맹점명 키워드 매칭 성공 검증
   - TC 3 (금액 초과): 계획 3,000원 대비 3,500원 결제 시 `planMet = false`, 별 미지급, 보유 별 차감 없음 검증

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 가상 계획 카드와 결제 이벤트가 주어졌을 때
- **When:** `reconcilePayment`를 실행하면
- **Then:** 기대하는 매칭 방식과 별 지급 여부가 100% 일치한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/reconciliation.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-210`
- **후행 태스크 (Dependents):** Alpha Gate 검증
