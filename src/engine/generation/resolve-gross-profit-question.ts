import { calculateGrossProfit } from "@/engine/calculation";
import type { Question } from "@/shared/schemas/question.schema";

export type GrossProfitQuestionResult = {
  grossProfit: number;
  grossProfitMargin: number;
  answerText: string;
};

export function resolveGrossProfitQuestion(
  question: Question,
): GrossProfitQuestionResult {
  const revenue = question.inputs.revenue;
  const costOfSales = question.inputs.costOfSales;

  if (typeof revenue !== "number" || typeof costOfSales !== "number") {
    throw new Error(
      "Question inputs must include numeric revenue and costOfSales.",
    );
  }

  const { grossProfit, grossProfitMargin } = calculateGrossProfit(
    revenue,
    costOfSales,
  );

  const answerText = `Gross profit is ${grossProfit} with a gross profit margin of ${grossProfitMargin.toFixed(2)}%.`;

  return {
    grossProfit,
    grossProfitMargin,
    answerText,
  };
}
