# FinFriends

초등 저학년 아동이 **벌기 · 잘 쓰기 · 모으기 · 불리기**를 실천으로 배우고, 보호자가 그 성장을 확인하는 금융교육 서비스입니다.

> 현재 저장소는 **fixture 기반 Next.js UI 프로토타입** 단계입니다. 실제 인증·DB·Server Action·외부 연동은 30개 태스크에 따라 후속 구현합니다.

## 지금 바로 실행하기

요구 런타임은 Node.js `v24.20.0` LTS와 npm `11.19.0`입니다.

```bash
npm install
npm run dev
```

개발 서버: <http://localhost:3000>

| 명령 | 목적 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 검증 |
| `npm run typecheck` | TypeScript strict 검사 |
| `npm run lint` | ESLint 검사 |
| `npm run compliance` | 위치·현금성 전환·얼굴 업로드 금지 식별자 검사 |

## 프로토타입 화면

루트(`/`)는 보호자 온보딩으로 이동합니다. 모든 화면은 [확정 라우트 표](AGENTS.md#32-라우트-규약-13건-확정-신설-금지)를 따릅니다.

| 모드 | 화면 |
|---|---|
| Fun · 아동 | [`/child/tree`](http://localhost:3000/child/tree) · [`/child/learn`](http://localhost:3000/child/learn) · [`/child/quiz/[topic]`](http://localhost:3000/child/quiz/earn) |
| Fun · 아동 | [`/child/missions`](http://localhost:3000/child/missions) · [`/child/plan/new`](http://localhost:3000/child/plan/new) · [`/child/retro/[recordId]`](http://localhost:3000/child/retro/demo) |
| Fun · 아동 | [`/child/stars`](http://localhost:3000/child/stars) · [`/child/wardrobe`](http://localhost:3000/child/wardrobe) · [`/child/wishlist`](http://localhost:3000/child/wishlist) |
| Clean · 보호자 | [`/parent/onboarding`](http://localhost:3000/parent/onboarding) · [`/consent`](http://localhost:3000/consent) |
| Clean · 보호자 | [`/parent/forest`](http://localhost:3000/parent/forest) · [`/parent/missions`](http://localhost:3000/parent/missions) |

주요 시연 흐름은 **퀴즈 정답 → 별 지급**, **계획 입력 → 회고 3상태**, **미션 보고 → 보호자 승인/반려**, **옷장 구매 → 별 차감**입니다.

## 저장소 구조

각 최상위 디렉토리는 하나의 책임만 갖습니다. 상세 배치와 트랙별 파일 소유권은 [`AGENTS.md`](AGENTS.md) §3·§6을 기준으로 합니다.

| 경로 | 책임 | 원본/SSOT |
|---|---|---|
| `app/` | Next.js App Router와 13개 화면 | 화면별 `*.fixture.ts`는 후속 태스크에서 교체 |
| `components/` | 공통 UI 및 아동·보호자 컴포넌트 | `components/ui` 포함 |
| `actions/` | Server Actions | 태스크 구현 예정 |
| `services/` | 순수 도메인 로직·트랜잭션 경계 | 태스크 구현 예정 |
| `lib/` | Prisma·인증·AI·Sandbox·검증·알림 | 태스크 구현 예정 |
| `prisma/` | 스키마·마이그레이션·시드 | 태스크 구현 예정 |
| `types/` | 공통 DTO와 원장 타입 | 태스크 구현 예정 |
| `tests/` | Vitest·Playwright 테스트 | 태스크 구현 예정 |
| `data/` | Seed 원본 JSON | 태스크 구현 예정 |
| `docs/` | 제품·요구사항·설계·실행 문서 | [`docs/README.md`](docs/README.md) |
| `tasks/` | 30개 구현 태스크 명세 | [`tasks/README.md`](tasks/README.md) |
| `scripts/` | 링크·스킬·컴플라이언스 자동 검사 | 스크립트 자체가 실행 규약 |
| `.claude/` | Claude Code 원본 스킬·에이전트·커맨드 | `.claude/skills`가 스킬 원본 |
| `.cursor/` | Cursor 규칙·스킬 파생본 | `scripts/sync-skills.sh`로 동기화 |
| `.codex/` | Codex 트랙 에이전트 설정 | Codex 전용 |
| `.github/` | GitHub 이슈 템플릿·협업 설정 | GitHub 전용 |

## 문서 읽는 순서

문서의 질문이 겹치지 않도록 다음 계층을 사용합니다.

1. [`docs/01-prd/prd.md`](docs/01-prd/prd.md) — 왜 만드는가
2. [`docs/02-srs/srs.md`](docs/02-srs/srs.md) — 무엇을 만족해야 하는가
3. [`docs/03-tds/tds.md`](docs/03-tds/tds.md) — 어떻게 설계하는가
4. [`docs/00-plan/dag-roadmap.md`](docs/00-plan/dag-roadmap.md) — 누가·언제·어떤 순서로 실행하는가
5. [`tasks/step-*/TASK-XXX.md`](tasks/) — 개별 태스크를 어떻게 구현·검증하는가
6. [`AGENTS.md`](AGENTS.md) — 모든 에이전트가 반드시 지키는 규칙

프로토타입 작업의 실행 기준은 [`docs/00-plan/prototype-execution-plan.md`](docs/00-plan/prototype-execution-plan.md), 완료 기록은 [`docs/00-plan/prototype-review-log.md`](docs/00-plan/prototype-review-log.md)입니다.

## 제품 흐름과 기술 원칙

```text
계획 카드 → 결제 원장 → 3단계 대조 → AI 회고 → 실천 인정 → 별 지급 → 나무 갱신 → 월간 숲
```

- Next.js App Router 단일 풀스택, TypeScript strict
- Prisma + Supabase PostgreSQL, Server Actions + Route Handlers
- Tailwind CSS 듀얼 테마: 아동 Fun / 보호자 Clean
- Gemini 회고는 2.5초 타임아웃과 결정론적 Fallback 필수
- 별 원장은 멱등성과 `balance_after` 불변식을 보장
- 위치정보·아동 얼굴 이미지·별의 현금성 전환은 지원하지 않음
- Vercel Hobby + Supabase Free 기준 월 비용 `$0`

## 개발 규칙

- 모든 변경은 [`AGENTS.md`](AGENTS.md)를 먼저 읽고 담당 태스크의 SSOT를 따른다.
- Server Action은 Zod 입력 검증과 `services/` 경계를 거친다.
- 태스크 구현 순서는 Contract → Logic → Test → NFR이며, 태스크 본문의 GWT와 검증 명령을 준수한다.
- `.claude/skills/`만 직접 수정하고 `.cursor/skills/`는 동기화 스크립트로 갱신한다.
- `main` 직접 푸시는 금지하며, 태스크 구현은 `feat/TASK-XXX-<slug>` 브랜치와 PR을 사용한다.

## 현재 상태

| 영역 | 상태 |
|---|---|
| P0~P3 UI 프로토타입 13개 라우트 | ✅ 완료 |
| 타입체크·Lint·Compliance·Build 게이트 | ✅ 통과 |
| 실제 Prisma·인증·Server Actions | ⏳ `TASK-101`~ 구현 예정 |
| Vitest·Playwright 테스트 | ⏳ `TASK-301`~ 구현 예정 |
| Alpha/Beta/General Release | ⏳ 도메인 구현 후 진행 |

프로토타입 최종 판정과 검증 근거는 [`prototype-review-log.md`](docs/00-plan/prototype-review-log.md)의 Round 4에 기록되어 있습니다.
