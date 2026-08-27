import { Skeleton } from "@/components/ui/skeleton";

// TASK-403 — 같은 Skeleton 이 Clean 토큰(작은 라운드)으로 렌더된다.
// 듀얼 테마가 컴포넌트를 고치지 않고 성립하는지 확인하는 자리다.
export default function Loading() {
  return (
    <div className="p-gap">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="mt-gap h-28 w-full" />
      <Skeleton className="mt-gap h-10 w-full" />
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    </div>
  );
}
