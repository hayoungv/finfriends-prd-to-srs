"use client";

import { useState } from "react";

// TASK-207 · TASK-208 · REQ-FUNC-011 — 승인·반려·일괄승인
// 정적 목업에서 프레임 3장으로 나눠야 했던 대기/승인후/반려후가 여기서는 실제 전이다.
type Decision = "approved" | "rejected";

// 이 컴포넌트가 요구하는 계약이다. fixture 에서 import 하지 않는다 —
// 승격 시 fixture 가 삭제돼도 이 파일은 그대로 남아야 한다.
export type PendingMission = {
  readonly id: string;
  readonly title: string;
  readonly reward: number;
  readonly reportedAt: string;
  readonly childNote?: string;
};

export function MissionApproval({
  missions,
  bulkThreshold,
  childName,
}: {
  missions: readonly PendingMission[];
  bulkThreshold: number;
  childName: string;
}) {
  const [decided, setDecided] = useState<Record<string, Decision>>({});

  const waiting = missions.filter((m) => !decided[m.id]);
  const approvedCount = Object.values(decided).filter((d) => d === "approved").length;
  const rejectedCount = Object.values(decided).filter((d) => d === "rejected").length;
  const starsGiven = missions
    .filter((m) => decided[m.id] === "approved")
    .reduce((sum, m) => sum + m.reward, 0);

  function decide(id: string, d: Decision) {
    setDecided((prev) => ({ ...prev, [id]: d }));
  }

  function approveAll() {
    setDecided((prev) => {
      const next = { ...prev };
      for (const m of waiting) next[m.id] = "approved";
      return next;
    });
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h1 className="text-title font-bold">승인 기다리는 미션</h1>
        <span className="tabular-nums text-ink-soft">{waiting.length}건</span>
      </div>
      <p className="text-ink-soft">
        {childName} 님이 다 했다고 알려온 실천입니다. 확인하면 별이 지급됩니다.
      </p>

      {/* AC3 — 5건 이상일 때만 노출 */}
      {waiting.length >= bulkThreshold && (
        <button
          type="button"
          onClick={approveAll}
          className="mt-gap min-h-touch w-full rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          한 번에 모두 칭찬하기 ({waiting.length}건)
        </button>
      )}

      <ul className="mt-gap grid gap-1.5">
        {missions.map((m) => {
          const d = decided[m.id];
          return (
            <li
              key={m.id}
              className="rounded-card bg-surface p-3"
              style={{ opacity: d ? 0.75 : 1 }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <strong>{m.title}</strong>
                <span className="tabular-nums text-ink-soft">{m.reportedAt}</span>
              </div>
              {m.childNote && (
                <p className="mt-1 text-ink-soft">“{m.childNote}”</p>
              )}

              {!d && (
                <div className="mt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => decide(m.id, "approved")}
                    className="min-h-touch flex-1 rounded-card font-bold text-surface"
                    style={{ background: "var(--ff-primary)" }}
                  >
                    칭찬하기 · 별 {m.reward}
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(m.id, "rejected")}
                    className="min-h-touch rounded-card border px-3"
                    style={{ borderColor: "var(--ff-miss)", color: "var(--ff-miss)" }}
                  >
                    아직이에요
                  </button>
                </div>
              )}

              {d === "approved" && (
                <p
                  className="mt-2 rounded-card px-3 py-2"
                  style={{ background: "var(--ff-primary)", color: "var(--ff-surface)" }}
                >
                  승인됨 · 별 {m.reward}개 지급 · 실천 1회 인정
                </p>
              )}

              {d === "rejected" && (
                <p
                  className="mt-2 rounded-card px-3 py-2"
                  style={{ background: "var(--ff-miss)", color: "var(--ff-surface)" }}
                >
                  반려됨 · 별 미지급 · <strong>실천 크레딧 없음</strong>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {(approvedCount > 0 || rejectedCount > 0) && (
        <p className="mt-gap rounded-card bg-surface p-3">
          이번에 승인 {approvedCount}건 · 반려 {rejectedCount}건 · 지급한 별{" "}
          <strong className="tabular-nums">{starsGiven}</strong>개
        </p>
      )}
    </>
  );
}
