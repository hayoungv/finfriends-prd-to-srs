import { Skeleton } from "@/components/ui/skeleton";

// TASK-403 — Cold Start Skeleton. 같은 컴포넌트가 Fun 토큰(큰 라운드)으로 렌더된다.
export default function Loading() {
  return (
    <div className="p-gap">
      <Skeleton className="h-12 w-full" />
      <div className="mt-gap flex flex-col items-center gap-3">
        <Skeleton className="size-40 rounded-full" />
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="mt-gap grid gap-2">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
