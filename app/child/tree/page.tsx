import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { TreeArt, TREE_STAGES, type TreeStage } from "@/components/child/TreeArt";
import { WardrobeAvatar } from "@/components/child/WardrobeAvatar";
import { trees, starBalance, type GrowthCondition, type GrowthTree } from "./tree.fixture";

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

function TreeCard({ tree }: { tree: GrowthTree }) {
  return (
    <article className="rounded-card bg-surface p-3">
      <div className="flex items-center gap-2">
        <TreeArt stage={tree.stage} size={76} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="font-bold">{tree.label}</h2>
            <span className="text-sm text-ink-soft">{TREE_STAGES[tree.stage]}</span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {tree.locked ? "학습만 먼저 열려 있어요" : `이번 사이클 ${tree.cycleDays}일째`}
          </p>
        </div>
      </div>
      <ul className="mt-2 grid gap-1.5">
        {tree.conditions.map((c) => <Gauge key={c.label} c={c} />)}
      </ul>
      {tree.nudge && (
        <p className="mt-2 rounded-card bg-ink-soft/10 px-2 py-1.5 text-sm font-bold">
          {tree.nudge}
        </p>
      )}
    </article>
  );
}

export default function ChildTreePage() {
  const activeTree = trees.find((tree) => tree.nudge) ?? trees[0];

  return (
    <>
      <StarHUD balance={starBalance} />

      {/* AC3 — 넛지는 최상단이다 */}
      {activeTree.nudge && (
        <p
          className="mx-gap mt-gap rounded-card px-gap py-3 font-bold"
          style={{ background: "var(--ff-star-glow)" }}
        >
          🌱 {activeTree.nudge}
        </p>
      )}

      <section className="flex flex-col items-center gap-2 p-gap">
        <div className="flex items-end gap-3">
          <TreeArt stage={activeTree.stage} />
          <WardrobeAvatar />
        </div>
        <h1 className="text-title font-bold">내 금융 나무 4그루</h1>
        <p className="text-ink-soft">벌기 · 쓰기 · 모으기 · 불리기</p>
      </section>

      <section className="px-gap">
        <h2 className="mb-2 font-bold">내 나무 4그루</h2>
        <ul
          aria-label="금융 나무 둘러보기"
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
        >
          {trees.map((tree) => (
            <li key={tree.id} className="min-w-[88%] snap-center">
              <TreeCard tree={tree} />
            </li>
          ))}
        </ul>
        <p className="mt-1 text-center text-sm text-ink-soft">
          옆으로 밀어서 다른 나무도 만나보세요 · ● ● ● ●
        </p>
        <p className="mt-2 text-ink-soft">
          각 나무는 그 영역의 배움과 실천이 함께 쌓일 때 자라요.
        </p>
      </section>

      <section className="p-gap">
        <h2 className="mb-2 font-bold">나무는 이렇게 자라요</h2>
        <ol className="flex items-end justify-between rounded-card bg-surface p-3">
          {TREE_STAGES.map((name, i) => (
            <li key={name} className="flex flex-col items-center gap-1">
              <div style={{ opacity: i === activeTree.stage ? 1 : 0.32 }}>
                <TreeArt stage={i as TreeStage} size={62} />
              </div>
              <span className={i === activeTree.stage ? "font-bold" : "text-ink-soft"}>
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
