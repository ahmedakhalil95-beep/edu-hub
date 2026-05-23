create table if not exists public.student_attempts (
  id uuid primary key default gen_random_uuid(),
  question_type text not null,
  generation_seed text not null,
  question_hash text not null,
  student_answer numeric not null,
  expected_answer numeric not null,
  is_correct boolean not null,
  difference numeric not null,
  submitted_at timestamptz not null,
  created_at timestamptz default now()
);

create index if not exists student_attempts_question_type_idx
  on public.student_attempts (question_type);

create index if not exists student_attempts_question_hash_idx
  on public.student_attempts (question_hash);

create index if not exists student_attempts_submitted_at_idx
  on public.student_attempts (submitted_at);

alter table public.student_attempts enable row level security;

create policy "Allow development select student attempts"
  on public.student_attempts
  for select
  using (true);

create policy "Allow development insert student attempts"
  on public.student_attempts
  for insert
  with check (true);
