// PROTO-DATA: TASK-212 — evaluateGrowthTree() 구현 시 이 파일을 삭제하고 actions/growth.ts 호출로 대체한다

// 타입을 types/domain.ts 에 선취하지 않는다 — 그 파일은 Track A(TASK-102) 배타 소유다.
// 화면 로컬로 두고 TASK-102 완료 시 import 만 갈아끼운다 (grill T11 · R-P4).
export type GrowthCondition = {
  readonly label: string;
  readonly current: number;
  readonly required: number;
};

export type GrowthTree = {
  readonly stage: 0 | 1 | 2 | 3;
  readonly conditions: readonly GrowthCondition[];
  readonly cycleDays: number;
  readonly nudge: string | null;
};

// AC1 이 이 화면의 핵심 — 학습·퀴즈를 다 채워도 실천이 0이면 승급하지 않는다.
// 게이지 2개가 차고 1개가 비어 있는 상태여야 "왜 안 자라는지"가 보인다.
export const tree: GrowthTree = {
  stage: 1,
  conditions: [
    { label: "학습", current: 3, required: 3 },
    { label: "퀴즈", current: 5, required: 5 },
    { label: "실천", current: 0, required: 1 },
  ],
  cycleDays: 16,
  nudge: "실천 1번만 더 하면 나무가 자라요!",
};

export const starBalance = 12;
