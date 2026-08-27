# 프로토타입 실행 로그

- **구동 프롬프트:** [`../goals/prototype-node-aztks-gate_20260827T142413.md`](../goals/prototype-node-aztks-gate_20260827T142413.md)
- **실행 지시서:** [`prototype-execution-plan.md`](prototype-execution-plan.md)
- **결정 원장:** [`grill-ledger.md`](grill-ledger.md) 세션 2
- **작업 브랜치:** `feat/proto-shell` — `main` 에 머지하지 않는다 (`AGENTS.md` §5-A)
- **완료 조건:** aztks-agent EVALUATE 가 `VERDICT: GO` + `SCORECARD` 5축 전원 `P`

---

## 1. 단계 진척

| 단계 | 내용 | 상태 | 커밋 |
|:--:|---|:--:|---|
| **P0** | 스캐폴딩 · 듀얼 테마 토큰 · 세그먼트 레이아웃 | ✅ 완료 | `c9c8bb2` |
| **P1** | 아동 화면 7건 + `StarHUD` | ✅ 완료 | — |
| **P2** | 보호자 화면 4건 + `InactivityBanner` | ✅ 완료 | — |
| **P3** | 루프 연결 · `loading.tsx` ×2 · 나머지 2건 | ✅ 완료 | — |
| **EVAL** | aztks-agent 평가 라운드 | 🔄 진행 | — |

### 라우트 13건 진척

| # | 라우트 | Task | 트랙 | 단계 | 상태 |
|:--:|---|:--:|:--:|:--:|:--:|
| 1 | `/child/tree` | `212` | D | P1 | ✅ |
| 2 | `/child/learn` | `206` | B | P1 | ✅ |
| 3 | `/child/quiz/[topic]` | `206` | B | P1 | ✅ |
| 4 | `/child/missions` | `207` | B | P1 | ✅ |
| 5 | `/child/plan/new` | `209` | C | P1 | ✅ |
| 6 | `/child/retro/[recordId]` | `211` | C | P1 | ✅ |
| 7 | `/child/stars` | `205` | B | P1 | ✅ |
| 8 | `/child/wardrobe` | `214` | D | P3 | ✅ |
| 9 | `/child/wishlist` | `215` | D | P3 | ✅ |
| 10 | `/parent/onboarding` | `201` | A | P2 | ✅ |
| 11 | `/consent` | `202` | A | P2 | ✅ |
| 12 | `/parent/forest` | `213` | D | P2 | ✅ |
| 13 | `/parent/missions` | `207` `208` | B | P2 | ✅ |

---

## 2. P0 검증 결과 (2026-08-27)

| 명령 | 결과 |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run compliance` | `COMPLIANCE PASS` |
| `npm run build` | exit 0 · Compiled successfully |

**확정한 스택** — `AGENTS.md` §2 의 `[OPEN]` 중 이번에 닫힌 것

| 패키지 | 확정 | 이유 |
|---|---|---|
| `next` | 16.3.3 | — |
| `react` · `react-dom` | 19.2.8 | — |
| `typescript` | **5.9.3** | 7.0.2 는 `typescript-eslint@8` peer(`<6.1.0`) 밖이라 `lint` 가 성립하지 않는다 |
| `tailwindcss` | **4.3.3** | CSS-first. `tailwind.config.ts` 를 만들지 않는다 |
| `prisma` | **미설치** | 프로토타입은 DB 를 쓰지 않고 `latest` 태그가 RC 를 가리킨다 |

---

## 3. AZTKS 평가 라운드

아직 라운드가 없다. P3 완료 후 시작한다.

```
(ROUND 기록은 여기에 append 된다)
```

### ROUND 1 — 2026-08-27

```
ROUND: 1
VERDICT: GO
SCORECARD: A:C Z:P T:C K:C S:C
TOP_FIX: app/parent/forest/forest.fixture.ts:20 의 6번 지표를 `계획 대비 지출` → SSOT 표기인
         전월 대비 소비 증감액으로 교체하라. 검증: 7개 label 이 docs/02-srs/srs.md:439-446
         목록과 1:1 대응.
```

**GO 이나 완수는 아니다** — 이 목표의 기준은 `VERDICT: GO` **+ 5축 전원 `P`** 다. `C` 4건이 남아 있다.

| 축 | 지적 | 조치 |
|:--:|---|---|
| **A** | `/child/wardrobe` 가 아바타 **1종**(사람)·의상 4종. SRS §6.6 AC1 은 **동물 2종(토끼·다람쥐)** 을 요구하고 fixture 주석은 "2종·4벌"이라 코드와 어긋난다 | `WardrobeAvatar` 를 `species` × `outfit` 2축으로 재작성. 토끼·다람쥐를 귀·꼬리 실루엣으로 구별. 화면에 「친구 고르기」 절 신설 |
| **T** | 월간 숲 7대 지표 라벨이 SRS §6.9 SSOT 와 어긋남 | 7개 전부 SSOT 표기로 교체 — `4영역 단계 현황` · `총 실천 인정 횟수` · `사려다 멈춘 횟수` · `계획 준수율` · `총 획득 별 개수` · `전월 대비 소비 증감액` · `월간 WPA 기여도` |
| **K** | 참조 0인 죽은 export 2건 — `plan.fixture.ts:19 recentPlan`, `WardrobeAvatar.tsx:36 OUTFIT_LABELS` | 삭제 |
| **S** | `QuizFlow` · `PlanForm` · `MissionApproval` 이 fixture 에서 `import type`. 승격 4-d(fixture 삭제) 시 3파일이 깨진다 | 세 타입을 각 컴포넌트로 이관. **컴포넌트 → fixture 참조 0건** |

통과 확인된 것 (재검증 불필요)

- **Z:P** — 완료 판정 9항 전부. `typecheck`·`lint`·`build`·`compliance` exit 0, 라우트 13건 = §3.2 목록, 신설 0
- 규제 불변식 4건 — REG-002 지도·현재위치 0 / REG-005c 원화 환산 0 / REG-006 업로드 컨트롤 0 / 금지 식별자 0
- 부모→아이 단방향 — `grep 'href="/parent' app/child` = 0
- 코어 루프 클릭 완주 — 끊긴 링크 0

### ROUND 2 — 2026-08-27

```
ROUND: 2
VERDICT: GO
SCORECARD: A:C Z:P T:C K:P S:P
TOP_FIX: app/child/learn/page.tsx:51-60 의 '불리기' 카드를 클릭 가능한 Link(/child/quiz/grow)로
         바꾸고, 잠금 배지 문구를 "금융상품 가입 차단"으로 한정하라.
         검증: 4개 카드 전부 Link · /child/quiz/grow 도달 가능 · 학습/퀴즈는 열려 있음.
```

ROUND 1 지적 4건 **전부 해소 확인** → K·S 축이 `C` → `P` 로 올라왔다. 남은 2건을 조치한다.

| 축 | 지적 | 조치 |
|:--:|---|---|
| **A** | `/child/learn` 의 '불리기' 카드가 `<div>` 라 클릭 불가. 그런데 안내 문구는 "이야기와 퀴즈만 있어요"라 **자기모순**이다. SRS §6.3 AC1 은 "'불리기' 영역은 학습 및 퀴즈만 개통", `TASK-206` 은 "학습 완료만 기록"이라 **주제를 막으라는 뜻이 아니었다.** `quiz.fixture.ts` 에 grow 콘텐츠가 완비돼 있는데 도달 경로가 0건 | 4개 카드 전부 `Link` 로 통일. 잠긴 것은 **상품이지 학습이 아니다** — 필드명을 `locked` → `productLocked` 로 바꾸고 배지를 「🔒 상품 가입 없음」으로 한정. 차단 경계는 **퀴즈 보상 화면**에 `productNotice` 로 명시 (REG-004 가 실제로 작동하는 지점에 표시) |
| **T** | 무반응 CTA 4건 — `/child/missions` "다 했어요", `/child/wardrobe` 종·의상 교체. SRS §6.4 AC1 (`CREATED → PENDING_APPROVAL`) 이 클릭으로 시연되지 않는다 | `MissionReport` · `WardrobePicker` 클라이언트 컴포넌트 신설. 미션은 상태 전이 + 안내 문구, 옷장은 종·의상 교체와 **구매 시 별 차감**까지 실제로 동작 |
| K(선택) | `SPECIES`·`OUTFITS` 외부 참조 0 | `export` 제거. `mission.fixture.ts` 의 `STATUS_LABEL` 도 표현이므로 컴포넌트로 이관 |

### ROUND 3 — 2026-08-27

```
ROUND: 3
VERDICT: GO
SCORECARD: A:P Z:P T:C K:C S:P
TOP_FIX: app/child/wardrobe/wardrobe.fixture.ts:33 의 balance = 5 를 다른 전 화면과 같은 12 로
         올리고, page.tsx:19 의 StarHUD 를 WardrobePicker 내부 실시간 잔액으로 렌더하라.
```

ROUND 2 지적 2건 해소 확인 → **A 축 `C` → `P`.** 남은 2건은 원인이 하나다.

| 축 | 지적 | 조치 |
|:--:|---|---|
| **T** | 별 잔액이 전 화면 12(퀴즈·회고는 지급 전 11)인데 **옷장만 5**. `ledger.fixture.ts` 의 "노란 비옷 -4 / 잔액 12" 이력과도 모순이라 화면을 옮기면 HUD 가 ★12 → ★5 로 튄다 | 옷장 잔액을 **12** 로 통일. 별 이력 합계와 일치한다 |
| **K** | 그 잔액 탓에 `WardrobePicker` 의 구매 버튼과 차감 로직이 **도달 불가능한 죽은 분기**였다 | 잔액 12 + 요리사 옷 9→**14** 로 조정. 첫 화면에서 「탐험가 조끼 구매 가능」과 「요리사 옷 별 2개 부족」이 **동시에** 보이고, 사면 잔액이 6으로 줄어 차단 상태가 갱신된다 |
| K(경미) | `mission.fixture.ts` 의 `STATUS_LABEL` 이관 후 빈 줄 잔여 | 정리 |

**HUD 소유권 이동** — `StarHUD` 를 페이지가 아니라 `WardrobePicker` 가 렌더한다. 서버 컴포넌트가 고정값을 그리면 구매해도 상단 별이 안 줄어든다. 잔액을 소유한 쪽이 HUD 를 그려야 "별을 써서 샀다"가 성립한다.

| 화면 | 잔액 | 근거 |
|---|:--:|---|
| tree · learn · missions · plan · stars · wardrobe · wishlist | 12 | `ledger.fixture.ts` 이력 합계 |
| quiz · retro | 11 | 별 지급 **직전** 상태. 지급 후 12 가 된다 |
