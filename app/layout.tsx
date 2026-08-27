import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinFriends",
  description: "아이와 보호자가 함께 쓰는 금융 습관 서비스",
};

// 공유 파일 — P0 에서 확정 후 동결한다 (AGENTS.md §6).
// data-mode 는 여기서 주지 않는다. 세그먼트 레이아웃이 부여한다:
//   app/child/**   → fun      app/parent/**  → clean      app/consent/** → clean
// 한 페이지에 두 모드를 나란히 놓고 대조할 수 있어야 하므로 :root 가 아니라 래퍼가 갖는다.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
