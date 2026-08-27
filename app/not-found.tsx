import Link from "next/link";

// 라우트가 아니다 — AGENTS.md §3.2 확정 13건 밖의 경로가 여기로 떨어진다.
// 프로토타입을 눈으로 훑기 위한 화면 색인 역할을 겸한다.
const FUN = [
  ["/child/tree", "성장 나무", "TASK-212"],
  ["/child/learn", "학습 주제", "TASK-206"],
  ["/child/quiz/spend", "퀴즈", "TASK-206"],
  ["/child/missions", "미션 보고", "TASK-207"],
  ["/child/plan/new", "소비 계획 카드", "TASK-209"],
  ["/child/retro/demo", "AI 회고", "TASK-211"],
  ["/child/stars", "별 잔액·이력", "TASK-205"],
  ["/child/wardrobe", "아바타 옷장", "TASK-214"],
  ["/child/wishlist", "위시리스트", "TASK-215"],
] as const;

const CLEAN = [
  ["/parent/onboarding", "보호자 온보딩", "TASK-201"],
  ["/consent", "법정대리인 동의", "TASK-202"],
  ["/parent/forest", "월간 숲 대시보드", "TASK-213"],
  ["/parent/missions", "승인·반려", "TASK-207·208"],
] as const;

function Group({
  title,
  note,
  items,
}: {
  title: string;
  note: string;
  items: ReadonlyArray<readonly [string, string, string]>;
}) {
  return (
    <section className="mb-gap">
      <h2 className="text-title font-bold">{title}</h2>
      <p className="mb-gap text-ink-soft">{note}</p>
      <ul className="grid gap-2">
        {items.map(([href, label, task]) => (
          <li key={href}>
            <Link
              href={href}
              className="flex min-h-touch items-center justify-between rounded-card bg-surface px-gap py-2 hover:bg-primary/10"
            >
              <span className="font-medium">{label}</span>
              <span className="text-ink-soft">{task}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NotFound() {
  return (
    <div
      data-mode="clean"
      className="mx-auto min-h-full w-full max-w-frame bg-canvas p-gap text-ink text-body"
    >
      <h1 className="text-title font-bold">FinFriends 프로토타입</h1>
      <p className="mb-gap text-ink-soft">
        확정 라우트 13건. 여기 없는 경로는 만들지 않는다 (AGENTS.md §3.2).
      </p>
      <Group title="아동 뷰" note="Fun Mode · 9건" items={FUN} />
      <Group title="보호자 뷰" note="Clean Mode · 4건" items={CLEAN} />
    </div>
  );
}
