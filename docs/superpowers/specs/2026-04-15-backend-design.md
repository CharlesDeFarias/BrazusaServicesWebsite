# Brazusa Cleaning — Backend Design Spec
**Created:** 2026-04-15
**Scope:** Form backend for `/clean` page — quote requests and newsletter signups
**Phase:** Phase 1 of a multi-tenant agency platform (Brazusa Services)

---

## Overview

Add a server-side backend to the existing Next.js project that handles two form submissions from the Brazusa Cleaning site:

1. **Quote requests** — from the QuoteDrawer component
2. **Newsletter signups** — from the NewsletterCTA component in the Footer

When either form is submitted, the backend does three things in parallel:
- Sends an email notification to the business owner via Resend
- Writes a row to an Airtable base
- Writes a row to a Google Sheets spreadsheet

The backend is designed from the start to support multiple clients (multi-tenant), so that future businesses added to the Brazusa Services network reuse the same integration code with only a config change.

File uploads (photos from the QuoteDrawer) are explicitly out of scope for Phase 1 and will be handled in a future iteration.

---

## Tech Stack

| Layer | Tool | Reason |
|---|---|---|
| API routes | Next.js App Router (`app/api/`) | Built into existing project, no separate server |
| Email | Resend | Simple API, 3,000 free emails/month, easy domain verification |
| Lead records | Airtable REST API | Operational lead management, per-client bases |
| Lead records | Google Sheets API (service account) | Paper trail, easy client sharing |
| Hosting | Vercel | Built for Next.js, automatic git deploys, free tier |
| Domain / email sender | SiteGround | DNS management, verified sending domain for Resend |
| Secrets | `.env.local` (local) + Vercel environment variables (production) | Keys never in codebase |

---

## Architecture

```
QuoteDrawer / NewsletterCTA (frontend)
        |
        | HTTP POST
        ↓
app/api/quote/route.ts
app/api/newsletter/route.ts
        |
        | reads client config from lib/clients/
        |
        ↓ Promise.all (parallel)
  ├── lib/integrations/resend.ts       → email notification to owner
  ├── lib/integrations/airtable.ts     → new row in client's Airtable base
  └── lib/integrations/google-sheets.ts → new row in client's spreadsheet
```

---

## File Structure

New files added to the existing project:

```
app/
  api/
    quote/
      route.ts          ← POST handler for QuoteDrawer submissions
    newsletter/
      route.ts          ← POST handler for newsletter signups

lib/
  clients/
    index.ts            ← client registry (maps clientId → config)
    brazusa-cleaning.ts ← Brazusa Cleaning client config
  integrations/
    resend.ts           ← email sending logic (shared across clients)
    airtable.ts         ← Airtable row writing logic (shared)
    google-sheets.ts    ← Google Sheets row writing logic (shared)
  validators/
    quote.ts            ← validates quote form fields
    newsletter.ts       ← validates newsletter form fields
```

No existing files are modified in Phase 1. The frontend forms (QuoteDrawer, NewsletterCTA) will have their submit handlers updated to POST to the new routes, but component structure stays the same.

---

## Client Config Pattern

Each client is defined by a config file in `lib/clients/`. Adding a new client requires only adding a new config file and registering it in `index.ts`.

```typescript
// lib/clients/brazusa-cleaning.ts
export const brazusaCleaningConfig = {
  clientId: 'brazusa-cleaning',
  notificationEmail: process.env.BRAZUSA_CLEANING_NOTIFICATION_EMAIL!,
  airtable: {
    baseId: process.env.BRAZUSA_CLEANING_AIRTABLE_BASE_ID!,
    quoteTable: 'Quote Requests',
    newsletterTable: 'Newsletter',
  },
  googleSheets: {
    spreadsheetId: process.env.BRAZUSA_CLEANING_SHEET_ID!,
    quoteSheet: 'Quote Requests',
    newsletterSheet: 'Newsletter',
  },
}
```

```typescript
// lib/clients/index.ts
import { brazusaCleaningConfig } from './brazusa-cleaning'

export const clients = {
  'brazusa-cleaning': brazusaCleaningConfig,
}

export type ClientConfig = typeof brazusaCleaningConfig
```

The API routes receive a `clientId` field in every form submission to look up the correct config. For Phase 1 this will always be `'brazusa-cleaning'`, but the pattern is in place for future clients.

---

## API Routes

### POST `/api/quote`

**Request body:**
```typescript
{
  clientId: string           // identifies which client config to use
  name: string               // required
  contact: string            // required — phone or email
  contactMethod: 'call' | 'sms' | 'email'
  spaceType: string          // apartment, str, office, property, other
  rooms?: string
  bathrooms?: string
  cleanLevel?: string
  frequency?: string
  focusAreas?: string
  notes?: string
  outcome: 'contact' | 'quote' | 'schedule'
  address?: string           // only when outcome = 'schedule'
  preferredDays?: string[]   // only when outcome = 'schedule'
  timeOfDay?: string         // only when outcome = 'schedule'
}
```

**Response:**
```typescript
{ success: true }                          // 200
{ success: false, error: string }          // 400 (validation) or 500 (integration failure)
```

**Behavior:**
1. Validate required fields (name, contact, contactMethod, spaceType, outcome)
2. Look up client config by `clientId`
3. Run all three integrations in parallel via `Promise.all`
4. If any integration fails, log the error server-side and return 500 — the frontend shows a generic error message
5. On success, return 200 — the frontend shows its existing success state

---

### POST `/api/newsletter`

**Request body:**
```typescript
{
  clientId: string   // required
  email: string      // required
  phone?: string     // optional
}
```

**Response:** Same shape as quote route.

**Behavior:** Same pattern — validate, look up config, write to Airtable + Sheets + send confirmation email via Resend.

---

## Integrations

### Resend (Email)

- Library: `resend` npm package
- Sending address: `hello@brazusacleaning.com` (verified via SiteGround DNS — one-time setup)
- Quote submissions: sends notification email to `notificationEmail` from client config
- Newsletter signups: sends a brief confirmation email to the subscriber

Email content for quote notifications:
```
Subject: New quote request — [client name]

Name: [name]
Contact: [contact] (prefers [contactMethod])
Space type: [spaceType]
Outcome requested: [outcome]

Details:
[rooms, bathrooms, cleanLevel, frequency, focusAreas if provided]

Notes:
[notes if provided]

Scheduling:
[address, preferredDays, timeOfDay if outcome = schedule]
```

---

### Airtable

- API: Airtable REST API (fetch, no library needed)
- Auth: Personal Access Token stored in `AIRTABLE_API_TOKEN` env var
- One base per client; base ID in client config

**`Quote Requests` table columns:**
| Column | Type | Notes |
|---|---|---|
| Name | Single line text | |
| Contact | Single line text | phone or email |
| Contact Method | Single select | call / sms / email |
| Space Type | Single select | |
| Rooms | Single line text | optional |
| Bathrooms | Single line text | optional |
| Clean Level | Single line text | optional |
| Frequency | Single line text | optional |
| Focus Areas | Long text | optional |
| Notes | Long text | optional |
| Outcome | Single select | contact / quote / schedule |
| Address | Single line text | optional |
| Preferred Days | Single line text | comma-separated |
| Time of Day | Single line text | optional |
| Submitted At | Date | auto-set by API route |

**`Newsletter` table columns:**
| Column | Type |
|---|---|
| Email | Email |
| Phone | Phone number |
| Subscribed At | Date |

---

### Google Sheets

- Library: `googleapis` npm package
- Auth: Service account (JSON credentials stored as base64 in `GOOGLE_SERVICE_ACCOUNT_KEY` env var)
- One spreadsheet per client; spreadsheet ID in client config

**Spreadsheet structure:**
- Tab 1: `Quote Requests` — columns mirror Airtable table above
- Tab 2: `Newsletter` — Email, Phone, Subscribed At

The service account email (generated during Google Cloud setup) must be granted **Editor** access to each client's spreadsheet. This is a one-time manual step per client.

---

## Environment Variables

### `.env.local` (local development — never committed to git)

```
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Airtable
AIRTABLE_API_TOKEN=patXXXXXXXXXXXXXX

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_KEY=<base64-encoded service account JSON>

# Brazusa Cleaning client config
BRAZUSA_CLEANING_NOTIFICATION_EMAIL=cddefari@gmail.com
BRAZUSA_CLEANING_AIRTABLE_BASE_ID=appXXXXXXXXXX
BRAZUSA_CLEANING_SHEET_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

These same variables are added to Vercel's Environment Variables settings panel before deploying. Vercel injects them at runtime — no code change needed between local and production.

---

## Frontend Changes

Two components need their submit handlers updated to POST to the new API routes:

1. **`QuoteDrawer.tsx`** — on submit, POST to `/api/quote` with form state + `clientId: 'brazusa-cleaning'`
2. **`NewsletterCTA.tsx`** — on submit, POST to `/api/newsletter` with email, phone + `clientId: 'brazusa-cleaning'`

Both components already have success and loading states. These will be wired to the actual API response instead of being hardcoded.

Error handling on the frontend: if the API returns a non-200 response, show a brief inline error message ("Something went wrong — please try calling or texting us directly.") with the phone number as a fallback.

---

## One-Time Setup Steps (Before First Deploy)

These are manual steps that happen once, outside of code:

1. **Resend** — Create account, verify sending domain via SiteGround DNS records, get API key
2. **Airtable** — Create base for Brazusa Cleaning, create two tables with correct columns, generate Personal Access Token
3. **Google Cloud** — Create project, enable Sheets API, create service account, download credentials JSON
4. **Google Sheets** — Create spreadsheet for Brazusa Cleaning, share it with the service account email, copy spreadsheet ID
5. **Vercel** — Connect GitHub repo, add all environment variables, deploy

---

## Out of Scope (Phase 1)

- File/photo uploads from the QuoteDrawer (Phase 2)
- Admin dashboard or CRM
- Client-facing portals
- Automated follow-up sequences
- SMS notifications
- Analytics or tracking
- Parent hub (brazusa.com) backend
- Stub page backends (painting, construction, roofing, tiling)
