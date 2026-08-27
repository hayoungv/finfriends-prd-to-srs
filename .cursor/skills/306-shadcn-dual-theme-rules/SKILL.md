---
name: 306-shadcn-dual-theme-rules
description: Tailwind + shadcn/ui 아동·보호자 듀얼 테마 UI 규칙 (ADR-013). components/** 및 app/** UI 작업 시 사용.
---

# Tailwind + shadcn/ui — 듀얼 테마 (ADR-013)

## 두 개의 사용자, 두 개의 언어

| | 아동 (`app/child/**`) | 보호자 (`app/parent/**`) |
|---|---|---|
| 목적 | 동기 부여 · 즉각 보상 | 증거 확인 · 판단 |
| 톤 | 큰 타이포, 높은 대비, 애니메이션 | 조밀한 정보 밀도, 표·차트 |
| 언어 | 쉬운 말, 비난 없음 | 정확한 수치와 근거 |
| 오류 | "다시 해볼까?" | 원인 + 조치 |

**같은 컴포넌트를 두 화면에 그대로 쓰지 않는다.** `components/child/**` 와 `components/parent/**` 를 분리하고, `components/ui/**`(shadcn 원시 컴포넌트)만 공유한다.

## 확정 토큰 (2026-08-27 · `docs/00-plan/prototype-execution-plan.md` §5 가 SSOT)

두 테마가 **같은 토큰 이름을 다른 값으로** 갖는다. 컴포넌트는 테마를 알지 못한다.

| 토큰 | Fun (아동) | Clean (보호자) |
|---|---|---|
| `--bg` | `#FFF9F0` 크림 | `#F7F8F9` 뉴트럴 |
| `--surface` | `#FFFFFF` | `#FFFFFF` |
| `--primary` | `#2FA84F` 나무 초록 | `#1E7A38` 같은 계열 저채도 |
| `--star` | `#FFC53D` · glow `#FFE9A8` | `#B8860B` (지표용 · glow 없음) |
| `--text` | `#2B2118` 따뜻한 다크 | `#1A1D21` 중립 다크 |
| `--text-soft` | `#6B5C4D` | `#6B7280` |
| `--miss` | `#FF8A65` 부드러운 주황 | `#DC2626` 정확한 빨강 |
| `--radius` | `20px` | `8px` |
| `--font-body` / `--font-title` | `18px` / `28px` | `15px` / `20px` |
| `--space` | `20px` | `14px` |
| `--motion` | `360ms cubic-bezier(.34,1.56,.64,1)` | `150ms ease` |

- **아동 화면에 정확한 빨강(`#DC2626`)을 쓰지 않는다.** 오답·미달성은 `--miss` 부드러운 주황이다.
  "틀렸다"가 아니라 "다시 해보자"가 색으로도 전달돼야 한다.
- 두 테마의 `--primary` 는 **같은 초록 계열**이다. 브랜드 연속성을 유지하되 채도로 모드를 가른다.

## 모션 규칙

- **별 획득만 움직인다.** `scale 1 → 1.4 → 1` + 카운터 증가, `--motion` 타이밍. 주당 3~5회 발생하는 핵심 보상 신호다.
- **나무 승급은 정지 교체다.** 4단계 형태 자체가 정보이고 승급은 몇 주에 한 번이라, 모션보다 형태 구별이 우선이다.
- Clean 모드는 **페이드만.** 스케일·바운스를 쓰지 않는다.
- `prefers-reduced-motion: reduce` 에서 모든 키프레임을 끈다.

## 규칙

- 스타일은 **Tailwind 유틸리티 클래스**로만. 별도 CSS 파일·인라인 style 을 만들지 않는다.
- 테마 값은 위 토큰 표를 `tailwind.config.ts` theme + `app/globals.css` 로 옮겨 정의한다.
- shadcn 컴포넌트는 `npx shadcn@latest add <component>` 로 추가한다. 수동 복사하지 않는다.
- 접근성: 아동 화면은 터치 타깃 최소 44px, 대비 WCAG AA 이상. 색만으로 상태를 구분하지 않는다.

## Skeleton (REQ-NF-001/002)

무료 티어 콜드 스타트가 체감된다. **성장 나무·월간 숲 진입 경로에 `loading.tsx` 를 반드시 둔다.**

```
app/child/tree/loading.tsx
app/parent/forest/loading.tsx
components/ui/skeleton.tsx
```

Skeleton 은 실제 레이아웃과 같은 높이를 차지해야 한다. 레이아웃 시프트가 나면 안 하느니만 못하다.

## 모드 접근 (AGENTS.md §3.2)

계정 분리 + **부모→아이 단방향**이다. **모드 토글을 만들지 않는다.**

- 아동 세션 — `app/child/**` 만. `app/parent/**` 로 가는 링크·버튼을 두지 않는다.
- 부모 세션 — `app/parent/**` 기본 + 아이 화면 열람·대행 입력(`👁 아이 화면 보기` · `✎ 대신 계획 적기`). 이때도 **Fun 테마로 렌더**한다.
- 성장 나무는 양쪽에 노출한다. 아이는 Fun(일러스트·별·넛지), 부모는 Clean(실천 근거·정체 원인).

## 금지

- 아동 화면에 스택트레이스·에러 코드·기술 용어 노출
- 아동 화면에 정확한 빨강 계열 오류색 — `--miss` 를 쓴다
- 모드 전환 토글·스위치 UI — 계정 분리가 원칙이다
- 얼굴 이미지 업로드 UI (REG-006) — 아바타는 사전 제작 에셋 선택만
- 위치 권한 요청 UI (REG-002)
- 별에 원화 환산·출금 표기 (REG-005c)
