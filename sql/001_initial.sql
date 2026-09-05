CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE user_role AS ENUM ('OWNER', 'SHOP');
CREATE TYPE ledger_type AS ENUM ('OWNER_FUNDING', 'SHOP_ALLOCATION', 'PAYOUT_DEBIT', 'PAYOUT_REVERSAL');
CREATE TYPE payout_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');
CREATE TABLE IF NOT EXISTS users (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL, role user_role NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS wallets (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID UNIQUE NOT NULL REFERENCES users(id), balance_paise BIGINT NOT NULL DEFAULT 0 CHECK (balance_paise >= 0), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ledger_entries (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), wallet_id UUID NOT NULL REFERENCES wallets(id), type ledger_type NOT NULL,
 amount_paise BIGINT NOT NULL CHECK (amount_paise <> 0), reference TEXT UNIQUE NOT NULL, note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS funding_orders (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), razorpay_order_id TEXT UNIQUE NOT NULL, owner_id UUID NOT NULL REFERENCES users(id), amount_paise BIGINT NOT NULL, status TEXT NOT NULL DEFAULT 'CREATED', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS payouts (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), shop_id UUID NOT NULL REFERENCES users(id), amount_paise BIGINT NOT NULL, customer_name TEXT NOT NULL, account_number TEXT NOT NULL, ifsc TEXT NOT NULL, idempotency_key TEXT NOT NULL, provider_reference TEXT, status payout_status NOT NULL DEFAULT 'PENDING', failure_reason TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(shop_id, idempotency_key)
);
