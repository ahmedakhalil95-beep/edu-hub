import { describe, expect, it } from "vitest";
import { gradeNumericAnswer } from "./grade-numeric-answer";

describe("gradeNumericAnswer", () => {
  it("marks an exact answer as correct", () => {
    const result = gradeNumericAnswer(42, 42);

    expect(result.isCorrect).toBe(true);
    expect(result.feedback).toBe("Correct answer.");
  });

  it("marks an answer within the default tolerance as correct", () => {
    const result = gradeNumericAnswer(42.005, 42);

    expect(result.isCorrect).toBe(true);
  });

  it("marks an answer outside the default tolerance as incorrect", () => {
    const result = gradeNumericAnswer(42.02, 42);

    expect(result.isCorrect).toBe(false);
    expect(result.feedback).toBe(
      "Incorrect answer. Your answer is different by 0.020000000000003126.",
    );
  });

  it("supports a custom tolerance", () => {
    const result = gradeNumericAnswer(42.2, 42, 0.25);

    expect(result.isCorrect).toBe(true);
  });

  it("calculates the absolute difference", () => {
    const result = gradeNumericAnswer(37, 42);

    expect(result.difference).toBe(5);
  });
});
