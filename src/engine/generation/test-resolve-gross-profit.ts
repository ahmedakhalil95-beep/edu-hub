import { resolveGrossProfitQuestion } from "./resolve-gross-profit-question";
import type { Question } from "@/shared/schemas/question.schema";

const validQuestion: Question = {
  questionId: "gp-001",
  questionType: "gross-profit",
  version: 1,
  engineVersion: "1.0.0",
  generationSeed: "seed-gp-001",
  hash: "hash-gp-001",
  title: "Gross Profit",
  body: "Calculate gross profit and gross profit margin from the given figures.",
  inputs: {
    revenue: 100000,
    costOfSales: 60000,
  },
  correctAnswer: "Gross profit 40000; margin 40%",
  syllabusTags: ["F3", "Financial Reporting"],
};

const invalidMissingCostOfSales: Question = {
  questionId: "gp-002",
  questionType: "gross-profit",
  version: 1,
  engineVersion: "1.0.0",
  generationSeed: "seed-gp-002",
  hash: "hash-gp-002",
  title: "Gross Profit",
  body: "Calculate gross profit when cost of sales is missing from inputs.",
  inputs: {
    revenue: 100000,
  },
  correctAnswer: "Cannot calculate without cost of sales",
  syllabusTags: ["F3"],
};

function logResolverResult(label: string, question: Question) {
  console.log(`\n=== ${label} ===`);
  console.log("Inputs:", question.inputs);

  try {
    const result = resolveGrossProfitQuestion(question);
    console.log("Success: true");
    console.log("Result:", result);
  } catch (error) {
    console.log("Success: false");
    console.log(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );
  }
}

logResolverResult("Valid gross profit question", validQuestion);
logResolverResult(
  "Invalid question: missing costOfSales",
  invalidMissingCostOfSales,
);
