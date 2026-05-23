import { getAllLearningOutcomes } from "@/domains/syllabus/pm-syllabus";

export default function CapsulesPage() {
  const learningOutcomes = getAllLearningOutcomes();

  return (
    <main className="mx-auto max-w-4xl p-10">
      <h1 className="mb-2 text-3xl font-bold">Revision Capsules</h1>
      <p className="mb-8 text-gray-600">
        Starter PM learning outcomes mapped to procedural practice.
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

            <div className="mt-4">
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Question types
              </h3>
              <p className="font-mono text-sm text-gray-800">
                {outcome.questionTypes.join(", ")}
              </p>
            </div>

            <a
              href="/demo"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Start practice
            </a>
          </section>
        ))}
      </div>
    </main>
  );
}
