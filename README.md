# Vista Cabs — Phase 1–4 Review Build

A Nashik-first lead-generation website built with Next.js, TypeScript, Express and MongoDB/Mongoose. Phase 4 expands the city and destination content while keeping the existing Vista design, brand and blue/gold palette. It is a cab enquiry site, not a booking marketplace: no payment gateway, dispatch, live tracking or live fare engine is included.

## Included

- Responsive Vista homepage, logo, trip enquiry form, and blue/gold/pale-blue theme.
- Four enquiry types: One Way, Round Trip, Local Trip and Airport Trip. Conditional details are validated by the API. After saving, the visitor can continue to WhatsApp and tap Send.
- Six city hubs: Nashik, Mumbai, Pune, Chhatrapati Sambhajinagar, Ahilyanagar and Shirdi.
- Destination guides: seven Nashik local guides plus 11 guides for Mumbai/Thane/Navi Mumbai, Pune region, Sambhajinagar region, Ahilyanagar region and Shirdi.
- Intercity route pages, airport information pages, four service pages and a Nashik Kumbh Mela information page.
- Express health and inquiry endpoints. Local development can save leads to an ignored JSONL file when MongoDB is absent; production requires MongoDB.
- SEO metadata, canonical URLs, sitemap and robots configuration.

## Run on Windows

Prerequisites: Node.js 20.9+ and npm. Extract the folder and run `npm install` from its root. The review copy contains `frontend/.env.local` with the temporary test number supplied by the owner; replace it before client or public use. Copy `backend/.env.example` to `backend/.env`. MongoDB is optional for local development, required for production persistence.

Run `npm run dev`, then open `http://localhost:3000`; API health is at `http://localhost:5000/api/health`. Without MongoDB, local leads are written to `backend/data/inquiries.jsonl`; keep that personal data private. Production must set `MONGODB_URI`, `NEXT_PUBLIC_API_URL`, CORS origins, approved contact details and site domain.

Commands: `npm run dev:web`, `npm run dev:api`, `npm run build`, `npm run build:api`. `npm run check` builds both. On the extracted Windows copy the frontend build may use `NEXT_DIST_DIR=.codex-next-build` if `.next` has restricted permissions.

## Project map

- `frontend/src/app/page.tsx`: homepage and featured destinations.
- `frontend/src/app/[slug]/page.tsx`: route and service templates.
- `frontend/src/app/cities/[city]/page.tsx`: city hubs.
- `frontend/src/app/cities/[city]/[place]/page.tsx`: destination guides.
- `frontend/src/app/cities/nashik/[place]/page.tsx`: Nashik local guides.
- `frontend/src/lib/site.ts`: city, destination and route content.
- `frontend/src/components/InquiryForm.tsx`: enquiry/API/WhatsApp handoff.
- `backend/src/routes/inquiries.ts`: validation and persistence.
- `docs/`: handoff, phased plan, research and QA status.

## Important scope and confirmations

The attached homepage HTML informed colors only. GoCabish informs information hierarchy only; its logo, reviews, offers and unverified business claims were not copied. Owner must confirm served locations, airports, fares/quote wording, fleet, hours, final contact, domain, logo, Kumbh details and privacy/retention before public launch. Keep destination access/hours subject to official current venue information. Genuine approved reviews may be added later.

Admin/CMS was explicitly deferred. No admin login or content mutation API is included. No client-approved live contact, production database or purchased domain has been supplied. The temporary test number is a development setting, not a confirmed client contact.
"# vistarcabs" 
