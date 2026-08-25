---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-306] [STEP-3] [E2E] Sandbox 결제 ➔ AI 회고 ➔ 별 지급 E2E 전체 여정 검증"
labels: ["enhancement", "ai-ready", "step-3", "test", "e2e", "ai"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-306`
- **관련 SRS 요구사항:** `REQ-FUNC-007`, `REQ-FUNC-008`, `REQ-FUNC-002`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
소비 계획 카드 작성 ➔ Mock Sandbox 결제 발생 ➔ 계획 대조 및 Gemini AI 회고 피드백 생성 ➔ 별 원장 반영 및 성장 나무 반영까지 이어지는 핀프렌즈 핵심 가치 사슬 전체를 E2E로 검증합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/e2e/spending-loop.spec.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **E2E 시나리오 구성:**
   - 1) 아동 계정으로 로그인 후 3,000원 편의점 소비 계획 카드 작성
   - 2) Sandbox API로 2,500원 편의점 결제 발생 트리거
   - 3) 화면에 AI 회고 피드백 카드 렌더링 확인
   - 4) 회고 확인 버튼 클릭 시 별 잔액이 +1 증가하고 성장 나무에 반영되는지 최종 확인

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 실천 루프 전체 환경에서
- **When:** `npx playwright test tests/e2e/spending-loop.spec.ts`를 실행하면
- **Then:** 모든 단계가 지연 없이 원활하게 통과한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npx playwright test tests/e2e/spending-loop.spec.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-211`
- **후행 태스크 (Dependents):** Beta Gate 검증
