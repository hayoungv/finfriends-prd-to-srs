---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-201] [STEP-2] [Write] 보호자 5단계 온보딩 및 Mock KYC 인증 Server Action"
labels: ["enhancement", "ai-ready", "step-2", "auth", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-201`
- **관련 SRS 요구사항:** `REQ-FUNC-001`, `SRS §6.1`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자가 서비스를 처음 시작할 때 거치는 5단계 온보딩 프로세스를 관리하고, 유료 본인인증망 대신 Web Crypto 기반 Mock KYC 인증을 수행하여 진행 단계를 저장/복원하는 Server Action을 구현합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/onboarding.ts` (온보딩 Server Actions)
- `[NEW]` `lib/auth/mock-kyc.ts` (가상 OTP 생성 및 검증 모듈)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`verifyParentIdentity(dto: VerifyIdentityDto)`:**
   - 휴대전화 번호 및 OTP 검증 (Mock KYC: 번호가 `010`으로 시작하고 OTP가 6자리 숫자일 때 기본 성공 처리)
   - 검증 성공 시 `parent_accounts`에 레코드 생성/조회 (Upsert)
   - 세션 쿠키 또는 인증 토큰 생성

2. **`saveOnboardingStep(parentId: string, step: number, payload: any)`:**
   - 5단계(1: 본인인증 ➔ 2: 약관안내 ➔ 3: 동의서명 ➔ 4: 자녀등록 ➔ 5: 완료) 진행 상태를 DB에 저장
   - 중간 이탈 후 재접속 시 직전 완료 단계 반환하여 재입력 방지 (AC1)

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 온보딩 단계 저장 및 이탈 후 복원**
  - **Given:** 보호자가 2단계까지 완료하고 브라우저를 닫았을 때
  - **When:** 동일한 보호자가 다시 접속하여 `getOnboardingProgress(parentId)`를 호출하면
  - **Then:** `currentStep: 2` 및 직전 입력값이 그대로 복원되어 3단계부터 재개된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/onboarding.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-102`
- **후행 태스크 (Dependents):** `TASK-202`
