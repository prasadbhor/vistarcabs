# Vistar Cabs — Codex project handoff

**Handoff purpose:** continue the current, intentionally incomplete project in a new Codex chat. This is a source and development handoff, not a production launch approval.

## Project location and identity

- Source working copy: the extracted project in the Codex workspace.
- Project/website name: **Vistar Cabs**. The supplied logo reads VISTAR CABS and is stored as `frontend/public/brand/vistar-cabs-logo.png`.
- The owner reconfirmed the public brand name: use **Vistar Cabs** consistently. Old image filenames and the development admin identifier were renamed so they no longer use alternate brand spellings.
- The separate laptop project was not edited.
- Nashik is the central operating city. Main city pages currently cover Nashik, Mumbai, Pune, Chhatrapati Sambhajinagar, Ahilyanagar and Shirdi.
- Owner-designated booking websites informed the page hierarchy and enquiry experience. Do not copy their branding, assets, reviews, prices, offers or unverified claims.

## What is in the source ZIP

The ZIP contains the frontend, Express/TypeScript API, image and location assets, package manifests/lockfiles, `.env.example` files, README, e2e test source and this handoff. It deliberately excludes `node_modules`, browser downloads, `.next`/build outputs, local `.env`/`.env.local` files, local enquiry data, and npm caches. Run `npm install` in both `frontend` and `backend` after extracting.

## Work completed in this copy

- Updated user-facing brand text and image alt text to **Vistar Cabs**, renamed the logo asset path, six scenic image files, image references, API service name, npm package names, admin cookie and development sign-in identifier.
- Kept the Nashik-first homepage and inquiry form, with One Way, Round Trip, Local Trip and Airport Trip controls; From/To autocomplete, pickup date/time, conditional fields, callback contact details and WhatsApp handoff.
- Kept the Maharashtra location dataset and suggestion UI, including Dhule.
- Added/expanded home, Nashik overview, six city pages, airport pages, destination guides, service pages, route pages, FAQ/footer navigation, and the Nashik–Trimbakeshwar Simhastha guide.
- Added About Nashik and ensured About Nashik/About Us are included in the sitemap.
- Added four horizontally scrollable feedback preview cards with previous/next controls. They are clearly labelled sample content with no customer identities or star ratings. They appear only in development; production shows an approval notice until genuine customer-approved feedback is supplied.
- Added the enquiry admin UI and API endpoints for development login, list/filter, status updates and logout. Local development can use JSONL storage; production needs MongoDB and unique admin credentials/session secret.
- Added project README and `.gitignore` guidance for local setup and generated files.

## Screenshot direction and responsive requirements

- The owner-provided booking-site screenshots in the originating conversation are layout references only; the screenshot files are not embedded in this ZIP. Preserve Vistar Cabs branding and its supplied logo.
- Desktop: keep the scenic hero and enquiry panel compact and horizontal, with the form visually secondary to the headline and image.
- Tablet: center and balance the form with readable field widths and sensible grouping.
- Mobile: put the enquiry flow first, stack inputs cleanly, keep trip-type tabs usable, and make the primary Search Cabs action easy to reach. Do not let sticky/floating contact controls cover form actions.
- Expected audit widths: 1440 px desktop, 1024 px small laptop/tablet landscape, 768 px tablet portrait, 390/360 px phone, and 344 px narrow fold. The overflow test covers these widths; spacing, crop, overlap and visual hierarchy still need screenshot review.
- Keep contact shortcuts conditional on configured owner phone/WhatsApp values. Do not show empty links or invented contact/social profiles.

## Verification already completed

- Frontend ESLint: `npm run lint` passed.
- Frontend TypeScript: `npx tsc --noEmit --incremental false` passed (including the Playwright config and tests).
- Frontend production build: `npm run build` passed with one Next build worker and an isolated output directory; Next generated 43 static/dynamic route entries/templates.
- Backend TypeScript build: `npm run build` passed.
- Playwright checks: all five test cases reported `ok` before the final image/admin naming cleanup when the test-managed server started and Chromium used the working-copy browser directory. The runner did not return a clean final process status before interruption, so treat those assertions as passed but the runner exit as incomplete. After the final naming cleanup, the production build and static image-path audit passed, but the browser suite could not be rerun cleanly here; a separate-server attempt was blocked by this environment's browser network policy.
- Earlier live development smoke crawl: all 56 URLs then present in the sitemap returned HTTP 200. This was before adding `/about-us` and `/about-nashik`; the current sitemap crawl remains unverified because local-shell HTTP access was blocked in this run.
- Earlier API smoke check: health reported `local-development-file`; development login, session and empty enquiry list succeeded. No test enquiry was saved.

## Checks still unfinished — continue these first

1. Get a clean Playwright process exit for `frontend/tests/e2e/site.spec.ts`. The five individual checks reported `ok`: responsive overflow at 1440, 1024, 768, 390, 360 and 344 px; conditional trip fields; Dhule autocomplete; sample-review slider controls; mocked WhatsApp enquiry handoff. The runner did not finish with a clean summary/exit in this environment.
2. Re-run the current complete sitemap HTTP crawl; the earlier 56-route result predates the two About sitemap entries. Local-shell HTTP access was blocked in this run, so use a permitted local browser/host environment.
3. Do screenshot-based visual checks at desktop, tablet, standard phone and narrow fold widths. The viewport test checked overflow, not screenshot appearance, spacing, image cropping or floating-control overlap.
4. Exercise location suggestion selection and date/time validation; verify a successful live API enquiry only in a disposable/local environment and remove any test lead afterwards.
5. Verify all static image paths, metadata, canonical URLs, internal links and robots/sitemap output after extraction and clean install.
6. Re-run frontend lint, TypeScript, frontend production build and backend build after any continued edits.

## Owner and SEO inputs still required

- Approved customer reviews and permission for every name, photo, quote and rating. Keep the current preview-only samples labelled or remove them; never publish them as real.
- Final phone and WhatsApp number, business email, and actual Instagram/Facebook/YouTube/LinkedIn profile URLs. The test callback number is kept only in local `.env.local`; it is not included in the ZIP.
- Confirmed legal business name/spelling, operating hours, fleet/capacity, service areas, inclusions/exclusions, availability and all public service claims.
- Final list of airports and preferred display names/codes, including which airport connections the operator really serves.
- SEO executive's final route/page list, keyword priorities, canonical URL policy and approved Trimbakeshwar URL.
- Owner-approved privacy, cancellation, refund and terms wording before publishing those policies.
- Production MongoDB URI and strong unique `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` configured privately on the server. Never commit these values or include local `.env` files in a handoff ZIP.

## Kumbh Mela content note

The page labels its event schedule as taken from the authority's June 2026 plan and subject to revision. It separates the listed 24 July 2028 Trimbakeshwar and 29 July 2028 Nashik closing dates. Recheck the official authority plan/notices before publishing or changing event dates, access details, transport arrangements or traffic claims.

## Start locally after extracting

From two terminals:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. If running `npm run test:e2e`, run `npx playwright install chromium` once, then run the suite; it starts a separate test server. Development-only admin sign-in is shown on `/admin`. Configure owner details in local env files; those local files are intentionally excluded from the ZIP.

## Reference/source links

- Official Nashik Kumbh Mela Plan: https://divcomnashik.maharashtra.gov.in/kumbh-mela-plan/
- Nashik–Trimbakeshwar Kumbh Mela Authority: https://divcomnashik.maharashtra.gov.in/en/about-nashik-trimbakeshwar-authority/
