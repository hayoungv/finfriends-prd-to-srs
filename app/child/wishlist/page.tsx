import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { wish, starBalance } from "./wishlist.fixture";

// TASK-215 · REQ-FUNC-013 — 위시리스트 마일스톤 게이지
export const metadata = { title: "갖고 싶은 것 · 핀프렌즈" };

export default function ChildWishlistPage() {
  const pct = Math.min(100, Math.round((wish.saved / wish.goal) * 100));

  return (
    <>
      <StarHUD balance={starBalance} />

      <section className="p-gap">
        <h1 className="text-title font-bold">{wish.name}</h1>
        <p className="text-ink-soft">
          부모님께 받은 용돈 {wish.goal.toLocaleString("ko-KR")}원을 모으면 살 수 있어요.
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          별은 옷장에 쓰고, 이 목표는 용돈으로 모아요.
        </p>

        <div className="mt-gap rounded-card bg-surface p-gap">
          <div className="mb-1.5 flex items-baseline justify-between">
            <strong className="tabular-nums">
              ₩ {wish.saved.toLocaleString("ko-KR")} / {wish.goal.toLocaleString("ko-KR")}
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
                        : `용돈 ${(Math.ceil((m.pct / 100) * wish.goal) - wish.saved).toLocaleString("ko-KR")}원 더`}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-ink-soft">
            부모님께 받은 용돈을 저축한 금액이에요. 한 번 받은 마일스톤 별은 다시 받지 않아요.
          </p>
        </div>
      </section>

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/missions"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          용돈 모으기 계속하기
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
