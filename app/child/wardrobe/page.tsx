import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { WardrobeAvatar } from "@/components/child/WardrobeAvatar";
import { items, balance, wearing } from "./wardrobe.fixture";

// TASK-214 · REQ-FUNC-006 — 아바타 별 옷장
// REG-006: 그래픽 아바타만. 사진 업로드 컨트롤을 두지 않는다.
export const metadata = { title: "옷장 · 핀프렌즈" };

export default function ChildWardrobePage() {
  return (
    <>
      <StarHUD balance={balance} />

      <section className="flex flex-col items-center gap-1 p-gap">
        <WardrobeAvatar outfit={wearing} size={130} />
        <p className="font-bold">지금 입은 옷</p>
        <p className="text-ink-soft">
          {items.find((i) => i.id === wearing)?.name}
        </p>
      </section>

      <section className="px-gap pb-gap">
        <h1 className="mb-2 font-bold">옷 고르기</h1>
        <ul className="grid grid-cols-2 gap-2">
          {items.map((it) => {
            const canBuy = it.owned || balance >= it.price;
            const isWearing = it.id === wearing;
            return (
              <li
                key={it.id}
                className="flex flex-col items-center gap-1 rounded-card bg-surface p-3"
                style={{
                  outline: isWearing ? "2px solid var(--ff-primary)" : "none",
                  opacity: canBuy ? 1 : 0.6,
                }}
              >
                <WardrobeAvatar outfit={it.id} size={84} />
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
