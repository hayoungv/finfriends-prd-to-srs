import Link from "next/link";
import { StarHUD } from "@/components/child/StarHUD";
import { getRetro, RETRO_VARIANTS, starBalance } from "./retro.fixture";

// TASK-211 · TASK-210 · TASK-402 · REQ-FUNC-008 — AI 회고 3상태
// 세 상태는 문구를 읽지 않고도 구별돼야 하고, 동시에 말투 온도는 같아야 한다.
export const metadata = { title: "오늘 어땠어? · 핀프렌즈" };

export default async function ChildRetroPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const retro = getRetro(variant);
  const kept = retro.actual <= retro.planned;
  const diff = Math.abs(retro.planned - retro.actual);

  return (
    <>
      <StarHUD
        balance={starBalance + retro.starAwarded}
        earned={retro.starAwarded === 1}
      />

      <section className="p-gap">
        <p className="text-ink-soft">{retro.place}</p>

        {/* 계획 대비 실제 — 문구를 읽기 전에 색과 형태로 결과가 보인다 */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-card bg-surface p-3">
            <p className="text-ink-soft">적어둔 돈</p>
            <p className="text-title font-bold tabular-nums">
              {retro.planned.toLocaleString("ko-KR")}원
            </p>
          </div>
          <div
            className="rounded-card p-3"
            style={{
              background: kept ? "var(--ff-star-glow)" : "var(--ff-surface)",
              outline: kept ? "none" : "2px solid var(--ff-miss)",
            }}
          >
            <p className="text-ink-soft">실제로 쓴 돈</p>
            <p
              className="text-title font-bold tabular-nums"
              style={{ color: kept ? "var(--ff-ink)" : "var(--ff-miss)" }}
            >
              {retro.actual.toLocaleString("ko-KR")}원
            </p>
          </div>
        </div>
        <p className="mt-2 text-ink-soft">
          {kept
            ? `${diff.toLocaleString("ko-KR")}원 아꼈어요`
            : `${diff.toLocaleString("ko-KR")}원 더 썼어요`}
        </p>
      </section>

      <section className="px-gap">
        <div className="rounded-card bg-surface p-gap">
          <h1 className="text-title font-bold">{retro.headline}</h1>
          <p className="mt-2 leading-relaxed">{retro.body}</p>
        </div>

        {/* 별 지급 여부가 이 화면의 두 번째 판별점이다 */}
        {retro.starAwarded === 1 ? (
          <div
            className="mt-3 flex items-center gap-2 rounded-card p-gap"
            style={{ background: "var(--ff-star-glow)" }}
          >
            <span
              aria-hidden
              className="star-earn text-title"
              style={{ color: "var(--ff-star)" }}
            >
              ★
            </span>
            <strong>별 1개를 받았어요</strong>
          </div>
        ) : (
          <div className="mt-3 rounded-card bg-surface p-gap text-ink-soft">
            이번엔 별이 없어요. 괜찮아요 — 다음에 또 기회가 있어요.
          </div>
        )}
      </section>

      <nav className="grid gap-2 p-gap">
        <Link
          href="/child/tree"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          내 나무 보러 가기
        </Link>
      </nav>

      {/* 프로토타입 전용 — 세 상태를 눈으로 대조하기 위한 전환기. 실개발 승격 시 제거한다 */}
      <aside className="border-t border-ink-soft/15 p-gap text-ink-soft">
        <p className="mb-2">프로토타입 전환기 — 같은 화면의 세 상태</p>
        <div className="grid grid-cols-3 gap-2">
          {RETRO_VARIANTS.map((v) => (
            <Link
              key={v}
              href={`?variant=${v}`}
              className="flex min-h-touch items-center justify-center rounded-card bg-surface"
              style={{
                outline: v === retro.variant ? "2px solid var(--ff-primary)" : "none",
              }}
            >
              {getRetro(v).label}
            </Link>
          ))}
        </div>
        {retro.ruleBased && (
          <p className="mt-2">
            이 화면은 AI 대신 고정 문구가 나온 상태예요. 아이 눈에는 차이가 없어야 해요.
          </p>
        )}
      </aside>
    </>
  );
}
