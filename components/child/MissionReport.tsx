"use client";

import { useState } from "react";

// TASK-207 · REQ-FUNC-004 AC1 — CREATED → PENDING_APPROVAL 전이를 클릭으로 시연한다.
// 승인·반려는 보호자 화면(/parent/missions)의 몫이므로 여기서는 보고까지만 간다.
export type MissionStatus =
  | "CREATED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED";

export type Mission = {
  readonly id: string;
  readonly title: string;
  readonly reward: number;
  readonly status: MissionStatus;
  readonly note?: string;
};

const STATUS_LABEL: Record<MissionStatus, string> = {
  CREATED: "아직 안 했어요",
  PENDING_APPROVAL: "확인 기다리는 중",
  APPROVED: "칭찬받았어요",
  REJECTED: "다시 해볼까?",
};

const STATUS_STYLE: Record<MissionStatus, { bg: string; fg: string }> = {
  CREATED: { bg: "var(--ff-surface)", fg: "var(--ff-ink-soft)" },
  PENDING_APPROVAL: { bg: "var(--ff-star-glow)", fg: "var(--ff-ink)" },
  APPROVED: { bg: "var(--ff-primary)", fg: "var(--ff-surface)" },
  REJECTED: { bg: "var(--ff-miss)", fg: "var(--ff-surface)" },
};

const FLOW: readonly MissionStatus[] = [
  "CREATED",
  "PENDING_APPROVAL",
  "APPROVED",
];

export function MissionReport({ missions }: { missions: readonly Mission[] }) {
  const [reported, setReported] = useState<Record<string, true>>({});

  function report(id: string) {
    setReported((prev) => ({ ...prev, [id]: true }));
  }

  const reportedCount = Object.keys(reported).length;

  return (
    <>
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
        {missions.map((m) => {
          const status: MissionStatus = reported[m.id]
            ? "PENDING_APPROVAL"
            : m.status;
          const s = STATUS_STYLE[status];
          const justReported = Boolean(reported[m.id]);

          return (
            <li key={m.id} className="rounded-card bg-surface p-gap">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold">{m.title}</span>
                <span className="tabular-nums" style={{ color: "var(--ff-star)" }}>
                  ★ {m.reward}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <span
                  className={justReported ? "ff-fade rounded-full px-2.5 py-1" : "rounded-full px-2.5 py-1"}
                  style={{ background: s.bg, color: s.fg }}
                >
                  {STATUS_LABEL[status]}
                </span>
                {status === "CREATED" && (
                  <button
                    type="button"
                    onClick={() => report(m.id)}
                    className="min-h-touch rounded-card px-gap font-bold text-surface"
                    style={{ background: "var(--ff-primary)" }}
                  >
                    다 했어요
                  </button>
                )}
              </div>

              {justReported && (
                <p className="ff-fade mt-2 rounded-card bg-ink-soft/10 p-2 text-ink-soft">
                  보호자에게 알렸어요. 확인해주시면 별 {m.reward}개를 받아요.
                </p>
              )}

              {m.note && !justReported && (
                <p className="mt-2 rounded-card bg-ink-soft/10 p-2">{m.note}</p>
              )}
            </li>
          );
        })}
      </ul>

      {reportedCount > 0 && (
        <p className="mx-gap rounded-card bg-surface p-3 text-ink-soft">
          {reportedCount}개를 보호자에게 알렸어요. 확인을 기다리는 중이에요.
        </p>
      )}
    </>
  );
}
