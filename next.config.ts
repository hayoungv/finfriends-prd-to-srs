import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md is the repository SSOT; avoid Next.js auto-generated rule blocks.
  agentRules: false,
  // AGENTS.md §3.2 확정 라우트 13건에 "/" 는 없다.
  // 루트는 페이지를 두지 않고 보호자 진입점으로 보낸다.
  async redirects() {
    return [{ source: "/", destination: "/parent/onboarding", permanent: false }];
  },
};

export default nextConfig;
