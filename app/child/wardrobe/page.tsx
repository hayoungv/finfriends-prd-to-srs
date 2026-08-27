import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { WardrobeAvatar } from "@/components/child/WardrobeAvatar";
import {
  species,
  items,
  balance,
  wearingSpecies,
  wearingOutfit,
} from "./wardrobe.fixture";

// TASK-214 · REQ-FUNC-006 · SRS §6.6 AC1 — 동물 아바타 2종 · 의상 4종
// REG-006 · AC3: 그래픽 아바타만. 사진 업로드 컨트롤을 두지 않는다.
export const metadata = { title: "옷장 · 핀프렌즈" };

export default function ChildWardrobePage() {
  return (
    <>
      <StarHUD balance={balance} />

      <section className="flex flex-col items-center gap-1 p-gap">
        <WardrobeAvatar species={wearingSpecies} outfit={wearingOutfit} size={130} />
        <p className="font-bold">지금 모습</p>
        <p className="text-ink-soft">
          {species.find((s) => s.id === wearingSpecies)?.name} ·{" "}
          {items.find((i) => i.id === wearingOutfit)?.name}
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
          {items.map((it) => {
            const canBuy = it.owned || balance >= it.price;
            const isWearing = it.id === wearingOutfit;
            return (
              <li
                key={it.id}
                className="flex flex-col items-center gap-1 rounded-card bg-surface p-3"
                style={{
                  outline: isWearing ? "2px solid var(--ff-primary)" : "none",
                  opacity: canBuy ? 1 : 0.6,
                }}
              >
                <WardrobeAvatar species={wearingSpecies} outfit={it.id} size={84} />
                <p className="font-bold">{it.name}</p>

                {it.owned ? (
                  <button
                    type="button"
                    disabled={isWearing}
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
                    className="min-h-touch w-full rounded-card font-bold text-surface"
                    style={{ background: "var(--ff-primary)" }}
                  >
                    ★ {it.price} 주고 사기
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="min-h-touch w-full rounded-card bg-ink-soft/20 text-ink-soft"
                  >
                    별 {it.price - balance}개만 더!
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/stars"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          내 별 보기
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
