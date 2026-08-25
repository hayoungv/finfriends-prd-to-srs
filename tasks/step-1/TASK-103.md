---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-103] [STEP-1] 내장형 Mock Partner Sandbox Gateway 구현 (/api/v1/sandbox)"
labels: ["enhancement", "ai-ready", "step-1", "api", "mock"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-103`
- **관련 SRS 요구사항:** `SRS §4.1.1`, `REQ-FUNC-016`, `ADR-012`
- **단계 (Step):** Step 1 (Contract & Data)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
실제 외부 선불업 제휴사 카드망/결제망 연동 없이도 개발 및 E2E 테스트 과정에서 가상 카드 충전과 가상 가맹점 결제를 자유롭게 발생시킬 수 있는 Sandbox Route Handlers와 테스트 제어 패널 API를 제공합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `app/api/v1/sandbox/topup/route.ts` (가상 잔액 충전 API)
- `[NEW]` `app/api/v1/sandbox/pay/route.ts` (가상 결제 승인 API)
- `[NEW]` `app/api/v1/sandbox/cards/[cardId]/balance/route.ts` (가상 카드 잔액 조회)
- `[NEW]` `lib/sandbox/simulator.ts` (가상 결제 거래 생성 유틸리티)

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **`POST /api/v1/sandbox/topup` (가상 충전):**
   - **Request Body:** `{ childId: string, amount: number }`
   - **동작:** 가상 카드 잔액 증가 및 트랜잭션 기록 반환

2. **`POST /api/v1/sandbox/pay` (가상 결제):**
   - **Request Body:** `{ childId: string, actualAmount: number, merchantName: string, categoryCode: string }`
   - **동작:** 
     - 가상 카드 잔액 차감 가능 여부 검증 (잔액 부족 시 400 Bad Request)
     - 결제 건 승인 후 `REQ-FUNC-008` 결제 대조 서비스(`reconcilePayment`) 자동 호출
   - **Response:** `{ transactionId: string, status: "APPROVED", reconciliation: { matched: boolean, planMet: boolean } }`

3. **개발자 모드 보안 제약:**
   - Production 환경에서는 Sandbox 엔드포인트를 비활성화하거나 Header 토큰(`x-sandbox-secret`)으로 접근 제한

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 정상 가상 결제 발생 및 응답**
  - **Given:** 아동 가상 잔액이 10,000원인 상태에서
  - **When:** `POST /api/v1/sandbox/pay`에 `{ actualAmount: 3000, merchantName: "CU 편의점", categoryCode: "CONVENIENCE" }`를 호출하면
  - **Then:** 200 OK와 함께 결제 승인 ID 및 잔액 7,000원이 반환된다.

- **시나리오 2: 가상 잔액 부족 시 결제 거절**
  - **Given:** 아동 가상 잔액이 1,000원인 상태에서
  - **When:** 5,000원 결제를 요청하면
  - **Then:** 400 Bad Request와 함께 `INSUFFICIENT_FUNDS` 에러 코드가 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
# Sandbox Route Handler API 호출 테스트
npm run test app/api/v1/sandbox
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-101`
- **후행 태스크 (Dependents):** `TASK-210`, `TASK-306`
