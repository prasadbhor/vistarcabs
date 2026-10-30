# Vista Cabs — Phase Plan and Release Checklist

## Phase 1 — Brand, responsive design and enquiry flow
- Vista identity and supplied logo treatment; blue/gold/pale-blue color reference applied without copying reference-site branding.
- Responsive hero and enquiry form with One Way, Round Trip, Local Trip and Airport Trip modes.
- API validation, development JSONL fallback, MongoDB persistence path, WhatsApp handoff.
- Status: implementation present; responsive device review and live form/API verification still required.

## Phase 2 — City, route, airport and service foundation
- Homepage, six city hubs, intercity SEO routes, airport pages, four service pages, sitemap and metadata.
- Status: implementation present; SEO executive and owner must confirm coverage and claims.

## Phase 3 — Backend and launch readiness
- Express health/inquiry endpoints, Mongo integration, environment examples, data validation and safe development storage.
- Status: source implementation present; production DB, deployment CORS/API/domain, privacy retention, and end-to-end verification pending.
- Admin/CMS is intentionally deferred as the owner previously requested. Do not expose public content mutation endpoints.

## Phase 4 — Destination content depth
- Add city-specific trip planning and linked destination guides for key nearby locations.
- Make guides discoverable from home/city hubs, add unique page metadata/FAQs and include them in sitemap.
- Keep content original and useful; take only information-architecture inspiration from GoCabish. Verify venue details with current official sources and make no unconfirmed service promises.
- Status: implementation delivered in the review copy; rebuild and QA status recorded in `TEST-STATUS.md`.

## Release gate (all phases)
- [ ] Frontend production build and backend TypeScript build pass on the final extracted package.
- [ ] Run all four enquiry modes, conditional fields, validation, storage and WhatsApp handoff.
- [ ] Inspect 1280px desktop, 1032px tablet, 768–1024px widths, 375px mobile and large phone.
- [ ] Confirm logo, client contacts, domain, served locations, airport list, fleet, operating hours and truthful quote/service wording.
- [ ] Verify Kumbh event facts/timing via current official information.
- [ ] Configure production MongoDB, API URL/CORS, spam protection, privacy/retention, backups and monitoring.
- [ ] Approve every published SEO URL; check canonical metadata, internal links, sitemap and robots.
- [ ] Add only genuine authorized reviews if desired.
- [ ] Build admin/CMS only in a separately scoped future phase.
