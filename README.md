# Vistar Cabs website

This folder contains the Vistar Cabs website and enquiry API. Nashik is the central city page; city, airport, destination and intercity route pages link back into that hub. The site uses the owner's booking-site references for broad layout inspiration while retaining Vistar Cabs branding and only its own approved facts.

## Run locally

Use two terminals from this folder.

**API** (Terminal 1):

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

In development, the API stores enquiries in `backend/data/inquiries.jsonl` unless `MONGODB_URI` is configured. The local admin dashboard is `/admin`; development sign-in is shown on that screen. Do not use development credentials or the development session secret in production.

**Website** (Terminal 2):

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Contact buttons appear only when a phone or WhatsApp number is configured. Add approved social profile URLs in `frontend/.env.local` when available. Never publish the sample email or demo social IDs.

## Review section

The four carousel cards are illustrative layout samples shown only in development. Each is labelled as sample content, with no rating or real customer identity. Production displays an approval notice until genuine reviews and permission to publish are supplied. Replace the samples with customer-approved text before launch; do not present them as genuine reviews.

## Checks

From `frontend`, run `npx eslint src`, `npx tsc --noEmit --incremental false`, and `npm run build`. From `backend`, run `npm run build`. Frontend and API run as separate processes. Production requires owner-approved contact details, database configuration, and unique `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` values in the backend environment.

The handoff includes a browser suite. Install its browser once with `npx playwright install chromium`, then use `npm run test:e2e`; it starts its own test server on port 52321 and mocks the enquiry API during the WhatsApp handoff test. The responsive viewport test checks 1440, 1024, 768, 390, 360 and 344 pixels.
