import { calculateQuickRatio } from "@/engine/calculation";
import type { Question } from "@/shared/schemas/question.schema";

export type QuickRatioQuestionResult = {
  quickRatio: number;
  answerText: string;
};

export function resolveQuickRatioQuestion(
  question: Question,
): QuickRatioQuestionResult {
  const currentAssets = question.inputs.currentAssets;
  const inventory = question.inputs.inventory;
  const currentLiabilities = question.inputs.currentLiabilities;

  if (
    typeof currentAssets !== "number" ||
    typeof inventory !== "number" ||
    typeof currentLiabilities !== "number"
  ) {
    throw new Error(
      "Question inputs must include numeric currentAssets, inventory, and currentLiabilities.",
    );
  }

  const { quickRatio } = calculateQuickRatio(
    currentAssets,
    inventory,
    currentLiabilities,
  );

  const answerText = `Quick ratio is ${quickRatio.toFixed(2)}.`;

  return {
    quickRatio,
    answerText,
  };
}
