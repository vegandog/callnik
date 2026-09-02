-- Run this in Supabase Dashboard → SQL Editor
-- https://supabase.com/dashboard/project/tiolldiylgostttnlaim/editor

ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'monthly',
  ADD COLUMN IF NOT EXISTS cardcom_token TEXT,
  ADD COLUMN IF NOT EXISTS card_month TEXT,
  ADD COLUMN IF NOT EXISTS card_year TEXT,
  ADD COLUMN IF NOT EXISTS token_expiry DATE,
  ADD COLUMN IF NOT EXISTS next_billing_date DATE,
  ADD COLUMN IF NOT EXISTS billing_failures INT DEFAULT 0;
