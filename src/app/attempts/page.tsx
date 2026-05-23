import { supabase } from "@/lib/supabase";

type StudentAttemptRow = {
  question_type: string;
  generation_seed: string;
  question_hash: string;
  student_answer: number;
  expected_answer: number;
  is_correct: boolean;
  difference: number;
  submitted_at: string;
};

function formatNumber(value: number) {
  return Number(value).toFixed(2);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default async function AttemptsPage() {
  const { data, error } = await supabase
    .from("student_attempts")
    .select(
      "question_type, generation_seed, question_hash, student_answer, expected_answer, is_correct, difference, submitted_at",
    )
    .order("submitted_at", { ascending: false })
    .limit(20);

  const attempts = (data ?? []) as StudentAttemptRow[];

  return (
    <main className="mx-auto max-w-6xl p-10">
      <h1 className="mb-2 text-3xl font-bold">Student attempts</h1>
      <p className="mb-8 text-gray-600">Latest 20 submitted demo attempts</p>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
          Could not load attempts: {error.message}
        </div>
      )}

      {!error && attempts.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-700">
          No attempts have been submitted yet.
        </div>
      )}

      {!error && attempts.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Submitted
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Type
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Student
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Expected
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Difference
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Result
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Seed
                </th>
                <th className="border-b border-gray-200 px-4 py-3 font-semibold">
                  Hash
                </th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr
                  key={`${attempt.question_hash}-${attempt.submitted_at}`}
                  className="text-gray-800"
                >
                  <td className="border-b border-gray-100 px-4 py-3">
                    {formatDate(attempt.submitted_at)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {attempt.question_type}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {formatNumber(attempt.student_answer)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {formatNumber(attempt.expected_answer)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {formatNumber(attempt.difference)}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3">
                    {attempt.is_correct ? "Correct" : "Incorrect"}
                  </td>
                  <td className="border-b border-gray-100 px-4 py-3 font-mono">
                    {attempt.generation_seed}
                  </td>
                  <td className="max-w-xs break-all border-b border-gray-100 px-4 py-3 font-mono">
                    {attempt.question_hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
