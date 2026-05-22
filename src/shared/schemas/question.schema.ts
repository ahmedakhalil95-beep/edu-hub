import { z } from "zod";

export const QuestionSchema = z.object({
  questionId: z.string(),
  questionType: z.string().min(1),
  version: z.number().int().positive(),
  engineVersion: z.string(),
  generationSeed: z.string(),
  hash: z.string(),
  title: z.string().min(3),
  body: z.string().min(10),
  inputs: z.record(z.string(), z.number()),
  correctAnswer: z.string().min(1),
  syllabusTags: z.array(z.string()).min(1),
});

export type Question = z.infer<typeof QuestionSchema>;
