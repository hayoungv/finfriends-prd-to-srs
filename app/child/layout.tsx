import type { ReactNode } from "react";

// Fun Mode — 아동 뷰. 아동 세션은 app/parent/** 로 가는 링크·버튼·리다이렉트를 갖지 않는다.
// (실행 지시서 §4.4 · 계정 분리 + 부모→아이 단방향)
export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-mode="fun"
      className="mx-auto min-h-full w-full max-w-frame bg-canvas text-ink text-body"
    >
      {children}
    </div>
  );
}
