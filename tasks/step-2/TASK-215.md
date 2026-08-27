---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-215] [STEP-2] [Write] 위시리스트 목표 등록 및 마일스톤 별 지급 Action"
labels: ["enhancement", "ai-ready", "step-2", "wishlist", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-215`
- **관련 SRS 요구사항:** `REQ-FUNC-013`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Should-Have (P1)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동이 사고 싶은 물건을 위시리스트에 등록하고, 저축 진행률이 30%, 70%, 100% 마일스톤에 도달할 때마다 각각 별 1개씩 보상하여 장기 저축 동기를 부여합니다. (중복 지급 금지)

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/wishlist.ts`
- `[NEW]` `services/wishlist.service.ts`

### 🎨 [PROTO] 화면 선작성 (grill T7 · 안 A)

이 태스크가 **화면도 만든다.** 서버 로직보다 먼저 fixture 기반 화면을 세우고, 구현 완료 시 fixture import 를 Server Action 호출로 치환한다 (`docs/00-plan/prototype-execution-plan.md` §4·§6).

- `[NEW]` `app/child/wishlist/page.tsx` — 위시리스트 마일스톤 (Fun)
- `[NEW]` `app/child/wishlist/wishlist.fixture.ts` — fixture

> fixture 첫 줄에 `// PROTO-DATA: TASK-215` 마커를 넣는다. 구현 완료 시 파일을 삭제하고 `grep -rn "PROTO-DATA: TASK-215"` 가 0건임을 확인한다.

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`createWishlistItem(dto: CreateWishlistDto)`:**
   - 물건명(`itemName`), 목표금액(`targetAmount`) 입력받아 생성

2. **`updateWishlistDeposit(wishlistId: string, addedAmount: number)`:**
   - 누적 저축액 갱신 및 달성률($\text{savedAmount} / \text{targetAmount}$) 계산
   - $\ge 30\%$ AND `paid30 == false` $\implies \text{grantStar(+1)}$ & `paid30 = true`
   - $\ge 70\%$ AND `paid70 == false` $\implies \text{grantStar(+1)}$ & `paid70 = true`
   - $\ge 100\%$ AND `paid100 == false` $\implies \text{grantStar(+1)}$ & `paid100 = true`

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 30% 마일스톤 도달 시 별 1개 지급**
  - **Given:** 목표금액 10,000원 위시리스트에 3,000원이 저축되었을 때
  - **When:** `updateWishlistDeposit`이 호출되면
  - **Then:** 별 1개가 지급되고 `paid30` 플래그가 true로 설정된다. (동일 구간 재지급 방지)

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/wishlist.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`
- **후행 태스크 (Dependents):** UI 연동
