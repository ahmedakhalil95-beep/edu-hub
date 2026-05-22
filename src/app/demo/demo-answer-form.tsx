"use client";

import { useState } from "react";
import {
  gradeNumericAnswer,
  type NumericGradeResult,
} from "@/engine/grading/grade-numeric-answer";

type DemoAnswerFormProps = {
  expectedAnswer: number;
};

function formatNumber(value: number) {
  return value.toFixed(2);
}

export function DemoAnswerForm({ expectedAnswer }: DemoAnswerFormProps) {
  const [studentAnswerText, setStudentAnswerText] = useState("");
  const [studentAnswer, setStudentAnswer] = useState<number | null>(null);
  const [gradeResult, setGradeResult] = useState<NumericGradeResult | null>(
    null,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAnswer = Number(studentAnswerText);

    if (Number.isNaN(numericAnswer)) {
      setStudentAnswer(null);
      setGradeResult({
        isCorrect: false,
        difference: 0,
        feedback: "Please enter a numeric answer.",
      });
      return;
    }

    setStudentAnswer(numericAnswer);
    setGradeResult(gradeNumericAnswer(numericAnswer, expectedAnswer));
  }

  return (
    <section>
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Check your answer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          step="0.01"
          value={studentAnswerText}
          onChange={(event) => setStudentAnswerText(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
          placeholder="Enter a numeric answer"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Check answer
        </button>
      </form>

      {gradeResult && (
        <div className="mt-4 space-y-2 rounded-lg bg-gray-50 p-4 text-gray-900">
          <p>
            <span className="font-semibold">Student answer:</span>{" "}
            {studentAnswer === null ? "Not a number" : formatNumber(studentAnswer)}
          </p>
          <p>
            <span className="font-semibold">Expected answer:</span>{" "}
            {formatNumber(expectedAnswer)}
          </p>
          <p>
            <span className="font-semibold">Result:</span>{" "}
            {gradeResult.isCorrect ? "Correct" : "Incorrect"}
          </p>
          <p>
            <span className="font-semibold">Feedback:</span>{" "}
            {gradeResult.feedback}
          </p>
        </div>
      )}
    </section>
  );
}
