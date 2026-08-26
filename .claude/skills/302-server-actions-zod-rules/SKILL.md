---
name: 302-server-actions-zod-rules
description: Server Action 작성 규약 — 인증·Zod 검증·멱등키·에러 반환. actions/ 작업 시 사용.
---

# Server Actions + Zod

## 표준 골격

```ts
'use server'

import { z } from 'zod'

const InputSchema = z.object({
  childId: z.string().uuid(),
  idempotencyKey: z.string().min(16),   // mutation 이면 필수
})

export async function approveMission(raw: unknown) {
  // 1) 인증·인가 — 세션에서 가져온다. 클라이언트가 보낸 parentId 를 신뢰하지 않는다.
  const session = await requireParentSession()

  // 2) 검증 — 파싱 전 값을 절대 쓰지 않는다.
  const input = InputSchema.parse(raw)

  // 3) 소유권 — 이 보호자의 아동이 맞는가
  await assertOwnsChild(session.parentId, input.childId)

  // 4) 도메인 — service 경유. 여기서 prisma 를 직접 부르지 않는다.
  return missionService.approve(input)
}
```

## 규칙

- **입력은 전부 `unknown` 으로 받고 Zod 로 파싱한다.** 타입 애노테이션은 런타임 보장이 아니다.
- **인가는 세션에서.** 클라이언트가 보낸 `parentId`·`childId` 를 그대로 믿으면 수평 권한 상승이 된다. 항상 소유권을 검증한다.
- **mutation 은 `idempotencyKey` 를 받는다.** 네트워크 재시도·중복 클릭이 별 중복 지급으로 이어지는 경로다.
- 스키마는 `lib/validations/**` 에 두고 클라이언트 폼과 공유한다. 두 벌로 관리하지 않는다.
- 성공/실패를 **반환값으로** 표현한다. 예외를 UI 경계까지 던지지 않는다.

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: 'FORBIDDEN' | 'INVALID' | 'CONFLICT'; message: string }
```

- 메시지는 **아동용/보호자용을 분리**한다. 아동 화면에 기술 용어를 노출하지 않는다.
- 쓰기 후 `revalidatePath` 로 RSC 캐시를 무효화한다.

## 금지

- Server Action 에서 `prisma.*` 직접 호출
- 검증 없이 `raw` 를 service 로 전달
- 세션 없이 `childId` 만으로 데이터 접근
