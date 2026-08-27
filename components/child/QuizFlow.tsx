"use client";

import Link from "next/link";
import { useState } from "react";
import { StarHUD } from "@/components/child/StarHUD";

// TASK-206 · REQ-FUNC-003 — 학습 카드 → 문제 → 정답/오답 → 별 보상
// 정적 목업에서는 프레임을 나란히 놓아야 했던 5단계가 여기서는 실제 클릭 전이다.
type Step = "lesson" | "question" | "correct" | "reward" | "wrong";

// 이 컴포넌트가 요구하는 계약이다. fixture 에서 import 하지 않는다 —
// 승격 시 fixture 가 삭제돼도(승격 규약 4-d) 이 파일은 그대로 남아야 한다.
export type QuizContent = {
  readonly topicName: string;
  readonly lesson: { readonly title: string; readonly body: string };
  readonly question: string;
  readonly choices: readonly { readonly id: string; readonly text: string }[];
  readonly answerId: string;
  readonly why: string;
};

export function QuizFlow({
  quiz,
  startingBalance,
}: {
  quiz: QuizContent;
  startingBalance: number;
}) {
  const [step, setStep] = useState<Step>("lesson");
  const [picked, setPicked] = useState<string | null>(null);

  const balance = step === "reward" ? startingBalance + 1 : startingBalance;

  function choose(id: string) {
    setPicked(id);
    setStep(id === quiz.answerId ? "correct" : "wrong");
  }

  function retry() {
    setPicked(null);
    setStep("question");
  }

  return (
    <>
      <StarHUD balance={balance} earned={step === "reward"} />

      <div className="p-gap" data-step={step}>
        <p className="mb-2 text-ink-soft">{quiz.topicName}</p>

        {step === "lesson" && (
          <section className="ff-fade">
            <h1 className="text-title font-bold">{quiz.lesson.title}</h1>
            <p className="mt-3 rounded-card bg-surface p-gap leading-relaxed">
              {quiz.lesson.body}
            </p>
            <button
              type="button"
              onClick={() => setStep("question")}
              className="mt-gap min-h-touch w-full rounded-card font-bold text-surface"
              style={{ background: "var(--ff-primary)" }}
            >
              퀴즈 풀러 가기
            </button>
          </section>
        )}

        {step === "question" && (
          <section className="ff-fade">
            <h1 className="text-title font-bold">{quiz.question}</h1>
            <ul className="mt-gap grid gap-2">
              {quiz.choices.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => choose(c.id)}
                    className="min-h-touch w-full rounded-card bg-surface px-gap py-3 text-left"
                  >
                    {c.text}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === "correct" && (
          <section className="ff-fade">
            <h1 className="text-title font-bold">맞았어! 🎉</h1>
            <ul className="mt-gap grid gap-2">
              {quiz.choices.map((c) => {
                const isAnswer = c.id === quiz.answerId;
                return (
                  <li
                    key={c.id}
                    className="flex min-h-touch items-center gap-2 rounded-card px-gap py-3"
                    style={{
                      background: isAnswer ? "var(--ff-star-glow)" : "var(--ff-surface)",
                      opacity: isAnswer ? 1 : 0.55,
                    }}
                  >
                    <span aria-hidden>{isAnswer ? "⭕" : "　"}</span>
                    {c.text}
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 rounded-card bg-surface p-gap">{quiz.why}</p>
            <button
              type="button"
              onClick={() => setStep("reward")}
              className="mt-gap min-h-touch w-full rounded-card font-bold text-surface"
              style={{ background: "var(--ff-primary)" }}
            >
              별 받기
            </button>
          </section>
        )}

        {step === "reward" && (
          <section className="ff-fade flex flex-col items-center gap-3 py-8">
            <span
              aria-hidden
              className="star-earn text-7xl"
              style={{ color: "var(--ff-star)" }}
            >
              ★
            </span>
            <h1 className="text-title font-bold">별 1개를 받았어요!</h1>
            <p className="tabular-nums text-ink-soft">
              {startingBalance}개 → {startingBalance + 1}개
            </p>
            <div className="mt-gap grid w-full gap-2">
              <Link
                href="/child/learn"
                className="flex min-h-touch items-center justify-center rounded-card font-bold text-surface"
                style={{ background: "var(--ff-primary)" }}
              >
                다른 것도 배우기
              </Link>
              <Link
                href="/child/tree"
                className="flex min-h-touch items-center justify-center rounded-card bg-surface"
              >
                내 나무 보기
              </Link>
            </div>
          </section>
        )}

        {step === "wrong" && (
          <section className="ff-fade">
            {/* "틀렸습니다"가 아니라 "다시 해볼까?". 아동 화면에는 정확한 빨강을 쓰지 않는다 */}
            <h1 className="text-title font-bold" style={{ color: "var(--ff-miss)" }}>
              다시 해볼까?
            </h1>
            <p className="mt-2">
              아깝다! 조금만 더 생각해보면 알 수 있어요.
            </p>
            <p className="mt-3 rounded-card bg-surface p-gap">
              고른 것:{" "}
              {quiz.choices.find((c) => c.id === picked)?.text ?? "-"}
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-gap min-h-touch w-full rounded-card font-bold text-surface"
              style={{ background: "var(--ff-miss)" }}
            >
              한 번 더 풀기
            </button>
            <button
              type="button"
              onClick={() => setStep("lesson")}
              className="mt-2 min-h-touch w-full rounded-card bg-surface"
            >
              이야기 다시 읽기
            </button>
          </section>
        )}
      </div>
    </>
  );
}
