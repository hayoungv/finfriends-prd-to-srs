// TASK-212 — 성장 나무 4단계. 실루엣만으로 단계가 구별돼야 한다.
// 승급 전이는 모션이 아니라 정지 교체다 (실행 지시서 §5.1).
export const TREE_STAGES = ["새싹", "묘목", "어린 나무", "풍성한 나무"] as const;
export type TreeStage = 0 | 1 | 2 | 3;

const TRUNK = "#8D6E63";

export function TreeArt({
  stage,
  size = 160,
}: {
  stage: TreeStage;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${TREE_STAGES[stage]} 단계`}
    >
      <ellipse cx="50" cy="94" rx="30" ry="5" fill={TRUNK} opacity="0.18" />
      {stage === 0 && (
        <>
          <path d="M50 92 L50 74" stroke={TRUNK} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 78 C38 78 34 68 34 62 C44 62 50 70 50 78 Z" fill="var(--ff-primary)" />
          <path d="M50 82 C62 82 66 74 66 68 C56 68 50 74 50 82 Z" fill="var(--ff-primary)" />
        </>
      )}
      {stage === 1 && (
        <>
          <path d="M50 92 L50 56" stroke={TRUNK} strokeWidth="5" strokeLinecap="round" />
          <path d="M50 66 L38 58" stroke={TRUNK} strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="44" r="18" fill="var(--ff-primary)" />
          <circle cx="36" cy="54" r="9" fill="var(--ff-primary)" />
        </>
      )}
      {stage === 2 && (
        <>
          <path d="M50 92 L50 48" stroke={TRUNK} strokeWidth="8" strokeLinecap="round" />
          <path d="M50 62 L32 50 M50 58 L68 46" stroke={TRUNK} strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="34" r="20" fill="var(--ff-primary)" />
          <circle cx="30" cy="46" r="13" fill="var(--ff-primary)" />
          <circle cx="70" cy="42" r="14" fill="var(--ff-primary)" />
        </>
      )}
      {stage === 3 && (
        <>
          <path d="M50 92 L50 52" stroke={TRUNK} strokeWidth="11" strokeLinecap="round" />
          <path d="M50 66 L26 52 M50 60 L74 46 M50 74 L34 68" stroke={TRUNK} strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="28" r="22" fill="var(--ff-primary)" />
          <circle cx="24" cy="44" r="17" fill="var(--ff-primary)" />
          <circle cx="76" cy="40" r="18" fill="var(--ff-primary)" />
          <circle cx="38" cy="16" r="13" fill="var(--ff-primary)" />
          <circle cx="66" cy="14" r="12" fill="var(--ff-primary)" />
          <circle cx="34" cy="36" r="3.5" fill="var(--ff-star)" />
          <circle cx="64" cy="30" r="3.5" fill="var(--ff-star)" />
          <circle cx="52" cy="48" r="3.5" fill="var(--ff-star)" />
        </>
      )}
    </svg>
  );
}
