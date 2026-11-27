-- Boost Turku website: forms and admin.
-- Run once in the Supabase SQL editor (or with `supabase db push`).
--
-- Access model
-- - The public website never talks to the database directly. Form submissions are
--   inserted by server code using the secret key, which bypasses row level security.
-- - Board members sign in to /admin. Every table has RLS enabled, and only emails
--   listed in public.admins can read or change anything.

-- ---------------------------------------------------------------------------
-- Board access list
-- ---------------------------------------------------------------------------
create table public.admins (
  email text primary key check (email = lower(email) and position('@' in email) > 1),
  name text,
  added_at timestamptz not null default now()
);

comment on table public.admins is 'Emails allowed to sign in to /admin (the board).';

-- True when the signed-in user's email is on the access list.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Member register (required by the Associations Act)
-- ---------------------------------------------------------------------------
create table public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email = lower(email) and char_length(email) <= 254),
  school text not null check (char_length(school) <= 120),
  interests text[] not null default '{}',
  consent_at timestamptz not null default now(),
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  notes text check (char_length(notes) <= 2000),
  updated_at timestamptz not null default now()
);

create unique index members_email_key on public.members (email);
create index members_joined_at_idx on public.members (joined_at desc);

comment on table public.members is 'Boost Turku ry member register. Ex-members are deleted 12 months after left_at.';

-- ---------------------------------------------------------------------------
-- Contact form messages
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  topic text not null check (char_length(topic) <= 120),
  message text not null check (char_length(message) between 10 and 5000),
  status text not null default 'new' check (status in ('new', 'handled')),
  created_at timestamptz not null default now(),
  handled_at timestamptz
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index contact_messages_email_created_idx on public.contact_messages (email, created_at desc);

comment on table public.contact_messages is 'Contact form messages. Deleted 12 months after they arrive.';

-- ---------------------------------------------------------------------------
-- Keep updated_at current
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger members_touch_updated_at
  before update on public.members
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security: board only
-- ---------------------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.members enable row level security;
alter table public.contact_messages enable row level security;

create policy "Board can manage the access list" on public.admins
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Board can manage members" on public.members
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Board can manage messages" on public.contact_messages
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- First board member: replace the email, then run this line once.
-- After that, add the rest of the board from /admin/access.
-- ---------------------------------------------------------------------------
-- insert into public.admins (email, name) values ('you@example.com', 'Your Name');
