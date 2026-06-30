import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const body = await request.json();
    const page = body?.page;

    if (!page) {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { message: 'Tracking skipped: Supabase environment variables are not configured yet.' },
        { status: 200 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { error } = await supabase.from('page_views').insert([{ page }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
