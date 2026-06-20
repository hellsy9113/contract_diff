create extension if not exists pgcrypto;

create table if not exists public.comparisons (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  original_file_name text not null,
  revised_file_name text not null,
  engine_version text not null default 'v3',
  status text not null default 'completed',
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.comparison_clauses (
  id uuid primary key default gen_random_uuid(),
  comparison_id uuid not null references public.comparisons(id) on delete cascade,
  clause_key text not null,
  clause_number text,
  heading text,
  status text not null,
  original_text text,
  revised_text text,
  diff_tokens jsonb not null default '[]'::jsonb,
  page_number_original integer,
  page_number_revised integer,
  order_index integer not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_comparisons_user_id
on public.comparisons(user_id);

create index if not exists idx_comparisons_created_at
on public.comparisons(created_at desc);

create index if not exists idx_comparison_clauses_comparison_id
on public.comparison_clauses(comparison_id);

create index if not exists idx_comparison_clauses_status
on public.comparison_clauses(status);

create index if not exists idx_comparison_clauses_order
on public.comparison_clauses(comparison_id, order_index);

alter table public.comparisons enable row level security;
alter table public.comparison_clauses enable row level security;

drop policy if exists "Users can view their own comparisons"
on public.comparisons;
create policy "Users can view their own comparisons"
on public.comparisons
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own comparisons"
on public.comparisons;
create policy "Users can insert their own comparisons"
on public.comparisons
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own comparisons"
on public.comparisons;
create policy "Users can update their own comparisons"
on public.comparisons
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own comparisons"
on public.comparisons;
create policy "Users can delete their own comparisons"
on public.comparisons
for delete
using (auth.uid() = user_id);

drop policy if exists "Users can view clauses for their own comparisons"
on public.comparison_clauses;
create policy "Users can view clauses for their own comparisons"
on public.comparison_clauses
for select
using (
  exists (
    select 1
    from public.comparisons c
    where c.id = comparison_clauses.comparison_id
      and c.user_id = auth.uid()
  )
);

drop policy if exists "Users can insert clauses for their own comparisons"
on public.comparison_clauses;
create policy "Users can insert clauses for their own comparisons"
on public.comparison_clauses
for insert
with check (
  exists (
    select 1
    from public.comparisons c
    where c.id = comparison_clauses.comparison_id
      and c.user_id = auth.uid()
  )
);

drop policy if exists "Users can delete clauses for their own comparisons"
on public.comparison_clauses;
create policy "Users can delete clauses for their own comparisons"
on public.comparison_clauses
for delete
using (
  exists (
    select 1
    from public.comparisons c
    where c.id = comparison_clauses.comparison_id
      and c.user_id = auth.uid()
  )
);
