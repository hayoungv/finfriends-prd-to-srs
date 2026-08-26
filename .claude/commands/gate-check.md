---
description: 릴리즈 게이트 명령어 번들 일괄 실행 및 통과 판정
argument-hint: alpha | beta | ga
allowed-tools: Bash, Read, Grep
---

# Release Gate Check — $ARGUMENTS

> 게이트는 **자동 명령어 결과로만 판정**한다. 하나라도 실패하면 다음 웨이브를 착수하지 않는다 (원칙 P5).
> 근거: `docs/00-plan/dag-roadmap.md` §5

## Alpha Gate (MD 4.5) — 규제 · 원장 · 나무
```bash
npx tsc --noEmit && npm run lint \
  && npm run test tests/unit/ledger.test.ts \
  && npm run test tests/unit/growth.test.ts \
  && npm run test tests/unit/reconciliation.test.ts \
  && npx playwright test tests/e2e/onboarding.spec.ts
```
| # | 통과 기준 |
|---|---|
| A-1 | 미동의 아동 URL 직접 접근 **차단율 100%** (REG-001) |
| A-2 | 동일 `idempotencyKey` 5회 동시 호출 → **지급 1회** (REG-005) |
| A-3 | `balance_after(n) = balance_after(n-1) + delta(n)` **오차 0건** |
| A-4 | 학습10+실천0 → 승급 불가 / 13일 미판정 / 14일 넛지 |
| A-5 | 업종 불일치 시 가맹점명 Fallback, 예산 초과 시 **별 미지급** |
| A-6 | 컴파일 에러 0건 |

## Beta Gate (MD 6.0) — AI · 숲 · 소급 정산
```bash
npm run test tests/integration/backfill.test.ts \
  && npm run test tests/unit/forest.test.ts \
  && npm run test tests/unit/fallback-engine.test.ts \
  && npm run test tests/unit/cron-procedure.test.ts \
  && npx playwright test tests/e2e/spending-loop.spec.ts \
  && npm run build
```
| # | 통과 기준 |
|---|---|
| B-1 | 지난달 미션 승인 → 해당 월 Cycle 귀속 + 스냅샷 보정 |
| B-2 | 계획→결제→피드백→별 전 여정 성공, **2.5s 이내** |
| B-3 | Gemini 429/Timeout 주입 → 룰 템플릿 **100% 전환** |
| B-4 | 월간 숲 7대 지표 전항 집계 |
| B-5 | `pg_cron` 정체 일수·미접속 플래그 정상 갱신 |
| B-6 | Skeleton 즉시 노출, 프로덕션 빌드 성공 |

## General Release Gate (MD 6.5) — 컴플라이언스 · 알림 · $0
```bash
npm run compliance \
  && npm run test tests/unit/notification.test.ts \
  && npm run test && npx playwright test
```
| # | 통과 기준 |
|---|---|
| G-1 | `geolocation`·`getCurrentPosition`·`watchPosition` **탐지 0건** (REG-002) |
| G-2 | 이미지 업로드 엔드포인트 **탐지 0건** (REG-006) |
| G-3 | Web Push 발송 및 인앱 배너 정상 |
| G-4 | Unit + Integration + E2E **전건 통과** |
| G-5 | Vercel Hobby + Supabase Free **청구액 0원** — 대시보드 육안 검증 |

## 보고 형식
각 항목을 `✅ / ❌` 로 판정하고, 실패 항목은 **명령어 출력 원문**과 함께 보고한다.
통과하지 않은 것을 통과했다고 보고하지 않는다. G-5 는 수동 확인 항목임을 명시한다.
