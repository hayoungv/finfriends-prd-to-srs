/goal

## 1) 작업 핵심 목표 및 범위

- **목표:** `docs/00-plan/visual-prototype-spec.md` 가 정의한 **6화면 15프레임 정적 HTML 목업 + `tokens.css`** 를 `docs/00-plan/mockups/` 에 완성하고, aztks-agent EVALUATE 가 `VERDICT: GO` 이면서 `SCORECARD: A:P Z:P T:P K:P S:P` (5축 전원 PASS) 를 반환하는 상태에 도달한다.
- **시작 지점:** `main` 브랜치 HEAD. `docs/00-plan/mockups/` 는 아직 존재하지 않는다.
- **작업 대상 (생성 범위 전부):**
  - `docs/00-plan/mockups/tokens.css`
  - `docs/00-plan/mockups/child-tree.html` (1프레임) · `child-quiz.html` (6) · `child-plan-new.html` (1) · `child-retro.html` (3) · `parent-forest.html` (1) · `parent-missions.html` (3)
  - `docs/00-plan/mockups/README.md`
  - `docs/00-plan/prototype-review-log.md` (AZTKS 라운드 기록)
- **작업 자율성:** 종료 조건에 도달할 때까지 사용자 확인 없이 자율 진행한다. 변경 대상이 `docs/**` 뿐이므로 `AGENTS.md` §5-B 에 따라 **브랜치를 만들지 않고 `main` 에 직접 커밋·푸시**한다.

## 2) 작업 세부 규칙

- **착수 전 로드 (우선순위 순):** `docs/00-plan/visual-prototype-spec.md` (실행 지시서 · 이 작업의 SSOT) → `docs/00-plan/visual-prototype-scope.md` (범위와 제외 근거) → `AGENTS.md` §3.2 · §4 · §5-B · §6.
- **제작 순서는 spec §8 을 따른다.** ① `tokens.css` 초안 + `child-tree.html` (+ 나무 4단계 비교) → ② `parent-forest.html` → **여기서 두 파일을 나란히 놓고 spec §7 판정 1·2·3 을 자체 대조한다. 여기서 실패하면 나머지를 그리지 않고 토큰부터 고친다.** → ③ `child-quiz.html` → ④ `child-retro.html` → ⑤ `parent-missions.html` → ⑥ `child-plan-new.html` → ⑦ `tokens.css` 확정 + `README.md`.

### 2.1 검증 가능성을 위한 규약 (이 작업에서 신설 — §3 검사가 오탐 없이 성립하기 위한 전제)

- **프레임 마커:** 모든 프레임의 루트 요소에 `data-frame="<상태명>"` 을 단다. 전 파일 합계가 **정확히 15개**여야 한다. spec §2.1a 의 나무 4단계 비교 섹션은 프레임이 아니므로 마커를 달지 않는다.
- **CSS 소재 분리 (하드코딩 검사가 공허해지지 않게):**
  - 모드 **무관** 원시값(프레임 폭, 터치 타깃 최소 크기 등)은 `tokens.css` 의 **평범한 `:root { }`** 블록에 토큰으로 선언한다 — `--frame-w` · `--touch` 등.
  - 모드 **의존** 값은 `:root[data-mode="fun"]` · `:root[data-mode="clean"]` 두 블록에만 넣는다 (spec §4 형식 유지).
  - **그 밖의 모든 선택자**(레이아웃 · 컴포넌트 · `@keyframes`)와 모든 `.html` 은 예외 없이 `var(--토큰)` 만 쓴다.
- **수치 리터럴 금지 범위:** `.html` 의 본문 · 캡션 · 라벨 · 주석에 픽셀·밀리초·헥사 색 리터럴을 **문자로도 적지 않는다.** 수치 설명이 필요하면 `README.md` 에만 쓴다.
- **외부 리소스:** 각 `.html` 은 `<link rel="stylesheet" href="tokens.css">` **하나만** 참조한다. `<script>` · 외부 URL · CDN · 웹폰트 링크 금지. 인라인 SVG 에 `xmlns` 속성을 넣지 않는다 (HTML5 에서 불필요하고 외부 URL 검사에 걸린다).
- **프레임 배치:** 여러 프레임은 한 `.html` 안에 가로로 나란히 두고 각 프레임 위에 상태명 라벨을 단다. 뷰포트는 모바일 폭 1종만 본다.
- **카피:** 실제 문구를 쓴다. 로렘입숨 금지. 아동 문구는 아동용 언어, 보호자 문구는 보호자용 언어로 분리한다 (`AGENTS.md` §5).

### 2.2 라운드 운영

- 매 AZTKS 평가마다 `docs/00-plan/prototype-review-log.md` 에 아래 4줄 블록을 append 한다.

```
ROUND: <N>
VERDICT: <GO|NO-GO>
SCORECARD: A:<P/C/F> Z:<P/C/F> T:<P/C/F> K:<P/C/F> S:<P/C/F>
TOP_FIX: <에이전트 원문 그대로>
```

- **NO-GO 또는 `C`/`F` 가 하나라도 있으면** `TOP_FIX` 한 건을 먼저 반영하고 다음 라운드로 간다. **평가자가 지적하지 않은 범위를 임의로 확장하지 않는다.**
- **동일 `TOP_FIX` 가 2라운드 연속 반복되면** 해석이 어긋난 것이다. 목업을 더 고치기 전에 spec 의 어느 조항과 충돌하는지 `prototype-review-log.md` 에 `CONFLICT:` 한 줄로 기록하고 spec 조항을 우선한다.
- **커밋:** `AGENTS.md` §5-B — Conventional Commits, 태스크 ID 없이. 예: `docs(mockups): 듀얼 테마 토큰과 성장 나무 Fun 프레임 추가`. spec §8 의 순서 단위마다 1커밋.
- **푸시 전 게이트:** `bash scripts/sync-skills.sh --check` 와 `bash scripts/check-links.sh` 가 모두 exit 0.

## 3) 종료 조건 및 종료 방법

- **종료 조건** (아래 중 하나라도 충족되는 순간 루프를 즉시 멈춘다):
  - aztks-agent EVALUATE 가 `VERDICT: GO` 이면서 `SCORECARD` 5축이 전부 `P` (`C`·`F` 0건) 를 반환 → STOP REASON: **PROTOTYPE_GO** *(= 목표 달성. 이 경로로만 완수로 간주한다.)*
  - `VERDICT: NO-GO` 또는 `C`/`F` 를 포함한 평가가 **누적 5회** 기록 → STOP REASON: **EVAL_BUDGET**
  - 평가-진행 라운드(turn = `/goal` 평가자가 진행 상태를 한 번 점검하는 메인 에이전트 응답 사이클) 누적 **30회** 도달 → STOP REASON: **TURN_CAP** (= or stop after 30 turns)

- **종료 방법:**

1) `docs/00-plan/prototype-review-log.md` 마지막 줄에 `STOP REASON: <코드>` 를 덧붙이고 `main` 에 커밋·푸시한다.

2) **산출물 존재 증명** — 두 명령의 출력을 대화에 남긴다.

```bash
ls -1 docs/00-plan/mockups/                                    # README.md + tokens.css + .html 6종 = 8개
grep -ho 'data-frame=' docs/00-plan/mockups/*.html | wc -l     # 15
```

3) **규제 불변식 증명** (spec §6) — 출력을 대화에 남긴다. 기대값 `COMPLIANCE PASS`.

```bash
grep -rnE "geolocation|getCurrentPosition|watchPosition|latitude|longitude|convertStarToCash|starToBalance|withdrawStar" \
  docs/00-plan/mockups/ && echo "COMPLIANCE FAIL" || echo "COMPLIANCE PASS"
```

4) **하드코딩 0건 증명** (spec §7 의 교정판 — HTML 엔티티 글리프와 앵커 href 오탐을 먼저 제거한다). 기대값 `OK-HTML` · `OK-CSS`.

```bash
sed -E 's/&#[0-9]+;//g; s/href="#[^"]*"//g' docs/00-plan/mockups/*.html \
  | grep -nE '#[0-9a-fA-F]{3,6}|[0-9]+(px|ms)' && echo "하드코딩 발견(HTML)" || echo "OK-HTML"

sed '/^:root/,/^}/d' docs/00-plan/mockups/tokens.css \
  | grep -nE '#[0-9a-fA-F]{3,6}|[0-9]+(px|ms)' && echo "하드코딩 발견(CSS)" || echo "OK-CSS"
```

두 번째 명령이 `:root` 블록을 지우고 검사하는 이유 — 값의 SSOT 는 거기뿐이고, 그 밖 선택자에 리터럴이 남으면 토큰이 산출물이 되지 못한다.

5) **외부 리소스·토큰 참조 증명** — 앞은 0 matches, 뒤는 빈 출력이어야 한다.

```bash
grep -rnE "https?://|<script|cdn\." docs/00-plan/mockups/*.html
grep -L "tokens.css" docs/00-plan/mockups/*.html
```

6) **토큰 대칭 증명** — 두 모드가 같은 토큰 이름 집합을 갖는지 확인한다. 기대값 exit 0 · `TOKEN PARITY OK`.

```bash
diff <(sed -n '/data-mode="fun"/,/^}/p'   docs/00-plan/mockups/tokens.css | grep -oE -- '--[a-z-]+' | sort) \
     <(sed -n '/data-mode="clean"/,/^}/p' docs/00-plan/mockups/tokens.css | grep -oE -- '--[a-z-]+' | sort) \
  && echo "TOKEN PARITY OK"
```

7) **저장소 게이트** — 두 명령이 exit 0 인 출력을 대화에 남긴다.

```bash
bash scripts/sync-skills.sh --check && bash scripts/check-links.sh
```

8) **변경 범위 증명** — `git status --porcelain docs/00-plan/` 이 **빈 출력**이고, `git log --oneline --stat -1` 이 `docs/00-plan/` 하위 파일만 보여주는 출력을 대화에 남긴다. 전역 `git status` 를 쓰지 않는 이유 — 이 프롬프트가 있는 `docs/goals/` 는 §4 에 의해 이 루프의 수정 금지 대상이라 잔여로 남을 수 있다.

9) `cat docs/00-plan/prototype-review-log.md` 를 실행해 `ROUND:` · `VERDICT:` · `SCORECARD:` · `STOP REASON:` 줄이 보이는 출력을 대화에 남긴다.

10) 종료 사유가 `EVAL_BUDGET` 또는 `TURN_CAP` 이면 **목표 미달성**임을 명시 보고하고, 마지막 `TOP_FIX` 와 남은 `C`/`F` 축을 원문 그대로 인용한다. 미달성을 달성으로 보고하지 않는다.

## 4) 기타 제약조건

- `app/` · `components/` · `package.json` · `tailwind.config.ts` 를 만들지 않는다 (`AGENTS.md` §2 위반, scope §7).
- `node` · `npm` · `npx` · `pnpm` · `yarn` 을 호출하지 않는다. 로컬에 없다 (scope §1 R-P7). 빌드·번들·패키지 설치를 시도하지 않는다.
- **수정 금지:** `docs/00-plan/visual-prototype-spec.md`, `docs/00-plan/visual-prototype-scope.md`, `docs/00-plan/prototype-suggestion.md`, `docs/00-plan/dag-roadmap.md`, `docs/00-plan/grill-ledger.md`, `docs/goals/**`, `docs/01-prd/**`, `docs/02-srs/**`, `docs/03-tds/**`, `tasks/**`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `.claude/**`, `.cursor/**`, `scripts/**`, `.github/**`.
- `docs/00-plan/mockups/**` 와 `docs/00-plan/prototype-review-log.md` **밖의 파일을 생성·수정하지 않는다.**
- `force push` · `reset --hard` · 추적 파일 대량 삭제는 사용자 확인 없이 실행하지 않는다 (`AGENTS.md` §5 공통).
- **REG-001 은 이 목업으로 검증되지 않는다** (`middleware.ts` 부재, spec §6). 화면이 존재한다는 이유로 Alpha Gate 통과로 보고하지 않는다.
- 다중 브레이크포인트 대응 · 접근성 감사 · 상태 전이 동작 구현 · Server Action/DB 연결은 범위 밖이다 (scope §7).

## 5) AZTKS 평가 디스패치 규약 (이 목표의 유일한 완수 판정자)

매 평가 라운드마다 **새 `aztks-agent` 서브에이전트**를 띄우고 아래 블록을 그대로 전달한다. 이전 라운드 에이전트를 이어 쓰지 않는다 — 완성본을 매번 처음 보는 눈으로 판정하기 위함이다.

```
MODE: EVALUATE

목표 · 완료 기준:
  이 정적 목업이 "FinFriends 라는 서비스의 형태 · 고객 경험 · 가치 전달"을 담은
  사용자 경험 흐름으로 성립하는가. 토큰이 P0 로 그대로 승격 가능한가.

대상:
  docs/00-plan/mockups/ 전체 — tokens.css + 정적 HTML 6종 (총 15프레임)

근거 소스:
  docs/00-plan/visual-prototype-spec.md  §2(프레임 명세) §4(토큰) §6(불변식) §7(완료 판정)
  docs/00-plan/visual-prototype-scope.md §5(토큰 축과 방향)
  AGENTS.md §3.2(라우트) §4(불변식) §5(에러 문구 분리)

사전 고지 — 아래는 결함으로 세지 마라:
  · 실제 지출을 기록하는 화면은 존재하지 않는다. Mock Partner Sandbox 자동 대조
    (TASK-210)가 계획과 회고 사이를 잇는 서버 로직이며 AGENTS.md §3.2 의 13라우트에
    대응 화면이 없다. 따라서 "계획 → 회고" 사이의 화면 부재는 FAIL 사유가 아니다.
  · REG-001(미동의 아동 진입 차단)은 middleware.ts 부재로 이 목업의 검증 대상이 아니다.
  · 상태 전이 · 폼 제출 · 라우팅 동작 · 접근성 감사 · 다중 브레이크포인트는 범위 밖이다.

5축 해석 (이 대상에 한정):

  A 알아서 — spec §2 의 15프레임이 빠짐없이 있고, 각 프레임이 근거 TASK 의 AC 를
             시각적으로 반영하는가. 특히 다음 넷이 화면에 드러나는가.
               · child-tree AC1 — 학습·퀴즈를 다 채워도 실천 0이면 나무가 승급하지 않는다
               · child-quiz 프레임1 — "불리기" 주제 잠금
               · child-retro 프레임2 — 계획 초과 시 별 미지급
               · parent-missions 프레임3 — 반려 시 별·실천 크레딧 미지급

  Z 잘     — spec §7 완료 판정 6문항에 실제 화면 근거로 답이 나오는가.
               (1) 두 모드가 한눈에 구별되되 같은 서비스로 보이는가
               (2) 아동 화면에서 별이 가장 먼저 눈에 들어오는가
               (3) 보호자 7대 지표가 스크롤 없이 한 화면에 들어오는가
               (4) 회고 3상태가 문구를 읽지 않고도 구별되는가
               (5) 오답 · 반려 · 격려 세 프레임의 말투 온도가 같은가
               (6) 나무 4단계가 실루엣만으로 구별되는가

  T 딱     — 코어 루프가 프레임 순서만으로 끊김 없이 읽히는가:
             퀴즈로 별 획득 → 소비 계획 → AI 회고 → 나무 성장 → 보호자 확인·승인.
             위 "사전 고지"의 부재 항목은 구멍으로 세지 않는다.

  K 깔끔   — 두 가지를 함께 본다.
             (a) 군더더기 없음 — 하드코딩 색·크기·시간 0건, 외부 리소스 0건,
                 두 모드의 토큰 이름 집합 동일.
             (b) 규제 불변식 — 하나라도 위반되면 즉시 FAIL (spec §6):
                   · child-plan-new.html 에 지도 · "현재 위치" 버튼 · 주변 가맹점 목록
                     UI 가 있으면 FAIL (REG-002)
                   · 어느 화면이든 별에 "원화 환산" · "출금" 표기가 있으면 FAIL
                     (REG-005c). 원화 기호로 별 가치를 환산해 보여주는 것도 위반이다
                   · 아바타에 사진 업로드 컨트롤이 있으면 FAIL (REG-006)
                   · 금지 식별자가 클래스명 · 변수명 · 주석에 있으면 FAIL —
                     geolocation, getCurrentPosition, watchPosition, latitude,
                     longitude, convertStarToCash, starToBalance, withdrawStar
             (b)는 grep 만으로 판정하지 마라. 화면을 직접 읽어 한국어 표기 · 아이콘 ·
             레이아웃으로 위반이 표현된 경우까지 잡는다.

  S 센스   — spec §9 승격 경로대로 P0(Track B/C/D)가 이 산출물을 그대로 받아
             page.tsx + fixture 로 옮길 수 있는 형태 · 기록인가.
             README 가 "열어보는 법"과 spec §7 판정 체크리스트를 갖는가.

출력: 에이전트 정의의 EVALUATE 블록 형식 그대로
  VERDICT / SCORECARD / TOP_FIX / EVIDENCE / NOTES
근거 없는 판정 금지. 화면을 직접 읽고 파일:라인으로 EVIDENCE 를 단다.
어떤 파일도 수정하지 마라.
```

- 이 디스패치 결과 **`VERDICT: GO` + 5축 전원 `P`** 가 나올 때만 목표 완수로 간주한다. `C` 가 남은 GO 는 완수가 아니다 — aztks-agent 자체 계약(CONCERN 만 있으면 GO)보다 이 목표가 한 단계 엄격하며, 이는 의도된 상위 기준이다.
- 평가자는 읽기 전용이다. aztks-agent 에게 목업 수정 권한을 위임하지 않는다.
