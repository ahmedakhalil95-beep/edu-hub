import { resolveQuickRatioQuestion } from "./resolve-quick-ratio-question";
import type { Question } from "@/shared/schemas/question.schema";
import { createHash } from "@/shared/utils/create-hash";
import { randomInt } from "@/shared/utils/random-int";

const ENGINE_VERSION = "1.0.0";

export function createQuickRatioQuestion(
  currentAssets?: number,
  inventory?: number,
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
  const resolvedInventory =
    inventory ??
    randomInt(
      Math.floor(resolvedCurrentAssets * 0.1),
      Math.floor(resolvedCurrentAssets * 0.4),
    );

  const inputs = {
    currentAssets: resolvedCurrentAssets,
    inventory: resolvedInventory,
    currentLiabilities: resolvedCurrentLiabilities,
  };
  const generationSeed = `qr-${resolvedCurrentAssets}-${resolvedInventory}-${resolvedCurrentLiabilities}`;
  const title = "Quick Ratio";
  const body = `A company reports current assets of ${resolvedCurrentAssets}, inventory of ${resolvedInventory}, and current liabilities of ${resolvedCurrentLiabilities}. Calculate the quick ratio.`;
  const hash = createHash(`${generationSeed}-${title}-${body}`);

  const draft: Question = {
    questionId: crypto.randomUUID(),
    questionType: "quick-ratio",
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

  const resolved = resolveQuickRatioQuestion(draft);

  return {
    ...draft,
    correctAnswer: resolved.answerText,
  };
}
