import type { ReactNode } from "react";

// Clean Mode — 보호자 뷰. 정보 밀도가 높고 채도가 낮다.
export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-mode="clean"
      className="mx-auto min-h-full w-full max-w-frame bg-canvas text-ink text-body"
    >
      {children}
    </div>
  );
}
