-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

-- 1. Songs table -----------------------------------------------------------
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  audio_url text not null,
  artwork_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.songs enable row level security;

-- Anyone (including anonymous visitors) can read the song list.
create policy "Public can read songs"
  on public.songs for select
  to anon, authenticated
  using (true);

-- Only a logged-in admin (any authenticated Supabase user) can write.
-- Because this app only ever creates ONE admin account, "authenticated" == admin.
create policy "Admin can insert songs"
  on public.songs for insert
  to authenticated
  with check (true);

create policy "Admin can update songs"
  on public.songs for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin can delete songs"
  on public.songs for delete
  to authenticated
  using (true);

-- 2. Storage buckets ---------------------------------------------------------
-- Public-read buckets: anyone can stream/view files by URL, but only the
-- authenticated admin can upload/replace/delete them.
insert into storage.buckets (id, name, public)
values ('audio', 'audio', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('artwork', 'artwork', true)
on conflict (id) do nothing;

create policy "Public can read audio files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'audio');

create policy "Admin can upload audio files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'audio');

create policy "Admin can update audio files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'audio');

create policy "Admin can delete audio files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'audio');

create policy "Public can read artwork files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'artwork');

create policy "Admin can upload artwork files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'artwork');

create policy "Admin can update artwork files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'artwork');

create policy "Admin can delete artwork files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'artwork');

-- 3. Create your one admin account -------------------------------------------
-- Do NOT do this in SQL. Instead, in the Supabase dashboard go to
-- Authentication -> Users -> Add user, and create yourself an account with
-- an email + password. That is the only account that will ever be able to
-- log in to /admin, since the app never exposes a public sign-up form.
