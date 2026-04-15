# Brazusa Cleaning Page — Design Spec
**Originally created:** 2026-04-11
**Last updated:** 2026-04-13
**Scope:** `/clean` route (flagship cleaning page)

---

## Overview

The Brazusa Cleaning flagship page (`/clean`) is a single long-scrolling Next.js static page targeting apartment residents, short-term rental operators, property managers, and office clients in Greater Boston. It uses a refined editorial aesthetic — Cormorant Garamond display type, Syne UI numerals, a deep navy + warm off-white palette with gold accents — and is fully responsive down to 375px.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, static site generation)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Fonts:** `next/font/google` — Cormorant Garamond (300/400/500/600, normal + italic) + Syne
- **Images:** `next/image` with blur placeholder on all content images
- **Deployment target:** Vercel / Netlify (no backend)

---

## Project Structure

```
claudecoding/
├── app/
│   ├── layout.tsx              # Root layout: fonts, OG meta, overflow-x-hidden body
│   ├── globals.css             # Tailwind v4 directives, design tokens, animations
│   ├── page.tsx                # / → parent hub stub
│   ├── clean/
│   │   └── page.tsx            # /clean → flagship page (all state lives here)
│   ├── painting/page.tsx       # Stub
│   ├── construction/page.tsx   # Stub
│   ├── roofing/page.tsx        # Stub
│   └── tiling/page.tsx         # Stub
├── components/
│   ├── StickyNav.tsx           # Fixed top nav; hamburger + "Clean my…" dropdown
│   └── clean/
│       ├── Hero.tsx            # 82vh navy hero
│       ├── TrustStrip.tsx      # Marquee credibility strip
│       ├── ClientAccordion.tsx # "What kind of space?" — 2-col accordion + catch-all row
│       ├── Services.tsx        # Dark navy service grid
│       ├── Pricing.tsx         # Pricing table + collapsible subsections + CTA
│       ├── Testimonials.tsx    # 3 case study cards
│       ├── ServiceArea.tsx     # Greater Boston coverage
│       ├── About.tsx           # Family history section
│       ├── QuickContact.tsx    # Contact info only (phone, email, Google Business)
│       ├── FinalCTA.tsx        # Off-white conversion section
│       ├── Footer.tsx          # Logo + newsletter strip + contact + service links
│       ├── NewsletterCTA.tsx   # Compact email/SMS opt-in (embedded in Footer)
│       ├── QuoteDrawer.tsx     # Slide-up bottom-sheet form
│       ├── MobileCTABar.tsx    # Fixed mobile bottom bar (hidden md+)
│       └── ScrollToTop.tsx     # Floating gold scroll-to-top button
└── public/
    ├── brand/
    │   └── logo.jpg            # Brazusa Cleaning logo (JPG, white background)
    ├── images/
    │   ├── hero.png
    │   ├── str.png
    │   ├── property.png
    │   ├── office.png
    │   ├── home.png
    │   └── team.png
    └── favicons/
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        └── favicon-96x96.png
```

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Navy | `#0B1D2E` | Primary dark bg, text, buttons |
| Off-white | `#F2EDE6` | Light section bg, scrolled nav |
| Gold | `#C49A44` | Accent lines, numbers, expand icons, hover |
| Blue | `#2DAAE1` | Primary CTA buttons |
| Border | `#D8D0C6` | Section dividers, card borders, input borders |
| Mid-gray | `#7A7470` | Body text on light sections |

### Typography

- **Display / headings:** Cormorant Garamond, weight 300, italic — `var(--font-cormorant)`
- **UI / numerals / labels:** Syne — `var(--font-syne)`
- **Body text:** Inherits from `font-family: var(--font-cormorant)` with Syne for structured elements

### Spacing & Layout

- Max content width: `max-w-5xl` (1024px) or `max-w-6xl` (1152px) for hero
- Section padding: `py-14 px-6`, hero `py-10 lg:py-16 px-6 md:px-12 lg:px-16`
- Section dividers: `border-top: 1px solid #D8D0C6` (light) or `rgba(255,255,255,0.06)` (dark)
- Scroll margin on anchored sections: `scrollMarginTop: '56px'` (nav height)

### Motion

- Page load: staggered `fade-up` / `fade-up-1` / `fade-up-2` / `fade-up-3` CSS animations on hero content
- TrustStrip: continuous `marquee-track` CSS animation
- Accordion expand/collapse: `grid-template-rows` trick (0fr → 1fr) for true-height animation
- Nav: `maxHeight` animation on mobile dropdown (0 → 420px)
- Hamburger bars: CSS `transform` (translateY + rotate) to animate to ×

---

## Page Sections (`/clean`)

All sections composed in `app/clean/page.tsx`. Shared state (`drawerOpen`, `drawerSpaceType`, `activeClient`) is held in the page and passed as props.

| Order | Component | Background | Purpose |
|-------|-----------|------------|---------|
| Fixed | `StickyNav` | Blurred navy / off-white | Navigation, client type nav, quote CTA |
| 1 | `Hero` | `grain bg-navy` | Primary conversion: headline, differentiators, CTAs |
| 2 | `TrustStrip` | `bg-white` | Social proof marquee |
| 3 | `ClientAccordion` | `bg-off-white` | Client type selector + expandable detail panels |
| 4 | `Services` | `grain bg-navy` | Service listing + CTA |
| 5 | `Pricing` | `bg-white` | Price ranges, custom options, savings tips, CTA |
| 6 | `Testimonials` | `bg-off-white` | Case study cards |
| 7 | `ServiceArea` | `bg-white` | Geographic coverage |
| 8 | `About` | `bg-off-white` | Company history |
| 9 | `QuickContact` | `bg-white` | Direct contact links only |
| 10 | `FinalCTA` | `bg-off-white` | Bottom-of-page conversion |
| 11 | `Footer` | `bg-navy` | Newsletter strip + logo + contact + service links |
| Float | `QuoteDrawer` | `#0B1D2E` | Slide-up form (rendered once at page level) |
| Float | `ScrollToTop` | `#C49A44` | Gold button, hidden when drawer open |
| Float | `MobileCTABar` | `#0B1D2E` / `#F2EDE6` | Sticky bottom CTA bar (mobile only) |

---

## Component Specs

### StickyNav

**File:** `components/StickyNav.tsx`

**Props:**
```ts
interface StickyNavProps {
  heroRef: RefObject<HTMLElement | null>   // unused but kept for future use
  onQuoteClick: () => void
  setActiveClient: (id: string | null) => void
  onOtherClick: () => void                 // opens drawer with spaceType='other'
}
```

**Behavior:**
- Always fixed at top (`position: fixed`)
- Scroll threshold: 80px — below this, dark state; above, light state
- **Dark state:** `rgba(11,29,46,0.75)` + blur(14px) background; logo in white pill wrapper `rgba(255,255,255,0.92)` with 4px radius; white text
- **Light state:** `#F2EDE6` background; logo pill disappears (transparent, padding 0); dark text
- Logo size: `h-9 md:h-10`

**Desktop (md+):**
- "Clean my…" button with chevron opens an absolute dropdown listing 4 client types + "Something else"
- Each client type calls `setActiveClient(id)` then scrolls to `#client-types`
- "Something else" calls `onOtherClick()`
- Dropdown closes on outside click (mousedown listener) or Escape key
- Nav links: Services, Pricing, About, Contact
- "Free Quote" CTA button (rightmost)

**Mobile (< md):**
- Hamburger button (`w-11 h-11`, 3 bars → ×)
- Dropdown panel: client types + divider + nav links + "Free Quote" button
- All mobile link rows have `minHeight: '44px'`
- Closes when `scrolled` state changes

---

### Hero

**File:** `components/clean/Hero.tsx`

- Height: `min-h-[82vh]` (shortened from full-screen to surface accordion below fold)
- Grid: `grid-cols-1 lg:grid-cols-[1fr_420px]`, `gap-8 lg:gap-20`, `py-10 lg:py-16`
- Desktop image: `aspectRatio: '3/4'`, `objectPosition: 'center top'`, `rounded-2xl`
- Mobile image: full-bleed (`-mx-6`), `aspectRatio: '4/3'`, `objectPosition: 'center top'`, no border radius
- Both images have `placeholder="blur"` with base64 neutral data URI
- Differentiators: 4-item `grid grid-cols-2` below subtitle, `text-xs`, `color: rgba(255,255,255,0.42)`, low-contrast to not compete with H1
- CTAs: both have `min-h-[44px]`; tel link is an `<a>` with `flex items-center justify-center`
- H1: `clamp(3rem, 6.5vw, 5.25rem)`, weight 300, italic, Cormorant Garamond

---

### TrustStrip

**File:** `components/clean/TrustStrip.tsx`

- 6 badge strings in source array; rendered as `[...badges, ...badges].map(...)` for marquee
- CSS `marquee-track` animation (defined in `globals.css`)
- `overflow-hidden` container, `whitespace-nowrap`, `bg-white`

---

### ClientAccordion

**File:** `components/clean/ClientAccordion.tsx`

**Props:**
```ts
interface ClientAccordionProps {
  items: ClientItem[]
  openId: string | null
  onOpenChange: (id: string | null) => void
  onCTAClick: (spaceType: string) => void
}
```

**Layout:** Two-column grid (`md:grid-cols-2`), collapses to single column below md.

**Column assignment:**
- Col 1: STR (id: `str`), Offices (id: `offices`)
- Col 2: Property (id: `property`), Homes (id: `homes`)

**Accordion behavior:**
- Header button: `py-5 min-h-[44px]`
- Expand animation: `grid-template-rows: 0fr → 1fr` with `opacity` transition
- Auto-scroll to open item: `el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })` with 60ms delay
- All accordion images have `placeholder="blur"`

**"We clean it all!" row** (below the grid):
- Full-width `<button>` with dashed border (`border-dashed #D8D0C6`)
- Shows: "05" gold label, "We clean it all" title, "Not sure which applies? We adapt — reach out." subtext
- `onClick` calls `onCTAClick('other')`

**Section:** `id="client-types"`, `bg-off-white`

---

### Services

**File:** `components/clean/Services.tsx`

**Props:** `onQuoteClick: () => void`

- Dark navy section (`grain bg-navy`)
- 6-service grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- **Border pattern:** outer container has `border: 1px solid rgba(255,255,255,0.08)` + `overflow-hidden`; each cell has `border-right` and `border-bottom` at the same color — the container clips excess borders at any column count
- CTA button at bottom opens QuoteDrawer

---

### Pricing

**File:** `components/clean/Pricing.tsx`

**Props:** `onQuoteClick: () => void`

- Layout: `grid-cols-1 lg:grid-cols-[1fr_240px]`
- 5 example rows: `flex flex-wrap justify-between` (prevents overflow on 375px)
- Two collapsible subsections using `+` toggle + `maxHeight` animation:
  1. "Custom & partial cleaning options" (4 examples)
  2. "Ways to lower your price" (5 items, content from deleted Promotions)
- Sidebar: "What affects your quote" — 6 bullet factors
- CTA button at bottom: "Get your custom quote →"

---

### QuickContact

**File:** `components/clean/QuickContact.tsx`

- Section `id="contact"`, `scrollMarginTop: '56px'`, `bg-white`
- **Contact info only** — no message form, no form state
- Three contact items in `flex flex-col sm:flex-row gap-5 flex-wrap`:
  1. Phone: tel link with Heroicons phone outline SVG
  2. Email: mailto link with email SVG
  3. Google Business: external link with Google G SVG, arrow icon
- Each contact item uses `w-11 h-11` icon container with navy hover

---

### FinalCTA

**File:** `components/clean/FinalCTA.tsx`

- Background: `bg-off-white` (changed from dark navy to create light/dark/light contrast before Footer)
- Subtle grid pattern overlay using `rgba(11,29,46,0.025)`
- Navy text, blue primary CTA, outline secondary CTA (navy border, navy text, navy hover)
- Both CTAs have `min-h-[44px]`

---

### Footer

**File:** `components/clean/Footer.tsx`

- `bg-navy`, always dark
- **Newsletter strip** (top): compact `flex flex-col sm:flex-row` layout; label on left, `<NewsletterCTA />` on right; separated by `border-bottom: rgba(255,255,255,0.08)`
- **Logo:** `<Image>` at `h-12`, `filter: brightness(0) invert(1)` — correct because footer is always dark
- Contact: phone + email links, service area text
- Service links: Painting, Construction, Roofing, Tiling

---

### NewsletterCTA

**File:** `components/clean/NewsletterCTA.tsx`

- **Embedded in Footer only** — not a standalone page section
- Email field (required) + optional tel field (visible by default, not validated)
- Single `flex gap-2` row: email input + "Subscribe" button
- Success state replaces the form with "You're on the list. ✓"

---

### QuoteDrawer

**File:** `components/clean/QuoteDrawer.tsx`

- Fixed `bottom-0 left-0 right-0`, `max-h-[92vh] overflow-y-auto`, `rounded-t-2xl`
- Overlay: `rgba(0,0,0,0.6)`, click-to-close
- Escape key closes without clearing form data
- Body scroll locked (`overflow: hidden`) when open

**Form fields (base):**
- Name (required)
- Phone or Email (required)
- Preferred contact: Phone call / Text (SMS) / Email — 3 toggle buttons, `min-h-[44px]`
- Expandable "Add details" section (rooms, bathrooms, clean level, frequency, focus areas)
- Type of space (select)
- Notes + file upload
- Outcome radio: Just contact me / Rough quote / Schedule estimate

**Scheduling fields** (conditional, when outcome = 'schedule'):
- Address or neighborhood
- Preferred days (Mon–Sun pill toggles, `min-h-[44px]`)
- Time of day (Morning / Afternoon / Evening radio)

**Space type pre-fill:** When opened via `openDrawer(spaceType)`, sets the space type dropdown on mount.

**Tap targets:** Close button `w-11 h-11`, contact method buttons `min-h-[44px]`, day toggles `min-h-[44px]`.

---

### MobileCTABar

**File:** `components/clean/MobileCTABar.tsx`

- `fixed bottom-0 left-0 right-0 z-40 md:hidden`
- Hidden when `drawerOpen === true` (returns null)
- Two-column grid:
  - "Get a Free Quote" — calls `onQuoteClick`, navy bg with gold top border accent
  - "Call Now" — `<a href="tel:7816867189">`, off-white bg
- `paddingBottom: 'env(safe-area-inset-bottom)'` for iOS home bar
- Gold `border-top: 2px solid #C49A44`

---

### ScrollToTop

**File:** `components/clean/ScrollToTop.tsx`

- `fixed bottom-6 right-6 z-50`
- Gold background (`#C49A44`), `w-11 h-11`
- Visible when `scrollY > 400` AND `drawerOpen === false`
- `opacity` + `pointer-events` + `transform: translateY` transitions

---

## Page-Level State (`app/clean/page.tsx`)

```ts
const [drawerOpen, setDrawerOpen]           = useState(false)
const [drawerSpaceType, setDrawerSpaceType] = useState('')
const [activeClient, setActiveClient]       = useState<string | null>(null)
```

`openDrawer(spaceType = '')` sets both `drawerSpaceType` and `drawerOpen = true`.

**Props passed down:**
- `StickyNav`: `onQuoteClick`, `setActiveClient`, `onOtherClick`
- `ClientAccordion`: `openId={activeClient}`, `onOpenChange={setActiveClient}`, `onCTAClick={openDrawer}`
- `Services`: `onQuoteClick`
- `Pricing`: `onQuoteClick`
- `ServiceArea`: `onQuoteClick`
- `FinalCTA`: `onQuoteClick`
- `QuoteDrawer`: `isOpen`, `onClose`, `defaultSpaceType`
- `ScrollToTop`: `drawerOpen`
- `MobileCTABar`: `onQuoteClick`, `drawerOpen`

---

## Responsive Behavior

| Breakpoint | Key behavior |
|---|---|
| < 640px (mobile) | Single-column everything; MobileCTABar visible; hero image full-bleed -mx-6 |
| 640–767px (sm) | Services 2-col; TrustStrip marquee; contact items row |
| 768–1023px (md) | StickyNav links visible; ClientAccordion 2-col; hamburger hidden |
| 1024px+ (lg) | Hero 2-col; About 2-col; hero desktop image visible |

**Tap targets:** All interactive elements ≥ 44px height.
**Overflow:** `overflow-x-hidden` on `<body>` in `app/layout.tsx`.

---

## Meta / SEO

Defined in `app/layout.tsx`:

```ts
title: 'Brazusa Cleaning'
description: 'Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties across Greater Boston.'
openGraph: {
  title: 'Brazusa Cleaning',
  description: '...',
  type: 'website',
  images: [{ url: '/images/hero.png' }],
}
```

Favicons at 16, 32, and 96px referenced via Next.js metadata icons array.

---

## Deleted / Merged Components

These components existed in earlier versions and were removed or consolidated:

| Component | Disposition |
|---|---|
| `WhyDifferent.tsx` | Merged into `Hero.tsx` as a 2×2 differentiator grid |
| `HowItWorks.tsx` | Deleted; "How It Works" nav link removed |
| `Promotions.tsx` | Merged into `Pricing.tsx` as "Ways to lower your price" collapsible |
| `NewsletterCTA.tsx` (standalone section) | Moved into `Footer.tsx`; file simplified and kept |
| `ClientSelector.tsx` / `ClientSection.tsx` | Replaced by `ClientAccordion.tsx` |
| QuickContact message form | Removed; component is now contact-info only |

---

## Out of Scope (Current Build)

- Parent hub (`/`) implementation
- Stub service pages
- Real form backend / email delivery
- Real pricing values (`$X – $Y` placeholders remain)
- Real testimonial review quotes
- Analytics / tracking
- Automated test suite
