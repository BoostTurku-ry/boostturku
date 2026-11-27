-- Local development only (runs on `supabase start` / `supabase db reset`).
-- A test board member: sign in at http://localhost:3000/admin/login with this
-- address and open the link from the local mail viewer (http://localhost:54324).
insert into public.admins (email, name) values ('admin@boostturku.local', 'Local admin')
on conflict (email) do nothing;
