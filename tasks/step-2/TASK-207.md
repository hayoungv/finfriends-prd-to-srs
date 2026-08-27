---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-207] [STEP-2] [Write] 미션 CRUD 및 아동 보고 / 보호자 승인 Action"
labels: ["enhancement", "ai-ready", "step-2", "practice", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-207`
- **관련 SRS 요구사항:** `REQ-FUNC-004`, `SRS §8.1`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자가 미션(심부름, 방 정리 등)을 제안하고, 아동이 완료 보고를 올리면, 보호자가 승인하여 실천 크레딧(`practice_credits`)과 별을 지급하는 미션 루프를 완성합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/practice.ts` (실천/미션 Server Actions)
- `[NEW]` `services/mission.service.ts`

### 🎨 [PROTO] 화면 선작성 (grill T7 · 안 A)

이 태스크가 **화면도 만든다.** 서버 로직보다 먼저 fixture 기반 화면을 세우고, 구현 완료 시 fixture import 를 Server Action 호출로 치환한다 (`docs/00-plan/prototype-execution-plan.md` §4·§6).

- `[NEW]` `app/child/missions/page.tsx` — 미션 보고 (Fun)
- `[NEW]` `app/parent/missions/page.tsx` — 승인·반려 (Clean)
- `[NEW]` `app/parent/missions/mission.fixture.ts` — fixture

> fixture 첫 줄에 `// PROTO-DATA: TASK-207` 마커를 넣는다. 구현 완료 시 파일을 삭제하고 `grep -rn "PROTO-DATA: TASK-207"` 가 0건임을 확인한다.

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`createMission(dto: CreateMissionDto)`:**
   - 보호자가 미션명, 보상 별 개수(`starAmount`), 만료일 설정하여 `status = CREATED` 상태로 생성

2. **`reportMissionCompleted(missionId: string)`:**
   - 아동이 미션 완료 보고 시 `status = PENDING_APPROVAL`, `completedAt = NOW()` 기록

3. **`approveMission(missionId: string, parentId: string)`:**
   - 보호자 승인 시 `status = APPROVED`, `approvedAt = NOW()` 전이
   - `practice_credits` 1건 생성 (`practicePath = MISSION`, WPA 산입)
   - `grantStar` 호출하여 약정된 별 지급 및 `evaluateGrowthTree` 호출

4. **`rejectMission(missionId: string, parentId: string)`:**
   - 보호자 거절 시 `status = REJECTED`, 별 및 실천 크레딧 미지급

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 미션 승인 및 실천 인정**
  - **Given:** 아동이 수행 보고한 미션(`PENDING_APPROVAL`)이 있을 때
  - **When:** 보호자가 `approveMission`을 호출하면
  - **Then:** 미션 상태가 `APPROVED`가 되고, 실천 크레딧 1건 및 별 2개가 정상 지급된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/mission.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`
- **후행 태스크 (Dependents):** `TASK-208`, `TASK-212`
