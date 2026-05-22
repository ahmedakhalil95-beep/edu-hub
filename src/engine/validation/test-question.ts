import { validateQuestion } from "./validate-question";

const validQuestion = {
  questionId: "q-001",
  version: 1,
  engineVersion: "1.0.0",
  generationSeed: "seed-abc",
  hash: "hash-valid-001",
  title: "Working Capital",
  body: "Explain the main components of working capital.",
  inputs: {
    revenue: 100000,
    costOfSales: 60000,
  },
  correctAnswer: "Current assets minus current liabilities",
  syllabusTags: ["F1", "Financial Management"],
};

const invalidQuestion = {
  questionId: "q-002",
  version: 0,
  engineVersion: "1.0.0",
  generationSeed: "seed-xyz",
  hash: "hash-invalid-002",
  title: "AB",
  body: "Too short",
  inputs: {
    revenue: 50000,
  },
  correctAnswer: "",
  syllabusTags: [],
};

function logValidationResult(label: string, input: unknown) {
  const result = validateQuestion(input);

  console.log(`\n=== ${label} ===`);
  console.log("Success:", result.success);

  if (result.success) {
    console.log("Validated question:", result.data);
  } else {
    console.log("Validation errors:", result.error.flatten());
  }
}

logValidationResult("Valid question", validQuestion);
logValidationResult("Invalid question", invalidQuestion);
