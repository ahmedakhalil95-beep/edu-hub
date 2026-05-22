import { createGrossProfitQuestion } from "./create-gross-profit-question";

const question = createGrossProfitQuestion(100_000, 60_000);

console.log("\n=== Full question ===");
console.log(question);

console.log("\n=== Key fields ===");
console.log("questionId:", question.questionId);
console.log("generationSeed:", question.generationSeed);
console.log("hash:", question.hash);
console.log("correctAnswer:", question.correctAnswer);
