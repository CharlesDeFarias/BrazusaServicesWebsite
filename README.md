# Brazusa Cleaning — Landing Page

A Next.js landing page for Brazusa Cleaning, a professional cleaning service based in Boston.

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
> Full-width hero with headline, subheadline, and CTA button. Nav hidden at this scroll position.

<!-- Replace this comment with: ![Hero](screenshots/01-hero.png) -->

### Client selector + Why Different (scroll: ~750px)
> Tabs for STR / Property / Office / Home that swap the section content below.

<!-- Replace this comment with: ![Client Selector](screenshots/02-client-selector.png) -->

### Services section (scroll: ~2200px)
> Grid of cleaning services with icons and short descriptions.

<!-- Replace this comment with: ![Services](screenshots/03-services.png) -->

### Quote drawer (open state)
> Bottom-sheet drawer that slides up when "Get a Quote" is clicked. Shows the base form fields.

<!-- Replace this comment with: ![Quote Drawer](screenshots/04-quote-drawer.png) -->

### Quote drawer — detailed form
> Same drawer after clicking "Want a more accurate virtual quote? Tell us more →". Shows extra fields for room count, cleaning level, file uploads, etc.

<!-- Replace this comment with: ![Quote Drawer Detailed](screenshots/05-quote-drawer-detailed.png) -->

---

## Page Structure

| Section | Component | Notes |
|---|---|---|
| Sticky nav | `StickyNav` | Hides until hero scrolls out of view |
| Hero | `Hero` | Full-screen with CTA |
| Trust strip | `TrustStrip` | Logo strip / social proof |
| Client selector | `ClientSelector` | STR / Property / Office / Home tabs |
| Why different | `WhyDifferent` | Differentiators |
| Client sections | `ClientSection` ×4 | One per client type (STR, Property, Office, Home) |
| Services | `Services` | Service grid |
| How it works | `HowItWorks` | Step-by-step |
| Pricing | `Pricing` | Pricing tiers |
| Promotions | `Promotions` | Active promos |
| Testimonials | `Testimonials` | Reviews |
| Service area | `ServiceArea` | Map / area list |
| About | `About` | Company background |
| Final CTA | `FinalCTA` | Bottom CTA |
| Footer | `Footer` | Links, contact |
| Quote drawer | `QuoteDrawer` | Slide-up form overlay |

All components live in `components/clean/`. The page entry point is `app/clean/page.tsx`.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
