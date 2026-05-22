import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type SyllabusNode = {
  id: string;
  title: string;
  description: string | null;
};

export default async function NodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: subNodes, error } = await supabase
    .from('syllabus_nodes')
    .select('*')
    .eq('parent_id', id);

  if (error) {
    return (
      <main className="p-10">
        <p className="text-red-500">حدث خطأ في تحميل البيانات</p>
      </main>
    );
  }

  return (
    <main className="p-10">
      <Link href="/" className="text-blue-500 mb-6 block">
        ← رجوع
      </Link>

      <h1 className="text-2xl font-bold mb-6">محتوى المادة</h1>

      <div className="grid gap-4">
        {subNodes?.map((node: SyllabusNode) => (
          <div key={node.id} className="p-6 border rounded-xl">
            <h2 className="text-lg font-semibold">{node.title}</h2>
            <p className="text-gray-600">{node.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
