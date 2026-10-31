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

## Update notes (feat/feet2)

Built on `feat/vistar-updates` (which is built on `Kunal/feat`).

- **Enquiry form:** the optional Trip notes field was removed everywhere (form, saved data, WhatsApp message, alerts). The button now reads **Send Enquiry**. On a phone the whole form, including the button, fits on the first screen.
- **Owner WhatsApp 8767613575:** new enquiries are sent to `OWNER_WHATSAPP_TO` (set to +918767613575 in `backend/.env.example`) through Twilio. Fill in the `TWILIO_*` values in `backend/.env` to switch this on. Until then the visitor sees a **Continue on WhatsApp** button that opens a message prefilled to 8767613575, and the enquiry is still saved.
- **Navigation:** Home, About Us, Contact Us, Blogs and Services. Services lists Corporate Cabs (`/corporate-cabs`), Outstation Cabs, Airport Taxi and Local Cabs. The old `/corporate-cab-service` address redirects to `/corporate-cabs`.
- **Homepage:** hero form, then the Kumbh Mela banner immediately after it, then services, the corporate mobility section, cities, airports, routes, **Our Valuable Customer Feedback** (sliding carousel), FAQ and footer.
- **Kumbh Mela page (`/kumbh-mela-nashik`):** restructured like the reference (guide, timetable, local transport, safety, how to reach, how to enquire, FAQ). It has no fare table because no Vistar Cabs rates were supplied. Dates were cross-checked against news reports of the Maharashtra government announcement.
- **Corporate Cabs (`/corporate-cabs`):** hero card, use cases, how it works, FAQ, and the **Get Started** pop-up form (contact person, work email, number, city, requirements). It is saved and sent to the owner like an enquiry. Opening `/corporate-cabs#corporate-enquiry` opens the form directly.
- **About Us and Contact Us:** new pages following the reference structure. Contact shows the three phone numbers, info@vistarcabs.com, the Nashik Road address with a directions link, and a message form (saved and sent to the owner).
- **Blogs (`/blogs`):** five original articles in `frontend/src/lib/blogs.ts`. Edit or add posts there.
- **Customer feedback:** real Google reviews from the owner, in `frontend/src/lib/reviews.ts`. No ratings were invented. Only the overall 5.0 from 41 Google reviews is shown, because per-review star ratings were not supplied.
- **FAQ:** `frontend/src/lib/faqs.ts`, adapted to how Vistar Cabs works (enquiry first, team confirms fare, no online payment). Edit the answers if policies differ. There is also an `/faq` page.
- **Contact buttons and social:** real WhatsApp icon bottom-left, Call button bottom-right (calls 8767613575). Instagram links to instagram.com/vistar.tours. LinkedIn appears automatically once its address is put in `NEXT_PUBLIC_LINKEDIN_URL`.
- **Spam protection:** the corporate and contact forms have a hidden field that bots fill in; those submissions are dropped silently.

Not included: Terms, Privacy, Cancellation and Refund pages (the owner must supply the policy wording), an admin view for corporate and contact messages (they are stored in `backend/data/leads.jsonl` in development, or in MongoDB), and real photos. See `frontend/public/images/README.md` for photo names.
