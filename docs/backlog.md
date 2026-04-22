# Feature Backlog

Organized by priority tier. Items move up as prerequisites clear.
Locked architectural decisions live in `decisions.md`, not here.

---

## Deployment Blockers

Items that should be resolved before the site is promoted or shared publicly.

---

## Pre-Launch (High Priority)

- **Favicon: Firefox shows white triangle** \u2014 no `favicon.ico` at root. Fix: generate a proper `.ico` file and place at `public/favicon.ico`, then add `<link rel="shortcut icon" href="/favicon.ico">` in layout. Tracked as task #1.

- **WhatsApp contact option** \u2014 the business actively uses WhatsApp now. Add a WhatsApp link (`https://wa.me/17816867189`) to QuickContact, footer contact block, and as a contact method option in QuoteDrawer. WhatsApp should appear alongside phone and email, not replace either.

- **Local business JSON-LD schema** \u2014 add `LocalBusiness` structured data to `app/clean/page.tsx` with name, address, phone, URL, geo coordinates, and areaServed. High ROI for Greater Boston local search results and Maps.

- **Logo reversed/white version** \u2014 the current `logo.jpg` has a white background, which only works on light nav states. For the dark (navy) nav state, either export a `logo-white.png` (white text, transparent bg) from a designer or apply a CSS `filter: brightness(0) invert(1)` as a temporary fix. Coordinate with designer or use Canva / remove.bg.

- **Social media stubs in footer** \u2014 no accounts exist yet, but Instagram and Facebook are likely first. Add icon links with placeholder `href="#"` in the footer so the structure is there when accounts launch. Update hrefs once accounts are created.

---

## Copy Work (ChatGPT Briefs Needed)

These require a chatgpt-prep pass before sending to ChatGPT for rewriting.

- **Hero copy refresh** \u2014 headline should convey "best of both worlds, any client type." Subhead needs improving. Bullet points: remove any numbered ordering, add: 24/7 virtual communication, tech/tool flexibility (clients can use their own systems), highly customized cleans and pricing, ability to scale with occupancy or activity. Keep to concise bullets.

- **STR and Property Manager accordion expansion** \u2014 add: virtual management with 24/7 communication, tech/data tracking (support for client apps like Thatch for schedules, invoicing, product usage), tiered cleaning (not just maintenance\u2014deep cleans built into the rotation), scale up and down with occupancy, maintenance and property ops help beyond cleaning, tracking of building rules and parking details, flexible pricing that reflects volume and scheduling flexibility.

- **Homes accordion expansion** \u2014 add: flexible scheduling, trusted long-term team (low turnover, nobody enters a home without significant time on the team), detailed care records per home, 24/7 communication with translation so language is never a barrier with cleaners.

- **Services section** \u2014 bring detail level in line with the accordion expansions above. Each service card should say something specific to how Brazusa executes it, not just what the service is.

- **Full site copy audit against brand-rules.md** \u2014 mechanism over promise, no banned phrases. Flagging any remaining generic language is its own ChatGPT pass after the section-level rewrites are done. The copy.txt blueprint is the prerequisite.

---

## Post-MVP

- **Google Places API for live reviews** \u2014 pull real star rating, review count, and up to 5 recent snippets via a Next.js route handler (server-side, API key never exposed). Requires a Google Cloud project with billing enabled ($200/month free tier covers ~40k Place Details calls). Replaces any manually maintained review content.

- **Greater Boston area photo** \u2014 a photo of the coverage area for the ServiceArea section. Charles to source.

- **Additional staff and family photos** \u2014 the current team/about image is in place. Add more real supporting photos later if they strengthen trust or section-level storytelling.

- **WeChat contact option** \u2014 add after WhatsApp is live and tested.

---

## Later

- **AI chatbot** \u2014 not needed for MVP. Less complex than initially assumed. Implement post-launch once core site is stable and operational.

- **Primo landing page** \u2014 Primo runs a construction business. Will get its own one-page app as a separate client under the Brazusa Services umbrella. Architecture already supports this via `lib/clients/`.

- **Ze Jr landing page** \u2014 Ze Jr runs a tiling and ceramics business. Same pattern as Primo.

- **Platform footer** \u2014 once Primo and/or Ze Jr pages exist, update the footer to reference the broader Brazusa Services platform and link to the sibling pages.

---

## Much Later

- **Per-client-type sub-pages** \u2014 fully tailored pages for STR, office, clinic, and property manager audiences (separate routes: `/clean/str`, `/clean/office`, etc.). Prerequisite: content depth per segment must justify the split. See decisions.md for the locked rationale on why this is deferred.

- **Domain relay routing** \u2014 separate domains (e.g., bostonofficeclean.com) pointed at targeted versions of the Brazusa cleaning page for segment-specific SEO and direct marketing. This is a marketing/routing layer on top of the existing architecture, not a codebase change. Single-page-per-business architecture is unchanged.

- **Brazusa platform hub page** \u2014 a `/` home that routes to all services (cleaning, construction, tiling). Design separately from the individual business pages.
