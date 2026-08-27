---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-214] [STEP-2] [Write] 아바타 별 옷장 아이템 구매 Action"
labels: ["enhancement", "ai-ready", "step-2", "wardrobe", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-214`
- **관련 SRS 요구사항:** `REQ-FUNC-006`, `ADR-007`, `REG-006`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Should-Have (P1)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
아동이 획득한 별을 사용하여 2D 동물 아바타(토끼, 다람쥐)의 의상 아이템을 구매하고 장착할 수 있도록 별 차감 트랜잭션과 인벤토리 소유권을 관리합니다. (얼굴 이미지 수집 배제)

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `actions/wardrobe.ts`
- `[NEW]` `services/wardrobe.service.ts`

### 🎨 [PROTO] 화면 선작성 (grill T7 · 안 A)

이 태스크가 **화면도 만든다.** 서버 로직보다 먼저 fixture 기반 화면을 세우고, 구현 완료 시 fixture import 를 Server Action 호출로 치환한다 (`docs/00-plan/prototype-execution-plan.md` §4·§6).

- `[NEW]` `app/child/wardrobe/page.tsx` — 아바타 옷장 (Fun · REG-006)
- `[NEW]` `app/child/wardrobe/wardrobe.fixture.ts` — fixture

> fixture 첫 줄에 `// PROTO-DATA: TASK-214` 마커를 넣는다. 구현 완료 시 파일을 삭제하고 `grep -rn "PROTO-DATA: TASK-214"` 가 0건임을 확인한다.

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`purchaseWardrobeItem(childId: string, itemId: string)`:**
   - 아이템 가격(`starPrice`) 조회
   - `deductStar`(`TASK-204`)를 호출하여 원자적 별 차감
   - `wardrobe_ownerships` 레코드 생성
   - 현재 아바타 장착 의상 갱신

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 별 차감 및 의상 구매 성공**
  - **Given:** 보유 별이 5개인 아동이 3별짜리 티셔츠를 구매할 때
  - **When:** `purchaseWardrobeItem`을 호출하면
  - **Then:** 별 잔액이 2개로 감소하고 아바타 옷장에 아이템이 추가된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/wardrobe.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`, `TASK-104`
- **후행 태스크 (Dependents):** UI 연동
