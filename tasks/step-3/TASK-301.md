---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-301] [STEP-3] [Unit] 별 원장 멱등성 및 잔액 불변식 Vitest 단위 테스트"
labels: ["enhancement", "ai-ready", "step-3", "test", "unit"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-301`
- **관련 SRS 요구사항:** `REQ-FUNC-002`, `REQ-NF-004`, `REG-005`
- **단계 (Step):** Step 3 (Test & AC)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
별 원장 엔진(`TASK-204`)의 멱등성 보장, 동시성 트랜잭션 격리, 잔액 불변식($\text{balance\_after}_n = \text{balance\_after}_{n-1} + \text{delta}_n$)이 어떠한 상황에서도 100% 유지되는지 단위 테스트로 검증합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `tests/unit/ledger.test.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **테스트 케이스 구현 (Vitest):**
   - TC 1: 동일한 `idempotencyKey`로 병렬 5회 동시 요청 시 오직 1회만 원장에 기록되고 잔액은 1만 증가
   - TC 2: 잔액(1)보다 큰 차감(3) 요청 시 에러 발생 및 롤백 검증
   - TC 3: 100회의 무작위 지급/차감 후 최종 잔액과 원장 행들의 delta 합계가 완벽히 일치하는지 불변식 검증

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 테스트용 격리 DB 환경에서
- **When:** `npm run test tests/unit/ledger.test.ts`를 실행하면
- **Then:** 모든 동시성/불변식 테스트가 100% Pass한다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/ledger.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-204`
- **후행 태스크 (Dependents):** Alpha Gate 검증
