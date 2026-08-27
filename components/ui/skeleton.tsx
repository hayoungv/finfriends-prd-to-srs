// TASK-403 산출물 — Cold Start Skeleton. 듀얼 테마 토큰의 물리적 앵커.
// 테마를 알지 못한다. 조상 [data-mode] 가 라운드·색을 결정한다.
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-card bg-ink-soft/15 ${className}`}
    />
  );
}
