// PROTO-DATA: TASK-214 — purchaseWardrobeItem() 구현 시 이 파일을 삭제하고 actions/wardrobe.ts 호출로 대체한다
// 아이템 원본은 TASK-104 의 data/wardrobe_items.json 이 된다.

// REG-006 — 얼굴 이미지를 다루지 않는다. 사진 업로드 컨트롤을 배치하지 않는다.
export type WardrobeSpecies = {
  readonly id: "rabbit" | "squirrel";
  readonly name: string;
  readonly owned: boolean;
};

export type WardrobeItem = {
  readonly id: "basic" | "raincoat" | "explorer" | "chef";
  readonly name: string;
  readonly price: number;
  readonly owned: boolean;
};

// SRS §6.6 AC1 — MVP 1차 납품 기준 동물 아바타 2종(토끼·다람쥐) · 의상 4종.
// PRD ADR-007 은 5종·8벌이라 어긋나 있으며 종수·벌수와 에셋 형식은
// TASK-214 착수 전 별도 해소한다 (grill T14).
export const species: readonly WardrobeSpecies[] = [
  { id: "rabbit", name: "토끼", owned: true },
  { id: "squirrel", name: "다람쥐", owned: true },
];

export const items: readonly WardrobeItem[] = [
  { id: "basic", name: "기본 옷", price: 0, owned: true },
  { id: "raincoat", name: "노란 비옷", price: 4, owned: true },
  { id: "explorer", name: "탐험가 조끼", price: 6, owned: false },
  { id: "chef", name: "요리사 옷", price: 9, owned: false },
];

export const balance = 5;
export const wearingSpecies: WardrobeSpecies["id"] = "rabbit";
export const wearingOutfit: WardrobeItem["id"] = "raincoat";
