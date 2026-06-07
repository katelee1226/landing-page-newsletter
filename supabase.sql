create extension if not exists pgcrypto;

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  role text not null,
  interests text[] not null default '{}',
  countries text[] not null default '{}',
  consent_privacy boolean not null default false,
  consent_marketing boolean not null default false,
  consent_event boolean not null default false,
  source text not null default 'landing_page',
  resend_contact_id text,
  metadata jsonb not null default '{}'::jsonb,
  constraint subscribers_email_format check (
    email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  constraint subscribers_required_consents check (
    consent_privacy = true and consent_marketing = true
  ),
  constraint subscribers_interests_required check (
    array_length(interests, 1) >= 1
  )
);

create unique index if not exists subscribers_email_unique
  on public.subscribers (lower(email));

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

create index if not exists subscribers_interests_idx
  on public.subscribers using gin (interests);

create index if not exists subscribers_countries_idx
  on public.subscribers using gin (countries);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscribers_set_updated_at on public.subscribers;

create trigger subscribers_set_updated_at
before update on public.subscribers
for each row
execute function public.set_updated_at();

alter table public.subscribers enable row level security;

grant insert on public.subscribers to anon, authenticated;

drop policy if exists "Allow public newsletter signups" on public.subscribers;

create policy "Allow public newsletter signups"
on public.subscribers
for insert
to anon, authenticated
with check (
  consent_privacy = true
  and consent_marketing = true
  and array_length(interests, 1) >= 1
);
