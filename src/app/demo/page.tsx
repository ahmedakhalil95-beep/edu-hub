import { createGrossProfitQuestion } from "@/engine/generation";

export default function DemoPage() {
  const question = createGrossProfitQuestion();

  return (
    <main className="mx-auto max-w-2xl p-10">
      <h1 className="mb-2 text-3xl font-bold">Engine demo</h1>
      <p className="mb-8 text-gray-600">
        Procedural gross profit question (revenue{" "}
        {question.inputs.revenue.toLocaleString()} · cost of sales{" "}
        {question.inputs.costOfSales.toLocaleString()})
      </p>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Title
          </h2>
          <p className="text-xl font-semibold text-gray-900">{question.title}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Body
          </h2>
          <p className="text-gray-800">{question.body}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Generation seed
          </h2>
          <p className="font-mono text-sm text-gray-800">{question.generationSeed}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Hash
          </h2>
          <p className="break-all font-mono text-sm text-gray-800">{question.hash}</p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Correct answer
          </h2>
          <p className="rounded-lg bg-green-50 p-4 text-green-900">
            {question.correctAnswer}
          </p>
        </section>
      </div>
    </main>
  );
}
