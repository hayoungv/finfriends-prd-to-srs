---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-102] [STEP-1] 공통 TypeScript DTO 및 Zod 검증 스키마 정의"
labels: ["enhancement", "ai-ready", "step-1", "types"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-102`
- **관련 SRS 요구사항:** `SRS §11`, `REQ-NF-016`
- **단계 (Step):** Step 1 (Contract & Data)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
Server Actions 및 Route Handlers의 입출력 데이터 규격을 TypeScript 타입과 Zod 스키마로 정의하여, 런타임 입력값 검증(음수 금액 차단, 문자열 길이 제한 등)과 컴파일 타임 타입 무결성을 보장합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `types/domain.ts` (도메인 공통 인터페이스)
- `[NEW]` `lib/validations/onboarding.ts` (온보딩 및 동의 Zod 스키마)
- `[NEW]` `lib/validations/plan.ts` (소비 계획 카드 Zod 스키마)
- `[NEW]` `lib/validations/ledger.ts` (별 원장 지급/차감 Zod 스키마)
- `[NEW]` `lib/validations/mission.ts` (미션 생성 및 승인 Zod 스키마)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **온보딩 & 계정 DTO / Zod:**
   ```typescript
   export const VerifyIdentitySchema = z.object({
     phone: z.string().regex(/^010\d{8}$/, "올바른 휴대폰 번호 형식이 아닙니다."),
     otp: z.string().length(6, "인증번호는 6자리여야 합니다.")
   });
   
   export const RegisterConsentSchema = z.object({
     parentId: z.string().uuid(),
     termsVersion: z.string().default("1.0"),
     consented: z.literal(true, { errorMap: () => ({ message: "법정대리인 동의가 필수입니다." }) })
   });

   export const CreateChildProfileSchema = z.object({
     parentId: z.string().uuid(),
     nickname: z.string().min(2).max(10),
     birthYear: z.number().int().min(2010).max(2020)
   });
   ```

2. **소비 계획 DTO / Zod:**
   ```typescript
   export const CreatePlanCardSchema = z.object({
     childId: z.string().uuid(),
     placeText: z.string().min(1).max(30),
     categoryCode: z.enum(["CONVENIENCE", "STATIONERY", "SNACK", "TOY", "BOOK", "ETC"]),
     plannedAmount: z.number().int().positive("계획 금액은 0원보다 커야 합니다.").max(100000, "1회 최대 10만 원 이하만 가능합니다."),
     itemText: z.string().max(30).optional()
   });
   ```

3. **별 원장 DTO / Zod:**
   ```typescript
   export const GrantStarSchema = z.object({
     childId: z.string().uuid(),
     delta: z.number().int().positive(),
     triggerCode: z.string(),
     sourceId: z.string().optional(),
     idempotencyKey: z.string().min(10)
   });
   ```

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 올바른 DTO 입력값 유효성 검증 성공**
  - **Given:** 유효한 전화번호와 6자리 OTP 입력값이 주어졌을 때
  - **When:** `VerifyIdentitySchema.safeParse(input)`를 실행하면
  - **Then:** `success: true`가 반환된다.

- **시나리오 2: 소비 계획 음수 금액 입력 시 유효성 실패**
  - **Given:** `plannedAmount: -1000` 입력값이 주어졌을 때
  - **When:** `CreatePlanCardSchema.safeParse(input)`를 실행하면
  - **Then:** `success: false`와 함께 양수 금액 요구 에러 메시지가 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
# TypeScript 컴파일 검사
npx tsc --noEmit
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-101`
- **후행 태스크 (Dependents):** Step 2 전체 Server Actions
