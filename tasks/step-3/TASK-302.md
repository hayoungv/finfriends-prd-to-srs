---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-302] [STEP-3] [Unit] 성장 나무 3조건 및 정체 판정 Vitest 단위 테스트"
labels: ["enhancement", "ai-ready", "step-3", "test", "unit"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-302`
- **관련 SRS 요구사항:** `REQ-FUNC-005`, `SRS §6.5`, `SRS §8.3`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
성장 나무의 승급 3조건(`학습>=3 AND 퀴즈>=5 AND 실천>=1`), 실천 0회 시 승급 불가 규칙, 14일 미만 정체 판정 방지 규칙의 논리적 정확성을 검증합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/unit/growth.test.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **테스트 케이스 구현:**
   - TC 1: `learn=5, quiz=10, practice=0`일 때 승급 불가 검증 (실천 0건 방어)
   - TC 2: `learn=3, quiz=5, practice=1` 달성 시 즉시 2단계 승급 및 새 사이클 시작 검증
   - TC 3: 사이클 시작 13일 차에는 미충족 상태여도 `stallDays = 0` 반환 검증
   - TC 4: 사이클 시작 14일 차에 미충족 시 가장 적게 남은 조건(예: 실천 부족) 넛지 반환 검증

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 가상 시나리오별 카운터가 주어졌을 때
- **When:** `evaluateGrowthTree` 단위 테스트를 실행하면
- **Then:** 모든 규칙이 오차 없이 검증 통과한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/growth.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-212`
- **후행 태스크 (Dependents):** Alpha Gate 검증
