// TASK-214 — 2D 그래픽 아바타.
// REG-006: 얼굴 사진을 다루지 않는다. 업로드 컨트롤을 배치하지 않으며 그래픽만 쓴다.
// 실제 에셋 형식(2D 벡터 vs 사전 제작 3D)은 PRD F5 ↔ SRS §6.6 이 어긋나 있어
// TASK-214 착수 전 별도 해소한다 (grill T14). 그때까지 이 인라인 SVG 가 플레이스홀더다.
export type OutfitId = "basic" | "raincoat" | "explorer" | "chef";

const OUTFIT: Record<OutfitId, { body: string; label: string }> = {
  basic: { body: "#7E9BD4", label: "기본 옷" },
  raincoat: { body: "#F2B84B", label: "노란 비옷" },
  explorer: { body: "#5FA871", label: "탐험가 조끼" },
  chef: { body: "#E0E4EA", label: "요리사 옷" },
};

export function WardrobeAvatar({
  outfit = "basic",
  size = 76,
}: {
  outfit?: OutfitId;
  size?: number;
}) {
  const { body, label } = OUTFIT[outfit];
  return (
    <svg viewBox="0 0 60 80" width={size} height={size} role="img" aria-label={label}>
      <circle cx="30" cy="20" r="14" fill="#F3D2B3" />
      <path d="M16 16 C16 5 44 5 44 16 C44 10 16 10 16 16 Z" fill="#4A3B33" />
      <circle cx="24" cy="21" r="2" fill="#3B2F28" />
      <circle cx="36" cy="21" r="2" fill="#3B2F28" />
      <path d="M25 27 Q30 31 35 27" stroke="#3B2F28" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M30 34 C16 34 12 44 12 62 L48 62 C48 44 44 34 30 34 Z" fill={body} />
      <rect x="20" y="62" width="8" height="14" rx="3" fill="#3B4A63" />
      <rect x="32" y="62" width="8" height="14" rx="3" fill="#3B4A63" />
    </svg>
  );
}

export const OUTFIT_LABELS = OUTFIT;
