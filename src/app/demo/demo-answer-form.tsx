"use client";

import { useState } from "react";
import {
  gradeNumericAnswer,
  type NumericGradeResult,
} from "@/engine/grading/grade-numeric-answer";
import {
  saveStudentAttempt,
  type StudentAttemptInput,
} from "@/platform/telemetry/save-student-attempt";

type DemoAnswerFormProps = {
  expectedAnswer: number;
  generationSeed: string;
  hash: string;
  questionType: string;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

function formatNumber(value: number) {
  return value.toFixed(2);
}

export function DemoAnswerForm({
  expectedAnswer,
  generationSeed,
  hash,
  questionType,
}: DemoAnswerFormProps) {
  const [studentAnswerText, setStudentAnswerText] = useState("");
  const [studentAnswer, setStudentAnswer] = useState<number | null>(null);
  const [gradeResult, setGradeResult] = useState<NumericGradeResult | null>(
    null,
  );
  const [latestAttempt, setLatestAttempt] =
    useState<StudentAttemptInput | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveErrorMessage, setSaveErrorMessage] = useState("");

  function createAttempt(
    submittedAnswer: number | null,
    result: NumericGradeResult,
  ) {
    return {
      questionType,
      generationSeed,
      hash,
      studentAnswer: submittedAnswer,
      expectedAnswer,
      isCorrect: result.isCorrect,
      difference: result.difference,
      submittedAt: new Date().toISOString(),
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAnswer = Number(studentAnswerText);

    if (Number.isNaN(numericAnswer)) {
      setStudentAnswer(null);
      const result = {
        isCorrect: false,
        difference: 0,
        feedback: "Please enter a numeric answer.",
      };
      const attempt = createAttempt(null, result);

      setGradeResult(result);
      setLatestAttempt(attempt);
      setSaveStatus("idle");
      setSaveErrorMessage("");
      return;
    }

    const result = gradeNumericAnswer(numericAnswer, expectedAnswer);
    const attempt = createAttempt(numericAnswer, result);

    setStudentAnswer(numericAnswer);
    setGradeResult(result);
    setLatestAttempt(attempt);
    setSaveStatus("saving");
    setSaveErrorMessage("");

    try {
      await saveStudentAttempt(attempt);
      setSaveStatus("saved");
    } catch (error) {
      console.error("Supabase student attempt insert failed:", error);
      setSaveStatus("error");
      setSaveErrorMessage(
        error instanceof Error ? error.message : "Unknown Supabase error",
      );
    }
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
          {saveStatus !== "idle" && (
            <p>
              <span className="font-semibold">Save status:</span>{" "}
              {saveStatus === "saving" && "Saving attempt..."}
              {saveStatus === "saved" && "Attempt saved."}
              {saveStatus === "error" &&
                `Attempt could not be saved: ${saveErrorMessage}`}
            </p>
          )}

          {latestAttempt && (
            <div className="border-t border-gray-200 pt-3">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Latest attempt
              </h3>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold">Question type</dt>
                  <dd>{latestAttempt.questionType}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Generation seed</dt>
                  <dd>{latestAttempt.generationSeed}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hash</dt>
                  <dd className="break-all font-mono">{latestAttempt.hash}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Submitted at</dt>
                  <dd>{latestAttempt.submittedAt}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Student answer</dt>
                  <dd>
                    {latestAttempt.studentAnswer === null
                      ? "Not a number"
                      : formatNumber(latestAttempt.studentAnswer)}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Expected answer</dt>
                  <dd>{formatNumber(latestAttempt.expectedAnswer)}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Is correct</dt>
                  <dd>{latestAttempt.isCorrect ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Difference</dt>
                  <dd>{formatNumber(latestAttempt.difference)}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
