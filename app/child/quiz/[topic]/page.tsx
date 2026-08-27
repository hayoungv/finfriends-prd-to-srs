import { QuizFlow } from "@/components/child/QuizFlow";
import { getQuiz, starBalance } from "./quiz.fixture";

// TASK-206 · REQ-FUNC-003 AC2 — 정답 제출 시 별 1개 즉시 지급
export const metadata = { title: "퀴즈 · 핀프렌즈" };

export default async function ChildQuizPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  return <QuizFlow quiz={getQuiz(topic)} startingBalance={starBalance} />;
}
