---
name: 300-nextjs-app-router-rules
description: Next.js App Router (RSC + Server Actions) 단일 풀스택 구현 규칙. app/·actions/·services/ 레이어 작업 시 사용.
---

# Next.js App Router — 단일 풀스택 규칙 (ADR-009)

별도 백엔드가 없다. **Route Handler 는 외부 연동(Mock Sandbox)에만 쓰고, 내부 mutation 은 전부 Server Action** 이다.

## 레이어

```
app/(라우팅·RSC)  →  actions/(진입점·인증·검증)  →  services/(도메인·트랜잭션)  →  lib/prisma
```

단방향이다. `services/` 는 `next/*` 를 import 하지 않는다 — 테스트에서 Next 런타임 없이 돌아야 한다.

## Server Component 우선

- 기본은 **RSC**. `'use client'` 는 상호작용이 실제로 필요한 잎 노드에만 붙인다.
- 데이터 조회는 RSC 에서 직접 `services/` 호출. 클라이언트 fetch 왕복을 만들지 않는다.
- `'use client'` 컴포넌트에 큰 데이터를 prop 으로 내리지 않는다 — 직렬화 비용이 그대로 번들에 실린다.

## Cold Start 완화 (REQ-NF-001/002)

서버리스 무료 티어라 콜드 스타트가 체감된다.

- 성장 나무·월간 숲 진입 경로에 **`loading.tsx` Skeleton 을 반드시 둔다.**
- 무거운 집계는 RSC 에서 프리페치하고 `Suspense` 경계로 스트리밍한다.
- `export const revalidate` 로 스냅샷성 데이터를 캐싱한다. 원장·잔액처럼 실시간성이 필요한 데이터는 캐싱하지 않는다.

## Route Handler 는 언제만?

- `app/api/v1/sandbox/**` — Mock Partner Gateway (ADR-012)
- Web Push 구독 엔드포인트
- 그 외 내부 CRUD 를 REST 로 다시 노출하지 않는다. **Server Action 으로 충분하다.**

## 라우트 구조

```
app/parent/**   보호자 화면 — 대시보드, 미션 승인, 월간 숲
app/child/**    아동 화면 — 학습, 나무, 아바타  ← REG-001 가드 대상 전체
app/api/v1/sandbox/**   Mock 제휴사
```

새 아동 라우트를 추가하면 `middleware.ts` 동의 가드 범위에 포함됐는지 **반드시 확인**한다.

## 금지

- `getServerSideProps` 등 Pages Router API
- 클라이언트에서 `prisma` import (번들에 DB 자격증명이 실린다)
- Server Action 안에서 `prisma` 직접 호출 — `services/` 경유
