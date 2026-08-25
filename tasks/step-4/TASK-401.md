---
name: Feature Task (AI Agent Spec)
about: AI 코딩 에이전트가 구현할 수 있는 명확한 명세 기반의 개발 태스크
title: "[TASK-401] [STEP-4] Supabase pg_cron 야간 배치 구축"
labels: ["enhancement", "ai-ready", "step-4", "database", "cron", "infra"]
assignees: []
---

## 📌 태스크 개요 (Task Overview)
- **태스크 ID:** `TASK-401`
- **관련 SRS 요구사항:** `REQ-NF-012`, `SRS §19`, `ADR-011`
- **단계 (Step):** Step 4 (NFR & Infra)
- **우선순위 (Priority):** Must-Have (P0)
- **예상 소요 공수:** 0.5 MD

---

## 🎯 작업 목적 및 배경 (Objective & Context)
상시 서버 인스턴스 비용($0 유지)을 쓰지 않고, Supabase PostgreSQL 내장 확장 프로그램인 `pg_cron`을 활용하여 매일 자정에 실행되는 일일 정체 일수 가산, 72시간 미접속 플래그 설정, 만료 계획 카드 정리를 수행합니다.

---

## 📂 변경 대상 파일 및 범위 (Target Files)
- `[NEW]` `prisma/migrations/procedures/nightly_batch.sql`
- `[NEW]` `lib/db/cron-setup.sql`

---

## 📋 세부 구현 요구사항 (Implementation Requirements)

1. **SQL 프로시저 `sp_nightly_maintenance()` 정의:**
   - 1) 14일 이상 경과한 `tree_states`의 `stall_days` 1일 가산
   - 2) `last_session_at < NOW() - INTERVAL '72 hours'`인 아동 계정에 미접속 플래그 설정
   - 3) 만료일이 지난 `spending_plan_cards` (`expires_at < NOW()`)를 `EXPIRED`로 상태 갱신

2. **`pg_cron` 스케줄 등록:**
   - `SELECT cron.schedule('nightly-maintenance-job', '0 15 * * *', 'CALL sp_nightly_maintenance()');` (KST 자정 = UTC 15:00)

---

## ✅ 인수 조건 (Acceptance Criteria - GWT Format)

- **Given:** 테스트 데이터베이스에서
- **When:** `CALL sp_nightly_maintenance()`를 직접 호출하면
- **Then:** 14일 경과 나무의 stall_days가 증가하고 만료 카드가 정상 EXPIRED 처리된다.

---

## 🧪 검증 명령어 (Verification Commands)
```bash
npm run test tests/unit/cron-procedure.test.ts
```

---

## 🔗 선행 및 후행 의존 관계 (Dependencies)
- **선행 태스크 (Blockers):** `TASK-212`
- **후행 태스크 (Dependents):** `TASK-404`
