---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-304] [STEP-3] [Integration] 미션 소급 정산 및 스냅샷 보정 통합 테스트"
labels: ["enhancement", "ai-ready", "step-3", "test", "integration"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-304`
- **관련 SRS 요구사항:** `REQ-FUNC-011`, `REQ-FUNC-009`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자가 미션 완료 시점으로부터 48시간 이상 지난 후(월이 바뀐 시점) 승인했을 때, 실천 크레딧이 과거 Cycle로 정상 귀속되고 월간 숲 스냅샷이 실시간으로 재계산 보정되는지 통합 테스트를 수행합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/integration/backfill.test.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **통합 테스트 시나리오:**
   - 1) 지난달 완료된 미션 레코드 준비 (`completedAt = 지난달`)
   - 2) 이번 달에 `approveMission` 실행
   - 3) `practice_credits.cycle_id`가 지난달 주차로 저장되었는지 검증
   - 4) 지난달 월간 숲 스냅샷의 `practiceCount`가 +1 증가하여 저장되었는지 검증

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 과거 완료된 미션 데이터가 있을 때
- **When:** 소급 승인을 실행하면
- **Then:** 과거 Cycle의 통계 및 스냅샷이 누락 없이 업데이트된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/integration/backfill.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-208`, `TASK-213`
- **후행 태스크 (Dependents):** Beta Gate 검증
