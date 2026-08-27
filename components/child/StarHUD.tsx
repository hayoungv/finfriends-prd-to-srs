// TASK-205 · REQ-FUNC-002 — 전 아동 화면 상단 고정 HUD.
// REG-005c: 별에 "원화 환산"·"출금" 표기를 넣지 않는다. 별은 별로만 센다.
export function StarHUD({
  balance,
  earned = false,
}: {
  balance: number;
  earned?: boolean;
}) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-surface/95 px-gap py-3 backdrop-blur">
      <span className="font-bold">핀프렌즈</span>
      <span
        className="flex items-center gap-1.5 rounded-card px-3 py-1.5"
        style={{ background: "var(--ff-star-glow)" }}
        aria-label={`내 별 ${balance}개`}
      >
        <span
          aria-hidden
          className={earned ? "star-earn inline-block text-title" : "inline-block text-title"}
          style={{ color: "var(--ff-star)" }}
        >
          ★
        </span>
        <strong className="text-title tabular-nums">{balance}</strong>
      </span>
    </header>
  );
}
