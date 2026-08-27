---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-209] [STEP-2] [Write] 소비 계획 카드 생성 및 유효시간 관리 Action"
labels: ["enhancement", "ai-ready", "step-2", "spending", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-209`
- **관련 SRS 요구사항:** `REQ-FUNC-007`, `ADR-003`, `REG-002`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동이 용돈을 지출하기 전 지출 장소, 업종 카테고리, 상한 금액을 사전에 등록하는 '소비 계획 카드'를 생성하고 만료 시간(기본 72시간)을 관리합니다. (GPS 위치 권한 일체 배제)

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/plan.ts` (소비 계획 Server Actions)
- `[NEW]` `services/plan.service.ts`

### 🎨 [PROTO] 화면 선작성 (grill T7 · 안 A)

이 태스크가 **화면도 만든다.** 서버 로직보다 먼저 fixture 기반 화면을 세우고, 구현 완료 시 fixture import 를 Server Action 호출로 치환한다 (`docs/00-plan/prototype-execution-plan.md` §4·§6).

- `[NEW]` `app/child/plan/new/page.tsx` — 소비 계획 카드 3필드 (Fun · REG-002)
- `[NEW]` `app/child/plan/new/plan.fixture.ts` — fixture

> fixture 첫 줄에 `// PROTO-DATA: TASK-209` 마커를 넣는다. 구현 완료 시 파일을 삭제하고 `grep -rn "PROTO-DATA: TASK-209"` 가 0건임을 확인한다.

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`createPlanCard(dto: CreatePlanCardDto)`:**
   - 필수 필드: `placeText`, `categoryCode`, `plannedAmount`
   - 유효기간 설정: `expiresAt = NOW() + 72시간`
   - `status = PENDING`으로 저장

2. **`getActivePlanCards(childId: string)`:**
   - 만료되지 않고 매칭 대기 중인(`status = PENDING` AND `expiresAt > NOW()`) 카드 목록 조회

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 정상 소비 계획 카드 생성**
  - **Given:** 아동이 "문구점", 카테고리 "STATIONERY", 계획금액 "3000"을 입력했을 때
  - **When:** `createPlanCard`를 호출하면
  - **Then:** 72시간 후 만료되는 PENDING 상태의 계획 카드가 생성된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/plan.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-102`
- **후행 태스크 (Dependents):** `TASK-210`
