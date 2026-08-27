# Grill Ledger — 시각 프로토타입 UI/UX 결정 원장

- **세션 개시:** 2026-08-27
- **참조 범위:** `visual-prototype-scope.md`(폐기·삭제) · [`../01-prd/prd.md`](../01-prd/prd.md) · [`../02-srs/srs.md`](../02-srs/srs.md)
- **관심 방향:** 경량 시각 프로토타입 화면의 UI/UX 의사결정 — 화면 범위 · 모드 전환 · 모션 표현 · 테마 토큰
- **완료 조건:** 아래 토픽 전부 RESOLVED
- **OUTPUT:** `visual-prototype-spec.md`(폐기·삭제) + 하네스(`AGENTS.md` · `.claude/skills/306-shadcn-dual-theme-rules`)

---

```
RESOLVED: 6 / TOTAL: 6  — ALL_RESOLVED
- [x] T1 | CORE  | 성장 나무는 아이 화면인가 부모 화면인가 (PRD↔SRS 충돌) | depends:-     | status:RESOLVED
      decision: 양쪽 노출 · 표현 분리. 아이=Fun(일러스트·별·넛지), 부모=Clean 대시보드(현재 나무 + 월간 숲 7대 지표).
                부모 화면이 월간 집계만 보이면 이번 주기 성장을 실시간 확인할 수 없다. 라우트 신설 0건.
      applied:  AGENTS.md §3.2 (라우트 표 하단 규약 + PRD↔SRS 충돌 해소 근거) · visual-prototype-scope.md §3.1 화면 2
- [x] T2 | CORE  | 프로토타입 화면 범위 확정 (지시 5화면 vs 문서 4화면)     | depends:T1    | status:RESOLVED
      decision: 6화면 15프레임. 채택 단위를 화면→프레임으로 전환. 흐름형 화면은 한 .html 안에 상태를
                프레임으로 나란히 배치. 실패 분기(퀴즈 오답·미션 반려) 포함 — 회고 격려 프레임과 함께
                놓아야 "틀렸을 때 말투"의 톤 일관성이 판정된다. 라우트 13건 불변.
      applied:  visual-prototype-scope.md §3.1a 신설 · XL1 제외기준 폐기 표시
- [x] T3 | CORE  | Fun↔Clean 모드 전환 방식                              | depends:T2    | status:RESOLVED
      decision: 계정 분리 + 부모→아이 단방향. 모드 토글 없음. 아이 세션은 app/child/** 만, 부모 세션은
                app/parent/** 기본 + 아이 화면 열람·대행 입력 가능(Fun 테마로 렌더).
                근거 — PRD §6 "계획 카드는 부모 폰에서도 작성 가능" · ADR-003 "선별 인물 둘 다 전용폰 없음".
                H2(키즈워치)는 대행 경로가 없으면 F8a(Must)가 죽는다. 단방향이라 REG-001 과 무충돌.
                ⚠️ 최초 프레이밍에서 "태블릿 공용"이라 한 것은 오독 — PRD 는 "아이 **전용** 태블릿".
      applied:  AGENTS.md §3.2 (모드 접근 규약)
- [x] T4 | CORE  | 나무 성장·별 획득 모션의 표현 수준과 구현 수단           | depends:T2    | status:RESOLVED
      decision: CSS 전용. 별 획득만 키프레임(scale 1→1.4→1 + 카운터), 나무는 4단계 정지 교체.
                Clean 은 페이드만. prefers-reduced-motion 에서 전부 끔.
                별은 주당 3~5회라 느낌이 중요하고, 나무 승급은 몇 주에 한 번이라 형태 구별이 우선.
                상위 결정 — Node 설치를 P0 로 미루고 이번 차수는 정적 HTML 유지(사용자 선택).
      applied:  .claude/skills/306-shadcn-dual-theme-rules (모션 규칙) · visual-prototype-spec.md §5
- [x] T5 | MINOR | 듀얼 테마 컬러·타이포 토큰 구체값                       | depends:T4    | status:RESOLVED
      decision: 12개 토큰 × 2테마 확정. 핵심 판단 — 아동 화면에 정확한 빨강(#DC2626)을 쓰지 않고
                --miss 를 부드러운 주황(#FF8A65)으로. "틀렸다"가 아니라 "다시 해보자"가 색으로 전달돼야 한다.
                두 --primary 는 같은 초록 계열이되 채도로 모드를 가른다(브랜드 연속성).
      applied:  .claude/skills/306-shadcn-dual-theme-rules (토큰 표) · visual-prototype-spec.md §4
- [x] T6 | MINOR | 아바타 표현 2D/3D (PRD F5 "3D" ↔ SRS/README "2D 벡터")  | depends:T1    | status:RESOLVED
      decision: 이번 차수는 2D 플레이스홀더(인라인 SVG/이모지). 정적 HTML 에서 3D 불가.
                실제 에셋 형식(2D 벡터 vs 사전 제작 3D)은 TASK-214 착수 전 별도 해소 — 미해소로 남긴다.
      applied:  visual-prototype-spec.md §5 하단
```

---

## 토픽 근거

| ID | 왜 미해소인가 |
|:--:|---|
| **T1** | PRD §4-1 `F5` 근거란 — *"아이의 **유일한** 동기 장치. **나무는 부모 화면 전용**"*. PRD `F1` 성장 나무의 Job 은 **J2(부모)**. 그러나 SRS §6.5 시퀀스는 *"Child→Client: 성장 나무 화면 진입"* 이고, `TASK-403` 산출물은 `app/child/tree/loading.tsx`, `AGENTS.md` §3.2 라우트 표도 `app/child/tree/` 를 **Fun** 으로 확정했다. **이 프로토타입의 1번 화면 전체가 여기에 걸려 있다.** |
| **T2** | `/grill-it` 지시가 지목한 5화면(나무 · 퀴즈 · 계획카드 · 보호자 대시보드 · 승인/반려)과 `visual-prototype-scope.md` §3.1 채택 4화면(나무+StarHUD · 월간 숲 · 회고 3상태 · 계획카드)이 다르다. 퀴즈·승인반려는 문서가 XL1(가치가 상태 전이에 있음)로 **제외**했고, 회고는 지시 목록에 **없다**. |
| **T3** | 두 모드의 **전환 방식**이 PRD·SRS 어디에도 없다. REG-001 동의 게이트와 `middleware.ts` 차단만 규정돼 있다. 프로토타입은 한 브라우저에서 두 모드를 오가야 하므로 표현 방식을 정해야 한다. |
| **T4** | PRD `F1` 은 4단계 성장, SRS AC2 는 "정답 즉시 별 1개 지급"을 요구하나 **표현 수준**(정지 / CSS 전이 / Lottie·GIF)이 미정. Node·npm 부재로 패키지 설치가 불가해 구현 수단이 제약된다. |
| **T5** | `visual-prototype-scope.md` §5 가 토큰의 **축과 방향만** 고정하고 hex·px·ms 는 미정으로 남겼다. |
| **T6** | PRD `F5` 는 *"사전 제작 **3D**"*, ADR-007 은 *"3D 품질 관리 비용"*. 반면 SRS §6.6 AC3·README 는 *"2D 벡터 아바타"*. 정적 HTML 목업에서 3D 는 불가하다. |

> ⚠️ 참고 — PRD ADR-007 은 아바타를 **5종 × 8벌(1차 2종 × 4벌)** 로 고정하나 SRS §6.6 AC1 은 **2종 · 의상 4종**만 적는다. 옷장은 이번 범위 밖이라 토픽으로 열지 않되, `214` 착수 전 해소가 필요하다.

---

## 세션 종료 — STOP: ALL_RESOLVED (2026-08-27)

**산출물** — `visual-prototype-spec.md`(폐기·삭제) 개발 지침서

**반영된 하네스·문서**

| 대상 | 무엇을 |
|---|---|
| `AGENTS.md` §3.2 | 나무 이중 노출 규약(T1) · 모드 접근 단방향 규약(T3) |
| `.claude/skills/306-shadcn-dual-theme-rules` | 확정 토큰 표(T5) · 모션 규칙(T4) · 모드 접근(T3) · 금지 항목 3건 추가 |
| `visual-prototype-scope.md` | §3.1a 6화면 15프레임(T2) · XL1 제외기준 폐기 · 화면 2 대시보드화(T1) |
| `visual-prototype-spec.md` | 신설 — 6개 결정 전부를 실행 지시로 |

**다음 차수로 넘긴 미해소 2건**

| 항목 | 언제 |
|---|---|
| 아바타 실제 에셋 형식 (2D 벡터 vs 사전 제작 3D) — PRD↔SRS 충돌 | `TASK-214` 착수 전 |
| 아바타 종수·벌수 (PRD ADR-007 5×8 vs SRS AC1 2종·4벌) | `TASK-214` 착수 전 |
