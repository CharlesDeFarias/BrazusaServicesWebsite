# Brazusa Cleaning — Landing Page

A Next.js landing page for Brazusa Cleaning, a professional cleaning service based in Greater Boston since 1994.

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
> Full-screen navy hero with headline, "Get a Free Quote" CTA, and phone number.

<!-- Replace this comment with: ![Hero](screenshots/01-hero.png) -->

### Why Different + Client selector (scroll: ~750px)
> Compact two-column differentiators panel above the client type selector tabs.

<!-- Replace this comment with: ![Why Different](screenshots/02-why-different.png) -->

### Client accordion (expanded)
> Accordion rows for STR / Property / Office / Home. Expanded row shows headline, body copy, and "Get a Free Quote" button that pre-fills the space type in the drawer.

<!-- Replace this comment with: ![Client Accordion](screenshots/03-client-accordion.png) -->

### Services section (scroll: ~2200px)
> Dark navy grid of cleaning services. Descriptions at comfortable contrast.

<!-- Replace this comment with: ![Services](screenshots/04-services.png) -->

### Quick contact section
> Left: clickable phone, email, and Google Business card. Right: on-site quick message form.

<!-- Replace this comment with: ![Quick Contact](screenshots/05-quick-contact.png) -->

### Newsletter CTA
> Dark navy section with email/SMS toggle, promotions/news topic selection, and subscribe button.

<!-- Replace this comment with: ![Newsletter](screenshots/06-newsletter.png) -->

### Quote drawer — base form
> Bottom-sheet drawer: name, contact info, phone/SMS/email preference, "Add details" expandable card, space type, notes, file upload, outcome options.

<!-- Replace this comment with: ![Quote Drawer Base](screenshots/07-quote-drawer-base.png) -->

### Quote drawer — details expanded
> Same drawer with the "Add details" card open: rooms, bathrooms, cleaning level, frequency, focus areas.

<!-- Replace this comment with: ![Quote Drawer Detailed](screenshots/08-quote-drawer-detailed.png) -->

### Quote drawer — rough quote nudge
> Selecting "I'd like a rough quote" shows a gold-bordered nudge pointing users to the details panel.

<!-- Replace this comment with: ![Quote Drawer Nudge](screenshots/09-quote-drawer-nudge.png) -->

---

## Page Structure

| Section | Component | Notes |
|---|---|---|
| Sticky nav | `StickyNav` | Always visible; logo click scrolls to top; "Free Quote" CTA |
| Hero | `Hero` | Full-screen navy with headline and "Get a Free Quote" / phone CTA |
| Trust strip | `TrustStrip` | Marquee social proof strip |
| Why different | `WhyDifferent` | Compact two-column differentiators, no image |
| Client selector | `ClientSelector` | STR / Property / Office / Home tabs — scrolls to accordion |
| Client accordion | `ClientAccordion` | Expandable rows per client type; "Get a Free Quote" pre-fills space type |
| Services | `Services` | Dark navy service grid |
| How it works | `HowItWorks` | Step-by-step process |
| Pricing | `Pricing` | Pricing tiers |
| Quick contact | `QuickContact` | Phone/email links, Google Business card, on-site message form |
| Newsletter CTA | `NewsletterCTA` | Email or SMS subscription with topic choice |
| Promotions | `Promotions` | Active promotions |
| Testimonials | `Testimonials` | Client case examples |
| Service area | `ServiceArea` | Greater Boston coverage |
| About | `About` | Company background |
| Final CTA | `FinalCTA` | Bottom conversion section |
| Footer | `Footer` | Links, phone, email |
| Quote drawer | `QuoteDrawer` | Slide-up form: SMS option, file upload, expandable details, space pre-fill |
| Scroll to top | `ScrollToTop` | Gold floating button, visible after 400px scroll |

All components live in `components/clean/`. The page entry point is `app/clean/page.tsx`.

## Quote Drawer Features

- **Contact methods:** Phone call, Text (SMS), or Email
- **"Add details" card:** Expandable section above space type — rooms, bathrooms, cleaning level, frequency, focus areas
- **File upload:** Inline below the notes textarea in the base form
- **Rough quote nudge:** Selecting "I'd like a rough quote" shows a reminder to add details
- **Space type pre-fill:** Clicking "Get a Free Quote" from any client accordion row pre-fills the dropdown
- **"Other" space type:** Includes a note about adaptability and referrals

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- **Fonts:** Cormorant Garamond (display/italic) + Syne (UI/headings)
