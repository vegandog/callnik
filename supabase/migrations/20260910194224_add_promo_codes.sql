CREATE TABLE promo_codes (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  code        TEXT        UNIQUE NOT NULL,
  source      TEXT        NOT NULL DEFAULT 'jinglephone',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  expires_at  TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  used_by     UUID        REFERENCES auth.users(id),
  used_at     TIMESTAMPTZ
);

CREATE INDEX ON promo_codes (code);
CREATE INDEX ON promo_codes (used_by);