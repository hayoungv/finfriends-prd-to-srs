import Link from "next/link";
import { WardrobePicker } from "@/components/child/WardrobePicker";
import {
  species,
  items,
  balance,
  wearingSpecies,
  wearingOutfit,
} from "./wardrobe.fixture";

// TASK-214 · REQ-FUNC-006 · SRS §6.6 AC1 — 동물 아바타 2종 · 의상 4종
// REG-006 · AC3: 그래픽 아바타만. 사진 업로드 컨트롤을 두지 않는다.
export const metadata = { title: "옷장 · 핀프렌즈" };

export default function ChildWardrobePage() {
  return (
    <>
      <WardrobePicker
        species={species}
        outfits={items}
        startingBalance={balance}
        initialSpecies={wearingSpecies}
        initialOutfit={wearingOutfit}
      />

      <nav className="grid gap-2 px-gap pb-gap">
        <Link
          href="/child/stars"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          내 별 보기
        </Link>
        <Link
          href="/child/tree"
          className="flex min-h-touch items-center justify-center rounded-card bg-surface"
        >
          내 나무 보기
        </Link>
      </nav>
    </>
  );
}
