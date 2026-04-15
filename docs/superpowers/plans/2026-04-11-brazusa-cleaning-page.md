# Brazusa Cleaning Page Implementation Plan

> **STATUS: COMPLETED** — Page built and subsequently refactored. This document records the original build plan. For current architecture, see the spec doc: `docs/superpowers/specs/2026-04-11-brazusa-cleaning-page-design.md`.

---

## What Changed From This Plan (2026-04-13 Refactor)

The following divergences exist between this original plan and the current codebase:

| Plan | Current |
|---|---|
| Font: Inter | Fonts: Cormorant Garamond + Syne |
| Colors: `#0B2A3C` navy, `#F7F9FB` off-white | Colors: `#0B1D2E` navy, `#F2EDE6` off-white, `#C49A44` gold |
| `ClientSelector.tsx` + 4× `ClientSection.tsx` | Single `ClientAccordion.tsx` (2-col expandable) |
| `WhyDifferent.tsx` standalone section | Absorbed into `Hero.tsx` as 2×2 differentiator grid |
| `HowItWorks.tsx` section | Deleted; nav link removed |
| `Promotions.tsx` standalone section | Merged into `Pricing.tsx` as collapsible subsection |
| `NewsletterCTA.tsx` standalone dark section | Simplified and embedded inside `Footer.tsx` |
| `QuickContact.tsx` with message form | Contact-info only (form removed) |
| `StickyNav` appears via IntersectionObserver | Always fixed; scroll-based style toggle at 80px |
| No mobile navigation | Hamburger menu with client-type dropdown |
| No mobile CTA bar | `MobileCTABar.tsx` — fixed bottom bar (mobile only) |
| `FinalCTA` dark navy | `FinalCTA` light off-white (to avoid consecutive dark sections) |
| No Open Graph tags | OG tags in `app/layout.tsx` |

---

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Brazusa Cleaning flagship page (`/clean`) as a Next.js static site with all 13 content sections, a sticky nav, and a two-tier quote drawer.

**Architecture:** Next.js App Router project scaffolded directly in the working directory. All page sections are individual React components composed in `app/clean/page.tsx`. Drawer state (`isOpen`) is lifted to the page and passed as props. `StickyNav` appears via `IntersectionObserver` after the hero scrolls out of view. No backend — form logs to console and shows a success state.

**Tech Stack:** Next.js 14+ (App Router, SSG), TypeScript, React, Tailwind CSS, `next/font/google` (Inter), `next/image`.

---

## File Map

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Custom color + font tokens |
| `app/layout.tsx` | Root layout: Inter font, global CSS, favicon metadata |
| `app/globals.css` | Tailwind directives + base body styles |
| `app/page.tsx` | Parent hub stub |
| `app/clean/page.tsx` | Flagship page — composes all sections, holds drawer + hero ref |
| `app/painting/page.tsx` | Stub |
| `app/construction/page.tsx` | Stub |
| `app/roofing/page.tsx` | Stub |
| `app/tiling/page.tsx` | Stub |
| `components/StickyNav.tsx` | Top nav — hidden until hero scrolls out of view |
| `components/clean/Hero.tsx` | Navy hero, forwardRef to section element |
| `components/clean/TrustStrip.tsx` | 4 credibility badges |
| `components/clean/ClientSelector.tsx` | Stacked rows, scroll to anchor on click |
| `components/clean/WhyDifferent.tsx` | "A different kind of cleaning company" |
| `components/clean/ClientSection.tsx` | Reusable section — used 4× with different props |
| `components/clean/Services.tsx` | Service list + flexibility block |
| `components/clean/HowItWorks.tsx` | 4-step numbered process |
| `components/clean/Pricing.tsx` | Philosophy, factors, examples, custom work |
| `components/clean/Promotions.tsx` | Ways to lower cost |
| `components/clean/Testimonials.tsx` | 3 case study cards |
| `components/clean/ServiceArea.tsx` | Greater Boston coverage |
| `components/clean/About.tsx` | Family story |
| `components/clean/FinalCTA.tsx` | Navy CTA section |
| `components/clean/Footer.tsx` | Contact, service links |
| `components/clean/QuoteDrawer.tsx` | Slide-up drawer, base + detailed form, scheduling, success |

---

## Task 1: Scaffold project + design tokens + assets

**Files:** `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `public/*`

- [ ] **Step 1: Scaffold Next.js**

From `C:/Users/charl/Desktop/claudecoding/`, run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```
Accept the prompt to proceed in a non-empty directory.

- [ ] **Step 2: Configure Tailwind tokens**

Replace `tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B2A3C',
        'off-white': '#F7F9FB',
        'light-gray': '#E5E9EF',
        'brand-blue': '#2DAAE1',
        'brand-yellow': '#F4C430',
        'brand-green': '#4CAF50',
        'brand-red': '#D62828',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Update globals.css**

Replace `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-off-white text-navy;
  }
}
```

- [ ] **Step 4: Update root layout with Inter font and favicons**

Replace `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brazusa Cleaning',
  description: 'Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties across Greater Boston.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 5: Copy assets to public/**

```bash
cp "Brazusa Cleaning__logo.jpg" public/logo.jpg
cp favicon-16x16.png public/favicon-16x16.png
cp favicon-32x32.png public/favicon-32x32.png
cp favicon-96x96.png public/favicon-96x96.png
```

- [ ] **Step 6: Add .gitignore entry for brainstorm files**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 7: Verify**

```bash
npm run dev
```
Open http://localhost:3000. Expected: Next.js default page loads, no console errors.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js + Tailwind with Brazusa design tokens and assets"
```

---

## Task 2: Stub routes

**Files:** `app/page.tsx`, `app/painting/page.tsx`, `app/construction/page.tsx`, `app/roofing/page.tsx`, `app/tiling/page.tsx`

- [ ] **Step 1: Create all stubs**

Create `app/page.tsx`:
```tsx
export default function Home() { return null }
```

Create `app/painting/page.tsx`:
```tsx
export default function PaintingPage() { return null }
```

Create `app/construction/page.tsx`:
```tsx
export default function ConstructionPage() { return null }
```

Create `app/roofing/page.tsx`:
```tsx
export default function RoofingPage() { return null }
```

Create `app/tiling/page.tsx`:
```tsx
export default function TilingPage() { return null }
```

- [ ] **Step 2: Verify**

With dev server running, confirm http://localhost:3000, http://localhost:3000/painting, http://localhost:3000/construction, http://localhost:3000/roofing, http://localhost:3000/tiling all return 200 (blank pages). http://localhost:3000/clean should 404.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx app/painting/page.tsx app/construction/page.tsx app/roofing/page.tsx app/tiling/page.tsx
git commit -m "feat: add stub routes for parent hub and service pages"
```

---

## Task 3: Hero section

**Files:** `components/clean/Hero.tsx`, `app/clean/page.tsx`

- [ ] **Step 1: Create Hero**

Create `components/clean/Hero.tsx`:
```tsx
import { forwardRef } from 'react'

interface HeroProps {
  onQuoteClick: () => void
}

const Hero = forwardRef<HTMLElement, HeroProps>(function Hero({ onQuoteClick }, ref) {
  return (
    <section ref={ref} className="bg-navy text-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Reliable, high-detail cleaning for apartments, short-term rentals, and managed properties
        </h1>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          A family-run cleaning company with decades of experience — now built with the speed, structure, and communication of a modern service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <button
            onClick={onQuoteClick}
            className="bg-brand-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors"
          >
            Request a Quote
          </button>
          <a
            href="tel:+16175550000"
            className="border border-white/50 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
          >
            Call / Text Us
          </a>
        </div>
        <p className="text-sm text-white/50">
          Not sure if we&apos;re the right fit? Call us anyway — we&apos;ll help you find someone who is.
        </p>
      </div>
    </section>
  )
})

export default Hero
```

> **Note:** Replace `+16175550000` with the real phone number before launch. Search for this placeholder across all components (Footer, FinalCTA, QuoteDrawer) to update them all.

- [ ] **Step 2: Create /clean page scaffold**

Create `app/clean/page.tsx`:
```tsx
'use client'

import { useState, useRef } from 'react'
import Hero from '@/components/clean/Hero'

export default function CleanPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const openDrawer = () => setDrawerOpen(true)

  return (
    <main>
      <Hero ref={heroRef} onQuoteClick={openDrawer} />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

http://localhost:3000/clean — navy hero with white headline, two CTA buttons, micro-copy visible.

- [ ] **Step 4: Commit**

```bash
git add components/clean/Hero.tsx app/clean/page.tsx
git commit -m "feat: add Hero section to /clean page"
```

---

## Task 4: TrustStrip + ClientSelector

**Files:** `components/clean/TrustStrip.tsx`, `components/clean/ClientSelector.tsx`

- [ ] **Step 1: Create TrustStrip**

Create `components/clean/TrustStrip.tsx`:
```tsx
const badges = [
  'Fully insured',
  'Family-owned and operated',
  'Serving Greater Boston since 1994',
  'Residential + commercial experience',
]

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-light-gray py-5 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-3">
        {badges.map((badge) => (
          <span key={badge} className="flex items-center gap-2 text-sm text-navy font-medium">
            <span className="text-brand-green">✓</span>
            {badge}
          </span>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create ClientSelector**

Create `components/clean/ClientSelector.tsx`:
```tsx
'use client'

const clients = [
  { id: 'str', label: 'Short-Term Rentals', teaser: 'Fast turnovers, consistency, no surprises' },
  { id: 'property', label: 'Property Management / Buildings', teaser: 'Multi-unit coordination, reliability across properties' },
  { id: 'offices', label: 'Offices & Clinics', teaser: 'Hygiene, consistency, minimal disruption' },
  { id: 'homes', label: 'Apartments / Homes', teaser: 'Trust, comfort, detail' },
]

export default function ClientSelector() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-16 px-6 bg-off-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">What kind of space do you need help with?</h2>
        <div className="flex flex-col gap-3">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              className="flex items-center justify-between w-full bg-white border border-light-gray rounded-md px-5 py-4 text-left hover:border-brand-blue hover:shadow-sm transition-all"
            >
              <span className="font-semibold text-navy">{c.label}</span>
              <span className="text-sm text-gray-500">{c.teaser} →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Mount both in /clean page**

In `app/clean/page.tsx`, add imports and mount after `<Hero>`:
```tsx
import TrustStrip from '@/components/clean/TrustStrip'
import ClientSelector from '@/components/clean/ClientSelector'

// inside <main> after <Hero ...>:
<TrustStrip />
<ClientSelector />
```

- [ ] **Step 4: Verify**

http://localhost:3000/clean — trust strip with green checkmarks appears below hero, then four stacked rows.

- [ ] **Step 5: Commit**

```bash
git add components/clean/TrustStrip.tsx components/clean/ClientSelector.tsx app/clean/page.tsx
git commit -m "feat: add TrustStrip and ClientSelector sections"
```

---

## Task 5: WhyDifferent + ClientSection + four client sections

**Files:** `components/clean/WhyDifferent.tsx`, `components/clean/ClientSection.tsx`

- [ ] **Step 1: Create WhyDifferent**

Create `components/clean/WhyDifferent.tsx`:
```tsx
const points = [
  'A consistent, small team that actually cares about each client',
  'Fast, flexible communication, scheduling, and invoicing',
  'Fully insured, structured, and professionally managed',
  'Decades of real cleaning experience behind everything we do',
]

export default function WhyDifferent() {
  return (
    <section className="py-16 px-6 bg-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">A different kind of cleaning company</h2>
        <p className="text-gray-600 mb-4">
          Most cleaning companies fall into one of two categories: they&apos;re either large, structured companies that feel impersonal — or small, high-quality cleaners that are hard to communicate with and unreliable at scale.
        </p>
        <p className="text-gray-600 mb-6">We built something in between.</p>
        <ul className="space-y-3 mb-6">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="text-brand-blue mt-1 flex-shrink-0">→</span>
              <span className="text-gray-700">{p}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 font-medium">
          We&apos;re a local family business — just one that&apos;s been rebuilt to work properly in today&apos;s world.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create reusable ClientSection**

Create `components/clean/ClientSection.tsx`:
```tsx
interface ClientSectionProps {
  id: string
  headline: string
  body: React.ReactNode
  ctaLabel?: string
  onCTAClick: () => void
}

export default function ClientSection({ id, headline, body, ctaLabel = 'Request a Quote', onCTAClick }: ClientSectionProps) {
  return (
    <section id={id} className="py-16 px-6 bg-off-white border-t border-light-gray scroll-mt-16">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{headline}</h2>
        <div className="text-gray-600 space-y-4 mb-8">{body}</div>
        <button
          onClick={onCTAClick}
          className="bg-brand-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Mount in /clean page**

In `app/clean/page.tsx`, add after `<ClientSelector />`:
```tsx
import WhyDifferent from '@/components/clean/WhyDifferent'
import ClientSection from '@/components/clean/ClientSection'

<WhyDifferent />

<ClientSection
  id="str"
  headline="Short-Term Rental Cleaning"
  onCTAClick={openDrawer}
  body={
    <>
      <p>We know what matters for short-term rentals: fast turnovers, consistent quality, no surprises.</p>
      <p>A missed detail can mean a bad review — and a bad review costs more than a cleaning ever will.</p>
      <p>We build repeatable systems around your units so you can rely on us without thinking about it. We can also help with small operational tasks that make managing your units easier.</p>
    </>
  }
/>

<ClientSection
  id="property"
  headline="Cleaning for Property Managers & Buildings"
  onCTAClick={openDrawer}
  body={
    <>
      <p>Property management requires more than just cleaning. It requires reliability across multiple units, consistency across different jobs, understanding building rules and systems, and professionalism with tenants, staff, and vendors.</p>
      <p>We&apos;re built to handle that. We document, standardize, and communicate clearly so you don&apos;t have to manage the cleaners — we manage ourselves.</p>
    </>
  }
/>

<ClientSection
  id="offices"
  headline="Office & Clinic Cleaning"
  onCTAClick={openDrawer}
  body={
    <>
      <p>Most office cleaning happens when no one&apos;s around — and that&apos;s exactly how we like it.</p>
      <p>We focus on consistent, reliable cleaning, simple communication, and easy billing and scheduling. No unnecessary complexity. Just dependable service that works.</p>
    </>
  }
/>

<ClientSection
  id="homes"
  headline="Apartment & Home Cleaning"
  onCTAClick={openDrawer}
  body={
    <>
      <p>For residential clients, it comes down to a few things: quality, trust, affordability, and communication.</p>
      <p>We treat your space with the same level of care we&apos;d expect in our own. Whether it&apos;s a one-time clean or something recurring, we&apos;ll adapt to what you actually need.</p>
    </>
  }
/>
```

- [ ] **Step 4: Verify**

http://localhost:3000/clean — "Why We're Different" appears, then four client sections with unique headlines. Click "Short-Term Rentals" in the ClientSelector — page smooth-scrolls to the STR section.

- [ ] **Step 5: Commit**

```bash
git add components/clean/WhyDifferent.tsx components/clean/ClientSection.tsx app/clean/page.tsx
git commit -m "feat: add WhyDifferent and four client sections with anchor scroll"
```

---

## Task 6: Services + HowItWorks

**Files:** `components/clean/Services.tsx`, `components/clean/HowItWorks.tsx`

- [ ] **Step 1: Create Services**

Create `components/clean/Services.tsx`:
```tsx
const services = [
  'Routine cleaning',
  'Deep cleaning',
  'Move-in / move-out cleaning',
  'Short-term rental turnover',
  'Custom cleaning requests',
]

export default function Services() {
  return (
    <section className="py-16 px-6 bg-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">What we do</h2>
        <ul className="space-y-3 mb-10">
          {services.map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-blue flex-shrink-0" />
              <span className="text-gray-700">{s}</span>
            </li>
          ))}
        </ul>
        <div className="bg-off-white border border-light-gray rounded-md p-6">
          <p className="font-semibold text-navy mb-3">We don&apos;t believe in one-size-fits-all cleaning.</p>
          <p className="text-gray-600 mb-2">We can clean:</p>
          <ul className="text-gray-600 space-y-1 mb-4 ml-4">
            <li>→ Entire units</li>
            <li>→ Specific rooms</li>
            <li>→ Or just the tasks you don&apos;t want to deal with</li>
          </ul>
          <p className="text-gray-600 text-sm">If we don&apos;t do something, we&apos;ll help you find someone who does.</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create HowItWorks**

Create `components/clean/HowItWorks.tsx`:
```tsx
const steps = [
  { n: '01', text: 'Reach out — quick or detailed' },
  { n: '02', text: 'We respond fast' },
  { n: '03', text: 'We provide a quote or schedule a visit' },
  { n: '04', text: 'Cleaning begins' },
]

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-off-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-10">How it works</h2>
        <div className="space-y-6 mb-8">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-5">
              <span className="text-2xl font-bold text-brand-blue/40 w-10 flex-shrink-0">{s.n}</span>
              <span className="text-lg text-navy pt-1">{s.text}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 border-t border-light-gray pt-5">
          If something is different from what we expected when quoting, we&apos;ll tell you before starting — no surprises.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Mount in /clean page**

Add after the four `<ClientSection>` blocks:
```tsx
import Services from '@/components/clean/Services'
import HowItWorks from '@/components/clean/HowItWorks'

<Services />
<HowItWorks />
```

- [ ] **Step 4: Verify**

http://localhost:3000/clean — bullet list of services, flexibility card, then numbered steps appear in sequence.

- [ ] **Step 5: Commit**

```bash
git add components/clean/Services.tsx components/clean/HowItWorks.tsx app/clean/page.tsx
git commit -m "feat: add Services and HowItWorks sections"
```

---

## Task 7: Pricing

**Files:** `components/clean/Pricing.tsx`

- [ ] **Step 1: Create Pricing**

Create `components/clean/Pricing.tsx`:
```tsx
const factors = [
  'Size and layout of the space',
  'Level of cleaning needed (light vs deep)',
  'Type of service (routine, move-out, turnover, etc.)',
  'Frequency (one-time vs recurring)',
  'Accessibility (parking, building rules, timing)',
  'Custom requests',
]

const examples = [
  { label: 'Studio apartment (light cleaning)', range: '$X – $Y' },
  { label: '1–2 bedroom apartment (moderate)', range: '$X – $Y' },
  { label: 'Deep cleaning (varies heavily)', range: '$X – $Y' },
  { label: 'Short-term rental turnover', range: '$X – $Y' },
  { label: 'Small office', range: '$X – $Y' },
]

export default function Pricing() {
  return (
    <section className="py-16 px-6 bg-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Transparent, flexible pricing</h2>
        <p className="text-gray-600 mb-10">
          Every space is different, so we don&apos;t use flat, one-size pricing. We price based on what the job actually requires — and we&apos;d rather explain that upfront than surprise you later.
        </p>

        <h3 className="text-xl font-semibold mb-4">How we calculate pricing</h3>
        <ul className="space-y-2 mb-10">
          {factors.map((f) => (
            <li key={f} className="flex items-start gap-3 text-gray-600">
              <span className="text-brand-blue mt-1 flex-shrink-0">→</span>
              {f}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-4">Real examples</h3>
        <div className="space-y-3 mb-4">
          {examples.map((ex) => (
            <div key={ex.label} className="flex justify-between items-center border-b border-light-gray pb-3">
              <span className="text-gray-700">{ex.label}</span>
              <span className="font-semibold text-navy">{ex.range}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-10">
          Your exact quote may vary — but this gives you a realistic starting point.
        </p>

        <h3 className="text-xl font-semibold mb-4">Custom cleaning</h3>
        <p className="text-gray-600 mb-3">We don&apos;t believe cleaning has to be all-or-nothing. We regularly do jobs like:</p>
        <ul className="space-y-2 mb-10 text-gray-600 ml-4">
          <li>→ Cleaning only one roommate&apos;s half of an apartment</li>
          <li>→ Cleaning just kitchens and bathrooms</li>
          <li>→ Doing only the tasks you don&apos;t want to deal with</li>
          <li>→ One-time targeted deep cleans</li>
        </ul>

        <div className="bg-off-white border border-light-gray rounded-md p-5 text-sm">
          <p className="font-semibold text-navy mb-1">If something changes</p>
          <p className="text-gray-600">
            Sometimes we arrive and the situation is different from what was described. We&apos;ll explain the difference, adjust the price if needed, or work within the original quote as best as possible. No surprises.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Mount in /clean page**

```tsx
import Pricing from '@/components/clean/Pricing'
// after <HowItWorks />:
<Pricing />
```

- [ ] **Step 3: Verify**

http://localhost:3000/clean — pricing section shows all four sub-blocks (philosophy + factors + examples table + custom work + adjustment notice).

- [ ] **Step 4: Commit**

```bash
git add components/clean/Pricing.tsx app/clean/page.tsx
git commit -m "feat: add Pricing section"
```

---

## Task 8: Promotions + Testimonials

**Files:** `components/clean/Promotions.tsx`, `components/clean/Testimonials.tsx`

- [ ] **Step 1: Create Promotions**

Create `components/clean/Promotions.tsx`:
```tsx
const ways = [
  { title: 'Referrals', desc: 'Send us a client. If we complete a cleaning, you get rewarded.' },
  { title: 'Schedule with neighbors', desc: 'If you and nearby clients book the same day, it reduces our travel time — which lowers your cost.' },
  { title: 'Flexible timing', desc: "If you're flexible on when we clean, it lets us optimize our schedule." },
  { title: 'Recurring service', desc: 'Consistent cleanings are easier to maintain and more efficient.' },
  { title: 'Helping us grow locally', desc: "Connecting us with property managers, letting us share info in your building, or helping us build local relationships can all translate into better pricing." },
]

export default function Promotions() {
  return (
    <section className="py-16 px-6 bg-off-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Ways to lower your cost</h2>
        <p className="text-gray-600 mb-8">If you help us operate more efficiently, we pass that savings to you.</p>
        <div className="space-y-6 mb-8">
          {ways.map((w) => (
            <div key={w.title}>
              <p className="font-semibold text-navy mb-1">{w.title}</p>
              <p className="text-gray-600 text-sm">{w.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 border-t border-light-gray pt-5">
          We&apos;re open to creative setups. If there&apos;s a way to make things work better for both sides, we&apos;ll usually find it.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Testimonials**

Create `components/clean/Testimonials.tsx`:
```tsx
const cases = [
  {
    title: 'Short-term rental, inconsistent cleaners',
    situation: 'Client had inconsistent cleaning and guest complaints.',
    action: 'Created a repeatable turnover system with consistent expectations.',
    result: 'More reliable cleanings and fewer issues between guests.',
  },
  {
    title: 'Partial cleaning, reduced cost',
    situation: "Client didn't need full cleaning and didn't want to pay for it.",
    action: 'Built a custom plan focused only on key areas.',
    result: 'Lower cost and better satisfaction.',
  },
  {
    title: 'Property management support',
    situation: 'Manager needed flexible help across different units and situations.',
    action: 'Handled a mix of jobs while maintaining consistent communication.',
    result: 'Less oversight required and smoother operations.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Real clients, real situations</h2>
        <p className="text-gray-600 mb-10">A few examples of the kinds of work we do and how we approach it.</p>
        <div className="space-y-6">
          {cases.map((c) => (
            <div key={c.title} className="border border-light-gray rounded-md p-6">
              <p className="font-semibold text-navy mb-4">{c.title}</p>
              <div className="space-y-2 text-sm">
                {[['Situation', c.situation], ['What we did', c.action], ['Result', c.result]].map(([label, text]) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-gray-400 w-24 flex-shrink-0">{label}</span>
                    <span className="text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-8">More testimonials coming soon.</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Mount in /clean page**

```tsx
import Promotions from '@/components/clean/Promotions'
import Testimonials from '@/components/clean/Testimonials'
// after <Pricing />:
<Promotions />
<Testimonials />
```

- [ ] **Step 4: Verify**

http://localhost:3000/clean — five ways to save, then three case study cards with Situation/What we did/Result rows.

- [ ] **Step 5: Commit**

```bash
git add components/clean/Promotions.tsx components/clean/Testimonials.tsx app/clean/page.tsx
git commit -m "feat: add Promotions and Testimonials sections"
```

---

## Task 9: ServiceArea + About + FinalCTA + Footer

**Files:** `components/clean/ServiceArea.tsx`, `components/clean/About.tsx`, `components/clean/FinalCTA.tsx`, `components/clean/Footer.tsx`

- [ ] **Step 1: Create ServiceArea**

Create `components/clean/ServiceArea.tsx`:
```tsx
interface ServiceAreaProps { onQuoteClick: () => void }

export default function ServiceArea({ onQuoteClick }: ServiceAreaProps) {
  return (
    <section className="py-16 px-6 bg-off-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Service area</h2>
        <p className="text-gray-600 mb-2">Serving Greater Boston and surrounding areas.</p>
        <p className="text-gray-600 mb-6">Apartments, high-rises, offices, and multi-unit properties welcome.</p>
        <button onClick={onQuoteClick} className="text-brand-blue font-medium hover:underline">
          Not sure if you&apos;re in range? Just ask →
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create About**

Create `components/clean/About.tsx`:
```tsx
export default function About() {
  return (
    <section className="py-16 px-6 bg-white border-t border-light-gray">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">A family business, rebuilt for today</h2>
        <div className="space-y-4 text-gray-600">
          <p>Brazusa Cleaning started in 1994 when our mother began cleaning homes. After years of informal work, the business became official in the early 2000s when our father joined after being laid off during the housing crisis.</p>
          <p>Since then, we&apos;ve grown into a team serving both residential and commercial clients — while keeping the same level of care and attention to detail.</p>
          <p>Today, the business is being modernized by the next generation. We&apos;re building on that foundation — keeping the quality, while improving everything around it.</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create FinalCTA**

Create `components/clean/FinalCTA.tsx`:
```tsx
interface FinalCTAProps { onQuoteClick: () => void }

export default function FinalCTA({ onQuoteClick }: FinalCTAProps) {
  return (
    <section className="py-20 px-6 bg-navy text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Tell us what you need</h2>
        <p className="text-white/70 mb-8">Send us a quick message, or give us as much detail as you want. Either way, we&apos;ll take it from there.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={onQuoteClick}
            className="bg-brand-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors"
          >
            Request a Quote
          </button>
          <a
            href="tel:+16175550000"
            className="border border-white/50 text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors"
          >
            Call / Text Us
          </a>
        </div>
        <p className="text-sm text-white/40">Even if we&apos;re not the right fit, we&apos;ll help you find someone who is.</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create Footer**

Create `components/clean/Footer.tsx`:
```tsx
const serviceLinks = [
  { label: 'Painting', href: '/painting' },
  { label: 'Construction', href: '/construction' },
  { label: 'Roofing', href: '/roofing' },
  { label: 'Tiling', href: '/tiling' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60 py-12 px-6 border-t border-white/10">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div>
            <p className="text-white font-semibold mb-2">Brazusa Cleaning</p>
            <p className="text-sm">Greater Boston &amp; surrounding areas</p>
            <a href="tel:+16175550000" className="text-sm hover:text-white transition-colors block mt-1">Call / Text Us</a>
            <a href="mailto:info@brazusa.com" className="text-sm hover:text-white transition-colors block mt-1">info@brazusa.com</a>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">More Services</p>
            <p className="text-sm mb-3">Need more than cleaning?</p>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-xs text-white/30 border-t border-white/10 pt-6">
          © {new Date().getFullYear()} Brazusa Cleaning. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Mount in /clean page**

```tsx
import ServiceArea from '@/components/clean/ServiceArea'
import About from '@/components/clean/About'
import FinalCTA from '@/components/clean/FinalCTA'
import Footer from '@/components/clean/Footer'
// after <Testimonials />:
<ServiceArea onQuoteClick={openDrawer} />
<About />
<FinalCTA onQuoteClick={openDrawer} />
<Footer />
```

- [ ] **Step 6: Verify**

http://localhost:3000/clean — full page scrolls end-to-end. Footer links to service pages load blank pages without errors.

- [ ] **Step 7: Commit**

```bash
git add components/clean/ServiceArea.tsx components/clean/About.tsx components/clean/FinalCTA.tsx components/clean/Footer.tsx app/clean/page.tsx
git commit -m "feat: add ServiceArea, About, FinalCTA, and Footer"
```

---

## Task 10: QuoteDrawer

**Files:** `components/clean/QuoteDrawer.tsx`

- [ ] **Step 1: Create QuoteDrawer**

Create `components/clean/QuoteDrawer.tsx`:
```tsx
'use client'

import { useState, useRef } from 'react'

type FormStep = 'base' | 'detailed'
type Outcome = 'contact' | 'quote' | 'schedule'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const [step, setStep] = useState<FormStep>('base')
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [spaceType, setSpaceType] = useState('')
  const [notes, setNotes] = useState('')
  const [outcome, setOutcome] = useState<Outcome>('contact')
  const [rooms, setRooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [cleanLevel, setCleanLevel] = useState('')
  const [frequency, setFrequency] = useState('')
  const [focusAreas, setFocusAreas] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [address, setAddress] = useState('')
  const [preferredDays, setPreferredDays] = useState<string[]>([])
  const [timeOfDay, setTimeOfDay] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const toggleDay = (day: string) =>
    setPreferredDays((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day])

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) {
      setError('Please add your name and a way to reach you.')
      return
    }
    setError('')
    console.log({ name, contact, contactMethod, spaceType, notes, outcome,
      ...(step === 'detailed' && { rooms, bathrooms, cleanLevel, frequency, focusAreas, files }),
      ...(outcome === 'schedule' && { address, preferredDays, timeOfDay }) })
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-navy">
              {submitted ? 'Thanks!' : step === 'base' ? 'Get a Quote' : 'Tell us more'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <p className="text-gray-700 mb-2">We&apos;ll be in touch shortly.</p>
              <p className="text-sm text-gray-500">If you need us sooner, call or text us directly.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Name <span className="text-brand-red">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
                    placeholder="Your name" />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Phone or Email <span className="text-brand-red">*</span></label>
                  <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
                    placeholder="Phone number or email address" />
                </div>

                {/* Contact method */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Preferred contact method</label>
                  <div className="flex gap-4">
                    {(['phone', 'email'] as const).map((m) => (
                      <label key={m} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="contactMethod" value={m} checked={contactMethod === m}
                          onChange={() => setContactMethod(m)} className="accent-brand-blue" />
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Space type */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Type of space</label>
                  <select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}
                    className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue bg-white">
                    <option value="">Select...</option>
                    <option value="apartment">Apartment / Home</option>
                    <option value="str">Short-Term Rental</option>
                    <option value="office">Office / Clinic</option>
                    <option value="property">Property / Building</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Notes or questions</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue resize-none"
                    rows={3} placeholder="Anything relevant — no detail too small" />
                </div>

                {/* Outcome */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">What are you looking for?</label>
                  <div className="space-y-2">
                    {([
                      { value: 'contact' as Outcome, label: 'Just contact me' },
                      { value: 'quote' as Outcome, label: "I'd like a rough quote" },
                      { value: 'schedule' as Outcome, label: "I'd like to schedule an estimate" },
                    ]).map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="outcome" value={opt.value} checked={outcome === opt.value}
                          onChange={() => setOutcome(opt.value)} className="accent-brand-blue" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Scheduling fields — conditional */}
                {outcome === 'schedule' && (
                  <div className="bg-off-white border border-light-gray rounded-md p-4 space-y-4">
                    <p className="text-sm font-medium text-navy">Scheduling details</p>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Address or neighborhood</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-light-gray rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue"
                        placeholder="e.g. South End, Boston" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Preferred days</label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <button key={day} type="button" onClick={() => toggleDay(day)}
                            className={`px-3 py-1 text-xs rounded border transition-colors ${
                              preferredDays.includes(day)
                                ? 'bg-brand-blue text-white border-brand-blue'
                                : 'border-light-gray text-gray-600 hover:border-brand-blue'
                            }`}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">Preferred time of day</label>
                      <div className="flex gap-4">
                        {['Morning', 'Afternoon', 'Evening'].map((t) => (
                          <label key={t} className="flex items-center gap-1 text-sm cursor-pointer">
                            <input type="radio" name="timeOfDay" value={t} checked={timeOfDay === t}
                              onChange={() => setTimeOfDay(t)} className="accent-brand-blue" />
                            {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed fields */}
              {step === 'detailed' && (
                <div className="space-y-4 mt-4 pt-4 border-t border-light-gray">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Number of rooms</label>
                    <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)}
                      className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
                      placeholder="e.g. 3 bedrooms" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Number of bathrooms</label>
                    <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
                      placeholder="e.g. 2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Level of cleaning needed</label>
                    <select value={cleanLevel} onChange={(e) => setCleanLevel(e.target.value)}
                      className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue bg-white">
                      <option value="">Select...</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="heavy">Heavy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Frequency</label>
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
                      className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue bg-white">
                      <option value="">Select...</option>
                      <option value="one-time">One-time</option>
                      <option value="recurring">Recurring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Areas or tasks to focus on</label>
                    <textarea value={focusAreas} onChange={(e) => setFocusAreas(e.target.value)}
                      className="w-full border border-light-gray rounded-md px-4 py-2 text-sm focus:outline-none focus:border-brand-blue resize-none"
                      rows={3} placeholder="e.g. kitchen and bathrooms only, or just deep clean the oven" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Photos or videos (optional)</label>
                    <input ref={fileRef} type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} className="hidden" />
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="w-full border border-dashed border-light-gray rounded-md px-4 py-3 text-sm text-gray-500 hover:border-brand-blue hover:text-brand-blue transition-colors">
                      Click to upload — any file type welcome
                    </button>
                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((f, i) => <li key={i} className="text-xs text-gray-500">{f.name}</li>)}
                      </ul>
                    )}
                  </div>
                  <button type="button" onClick={() => setStep('base')} className="text-sm text-gray-400 hover:text-gray-600">
                    ← Back to simple form
                  </button>
                </div>
              )}

              {step === 'base' && (
                <button type="button" onClick={() => setStep('detailed')}
                  className="block text-sm text-brand-blue hover:underline mt-4">
                  Want a more accurate virtual quote? Tell us more →
                </button>
              )}

              {error && <p className="text-sm text-brand-red mt-4">{error}</p>}

              <button onClick={handleSubmit}
                className="w-full bg-brand-blue text-white py-3 rounded-md font-semibold hover:bg-blue-500 transition-colors mt-6">
                Submit Request
              </button>
              <p className="text-xs text-center text-gray-400 mt-3">
                Prefer to talk? <a href="tel:+16175550000" className="underline">Call or text us directly.</a>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Mount QuoteDrawer in /clean page**

Add to `app/clean/page.tsx`, after `<Footer />` and before the closing `</main>`:
```tsx
import QuoteDrawer from '@/components/clean/QuoteDrawer'

<QuoteDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
```

- [ ] **Step 3: Verify base form**

http://localhost:3000/clean — click "Request a Quote". Overlay and drawer appear from the bottom. Base fields visible. Click × or overlay — drawer closes.

- [ ] **Step 4: Verify detailed form**

Click "Want a more accurate virtual quote? Tell us more →". Detailed fields appear. Upload any file — filename appears in list. "← Back to simple form" returns to base view.

- [ ] **Step 5: Verify scheduling fields**

Select "I'd like to schedule an estimate". Address, day buttons, and time radio appear. Toggle days — blue indicates selected.

- [ ] **Step 6: Verify validation and success**

Submit with empty fields — error message appears. Fill name + contact, submit — success message replaces form.

- [ ] **Step 7: Commit**

```bash
git add components/clean/QuoteDrawer.tsx app/clean/page.tsx
git commit -m "feat: add QuoteDrawer with base/detailed form, scheduling, and success state"
```

---

## Task 11: StickyNav

**Files:** `components/StickyNav.tsx`, `components/clean/Hero.tsx` (ref update already done in Task 3)

- [ ] **Step 1: Create StickyNav**

Create `components/StickyNav.tsx`:
```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface StickyNavProps {
  heroRef: React.RefObject<HTMLElement>
  onQuoteClick: () => void
}

export default function StickyNav({ heroRef, onQuoteClick }: StickyNavProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = heroRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [heroRef])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-light-gray transition-all duration-200 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
    }`}>
      <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
        <Image src="/logo.jpg" alt="Brazusa Cleaning" width={120} height={40} className="h-9 w-auto object-contain" />
        <button
          onClick={onQuoteClick}
          className="bg-brand-blue text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          Get a Quote
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Mount StickyNav in /clean page**

In `app/clean/page.tsx`, add before `<Hero>` inside `<main>`:
```tsx
import StickyNav from '@/components/StickyNav'

// heroRef is already declared; add StickyNav as the first child of <main>:
<StickyNav heroRef={heroRef} onQuoteClick={openDrawer} />
```

- [ ] **Step 3: Verify**

http://localhost:3000/clean — on load, sticky nav is invisible. Scroll down past the hero — nav fades in at the top. "Get a Quote" in the nav opens the drawer. Scroll back up — nav disappears.

- [ ] **Step 4: Commit**

```bash
git add components/StickyNav.tsx app/clean/page.tsx
git commit -m "feat: add StickyNav with IntersectionObserver scroll trigger"
```

---

## Task 12: Manual testing pass

No code changes — verification only.

- [ ] **Full scroll** — http://localhost:3000/clean, scroll top to bottom. All 13 sections render in order, no layout breaks.
- [ ] **Client selector anchors** — click each of the four rows. Verify smooth scroll to STR, Property, Offices, Homes sections.
- [ ] **Sticky nav** — scroll past hero (appears), click "Get a Quote" (drawer opens), scroll back to top (disappears).
- [ ] **Drawer: validation** — open drawer, click Submit with empty fields. Error message appears.
- [ ] **Drawer: submit** — fill name + contact, submit. Success state shown.
- [ ] **Drawer: detailed form** — click expand link. Detailed fields appear. Upload a file (any type). Filename shown. Back link returns to base.
- [ ] **Drawer: scheduling** — select "Schedule an estimate" in base and detailed step. Address + days + time appear in both.
- [ ] **Mobile layout** — DevTools → iPhone viewport (390px). Hero headline wraps, CTAs stack, drawer is scrollable, no horizontal overflow.
- [ ] **Commit**

```bash
git add .
git commit -m "chore: complete manual testing pass for /clean page"
```

---

## Pre-launch checklist (out of scope for this plan, do before going live)

- Replace all `tel:+16175550000` with the real phone number (Hero, FinalCTA, Footer, QuoteDrawer)
- Replace `info@brazusa.com` with the real email
- Fill in pricing ranges (`$X – $Y`) in Pricing component
- Add real testimonial quotes to Testimonials component
- Wire up form submission to an email service (Formspree, EmailJS, or similar)
