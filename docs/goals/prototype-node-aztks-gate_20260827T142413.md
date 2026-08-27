## 1) 작업 핵심 목표 및 범위

- **목표:** [`docs/00-plan/prototype-execution-plan.md`](../00-plan/prototype-execution-plan.md) 의 **P0~P3** 를 수행해 `AGENTS.md` §3.2 확정 라우트 **13건**을 fixture 기반으로 렌더 가능한 Next.js 프로토타입으로 완성하고, aztks-agent EVALUATE 가 `VERDICT: GO` 이면서 `SCORECARD: A:P Z:P T:P K:P S:P` (5축 전원 PASS) 를 반환하는 상태에 도달한다.
- **시작 지점:** `main` 브랜치 HEAD. 저장소에 애플리케이션 코드가 **아직 하나도 없다.** Node v24.20.0 LTS · npm 11.19.0 은 설치돼 있다.
- **작업 대상:**
  - `package.json` · `tsconfig.json` · `next.config.*` · `eslint.config.*` (P0 스캐폴딩)
  - `app/**` — 라우트 13건 + `layout.tsx` + `globals.css` + `loading.tsx` ×2
  - `components/**` — `StarHUD` · `InactivityBanner` · `components/ui/**`
  - 각 화면 폴더에 co-located 한 `*.fixture.ts`
  - `docs/00-plan/prototype-review-log.md` (AZTKS 라운드 기록)
- **작업 자율성:** 종료 조건 도달까지 사용자 확인 없이 자율 진행한다. **단, `main` 에 머지하지 않는다** — 아래 §2 Git 규약 참조.

### 1.1 전제로 깔고 가는 판단 (실행 지시서 §9 R-P1 = 안 A)

실행 지시서 §9 의 미결정 1건을 **안 A 로 확정하고 진행한다.** 다르게 가야 하면 착수 전에 말해라.

- **P0 는 `TASK-101` 의 스캐폴딩 구간**으로 간주한다 (`CLAUDE.md` §1 준수).
- **P1~P3 의 각 화면은 `AGENTS.md` §6 소유 트랙의 해당 태스크에 귀속**시킨다. 새 티켓을 발행하지 않는다.
- 커밋 메시지의 태스크 ID 는 실행 지시서 §4 인벤토리 표의 담당 Task 를 쓴다.

## 2) 작업 세부 규칙

- **착수 전 로드 (우선순위 순):** `docs/00-plan/prototype-execution-plan.md` (실행 지시서 · SSOT) → `docs/00-plan/prototype-suggestion.md` §4 화면 맵 · §5.3 fixture 규약 · §6 승격 규약 → `AGENTS.md` §2 · §3.2 · §4 · §5-A · §6.
- **정적 HTML 차수의 문서(`visual-prototype-scope.md` · `visual-prototype-spec.md`)는 2026-08-27 저장소에서 삭제됐다.** 화면 명세·토큰·모션·완료 판정은 실행 지시서 §4.3·§5·§8 로 전부 승계됐으므로 **실행 지시서 하나만 읽고 착수한다.** git 이력을 뒤져 삭제된 문서를 복원해 읽지 않는다.

### 2.1 Git 규약 — 여기서 §5-B 가 아니라 §5-A 다

이 작업은 `app/**` 을 만든다. `AGENTS.md` §5 의 각주가 **"`app/**`·`actions/**`·`services/**`·`lib/**`·`prisma/**`·`tests/**` 는 항상 A"** 라고 못 박는다.

- 브랜치: `feat/proto-shell` 에서 시작하고, 단계별로 스택형 분기를 만든다 — `feat/proto-p1-fun` · `feat/proto-p2-clean` · `feat/proto-p3-loop`.
- 커밋: Conventional Commits + **태스크 ID 필수** — 예 `feat(proto): 성장 나무 화면과 fixture 추가 (TASK-212)`.
- **`main` 직접 푸시 금지. 어떤 PR 도 머지하지 않는다.** 단계마다 draft PR 을 열고 다음 단계는 그 브랜치 위에 쌓는다.
- 커밋 전 필수: `npx tsc --noEmit && npm run lint`. P0 완료 후부터는 `npm run build` 도 포함한다.

### 2.2 스캐폴딩 (P0) 에서 반드시 지킬 것

- `npm i prisma` 를 **그대로 실행하지 않는다.** `latest` 태그가 RC(8.0.0-rc.12)를 가리킨다.
  Prisma 를 넣는다면 `prisma@7.10.0` + `@prisma/client@7.10.0` 으로 **명시 고정**한다 (실행 지시서 §2, R-P8).
  *(프로토타입 범위에서는 DB 를 붙이지 않으므로 Prisma 설치 자체를 P0 에서 생략해도 된다 — 생략했다면 그 사실을 로그에 남긴다.)*
- Tailwind v4 를 채택하면 **`tailwind.config.ts` 를 만들지 않는다.** 테마는 `app/globals.css` 의 `@theme` + `@custom-variant` 로 선언한다 (실행 지시서 §5, R-P9).
  이 경우 `AGENTS.md` §6 공유 파일 목록에서 `tailwind.config.ts` 가 빠지므로 **`AGENTS.md` §6 을 함께 갱신**한다. 이것이 이 루프에서 허용되는 유일한 `AGENTS.md` 수정이다.
- `package.json` 에 확정한 버전을 `AGENTS.md` §2 표에 반영한다 (`TASK-101` 의 의무).
- `npm run lint` · `npm run build` 스크립트가 `package.json` 에 존재해야 한다. §3 검증이 이 이름을 쓴다.

### 2.3 화면 작성 규칙

- **라우트를 신설하지 않는다.** `AGENTS.md` §3.2 의 13건이 전부다. 새 라우트가 필요하면 §3.2 를 먼저 고쳐야 하며, 그것은 이 루프의 범위 밖이다.
- fixture 는 화면과 **co-located** 한다 (`app/child/tree/tree.fixture.ts`). `mocks/` · `fixtures/` 같은 최상위 디렉토리를 만들지 않는다 (`AGENTS.md` §3).
- 모든 fixture **첫 줄**에 승격 마커를 넣는다 — `// PROTO-DATA: TASK-212 — ...`. 후행 태스크가 grep 한 번으로 치환 지점을 전수 특정한다.
- 듀얼 테마는 `app/layout.tsx` 가 세그먼트 기준으로 `<html data-mode="fun|clean">` 을 부여해 구현한다. **테마 토글 UI 를 만들지 않는다** (계정 분리 + 부모→아이 단방향).
- 카피는 실제 문구를 쓴다. 로렘입숨 금지. 아동 문구와 보호자 문구를 분리한다 (`AGENTS.md` §5).
- Server Action · DB · 외부 API 를 호출하지 않는다. 이 차수는 전부 fixture 다.

### 2.4 라운드 운영

- 매 AZTKS 평가마다 `docs/00-plan/prototype-review-log.md` 에 아래 4줄 블록을 append 한다.

```
ROUND: <N>
VERDICT: <GO|NO-GO>
SCORECARD: A:<P/C/F> Z:<P/C/F> T:<P/C/F> K:<P/C/F> S:<P/C/F>
TOP_FIX: <에이전트 원문 그대로>
```

- **NO-GO 또는 `C`/`F` 가 하나라도 있으면** `TOP_FIX` 한 건을 먼저 반영하고 다음 라운드로 간다. **평가자가 지적하지 않은 범위를 임의로 확장하지 않는다.**
- **동일 `TOP_FIX` 가 2라운드 연속 반복되면** 해석이 어긋난 것이다. 화면을 더 고치기 전에 실행 지시서의 어느 조항과 충돌하는지 `prototype-review-log.md` 에 `CONFLICT:` 한 줄로 기록하고 지시서 조항을 우선한다.
- **P2 완료 시점에 1차 평가를 돌린다.** `/child/tree` 와 `/parent/forest` 가 둘 다 있어야 "두 모드가 구별되는가" 에 답이 나오고, 여기서 실패하면 P3 를 그릴 이유가 없다.

## 3) 종료 조건 및 종료 방법

- **종료 조건** (아래 중 하나라도 충족되는 순간 루프를 즉시 멈춘다):
  - aztks-agent EVALUATE 가 `VERDICT: GO` 이면서 `SCORECARD` 5축이 전부 `P` (`C`·`F` 0건) 를 반환 → STOP REASON: **PROTOTYPE_GO** *(= 목표 달성. 이 경로로만 완수로 간주한다.)*
  - `VERDICT: NO-GO` 또는 `C`/`F` 를 포함한 평가가 **누적 6회** 기록 → STOP REASON: **EVAL_BUDGET**
  - 평가-진행 라운드(turn = `/goal` 평가자가 진행 상태를 한 번 점검하는 메인 에이전트 응답 사이클) 누적 **60회** 도달 → STOP REASON: **TURN_CAP** (= or stop after 60 turns)

- **종료 방법:**

1) `docs/00-plan/prototype-review-log.md` 마지막 줄에 `STOP REASON: <코드>` 를 덧붙이고 현재 브랜치에 커밋·푸시한다.

2) **빌드 3종 증명** — 세 명령이 모두 exit 0 인 출력을 대화에 남긴다.

```bash
npx tsc --noEmit && npm run lint && npm run build
```

3) **라우트 13건 증명** — 개수와 목록을 함께 대화에 남긴다. 목록이 `AGENTS.md` §3.2 와 **정확히 일치**해야 한다.

```bash
find app -name 'page.tsx' | sed 's|^app||; s|/page.tsx$||' | sort
find app -name 'page.tsx' | wc -l          # 13
```

4) **규제 불변식 증명** (`AGENTS.md` §4 · 실행 지시서 §7). 기대값 `COMPLIANCE PASS`.

```bash
grep -rnE "geolocation|getCurrentPosition|watchPosition|latitude|longitude|convertStarToCash|starToBalance|withdrawStar" \
  app/ components/ && echo "COMPLIANCE FAIL" || echo "COMPLIANCE PASS"
```

5) **fixture 승격 마커 증명** — fixture 파일 수와 `PROTO-DATA:` 마커 수가 **같아야** 한다. 후행 태스크의 grep 전수 특정이 이 등식에 걸려 있다.

```bash
find app -name '*.fixture.ts' | wc -l
grep -rl 'PROTO-DATA:' app/ | wc -l
```

6) **듀얼 테마 토큰 대칭 증명** — 두 모드가 같은 토큰 이름 집합을 갖는지 확인한다. 기대값 exit 0 · `TOKEN PARITY OK`.

```bash
diff <(sed -n '/data-mode="fun"/,/^}/p'   app/globals.css | grep -oE -- '--[a-z-]+' | sort) \
     <(sed -n '/data-mode="clean"/,/^}/p' app/globals.css | grep -oE -- '--[a-z-]+' | sort) \
  && echo "TOKEN PARITY OK"
```

7) **머지 안 함 증명** — 브랜치가 `main` 이 아니고, 열린 PR 이 전부 draft 인 출력을 대화에 남긴다.

```bash
git rev-parse --abbrev-ref HEAD        # main 이 아니어야 한다
git status --porcelain                 # 빈 출력
gh pr list --state open
```

8) `cat docs/00-plan/prototype-review-log.md` 를 실행해 `ROUND:` · `VERDICT:` · `SCORECARD:` · `STOP REASON:` 줄이 보이는 출력을 대화에 남긴다.

9) 종료 사유가 `EVAL_BUDGET` 또는 `TURN_CAP` 이면 **목표 미달성**임을 명시 보고하고, 마지막 `TOP_FIX` 와 남은 `C`/`F` 축을 원문 그대로 인용한다. 미달성을 달성으로 보고하지 않는다.

## 4) 기타 제약조건

- **어떤 PR 도 `main` 에 머지하지 않는다.** `main` 직접 푸시 금지 (`AGENTS.md` §5-A).
- **라우트를 신설하지 않는다.** `AGENTS.md` §3.2 의 13건이 상한이다.
- **수정 금지:** `docs/00-plan/prototype-execution-plan.md`, `docs/00-plan/prototype-suggestion.md`, `docs/00-plan/dag-roadmap.md`, `docs/00-plan/grill-ledger.md`, `docs/00-plan/visual-prototype-*.md`, `docs/goals/**`, `docs/01-prd/**`, `docs/02-srs/**`, `docs/03-tds/**`, `tasks/**`, `CLAUDE.md`, `.claude/**`, `.cursor/**`, `scripts/**`, `.github/**`.
  - `AGENTS.md` 는 §2 버전 표와 §6 공유 파일 목록 **두 곳만** 갱신 가능하다 (§2.2 사유). 그 밖의 절은 건드리지 않는다.
- `services/**` · `actions/**` · `lib/**` · `prisma/**` · `tests/**` 를 만들지 않는다. 이 차수는 화면과 fixture 뿐이다.
- 실 결제망 · Supabase · Gemini 등 **외부 서비스에 연결하지 않는다.** 환경변수·시크릿을 생성하지 않는다.
- `force push` · `reset --hard` · 추적 파일 대량 삭제는 사용자 확인 없이 실행하지 않는다 (`AGENTS.md` §5 공통).
- **REG-001 은 이 프로토타입으로 검증되지 않는다** (`middleware.ts` 부재). `/consent` 전이는 mock 라우팅이다. 화면이 존재한다는 이유로 Alpha Gate 통과로 보고하지 않는다.
- 접근성 감사 · 다중 브레이크포인트 대응 · 실제 Server Action 연결은 범위 밖이다.

## 5) AZTKS 평가 디스패치 규약 (이 목표의 유일한 완수 판정자)

매 평가 라운드마다 **새 `aztks-agent` 서브에이전트**를 띄우고 아래 블록을 그대로 전달한다. 이전 라운드 에이전트를 이어 쓰지 않는다 — 완성본을 매번 처음 보는 눈으로 판정하기 위함이다.

```
MODE: EVALUATE

목표 · 완료 기준:
  이 Next.js 프로토타입이 "FinFriends 라는 서비스의 형태 · 고객 경험 · 가치 전달"을 담은
  사용자 경험 흐름으로 성립하는가. 후행 태스크가 fixture 만 치환해 실개발로 승격할 수 있는가.

대상:
  app/** · components/** · app/globals.css · package.json — 라우트 13건 전체

근거 소스:
  docs/00-plan/prototype-execution-plan.md  §4(화면 인벤토리) §5(토큰) §7(불변식) §8(완료 판정)
  docs/00-plan/prototype-suggestion.md      §4.2(시각 검증 포인트) §6(승격 규약)
  AGENTS.md §3.2(확정 라우트 13건) §4(불변식) §5(에러 문구 분리) §6(파일 소유권)

사전 고지 — 아래는 결함으로 세지 마라:
  · Server Action · DB · 외부 API 연결은 이 차수의 범위 밖이다. 전부 fixture 다.
  · REG-001(미동의 아동 진입 차단)은 middleware.ts 부재로 검증 대상이 아니다.
  · 실제 지출을 기록하는 화면은 없다. Mock Partner Sandbox 자동 대조(TASK-210)가
    계획과 회고 사이를 잇는 서버 로직이며 확정 라우트 13건에 대응 화면이 없다.
  · 접근성 감사 · 다중 브레이크포인트는 범위 밖이다.

5축 해석 (이 대상에 한정):

  A 알아서 — 실행 지시서 §4 의 라우트 13건이 빠짐없이 있고, 각 화면이
             prototype-suggestion.md §4.2 "시각 검증 포인트"를 반영하는가.
             특히 다음 다섯이 화면에 드러나는가.
               · /child/tree — 학습·퀴즈를 다 채워도 실천 0이면 나무가 승급하지 않는다 (AC1)
               · /child/learn — "불리기" 주제 잠금 (ADR-006 · REG-004)
               · /child/quiz/[topic] — 정답 제출 시 별 1개 즉시 지급 피드백
               · /child/retro/[recordId] — 계획 초과 시 별 미지급
               · /parent/missions — 반려 시 별·실천 크레딧 미지급, 5건 이상 시 일괄승인 버튼

  Z 잘     — 실행 지시서 §8 완료 판정 9항에 실제 화면·명령 근거로 답이 나오는가.
               (1) 두 모드가 한눈에 구별되되 같은 서비스로 보이는가
               (2) 아동 화면에서 별이 가장 먼저 눈에 들어오는가
               (3) 보호자 7대 지표가 스크롤 없이 한 화면에 들어오는가
               (4) 회고 3상태가 문구를 읽지 않고도 구별되는가
               (5) 오답 · 반려 · 격려 세 화면의 말투 온도가 같은가
               (6) 나무 4단계가 실루엣만으로 구별되는가
               (7) 코어 루프가 클릭으로 완주되는가
               (8) tsc --noEmit · lint · build 세 명령이 모두 exit 0 인가 — 직접 실행해 확인하라
               (9) AGENTS.md §3.2 에 없는 라우트가 신설되지 않았는가

  T 딱     — 코어 루프가 클릭만으로 끊김 없이 완주되는가:
             퀴즈로 별 획득 → 소비 계획 → AI 회고 → 나무 성장 → 보호자 확인·승인.
             위 "사전 고지"의 부재 항목은 구멍으로 세지 않는다.

  K 깔끔   — 두 가지를 함께 본다.
             (a) 군더더기 없음 — 죽은 컴포넌트·미사용 import 없음, 하드코딩 색·크기 대신
                 토큰 사용, 두 모드의 토큰 이름 집합 동일.
             (b) 규제 불변식 — 하나라도 위반되면 즉시 FAIL (AGENTS.md §4):
                   · /child/plan/new 에 지도 · "현재 위치" 버튼 · 주변 가맹점 목록
                     UI 가 있으면 FAIL (REG-002)
                   · 어느 화면이든 별에 "원화 환산" · "출금" 표기가 있으면 FAIL
                     (REG-005c). 원화 기호로 별 가치를 환산해 보여주는 것도 위반이다
                   · /child/wardrobe 에 사진 업로드 컨트롤이 있으면 FAIL (REG-006)
                   · 금지 식별자가 클래스명 · 변수명 · fixture 필드명 · 주석에 있으면 FAIL —
                     geolocation, getCurrentPosition, watchPosition, latitude,
                     longitude, convertStarToCash, starToBalance, withdrawStar
             (b)는 grep 만으로 판정하지 마라. 화면을 직접 읽어 한국어 표기 · 아이콘 ·
             레이아웃으로 위반이 표현된 경우까지 잡는다.

  S 센스   — prototype-suggestion.md §6 승격 규약대로 후행 태스크가 fixture import 를
             Server Action 호출로 치환하고 마크업은 그대로 둘 수 있는가.
             모든 *.fixture.ts 첫 줄에 PROTO-DATA 마커가 있어 grep 전수 특정이 되는가.
             AGENTS.md §6 파일 소유권 경계를 넘는 파일 배치가 없는가.

출력: 에이전트 정의의 EVALUATE 블록 형식 그대로
  VERDICT / SCORECARD / TOP_FIX / EVIDENCE / NOTES
근거 없는 판정 금지. 화면을 직접 읽고 파일:라인으로, 검증은 실제 명령 출력으로 EVIDENCE 를 단다.
어떤 파일도 수정하지 마라.
```

- 이 디스패치 결과 **`VERDICT: GO` + 5축 전원 `P`** 가 나올 때만 목표 완수로 간주한다. `C` 가 남은 GO 는 완수가 아니다 — aztks-agent 자체 계약(CONCERN 만 있으면 GO)보다 이 목표가 한 단계 엄격하며, 이는 의도된 상위 기준이다.
- 평가자는 읽기 전용이다. aztks-agent 에게 코드 수정 권한을 위임하지 않는다.
