// PROTO-DATA: TASK-207 — createMission()·reportMissionCompleted() 구현 시 이 파일을 삭제하고
// actions/practice.ts 호출로 대체한다.

export type MissionStatus =
  | "CREATED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED";

export type Mission = {
  readonly id: string;
  readonly title: string;
  readonly reward: number;
  readonly status: MissionStatus;
  readonly note?: string;
};

export const missions: readonly Mission[] = [
  { id: "m1", title: "빨래 개기", reward: 2, status: "CREATED" },
  { id: "m2", title: "신발 정리하기", reward: 1, status: "CREATED" },
  { id: "m3", title: "식탁 닦기", reward: 1, status: "PENDING_APPROVAL" },
  { id: "m4", title: "동생이랑 블록 정리", reward: 2, status: "APPROVED" },
  {
    id: "m5",
    title: "재활용 분리하기",
    reward: 1,
    status: "REJECTED",
    note: "종이랑 플라스틱이 섞여 있었어요. 다시 해볼까?",
  },
];

export const starBalance = 12;
