// PROTO-DATA: TASK-207 — approveMission() 구현 시 이 파일을 삭제하고 actions/practice.ts 호출로 대체한다
// 일괄 승인은 TASK-208 bulkApproveMissions() 가 받는다.

export type PendingMission = {
  readonly id: string;
  readonly title: string;
  readonly reward: number;
  readonly reportedAt: string;
  readonly childNote?: string;
};

/** TASK-208 AC3 — 미승인 5건 이상이면 "한 번에 모두 칭찬하기" 를 노출한다 */
export const bulkThreshold = 5;

export const pending: readonly PendingMission[] = [
  { id: "m11", title: "빨래 개기", reward: 2, reportedAt: "오늘 18:20", childNote: "다 갰어요!" },
  { id: "m12", title: "신발 정리하기", reward: 1, reportedAt: "오늘 17:05" },
  { id: "m13", title: "식탁 닦기", reward: 1, reportedAt: "어제 20:10" },
  { id: "m14", title: "재활용 분리하기", reward: 1, reportedAt: "어제 19:40" },
  { id: "m15", title: "동생이랑 블록 정리", reward: 2, reportedAt: "2일 전", childNote: "같이 했어요" },
];

export const childName = "서준";
