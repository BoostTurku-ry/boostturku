-- Volunteers can apply too: allow a "volunteer" application round.
alter table public.application_rounds drop constraint application_rounds_kind_check;
alter table public.application_rounds add constraint application_rounds_kind_check
  check (kind in ('board', 'chair', 'volunteer', 'startup-journey', 'startup-marathon', 'omahomma', 'poc-grant'));
