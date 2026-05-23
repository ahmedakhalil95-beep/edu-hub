import { describe, expect, it } from "vitest";
import type { ProceduralQuestionType } from "@/engine/generation";
import {
  getAllLearningOutcomes,
  getLearningOutcomeById,
  getLearningOutcomeForQuestionType,
  getQuestionTypesForLearningOutcome,
} from "./pm-syllabus";

describe("PM syllabus helpers", () => {
  it("returns the three starter PM learning outcomes", () => {
    const outcomes = getAllLearningOutcomes();

    expect(outcomes.map((outcome) => outcome.loId)).toEqual([
      "PM_RATIO_CURRENT",
      "PM_RATIO_QUICK",
      "PM_RATIO_GROSS_PROFIT",
    ]);
  });

  it("finds the current ratio learning outcome by loId", () => {
    const outcome = getLearningOutcomeById("PM_RATIO_CURRENT");

    expect(outcome?.title).toBe("Calculate and interpret the current ratio");
    expect(outcome?.questionTypes).toEqual(["current-ratio"]);
  });

  it("returns quick-ratio for the quick ratio learning outcome", () => {
    expect(getQuestionTypesForLearningOutcome("PM_RATIO_QUICK")).toEqual([
      "quick-ratio",
    ]);
  });

  it("finds the gross profit margin learning outcome by question type", () => {
    const outcome = getLearningOutcomeForQuestionType("gross-profit");

    expect(outcome?.loId).toBe("PM_RATIO_GROSS_PROFIT");
    expect(outcome?.title).toBe(
      "Calculate and interpret gross profit margin",
    );
  });

  it("returns undefined for an unknown loId", () => {
    expect(getLearningOutcomeById("UNKNOWN_LO")).toBeUndefined();
  });

  it("returns undefined for an unknown questionType", () => {
    const unknownQuestionType = "unknown-question" as ProceduralQuestionType;

    expect(
      getLearningOutcomeForQuestionType(unknownQuestionType),
    ).toBeUndefined();
  });
});
