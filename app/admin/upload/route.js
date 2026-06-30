import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { createServerSupabaseServiceClient } from '@/lib/supabase';
import { requireAdminSession } from '@/lib/adminAuth';

function jsonError(message, status = 500, details) {
  return NextResponse.json(
    {
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  );
}

export async function POST(request) {
  try {
    const authorized = await requireAdminSession();

    if (!authorized) {
      return jsonError('Unauthorized', 401);
    }

    const supabase = createServerSupabaseServiceClient();

    if (!supabase) {
      return jsonError('Supabase is not configured.', 500);
    }

    const formData = await request.formData();
    const title = formData.get('title')?.toString().trim();
    const category = formData.get('category')?.toString().trim();
    const image = formData.get('image');

    if (!title || !category || !image || typeof image === 'string') {
      return jsonError('All fields are required.', 400);
    }

    if (!['ستائر', 'ركنات', 'كنب'].includes(category)) {
      return jsonError('Invalid category.', 400);
    }

    const fileExt = image.name?.split('.').pop() || 'jpg';
    const safeCategory = encodeURIComponent(category);
    const fileName = `${randomUUID()}.${fileExt}`;
    const filePath = `${safeCategory}/${fileName}`;

    const arrayBuffer = await image.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('works-images')
      .upload(filePath, fileBuffer, {
        contentType: image.type || 'image/jpeg',
        upsert: false,
      });

    if (uploadError) {
      return jsonError('فشل رفع الصورة إلى Storage.', 500, uploadError.message);
    }

    const { data: publicUrlData } = supabase.storage.from('works-images').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('works').insert([
      {
        title,
        category,
        image_url: publicUrlData.publicUrl,
        visible: true,
      },
    ]);

    if (insertError) {
      await supabase.storage.from('works-images').remove([filePath]);
      return jsonError('فشل حفظ بيانات العمل في قاعدة البيانات.', 500, insertError.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return jsonError('حدث خطأ أثناء الرفع.', 500, error instanceof Error ? error.message : 'Unknown error');
  }
}
