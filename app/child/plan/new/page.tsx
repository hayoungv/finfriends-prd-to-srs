import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { PlanForm } from "@/components/child/PlanForm";
import { merchantKinds, expiryHours, starBalance } from "./plan.fixture";

// TASK-209 · REQ-FUNC-007 — 소비 계획 카드
export const metadata = { title: "쓸 계획 적기 · 핀프렌즈" };

export default function ChildPlanNewPage() {
  return (
    <>
      <StarHUD balance={starBalance} />

      <section className="p-gap">
        <h1 className="text-title font-bold">무엇을 살지 미리 적어요</h1>
        <p className="text-ink-soft">
          가게에 가기 전에 적어두면 흔들리지 않아요.
        </p>
      </section>

      <div className="px-gap pb-gap">
        <PlanForm kinds={merchantKinds} expiryHours={expiryHours} />
      </div>

      <nav className="px-gap pb-gap">
        <Link
          href="/child/tree"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          나중에 할래요
        </Link>
      </nav>
    </>
  );
}
