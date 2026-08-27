import Link from "next/link";
import { InactivityBanner } from "@/components/parent/InactivityBanner";
import { MissionApproval } from "./MissionApproval";
import { pending, bulkThreshold, childName } from "./mission.fixture";

// TASK-207 · TASK-208 · REQ-FUNC-004/011
export const metadata = { title: "미션 승인 · 핀프렌즈" };

export default function ParentMissionsPage() {
  return (
    <div className="p-gap">
      <InactivityBanner days={3} childName={childName} />

      <div className="mt-gap">
        <MissionApproval
          missions={pending}
          bulkThreshold={bulkThreshold}
          childName={childName}
        />
      </div>

      <nav className="mt-gap">
        <Link
          href="/parent/forest"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          이번 달 기록 보기
        </Link>
      </nav>
    </div>
  );
}
