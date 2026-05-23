import { supabase } from '@/lib/supabase';
// Using a plain anchor tag instead of next/link to avoid missing-type errors in some TypeScript setups

type SyllabusNode = {
  id: string;
  title: string;
  description: string | null;
};

export default async function Home() {
  const { data: nodes } = await supabase.from('syllabus_nodes').select('*').eq('depth', 0);
  
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">قائمة المواد الدراسية</h1>
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
