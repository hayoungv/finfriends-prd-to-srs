---
name: 304-vercel-ai-gemini-fallback-rules
description: Vercel AI SDK + Gemini 1.5 Flash 회고 생성과 결정론적 Fallback 규칙 (ADR-010). lib/ai/** 작업 시 사용.
---

# Vercel AI SDK + Gemini — 회고 파이프라인 (ADR-010)

## 전제

**AI 는 옵션이지 의존이 아니다.** Gemini 가 죽어도 아이는 회고를 받아야 한다.
무료 쿼터로 운영하므로 429 는 예외가 아니라 **평상시 발생하는 정상 분기**다.

## 필수 구조

```ts
// lib/ai/gemini-client.ts
const TIMEOUT_MS = 2500   // REQ-NF-005 — 초과 시 즉시 Fallback

export async function generateRetro(ctx: RetroContext): Promise<RetroResult> {
  try {
    const res = await Promise.race([
      generateText({ model: google('gemini-1.5-flash'), prompt: buildPrompt(ctx) }),
      timeout(TIMEOUT_MS),
    ])
    return { source: 'AI', text: sanitize(res.text) }
  } catch (e) {
    // 429 · timeout · 네트워크 — 전부 동일 처리. 던지지 않는다.
    return { source: 'FALLBACK', text: renderTemplate(ctx) }
  }
}
```

## Fallback 은 결정론적이어야 한다

`lib/ai/fallback-templates.ts` — 룰 기반 문장 선택. 같은 입력이면 같은 문장이 나온다.
난수·시각 의존을 넣지 않는다. 테스트가 불가능해진다.

## 아동 안전 (필수)

- 프롬프트에 **PII 를 넣지 않는다.** 아동 실명·생년·계정 식별자 금지. 별칭과 집계값만 전달한다.
- 출력은 **비복원 추출 + 화이트리스트 검증**을 거친다. 모델이 만든 문장을 그대로 렌더링하지 않는다.
- 비난·비교·금액 강조 표현을 금지 문구로 필터링한다. 회고의 목적은 평가가 아니라 다음 실천이다.
- 판정(별 지급 여부)은 **코드가 결정한다.** 모델에게 판정을 위임하지 않는다.

## 회고 3갈래 (TDS §14.3)

| 조건 | 결과 |
|---|---|
| `planMet = true` | 별 1개 + 칭찬 회고 |
| `planMet = false` | 별 없음 + 회고만 |
| `categoryMet = false AND planMet = true` | 별 1개 + 업종 불일치 회고 |

`planMet = actualAmount <= plannedAmount` · `categoryMet = categoryCode == plannedCategoryCode`

## 중복 방지

동일 회고 문장 재노출률 ≤ 2/8 (7일 창). `retro_sentence_pool` 에서 최근 노출을 제외하고 선택한다.

## 검증

```bash
npm run test tests/unit/fallback-engine.test.ts   # 429/Timeout 주입 → 룰 템플릿 100% 전환
```
