import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { wish, balance } from "./wishlist.fixture";

// TASK-215 · REQ-FUNC-013 — 위시리스트 마일스톤 게이지
export const metadata = { title: "갖고 싶은 것 · 핀프렌즈" };

export default function ChildWishlistPage() {
  const pct = Math.min(100, Math.round((wish.saved / wish.goal) * 100));

  return (
    <>
      <StarHUD balance={balance} />

      <section className="p-gap">
        <h1 className="text-title font-bold">{wish.name}</h1>
        <p className="text-ink-soft">
          별 {wish.goal}개를 모으면 살 수 있어요.
        </p>

        <div className="mt-gap rounded-card bg-surface p-gap">
          <div className="mb-1.5 flex items-baseline justify-between">
            <strong className="tabular-nums">
              ★ {wish.saved} / {wish.goal}
            </strong>
            <span className="tabular-nums text-ink-soft">{pct}%</span>
          </div>

          {/* 마일스톤 게이지 — 30/70/100 지점을 눈금으로 박는다 */}
          <div className="relative h-4 overflow-hidden rounded-full bg-ink-soft/15">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: "var(--ff-star)" }}
            />
            {wish.milestones.map((m) => (
              <span
                key={m.pct}
                aria-hidden
                className="absolute top-0 h-full w-0.5 bg-surface"
                style={{ left: `${m.pct}%` }}
              />
            ))}
          </div>

          <ul className="mt-3 grid gap-1.5">
            {wish.milestones.map((m) => {
              const reached = pct >= m.pct;
              return (
                <li
                  key={m.pct}
                  className="flex items-center justify-between gap-2 rounded-card px-3 py-2"
                  style={{
                    background: m.awarded
                      ? "var(--ff-star-glow)"
                      : "var(--ff-canvas)",
                  }}
                >
                  <span>
                    <strong className="tabular-nums">{m.pct}%</strong> {m.label}
                  </span>
                  <span className="text-ink-soft">
                    {m.awarded
                      ? "★ 받음"
                      : reached
                        ? "곧 받아요"
                        : `별 ${Math.ceil((m.pct / 100) * wish.goal) - wish.saved}개 더`}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-ink-soft">
            한 번 받은 칸은 다시 받지 않아요. 다음 칸을 향해 가요.
          </p>
        </div>
      </section>

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/missions"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          별 모으러 가기
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
