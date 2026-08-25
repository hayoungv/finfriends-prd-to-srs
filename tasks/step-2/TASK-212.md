---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-212] [STEP-2] [Read/Write] 성장 나무 3조건 판정 및 14일 정체(Stall) 평가 Action"
labels: ["enhancement", "ai-ready", "step-2", "growth", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-212`
- **관련 SRS 요구사항:** `REQ-FUNC-005`, `SRS §6.5`, `SRS §8.3`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동의 금융 성장 단계를 '새싹 ➔ 묘목 ➔ 어린 나무 ➔ 풍성한 나무' 4단계로 관리하고, 핵심 승급 3조건(`학습>=3 AND 퀴즈>=5 AND 실천>=1`) 판정 및 사이클 14일 경과 시 정체 원인 넛지를 계산합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/growth.ts` (성장 도메인 Server Actions)
- `[NEW]` `services/growth.service.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **승급 3조건 판정 (`evaluateGrowthTree`):**
   - 조건: `learnCount >= 3` AND `quizCount >= 5` AND `practiceCount >= 1`
   - 만족 시: `stage = stage + 1`, `cycleStartAt = NOW()`, 카운터 초기화
   - **중요 불변식:** 실천 횟수가 0이면 학습/퀴즈가 아무리 많아도 절대 승급 불가

2. **정체(Stall) 평가 로직:**
   - 사이클 시작일로부터 경과 일수 계산: `cycleDays = NOW() - cycleStartAt`
   - `cycleDays < 14`: 어떠한 정체 판정도 내리지 않음 (`stallDays = 0`)
   - `cycleDays >= 14` AND 승급 미충족: 부족한 조건 중 가장 적게 남은 조건을 UI 최상단 넛지로 추출

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 3조건 충족 시 성장 단계 승급**
  - **Given:** 아동이 학습 3회, 퀴즈 5회, 실천 1회를 달성했을 때
  - **When:** `evaluateGrowthTree`가 호출되면
  - **Then:** 단계가 1단계에서 2단계로 승급되고 새 사이클 시작일이 오늘로 갱신된다.

- **시나리오 2: 13일 차에는 정체 미판정, 14일 차에 넛지 출력**
  - **Given:** 승급 조건을 미충족한 상태에서 13일이 경과했을 때 정체 없음, 14일 경과 시
  - **When:** `getTreeDashboard`를 호출하면
  - **Then:** 14일 차에 "실천 1회가 더 필요해요!" 넛지 메시지가 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/growth.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-206`, `TASK-207`, `TASK-210`
- **후행 태스크 (Dependents):** `TASK-213`, `TASK-302`, `TASK-401`
