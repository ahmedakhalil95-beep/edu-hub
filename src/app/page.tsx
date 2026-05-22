import { supabase } from '@/lib/supabase';
// Using a plain anchor tag instead of next/link to avoid missing-type errors in some TypeScript setups

export default async function Home() {
  const { data: nodes } = await supabase.from('syllabus_nodes').select('*').eq('depth', 0);
  
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">قائمة المواد الدراسية</h1>
      <a
        href="/demo"
        className="mb-6 inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-100"
      >
        Try procedural question demo
      </a>
      <div className="grid gap-4">
        {nodes?.map((node: any) => (
          <a key={node.id} href={`/node/${node.id}`} className="p-6 border rounded-xl hover:bg-slate-50 block">
            <h2 className="text-xl font-bold text-blue-600">{node.title}</h2>
            <p className="text-gray-600">{node.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}