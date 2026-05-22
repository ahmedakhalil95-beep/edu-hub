export type NumericGradeResult = {
  isCorrect: boolean;
  difference: number;
  feedback: string;
};

export function gradeNumericAnswer(
  studentAnswer: number,
  expectedAnswer: number,
  tolerance = 0.01,
): NumericGradeResult {
  const difference = Math.abs(studentAnswer - expectedAnswer);
  const isCorrect = difference <= tolerance;

  const feedback = isCorrect
    ? "Correct answer."
    : `Incorrect answer. Your answer is different by ${difference}.`;

  return {
    isCorrect,
    difference,
    feedback,
  };
}
