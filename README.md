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

## Update notes (feat/vistar-updates)

Built on top of `Kunal/feat`. Nothing from that branch was removed.

- **Brand:** "Vistar Cabs" throughout (already done on this branch; verified, no "Vista" text left).
- **Contact buttons:** WhatsApp bottom-left (green), Call bottom-right (orange), on every page. Owner number **8788373586** is now the default for both; the old test number was removed.
- **Autocomplete:** kept the Maharashtra village/taluka dataset. Main cities now rank first, so typing `N` shows Nashik first and `P` shows Pune first, in both From and To.
- **Mobile and design:** four icon trip tabs in one row, date and time side by side, smaller logo and header on phones, smaller desktop headline so the form sits higher, orange Call button.
- **Owner alerts:** `POST /api/inquiries` now also texts and WhatsApps the owner through Twilio (`backend/src/services/notify.ts`). Fill the six `OWNER_*` and `TWILIO_*` values in `backend/.env`. Until then visitors finish with the WhatsApp button, and the enquiry is still saved.
- **Images:** the six stock pictures were compressed from 14 MB to under 1 MB (WebP) and the logo was cropped. Any page can now use its own photo: drop a file named as listed in `frontend/public/images/README.md` (32 slots) and rebuild.
- **Security:** the built-in admin sign-in (`vistar-admin`) now only works when `ADMIN_DEV_PREVIEW=true` is set, which is in `.env.example` for local use only. On a live server set `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` and leave `ADMIN_DEV_PREVIEW` unset.
- **Dev badge:** the Next.js "N" development badge is turned off.

Not verified here: real delivery of Twilio messages, real iPhone and Android devices, and the Playwright suite in `frontend/tests` (not re-run).
