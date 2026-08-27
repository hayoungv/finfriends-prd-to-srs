import Link from "next/link";
import { TreeArt, TREE_STAGES } from "@/components/child/TreeArt";
import { InactivityBanner } from "@/components/parent/InactivityBanner";
import { metrics, currentTree, inactivity, type Metric } from "./forest.fixture";

// TASK-213 · TASK-212 · TASK-404 · REQ-FUNC-009 — 보호자 대시보드
// H2(카페 자영업 · 주 1회 확인)가 짧은 시간에 확인하는 것이 이 화면의 존재 이유다.
export const metadata = { title: "우리 아이 기록 · 핀프렌즈" };

function Delta({ delta, unit }: { delta: number | null; unit?: string }) {
  if (delta === null) return null;
  const up = delta > 0;
  // 준수율 하락처럼 방향이 반대인 지표도 있으나, 보호자에겐 증감 자체를 그대로 보인다
  return (
    <span
      className="tabular-nums"
      style={{ color: up ? "var(--ff-primary)" : "var(--ff-miss)" }}
    >
      {up ? "▲" : "▼"} {Math.abs(delta).toLocaleString("ko-KR")}
      {unit ?? ""}
    </span>
  );
}

function MetricCell({ m }: { m: Metric }) {
  return (
    <li className="rounded-card bg-surface px-3 py-2">
      <p className="text-ink-soft">{m.label}</p>
      <p className="flex items-baseline justify-between gap-1">
        <strong className="tabular-nums">
          {m.value}
          {m.unit ?? ""}
        </strong>
        <Delta delta={m.delta} unit={m.unit} />
      </p>
    </li>
  );
}

export default function ParentForestPage() {
  const [stageMetric, ...rest] = metrics;

  return (
    <div className="p-gap">
      <InactivityBanner days={inactivity.days} childName={inactivity.childName} />

      {/* 현재 성장 나무 — 일러스트가 아니라 실천 근거와 정체 원인을 읽힌다 */}
      <section className="mt-gap rounded-card bg-surface p-gap">
        <div className="flex items-center gap-3">
          <TreeArt stage={currentTree.stage} size={56} />
          <div className="flex-1">
            <h1 className="font-bold">
              현재 {currentTree.stageName}
              <span className="ml-1.5 text-ink-soft">
                ({currentTree.stage + 1}/{TREE_STAGES.length}단계)
              </span>
            </h1>
            <p className="text-ink-soft">
              이번 사이클 {currentTree.cycleDays}일째 · 승급 3조건 중 2개 충족
            </p>
          </div>
        </div>

        <ul className="mt-2 grid grid-cols-3 gap-1.5">
          {currentTree.conditions.map((c) => {
            const done = c.current >= c.required;
            return (
              <li
                key={c.label}
                className="rounded-card px-2 py-1.5 text-center"
                style={{
                  background: done ? "var(--ff-primary)" : "var(--ff-miss)",
                  color: "var(--ff-surface)",
                }}
              >
                {c.label} {c.current}/{c.required}
              </li>
            );
          })}
        </ul>

        <p className="mt-2 rounded-card bg-ink-soft/10 p-2">
          <strong>정체 원인</strong> — {currentTree.stallReason}
        </p>
      </section>

      {/* 월간 숲 7대 지표 */}
      <section className="mt-gap">
        <h2 className="mb-1.5 font-bold">이번 달 기록</h2>
        <ul className="mb-1.5">
          <MetricCell m={stageMetric} />
        </ul>
        <ul className="grid grid-cols-2 gap-1.5">
          {rest.map((m) => (
            <MetricCell key={m.key} m={m} />
          ))}
        </ul>
      </section>

      <nav className="mt-gap grid gap-1.5">
        <Link
          href="/parent/missions"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          승인 기다리는 미션 확인
        </Link>
        {/* 부모→아이 단방향. 열람 시에도 Fun 테마로 렌더한다 (실행 지시서 §4.4) */}
        <Link
          href="/child/tree"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          👁 아이 화면 보기
        </Link>
        <Link
          href="/child/plan/new"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          ✎ 대신 계획 적기
        </Link>
      </nav>
    </div>
  );
}
