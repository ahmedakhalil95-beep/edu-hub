import { resolveCurrentRatioQuestion } from "./resolve-current-ratio-question";
import type { Question } from "@/shared/schemas/question.schema";
import { createHash } from "@/shared/utils/create-hash";
import { randomInt } from "@/shared/utils/random-int";

const ENGINE_VERSION = "1.0.0";

export function createCurrentRatioQuestion(
  currentAssets?: number,
  currentLiabilities?: number,
): Question {
  const resolvedCurrentLiabilities =
    currentLiabilities ?? randomInt(20_000, 100_000);
  const resolvedCurrentAssets =
    currentAssets ??
    randomInt(
      Math.floor(resolvedCurrentLiabilities * 0.8),
      Math.floor(resolvedCurrentLiabilities * 2.5),
    );

  const inputs = {
    currentAssets: resolvedCurrentAssets,
    currentLiabilities: resolvedCurrentLiabilities,
  };
  const generationSeed = `cr-${resolvedCurrentAssets}-${resolvedCurrentLiabilities}`;
  const title = "Current Ratio";
  const body = `A company reports current assets of ${resolvedCurrentAssets} and current liabilities of ${resolvedCurrentLiabilities}. Calculate the current ratio.`;
  const hash = createHash(`${generationSeed}-${title}-${body}`);

  const draft: Question = {
    questionId: crypto.randomUUID(),
    questionType: "current-ratio",
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

  const resolved = resolveCurrentRatioQuestion(draft);

  return {
    ...draft,
    correctAnswer: resolved.answerText,
  };
}
