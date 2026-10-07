create table if not exists facebook_leads (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  name text,
  email text,
  called_at timestamptz not null default now(),
  call_count integer not null default 1
);
