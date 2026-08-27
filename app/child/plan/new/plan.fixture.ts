// PROTO-DATA: TASK-209 — createPlanCard() 구현 시 이 파일을 삭제하고 actions/plan.ts 호출로 대체한다

// REG-002 — 위치정보를 다루지 않는다. 장소는 아이가 직접 적는 자유 텍스트다.
// 지도·주변 가맹점 목록·현재 위치 버튼을 배치하지 않으며, 좌표 필드 자체가 없다.
export type MerchantKind = { readonly id: string; readonly label: string; readonly emoji: string };

export const merchantKinds: readonly MerchantKind[] = [
  { id: "convenience", label: "편의점", emoji: "🏪" },
  { id: "stationery", label: "문구점", emoji: "✏️" },
  { id: "snack", label: "간식가게", emoji: "🍡" },
];

/** 계획 카드는 72시간 뒤 만료된다 (REQ-FUNC-007) */
export const expiryHours = 72;

export const starBalance = 12;

/** 아이가 이미 적어둔 예시 — 폼 위에 참고로 보여준다 */
export const recentPlan = {
  place: "학교 앞 문구점",
  kindId: "stationery",
  amount: 3000,
} as const;
