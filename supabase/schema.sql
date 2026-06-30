create extension if not exists pgcrypto;

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('ستائر', 'ركنات', 'كنب')),
  image_url text not null,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  viewed_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('works-images', 'works-images', true)
on conflict (id) do nothing;

create policy if not exists "Public read access for works images"
on storage.objects for select
using (bucket_id = 'works-images');

create policy if not exists "Authenticated users can upload works images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'works-images');

create policy if not exists "Authenticated users can update works images"
on storage.objects for update
to authenticated
using (bucket_id = 'works-images')
with check (bucket_id = 'works-images');

create policy if not exists "Authenticated users can delete works images"
on storage.objects for delete
to authenticated
using (bucket_id = 'works-images');
