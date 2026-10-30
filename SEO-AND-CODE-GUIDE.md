# Vista Cabs — SEO and Code Guide (Phases 1–4)

## Page inventory and content

The site has six city hubs, seven Nashik local destination guides and 11 additional destination guides. It also has route, airport, service and Kumbh Mela pages. Phase 4 adds city-specific trip planning, linked destination cards, local guide pages, FAQs and internal route/airport links. Destination content is original and informational; recheck venue access and current rules with official sources before travel.

`src/lib/site.ts` is the data source for cities, routes, city-specific content and `destinationGuides`. City pages use `/cities/[city]`; new regional guide pages use `/cities/[city]/[place]`; Nashik local guides retain `/cities/nashik/[place]`. `src/app/sitemap.ts` should include every approved published URL. GoCabish was used for hierarchy inspiration, not copied text or claims. Research source URLs are documented in `docs/CITY-AIRPORT-RESEARCH.md`.

## SEO code map

- `src/app/layout.tsx`: title template, metadata base, Open Graph and default robots.
- `src/app/[slug]/page.tsx`: data-driven route/service pages and metadata.
- `src/app/cities/[city]/page.tsx`: city hubs.
- `src/app/cities/[city]/[place]/page.tsx`: regional destination guides.
- `src/lib/site.ts`: source data for hubs, routes and guides.
- `src/app/sitemap.ts` and `src/app/robots.ts`: crawl configuration.
- `src/app/page.tsx`: homepage sections and featured destination links.

SEO executive search volume figures are supplied-report claims, not independently verified and not ranking guarantees. Avoid keyword stuffing. Only publish locations Vista confirms it serves and retain distinct helpful content per page.

## Inquiry backend

`frontend/src/components/InquiryForm.tsx` submits to `POST /api/inquiries`, which validates conditional trip fields. Development can persist to ignored `backend/data/inquiries.jsonl` without MongoDB; MongoDB is used when configured. Production without DB connectivity fails rather than reporting a saved lead. A successful visitor flow offers a WhatsApp link; the visitor must tap Send. Test actual storage and WhatsApp before launch.

## Not included / owner decisions

Admin/CMS is deferred. Also not included: payment, booking marketplace, dispatch, driver accounts, live tracking, fare calculation, customer accounts. Confirm domain, contacts, service coverage, airport list, claims, privacy/retention, official event details and deployment configuration before launch.
