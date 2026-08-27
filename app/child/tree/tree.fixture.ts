// PROTO-DATA: TASK-212 — evaluateGrowthTree() 구현 시 이 파일을 삭제하고 actions/growth.ts 호출로 대체한다

// 타입을 types/domain.ts 에 선취하지 않는다 — 그 파일은 Track A(TASK-102) 배타 소유다.
// 화면 로컬로 두고 TASK-102 완료 시 import 만 갈아끼운다 (grill T11 · R-P4).
export type GrowthCondition = {
  readonly label: string;
  readonly current: number;
  readonly required: number;
};

export type TreeSlotId = "earn" | "spendWell" | "save" | "grow";

export type GrowthTree = {
  readonly id: TreeSlotId;
  readonly label: "벌기" | "쓰기" | "모으기" | "불리기";
  readonly stage: 0 | 1 | 2 | 3;
  readonly conditions: readonly GrowthCondition[];
  readonly cycleDays: number;
  readonly nudge: string | null;
  readonly locked?: boolean;
};

// 각 영역은 독립된 나무다. 공통 학습·퀴즈 조건을 채워도 해당 영역의 실천이
// 없으면 그 나무만 승급하지 않는다 (REQ-FUNC-005 · C2).
export const trees: readonly GrowthTree[] = [
  {
    id: "earn",
    label: "벌기",
    stage: 1,
    conditions: [
      { label: "학습", current: 3, required: 3 },
      { label: "퀴즈", current: 5, required: 5 },
      { label: "미션 실천", current: 1, required: 1 },
    ],
    cycleDays: 16,
    nudge: null,
  },
  {
    id: "spendWell",
    label: "쓰기",
    stage: 1,
    conditions: [
      { label: "학습", current: 3, required: 3 },
      { label: "퀴즈", current: 5, required: 5 },
      { label: "계획 지키기", current: 0, required: 1 },
    ],
    cycleDays: 16,
    nudge: "계획 지키기 1번만 더 하면 쓰기 나무가 자라요!",
  },
  {
    id: "save",
    label: "모으기",
    stage: 0,
    conditions: [
      { label: "학습", current: 2, required: 3 },
      { label: "퀴즈", current: 3, required: 5 },
      { label: "용돈 저축", current: 1, required: 1 },
    ],
    cycleDays: 8,
    nudge: "용돈을 모으는 습관을 계속 이어가요!",
  },
  {
    id: "grow",
    label: "불리기",
    stage: 0,
    conditions: [
      { label: "학습", current: 3, required: 3 },
      { label: "퀴즈", current: 2, required: 5 },
      { label: "실천", current: 0, required: 1 },
    ],
    cycleDays: 0,
    nudge: "불리기는 곧 열려요. 지금은 이야기와 퀴즈로 배워요!",
    locked: true,
  },
];

export const starBalance = 12;
