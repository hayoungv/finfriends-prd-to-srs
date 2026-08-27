import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import {
  missions,
  STATUS_LABEL,
  starBalance,
  type MissionStatus,
} from "./mission.fixture";

// TASK-207 · REQ-FUNC-004 — 미션 보고. 상태 전이가 한눈에 보여야 한다.
export const metadata = { title: "실천하기 · 핀프렌즈" };

const FLOW: readonly MissionStatus[] = [
  "CREATED",
  "PENDING_APPROVAL",
  "APPROVED",
];

function StatusChip({ status }: { status: MissionStatus }) {
  const style: Record<MissionStatus, { bg: string; fg: string }> = {
    CREATED: { bg: "var(--ff-surface)", fg: "var(--ff-ink-soft)" },
    PENDING_APPROVAL: { bg: "var(--ff-star-glow)", fg: "var(--ff-ink)" },
    APPROVED: { bg: "var(--ff-primary)", fg: "var(--ff-surface)" },
    REJECTED: { bg: "var(--ff-miss)", fg: "var(--ff-surface)" },
  };
  const s = style[status];
  return (
    <span
      className="rounded-full px-2.5 py-1"
      style={{ background: s.bg, color: s.fg }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

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

      {/* 상태가 어떻게 흘러가는지 먼저 보여준다 */}
      <ol className="mx-gap flex items-center justify-between rounded-card bg-surface px-gap py-3 text-ink-soft">
        {FLOW.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span>{STATUS_LABEL[s]}</span>
            {i < FLOW.length - 1 && <span aria-hidden>→</span>}
          </li>
        ))}
      </ol>

      <ul className="grid gap-2 p-gap">
        {missions.map((m) => (
          <li key={m.id} className="rounded-card bg-surface p-gap">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold">{m.title}</span>
              <span className="tabular-nums" style={{ color: "var(--ff-star)" }}>
                ★ {m.reward}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <StatusChip status={m.status} />
              {m.status === "CREATED" && (
                <button
                  type="button"
                  className="min-h-touch rounded-card px-gap font-bold text-surface"
                  style={{ background: "var(--ff-primary)" }}
                >
                  다 했어요
                </button>
              )}
            </div>
            {m.note && (
              <p className="mt-2 rounded-card bg-ink-soft/10 p-2">{m.note}</p>
            )}
          </li>
        ))}
      </ul>

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
