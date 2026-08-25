---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-213] [STEP-2] [Read/Write] 월간 숲 7대 지표 스냅샷 생성 및 리포트 조회 Action"
labels: ["enhancement", "ai-ready", "step-2", "forest", "server-actions"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-213`
- **관련 SRS 요구사항:** `REQ-FUNC-009`, `SRS §6.9`, `ADR-002`
- **단계 (Step):** Step 2 (Logic & Mutation)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 1.0 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
보호자에게 자녀의 월간 금융 실천 변화 증거를 제시하기 위해, 월별 숲 형태의 시각적 스냅샷과 7대 핵심 지표(4영역 단계, 실천 횟수, 계획 준수율, 저축액 등)를 생성하고 조회하는 Action을 구현합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[MODIFY]` `actions/growth.ts`
- `[NEW]` `services/forest.service.ts`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **7대 지표 집계 및 스냅샷 생성 (`generateMonthlyForestSnapshot`):**
   - 1. 4영역 단계 (벌기/쓰기/모으기/불리기 달성도)
   - 2. 실천 인정 횟수 (미션 승인 + 계획 준수 지출)
   - 3. 사려다 멈춘 횟수 (위시리스트 보류 건수)
   - 4. 계획 준수율 ($\text{계획 지킴 건수} / \text{전체 지출 건수}$)
   - 5. 총 획득 별 개수
   - 6. 전월 대비 소비 증감액
   - 7. WPA 기여 여부
   - 집계 결과를 `monthly_forest_snapshots`에 저장

2. **`getMonthlyForestReport(childId: string, yearMonth: string)`:**
   - 해당 월의 스냅샷 데이터를 반환하고, 첫 달인 경우 '비교 불가 안내' 플래그 포함

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **시나리오 1: 월간 숲 7대 지표 리포트 조회**
  - **Given:** 아동의 한 달 실천 데이터가 누적된 상태에서
  - **When:** `getMonthlyForestReport`를 호출하면
  - **Then:** 7대 지표와 함께 숲 단계 그래픽 메타데이터가 정상 반환된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/forest.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-212`
- **후행 태스크 (Dependents):** `TASK-304`, `TASK-403`
