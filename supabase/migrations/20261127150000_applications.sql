-- Application rounds (board, chair, programs) and the applications sent to them.
-- Same access model as the rest: the website writes with the secret key; only
-- admins (public.admins) can read or change anything through the API.

create table public.application_rounds (
  id uuid primary key default gen_random_uuid(),
  -- What the round is for. Each kind has a fixed public address: /apply/<kind>.
  kind text not null check (kind in ('board', 'chair', 'startup-journey', 'startup-marathon', 'omahomma', 'poc-grant')),
  title text not null check (char_length(title) between 3 and 120),
  intro text not null default '' check (char_length(intro) <= 4000),
  opens_at timestamptz not null,
  closes_at timestamptz not null,
  -- Master switch. A round accepts applications only when this is on AND now is between opens_at and closes_at.
  is_published boolean not null default false,
  -- [{ id, label, type: short|long|email|url|select|checkbox, required, options?, help?, public? }]
  questions jsonb not null default '[]'::jsonb check (jsonb_typeof(questions) = 'array'),
  -- Chair rounds: show consenting, approved candidates on /apply/chair/candidates.
  show_candidates boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (closes_at > opens_at)
);

create index application_rounds_kind_idx on public.application_rounds (kind, opens_at desc);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references public.application_rounds (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  -- { [questionId]: string | string[] | boolean }
  answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'accepted', 'declined')),
  board_notes text check (char_length(board_notes) <= 4000),
  -- Applicant agreed to appear on the public candidates page (chair rounds).
  publish_consent boolean not null default false,
  -- Board approved showing this applicant publicly. Requires publish_consent.
  is_public boolean not null default false check (not is_public or publish_consent),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_round_idx on public.applications (round_id, created_at desc);
create index applications_email_idx on public.applications (round_id, email);

comment on table public.applications is 'Deleted 12 months after their round closes.';

create trigger application_rounds_touch_updated_at
  before update on public.application_rounds
  for each row execute function public.touch_updated_at();

create trigger applications_touch_updated_at
  before update on public.applications
  for each row execute function public.touch_updated_at();

alter table public.application_rounds enable row level security;
alter table public.applications enable row level security;

create policy "Board can manage application rounds" on public.application_rounds
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Board can manage applications" on public.applications
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
