# Brazusa Cleaning — Website

A Next.js website for Brazusa Cleaning, a professional cleaning service based in Greater Boston since 1994. Includes a full form backend: quote requests and newsletter signups are validated, emailed via Resend, saved to Airtable, and saved to Google Sheets.

**Live contact info:**
- Phone / Text: [781-686-7189](tel:7816867189)
- Email: [info@brazusa.com](mailto:info@brazusa.com)
- [Google Business Profile](https://maps.app.goo.gl/gvJ4MmpuShUocGB3A)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/clean](http://localhost:3000/clean).

---

## Screenshots

To add screenshots, take them at `localhost:3000/clean` and save them to `screenshots/`. Suggested captures:

### Hero section (scroll: 0px)
> 82vh navy hero with headline, differentiator 2×2 grid, "Get a Free Quote" CTA, and phone CTA.

<!-- Replace this comment with: ![Hero](screenshots/01-hero.png) -->

### Client accordion (scroll: ~720px)
> Off-white section with "What kind of space?" accordion, two-column layout (STR + Offices | Property + Homes), and "We clean it all!" catch-all row.

<!-- Replace this comment with: ![Client Accordion](screenshots/02-client-accordion.png) -->

### Services section (scroll: ~1400px)
> Dark navy grid of six cleaning services. border-overflow trick makes the grid clean at all breakpoints.

<!-- Replace this comment with: ![Services](screenshots/03-services.png) -->

### Pricing section
> Pricing table with two collapsible subsections: "Custom & partial cleaning options" and "Ways to lower your price."

<!-- Replace this comment with: ![Pricing](screenshots/04-pricing.png) -->

### Contact section
> Full-width row of phone, email, and Google Business card links. No form — direct contact only.

<!-- Replace this comment with: ![Quick Contact](screenshots/05-contact.png) -->

### Mobile — hamburger open
> Hamburger menu expanded: "Clean my…" client types, nav links, and "Free Quote" button.

<!-- Replace this comment with: ![Mobile Nav](screenshots/06-mobile-nav.png) -->

### Mobile — sticky CTA bar
> Fixed bottom bar with "Get a Free Quote" (opens drawer) and "Call Now" (tel link).

<!-- Replace this comment with: ![Mobile CTA Bar](screenshots/07-mobile-cta-bar.png) -->

### Quote drawer — base form
> Bottom-sheet drawer: name, contact info, phone/SMS/email preference, "Add details" expandable, space type, notes, file upload, outcome options.

<!-- Replace this comment with: ![Quote Drawer Base](screenshots/08-quote-drawer-base.png) -->

### Quote drawer — details expanded
> Same drawer with the "Add details" card open: rooms, bathrooms, cleaning level, frequency, focus areas.

<!-- Replace this comment with: ![Quote Drawer Detailed](screenshots/09-quote-drawer-detailed.png) -->

---

## Page Structure

| Section | Component | Background | Notes |
|---|---|---|---|
| Sticky nav | `StickyNav` | Blurred navy / off-white (on scroll) | Always visible; hamburger on mobile; "Clean my…" dropdown (desktop); "Contact" link |
| Hero | `Hero` | `grain bg-navy` | 82vh; headline, 2×2 differentiators, subtitle, CTAs; edge-to-edge 4:3 image on mobile |
| Trust strip | `TrustStrip` | `bg-white` | Marquee; 6 badges deduplicated in source, doubled in JSX |
| Client accordion | `ClientAccordion` | `bg-off-white` | 2-col desktop, 1-col mobile; "We clean it all!" dashed catch-all row |
| Services | `Services` | `grain bg-navy` | 6-service grid; overflow-hidden border pattern; CTA at bottom |
| Pricing | `Pricing` | `bg-white` | Range table; "Custom & partial" + "Ways to lower your price" collapsibles; CTA at bottom |
| Testimonials | `Testimonials` | `bg-off-white` | 3 case study cards |
| Service area | `ServiceArea` | `bg-white` | Greater Boston coverage |
| About | `About` | `bg-off-white` | Family story; team image (desktop only) |
| Contact | `QuickContact` | `bg-white` | Phone, email, Google Business card — contact info only, no form |
| Final CTA | `FinalCTA` | `bg-off-white` | Light background to contrast with dark footer |
| Footer | `Footer` | `bg-navy` | Logo image (inverted), compact newsletter opt-in, contact info, service links |
| Quote drawer | `QuoteDrawer` | — | Slide-up bottom sheet; space type pre-fill; expandable details; scheduling fields |
| Scroll to top | `ScrollToTop` | — | Gold button; hidden when drawer is open |
| Mobile CTA bar | `MobileCTABar` | `bg-navy` / `bg-off-white` | Fixed bottom bar (mobile only); hidden when drawer is open |

All components live in `components/clean/`. The page entry point is `app/clean/page.tsx`.

---

## StickyNav

- Fixed at top, always visible (not intersection-observer based)
- **Dark state** (unscrolled): blurred navy background, white text, logo in white pill wrapper
- **Light state** (scrolled past 80px): off-white background, dark text, logo displayed normally
- **Desktop:** "Clean my…" dropdown with four client types + "Something else"; standard nav links; "Free Quote" CTA button
- **Mobile:** hamburger (animated to ×); dropdown panel shows client types, nav links, and "Free Quote" button

---

## Quote Drawer Features

- **Contact methods:** Phone call, Text (SMS), or Email
- **"Add details" card:** Expandable — rooms, bathrooms, cleaning level, frequency, focus areas
- **File upload:** Inline below notes textarea
- **Rough quote nudge:** Selecting "I'd like a rough quote" shows a details reminder
- **Space type pre-fill:** "Get a Free Quote" from any client accordion row or nav dropdown pre-fills the space type
- **"Other" space type:** Includes a note about adaptability; triggered by nav "Something else" and accordion "We clean it all!" row

---

## Mobile Experience

- Nav hamburger with animated bars-to-× transition
- Persistent "Get a Free Quote" + "Call Now" bar pinned to bottom (hidden when drawer is open)
- All tap targets ≥ 44px
- Hero image is full-bleed (edge-to-edge) at 4:3 ratio on mobile
- `overflow-x-hidden` on body prevents horizontal scroll at all sizes

---

## Newsletter

The newsletter opt-in is embedded in the **Footer** as a compact strip (email field + optional SMS field + Subscribe button). It is not a standalone page section.

---

## Backend Architecture

Form submissions from the site hit two Next.js API routes:

| Route | Component | What it does |
|---|---|---|
| `POST /api/quote` | `QuoteDrawer` | Validates, then runs 3 integrations in parallel |
| `POST /api/newsletter` | Footer newsletter strip | Validates, then runs 3 integrations in parallel |

Each route runs three things at the same time (via `Promise.all`):
1. **Resend** — sends an email notification to `cddefari@gmail.com`
2. **Airtable** — writes a row to the Brazusa Cleaning base
3. **Google Sheets** — appends a row to the Brazusa Cleaning spreadsheet

The backend is multi-tenant by design. Each client (Brazusa Cleaning, and future clients) has a config file in `lib/clients/`. Adding a new client means adding one config file and registering it — the integration code is shared.

```
QuoteDrawer / Newsletter footer
        |  POST
        ↓
app/api/quote/route.ts
app/api/newsletter/route.ts
        |
        ├── lib/integrations/resend.ts        → email to owner
        ├── lib/integrations/airtable.ts      → row in Airtable base
        └── lib/integrations/google-sheets.ts → row in Google Sheet
```

---

## Environment Variables

Copy `.env.example` to `.env.local` in the project root and fill in real values:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `RESEND_API_KEY` | resend.com → API Keys → Create API Key |
| `AIRTABLE_API_TOKEN` | airtable.com/create/tokens |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Base64-encoded service account JSON from Google Cloud |
| `BRAZUSA_CLEANING_NOTIFICATION_EMAIL` | The email address that receives quote notifications |
| `BRAZUSA_CLEANING_AIRTABLE_BASE_ID` | From Airtable URL: `airtable.com/appXXXXXX/...` |
| `BRAZUSA_CLEANING_SHEET_ID` | From Google Sheets URL: `spreadsheets/d/XXXXXXXXX/edit` |

`.env.local` is git-ignored. Never commit it. See Task 13 in the implementation plan for step-by-step setup instructions.

---

## Testing

```bash
npm test          # run all tests once
npm run test:watch  # re-run on file changes
```

Tests use [Vitest](https://vitest.dev/). Test files live next to the code they test (e.g. `lib/validators/quote.test.ts`). All external services (Resend, Airtable, Google Sheets) are mocked in tests — no real API calls are made.

---

## Tech Stack

- **Next.js 16** (App Router, static site generation)
- **Tailwind CSS v4**
- **TypeScript**
- **Fonts:** Cormorant Garamond (display/italic) + Syne (UI/numerals)
- **Images:** `next/image` with blur placeholders on all content images
- **Email:** Resend SDK (`resend` package)
- **Lead storage:** Airtable REST API (native `fetch`, no library)
- **Lead backup:** Google Sheets API (`googleapis` package, service account auth)
- **Tests:** Vitest

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Navy | `#0B1D2E` | Primary background, text, buttons |
| Off-white | `#F2EDE6` | Section backgrounds, scrolled nav |
| Gold | `#C49A44` | Accent lines, numbers, hover states |
| Blue | `#2DAAE1` | Primary CTA buttons |
| Border | `#D8D0C6` | Section dividers, card borders |

---

## Assets

| File | Purpose |
|---|---|
| `public/brand/logo.jpg` | Brazusa Cleaning logo (JPG, white bg) |
| `public/images/hero.png` | Hero section photo |
| `public/images/str.png` | STR accordion photo |
| `public/images/property.png` | Property accordion photo |
| `public/images/office.png` | Office accordion photo |
| `public/images/home.png` | Home accordion photo |
| `public/images/team.png` | About section team photo |
| `public/favicons/*` | Favicon set (16, 32, 96px) |

---

## Out of Scope (Current Build)

- Parent hub (`/`) implementation
- Stub service pages beyond scaffolded routes
- File/photo uploads from the QuoteDrawer (Phase 2)
- Real pricing values (shown as `$X – $Y` placeholders)
- Real testimonial review quotes
- Analytics / tracking
- SMS notifications
- Admin dashboard or CRM

---

## How This Was Built With Claude + Codex

This project was built using Claude and Codex together as a system - not just as coding tools, but as tools that were deliberately shaped and audited against each other over time.

The short version: both tools have a shared project contract (`CLAUDE.md`) and a shared startup context file (`docs/decisions.md`) that they read at the start of every session. This solves the context-loss problem - architectural decisions made in one session survive to the next without re-explanation. Five custom Claude subagents enforce specific quality gates structurally (the integration-safety agent cannot edit files; it has read-only tools by design). Codex has its own preference and skill files outside the repo that carry the same working style across all sessions.

The more interesting part: the two tools were used to review and improve each other's configuration. Claude audited Codex's skill files. Codex pushed back on Claude's recommendations. Both tools' startup workflows were then aligned through shared durable files. The result is a shared operating system that neither tool designed alone.

Full case study - what the layers are, why two tools instead of one, what the recursive improvement loop looked like, what worked, what was hard, and what to steal: [`docs/ai-case-study.md`](docs/ai-case-study.md).
