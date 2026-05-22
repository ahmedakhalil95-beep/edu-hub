import { QuestionSchema } from "@/shared/schemas/question.schema";

export function validateQuestion(input: unknown) {
  return QuestionSchema.safeParse(input);
}
