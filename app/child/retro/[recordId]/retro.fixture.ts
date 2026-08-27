// PROTO-DATA: TASK-211 — generateAIRetro() 구현 시 이 파일을 삭제하고 actions/retro.ts 호출로 대체한다
// TASK-210 의 3단계 대조가 plan_met 을 넘겨주고, TASK-402 의 룰 엔진이 fallback 문구를 만든다.

export type RetroVariant = "praise" | "encourage" | "fallback";

export type Retro = {
  readonly variant: RetroVariant;
  readonly label: string;
  /** 계획 대비 실제. plan_met = actual <= planned */
  readonly planned: number;
  readonly actual: number;
  readonly place: string;
  readonly starAwarded: 0 | 1;
  readonly headline: string;
  readonly body: string;
  /** Gemini 2.5s 타임아웃 / 429 시 결정론적 룰 템플릿으로 대체됐는가 (ADR-010) */
  readonly ruleBased: boolean;
};

const RETROS: Record<RetroVariant, Retro> = {
  // 실제 <= 계획 → 별 1개 지급
  praise: {
    variant: "praise",
    label: "AI 칭찬",
    planned: 3000,
    actual: 2400,
    place: "학교 앞 문구점",
    starAwarded: 1,
    headline: "계획을 지켰구나! 🎉",
    body: "3000원 쓰려고 했는데 2400원만 썼네. 사고 싶은 걸 하나 참은 거지? 그 600원이 네 나무를 키워줄 거야.",
    ruleBased: false,
  },
  // 실제 > 계획 → 별 없음. 다만 혼내지 않는다
  encourage: {
    variant: "encourage",
    label: "AI 격려",
    planned: 3000,
    actual: 4200,
    place: "학교 앞 문구점",
    starAwarded: 0,
    headline: "이번엔 조금 넘었네",
    body: "3000원 계획이었는데 4200원을 썼어. 가게에 가면 더 갖고 싶어지는 건 어른도 똑같아. 다음엔 딱 하나만 정하고 가볼까?",
    ruleBased: false,
  },
  // Gemini 장애 → 고정 템플릿. 아이에게 "AI가 실패했다"가 티나면 안 된다
  fallback: {
    variant: "fallback",
    label: "룰 Fallback",
    planned: 3000,
    actual: 2400,
    place: "학교 앞 문구점",
    starAwarded: 1,
    headline: "계획을 지켰구나! 🎉",
    body: "적어둔 3000원보다 적게 썼어. 계획을 지킨 날은 별을 하나 받아. 다음에도 이렇게 해보자.",
    ruleBased: true,
  },
};

export function getRetro(variant?: string): Retro {
  if (variant === "encourage" || variant === "fallback" || variant === "praise") {
    return RETROS[variant];
  }
  return RETROS.praise;
}

export const RETRO_VARIANTS = ["praise", "encourage", "fallback"] as const;

export const starBalance = 11;
