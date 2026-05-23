import { getAllLearningOutcomes } from '@/domains/syllabus/pm-syllabus';
import { supabase } from '@/lib/supabase';
// Using a plain anchor tag instead of next/link to avoid missing-type errors in some TypeScript setups

type SyllabusNode = {
  id: string;
  title: string;
  description: string | null;
};

export default async function Home() {
  const { data: nodes } = await supabase.from('syllabus_nodes').select('*').eq('depth', 0);
  const activeLearningOutcomeCount = getAllLearningOutcomes().length;
  
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">قائمة المواد الدراسية</h1>
      <section className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            PM Syllabus Completion
          </h2>
          <p className="mt-1 text-2xl font-bold text-gray-900">0%</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Active Learning Outcomes
          </h2>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {activeLearningOutcomeCount}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Current Focus
          </h2>
          <p className="mt-1 font-semibold text-gray-900">
            Financial ratios / performance analysis
          </p>
        </div>
      </section>
      <section className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Practice Accuracy
          </h2>
          <p className="mt-1 font-semibold text-gray-900">
            Not enough data yet
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Weakest Topic
          </h2>
          <p className="mt-1 font-semibold text-gray-900">
            Not available yet
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Recommended Next Step
          </h2>
          <p className="mt-1 font-semibold text-gray-900">
            Start with Revision Capsules
          </p>
        </div>
      </section>
      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href="/demo"
          className="inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100"
        >
          Try procedural demo
        </a>
        <a
          href="/attempts"
          className="inline-block rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
        >
          View student attempts
        </a>
      </div>
      <a
        href="/capsules"
        className="mb-6 block rounded-xl border border-blue-100 bg-blue-50 p-6 hover:bg-blue-100"
      >
        <h2 className="text-xl font-bold text-blue-700">Revision Capsules</h2>
        <p className="mt-1 text-gray-700">
          Quick syllabus-linked revision cards mapped to ACCA PM learning
          outcomes.
        </p>
      </a>
      <a
        href="/syllabus"
        className="mb-6 block rounded-xl border border-blue-100 bg-blue-50 p-6 hover:bg-blue-100"
      >
        <h2 className="text-xl font-bold text-blue-700">Detailed Syllabus</h2>
        <p className="mt-1 text-gray-700">
          Full PM syllabus lessons mapped to ACCA learning outcomes.
        </p>
      </a>
      <div className="grid gap-4">
        {nodes?.map((node: SyllabusNode) => (
          <a key={node.id} href={`/node/${node.id}`} className="p-6 border rounded-xl hover:bg-slate-50 block">
            <h2 className="text-xl font-bold text-blue-600">{node.title}</h2>
            <p className="text-gray-600">{node.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
