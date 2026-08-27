import Link from "next/link";
import { steps, savedAt, savedSummary } from "./onboarding.fixture";

// TASK-201 · REQ-FUNC-001 AC1 — 5단계 온보딩. 중간 이탈 후 재개 상태를 그린다.
export const metadata = { title: "시작하기 · 핀프렌즈" };

export default function ParentOnboardingPage() {
  return (
    <div className="p-gap">
      <h1 className="text-title font-bold">핀프렌즈 시작하기</h1>
      <p className="text-ink-soft">
        5단계 중 <strong className="text-ink">{savedAt}단계</strong>부터 이어서
        진행합니다. 이전 입력은 저장돼 있습니다.
      </p>

      {/* 스텝 인디케이터 — 어디까지 왔고 어디서 멈췄는지가 한눈에 보여야 한다 */}
      <ol className="mt-gap flex items-center gap-1">
        {steps.map((s) => {
          const done = s.n < savedAt;
          const now = s.n === savedAt;
          return (
            <li key={s.n} className="flex flex-1 flex-col items-center gap-1">
              <span
                className="flex size-7 items-center justify-center rounded-full tabular-nums"
                style={{
                  background: done
                    ? "var(--ff-primary)"
                    : now
                      ? "var(--ff-star-glow)"
                      : "var(--ff-surface)",
                  color: done ? "var(--ff-surface)" : "var(--ff-ink)",
                  outline: now ? "2px solid var(--ff-star)" : "none",
                }}
              >
                {done ? "✓" : s.n}
              </span>
              <span
                className="text-center"
                style={{ color: now ? "var(--ff-ink)" : "var(--ff-ink-soft)" }}
              >
                {s.title}
              </span>
            </li>
          );
        })}
      </ol>

      <ul className="mt-gap grid gap-1.5">
        {steps.map((s) => {
          const done = s.n < savedAt;
          const now = s.n === savedAt;
          return (
            <li
              key={s.n}
              className="rounded-card bg-surface p-3"
              style={{
                outline: now ? "2px solid var(--ff-primary)" : "none",
                opacity: !done && !now ? 0.55 : 1,
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <strong>
                  {s.n}. {s.title}
                </strong>
                {done && <span className="text-ink-soft">완료</span>}
                {now && (
                  <span style={{ color: "var(--ff-primary)" }}>여기부터</span>
                )}
              </div>
              <p className="text-ink-soft">
                {done ? (savedSummary[s.n] ?? s.detail) : s.detail}
              </p>
            </li>
          );
        })}
      </ul>

      <nav className="mt-gap grid gap-1.5">
        <Link
          href="/consent"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          {savedAt}단계 이어서 하기
        </Link>
        <Link
          href="/parent/forest"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          나중에 하기
        </Link>
      </nav>
    </div>
  );
}
