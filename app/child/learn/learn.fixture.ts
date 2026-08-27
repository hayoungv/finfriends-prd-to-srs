// PROTO-DATA: TASK-206 — 학습 콘텐츠는 TASK-104 의 data/curriculum.json 이 원본이 된다.
// 그때 이 파일을 삭제하고 actions/learning.ts 호출로 대체한다.

export type Topic = {
  readonly id: string;
  readonly name: string;
  readonly emoji: string;
  readonly summary: string;
  readonly done: number;
  readonly total: number;
  /**
   * AC1 — '불리기'는 학습·퀴즈**만** 개통한다. 주제 자체를 막는 것이 아니라
   * 그 끝에 있어야 할 금융상품 가입 경로를 만들지 않는다 (ADR-006 · REG-004).
   * 따라서 카드는 눌리고 퀴즈도 풀린다. 잠긴 것은 상품이지 학습이 아니다.
   */
  readonly productLocked?: boolean;
  readonly lockReason?: string;
};

export const topics: readonly Topic[] = [
  {
    id: "earn",
    name: "벌기",
    emoji: "💪",
    summary: "일한 만큼 받는 게 왜 공평할까?",
    done: 3,
    total: 3,
  },
  {
    id: "spend",
    name: "쓰기",
    emoji: "🛒",
    summary: "사기 전에 딱 한 번만 더 생각하기",
    done: 2,
    total: 3,
  },
  {
    id: "save",
    name: "모으기",
    emoji: "🐷",
    summary: "지금 안 쓰면 나중에 더 큰 걸 살 수 있어",
    done: 0,
    total: 3,
  },
  {
    id: "grow",
    name: "불리기",
    emoji: "🌱",
    summary: "돈이 스스로 자라는 원리를 알아봐요",
    done: 0,
    total: 2,
    productLocked: true,
    lockReason: "이야기와 퀴즈는 열려 있어요. 진짜 상품에 가입하는 곳은 없어요.",
  },
];

export const starBalance = 12;
