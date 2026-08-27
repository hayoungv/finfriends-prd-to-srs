// PROTO-DATA: TASK-205 — getStarBalance() 구현 시 이 파일을 삭제하고 actions/ledger.ts 호출로 대체한다

// REG-005c — 별은 현금이 아니다. 원화 환산·출금 개념을 타입에도 화면에도 두지 않는다.
export type LedgerEntry = {
  readonly id: string;
  readonly reason: string;
  readonly delta: number;
  readonly when: string;
};

export const balance = 12;

export const entries: readonly LedgerEntry[] = [
  { id: "e9", reason: "계획을 지켰어요", delta: +1, when: "오늘" },
  { id: "e8", reason: "퀴즈 정답 · 쓰기", delta: +1, when: "오늘" },
  { id: "e7", reason: "노란 비옷 샀어요", delta: -4, when: "어제" },
  { id: "e6", reason: "빨래 개기 미션", delta: +2, when: "어제" },
  { id: "e5", reason: "퀴즈 정답 · 벌기", delta: +1, when: "2일 전" },
  { id: "e4", reason: "신발 정리 미션", delta: +2, when: "3일 전" },
  { id: "e3", reason: "퀴즈 정답 · 모으기", delta: +1, when: "4일 전" },
  { id: "e2", reason: "계획을 지켰어요", delta: +1, when: "5일 전" },
];

export const pageSize = 5;
