// PROTO-DATA: TASK-206 — submitQuizAnswer() 구현 시 이 파일을 삭제하고 actions/learning.ts 호출로 대체한다

export type QuizChoice = { readonly id: string; readonly text: string };

export type QuizContent = {
  readonly topicName: string;
  /** 학습 카드 — 실제 카피를 쓴다. 로렘입숨 금지 */
  readonly lesson: { readonly title: string; readonly body: string };
  readonly question: string;
  readonly choices: readonly QuizChoice[];
  readonly answerId: string;
  readonly why: string;
  /** REG-004 — '불리기'는 학습·퀴즈만 개통한다. 상품 가입 경로가 없음을 여기서 못 박는다 */
  readonly productNotice?: string;
};

const CONTENT: Record<string, QuizContent> = {
  earn: {
    topicName: "벌기",
    lesson: {
      title: "일한 만큼 받아요",
      body: "심부름을 하면 고마운 마음을 별로 받아요. 오래 걸리고 힘든 일일수록 별을 더 많이 받아요. 아무것도 안 했는데 별이 생기지는 않아요.",
    },
    question: "별을 받을 수 있는 건 어느 쪽일까요?",
    choices: [
      { id: "a", text: "동생 숙제를 대신 해주기" },
      { id: "b", text: "빨래 개는 걸 도와드리기" },
      { id: "c", text: "그냥 달라고 조르기" },
      { id: "d", text: "친구 별을 빌려오기" },
    ],
    answerId: "b",
    why: "내가 직접 한 일이라서 별을 받을 수 있어요.",
  },
  spend: {
    topicName: "쓰기",
    lesson: {
      title: "사기 전에 한 번 더",
      body: "가게에 들어가면 다 갖고 싶어져요. 그래서 미리 '무엇을, 얼마에 살지' 적어두면 좋아요. 적어둔 것보다 적게 쓰면 계획을 지킨 거예요.",
    },
    question: "문구점에 가기 전에 하면 좋은 일은?",
    choices: [
      { id: "a", text: "얼마를 쓸지 미리 정해두기" },
      { id: "b", text: "돈을 전부 들고 가기" },
      { id: "c", text: "친구가 사는 걸 따라 사기" },
      { id: "d", text: "제일 비싼 걸 먼저 보기" },
    ],
    answerId: "a",
    why: "미리 정해두면 가게에서 흔들리지 않아요.",
  },
  save: {
    topicName: "모으기",
    lesson: {
      title: "지금 참으면 더 큰 걸",
      body: "오늘 젤리를 사면 젤리가 남아요. 오늘 용돈을 아껴 모으면 더 갖고 싶던 걸 살 수 있어요.",
    },
    question: "3주 뒤에 로봇을 사고 싶어요. 오늘은?",
    choices: [
      { id: "a", text: "일단 젤리부터 사기" },
      { id: "b", text: "용돈을 모아두기" },
      { id: "c", text: "로봇을 미리 빌리기" },
      { id: "d", text: "안 사기로 마음 바꾸기" },
    ],
    answerId: "b",
    why: "모아둔 용돈이 나중에 더 갖고 싶은 걸 만나게 해줘요.",
  },
  grow: {
    topicName: "불리기",
    lesson: {
      title: "돈이 스스로 자라요",
      body: "은행에 돈을 맡기면 아주 조금씩 늘어나요. 오래 맡길수록 더 늘어나요. 하지만 여기서는 이야기와 퀴즈만 배워요.",
    },
    question: "저금통과 은행의 다른 점은?",
    choices: [
      { id: "a", text: "은행에 맡기면 조금씩 늘어나요" },
      { id: "b", text: "저금통이 더 빨리 늘어나요" },
      { id: "c", text: "둘 다 똑같아요" },
      { id: "d", text: "은행은 돈을 가져가요" },
    ],
    answerId: "a",
    why: "맡긴 값에 대한 고마움을 조금씩 돌려줘요.",
    productNotice:
      "불리기는 여기까지예요. 핀프렌즈에는 진짜 예금이나 펀드에 가입하는 곳이 없어요.",
  },
};

export function getQuiz(topic: string): QuizContent {
  return CONTENT[topic] ?? CONTENT.spend;
}

export const starBalance = 11;
