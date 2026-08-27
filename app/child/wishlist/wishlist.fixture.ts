// PROTO-DATA: TASK-215 — updateWishlistDeposit() 구현 시 이 파일을 삭제하고 actions/wishlist.ts 호출로 대체한다

export type Milestone = {
  readonly pct: 30 | 70 | 100;
  readonly label: string;
  /** 이미 지급된 마일스톤은 다시 지급하지 않는다 (중복 지급 금지) */
  readonly awarded: boolean;
};

export type Wish = {
  readonly id: string;
  readonly name: string;
  readonly goal: number;
  readonly saved: number;
  readonly milestones: readonly Milestone[];
  readonly depositSource: "parent_allowance";
};

export const wish: Wish = {
  id: "w1",
  name: "변신 로봇",
  goal: 20000,
  saved: 12000,
  milestones: [
    { pct: 30, label: "시작이 좋아요", awarded: true },
    { pct: 70, label: "거의 다 왔어요", awarded: false },
    { pct: 100, label: "드디어 도착!", awarded: false },
  ],
  depositSource: "parent_allowance",
};

export const starBalance = 12;
