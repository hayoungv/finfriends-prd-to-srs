import type { ReactNode } from "react";

// 법정대리인 동의는 보호자가 수행한다 → Clean Mode.
export default function ConsentLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-mode="clean"
      className="mx-auto min-h-full w-full max-w-frame bg-canvas text-ink text-body"
    >
      {children}
    </div>
  );
}
