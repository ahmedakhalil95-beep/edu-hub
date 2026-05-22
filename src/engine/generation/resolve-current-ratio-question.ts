import { calculateCurrentRatio } from "@/engine/calculation";
import type { Question } from "@/shared/schemas/question.schema";

export type CurrentRatioQuestionResult = {
  currentRatio: number;
  answerText: string;
};

export function resolveCurrentRatioQuestion(
  question: Question,
): CurrentRatioQuestionResult {
  const currentAssets = question.inputs.currentAssets;
  const currentLiabilities = question.inputs.currentLiabilities;

  if (
    typeof currentAssets !== "number" ||
    typeof currentLiabilities !== "number"
  ) {
    throw new Error(
      "Question inputs must include numeric currentAssets and currentLiabilities.",
    );
  }

  const { currentRatio } = calculateCurrentRatio(
    currentAssets,
    currentLiabilities,
  );

  const answerText = `Current ratio is ${currentRatio.toFixed(2)}.`;

  return {
    currentRatio,
    answerText,
  };
}
