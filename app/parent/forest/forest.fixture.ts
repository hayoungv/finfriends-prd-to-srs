// PROTO-DATA: TASK-213 — getMonthlyForest() 구현 시 이 파일을 삭제하고 actions/growth.ts 호출로 대체한다
// 현재 나무 부분은 TASK-212 evaluateGrowthTree() 를 함께 쓴다.

export type Metric = {
  readonly key: string;
  readonly label: string;
  readonly value: string;
  /** 전월 대비. null 이면 비교 대상이 없다 */
  readonly delta: number | null;
  readonly unit?: string;
};

/** REQ-FUNC-009 — 월간 숲 7대 지표. 스크롤 없이 한 화면에 들어와야 한다 */
export const metrics: readonly Metric[] = [
  { key: "stage", label: "4영역 단계 현황", value: "벌기 3 · 쓰기 2 · 모으기 2 · 불리기 1", delta: null },
  { key: "practice", label: "총 실천 인정 횟수", value: "9", delta: +2, unit: "회" },
  { key: "paused", label: "사려다 멈춘 횟수", value: "4", delta: +1, unit: "회" },
  { key: "adherence", label: "계획 준수율", value: "71", delta: -6, unit: "%" },
  { key: "stars", label: "총 획득 별 개수", value: "23", delta: +5, unit: "개" },
  { key: "spend", label: "전월 대비 소비 증감액", value: "-3,400", delta: null, unit: "원" },
  { key: "wpa", label: "월간 WPA 기여도", value: "2.3", delta: +0.4, unit: "회/주" },
];

/** 현재 성장 나무 4그루 — 아이 화면과 같은 데이터를 보호자 언어로 읽힌다 */
export const currentTrees = [
  {
    id: "earn",
    label: "벌기",
    stage: 1 as const,
    stageName: "묘목",
    cycleDays: 16,
    conditions: [{ label: "미션 실천", current: 1, required: 1 }],
    stallReason: "이번 사이클 미션 실천 1회를 인정받아 자라고 있어요.",
  },
  {
    id: "spendWell",
    label: "쓰기",
    stage: 1 as const,
    stageName: "묘목",
    cycleDays: 16,
    conditions: [{ label: "계획 지키기", current: 0, required: 1 }],
    stallReason: "계획 지키기 실천이 1회 남아 있어요.",
  },
  {
    id: "save",
    label: "모으기",
    stage: 0 as const,
    stageName: "새싹",
    cycleDays: 8,
    conditions: [{ label: "용돈 저축", current: 1, required: 1 }],
    stallReason: "부모님께 받은 용돈 저축 기록이 쌓이면 자라요.",
  },
  {
    id: "grow",
    label: "불리기",
    stage: 0 as const,
    stageName: "새싹",
    cycleDays: 0,
    conditions: [{ label: "실천", current: 0, required: 1 }],
    stallReason: "불리기는 학습 콘텐츠부터 열려 있어요. 실천은 다음 단계에서 지원해요.",
  },
] as const;

/** TASK-404 AC2 — 미접속 넛지. 최상단에 둔다 */
export const inactivity = {
  days: 3,
  childName: "서준",
} as const;
