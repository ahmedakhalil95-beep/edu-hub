import { describe, expect, it } from "vitest";
import { QuestionSchema } from "@/shared/schemas/question.schema";
import {
  createQuestionByType,
  questionTypeRegistry,
  type ProceduralQuestionType,
} from "./question-type-registry";

const expectedQuestionTypes: ProceduralQuestionType[] = [
  "gross-profit",
  "current-ratio",
  "quick-ratio",
];

describe("questionTypeRegistry", () => {
  it("contains the supported question types", () => {
    expect(Object.keys(questionTypeRegistry).sort()).toEqual(
      [...expectedQuestionTypes].sort(),
    );
  });

  it("creates a valid question for each registered type", () => {
    for (const questionType of expectedQuestionTypes) {
      const question = createQuestionByType(questionType);

      expect(question.questionType).toBe(questionType);
      expect(() => QuestionSchema.parse(question)).not.toThrow();
    }
  });
});
