# FinFriends — Agent Instructions (SSOT)

> 크로스툴 전역 규칙 파일. Cursor · Claude Code 가 공통으로 로드하는 **규칙의 원본(SSOT)** 이다.
> Claude Code 전용 라우팅은 [`CLAUDE.md`](CLAUDE.md), 스킬 원본은 [`.claude/skills/`](.claude/skills/), 도구별 배치 규약은 아래 §3.1 을 따른다.

---

## 0. 이 저장소의 현재 상태

**아직 애플리케이션 코드가 없다.** 저장소는 명세(`docs/`)와 태스크(`tasks/`)만 보유한다.
첫 커밋으로 코드를 넣는 에이전트는 아래 §3 디렉토리 규약을 **그대로** 따른다 — 이 규약은 30개 태스크 명세의 `변경 대상 파일` 전수에서 역산된 것이며, 임의 변경 시 병렬 트랙 간 파일 소유권(§6)이 깨진다.

---

## 1. Project Overview

**Vision** — 초등 저학년 아동이 「벌기 · 잘 쓰기 · 모으기 · 불리기」 4영역을 실천으로 배우고, 보호자가 그 성장을 **눈으로 확인**하는 금융 교육 서비스.

**북극성 KPI** — **WPA** (Weekly Practicing Actives): 주차 w 동안 실천 트리거로 별을 1회 이상 받은 아동 / 활성 아동. ISO 주(월~일) · KST 기준.

**핵심 도메인 흐름** (TDS §0.1-6)
```
계획 카드 → 결제 원장 → 3단계 대조 → AI 회고 → 실천 인정 → 별 지급 → 나무 갱신 → 월간 숲
```

**MVP 범위** — 30개 태스크(`TASK-101`~`TASK-405`), 20.5 MD, 4트랙 병렬 6.0 MD.
근거 문서: [`docs/00_PROJECT_DAG_ROADMAP.md`](docs/00_PROJECT_DAG_ROADMAP.md)

---

## 2. Technical Stack

> ⚠️ **버전은 아직 고정되지 않았다 `[OPEN]`.** 최초 스캐폴딩 태스크(`TASK-101` 담당 에이전트)가 `package.json` 에 확정하고 본 문서를 갱신한다. 확정 전까지 임의 버전을 가정하고 코드를 쓰지 않는다.

| 레이어 | 선택 | 근거 |
|---|---|---|
| 프레임워크 | **Next.js App Router 단일 풀스택** (RSC + Server Actions) | ADR-009 |
| 언어 | TypeScript (strict) | — |
| ORM / DB | **Prisma + Supabase PostgreSQL** (pgbouncer 6543 / direct 5432 분리) | ADR-009 |
| 검증 | **Zod** — 모든 Server Action 입력 | SRS §10 |
| AI | **Vercel AI SDK + Google Gemini 1.5 Flash** | ADR-010 |
| 배치 | **Supabase `pg_cron`** + Lazy Evaluation | ADR-011 |
| 외부 연동 | **내장형 Mock Partner Sandbox** (Route Handler) — 실 결제망 미연동 | ADR-005, ADR-012 |
| UI | **Tailwind CSS + shadcn/ui** (아동/보호자 듀얼 테마) | ADR-013 |
| 테스트 | **Vitest**(unit·integration) + **Playwright**(E2E) | TDS §27 |
| 알림 | **Web Push API (VAPID)** — 무료 브라우저 푸시 | REQ-FUNC-012 |
| 인프라 | **Vercel Hobby + Supabase Free** — **청구액 $0 가 제약조건** | REQ-NF-012 |

**금지 스택** — 별도 백엔드 서버, 유료 매니지드 큐/캐시, 유료 APM, 위치 기반 SDK. $0 제약과 ADR-009(단일 풀스택)를 위반한다.

---

## 3. 디렉토리 규약 (변경 금지)

```
app/            # App Router — app/parent/**, app/child/**, app/api/v1/sandbox/**
actions/        # Server Actions — 도메인당 1파일 (ledger, practice, plan, retro, growth …)
services/       # 순수 도메인 로직 — *.service.ts, DB 트랜잭션 경계
lib/            # prisma.ts, auth/**, ai/**, sandbox/**, validations/**, db/**, notification/**
types/          # domain.ts, ledger.ts — 공통 DTO
components/     # ui/**(shadcn), parent/**, child/**
prisma/         # schema.prisma, migrations/**, seed.ts
data/           # curriculum.json, wardrobe_items.json — Seed 원본
tests/          # unit/**, integration/**, e2e/**
scripts/        # verify-compliance.ts, sync-skills.sh
```

**레이어 호출 방향** — `app → actions → services → lib/prisma`. 역방향 호출 금지.
Server Action 에서 Prisma 를 직접 호출하지 않는다. 반드시 `services/*.service.ts` 를 경유한다.

---

## 3.1 저장소 배치 — 원본과 파생 (중복 금지)

같은 내용이 두 곳에 있으면 **반드시 한쪽이 원본이고 다른 쪽은 기계 생성 파생본**이다.
원본이 아닌 곳을 편집하면 다음 동기화에서 소실된다.

### 지식 계층 — 각 축은 한 곳에만 산다

| 축 | 소유 위치 | 답하는 질문 | 여기에 없어야 할 것 |
|---|---|---|---|
| **제품·요구사항·설계** | `docs/01_PRD` · `docs/02_SRS` · `docs/03_TDS` | 왜 · 무엇을 만드는가 | 실행 순서, 담당, 파일 경로 |
| **실행 계획** | `docs/00_PROJECT_DAG_ROADMAP.md` | 누가 · 언제 · 어떤 순서로 | 개별 태스크 구현 상세 |
| **태스크** | `tasks/` | 어떤 단위로 · 어떻게 구현하는가 | 요구사항 정의 원문 |
| **에이전트 규칙** | `AGENTS.md` (본 문서) | 모든 도구가 지켜야 할 것 | 도구 전용 설정 |
| **도구 라우팅** | `CLAUDE.md` | Claude Code 가 무엇을 언제 부르는가 | 공통 규칙 재서술 |

`tasks/` 내부 역할 경계:

| 파일 | 소유 속성 |
|---|---|
| `tasks/README.md` | 30건 인덱스 · 명세 파일 링크 |
| `tasks/00_TASK_LIST.md` | 4단계 원칙 · 태스크별 설명 · 공수 · REQ 매핑 |
| `tasks/00_PARALLEL_GANTT.md` | 병렬 간트 · 동시 실행 보드 |
| `tasks/step-N/TASK-XXX.md` | **개별 태스크 SSOT** — Target Files · GWT · 검증 명령어 |

> 값이 충돌하면 **`tasks/step-N/TASK-XXX.md` → `docs/00_PROJECT_DAG_ROADMAP.md` → 나머지** 순으로 신뢰한다.

### 하네스 계층 — 원본 1곳 + 파생

| 자산 | 원본 | 파생본 | 생성 방법 |
|---|---|---|---|
| 프로젝트 규칙 | `AGENTS.md` | `.cursor/rules/*.mdc` | 수동 반영 (Cursor 전용 frontmatter 때문) |
| 도메인 스킬 12건 | `.claude/skills/` | `.cursor/skills/` | `bash scripts/sync-skills.sh` |
| 서브에이전트 4건 | `.claude/agents/` | — | Claude Code 전용 |
| 슬래시 커맨드 3건 | `.claude/commands/` | — | Claude Code 전용 |

**드리프트 검사** — 커밋 전 `bash scripts/sync-skills.sh --check` 가 통과해야 한다.

> ⚠️ `.claude/skills/` 가 스킬 원본이다. Claude Code 는 `.cursor/skills/` 를 **읽지 않는다.**
> `.agents/` 는 `.cursor/` 와 100% 중복이라 제거했다. Codex·Antigravity 지원을 되살리려면
> `.agents/{rules,skills}/` 를 파생본으로 추가하고 위 표와 `sync-skills.sh` 에 등록한다.

---

## 4. 절대 불변식 (Non-Negotiable Invariants)

> 아래 6건은 **규제·정합성 요구사항**이며 위반 시 릴리즈 게이트에서 빌드가 차단된다.
> 코드 리뷰가 아니라 **자동 검사로 강제**한다. 상세: [`.cursor/rules/004-regulatory-invariants.mdc`](.cursor/rules/004-regulatory-invariants.mdc)

| ID | 불변식 | 강제 수단 |
|---|---|---|
| **REG-001** | 법정대리인 동의 완료 전 아동 화면 진입 **차단율 100%** | `middleware.ts` Server Guard + E2E |
| **REG-005a** | 별 원장 `balance_after(n) = balance_after(n-1) + delta(n)` **오차 0** | DB 제약 + 단위 테스트 |
| **REG-005b** | 모든 지급/차감은 `idempotencyKey` **UNIQUE** — 재요청 시 신규 행 생성 금지, 기존 결과 반환 | Prisma `@@unique` + 트랜잭션 |
| **REG-005c** | **별 ↔ 현금성 잔액 전환 함수·필드가 코드에 존재하지 않는다** | 정적 스캔 |
| **REG-002** | 위치정보: 권한·좌표 컬럼·geolocation 호출 **전부 0건** | 정적 스캔 (3계층) |
| **REG-006** | 아동 얼굴 이미지 업로드 엔드포인트 **0건** | 정적 스캔 |

**금지 식별자** — 아래 문자열이 코드에 등장하면 `npm run compliance` 가 실패한다:
`geolocation` · `getCurrentPosition` · `watchPosition` · `latitude` · `longitude` · `convertStarToCash` · `starToBalance` · `withdrawStar`

---

## 5. Development Guidelines

### 코드 스타일
- TypeScript **strict**. `any` 금지 — 불가피하면 `unknown` + 타입 가드.
- Server Action 은 `'use server'` 최상단, 입력은 **반드시 Zod 스키마로 파싱**한 뒤 사용한다.
- 금액·별 수량은 **정수(Int)** 로만 다룬다. 부동소수점 금지.
- 시각은 **UTC 저장 / KST 표시**. 주차 귀속은 ISO 주(월~일) KST.
- 주석은 **WHY 만** 남긴다. WHAT 은 코드와 타입으로 표현한다.

### 에러 처리
- 사용자 노출 메시지는 **아동용 언어**와 보호자용 언어를 분리한다 (TDS §23.2).
- 외부 연동(Partner Gateway·Gemini) 실패는 **정상 분기**로 취급한다. 예외를 그대로 던지지 않는다.
- Gemini 는 **2.5s 타임아웃 + 결정론적 룰 템플릿 Fallback** 이 의무다 (ADR-010).

### 테스트 기준
| 층 | 도구 | 필수 대상 |
|---|---|---|
| Static | `tsc --noEmit`, `lint`, `compliance` | 전 커밋 |
| Unit | Vitest | 별 원장 · 성장 나무 · 3단계 대조 판정 로직 |
| Integration | Vitest | 소급 정산 · 스냅샷 보정 |
| E2E | Playwright | 동의 차단 · 결제→AI 회고→별 지급 전 여정 |

- **인수 조건은 태스크 명세의 GWT 문장이 SSOT다.** 테스트 이름을 GWT 시나리오명과 일치시킨다.
- 구현 태스크와 검증 태스크는 **페어**다 (`204↔301`, `212↔302`, `210↔303`). 페어가 통과하기 전 다음 태스크로 넘어가지 않는다.

### Git 워크플로우
- 브랜치: `feat/TASK-XXX-<slug>` · `fix/…` · `docs/…` · `refactor/…` · `test/…`
- 커밋: Conventional Commits + **태스크 ID 필수** — `feat(ledger): 멱등 지급 엔진 구현 (TASK-204)`
- PR 본문에 `Closes #<이슈번호>` 를 넣어 이슈를 자동 종료한다.
- `main` 직접 푸시 금지. force push · `reset --hard` 는 사용자 확인 없이 실행하지 않는다.
- 커밋 전 필수: `npx tsc --noEmit && npm run lint && npm run compliance`

---

## 6. 병렬 트랙 파일 소유권 (충돌 방지)

4개 에이전트가 동시에 작업한다. **타 트랙 소유 파일을 편집하지 않는다.**

| 트랙 | 배타 소유 |
|:-:|---|
| **A** Core·Auth·Consent | `prisma/schema.prisma`, `lib/prisma.ts`, `types/domain.ts`, `lib/validations/**`, `actions/onboarding.ts`, `lib/auth/**`, `services/account.service.ts`, `middleware.ts`, `lib/notification/**`, `scripts/verify-compliance.ts` |
| **B** Ledger·Practice | `actions/ledger.ts`, `actions/learning.ts`, `actions/practice.ts`, `types/ledger.ts`, `services/{ledger,quiz,mission,backfill}.service.ts` |
| **C** Spending·AI | `app/api/v1/sandbox/**`, `lib/sandbox/**`, `actions/{plan,retro}.ts`, `services/{plan,reconciliation}.service.ts`, `lib/ai/**` |
| **D** Growth·Infra | `prisma/seed.ts`, `data/**`, `actions/{growth,wardrobe,wishlist}.ts`, `services/{growth,forest,wardrobe,wishlist}.service.ts`, `lib/db/**`, `components/ui/skeleton.tsx` |

**공유 파일 프로토콜** — `package.json` 과 `prisma/schema.prisma` 는 유일한 충돌 지점이다.
의존성 추가가 필요하면 **직접 편집하지 말고** 이슈에 코멘트로 요청한 뒤 Track A 가 일괄 반영한다.

---

## 7. 작업 실행 루프 (DoD)

1. **이슈를 연다** — 이슈 본문의 `🗺 실행 메타`에서 트랙·웨이브·Slack·선행 태스크를 확인한다.
2. **명세를 정독한다** — `tasks/step-*/TASK-XXX.md` 의 `Target Files` · `Acceptance Criteria (GWT)`.
3. **선행 태스크 완료를 확인한다.** 미완이면 §3.5 Stub-First 규약(총괄 문서)을 따르고, 임의 구현하지 않는다.
4. **구현한다** — 소유 파일 범위 밖으로 나가지 않는다.
5. **명세 하단 `Verification Commands` 를 실행한다.** 실패 시 자가 수정 후 재실행.
6. **커밋 → PR → `Closes #N`.**
7. Slack 0 (임계) 태스크가 지연되면 **즉시 이슈에 코멘트로 에스컬레이션**한다.

---

## 8. 참조 문서

| 문서 | 용도 |
|---|---|
| [`docs/01_PRD/`](docs/01_PRD/) | 왜 만드는가 · KPI 정의 |
| [`docs/02_SRS/`](docs/02_SRS/) | 요구사항 ID(`REQ-*`·`REG-*`) · ADR |
| [`docs/03_TDS/`](docs/03_TDS/) | ERD · 시퀀스 · 알고리즘 · 무결성 규칙 |
| [`docs/00_PROJECT_DAG_ROADMAP.md`](docs/00_PROJECT_DAG_ROADMAP.md) | 트랙·웨이브·임계경로·게이트 |
| [`docs/prototype-suggestion.md`](docs/prototype-suggestion.md) | 시각 프로토타이핑 선별안 (제안, 미승인) |
| [`tasks/`](tasks/) | 태스크 30건 구현 명세 (SSOT) |
| [`.claude/skills/README.md`](.claude/skills/README.md) | 도메인 스킬 12건 색인 · 적용 시점 |
