# Brazusa Cleaning Page — Design Spec
**Date:** 2026-04-11
**Scope:** `/clean` route (flagship cleaning page) only

---

## Overview

Build the Brazusa Cleaning flagship page (`/clean`) as a Next.js static page. The page is a single long-scrolling layout targeting apartment residents, short-term rental operators, property managers, and office clients in Greater Boston. It uses pre-written copy, a defined design system, and a real logo asset. The parent site and other service pages are scaffolded as stubs but not implemented in this build.

---

## Tech Stack

- **Framework:** Next.js (App Router, static site generation — the default)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS with design tokens from the aesthetics doc configured in `tailwind.config.ts`
- **Deployment target:** Vercel or Netlify (no backend required for this build)

---

## Project Structure

```
brazusa/
├── app/
│   ├── layout.tsx              # root layout: fonts, global CSS, favicon metadata
│   ├── page.tsx                # / → parent hub stub (empty for now)
│   ├── clean/
│   │   └── page.tsx            # /clean → flagship cleaning page
│   ├── painting/page.tsx       # stub
│   ├── construction/page.tsx   # stub
│   ├── roofing/page.tsx        # stub
│   └── tiling/page.tsx         # stub
├── components/
│   ├── StickyNav.tsx           # sticky top nav (appears on scroll past hero)
│   └── clean/                  # all components scoped to the cleaning page
│       ├── Hero.tsx
│       ├── TrustStrip.tsx
│       ├── ClientSelector.tsx
│       ├── WhyDifferent.tsx
│       ├── ClientSection.tsx   # reusable — used 4× with different props
│       ├── Services.tsx
│       ├── HowItWorks.tsx
│       ├── Pricing.tsx
│       ├── Promotions.tsx
│       ├── Testimonials.tsx
│       ├── ServiceArea.tsx
│       ├── About.tsx
│       ├── FinalCTA.tsx
│       ├── Footer.tsx
│       └── QuoteDrawer.tsx     # slide-up drawer with two-tier quote form
├── public/
│   ├── logo.jpg                # Brazusa Cleaning logo
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── favicon-96x96.png
└── styles/
    └── globals.css             # design tokens: colors, typography, spacing
```

---

## Design System

Sourced from `aesthetics.txt`. Key values:

**Colors:**
- Navy (primary): `#0B2A3C`
- Off-white (background): `#F7F9FB`
- Light gray (borders/separators): `#E5E9EF`
- Blue (CTAs, interactive): `#2DAAE1`
- Yellow (sparse accent): `#F4C430`
- Green (sparse accent): `#4CAF50`
- Red (minimal use only): `#D62828`

**Typography:** Inter, Source Sans, or Lato — clean, readable, slightly warm. Strong headline hierarchy, readable body text.

**Layout:** Medium-width container, strong vertical section spacing, no cramped layouts.

**Components:** Rounded corners (moderate), light shadows or subtle borders, clear hover states on all interactive elements, minimal animation.

---

## Page Sections (`/clean`)

All sections are composed in order in `app/clean/page.tsx`. Shared drawer state (`isDrawerOpen`, `setDrawerOpen`) is defined here and passed as props.

| Order | Component | Notes |
|-------|-----------|-------|
| sticky | `StickyNav` | Appears after user scrolls past hero. Logo left, "Get a Quote" button right. Clicking opens `QuoteDrawer`. |
| 1 | `Hero` | Navy background. Centered headline, subtext, primary CTA ("Request a Quote"), secondary CTA ("Call / Text Us"), micro-copy. |
| 2 | `TrustStrip` | 4 badges: Fully insured · Family-owned · Serving Greater Boston since 1994 · Residential + commercial experience |
| 3 | `ClientSelector` | Header: "What kind of space do you need help with?" Four stacked full-width rows (Short-Term Rentals, Property Mgmt, Offices & Clinics, Apartments / Homes). Each row scrolls to its anchor section on click. |
| 4 | `WhyDifferent` | Headline: "A different kind of cleaning company." Intro paragraph, 4-point list, closing line. |
| 4A | `ClientSection` id="str" | Short-Term Rentals section |
| 4B | `ClientSection` id="property" | Property Managers / Buildings section |
| 4C | `ClientSection` id="offices" | Offices & Clinics section |
| 4D | `ClientSection` id="homes" | Apartments / Homes section |
| 5 | `Services` | Service list + flexibility block |
| 6 | `HowItWorks` | 4-step process with no-surprises note |
| 7 | `Pricing` | Philosophy, pricing factors, real examples (price ranges are placeholders), custom work, adjustment policy |
| 8 | `Promotions` | Ways to lower cost |
| 9 | `Testimonials` | 3 case study cards + testimonial quote placeholders |
| 10 | `ServiceArea` | Greater Boston coverage, "not sure if you're in range? Ask us." CTA |
| 11 | `About` | Family story: 1994 origin, father joining, next-generation modernization |
| 12 | `FinalCTA` | "Tell us what you need." Quote + Call/Text buttons |
| 13 | `Footer` | Contact info, email, service area, links to Painting / Construction / Roofing / Tiling, "Need more than cleaning?" link |

### `ClientSection` Props

```ts
interface ClientSectionProps {
  id: string           // anchor target for ClientSelector scroll
  headline: string
  body: React.ReactNode
  ctaLabel?: string    // defaults to "Request a Quote"
  onCTAClick: () => void  // opens QuoteDrawer
}
```

---

## QuoteDrawer

A slide-up drawer rendered once in `app/clean/page.tsx`. Opens when any CTA button on the page fires `setDrawerOpen(true)`. Closes via an X button or clicking the overlay.

### Form Tiers

**Base form (default view):**
- Name (required)
- Phone or Email (required — at least one)
- Preferred contact method (radio: Phone / Email)
- Type of space (select: Apartment/Home · Short-Term Rental · Office/Clinic · Property/Building · Other)
- Message / notes (text area — always visible, optional)
- Outcome (radio): "Just contact me" / "I'd like a rough quote" / "I'd like to schedule an estimate"
- Expand link: _"Want a more accurate virtual quote? Tell us more →"_ — transitions to detailed form

**Detailed form (expanded, optional):**
All base fields, plus:
- Number of rooms / size
- Number of bathrooms
- Level of cleaning needed (select: Light / Moderate / Heavy)
- Frequency (select: One-time / Recurring)
- Specific areas or tasks to focus on (text area)
- File upload: photos or videos (any file type, no size limit, multi-file) — selected files displayed as a filename list
- Link: _"← Back to simple form"_

**Scheduling fields (conditional):**
Appear in both base and detailed form when outcome = "Schedule an estimate":
- Address or neighborhood (text)
- Preferred days (multi-select checkboxes: Mon–Sun)
- Preferred time of day (radio: Morning / Afternoon / Evening)

### Form State

```ts
type FormStep = 'base' | 'detailed'

// All state lives in QuoteDrawer with useState
// schedulingVisible = outcome === 'schedule'
// On submit: transition to success view, log form data to console
```

### Validation

- On submit only (no inline validation on keystroke)
- Required: Name + at least one of Phone/Email
- If invalid: brief message below submit button — _"Please add your name and a way to reach you."_
- File uploads: no validation, accept anything

### Success State

Replaces form content inside the drawer:
> "Thanks — we'll be in touch shortly. If you need us sooner, call or text us directly."

---

## Sticky Nav Behavior

- Hidden on initial load
- Appears when the user scrolls past the bottom of the `Hero` section (detected via `IntersectionObserver`)
- Contains: logo (left) + "Get a Quote" button (right, blue, opens QuoteDrawer)
- Slim height, white background, subtle bottom border
- Smooth fade-in transition on appear

---

## Error Handling

- Form: validation on submit only, single inline error message if required fields missing
- File upload: no restrictions, no error states
- No network calls in this build — no network error handling needed

---

## Out of Scope (This Build)

- Parent hub (`/`) implementation
- Placeholder service pages beyond stub routes
- Real form backend / email delivery
- CMS integration
- Real pricing values (placeholders remain)
- Real testimonial quotes (placeholders remain)
- Analytics / tracking
- Automated test suite

---

## Assets

| File | Destination |
|------|-------------|
| `Brazusa Cleaning__logo.jpg` | `public/logo.jpg` |
| `favicon-16x16.png` | `public/favicon-16x16.png` |
| `favicon-32x32.png` | `public/favicon-32x32.png` |
| `favicon-96x96.png` | `public/favicon-96x96.png` |

Favicons are referenced via Next.js metadata in `app/layout.tsx`.

---

## Copy Source

All section copy sourced verbatim from `copy.txt`. Pricing values (`$X–$Y`) remain as placeholders until real pricing is confirmed.
