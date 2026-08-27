// PROTO-DATA: TASK-201 — saveOnboardingStep() 구현 시 이 파일을 삭제하고 actions/onboarding.ts 호출로 대체한다

export type Step = {
  readonly n: 1 | 2 | 3 | 4 | 5;
  readonly title: string;
  readonly detail: string;
};

export const steps: readonly Step[] = [
  { n: 1, title: "보호자 확인", detail: "휴대폰 번호로 본인을 확인합니다." },
  { n: 2, title: "아이 등록", detail: "아이 이름과 생년월을 입력합니다." },
  { n: 3, title: "법정대리인 동의", detail: "만 14세 미만 아동의 개인정보 처리에 동의합니다." },
  { n: 4, title: "첫 미션 만들기", detail: "아이가 바로 실천할 수 있는 일을 하나 정합니다." },
  { n: 5, title: "알림 설정", detail: "승인 요청이 오면 알려드립니다." },
];

/**
 * AC1 — 중간 이탈 후 재개.
 * 서버에 저장된 진행 지점이며, 재접속 시 이 단계부터 이어서 보여준다.
 */
export const savedAt: Step["n"] = 3;

export const savedSummary: Readonly<Record<number, string>> = {
  1: "010-****-1234 확인 완료",
  2: "서준 · 2017년 5월생",
};
