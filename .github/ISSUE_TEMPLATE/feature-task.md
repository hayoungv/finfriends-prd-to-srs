---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK] [STEP-X] 기능/태스크 명칭"
labels: ["enhancement", "ai-ready"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-XXX`
- **관련 SRS 요구사항:** `REQ-FUNC-XXX` / `REQ-NF-XXX` / `REG-XXX`
- **단계 (Step):** Step 1 (Contract & Data) | Step 2 (Logic & Mutation) | Step 3 (Test & AC) | Step 4 (NFR & Infra)
- **우선순위 (Priority):** Must-Have (P0) | Should-Have (P1) | Could-Have (P2)
- **예상 소요 공수:** 0.5 MD ~ 1.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
- 무엇을 왜 구현해야 하는지 배경과 달성 목표를 기술합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `path/to/new-file.ts`
- `[MODIFY]` `path/to/existing-file.ts`
- `[DELETE]` `path/to/legacy-file.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)
1. **인터페이스 / 스키마 정의:**
   - DTO / Type / Prisma Schema / Server Action Signature
2. **핵심 비즈니스 규칙 및 불변식:**
   - 멱등성 보장, 트랜잭션, 제약조건
3. **에러 핸들링 및 Fallback:**
   - 예외 처리, 기본값, 룰 기반 Fallback

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)
- **시나리오 1 (정상 플로우):**
  - **Given (주어진 조건):** ...
  - **When (행동/요청):** ...
  - **Then (기대 결과):** ...
- **시나리오 2 (예외/엣지 케이스):**
  - **Given:** ...
  - **When:** ...
  - **Then:** ...

---

## 🧪 검증 명령어 (Verification Commands)
```bash
# 단위/통합 테스트 실행
npm run test <test-file-path>

# 타입 검사 및 린트
npx tsc --noEmit
npm run lint
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-YYY`
- **후행 태스크 (Dependents):** `TASK-ZZZ`
