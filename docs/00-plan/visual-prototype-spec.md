# [개발 지침서] 경량 시각 프로토타입 — 6화면 15프레임

- **문서 ID:** PROTO-SPEC-FINFRIENDS-001
- **버전:** 1.0
- **작성일:** 2026-08-27
- **상위 문서:** [`visual-prototype-scope.md`](visual-prototype-scope.md) (범위) · [`grill-ledger.md`](grill-ledger.md) (결정 원장)
- **성격:** **실행 지시서.** 6개 결정이 전부 확정됐고 선행 조건이 없다. 이 문서만 읽고 착수한다.

---

## 0. 30초 요약

정적 HTML 6파일을 만든다. Node·npm 없이 브라우저로 직접 연다.
**진짜 산출물은 화면이 아니라 `tokens.css`** 이며, 나머지 `.html` 은 P0 착수 시 폐기한다.

```bash
# 확인 방법 — 서버도 빌드도 없다
start docs/00-plan/mockups/child-tree.html
```

| 결정 | 확정 내용 |
|---|---|
| 성장 나무 | 아이·부모 **양쪽** 노출. 같은 데이터, 다른 언어 |
| 화면 범위 | **6화면 15프레임.** 실패 분기(오답·반려) 포함 |
| 모드 접근 | **계정 분리 + 부모→아이 단방향.** 토글 없음 |
| 모션 | **CSS 전용.** 별만 움직이고 나무는 정지 교체 |
| 토큰 | §4 표가 SSOT |
| 아바타 | 2D 플레이스홀더. 3D 여부는 `214` 착수 전 별도 결정 |

---

## 1. 산출 파일

```
docs/00-plan/mockups/
├── README.md            열어보는 법 · §7 판정 체크리스트
├── tokens.css           ★ 진짜 산출물 — 듀얼 테마 CSS 변수
├── child-tree.html      1프레임
├── child-quiz.html      6프레임
├── child-plan-new.html  1프레임
├── child-retro.html     3프레임
├── parent-forest.html   1프레임
└── parent-missions.html 3프레임
```

**규칙**

- 각 `.html` 은 `<link rel="stylesheet" href="tokens.css">` 하나만 참조한다. 다른 외부 리소스 금지.
- **하드코딩한 색·크기·시간을 쓰지 않는다.** 전부 `var(--토큰)`. 이걸 어기면 토큰이 산출물이 되지 못한다.
- 여러 프레임은 한 `.html` 안에 **가로로 나란히** 배치하고 각 프레임 위에 상태명을 라벨로 단다.
- 뷰포트는 **모바일 폭 390px 1종**만 본다. 프레임 하나가 390px 카드다.
- `app/`·`components/`·`package.json` 을 만들지 않는다 — P0 의 몫이며 `AGENTS.md` §2 위반이다.

---

## 2. 화면별 프레임 명세

### 2.1 `child-tree.html` — Fun 메인 (1프레임)

`TASK-212` `TASK-205` · REQ-FUNC-005 · 트랙 D

| 요소 | 내용 |
|---|---|
| StarHUD | 상단 고정. `⭐ 12` — **원화 환산·출금 표기 금지** (REG-005c) |
| 나무 | 4단계 중 **묘목(2단계)** 을 그린다. 나머지 3단계는 §2.1a 참조 |
| 3조건 게이지 | 학습 `3/3` ✅ · 퀴즈 `5/5` ✅ · 실천 `0/1` ❌ |
| 넛지 배너 | **최상단.** "실천 1번만 더 하면 나무가 자라요!" — AC3이 요구하는 위치 |
| 아바타 | 나무 옆 2D 플레이스홀더 (§5) |

> **AC1 이 이 화면의 핵심이다** — 학습·퀴즈를 다 채워도 실천 0이면 승급하지 않는다.
> 게이지 2개가 초록이고 1개가 비어 있는 상태를 그려야 "왜 안 자라는지"가 보인다.

**2.1a 나무 4단계** — 같은 파일 하단에 4단계를 나란히 놓아 형태 구별을 확인한다.
`새싹 → 묘목 → 어린 나무 → 풍성한 나무`. 실루엣만으로 단계가 구별돼야 한다.

### 2.2 `child-quiz.html` — 학습·퀴즈 (6프레임)

`TASK-206` `TASK-104` · REQ-FUNC-003 · 트랙 B

| # | 프레임 | 내용 |
|:-:|---|---|
| 1 | 주제 목록 | 4주제 카드 — 벌기 · 쓰기 · 모으기 · **불리기(잠금)**. AC1: 불리기는 학습·퀴즈만, 금융상품 진입 차단이 **시각적으로** 드러나야 한다 |
| 2 | 학습 카드 | 한 주제의 콘텐츠 1장. 실제 카피를 쓴다(로렘입숨 금지) |
| 3 | 문제 | 4지선다. 터치 타깃 **최소 44px** |
| 4 | 정답 | "맞았어!" + 선택지 정답 표시 |
| 5 | 별 보상 레이어 | **⭐ 획득 모션.** `scale 1→1.4→1`, 카운터 `11→12`. AC2: 정답 즉시 별 1개 |
| 6 | 오답 | `--miss` 부드러운 주황. **"틀렸습니다"가 아니라 "다시 해볼까?"** |

### 2.3 `child-plan-new.html` — 소비 계획 카드 (1프레임)

`TASK-209` · REQ-FUNC-007 · 트랙 C

3필드 폼 — **장소**(자유 텍스트) · **업종**(편의점/문구/간식 선택) · **계획 금액**(원). 72시간 만료 표시.

> ⚠️ **REG-002 준수를 시각적으로 못 박는 자리다.** 지도·"현재 위치" 버튼·주변 가맹점 목록을
> **넣지 않는다.** AC2가 GPS·카메라 권한 미요구를 명시한다. 아동 폼의 원형이므로 이후 모든
> 아동 입력 화면이 이 레이아웃을 따른다.

### 2.4 `child-retro.html` — AI 회고 (3프레임)

`TASK-211` `TASK-210` `TASK-402` · REQ-FUNC-008 · 트랙 C

| # | 프레임 | 조건 | 화면 |
|:-:|---|---|---|
| 1 | AI 칭찬 | `실제 ≤ 계획` | ⭐1 지급 + 칭찬 문구 |
| 2 | AI 격려 | `실제 > 계획` | 별 없음 + 격려 문구. `--miss` |
| 3 | 룰 Fallback | Gemini 2.5s 타임아웃 / 429 | 고정 템플릿 문구 |

> **3번이 1·2번과 같은 온도로 보여야 한다.** 아이에게 "AI가 실패했다"가 티나면 안 된다.
> `TASK-306` E2E 가 정상·Fallback 양방향 검증을 요구하므로 여기서 확정해두면 재작업이 없다.

### 2.5 `parent-forest.html` — 보호자 대시보드 (1프레임)

`TASK-212` `TASK-213` `TASK-404` · REQ-FUNC-009 · 트랙 D

한 화면에 셋을 담는다.

1. **미접속 넛지 배너** — 최상단. "3일 동안 오지 않았어요" (`TASK-404` AC2)
2. **현재 성장 나무** — Clean 표현. 일러스트가 아니라 **실천 근거와 정체 원인**을 읽히게
3. **월간 숲 7대 지표** — 4영역 단계 · 실천 횟수 · 사려다 멈춘 횟수 · 계획 준수율 · 총 획득 별 · 전월 대비 증감 · WPA 기여도

> 7대 지표가 **스크롤 없이 한 화면에** 들어와야 한다. H2(카페 자영업·주 1회 확인)가
> 짧은 시간에 확인하는 것이 이 화면의 존재 이유다.

### 2.6 `parent-missions.html` — 승인·반려 (3프레임)

`TASK-207` `TASK-208` · REQ-FUNC-004/011 · 트랙 B

| # | 프레임 | 내용 |
|:-:|---|---|
| 1 | 대기 목록 | 미승인 미션 5건 + **"한 번에 모두 칭찬하기"** 버튼 (`TASK-208` AC3: 5건 이상 시 노출) |
| 2 | 승인 후 | `APPROVED` 전이 + 별 지급 표시 |
| 3 | 반려 후 | `REJECTED` 전이. **별·실천 크레딧 미지급** (AC3) |

---

## 3. 모드 접근 — 토글을 만들지 않는다

`AGENTS.md` §3.2 확정. 계정 분리 + **부모→아이 단방향**이다.

| 세션 | 접근 가능 | 금지 |
|---|---|---|
| 아동 계정 | `app/child/**` 만 | `app/parent/**` 로 가는 **링크·버튼·리다이렉트 일체** |
| 부모 계정 | `app/parent/**` 기본<br>+ `👁 아이 화면 보기` · `✎ 대신 계획 적기` | — |

- 부모가 아이 화면을 열람할 때도 **Fun 테마로 렌더**한다. 아이가 볼 화면을 그대로 보는 것이 목적이다.
- 근거 — PRD §6: *"기기 유형은 참고 정보다… **계획 카드는 부모 폰에서도 작성 가능**"*.
  ADR-003: *"선별 인물 둘 다 전용폰 없음"*. H2(키즈워치)는 대행 경로가 없으면 `F8a`(Must)가 죽는다.
- 단방향이라 REG-001(미동의 아동 진입 차단)과 충돌하지 않는다.

> **프로토타입에서는** 각 `.html` 이 독립 파일이라 전환 UI 자체가 없다.
> `parent-forest.html` 하단에 `👁 아이 화면 보기` 버튼을 **모양만** 두고 `child-tree.html` 로 링크한다.

---

## 4. `tokens.css` — 진짜 산출물

두 테마가 **같은 토큰 이름을 다른 값으로** 갖는다. 컴포넌트는 테마를 알지 못한다.

```css
:root[data-mode="fun"] {
  --bg:         #FFF9F0;   /* 크림 */
  --surface:    #FFFFFF;
  --primary:    #2FA84F;   /* 나무 초록 */
  --star:       #FFC53D;   /* 별 골드 */
  --star-glow:  #FFE9A8;
  --text:       #2B2118;   /* 따뜻한 다크 */
  --text-soft:  #6B5C4D;
  --miss:       #FF8A65;   /* 부드러운 주황 — 빨강 아님 */
  --radius:     20px;
  --font-body:  18px;
  --font-title: 28px;
  --space:      20px;
  --motion:     360ms cubic-bezier(.34, 1.56, .64, 1);
}

:root[data-mode="clean"] {
  --bg:         #F7F8F9;
  --surface:    #FFFFFF;
  --primary:    #1E7A38;   /* 같은 초록 계열, 저채도 */
  --star:       #B8860B;   /* 지표용 — glow 없음 */
  --star-glow:  transparent;
  --text:       #1A1D21;
  --text-soft:  #6B7280;
  --miss:       #DC2626;   /* 보호자에겐 정확한 빨강 */
  --radius:     8px;
  --font-body:  15px;
  --font-title: 20px;
  --space:      14px;
  --motion:     150ms ease;
}
```

**설계 근거**

- **아동 화면에 정확한 빨강을 쓰지 않는다.** `--miss` 가 부드러운 주황인 이유다.
  "틀렸다"가 아니라 "다시 해보자"가 색으로도 전달돼야 한다. 보호자에겐 정확한 빨강이 맞다 — 판단을 위한 정보이기 때문이다.
- **두 `--primary` 는 같은 초록 계열이다.** 브랜드 연속성을 유지하되 채도로 모드를 가른다.
- Fun 의 `--motion` 은 끝에 살짝 튀는 곡선(`1.56`)이고 Clean 은 순수 `ease` 다.

---

## 5. 모션 — CSS 전용

Node·npm 이 없어 Lottie·GSAP 을 설치할 수 없다. **브라우저 내장 CSS 만 쓴다.**

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

> 나무 승급 전이는 CSS 몇 줄이라 나중에 언제든 붙일 수 있다. 지금 확정할 실익이 적어 뺐다.

**아바타** — 이번 범위에서는 `child-tree.html` 의 보조 요소로만 등장한다. **2D 플레이스홀더**(인라인 SVG 또는 이모지)로 그린다.
PRD `F5` 는 *"사전 제작 3D"*, SRS §6.6 AC3·README 는 *"2D 벡터"* 로 어긋나 있다.
정적 HTML 에서 3D 는 불가하므로 이번엔 2D 로 두고, **실제 에셋 형식은 `TASK-214` 착수 전 별도 해소**한다.

---

## 6. 불변식 — 목업도 면제되지 않는다

`AGENTS.md` §4 는 프로토타입 코드에도 적용된다.

| 불변식 | 목업에서 지킬 것 |
|---|---|
| **REG-002** | `child-plan-new.html` 에 지도·"현재 위치" 버튼·주변 가맹점 UI **없음** |
| **REG-006** | 아바타는 그래픽만. 사진 업로드 컨트롤 **미배치** |
| **REG-005c** | StarHUD 에 "원화 환산"·"출금" 표기 **없음** |
| 금지 식별자 | 클래스명·변수명 포함 금지 — `geolocation` `getCurrentPosition` `watchPosition` `latitude` `longitude` `convertStarToCash` `starToBalance` `withdrawStar` |

```bash
grep -rnE "geolocation|getCurrentPosition|watchPosition|latitude|longitude|convertStarToCash|starToBalance|withdrawStar" \
  docs/00-plan/mockups/ && echo "COMPLIANCE FAIL" || echo "COMPLIANCE PASS"
```

> ⚠️ **REG-001 은 이 목업으로 검증되지 않는다.** `middleware.ts`(`TASK-203`) 가 없어 `/consent` 전이는 흉내다.
> 화면이 있다는 이유로 Alpha Gate 통과로 오인하지 않는다.

---

## 7. 완료 판정 — 이 6개에 답이 나오면 끝

1. 두 모드를 나란히 놓았을 때 **한눈에 다른 서비스로 보이는가** — 너무 달라도 실패다
2. 아동 화면에서 **별이 가장 먼저 눈에 들어오는가**
3. 보호자 화면의 7대 지표가 **스크롤 없이** 한 화면에 들어오는가
4. 회고 3상태가 **문구를 읽지 않고도** 구별되는가
5. **오답·반려·격려 세 프레임의 말투 온도가 같은가** — 하나만 차갑거나 훈계조면 실패
6. 나무 4단계가 **실루엣만으로** 구별되는가

그리고 기계 검사 하나 — **하드코딩된 색·크기 값이 0건인가.** 전부 `var(--토큰)` 이어야 한다.

```bash
grep -rnE "#[0-9a-fA-F]{3,6}|[0-9]+px|[0-9]+ms" docs/00-plan/mockups/*.html && echo "하드코딩 발견" || echo "OK"
```

---

## 8. 순서와 공수

| 순서 | 산출물 | 프레임 | 예상 |
|:--:|---|:--:|:--:|
| 1 | `tokens.css` 초안 + `child-tree.html` (+ 나무 4단계) | 1 | 1.5h |
| 2 | `parent-forest.html` | 1 | 1.5h |
| 3 | `child-quiz.html` | 6 | 1.5h |
| 4 | `child-retro.html` | 3 | 1.0h |
| 5 | `parent-missions.html` | 3 | 1.0h |
| 6 | `child-plan-new.html` | 1 | 0.5h |
| 7 | `tokens.css` 확정 + `mockups/README.md` | — | 1.0h |
| | | **15** | **8.0h** |

**1·2번을 먼저 하는 이유** — 이 둘을 나란히 놓는 순간 완료 판정 1·2·3번에 답이 나온다.
여기서 실패하면 나머지를 그릴 이유가 없다.

---

## 9. 승격 경로

목업은 폐기되지만 **토큰과 레이아웃 판단은 그대로 넘어간다.**

| 지금 | Node 설치 후 (P0) | 트랙 |
|---|---|:--:|
| `tokens.css` | `tailwind.config.ts` theme + `app/globals.css` | 공유 |
| `child-tree.html` | `app/child/tree/page.tsx` + `tree.fixture.ts` | D |
| `child-quiz.html` | `app/child/quiz/[topic]/page.tsx` + `quiz.fixture.ts` | B |
| `child-plan-new.html` | `app/child/plan/new/page.tsx` + `plan.fixture.ts` | C |
| `child-retro.html` | `app/child/retro/[recordId]/page.tsx` + `retro.fixture.ts` | C |
| `parent-forest.html` | `app/parent/forest/page.tsx` + `forest.fixture.ts` | D |
| `parent-missions.html` | `app/parent/missions/page.tsx` + `mission.fixture.ts` | B |
| `mockups/` | **삭제** | — |

라우트 13건과 화면 소유권은 [`AGENTS.md`](../../AGENTS.md) §3.2·§6 에 확정돼 있다. 목업은 그 경로에 1:1 대응한다.
fixture 첫 줄에 `// PROTO-DATA: TASK-XXX` 마커를 넣어 승격 시 grep 으로 전수 특정한다.
