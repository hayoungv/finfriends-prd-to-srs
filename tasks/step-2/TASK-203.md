---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-203] [STEP-2] [Guard] 미동의 아동 진입 원천 차단 Server Guard (REG-001)"
labels: ["enhancement", "ai-ready", "step-2", "security", "middleware"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-203`
- **관련 SRS 요구사항:** `REG-001`, `REQ-NF-008`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
법정대리인 동의가 완료되지 않은(`consent_status != COMPLETED`) 보호자 소속 아동이 서비스의 어떠한 화면(학습, 퀴즈, 계획, 옷장 등)이나 Server Action에 접근하더라도 100% 서버 사이드에서 차단하여 법적 규제(REG-001)를 준수합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `middleware.ts` (Next.js Edge Middleware)
- `[NEW]` `lib/auth/consent-guard.ts` (Server Action 공통 가드 유틸리티)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`middleware.ts` 라우트 보호:**
   - `/child/*`, `/parent/dashboard/*` 경로 진입 시 세션 쿠키 검증
   - 미인증 시 `/login`으로 리다이렉트
   - 인증되었으나 동의 미완료 시 `/onboarding/consent`로 강제 리다이렉트

2. **`requireConsent(childId: string)` (Server Action 레벨 가드):**
   - 모든 Mutation Action 시작 시 `consent-guard.ts`를 호출하여 DB 레벨 동의 상태 재확인
   - 동의 미완료 시 `throw new Error("CONSENT_REQUIRED")` 발생

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 미동의 아동의 직접 URL 접근 차단**
  - **Given:** 동의가 완료되지 않은 계정 세션으로 로그인된 상태에서
  - **When:** 브라우저에서 `/child/tree` 또는 `/child/quiz`를 직접 요청하면
  - **Then:** 즉시 HTTP 307 리다이렉트되어 `/onboarding/consent` 페이지로 이동한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/consent-guard.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-202`
- **후행 태스크 (Dependents):** `TASK-305`
