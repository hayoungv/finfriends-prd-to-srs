// TASK-214 · SRS §6.6 AC1 — 동물 아바타 2종(토끼·다람쥐) × 의상 4종.
// REG-006 · ADR-007: 얼굴 사진을 다루지 않는다. 업로드 컨트롤을 배치하지 않으며
// 사전 제작된 2D 벡터 그래픽만 쓴다.
// 실제 에셋 형식은 PRD F5("사전 제작 3D") ↔ SRS §6.6 AC3("2D 벡터")가 어긋나 있어
// TASK-214 착수 전 별도 해소한다 (grill T14). 그때까지 이 인라인 SVG 가 플레이스홀더다.

export type SpeciesId = "rabbit" | "squirrel";
export type OutfitId = "basic" | "raincoat" | "explorer" | "chef";

const SPECIES: Record<SpeciesId, { name: string; fur: string; inner: string }> = {
  rabbit: { name: "토끼", fur: "#F0E4DA", inner: "#F3B6C0" },
  squirrel: { name: "다람쥐", fur: "#C98A4B", inner: "#F0D2AE" },
};

const OUTFITS: Record<OutfitId, { name: string; color: string }> = {
  basic: { name: "기본 옷", color: "#7E9BD4" },
  raincoat: { name: "노란 비옷", color: "#F2B84B" },
  explorer: { name: "탐험가 조끼", color: "#5FA871" },
  chef: { name: "요리사 옷", color: "#E0E4EA" },
};

export function WardrobeAvatar({
  species = "rabbit",
  outfit = "basic",
  size = 76,
}: {
  species?: SpeciesId;
  outfit?: OutfitId;
  size?: number;
}) {
  const s = SPECIES[species];
  const o = OUTFITS[outfit];

  return (
    <svg
      viewBox="0 0 60 80"
      width={size}
      height={size}
      role="img"
      aria-label={`${s.name} · ${o.name}`}
    >
      {/* 귀 — 종을 실루엣만으로 가르는 유일한 부분 */}
      {species === "rabbit" ? (
        <>
          <ellipse cx="22" cy="10" rx="4.5" ry="12" fill={s.fur} />
          <ellipse cx="22" cy="11" rx="2" ry="8" fill={s.inner} />
          <ellipse cx="38" cy="10" rx="4.5" ry="12" fill={s.fur} />
          <ellipse cx="38" cy="11" rx="2" ry="8" fill={s.inner} />
        </>
      ) : (
        <>
          {/* 다람쥐는 둥근 귀 + 굵은 꼬리 */}
          <circle cx="20" cy="14" r="6" fill={s.fur} />
          <circle cx="20" cy="14" r="3" fill={s.inner} />
          <circle cx="40" cy="14" r="6" fill={s.fur} />
          <circle cx="40" cy="14" r="3" fill={s.inner} />
          <path
            d="M48 62 C60 58 60 36 46 32 C54 40 52 54 44 58 Z"
            fill={s.fur}
          />
        </>
      )}

      <circle cx="30" cy="26" r="14" fill={s.fur} />
      <circle cx="25" cy="24" r="2" fill="#3B2F28" />
      <circle cx="35" cy="24" r="2" fill="#3B2F28" />
      <path d="M28 30 L32 30 L30 32 Z" fill={s.inner} />
      <path
        d="M26 34 Q30 37 34 34"
        stroke="#3B2F28"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />

      {/* 의상 */}
      <path d="M30 38 C17 38 13 47 13 64 L47 64 C47 47 43 38 30 38 Z" fill={o.color} />
      {outfit === "raincoat" && (
        <path d="M30 38 L30 64" stroke="#D89F2E" strokeWidth="1.5" />
      )}
      {outfit === "explorer" && (
        <>
          <rect x="19" y="46" width="8" height="6" rx="1.5" fill="#3E7A52" />
          <rect x="33" y="46" width="8" height="6" rx="1.5" fill="#3E7A52" />
        </>
      )}
      {outfit === "chef" && (
        <path d="M18 30 C18 22 42 22 42 30 L42 33 L18 33 Z" fill="#FFFFFF" />
      )}

      <rect x="20" y="64" width="8" height="12" rx="3" fill="#6B584C" />
      <rect x="32" y="64" width="8" height="12" rx="3" fill="#6B584C" />
    </svg>
  );
}
