import Link from "next/link";
import { items, childDraft, enforcedByMiddleware } from "./consent.fixture";

// TASK-202 · REG-001 — 법정대리인 동의 + 아동 프로필 생성
export const metadata = { title: "법정대리인 동의 · 핀프렌즈" };

export default function ConsentPage() {
  return (
    <div className="p-gap">
      <p className="text-ink-soft">온보딩 3/5</p>
      <h1 className="text-title font-bold">법정대리인 동의</h1>
      <p className="text-ink-soft">
        만 14세 미만 아동은 법정대리인 동의 없이 서비스를 이용할 수 없습니다.
      </p>

      <section className="mt-gap rounded-card bg-surface p-3">
        <h2 className="font-bold">등록할 아이</h2>
        <p className="text-ink-soft">
          {childDraft.name} · {childDraft.birth.replace("-", "년 ")}월생
        </p>
      </section>

      <ul className="mt-gap grid gap-1.5">
        {items.map((it) => (
          <li key={it.id} className="rounded-card bg-surface p-3">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                defaultChecked={it.required}
                className="mt-1 size-4"
              />
              <span>
                <strong>
                  {it.label}
                  <span
                    className="ml-1.5"
                    style={{
                      color: it.required ? "var(--ff-miss)" : "var(--ff-ink-soft)",
                    }}
                  >
                    {it.required ? "필수" : "선택"}
                  </span>
                </strong>
                <span className="block text-ink-soft">{it.detail}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <nav className="mt-gap grid gap-1.5">
        <Link
          href="/parent/forest"
          className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
          style={{ background: "var(--ff-primary)" }}
        >
          동의하고 아이 계정 만들기
        </Link>
        <Link
          href="/parent/onboarding"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          이전 단계로
        </Link>
      </nav>

      {!enforcedByMiddleware && (
        <p className="mt-gap rounded-card bg-ink-soft/10 p-3 text-ink-soft">
          ⚠️ 프로토타입 안내 — 이 화면은 레이아웃만 확정한 것입니다. 미동의 아동의
          진입 차단은 <code>middleware.ts</code>(TASK-203)가 수행하며 아직
          구현되지 않았습니다. 화면 존재를 REG-001 통과로 판단하지 마세요.
        </p>
      )}
    </div>
  );
}
