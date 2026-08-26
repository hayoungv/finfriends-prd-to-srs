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

## 규칙

- 스타일은 **Tailwind 유틸리티 클래스**로만. 별도 CSS 파일·인라인 style 을 만들지 않는다.
- 테마 값은 CSS 변수 토큰으로 정의하고 두 테마가 같은 토큰 이름을 다른 값으로 갖게 한다. 컴포넌트가 테마를 알지 못하게 한다.
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

## 금지

- 아동 화면에 스택트레이스·에러 코드·기술 용어 노출
- 얼굴 이미지 업로드 UI (REG-006) — 아바타는 사전 제작 에셋 선택만
- 위치 권한 요청 UI (REG-002)
