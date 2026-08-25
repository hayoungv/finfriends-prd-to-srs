---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-208] [STEP-2] [Write] 지연 소급 승인(Backfill) 및 일괄 승인 Action"
labels: ["enhancement", "ai-ready", "step-2", "backfill", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-208`
- **관련 SRS 요구사항:** `REQ-FUNC-011`, `SRS §6.11`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자가 미션 완료 후 48시간 이상 지난 시점(심지어 다음 달)에 승인하더라도, 아동의 실천이 소멸되지 않고 완료 시점(`completedAt`)의 사이클로 소급 인정되어 성장 나무와 월간 숲에 정상 반영되도록 지원합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[MODIFY]` `actions/practice.ts`
- `[NEW]` `services/backfill.service.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`backfillDelayedApproval(missionId: string, parentId: string)`:**
   - 승인 지연 시간 계산: `delayHours = approvedAt - completedAt`
   - `delayHours >= 48`일 경우 `state = BACKFILLED` 설정
   - `practice_credits.cycle_id`를 승인 시점이 아닌 **완료 시점의 주차/월**로 귀속
   - 과거 Cycle의 성장 나무 상태 및 월간 숲 스냅샷 재계산 트리거

2. **`bulkApproveMissions(parentId: string, missionIds: string[])`:**
   - 5건 이상의 대기 미션을 단일 트랜잭션으로 일괄 승인하고 총 지급 별 합산 반환

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 지난달 완료된 미션의 소급 승인**
  - **Given:** 아동이 지난달 28일에 완료 보고한 미션을 오늘(새로운 달) 보호자가 승인할 때
  - **When:** `backfillDelayedApproval`을 호출하면
  - **Then:** 실천 크레딧이 지난달 Cycle로 기록되고, 지난달 월간 숲 스냅샷에 실천 횟수가 +1 보정된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/backfill.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-207`
- **후행 태스크 (Dependents):** `TASK-304`
