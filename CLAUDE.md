# FinFriends — Claude Code Context

> 공통 규칙은 [`AGENTS.md`](AGENTS.md) 가 SSOT다. **먼저 읽는다.**
> 이 문서는 Claude Code 전용 라우팅(서브에이전트·슬래시 커맨드)만 정의한다.

---

## 1. 시작 전 필독

작업 착수 시 아래를 순서대로 로드한다.

1. [`AGENTS.md`](AGENTS.md) — 스택 · 디렉토리 규약 · 불변식 · 파일 소유권
2. 담당 태스크 명세 — `tasks/step-*/TASK-XXX.md`
3. 필요 시 [`docs/00_PROJECT_DAG_ROADMAP.md`](docs/00_PROJECT_DAG_ROADMAP.md) §3.4 인터페이스 계약

**이 저장소에는 아직 코드가 없다.** 첫 스캐폴딩은 `TASK-101` 담당(Track A)이 수행하며, 그 전까지 다른 트랙은 DAG 외 준비 작업(테스트 러너 구성, shadcn 초기화)만 한다.

---

## 2. 절대 규칙 (요약 — 상세는 AGENTS.md §4)

- 별 원장 쓰기는 **반드시** `services/ledger.service.ts` 의 트랜잭션 헬퍼를 경유한다. `prisma.starLedgerEntry.create()` 직접 호출 금지.
- 모든 mutation 은 `idempotencyKey` 를 받는다. 없는 설계는 반려한다.
- `geolocation` · `latitude` · `longitude` · 별↔현금 전환 식별자를 **어떤 이유로도 코드에 넣지 않는다.**
- 동의 미완료 아동의 진입 경로를 새로 만들지 않는다.
- 타 트랙 소유 파일을 편집하지 않는다 (AGENTS.md §6).

---

## 3. 서브에이전트 라우팅 (`.claude/agents/`)

트랙 = 파일 소유권 단위. 태스크의 트랙에 맞는 에이전트에 위임한다.

| 에이전트 | 담당 태스크 | 사용 시점 |
|---|---|---|
| `track-a-core-auth` | `101` `102` `201` `202` `203` `305` `404` `405` | Prisma 스키마, DTO/Zod, 온보딩·동의, Server Guard, 컴플라이언스 |
| `track-b-ledger-practice` | `204` `205` `206` `207` `208` `301` `304` | 별 원장, 퀴즈, 미션 CRUD, 소급 정산 |
| `track-c-spending-ai` | `103` `209` `210` `211` `303` `306` `402` | Sandbox, 계획 카드, 3단계 대조, Gemini 회고·Fallback |
| `track-d-growth-infra` | `104` `212` `213` `214` `215` `302` `401` `403` | 성장 나무, 월간 숲, 옷장·위시리스트, pg_cron, Skeleton |

수동 호출: `> use the track-b-ledger-practice subagent`

---

## 4. 슬래시 커맨드 (`.claude/commands/`)

| 커맨드 | 목적 |
|---|---|
| `/task-start <이슈번호>` | 이슈 → 명세 로드 → 선행 확인 → 구현 → 검증 → PR 까지 1사이클 |
| `/gate-check <alpha\|beta\|ga>` | 릴리즈 게이트 명령어 번들 일괄 실행 및 판정 |
| `/fix-error` | 에러 발생 시 7단계 구조화 진단 |

---

## 5. 스킬 (`.cursor/skills/`)

Claude Code 는 `.cursor/skills/*/SKILL.md` 를 스킬로 로드한다. 목록과 적용 시점은 [`.cursor/skills/README.md`](.cursor/skills/README.md) 참조.

---

## 6. 새 규칙을 추가할 때

| 성격 | 위치 |
|---|---|
| 항상 적용되는 프로젝트 규칙 | `AGENTS.md` (+ `.cursor/rules/*.mdc` 동기화) |
| 특정 기술 스택의 도메인 지식 | `.cursor/skills/3XX-*/SKILL.md` |
| 반복 실행되는 절차 | `.claude/commands/*.md` |
| 트랙별 작업 전문성 | `.claude/agents/track-*.md` |
