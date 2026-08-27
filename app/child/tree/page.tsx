import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { TreeArt, TREE_STAGES, type TreeStage } from "@/components/child/TreeArt";
import { WardrobeAvatar } from "@/components/child/WardrobeAvatar";
import { tree, starBalance, type GrowthCondition } from "./tree.fixture";

// TASK-212 · TASK-205 · REQ-FUNC-005 — Fun 메인
export const metadata = { title: "내 나무 · 핀프렌즈" };

function Gauge({ c }: { c: GrowthCondition }) {
  const done = c.current >= c.required;
  const pct = Math.min(100, Math.round((c.current / c.required) * 100));
  return (
    <li className="rounded-card bg-surface p-3">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-bold">{c.label}</span>
        <span className="tabular-nums">
          {c.current}/{c.required} {done ? "✅" : "❌"}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-ink-soft/15">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: done ? "var(--ff-primary)" : "var(--ff-miss)",
          }}
        />
      </div>
    </li>
  );
}

export default function ChildTreePage() {
  return (
    <>
      <StarHUD balance={starBalance} />

      {/* AC3 — 넛지는 최상단이다 */}
      {tree.nudge && (
        <p
          className="mx-gap mt-gap rounded-card px-gap py-3 font-bold"
          style={{ background: "var(--ff-star-glow)" }}
        >
          🌱 {tree.nudge}
        </p>
      )}

      <section className="flex flex-col items-center gap-2 p-gap">
        <div className="flex items-end gap-3">
          <TreeArt stage={tree.stage} />
          <WardrobeAvatar />
        </div>
        <h1 className="text-title font-bold">{TREE_STAGES[tree.stage]}</h1>
        <p className="text-ink-soft">이번 사이클 {tree.cycleDays}일째</p>
      </section>

      <section className="px-gap">
        <h2 className="mb-2 font-bold">다음 단계까지</h2>
        <ul className="grid gap-2">
          {tree.conditions.map((c) => (
            <Gauge key={c.label} c={c} />
          ))}
        </ul>
        <p className="mt-2 text-ink-soft">
          세 가지를 모두 채워야 나무가 자라요. 하나라도 비어 있으면 기다려요.
        </p>
      </section>

      <section className="p-gap">
        <h2 className="mb-2 font-bold">나무는 이렇게 자라요</h2>
        <ol className="flex items-end justify-between rounded-card bg-surface p-3">
          {TREE_STAGES.map((name, i) => (
            <li key={name} className="flex flex-col items-center gap-1">
              <div style={{ opacity: i === tree.stage ? 1 : 0.32 }}>
                <TreeArt stage={i as TreeStage} size={62} />
              </div>
              <span className={i === tree.stage ? "font-bold" : "text-ink-soft"}>
                {name}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/missions"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          실천하러 가기
        </Link>
        <div className="grid grid-cols-3 gap-2">
          <Link href="/child/learn" className="flex min-h-touch items-center justify-center rounded-card bg-surface">
            배우기
          </Link>
          <Link href="/child/wardrobe" className="flex min-h-touch items-center justify-center rounded-card bg-surface">
            옷장
          </Link>
          <Link href="/child/wishlist" className="flex min-h-touch items-center justify-center rounded-card bg-surface">
            갖고 싶은 것
          </Link>
        </div>
      </nav>
    </>
  );
}
