# [실행 지시서] Next.js 시각 프로토타입 — Node 확정판

- **문서 ID:** PROTO-NODE-FINFRIENDS-001
- **버전:** 1.0
- **작성일:** 2026-08-27
- **상위 문서:** [`prototype-suggestion.md`](prototype-suggestion.md) — 선별 기준 · 라우트 13건 · 소유권 배정의 SSOT
- **대체 대상:** `visual-prototype-scope.md`(폐기·삭제) (전제 소멸) · `visual-prototype-spec.md`(폐기·삭제) (프레임 명세는 §4 로 승계)
- **성격:** 실행 지시서. **차단 1건 잔존** — §9 R-P1 은 오케스트레이터 판단이 필요하다.

---

## 0. 무엇이 바뀌었나

2026-08-27 Node LTS 를 사용자 전역으로 설치해 **R-P7 이 해소**됐다. 정적 HTML 차수의 존재 이유는
"Node 가 없으니 브라우저로 열리는 것만 만든다" 였고, 그 전제가 사라졌다.

| 축 | 정적판 (`visual-prototype-spec.md`) | **Node 확정판 (이 문서)** |
|---|---|---|
| 산출물 | `docs/00-plan/mockups/*.html` — P0 착수 시 **폐기** | `app/**` 실파일 — 후행 태스크가 **fixture 만 치환**하고 마크업은 승계 |
| 상태 표현 | 한 `.html` 에 프레임을 **나란히 배치** | 실제 클릭 전이. 퀴즈 6프레임이 진짜 6단계 인터랙션이 된다 |
| 토큰 | `tokens.css` CSS 변수 | `app/globals.css` 의 `@theme` — Tailwind v4 는 config 파일을 쓰지 않는다 (§5) |
| 범위 | 6화면 15프레임 | **라우트 13건 전부** (`AGENTS.md` §3.2 확정분) |
| 검증 | `grep` 만 가능 | `tsc --noEmit` · `lint` · `build` · Playwright 셀렉터 선작성 |
| 공수 | 8.0h (0.5 MD) | **2.5 MD** — 정적판 8h 는 P0 토큰 작업에 흡수돼 순증이 아니다 |

> **정적판이 헛일이 되지 않는다.** `visual-prototype-spec.md` §4 토큰 표와 §7 완료 판정 6문항은
> 값과 판정 기준 그대로 이 문서 §5·§8 로 승계된다. 바뀐 것은 **담는 그릇**뿐이다.

---

## 1. 확정된 런타임 (R-P7 해소)

| 항목 | 값 |
|---|---|
| Node.js | **v24.20.0 LTS** (Krypton) |
| npm | 11.19.0 · npx 11.19.0 · corepack 0.35.0 |
| 설치 위치 | `%LOCALAPPDATA%\Programs\nodejs` — **사용자 전역**, 관리자 권한 불필요 |
| PATH | 사용자 환경변수에 영구 등록. PowerShell · Git Bash 양쪽에서 인식 |
| 전역 패키지 prefix | `%APPDATA%\npm` — Node 를 교체해도 전역 설치분이 보존된다 |
| 무결성 | 공식 `SHASUMS256.txt` SHA-256 대조 통과 |

```bash
node -v   # v24.20.0
npm -v    # 11.19.0
```

---

## 2. 스택 버전 — `TASK-101` 이 `package.json` 에 확정할 후보

`AGENTS.md` §2 는 버전을 `[OPEN]` 으로 두고 **`TASK-101` 담당이 확정**하도록 한다. 이 문서는 확정하지 않고,
설치 시점(2026-08-27)의 npm registry 조회 결과를 **근거로 남긴다.**

| 패키지 | latest | 채택 시 주의 |
|---|---|---|
| `next` / `create-next-app` | **16.3.3** | React 19 peer 요구 |
| `react` · `react-dom` | 19.2.8 | — |
| `typescript` | **7.0.2** | 메이저 전환. `tsc --noEmit` 동작은 동일하나 strict 옵션 거동 차이를 P0 에서 1회 확인한다 |
| `tailwindcss` | **4.3.3** | **v4 는 CSS-first.** §5 참조 — `tailwind.config.ts` 를 만들지 않는다 |
| `prisma` (CLI) | ⚠️ `8.0.0-rc.12` | **`latest` 태그가 RC 다.** 그대로 설치하면 RC 가 들어온다 |
| `@prisma/client` | 7.10.0 | CLI 와 메이저가 어긋난다 → **양쪽 `7.10.0` 으로 명시 고정**한다 (`prisma@prev` = 7.10.0) |
| `zod` | 4.4.3 | — |
| `vitest` | 4.1.11 | — |
| `@playwright/test` | 1.62.1 | `next@16` 이 peer 로 `^1.51.1` 을 선언 |
| `ai` (Vercel AI SDK) | 7.0.83 | — |
| `@ai-sdk/google` | 4.0.54 | Gemini 어댑터 |
| `eslint` | 10.9.1 | — |

> ⚠️ **`npm i prisma` 를 그대로 실행하지 않는다.** `prisma@latest` 가 RC 를 가리키므로
> `npm i -D prisma@7.10.0` · `npm i @prisma/client@7.10.0` 으로 **명시 고정**한다.
> 이 한 줄이 없으면 `TASK-101` 이 RC 스키마 엔진 위에 전체 DAG 를 얹게 된다.

---

## 3. 단계 구성 (총 2.5 MD)

`prototype-suggestion.md` §5.1 을 그대로 승계하되, 완료 판정을 **실행 가능한 명령**으로 교체했다.

| 단계 | 명칭 | 공수 | 선행 | 산출물 | 완료 판정 (실명령) |
|:--:|---|:--:|---|---|---|
| **P0** | 토대 — 스캐폴딩 & 듀얼 테마 | 0.5 MD | 없음 | Next.js App Router 스캐폴딩, shadcn/ui 초기화, `app/globals.css` `@theme` 듀얼 토큰, `app/layout.tsx` 공통 셸, `components/ui/skeleton.tsx` | `npm run build` exit 0 · 동일 컴포넌트가 `data-mode` 전환만으로 두 테마로 분기 |
| **P1** | Fun Mode 뼈대 | 1.0 MD | P0 | 라우트 #1~#7 + `StarHUD` | `find app/child -name page.tsx \| wc -l` = 7 · fixture 만으로 렌더 |
| **P2** | Clean Mode 뼈대 | 0.5 MD | P0 | 라우트 #10~#13 + `InactivityBanner` | `find app/parent app/consent -name page.tsx \| wc -l` = 4 |
| **P3** | 루프 연결 & 로딩 | 0.5 MD | P1 · P2 | `plan → retro` mock 전이, `loading.tsx` ×2, 라우트 #8·#9 | 계획→회고 3상태 전환이 **클릭으로 시연** · 라우트 13건 전부 존재 |

**P0 · P1 을 Wave 0 유휴에 흡수**하면 실질 순증은 약 1.0 MD 다 (`prototype-suggestion.md` §5.1·§5.2).

> **P0 와 `TASK-101` 의 관계 — CLAUDE.md 와의 충돌을 여기서 정리한다.**
> `prototype-suggestion.md` §5.1 은 "P0 는 `TASK-101` 불필요" 라 하고, `CLAUDE.md` §1 은
> "첫 스캐폴딩은 `TASK-101` 담당(Track A)이 수행" 이라 한다. **둘 다 살리려면 P0 를 `TASK-101` 의
> 스캐폴딩 구간으로 흡수**하고 Track A 가 수행하는 것이 유일한 무모순 해석이다. §9 R-P1 참조.

---

## 4. 화면 인벤토리 — 15프레임이 어디로 가는가

정적판 6화면 15프레임은 **라우트 13건 중 6건**을 덮는다. 나머지 7건은 P1~P3 순증분이다.

### 4.1 정적 프레임 → Node 라우트 승계표

| 정적 파일 (spec §2) | 프레임 | Node 라우트 | 상태 표현 방식 | 단계 |
|---|:--:|---|---|:--:|
| `child-tree.html` | 1 | `/child/tree` | `tree.fixture.ts` 1종 | P1 |
| `child-quiz.html` 프레임1 | 1 | **`/child/learn`** | 4주제 카드 · "불리기" 잠금 | P1 |
| `child-quiz.html` 프레임2~6 | 5 | **`/child/quiz/[topic]`** | 학습카드 → 문제 → 정답/오답 → 별 보상. **클라이언트 상태 전이** | P1 |
| `child-plan-new.html` | 1 | `/child/plan/new` | 3필드 폼 | P1 |
| `child-retro.html` | 3 | `/child/retro/[recordId]` | `?variant=praise\|encourage\|fallback` 으로 3상태 시연 | P1 |
| `parent-forest.html` | 1 | `/parent/forest` | `forest.fixture.ts` | P2 |
| `parent-missions.html` | 3 | `/parent/missions` | 승인·반려 액션으로 **실제 전이** | P2 |
| | **15** | **7 라우트** | | |

> ⚠️ **정적판의 오류 1건을 여기서 교정한다.** 정적 지침서 §2.2 는 주제 목록을
> `child-quiz.html` 에 묶었으나, `AGENTS.md` §3.2 확정 라우트는 `/child/learn` 과
> `/child/quiz/[topic]` 을 **분리**한다 (`prototype-suggestion.md` §4.2 #2·#3).
> Node 판은 확정 라우트를 따른다.

### 4.2 순증 라우트 7건

| # | 라우트 | 모드 | Task | 트랙 | 단계 |
|:--:|---|:--:|:--:|:--:|:--:|
| 4 | `/child/missions` | Fun | `207` | B | P1 |
| 7 | `/child/stars` (+ `StarHUD`) | Fun | `205` | B | P1 |
| 8 | `/child/wardrobe` | Fun | `214` | D | P3 |
| 9 | `/child/wishlist` | Fun | `215` | D | P3 |
| 10 | `/parent/onboarding` | Clean | `201` | A | P2 |
| 11 | `/consent` | Clean | `202` `203` | A | P2 |
| | **6 라우트** — §4.1 의 7건과 합쳐 **13건** | | | | |

화면 소유권은 `AGENTS.md` §6 에 확정돼 있다. **트랙을 넘어 편집하지 않는다.**

### 4.3 화면별 상세 명세

> 정적 지침서 §2 를 흡수한 것이다. **이 문서 하나만 읽고 착수할 수 있어야 한다.**
> 근거 AC 는 `tasks/step-*/TASK-XXX.md` 의 GWT 문장이 SSOT다.

#### `/child/tree` — Fun 메인 · `212` `205` `403` · REQ-FUNC-005 · 트랙 D

| 요소 | 내용 |
|---|---|
| `StarHUD` | 상단 고정. `⭐ 12` — **원화 환산·출금 표기 금지** (REG-005c) |
| 나무 | 4단계 중 **묘목(2단계)** 을 기본 상태로 그린다 |
| 3조건 게이지 | 학습 `3/3` ✅ · 퀴즈 `5/5` ✅ · 실천 `0/1` ❌ |
| 넛지 배너 | **최상단.** "실천 1번만 더 하면 나무가 자라요!" — `212` AC3 이 요구하는 위치 |
| 아바타 | 나무 옆 2D 플레이스홀더 |
| 나무 4단계 | `새싹 → 묘목 → 어린 나무 → 풍성한 나무`. **실루엣만으로 단계가 구별**돼야 한다 |

> **AC1 이 이 화면의 핵심이다** — 학습·퀴즈를 다 채워도 실천 0이면 승급하지 않는다.
> 게이지 2개가 초록이고 1개가 비어 있는 상태를 그려야 "왜 안 자라는지"가 보인다.

#### `/child/learn` — 학습 주제 · `206` `104` · REQ-FUNC-003 · 트랙 B

4주제 카드 — **벌기 · 쓰기 · 모으기 · 불리기(잠금)**. `206` AC1: 불리기는 학습·퀴즈만 제공하고
**금융상품 진입 차단이 시각적으로** 드러나야 한다 (ADR-006 · REG-004).

#### `/child/quiz/[topic]` — 퀴즈 5단계 · `206` `104` · 트랙 B

| 단계 | 내용 |
|:--:|---|
| 1 | 학습 카드 — 한 주제의 콘텐츠 1장. **실제 카피를 쓴다** (로렘입숨 금지) |
| 2 | 문제 — 4지선다. 터치 타깃 **최소 `--size-touch`** |
| 3 | 정답 — "맞았어!" + 선택지 정답 표시 |
| 4 | 별 보상 — **⭐ 획득 모션** `scale 1→1.4→1`, 카운터 `11→12`. `206` AC2: 정답 즉시 별 1개 |
| 5 | 오답 — `--color-miss` 부드러운 주황. **"틀렸습니다"가 아니라 "다시 해볼까?"** |

#### `/child/plan/new` — 소비 계획 카드 · `209` · REQ-FUNC-007 · 트랙 C

3필드 폼 — **장소**(자유 텍스트) · **업종**(편의점/문구/간식 선택) · **계획 금액**(원). 72시간 만료 표시.

> ⚠️ **REG-002 준수를 시각적으로 못 박는 자리다.** 지도 · "현재 위치" 버튼 · 주변 가맹점 목록을
> **넣지 않는다.** `209` AC2 가 GPS·카메라 권한 미요구를 명시한다. 아동 폼의 원형이므로
> 이후 모든 아동 입력 화면이 이 레이아웃을 따른다.

#### `/child/retro/[recordId]` — AI 회고 3상태 · `211` `210` `402` · REQ-FUNC-008 · 트랙 C

| 상태 | 조건 | 화면 | 시연 |
|---|---|---|---|
| AI 칭찬 | `실제 ≤ 계획` | ⭐1 지급 + 칭찬 문구 | `?variant=praise` |
| AI 격려 | `실제 > 계획` | **별 없음** + 격려 문구. `--color-miss` | `?variant=encourage` |
| 룰 Fallback | Gemini 2.5s 타임아웃 / 429 | 고정 템플릿 문구 | `?variant=fallback` |

> **Fallback 이 앞의 둘과 같은 온도로 보여야 한다.** 아이에게 "AI가 실패했다"가 티나면 안 된다.
> `TASK-306` E2E 가 정상·Fallback 양방향 검증을 요구하므로 여기서 확정해두면 재작업이 없다.

#### `/parent/forest` — 보호자 대시보드 · `212` `213` `404` `403` · REQ-FUNC-009 · 트랙 D

한 화면에 셋을 담는다.

1. **미접속 넛지 배너** — 최상단. "3일 동안 오지 않았어요" (`404` AC2)
2. **현재 성장 나무** — Clean 표현. 일러스트가 아니라 **실천 근거와 정체 원인**을 읽히게
3. **월간 숲 7대 지표** — 4영역 단계 · 실천 횟수 · 사려다 멈춘 횟수 · 계획 준수율 · 총 획득 별 · 전월 대비 증감 · WPA 기여도

> 7대 지표가 **스크롤 없이 한 화면에** 들어와야 한다. H2(카페 자영업 · 주 1회 확인)가
> 짧은 시간에 확인하는 것이 이 화면의 존재 이유다.

#### `/parent/missions` — 승인·반려 · `207` `208` · REQ-FUNC-004/011 · 트랙 B

| 상태 | 내용 |
|---|---|
| 대기 목록 | 미승인 미션 5건 + **"한 번에 모두 칭찬하기"** 버튼 (`208` AC3: 5건 이상 시 노출) |
| 승인 후 | `APPROVED` 전이 + 별 지급 표시 |
| 반려 후 | `REJECTED` 전이. **별·실천 크레딧 미지급** (`207` AC3) |

**실패 분기가 답해야 할 질문** — 퀴즈 오답 · 미션 반려 · 회고 격려 세 화면이
**서로 같은 온도의 말투인가.** 하나만 유독 차갑거나 훈계조면 실패다.

#### 순증 6화면 요지

| 라우트 | 요지 |
|---|---|
| `/child/missions` | 미션 상태 전이 시각화 (`CREATED → PENDING_APPROVAL → APPROVED/REJECTED`) |
| `/child/stars` | 잔액 카운터 · 획득 이력 페이징. **별↔현금 전환 UI 부재** (REG-005c) |
| `/child/wardrobe` | 아바타 2종 · 의상 4종 그리드, 잔액 부족 시 구매 차단 상태. **얼굴 업로드 UI 부재** (REG-006) |
| `/child/wishlist` | 30/70/100% 마일스톤 게이지 (중복 지급 금지 표시) |
| `/parent/onboarding` | 5단계 스텝 인디케이터, **중간 이탈 후 재개** 상태 (`201` AC1) |
| `/consent` | 동의 폼 + 아동 프로필 생성. 미동의 시 리다이렉트 착지점 |

### 4.4 모드 접근 — 토글을 만들지 않는다

`AGENTS.md` §3.2 확정. **계정 분리 + 부모→아이 단방향**이다.

| 세션 | 접근 가능 | 금지 |
|---|---|---|
| 아동 계정 | `app/child/**` 만 | `app/parent/**` 로 가는 **링크·버튼·리다이렉트 일체** |
| 부모 계정 | `app/parent/**` 기본 + `👁 아이 화면 보기` · `✎ 대신 계획 적기` | — |

- 부모가 아이 화면을 열람할 때도 **Fun 테마로 렌더**한다. 아이가 볼 화면을 그대로 보는 것이 목적이다.
- 근거 — PRD §6: *"계획 카드는 부모 폰에서도 작성 가능"*. ADR-003: *"선별 인물 둘 다 전용폰 없음"*.
  H2(키즈워치)는 대행 경로가 없으면 `F8a`(Must)가 죽는다.
- 단방향이라 REG-001(미동의 아동 진입 차단)과 충돌하지 않는다.

---

## 5. 토큰 승격 — `tokens.css` → `@theme` (계획 변경점)

**Tailwind CSS v4 는 `tailwind.config.ts` 를 쓰지 않는다.** 테마는 CSS 안에서 `@theme` 으로 선언한다.
따라서 `visual-prototype-spec.md` §9 와 `visual-prototype-scope.md` §6 의 승격 경로
("`tokens.css` → `tailwind.config.ts` theme + `app/globals.css`") 는 **`app/globals.css` 한 파일로 축약**된다.

```css
/* app/globals.css — P0 산출물. 공유 파일이므로 P0 확정 후 동결한다 */
@import "tailwindcss";

@custom-variant fun   (&:where([data-mode="fun"] *));
@custom-variant clean (&:where([data-mode="clean"] *));

/* 모드 무관 원시값 */
@theme {
  --spacing-frame: 390px;
  --size-touch:     44px;
}

/* 모드별 값 — 정적판 spec §4 표의 hex·px·ms 를 그대로 옮긴다 */
:root[data-mode="fun"] {
  --color-bg: #FFF9F0;  --color-surface: #FFFFFF;
  --color-primary: #2FA84F;
  --color-star: #FFC53D; --color-star-glow: #FFE9A8;
  --color-text: #2B2118; --color-text-soft: #6B5C4D;
  --color-miss: #FF8A65;              /* 아동에겐 정확한 빨강을 쓰지 않는다 */
  --radius-card: 20px;
  --text-body: 18px; --text-title: 28px;
  --space-gap: 20px;
  --motion: 360ms cubic-bezier(.34, 1.56, .64, 1);
}

:root[data-mode="clean"] {
  --color-bg: #F7F8F9;  --color-surface: #FFFFFF;
  --color-primary: #1E7A38;
  --color-star: #B8860B; --color-star-glow: transparent;
  --color-text: #1A1D21; --color-text-soft: #6B7280;
  --color-miss: #DC2626;              /* 보호자에겐 판단을 위한 정확한 빨강 */
  --radius-card: 8px;
  --text-body: 15px; --text-title: 20px;
  --space-gap: 14px;
  --motion: 150ms ease;
}
```

**규약**

- 두 블록은 **같은 토큰 이름을 다른 값으로** 갖는다. 컴포넌트는 테마를 알지 못한다.
- `app/layout.tsx` 가 `<html data-mode="fun|clean">` 를 세그먼트 기준으로 부여한다. **토글 UI 는 만들지 않는다** (§4.4).
- **`AGENTS.md` §6 공유 파일 목록의 `tailwind.config.ts` 는 v4 채택 시 생성되지 않는다.**
  이 경우 §6 의 공유 파일은 `package.json` · `prisma/schema.prisma` · `app/layout.tsx` · `app/globals.css` 4건이 된다. `TASK-101` 이 Tailwind 버전을 확정할 때 `AGENTS.md` §6 을 함께 갱신한다.

### 5.1 모션 — CSS 전용

Lottie·GSAP 을 설치하지 않는다. `$0` 제약(REQ-NF-012)과 번들 크기 때문이며, 필요한 표현이 CSS 로 충분하다.

```css
@keyframes star-pop {
  0%   { transform: scale(1); }
  45%  { transform: scale(1.4); }
  100% { transform: scale(1); }
}
.star-earn { animation: star-pop var(--motion); }

@media (prefers-reduced-motion: reduce) {
  .star-earn { animation: none; }
}
```

| 대상 | 표현 | 왜 |
|---|---|---|
| **별 획득** | `scale 1→1.4→1` + 카운터 증가 | 주당 3~5회 발생하는 **핵심 보상 신호**. 느낌이 중요하다 |
| **나무 승급** | 정지 이미지 교체 | 몇 주에 한 번. 모션보다 **4단계 형태 구별**이 우선 |
| **Clean 전체** | 페이드만 | 스케일·바운스 금지 |

Fun 의 `--motion` 은 끝에 살짝 튀는 곡선(`1.56`)이고 Clean 은 순수 `ease` 다.
`prefers-reduced-motion` 존중은 **면제되지 않는다.**

**아바타** — 이번 범위에서는 `/child/tree` 의 보조 요소와 `/child/wardrobe` 그리드로만 등장한다.
**2D 플레이스홀더**(인라인 SVG 또는 이모지)로 그린다. PRD `F5` 는 *"사전 제작 3D"*, SRS §6.6 AC3 는
*"2D 벡터"* 로 어긋나 있으므로 **실제 에셋 형식은 `TASK-214` 착수 전 별도 해소**한다.

---

## 6. Mock 데이터 규약

`prototype-suggestion.md` §5.3 을 그대로 따른다. **새 최상위 디렉토리를 만들지 않는다.**

```
app/child/tree/page.tsx
app/child/tree/tree.fixture.ts     ← co-located. 승격 시 삭제
app/child/tree/loading.tsx         ← TASK-403 산출물과 동일 파일
```

모든 fixture 첫 줄에 승격 마커를 넣는다.

```ts
// PROTO-DATA: TASK-212 — evaluateGrowthTree() 구현 시 이 파일을 삭제하고 actions/growth.ts 호출로 대체한다
```

승격 절차와 화면별 치환 대상은 `prototype-suggestion.md` §6 이 SSOT다.

---

## 7. 불변식과 검증 명령 (면제 없음)

`AGENTS.md` §4 불변식은 프로토타입에도 적용된다.

| 불변식 | 강제 방법 |
|---|---|
| **REG-002** | `/child/plan/new` 에 지도 · "현재 위치" 버튼 · 주변 가맹점 UI **미배치.** 장소는 자유 텍스트 |
| **REG-006** | `/child/wardrobe` 는 그래픽 아바타만. 사진 업로드 컨트롤 **미배치** |
| **REG-005c** | `StarHUD` · `/child/stars` 에 "원화 환산" · "출금" 표기 **없음** |
| 금지 식별자 | `geolocation` `getCurrentPosition` `watchPosition` `latitude` `longitude` `convertStarToCash` `starToBalance` `withdrawStar` — **fixture 필드명 포함** |
| **REG-001** | 프로토타입은 **검증하지 않는다.** `middleware.ts`(`TASK-203`) 부재로 `/consent` 전이는 mock 라우팅이다 |

```bash
npx tsc --noEmit                       # 타입 정합
npm run lint                           # 스타일
npm run build                          # 빌드 — TASK-403 검증 명령과 동일

# TASK-405 의 scripts/verify-compliance.ts 산출 전 임시 대체
grep -rnE "geolocation|getCurrentPosition|watchPosition|latitude|longitude|convertStarToCash|starToBalance|withdrawStar" \
  app/ components/ && echo "COMPLIANCE FAIL" || echo "COMPLIANCE PASS"

# 라우트 13건 실재 확인
find app -name page.tsx | wc -l        # 13
```

---

## 8. 완료 판정

정적판 §7 의 6문항을 그대로 승계한다. **눈으로 답이 나와야 하는 질문은 도구가 바뀌어도 같다.**

1. 두 모드를 나란히 놓았을 때 **한눈에 다른 서비스로 보이는가** — 너무 달라도 실패다
2. 아동 화면에서 **별이 가장 먼저 눈에 들어오는가**
3. 보호자 화면의 7대 지표가 **스크롤 없이** 한 화면에 들어오는가
4. 회고 3상태가 **문구를 읽지 않고도** 구별되는가
5. **오답 · 반려 · 격려 세 프레임의 말투 온도가 같은가**
6. 나무 4단계가 **실루엣만으로** 구별되는가

Node 판이 추가로 요구하는 것 — 정적 HTML 로는 물을 수 없었던 항목이다.

7. **코어 루프가 클릭으로 완주되는가** — 퀴즈 정답 → 별 획득 → 계획 카드 → 회고 → 나무 → 보호자 승인
8. `npx tsc --noEmit` · `npm run lint` · `npm run build` 세 명령이 **모두 exit 0**
9. 라우트 13건이 전부 존재하고, `AGENTS.md` §3.2 에 없는 라우트가 **신설되지 않았는가**

---

## 9. 잔존 리스크 · 미결정 1건

| ID | 항목 | 상태 | 비고 |
|:--:|---|:--:|---|
| **R-P7** | Node 툴체인 부재 | ✅ **해소** | §1 — v24.20.0 LTS 사용자 전역 설치 완료 |
| **R-P2** | `app/**` 소유권 미배정 | ✅ 해소 | `AGENTS.md` §6 반영 완료 |
| **R-P3** | 라우트 미성문화 | ✅ 해소 | `AGENTS.md` §3.2 확정 13건 |
| **R-P1** | **DAG 에 화면 생성 태스크가 없다** | ⏳ **잔존 · 유일한 차단** | 아래 미결정 참조 |
| **R-P4** | fixture 타입이 `TASK-102` DTO 와 불일치 | ⏳ 잔존 | SRS §10·§11 기준 선취 정의 후 `102` 에서 역흡수 |
| **R-P5** | 2.5 MD 임계 경로 순증 | ⏳ 잔존 | P0·P1 을 Wave 0 유휴에 흡수 → 실질 약 1.0 MD |
| **R-P6** | 화면 존재가 REG-001 통과로 오인 | ⏳ 잔존 | §7 명시. Alpha Gate 는 `203`+`305` 완료 시에만 유효 |
| **R-P8** | `prisma@latest` 가 RC | 🆕 **신규** | §2 — 양쪽 `7.10.0` 명시 고정으로 회피 |
| **R-P9** | Tailwind v4 로 `tailwind.config.ts` 부재 | 🆕 **신규** | §5 — `TASK-101` 이 버전 확정 시 `AGENTS.md` §6 공유 파일 목록 갱신 |

### 미결정 — 오케스트레이터 판단 필요

**R-P1: 화면을 만드는 책임을 어디에 둘 것인가.** Node 설치로 실행은 가능해졌으나 **책임 소재는 여전히 비어 있다.**

| 안 | 내용 | 대가 |
|:--:|---|---|
| **A (권장)** | P0 를 `TASK-101` 로 흡수하고, P1~P3 의 각 화면을 **`AGENTS.md` §6 소유 트랙의 해당 태스크 착수 시 선행 작업**으로 귀속한다 | 새 티켓 0건. 각 태스크 명세에 "화면 선작성" 한 줄 추가 필요 |
| **B** | 프로토타입 전체를 신규 티켓(`TASK-100` 등)으로 발행한다 | R-P1 이 명시적으로 닫히나 DAG 30건 구조가 31건으로 바뀐다 |

> A 를 권하는 이유 — `CLAUDE.md` §1("첫 스캐폴딩은 `TASK-101`")과 충돌하지 않고,
> §6 소유권 배정이 이미 화면까지 덮고 있어 **추가 배정 없이 책임이 결정**된다.
> 이 판단 전까지 P1~P3 는 착수하지 않는다. **P0 는 판단과 무관하게 착수 가능하다.**

---

## 10. 문서 승계 관계

| 문서 | 상태 | 이 문서와의 관계 |
|---|---|---|
| `prototype-suggestion.md` | **유효** | 선별 기준 · 라우트 13건 · 소유권 · 승격 규약의 SSOT. 이 문서가 참조한다 |
| `visual-prototype-scope.md` | **폐기** | "Node 없이" 라는 전제가 소멸. §5 토큰 축 표는 이 문서 §5 로 승계 |
| `visual-prototype-spec.md` | **폐기(부분 승계)** | §4 토큰 값 → 이 문서 §5 · §2 프레임 명세 → §4.1 · §7 완료 판정 → §8 |
| `docs/goals/visual-prototype-aztks-gate.md` | **대체됨** | Node 판 `/goal` 은 `docs/goals/prototype-node-aztks-gate.md` |
| `AGENTS.md` §2 | **갱신됨** | 런타임 확정 행 추가. 라이브러리 버전은 여전히 `TASK-101` 소관 |
