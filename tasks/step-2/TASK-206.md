---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-206] [STEP-2] [Write] 퀴즈 채점 및 학습 완료 별 보상 Action"
labels: ["enhancement", "ai-ready", "step-2", "learning", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-206`
- **관련 SRS 요구사항:** `REQ-FUNC-003`, `ADR-001`, `ADR-006`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동이 4대 금융 주제 퀴즈를 풀고 제출했을 때 채점을 수행하고, 정답 시 별 원장(`TASK-204`)을 호출하여 즉각 별 1개를 지급하며, 성장 나무(`TASK-212`)의 퀴즈/학습 카운터를 갱신합니다. (단, 학습 별은 WPA 지표에서 제외)

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/learning.ts` (학습 Server Actions)
- `[NEW]` `services/quiz.service.ts` (퀴즈 채점 서비스)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`submitQuizAnswer(dto: SubmitQuizDto)`:**
   - 제출 답안과 `data/curriculum.json`의 정답 대조
   - 정답 시:
     - `learning_completions` 기록 생성/갱신
     - `grantStar({ childId, delta: 1, triggerCode: "QUIZ_CORRECT", idempotencyKey: ... })` 호출
     - `evaluateGrowthTree(childId)` 비동기 트리거
   - 불리기 영역: 실천 연결 없이 학습 완료만 기록 (ADR-006)

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 퀴즈 정답 제출 시 별 지급 및 학습 완료 기록**
  - **Given:** 아동이 '벌기' 주제 1번 퀴즈의 정답을 제출했을 때
  - **When:** `submitQuizAnswer`를 호출하면
  - **Then:** 정답 판정(`correct: true`)과 함께 별 잔액이 1 증가하고 학습 완료 레코드가 저장된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/learning.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`, `TASK-104`
- **후행 태스크 (Dependents):** `TASK-212`
