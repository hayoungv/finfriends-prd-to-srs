// TASK-404 AC2 — 미접속 넛지 배너. 보호자 화면 최상단.
// 문구는 보호자용 언어다. 아동용 언어와 분리한다 (AGENTS.md §5).
export function InactivityBanner({
  days,
  childName,
}: {
  days: number;
  childName: string;
}) {
  return (
    <div
      role="status"
      className="flex items-start gap-2 rounded-card px-gap py-3"
      style={{ background: "var(--ff-star-glow)", outline: "1px solid var(--ff-star)" }}
    >
      <span aria-hidden>🔔</span>
      <p>
        <strong>{childName}</strong> 님이 <strong>{days}일</strong> 동안 접속하지
        않았습니다. 실천 미션을 하나 만들어 주시면 다시 시작하기 쉬워집니다.
      </p>
    </div>
  );
}
