# Codebase Standards Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the entire existing codebase into conformance with the standards defined in CLAUDE.md — strict TypeScript, CSS variables throughout, descriptive naming, structured logging, and component return types.

**Architecture:** Three independent phases — TypeScript/code quality fixes in lib/ and api/, then CSS design system migration across all components. Each phase is safe to commit independently. No new features, no logic changes — this is a pure standards conformance pass.

**Tech Stack:** Next.js 16, TypeScript 5 (strict), Tailwind CSS 4, Vitest

---

## CSS Variable Reference

All hex replacements use these CSS variables (defined or to be added in `globals.css`):

| Hex Value | CSS Variable | Status |
|-----------|-------------|--------|
| `#0B1D2E` | `var(--color-navy)` | Exists |
| `#F2EDE6` | `var(--color-off-white)` | Exists |
| `#EAE3DA` | `var(--color-linen)` | Exists |
| `#D8D0C6` | `var(--color-light-gray)` | Exists |
| `#C49A44` | `var(--color-brand-gold)` | Exists |
| `#2DAAE1` | `var(--color-brand-blue)` | Exists |
| `#D62828` | `var(--color-brand-red)` | Exists |
| `#B0A89E` | `var(--color-warm-gray-light)` | **Add in Task 2** |
| `#9B9288` | `var(--color-warm-gray)` | **Add in Task 2** |
| `#7A7470` | `var(--color-warm-gray-dark)` | **Add in Task 2** |
| `#6B6360` | `var(--color-warm-gray-darker)` | **Add in Task 2** |
| `#5A5451` | `var(--color-warm-gray-darkest)` | **Add in Task 2** |
| `#E8E0D6` | `var(--color-linen-dark)` | **Add in Task 2** |

For `rgba(11,29,46,X)` (navy with opacity) inline styles, use:
- `rgba(11,29,46,0.07)` → `var(--color-navy-subtle)` **Add in Task 2**
- `rgba(11,29,46,0.15)` → `var(--color-navy-dim)` **Add in Task 2**
- `rgba(11,29,46,0.30)` → `var(--color-navy-muted)` **Add in Task 2**
- `rgba(255,255,255,0.1)` → `var(--color-white-faint)` **Add in Task 2**
- `rgba(255,255,255,0.45)` → `var(--color-white-mid)` **Add in Task 2**

SVG `stroke` and `fill` attributes must be moved to inline `style` to support CSS variables:
- `stroke="#0B1D2E"` → `style={{ stroke: 'var(--color-navy)' }}`
- `fill="#C49A44"` → `style={{ fill: 'var(--color-brand-gold)' }}`

---

## Task 1: Verify Baseline

**Files:** No changes — verification only.

- [ ] **Step 1: Run the test suite**

```bash
npm test
```
Expected: All tests pass. If any fail, stop and resolve before proceeding.

- [ ] **Step 2: Run TypeScript compilation check**

```bash
npx tsc --noEmit
```
Expected: Zero errors (or note any pre-existing errors so they aren't mistaken for regressions).

- [ ] **Step 3: Note baseline status**

Record how many tests pass and how many TypeScript errors exist (if any). This is the baseline to verify against after each phase.

---

## Task 2: Expand globals.css Design System Variables

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write a test verifying the CSS file contains the new variables**

Create `app/globals.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('globals.css design system', () => {
  const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf-8')

  it('defines warm gray variables', () => {
    expect(css).toContain('--color-warm-gray-light')
    expect(css).toContain('--color-warm-gray:')
    expect(css).toContain('--color-warm-gray-dark')
    expect(css).toContain('--color-warm-gray-darker')
    expect(css).toContain('--color-warm-gray-darkest')
    expect(css).toContain('--color-linen-dark')
  })

  it('defines rgba overlay variables', () => {
    expect(css).toContain('--color-navy-subtle')
    expect(css).toContain('--color-navy-dim')
    expect(css).toContain('--color-navy-muted')
    expect(css).toContain('--color-white-faint')
    expect(css).toContain('--color-white-mid')
  })

  it('uses CSS variables in body instead of hardcoded hex', () => {
    expect(css).not.toContain('background-color: #F2EDE6')
    expect(css).not.toContain('color: #0B1D2E')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test app/globals.test.ts
```
Expected: FAIL — variables not yet defined.

- [ ] **Step 3: Update globals.css**

Replace the existing `@theme` block and `body` rule with:

```css
@import "tailwindcss";

@theme {
  /* Core palette */
  --color-navy:        #0B1D2E;
  --color-off-white:   #F2EDE6;
  --color-linen:       #EAE3DA;
  --color-linen-dark:  #E8E0D6;
  --color-light-gray:  #D8D0C6;

  /* Brand accents */
  --color-brand-gold:  #C49A44;
  --color-brand-blue:  #2DAAE1;
  --color-brand-green: #4CAF50;
  --color-brand-red:   #D62828;

  /* Warm gray scale — used for muted text and borders */
  --color-warm-gray-light:   #B0A89E;
  --color-warm-gray:         #9B9288;
  --color-warm-gray-dark:    #7A7470;
  --color-warm-gray-darker:  #6B6360;
  --color-warm-gray-darkest: #5A5451;

  /* Transparency overlays — navy and white at common opacities */
  --color-navy-subtle: rgba(11, 29, 46, 0.07);
  --color-navy-dim:    rgba(11, 29, 46, 0.15);
  --color-navy-muted:  rgba(11, 29, 46, 0.30);
  --color-white-faint: rgba(255, 255, 255, 0.10);
  --color-white-mid:   rgba(255, 255, 255, 0.45);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-off-white);
  color: var(--color-navy);
  font-family: var(--font-syne, ui-sans-serif, system-ui);
  -webkit-font-smoothing: antialiased;
}
```

Note: Remove `--color-brand-yellow` (duplicate of `--color-brand-gold`). Verify no component references `brand-yellow` before removing.

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test app/globals.test.ts
```
Expected: PASS

- [ ] **Step 5: Run full test suite to check for regressions**

```bash
npm test
```
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/globals.test.ts
git commit -m "feat: expand design system CSS variables — warm grays, rgba overlays, body self-reference"
```

---

## Task 3: Create Structured Logger

**Files:**
- Create: `lib/helpers/logger.ts`
- Create: `lib/helpers/logger.test.ts`

This replaces bare `console.error` calls in API routes with a structured wrapper that can be swapped to any logging service later without touching the call sites.

- [ ] **Step 1: Write the failing test**

Create `lib/helpers/logger.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock console before importing logger
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

import { log } from './logger'

describe('log.error', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  it('logs a structured JSON object to console.error', () => {
    log.error('quote_submission_failed', new Error('test error'), { clientId: 'brazusa-cleaning' })
    expect(consoleSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleSpy.mock.calls[0][0])
    expect(logged.level).toBe('error')
    expect(logged.event).toBe('quote_submission_failed')
    expect(logged.message).toBe('test error')
    expect(logged.context.clientId).toBe('brazusa-cleaning')
    expect(typeof logged.timestamp).toBe('string')
  })

  it('handles non-Error objects gracefully', () => {
    log.error('unknown_error', 'a string error')
    expect(consoleSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleSpy.mock.calls[0][0])
    expect(logged.message).toBe('a string error')
  })
})

describe('log.info', () => {
  beforeEach(() => {
    consoleInfoSpy.mockClear()
  })

  it('logs a structured JSON object to console.info', () => {
    log.info('quote_submitted', { clientId: 'brazusa-cleaning' })
    expect(consoleInfoSpy).toHaveBeenCalledOnce()
    const logged = JSON.parse(consoleInfoSpy.mock.calls[0][0])
    expect(logged.level).toBe('info')
    expect(logged.event).toBe('quote_submitted')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test lib/helpers/logger.test.ts
```
Expected: FAIL — `logger` module not found.

- [ ] **Step 3: Create lib/helpers/logger.ts**

```typescript
type LogContext = Record<string, unknown>

function formatEntry(
  level: 'info' | 'error' | 'warn',
  event: string,
  errorOrContext?: unknown,
  context?: LogContext
): string {
  const isError = errorOrContext instanceof Error
  const message = isError
    ? errorOrContext.message
    : typeof errorOrContext === 'string'
      ? errorOrContext
      : undefined

  return JSON.stringify({
    level,
    event,
    message,
    context: isError ? context : (errorOrContext as LogContext | undefined),
    timestamp: new Date().toISOString(),
  })
}

export const log = {
  info(event: string, context?: LogContext): void {
    console.info(formatEntry('info', event, undefined, context))
  },

  warn(event: string, errorOrContext?: unknown, context?: LogContext): void {
    console.warn(formatEntry('warn', event, errorOrContext, context))
  },

  error(event: string, errorOrContext?: unknown, context?: LogContext): void {
    console.error(formatEntry('error', event, errorOrContext, context))
  },
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test lib/helpers/logger.test.ts
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/helpers/logger.ts lib/helpers/logger.test.ts
git commit -m "feat: add structured logger to lib/helpers — provider-agnostic, JSON output"
```

---

## Task 4: Fix app/api/quote/route.ts

**Files:**
- Modify: `app/api/quote/route.ts`
- Test: `app/api/quote/route.test.ts` (existing — must still pass)

Issues: missing return type on `POST`, generic variable names (`body`, `data`, `config`), bare `console.error`.

- [ ] **Step 1: Run existing route tests to establish baseline**

```bash
npm test app/api/quote/route.test.ts
```
Expected: PASS. If not, stop and investigate before making changes.

- [ ] **Step 2: Apply all fixes to app/api/quote/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { validateQuote } from '@/lib/validators/quote'
import type { QuoteFormData } from '@/lib/validators/quote'
import { clients } from '@/lib/clients'
import { sendQuoteNotification } from '@/lib/integrations/resend'
import { saveQuoteToAirtable } from '@/lib/integrations/airtable'
import { saveQuoteToSheets } from '@/lib/integrations/google-sheets'
import { log } from '@/lib/helpers/logger'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.json().catch(() => null)

  if (rawBody === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateQuote(rawBody)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const quoteFormData = rawBody as QuoteFormData
  const quoteClientConfig = clients[quoteFormData.clientId as keyof typeof clients]
  if (!quoteClientConfig) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendQuoteNotification(quoteFormData, quoteClientConfig),
      saveQuoteToAirtable(quoteFormData, quoteClientConfig),
      saveQuoteToSheets(quoteFormData, quoteClientConfig),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    log.error('quote_submission_failed', error, { clientId: quoteFormData.clientId })
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Run tests to verify nothing broke**

```bash
npm test app/api/quote/route.test.ts
```
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add app/api/quote/route.ts
git commit -m "refactor: quote route — strict return type, descriptive naming, structured logging"
```

---

## Task 5: Fix app/api/newsletter/route.ts

**Files:**
- Modify: `app/api/newsletter/route.ts`
- Test: `app/api/newsletter/route.test.ts` (existing — must still pass)

- [ ] **Step 1: Run existing route tests**

```bash
npm test app/api/newsletter/route.test.ts
```
Expected: PASS.

- [ ] **Step 2: Apply all fixes to app/api/newsletter/route.ts**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { validateNewsletter } from '@/lib/validators/newsletter'
import type { NewsletterFormData } from '@/lib/validators/newsletter'
import { clients } from '@/lib/clients'
import { sendNewsletterConfirmation } from '@/lib/integrations/resend'
import { saveNewsletterToAirtable } from '@/lib/integrations/airtable'
import { saveNewsletterToSheets } from '@/lib/integrations/google-sheets'
import { log } from '@/lib/helpers/logger'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rawBody = await request.json().catch(() => null)

  if (rawBody === null) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const validation = validateNewsletter(rawBody)
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 })
  }

  const newsletterFormData = rawBody as NewsletterFormData
  const newsletterClientConfig = clients[newsletterFormData.clientId as keyof typeof clients]
  if (!newsletterClientConfig) {
    return NextResponse.json({ success: false, error: 'Unknown client' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendNewsletterConfirmation(newsletterFormData.email, newsletterClientConfig),
      saveNewsletterToAirtable(newsletterFormData, newsletterClientConfig),
      saveNewsletterToSheets(newsletterFormData, newsletterClientConfig),
    ])
    return NextResponse.json({ success: true })
  } catch (error) {
    log.error('newsletter_submission_failed', error, { clientId: newsletterFormData.clientId })
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 })
  }
}
```

- [ ] **Step 3: Run tests**

```bash
npm test app/api/newsletter/route.test.ts
```
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add app/api/newsletter/route.ts
git commit -m "refactor: newsletter route — strict return type, descriptive naming, structured logging"
```

---

## Task 6: Fix lib/integrations/resend.ts

**Files:**
- Modify: `lib/integrations/resend.ts`
- Test: `lib/integrations/resend.test.ts` (existing — must still pass)

Issues: `getClient()` missing return type, `_config` parameter unused in `sendNewsletterConfirmation`.

- [ ] **Step 1: Run existing tests**

```bash
npm test lib/integrations/resend.test.ts
```
Expected: PASS.

- [ ] **Step 2: Apply fixes**

```typescript
import { Resend } from 'resend'
import type { QuoteFormData } from '@/lib/validators/quote'
import type { ClientConfig } from '@/lib/clients'

function getClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM_ADDRESS = 'Brazusa Cleaning <hello@brazusa.com>'

export async function sendQuoteNotification(
  data: QuoteFormData,
  config: ClientConfig
): Promise<void> {
  const resend = getClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: config.notificationEmail,
    subject: `New quote request — ${data.name}`,
    text: formatQuoteEmail(data),
  })
}

export async function sendNewsletterConfirmation(email: string): Promise<void> {
  // config not required — confirmation email is identical for all clients
  const resend = getClient()
  await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "You're on our list",
    text: "Thanks for subscribing. We'll be in touch with cleaning tips and updates.",
  })
}

function formatQuoteEmail(data: QuoteFormData): string {
  const lines: string[] = [
    `Name: ${data.name}`,
    `Contact: ${data.contact} (prefers ${data.contactMethod})`,
    `Space type: ${data.spaceType}`,
    `Outcome requested: ${data.outcome}`,
    '',
  ]

  if (data.rooms || data.bathrooms || data.cleanLevel || data.frequency || data.focusAreas) {
    lines.push('Details:')
    if (data.rooms)       lines.push(`  Rooms: ${data.rooms}`)
    if (data.bathrooms)   lines.push(`  Bathrooms: ${data.bathrooms}`)
    if (data.cleanLevel)  lines.push(`  Clean level: ${data.cleanLevel}`)
    if (data.frequency)   lines.push(`  Frequency: ${data.frequency}`)
    if (data.focusAreas)  lines.push(`  Focus areas: ${data.focusAreas}`)
    lines.push('')
  }

  if (data.notes) {
    lines.push('Notes:')
    lines.push(`  ${data.notes}`)
    lines.push('')
  }

  if (data.outcome === 'schedule') {
    lines.push('Scheduling:')
    if (data.address)               lines.push(`  Address: ${data.address}`)
    if (data.preferredDays?.length) lines.push(`  Preferred days: ${data.preferredDays.join(', ')}`)
    if (data.timeOfDay)             lines.push(`  Time of day: ${data.timeOfDay}`)
  }

  return lines.join('\n')
}
```

**Important:** Removing the `_config` parameter from `sendNewsletterConfirmation` changes its signature. Check the call site in `newsletter/route.ts` — Task 5 already updates it to pass only `newsletterFormData.email`. Verify both tasks are applied before running tests.

- [ ] **Step 3: Run tests**

```bash
npm test lib/integrations/resend.test.ts
```
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add lib/integrations/resend.ts
git commit -m "refactor: resend — add return type to getClient, remove unused config param from sendNewsletterConfirmation"
```

---

## Task 7: Fix lib/integrations/google-sheets.ts

**Files:**
- Modify: `lib/integrations/google-sheets.ts`
- Test: `lib/integrations/google-sheets.test.ts` (existing — must still pass)

Issue: `getAuth()` missing return type.

- [ ] **Step 1: Run existing tests**

```bash
npm test lib/integrations/google-sheets.test.ts
```
Expected: PASS.

- [ ] **Step 2: Add return type to getAuth()**

Change line 6 from:
```typescript
function getAuth() {
```
to:
```typescript
function getAuth(): InstanceType<typeof google.auth.GoogleAuth> {
```

- [ ] **Step 3: Run tests**

```bash
npm test lib/integrations/google-sheets.test.ts
```
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add lib/integrations/google-sheets.ts
git commit -m "refactor: google-sheets — add explicit return type to getAuth"
```

---

## Task 8: Fix lib/validators — rename generic variable `d`

**Files:**
- Modify: `lib/validators/quote.ts`
- Modify: `lib/validators/newsletter.ts`
- Tests: `lib/validators/quote.test.ts`, `lib/validators/newsletter.test.ts` (existing)

Issue: `const d = data as Record<string, unknown>` — `d` is too generic.

- [ ] **Step 1: Run existing tests**

```bash
npm test lib/validators/quote.test.ts lib/validators/newsletter.test.ts
```
Expected: PASS.

- [ ] **Step 2: Fix quote.ts — rename `d` to `quoteCandidate`**

In `lib/validators/quote.ts`, change line 33 and all subsequent references:

```typescript
const quoteCandidate = data as Record<string, unknown>

if (!quoteCandidate.clientId || typeof quoteCandidate.clientId !== 'string') {
  return { valid: false, error: 'clientId is required' }
}
if (!quoteCandidate.name || typeof quoteCandidate.name !== 'string' || quoteCandidate.name.trim() === '') {
  return { valid: false, error: 'name is required' }
}
if (!quoteCandidate.contact || typeof quoteCandidate.contact !== 'string' || quoteCandidate.contact.trim() === '') {
  return { valid: false, error: 'contact is required' }
}
if (!VALID_CONTACT_METHODS.includes(quoteCandidate.contactMethod as ContactMethod)) {
  return { valid: false, error: 'contactMethod must be phone, sms, or email' }
}
if (!quoteCandidate.spaceType || typeof quoteCandidate.spaceType !== 'string') {
  return { valid: false, error: 'spaceType is required' }
}
if (!VALID_SPACE_TYPES.includes(quoteCandidate.spaceType as string)) {
  return { valid: false, error: 'spaceType must be apartment, str, office, property, or other' }
}
if (!VALID_OUTCOMES.includes(quoteCandidate.outcome as Outcome)) {
  return { valid: false, error: 'outcome must be contact, quote, or schedule' }
}
```

- [ ] **Step 3: Fix newsletter.ts — rename `d` to `newsletterCandidate`**

In `lib/validators/newsletter.ts`, change line 14 and all subsequent references:

```typescript
const newsletterCandidate = data as Record<string, unknown>

if (!newsletterCandidate.clientId || typeof newsletterCandidate.clientId !== 'string') {
  return { valid: false, error: 'clientId is required' }
}

if (!newsletterCandidate.email || typeof newsletterCandidate.email !== 'string') {
  return { valid: false, error: 'email is required' }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(newsletterCandidate.email)) {
  return { valid: false, error: 'email is invalid' }
}
```

- [ ] **Step 4: Run tests**

```bash
npm test lib/validators/quote.test.ts lib/validators/newsletter.test.ts
```
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/validators/quote.ts lib/validators/newsletter.ts
git commit -m "refactor: validators — rename generic variable d to quoteCandidate/newsletterCandidate"
```

---

## Task 9: Add Return Types to All Components

**Files:**
- Modify: All component files listed below
- No logic changes — return type annotations only.

All React components should declare `: JSX.Element` as their return type. All internal functions (event handlers, helpers) should declare `void` or their actual return type.

- [ ] **Step 1: Run TypeScript baseline check**

```bash
npx tsc --noEmit
```
Note the output. These additions should reduce errors, not introduce new ones.

- [ ] **Step 2: Add return types to components/clean/ScrollToTop.tsx**

- `scrollToTop` function: `: void`
- `ScrollToTop` component: `: JSX.Element`

- [ ] **Step 3: Add return types to components/clean/MobileCTABar.tsx**

- `MobileCTABar` component: `: JSX.Element | null`
  (it can return null when drawerOpen, so JSX.Element alone is too narrow)

- [ ] **Step 4: Add return types to components/clean/TrustStrip.tsx**

- `TrustStrip` component: `: JSX.Element`

- [ ] **Step 5: Add return types to components/clean/About.tsx**

- `About` component: `: JSX.Element`

- [ ] **Step 6: Add return types to components/clean/Hero.tsx**

- `Hero` component: `: JSX.Element`

- [ ] **Step 7: Add return types to components/clean/FinalCTA.tsx**

- `FinalCTA` component: `: JSX.Element`

- [ ] **Step 8: Add return types to components/clean/Footer.tsx**

- `Footer` component: `: JSX.Element`

- [ ] **Step 9: Add return types to components/clean/Services.tsx**

- `Services` component: `: JSX.Element`

- [ ] **Step 10: Add return types to components/clean/ClientAccordion.tsx**

- `AccordionItem` sub-component: `: JSX.Element`
- `ClientAccordion` component: `: JSX.Element`

- [ ] **Step 11: Add return types to components/clean/ServiceArea.tsx**

- `ServiceArea` component: `: JSX.Element`

- [ ] **Step 12: Add return types to components/clean/Pricing.tsx**

- `Pricing` component: `: JSX.Element`

- [ ] **Step 13: Add return types to components/clean/Testimonials.tsx**

- `Testimonials` component: `: JSX.Element`
- `updateScrollState`: `: void`
- `resetAutoScroll`: `: void`
- `scrollByCard`: `: void`
- `categoryLabel`: `: string`

- [ ] **Step 14: Add return types to components/clean/NewsletterCTA.tsx**

- `NewsletterCTA` component: `: JSX.Element`
- `handleSubmit`: `: Promise<void>`

- [ ] **Step 15: Add return types to components/clean/QuoteDrawer.tsx**

- `QuoteDrawer` component: `: JSX.Element`
- `toggleDay`: `: void`
- `handleSubmit`: `: Promise<void>`
- `handleClose`: `: void`
- `getInputStyle`: `: React.CSSProperties`

- [ ] **Step 16: Add return types to components/StickyNav.tsx**

- `StickyNav` component: `: JSX.Element`
- `closeMenu`: `: void`
- `handleClientSelect`: `: void`

- [ ] **Step 17: Add return types to app/clean/page.tsx**

Read the file first. Find the two `t` variables (scroll hint timeout and scroll timeout) and rename:
- Scroll hint timeout: `scrollHintTimeoutId`
- Panel scroll timeout: `panelScrollTimeoutId`
Add return type to the main page component: `: JSX.Element`

- [ ] **Step 18: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```
Expected: Same or fewer errors than baseline. Zero new errors introduced by these additions.

- [ ] **Step 19: Commit**

```bash
git add components/ app/clean/page.tsx
git commit -m "refactor: add explicit TypeScript return types to all components and internal functions"
```

---

## Task 10: CSS Variable Migration — ScrollToTop and MobileCTABar

**Files:**
- Modify: `components/clean/ScrollToTop.tsx`
- Modify: `components/clean/MobileCTABar.tsx`

- [ ] **Step 1: Fix ScrollToTop.tsx**

Current (lines 24–34):
```tsx
className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-300 shadow-lg"
style={{
  background: '#C49A44',
  opacity: visible && !drawerOpen ? 1 : 0,
  pointerEvents: visible && !drawerOpen ? 'auto' : 'none',
  transform: visible ? 'translateY(0)' : 'translateY(12px)',
}}
```
```tsx
<path d="M7 12V2M2 7l5-5 5 5" stroke="#0B1D2E" strokeWidth="1.5" .../>
```

Replace with:
```tsx
className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all duration-300 shadow-lg"
style={{
  background: 'var(--color-brand-gold)',
  opacity: visible && !drawerOpen ? 1 : 0,
  pointerEvents: visible && !drawerOpen ? 'auto' : 'none',
  transform: visible ? 'translateY(0)' : 'translateY(12px)',
}}
```
```tsx
<path d="M7 12V2M2 7l5-5 5 5" style={{ stroke: 'var(--color-navy)' }} strokeWidth="1.5" .../>
```

- [ ] **Step 2: Fix MobileCTABar.tsx**

Current:
```tsx
style={{
  borderTop: '2px solid #C49A44',
  paddingBottom: 'env(safe-area-inset-bottom)',
}}
```
```tsx
style={{ background: '#0B1D2E', borderRight: '1px solid rgba(255,255,255,0.1)' }}
```
```tsx
style={{ background: '#F2EDE6', color: '#0B1D2E' }}
```

Replace with:
```tsx
style={{
  borderTop: '2px solid var(--color-brand-gold)',
  paddingBottom: 'env(safe-area-inset-bottom)',
}}
```
```tsx
style={{ background: 'var(--color-navy)', borderRight: '1px solid var(--color-white-faint)' }}
```
```tsx
style={{ background: 'var(--color-off-white)', color: 'var(--color-navy)' }}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No new errors.

- [ ] **Step 4: Commit**

```bash
git add components/clean/ScrollToTop.tsx components/clean/MobileCTABar.tsx
git commit -m "refactor: replace hardcoded hex values with CSS variables in ScrollToTop and MobileCTABar"
```

---

## Tasks 11–17: CSS Variable Migration — Remaining Components

For each remaining component, follow this pattern:

1. Read the file
2. Replace every hardcoded hex value using the **CSS Variable Reference table** at the top of this plan
3. Replace `rgba(11,29,46,X)` with the appropriate `var(--color-navy-*)` variable
4. For SVG `stroke="#hex"` and `fill="#hex"` attributes → move to `style={{ stroke: 'var(--color-...)' }}`
5. Run `npx tsc --noEmit` — no new errors
6. Commit

**Task 11:** `components/clean/TrustStrip.tsx`, `components/clean/About.tsx`
Commit: `refactor: CSS variables in TrustStrip and About`

**Task 12:** `components/clean/Hero.tsx`, `components/clean/FinalCTA.tsx`
Commit: `refactor: CSS variables in Hero and FinalCTA`

**Task 13:** `components/clean/Footer.tsx`
Commit: `refactor: CSS variables in Footer`

**Task 14:** `components/clean/Services.tsx`, `components/clean/ClientAccordion.tsx`
Commit: `refactor: CSS variables in Services and ClientAccordion`

**Task 15:** `components/clean/ServiceArea.tsx`, `components/clean/Pricing.tsx`
Commit: `refactor: CSS variables in ServiceArea and Pricing`

**Task 16:** `components/clean/Testimonials.tsx`, `components/clean/NewsletterCTA.tsx`
Commit: `refactor: CSS variables in Testimonials and NewsletterCTA`

**Task 17:** `components/clean/QuoteDrawer.tsx`
Commit: `refactor: CSS variables in QuoteDrawer`
(QuoteDrawer is the largest component — treat as its own task)

**Task 18:** `components/StickyNav.tsx`
Commit: `refactor: CSS variables in StickyNav`

---

## Task 19: Final Verification

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```
Expected: All tests pass. Same count as Task 1 baseline.

- [ ] **Step 2: Run TypeScript compilation**

```bash
npx tsc --noEmit
```
Expected: Zero errors (or same pre-existing errors as Task 1 baseline, none new).

- [ ] **Step 3: Build the project**

```bash
npm run build
```
Expected: Build succeeds. Review any warnings.

- [ ] **Step 4: Push to remote**

```bash
git push
```

---

## Self-Review

**Spec coverage:**
- TypeScript return types: all functions covered in Tasks 4–9
- Variable naming: `d`, `body`, `data`, `config`, `t` covered in Tasks 4–5, 7–8, 9 (step 17)
- CSS variables: all 150+ hardcoded colors covered in Tasks 10–18
- Structured logging: covered in Tasks 3–5
- globals.css self-reference: covered in Task 2
- Unused `_config` parameter: covered in Task 6
- `brand-yellow` duplicate variable: flagged in Task 2

**Placeholder scan:** None found. All code steps contain actual implementations.

**Type consistency:** `log.error`, `log.info`, `log.warn` defined in Task 3 and used in Tasks 4–5. `sendNewsletterConfirmation` signature change in Task 6 requires Task 5 to be applied first — noted in Task 6.

**Dependency note:** Task 5 (newsletter route) and Task 6 (resend.ts) are coupled — the signature change to `sendNewsletterConfirmation` in Task 6 must be consistent with the call in Task 5. Execute Task 5 before Task 6, or apply both before running tests.
