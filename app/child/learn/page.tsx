import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { topics, starBalance } from "./learn.fixture";

// TASK-206 · REQ-FUNC-003 — 4주제 카드
export const metadata = { title: "배우기 · 핀프렌즈" };

export default function ChildLearnPage() {
  return (
    <>
      <StarHUD balance={starBalance} />

      <section className="p-gap">
        <h1 className="text-title font-bold">무엇을 배워볼까?</h1>
        <p className="text-ink-soft">퀴즈를 맞히면 별을 하나 받아요.</p>
      </section>

      <ul className="grid gap-3 px-gap pb-gap">
        {topics.map((t) => {
          const inner = (
            <>
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-title">
                  {t.emoji}
                </span>
                <div className="flex-1">
                  <p className="font-bold">
                    {t.name}
                    {t.locked && (
                      <span className="ml-2 rounded-full bg-ink-soft/15 px-2 py-0.5 align-middle text-ink-soft">
                        🔒 잠김
                      </span>
                    )}
                  </p>
                  <p className="text-ink-soft">{t.summary}</p>
                </div>
                <span className="tabular-nums text-ink-soft">
                  {t.done}/{t.total}
                </span>
              </div>
              {t.locked && t.lockReason && (
                <p className="mt-2 rounded-card bg-ink-soft/10 p-2 text-ink-soft">
                  {t.lockReason}
                </p>
              )}
            </>
          );

          return (
            <li key={t.id}>
              {t.locked ? (
                <div className="rounded-card bg-surface p-gap opacity-70">{inner}</div>
              ) : (
                <Link
                  href={`/child/quiz/${t.id}`}
                  className="block min-h-touch rounded-card bg-surface p-gap"
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <nav className="px-gap pb-gap">
        <Link href="/child/tree" className="flex min-h-touch items-center justify-center rounded-card bg-surface">
          내 나무로 돌아가기
        </Link>
      </nav>
    </>
  );
}
