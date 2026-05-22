import type { Question } from "@/shared/schemas/question.schema";
import { createCurrentRatioQuestion } from "./create-current-ratio-question";
import { createGrossProfitQuestion } from "./create-gross-profit-question";

export type ProceduralQuestionType = "gross-profit" | "current-ratio";

export const questionTypeRegistry = {
  "gross-profit": createGrossProfitQuestion,
  "current-ratio": createCurrentRatioQuestion,
} satisfies Record<ProceduralQuestionType, () => Question>;

export function createQuestionByType(
  questionType: ProceduralQuestionType,
): Question {
  return questionTypeRegistry[questionType]();
}
