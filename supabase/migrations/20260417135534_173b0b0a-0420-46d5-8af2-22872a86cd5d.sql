insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'apk-uploads',
  'apk-uploads',
  false,
  104857600,
  array['application/vnd.android.package-archive', 'application/octet-stream', 'application/zip']
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Anon can upload APK files"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'apk-uploads');

create policy "Anon can read APK files"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'apk-uploads');

create policy "Anon can delete APK files"
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'apk-uploads');