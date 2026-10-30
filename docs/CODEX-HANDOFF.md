# Vista Cabs — Phase 4 Codex Handoff

## Project boundary
The review copy is `work/vista-cabs`. The original source ZIP and separate laptop project were not modified. The supplied HTML reference was used only for blue/gold/pale-blue colors. GoCabish informs page hierarchy and destination discovery only; no logo, reviews, offers, copy, or unverified business claims were adopted.

## Work in this build
- Retained Vista's existing visual direction, branding, routes, enquiry behavior and no-payment lead-generation model.
- Expanded six city hubs with tailored trip ideas and visitor preparation sections.
- Added 11 regional destination guides for Thane, Navi Mumbai, South Mumbai, Lonavala, Bhimashankar, Ajanta, Ellora, Meherabad, Shani Shingnapur, Bhandardara and Shirdi.
- Connected guide pages to relevant city hubs, routes, airports and other destination pages; added metadata, FAQs, sitemap entries and selected homepage links.
- Retained seven Nashik local guides, four service pages, airport information, route pages and the Kumbh Mela information page.
- The inquiry backend validates four trip types and can store development submissions to JSONL or configured MongoDB. WhatsApp requires the visitor's explicit Send action.

## Business facts and open owner confirmations
Confirm official logo choice, domain, final client contact, supported service areas/routes, all airports, fleet, operating hours, pricing/quote language, pickup and waiting rules, event details, and privacy/retention. Current temporary phone/WhatsApp is an owner-supplied development contact only. Do not present it as client-approved. Confirm SEO URLs with the SEO executive. Destination venue access and hours can change; link to current official information as appropriate.

## Verification status
See `TEST-STATUS.md` for exact current build results and limitations. A passing source build does not prove live MongoDB, local API requests, WhatsApp sending or responsive visual quality. Those checks must be completed before launch. Admin/CMS remains deferred as previously agreed; no payment gateway, dispatch or tracking is present.

## Next steps
1. Install dependencies with `npm install`.
2. Run `npm run dev`, inspect desktop/tablet/mobile, check `/api/health`, and submit synthetic requests in all trip modes.
3. Verify local JSONL/Mongo persistence and WhatsApp handoff; use only synthetic test data.
4. Collect the owner confirmations above, then configure the production domain/API/Mongo/CORS and complete release QA.
5. Scope admin/CMS later as a separate phase.
