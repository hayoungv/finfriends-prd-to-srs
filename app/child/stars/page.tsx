import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { balance, entries, pageSize } from "./ledger.fixture";

// TASK-205 · REQ-FUNC-002 — 별 잔액과 획득 이력
// REG-005c: "원화 환산"·"출금" 표기를 넣지 않는다. 별은 별로만 센다.
export const metadata = { title: "내 별 · 핀프렌즈" };

export default async function ChildStarsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);
  const pages = Math.ceil(entries.length / pageSize);
  const shown = entries.slice((current - 1) * pageSize, current * pageSize);

  return (
    <>
      <StarHUD balance={balance} />

      <section className="flex flex-col items-center gap-1 p-gap">
        <span
          aria-hidden
          className="text-7xl"
          style={{ color: "var(--ff-star)" }}
        >
          ★
        </span>
        <p className="text-title font-bold tabular-nums">{balance}개</p>
        <p className="text-ink-soft">모아둔 별이에요</p>
      </section>

      <section className="px-gap">
        <h1 className="mb-2 font-bold">어떻게 모았지?</h1>
        <ul className="grid gap-2">
          {shown.map((e) => {
            const plus = e.delta > 0;
            return (
              <li
                key={e.id}
                className="flex min-h-touch items-center justify-between rounded-card bg-surface px-gap py-2"
              >
                <span>
                  <span className="block">{e.reason}</span>
                  <span className="text-ink-soft">{e.when}</span>
                </span>
                <strong
                  className="tabular-nums"
                  style={{ color: plus ? "var(--ff-primary)" : "var(--ff-ink-soft)" }}
                >
                  {plus ? "+" : ""}
                  {e.delta} ★
                </strong>
              </li>
            );
          })}
        </ul>

        {pages > 1 && (
          <nav className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`?page=${p}`}
                aria-current={p === current ? "page" : undefined}
                className="flex size-touch items-center justify-center rounded-card bg-surface tabular-nums"
                style={{
                  outline: p === current ? "2px solid var(--ff-primary)" : "none",
                }}
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </section>

      <nav className="grid gap-2 p-gap">
        <Link
          href="/child/wardrobe"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          별로 옷 사러 가기
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
