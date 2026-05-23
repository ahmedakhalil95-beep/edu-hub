import { getAllLearningOutcomes } from "@/domains/syllabus/pm-syllabus";

export default function SyllabusPage() {
  const learningOutcomes = getAllLearningOutcomes();

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="mb-2 text-3xl font-bold">Detailed Syllabus</h1>
      <p className="mb-8 text-gray-600">
        Placeholder PM lessons mapped to syllabus learning outcomes.
      </p>

      <div className="grid gap-4">
        {learningOutcomes.map((outcome) => (
          <section
            key={outcome.loId}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="mb-2 font-mono text-sm text-blue-700">
              {outcome.loId}
            </p>
            <h2 className="text-xl font-semibold text-gray-900">
              {outcome.title}
            </h2>
            <p className="mt-2 text-gray-700">{outcome.description}</p>

            <div className="mt-4 grid gap-3">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Detailed Explanation
                </h3>
                <p className="text-gray-700">{outcome.detailedExplanation}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Worked Example
                </h3>
                <p className="text-gray-700">{outcome.workedExample}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Common Mistakes
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  {outcome.commonMistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Question types
              </h3>
              <p className="font-mono text-sm text-gray-800">
                {outcome.questionTypes.join(", ")}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/capsules"
                className="inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100"
              >
                Open revision capsules
              </a>
              <a
                href="/demo"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Try a TYU question
              </a>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
