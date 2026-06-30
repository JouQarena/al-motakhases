import { NextResponse } from 'next/server';
import { createServerSupabaseServiceClient } from '@/lib/supabase';
import { requireAdminSession } from '@/lib/adminAuth';

const defaultStats = [
  { page: 'ستائر', count: 0 },
  { page: 'ركنات', count: 0 },
  { page: 'كنب', count: 0 },
  { page: 'home', count: 0 },
];

export async function GET() {
  const authorized = await requireAdminSession();

  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ stats: defaultStats, placeholder: true });
  }

  const { data, error } = await supabase.from('page_views').select('page');

  if (error) {
    return NextResponse.json({ stats: defaultStats, placeholder: true, error: error.message });
  }

  const counts = data.reduce((acc, item) => {
    acc[item.page] = (acc[item.page] || 0) + 1;
    return acc;
  }, {});

  const stats = defaultStats.map((item) => ({
    page: item.page,
    count: counts[item.page] || 0,
  }));

  return NextResponse.json({ stats });
}
