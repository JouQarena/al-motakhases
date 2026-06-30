import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { createServerSupabaseServiceClient } from '@/lib/supabase';
import { requireAdminSession } from '@/lib/adminAuth';

function jsonError(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

function getStoragePathFromUrl(imageUrl) {
  if (!imageUrl) return null;
  const marker = '/storage/v1/object/public/works-images/';
  const index = imageUrl.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(imageUrl.slice(index + marker.length));
}

export async function GET() {
  const authorized = await requireAdminSession();

  if (!authorized) {
    return jsonError('Unauthorized', 401);
  }

  const supabase = createServerSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json({ works: [] });
  }

  const { data, error } = await supabase.from('works').select('*').order('created_at', { ascending: false });

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({ works: data || [] });
}

export async function PUT(request) {
  const authorized = await requireAdminSession();

  if (!authorized) {
    return jsonError('Unauthorized', 401);
  }

  const supabase = createServerSupabaseServiceClient();

  if (!supabase) {
    return jsonError('Supabase is not configured.', 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON payload.', 400);
  }

  const { id, visible, title, category, replaceImage } = body;

  if (!id) {
    return jsonError('Work id is required.', 400);
  }

  if (typeof visible === 'boolean' && !title && !category && !replaceImage) {
    const { error } = await supabase.from('works').update({ visible }).eq('id', id);

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json({ success: true, mode: 'visibility' });
  }

  const { data: existingWork, error: fetchError } = await supabase
    .from('works')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    return jsonError(fetchError.message, 500);
  }

  const updates = {};

  if (title) updates.title = title;
  if (category) updates.category = category;

  if (replaceImage && replaceImage.base64 && replaceImage.contentType) {
    const oldPath = getStoragePathFromUrl(existingWork.image_url);
    const extension = replaceImage.contentType.split('/')[1] || 'jpg';
    const categoryFolderMap = {
      'ستائر': 'curtains',
      'ركنات': 'corners',
      'كنب': 'sofas',
    };
    const targetCategory = category || existingWork.category;
    const newPath = `${categoryFolderMap[targetCategory] || 'misc'}/${randomUUID()}.${extension}`;
    const base64Data = replaceImage.base64.includes(',')
      ? replaceImage.base64.split(',')[1]
      : replaceImage.base64;
    const buffer = Buffer.from(base64Data, 'base64');

    const { error: uploadError } = await supabase.storage.from('works-images').upload(newPath, buffer, {
      contentType: replaceImage.contentType,
      upsert: false,
    });

    if (uploadError) {
      return jsonError(uploadError.message, 500);
    }

    const { data: publicUrlData } = supabase.storage.from('works-images').getPublicUrl(newPath);
    updates.image_url = publicUrlData.publicUrl;

    if (oldPath) {
      await supabase.storage.from('works-images').remove([oldPath]);
    }
  }

  if (Object.keys(updates).length === 0) {
    return jsonError('No fields to update.', 400);
  }

  const { error: updateError } = await supabase.from('works').update(updates).eq('id', id);

  if (updateError) {
    return jsonError(updateError.message, 500);
  }

  return NextResponse.json({ success: true, mode: 'edit' });
}

export async function DELETE(request) {
  const authorized = await requireAdminSession();

  if (!authorized) {
    return jsonError('Unauthorized', 401);
  }

  const supabase = createServerSupabaseServiceClient();

  if (!supabase) {
    return jsonError('Supabase is not configured.', 500);
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return jsonError('Work id is required.', 400);
  }

  const { data: work, error: fetchError } = await supabase
    .from('works')
    .select('image_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    return jsonError(fetchError.message, 500);
  }

  const path = getStoragePathFromUrl(work?.image_url);
  if (path) {
    await supabase.storage.from('works-images').remove([path]);
  }

  const { error } = await supabase.from('works').delete().eq('id', id);

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({ success: true });
}
