import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const fallbackWorks = [
  {
    id: 'placeholder-1',
    title: 'تصميم ستائر كلاسيك',
    category: 'ستائر',
    image_url: '',
    visible: true,
  },
  {
    id: 'placeholder-2',
    title: 'ركنة مودرن هادئة',
    category: 'ركنات',
    image_url: '',
    visible: true,
  },
  {
    id: 'placeholder-3',
    title: 'كنبة أنيقة للمجالس',
    category: 'كنب',
    image_url: '',
    visible: true,
  },
];

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase')) {
    return NextResponse.json({ works: fallbackWorks, placeholder: true });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ works: fallbackWorks, placeholder: true, error: error.message });
    }

    return NextResponse.json({ works: data ?? [], placeholder: (data ?? []).length === 0 });
  } catch (error) {
    return NextResponse.json({ works: fallbackWorks, placeholder: true, error: error.message });
  }
}
