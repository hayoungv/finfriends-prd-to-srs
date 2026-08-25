---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-211] [STEP-2] [Write] Vercel AI SDK + Gemini AI 회고 생성 파이프라인"
labels: ["enhancement", "ai-ready", "step-2", "ai", "gemini", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-211`
- **관련 SRS 요구사항:** `REQ-FUNC-008`, `REQ-NF-005`, `ADR-010`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
결제 대조 결과에 따라 아동의 눈높이에 맞춘 따뜻하고 구체적인 칭찬/격려 피드백을 Vercel AI SDK + Google Gemini 1.5 Flash로 실시간 생성하고, 2.5초 초과 또는 429 에러 시 룰 기반 Fallback 템플릿으로 안전하게 전환합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/retro.ts` (회고 생성 Server Action)
- `[NEW]` `lib/ai/gemini-client.ts` (Vercel AI SDK + Gemini 연동)
- `[NEW]` `lib/ai/fallback-templates.ts` (결정론적 룰 기반 Fallback 엔진)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **Vercel AI SDK 연동 (`generateAIRetro`):**
   ```typescript
   import { generateText } from "ai";
   import { google } from "@ai-sdk/google";

   const model = google("gemini-1.5-flash");
   ```
   - 프롬프트 설계: 만 8~9세 아동 페르소나, 계획 금액/실제 지출액/업종 반영, 칭찬 및 다음 실천 독려 2~3문장 생성
   - 타임아웃 제약: `AbortSignal.timeout(2500)` 설정

2. **2-Tier Fallback 처리:**
   - Gemini API 호출 실패(타임아웃, 429 Rate Limit, 네트워크 에러) 감지 시
   - `getRuleBasedTemplate(planMet, categoryCode)`를 호출하여 즉각 정적 템플릿 반환
   - 생성된 피드백을 `spending_records.ai_feedback`에 저장

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 정상 Gemini 회고 생성**
  - **Given:** 계획 준수 결제(`planMet: true`)가 발생했을 때
  - **When:** `generateAIRetro`를 호출하면
  - **Then:** 2.5초 이내에 아동 맞춤형 AI 칭찬 피드백이 생성되어 반환된다.

- **시나리오 2: AI 타임아웃 시 룰 기반 Fallback 전환**
  - **Given:** Gemini API가 지연되거나 429 에러가 발생할 때
  - **When:** `generateAIRetro`를 호출하면
  - **Then:** 에러를 사용자에게 노출하지 않고 기본 룰 템플릿 문장이 즉시 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/ai-retro.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-210`
- **후행 태스크 (Dependents):** `TASK-306`, `TASK-402`
