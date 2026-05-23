import type { Question } from "@/shared/schemas/question.schema";
import { createCurrentRatioQuestion } from "./create-current-ratio-question";
import { createGrossProfitQuestion } from "./create-gross-profit-question";
import { createQuickRatioQuestion } from "./create-quick-ratio-question";

export type ProceduralQuestionType =
  | "gross-profit"
  | "current-ratio"
  | "quick-ratio";

export const questionTypeRegistry = {
  "gross-profit": createGrossProfitQuestion,
  "current-ratio": createCurrentRatioQuestion,
  "quick-ratio": createQuickRatioQuestion,
} satisfies Record<ProceduralQuestionType, () => Question>;

export function createQuestionByType(
  questionType: ProceduralQuestionType,
): Question {
  return questionTypeRegistry[questionType]();
}
