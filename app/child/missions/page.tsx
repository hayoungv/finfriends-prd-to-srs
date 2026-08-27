import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { MissionReport } from "@/components/child/MissionReport";
import { missions, starBalance } from "./mission.fixture";

// TASK-207 · REQ-FUNC-004 — 미션 보고. 상태 전이가 클릭으로 시연된다.
export const metadata = { title: "실천하기 · 핀프렌즈" };

export default function ChildMissionsPage() {
  return (
    <>
      <StarHUD balance={starBalance} />

      <section className="p-gap">
        <h1 className="text-title font-bold">오늘 실천할 일</h1>
        <p className="text-ink-soft">
          실천을 한 번이라도 해야 나무가 자라요.
        </p>
      </section>

      <MissionReport missions={missions} />

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/plan/new"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          쓸 계획 적으러 가기
        </Link>
        <Link
          href="/child/tree"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          내 나무 보기
        </Link>
      </nav>
    </>
  );
}
