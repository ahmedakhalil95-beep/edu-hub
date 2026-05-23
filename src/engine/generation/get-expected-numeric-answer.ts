import type { Question } from "@/shared/schemas/question.schema";
import { resolveCurrentRatioQuestion } from "./resolve-current-ratio-question";
import { resolveGrossProfitQuestion } from "./resolve-gross-profit-question";
import { resolveQuickRatioQuestion } from "./resolve-quick-ratio-question";

export function getExpectedNumericAnswer(question: Question): number {
  if (question.questionType === "gross-profit") {
    return resolveGrossProfitQuestion(question).grossProfit;
  }

  if (question.questionType === "current-ratio") {
    return resolveCurrentRatioQuestion(question).currentRatio;
  }

  if (question.questionType === "quick-ratio") {
    return resolveQuickRatioQuestion(question).quickRatio;
  }

  throw new Error(`Unsupported question type: ${question.questionType}`);
}
