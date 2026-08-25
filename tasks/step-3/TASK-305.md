---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-305] [STEP-3] [E2E] 동의 미완료 아동 차단 및 온보딩 Playwright E2E 테스트"
labels: ["enhancement", "ai-ready", "step-3", "test", "e2e", "security"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-305`
- **관련 SRS 요구사항:** `REQ-FUNC-001`, `REG-001`, `REQ-NF-008`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자 5단계 온보딩 전체 플로우를 실제 브라우저 환경(Playwright)에서 검증하고, 법정대리인 동의 미완료 상태에서 아동 대시보드 URL 직접 진입 시 100% 차단되는 보안 규제 요건을 E2E로 검증합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/e2e/onboarding.spec.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **Playwright E2E 시나리오:**
   - 1) 보호자 본인인증 ➔ 약관 동의 ➔ 아동 등록 정상 온보딩 플로우 완료 검증
   - 2) 동의를 건너뛰고 `/child/tree`로 직접 브라우저 이동 시 `/onboarding/consent`로 즉각 리다이렉트 검증 (REG-001)

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** Headless Chrome 브라우저 환경에서
- **When:** `npx playwright test tests/e2e/onboarding.spec.ts`를 실행하면
- **Then:** 동의 게이트 차단 및 정상 온보딩 플로우가 100% 통과한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npx playwright test tests/e2e/onboarding.spec.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-203`
- **후행 태스크 (Dependents):** Alpha Gate 검증
