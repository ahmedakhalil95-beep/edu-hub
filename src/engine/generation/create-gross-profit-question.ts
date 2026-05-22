import { resolveGrossProfitQuestion } from "./resolve-gross-profit-question";
import type { Question } from "@/shared/schemas/question.schema";
import { createHash } from "@/shared/utils/create-hash";
import { randomInt } from "@/shared/utils/random-int";

const ENGINE_VERSION = "1.0.0";

export function createGrossProfitQuestion(
  revenue?: number,
  costOfSales?: number,
): Question {
  const resolvedRevenue = revenue ?? randomInt(80_000, 200_000);
  const resolvedCostOfSales =
    costOfSales ??
    randomInt(
      Math.floor(resolvedRevenue * 0.4),
      Math.floor(resolvedRevenue * 0.8),
    );

  const inputs = { revenue: resolvedRevenue, costOfSales: resolvedCostOfSales };
  const generationSeed = `gp-${resolvedRevenue}-${resolvedCostOfSales}`;
  const title = "Gross Profit";
  const body = `A company reports revenue of ${resolvedRevenue} and cost of sales of ${resolvedCostOfSales}. Calculate the gross profit and gross profit margin.`;
  const hash = createHash(`${generationSeed}-${title}-${body}`);

  const draft: Question = {
    questionId: crypto.randomUUID(),
    questionType: "gross-profit",
    version: 1,
    engineVersion: ENGINE_VERSION,
    generationSeed,
    hash,
    title,
    body,
    inputs,
    correctAnswer: "pending",
    syllabusTags: ["F3", "Financial Reporting"],
  };

  const resolved = resolveGrossProfitQuestion(draft);

  return {
    ...draft,
    correctAnswer: resolved.answerText,
  };
}
