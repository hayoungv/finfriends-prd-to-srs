---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-205] [STEP-2] [Read] 아동별 실시간 별 잔액 및 원장 이력 조회 Action"
labels: ["enhancement", "ai-ready", "step-2", "read", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-205`
- **관련 SRS 요구사항:** `REQ-FUNC-002`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동 화면 및 보호자 대시보드에서 아동의 현재 보유 별 개수와 최근 획득/사용 이력을 고속으로 조회하는 Read Server Action을 제공합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[MODIFY]` `actions/ledger.ts`
- `[NEW]` `types/ledger.ts`

### 🎨 [PROTO] 화면 선작성 (grill T7 · 안 A)

이 태스크가 **화면도 만든다.** 서버 로직보다 먼저 fixture 기반 화면을 세우고, 구현 완료 시 fixture import 를 Server Action 호출로 치환한다 (`docs/00-plan/prototype-execution-plan.md` §4·§6).

- `[NEW]` `app/child/stars/page.tsx` — 별 잔액·이력 (Fun)
- `[NEW]` `components/child/StarHUD.tsx` — 전역 별 카운터
- `[NEW]` `app/child/stars/ledger.fixture.ts` — fixture

> fixture 첫 줄에 `// PROTO-DATA: TASK-205` 마커를 넣는다. 구현 완료 시 파일을 삭제하고 `grep -rn "PROTO-DATA: TASK-205"` 가 0건임을 확인한다.

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`getStarBalance(childId: string)`:**
   - `star_balances` 테이블에서 단일 행 조회
   - 캐싱 헤더 및 빠른 응답 보장

2. **`getStarHistory(childId: string, limit = 20, cursor?: string)`:**
   - `star_ledger_entries` 테이블에서 `createdAt DESC` 정렬 커서 기반 페이징 조회
   - 각 이력별 `triggerCode`, `delta`, `createdAt` 반환

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 별 잔액 및 최근 이력 조회 성공**
  - **Given:** 아동이 총 3회의 별 지급/차감 이력을 가진 상태에서
  - **When:** `getStarBalance` 및 `getStarHistory`를 호출하면
  - **Then:** 현재 잔액과 3개의 이력 목록이 정확히 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/ledger-read.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`
- **후행 태스크 (Dependents):** UI 컴포넌트 연동
