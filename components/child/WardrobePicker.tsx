"use client";

import { useState } from "react";
import {
  WardrobeAvatar,
  type SpeciesId,
  type OutfitId,
} from "@/components/child/WardrobeAvatar";

// TASK-214 · REQ-FUNC-006 — 아바타 2종 · 의상 4종 상점.
// 별 잔액이 모자라면 구매가 차단되고, 사면 잔액이 즉시 줄어든다.
// REG-006: 그래픽만. 사진 업로드 컨트롤을 두지 않는다.
export type Species = { readonly id: SpeciesId; readonly name: string };
export type Outfit = {
  readonly id: OutfitId;
  readonly name: string;
  readonly price: number;
  readonly owned: boolean;
};

export function WardrobePicker({
  species,
  outfits,
  startingBalance,
  initialSpecies,
  initialOutfit,
}: {
  species: readonly Species[];
  outfits: readonly Outfit[];
  startingBalance: number;
  initialSpecies: SpeciesId;
  initialOutfit: OutfitId;
}) {
  const [wearingSpecies, setWearingSpecies] = useState<SpeciesId>(initialSpecies);
  const [wearingOutfit, setWearingOutfit] = useState<OutfitId>(initialOutfit);
  const [bought, setBought] = useState<Record<string, true>>({});

  const spent = outfits
    .filter((o) => bought[o.id])
    .reduce((sum, o) => sum + o.price, 0);
  const balance = startingBalance - spent;

  const owns = (o: Outfit) => o.owned || Boolean(bought[o.id]);

  function buy(o: Outfit) {
    setBought((prev) => ({ ...prev, [o.id]: true }));
    setWearingOutfit(o.id);
  }

  return (
    <>
      <section className="flex flex-col items-center gap-1 p-gap">
        <div className="ff-fade" key={`${wearingSpecies}-${wearingOutfit}`}>
          <WardrobeAvatar
            species={wearingSpecies}
            outfit={wearingOutfit}
            size={130}
          />
        </div>
        <p className="font-bold">지금 모습</p>
        <p className="text-ink-soft">
          {species.find((s) => s.id === wearingSpecies)?.name} ·{" "}
          {outfits.find((o) => o.id === wearingOutfit)?.name}
        </p>
        <p className="tabular-nums" style={{ color: "var(--ff-star)" }}>
          ★ {balance}
        </p>
      </section>

      <section className="px-gap">
        <h1 className="mb-2 font-bold">친구 고르기</h1>
        <ul className="grid grid-cols-2 gap-2">
          {species.map((sp) => {
            const on = sp.id === wearingSpecies;
            return (
              <li
                key={sp.id}
                className="flex flex-col items-center gap-1 rounded-card bg-surface p-3"
                style={{ outline: on ? "2px solid var(--ff-primary)" : "none" }}
              >
                <WardrobeAvatar species={sp.id} outfit={wearingOutfit} size={84} />
                <p className="font-bold">{sp.name}</p>
                <button
                  type="button"
                  disabled={on}
                  onClick={() => setWearingSpecies(sp.id)}
                  className="min-h-touch w-full rounded-card font-bold"
                  style={{
                    background: on ? "var(--ff-primary)" : "var(--ff-star-glow)",
                    color: on ? "var(--ff-surface)" : "var(--ff-ink)",
                  }}
                >
                  {on ? "함께 있어요" : "이 친구로 바꾸기"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="p-gap">
        <h2 className="mb-2 font-bold">옷 고르기</h2>
        <ul className="grid grid-cols-2 gap-2">
          {outfits.map((o) => {
            const owned = owns(o);
            const canBuy = owned || balance >= o.price;
            const isWearing = o.id === wearingOutfit;
            return (
              <li
                key={o.id}
                className="flex flex-col items-center gap-1 rounded-card bg-surface p-3"
                style={{
                  outline: isWearing ? "2px solid var(--ff-primary)" : "none",
                  opacity: canBuy ? 1 : 0.6,
                }}
              >
                <WardrobeAvatar species={wearingSpecies} outfit={o.id} size={84} />
                <p className="font-bold">{o.name}</p>

                {owned ? (
                  <button
                    type="button"
                    disabled={isWearing}
                    onClick={() => setWearingOutfit(o.id)}
                    className="min-h-touch w-full rounded-card font-bold"
                    style={{
                      background: isWearing
                        ? "var(--ff-primary)"
                        : "var(--ff-star-glow)",
                      color: isWearing ? "var(--ff-surface)" : "var(--ff-ink)",
                    }}
                  >
                    {isWearing ? "입고 있어요" : "이걸로 갈아입기"}
                  </button>
                ) : canBuy ? (
                  <button
                    type="button"
                    onClick={() => buy(o)}
                    className="min-h-touch w-full rounded-card font-bold text-surface"
                    style={{ background: "var(--ff-primary)" }}
                  >
                    ★ {o.price} 주고 사기
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-touch w-full rounded-card bg-ink-soft/20 text-ink-soft"
                  >
                    별 {o.price - balance}개만 더!
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
