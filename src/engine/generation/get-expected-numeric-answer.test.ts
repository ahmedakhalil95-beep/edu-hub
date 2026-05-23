import { describe, expect, it } from "vitest";
import { createCurrentRatioQuestion } from "./create-current-ratio-question";
import { createGrossProfitQuestion } from "./create-gross-profit-question";
import { createQuickRatioQuestion } from "./create-quick-ratio-question";
import { getExpectedNumericAnswer } from "./get-expected-numeric-answer";

describe("getExpectedNumericAnswer", () => {
  it("returns gross profit for gross-profit questions", () => {
    const question = createGrossProfitQuestion(100_000, 60_000);

    expect(getExpectedNumericAnswer(question)).toBe(40_000);
  });

  it("returns current ratio for current-ratio questions", () => {
    const question = createCurrentRatioQuestion(120_000, 60_000);

    expect(getExpectedNumericAnswer(question)).toBe(2);
  });

  it("returns quick ratio for quick-ratio questions", () => {
    const question = createQuickRatioQuestion(120_000, 30_000, 60_000);

    expect(getExpectedNumericAnswer(question)).toBe(1.5);
  });

  it("rejects unsupported question types", () => {
    const question = createGrossProfitQuestion(100_000, 60_000);

    expect(() =>
      getExpectedNumericAnswer({
        ...question,
        questionType: "unsupported-type",
      }),
    ).toThrow("Unsupported question type: unsupported-type");
  });
});
