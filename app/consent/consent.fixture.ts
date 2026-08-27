// PROTO-DATA: TASK-202 — registerConsent()·createChildProfile() 구현 시 이 파일을 삭제하고
// actions/onboarding.ts 호출로 대체한다.

export type ConsentItem = {
  readonly id: string;
  readonly label: string;
  readonly required: boolean;
  readonly detail: string;
};

/** REG-001 — 만 14세 미만 아동은 법정대리인 동의 없이 서비스에 진입할 수 없다 */
export const items: readonly ConsentItem[] = [
  {
    id: "collect",
    label: "아동 개인정보 수집·이용 동의",
    required: true,
    detail: "이름, 생년월, 실천 기록. 서비스 제공 목적 외 이용하지 않습니다.",
  },
  {
    id: "guardian",
    label: "법정대리인 지위 확인",
    required: true,
    detail: "본인이 해당 아동의 법정대리인임을 확인합니다.",
  },
  {
    id: "notice",
    label: "알림 수신 동의",
    required: false,
    detail: "승인 요청과 주간 요약을 브라우저 알림으로 받습니다.",
  },
];

/**
 * 이 프로토타입은 REG-001 을 검증하지 않는다.
 * 진입 차단은 middleware.ts(TASK-203) 가 수행하며 아직 구현되지 않았다.
 * 화면이 있다는 이유로 Alpha Gate 통과로 오인하지 않는다.
 */
export const enforcedByMiddleware = false;

export const childDraft = { name: "서준", birth: "2017-05" } as const;
