create table billing_history (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers(id) not null,
  amount decimal(10,2) not null,
  created_at timestamptz default now(),
  cardcom_transaction_id bigint,
  cardcom_document_number int,
  document_url text,
  plan text,
  description text
);

create index billing_history_customer_id_idx on billing_history(customer_id);
create index billing_history_created_at_idx on billing_history(created_at desc);

alter table billing_history enable row level security;

create policy "users_own_billing" on billing_history
  for select using (
    customer_id in (
      select customer_id from users where id = auth.uid()
    )
  );
