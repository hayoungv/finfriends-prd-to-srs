"use client";

import Link from "next/link";
import { useState } from "react";
import type { MerchantKind } from "@/app/child/plan/new/plan.fixture";

// TASK-209 · REQ-FUNC-007 — 아동 폼의 원형. 이후 모든 아동 입력 화면이 이 레이아웃을 따른다.
// AC2: GPS·카메라 권한을 요구하지 않는다. 지도도 "현재 위치" 버튼도 주변 가맹점 목록도 없다.
export function PlanForm({
  kinds,
  expiryHours,
}: {
  kinds: readonly MerchantKind[];
  expiryHours: number;
}) {
  const [place, setPlace] = useState("");
  const [kindId, setKindId] = useState<string>(kinds[0].id);
  const [amount, setAmount] = useState("");

  const ready = place.trim().length > 0 && Number(amount) > 0;

  return (
    <div className="grid gap-gap">
      <label className="grid gap-1.5">
        <span className="font-bold">어디에 갈 거야?</span>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="예) 학교 앞 문구점"
          autoComplete="off"
          className="min-h-touch rounded-card bg-surface px-gap"
        />
        <span className="text-ink-soft">가게 이름을 직접 적어요.</span>
      </label>

      <fieldset className="grid gap-1.5">
        <legend className="font-bold">어떤 가게야?</legend>
        <div className="grid grid-cols-3 gap-2">
          {kinds.map((k) => {
            const on = k.id === kindId;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => setKindId(k.id)}
                aria-pressed={on}
                className="flex min-h-touch flex-col items-center justify-center gap-0.5 rounded-card py-2"
                style={{
                  background: on ? "var(--ff-star-glow)" : "var(--ff-surface)",
                  outline: on ? "2px solid var(--ff-primary)" : "none",
                }}
              >
                <span aria-hidden className="text-title">
                  {k.emoji}
                </span>
                <span>{k.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="grid gap-1.5">
        <span className="font-bold">얼마를 쓸 거야?</span>
        <span className="flex min-h-touch items-center rounded-card bg-surface px-gap">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="3000"
            className="w-full bg-transparent tabular-nums outline-none"
          />
          <span className="pl-2 text-ink-soft">원</span>
        </span>
        <span className="text-ink-soft">
          적어둔 것보다 적게 쓰면 계획을 지킨 거예요.
        </span>
      </label>

      <p className="rounded-card bg-surface p-3 text-ink-soft">
        ⏳ 이 계획은 <strong className="text-ink">{expiryHours}시간</strong> 뒤에
        사라져요. 그 안에 다녀오면 돼요.
      </p>

      {ready ? (
        <Link
          href="/child/retro/demo"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          계획 저장하기
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="min-h-touch rounded-card bg-ink-soft/20 font-bold text-ink-soft"
        >
          가게 이름과 금액을 적어주세요
        </button>
      )}
    </div>
  );
}
