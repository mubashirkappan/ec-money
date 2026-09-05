# EC Money API

Backend for an owner-funded, shop-operated money-transfer service. Amounts are always paise (₹1 = 100).

## Structure (MVC-style)

- `src/controllers/` — request handling and business workflows
- `src/routes/` — URL-to-controller mapping and access middleware
- `src/db/` — database connection and migration
- `src/services/` — external provider adapters (the payout provider)
- `src/app.ts` — Express app and middleware registration
- `src/server.ts` — starts the application only

## Setup

1. Create a PostgreSQL database and run `npm install`.
2. Copy `.env.example` to `.env`; use fresh Razorpay credentials and a long random JWT secret.
3. Run `npm run migrate`, then `npm run dev`.

## Core flow

1. `POST /auth/register-owner`, then `/auth/login` to get a bearer token.
2. Owner creates a Razorpay funding order at `POST /funding/orders`. Configure Razorpay's webhook to `POST /webhooks/razorpay`; the owner wallet is credited only after a verified `payment.captured` webhook.
3. Owner creates shops with `POST /shops`, then gives them float using `POST /wallets/allocate`.
4. Shop logs in and calls `POST /payouts` with a unique `idempotencyKey`; the current adapter is intentionally a no-money mock. Replace `src/services/payoutProvider.ts` with a bank/RazorpayX adapter after regulatory onboarding.

Never expose Razorpay secrets to clients or commit `.env`. This is a ledger foundation, not a licensed remittance system: obtain the required RBI/payment-provider approval, KYC/AML controls, dispute handling, audit logs, encryption, and payout reconciliation before handling real customer funds.
