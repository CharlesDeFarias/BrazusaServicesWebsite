# Brazusa Services Platform

A Next.js multi-client platform for service businesses. The first live implementation is the Brazusa Cleaning site at `/clean`.

Current production client:
- Brazusa Cleaning

Planned future clients:
- Primo construction
- Ze Jr tiling / ceramics
- additional Brazusa Services pages as separate client configs

The Brazusa implementation includes a live quote workflow and newsletter signup flow backed by Resend, Airtable, and Google Sheets.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/clean](http://localhost:3000/clean).

Useful verification commands:

```bash
npm run lint
npm run test
npm run build
```

On this Windows setup, `npm.cmd run ...` is the safer path when PowerShell blocks `npm.ps1`.

---

## Current App Shape

The repo is a platform, not a one-off site. Brazusa Cleaning is the only live page right now, but the structure is designed so future service businesses can live in the same app without sharing brand assets or page-specific copy.

High-level routes:
- `/clean` - live Brazusa Cleaning page
- `/construction`, `/painting`, `/roofing`, `/tiling` - scaffolded future client pages
- `/api/quote` and `/api/newsletter` - live form routes

Core code areas:
- `app/` - routes, layouts, API handlers
- `components/clean/` - Brazusa Cleaning UI components
- `lib/clients/` - client registry and per-client platform config
- `lib/copy/brazusa-cleaning/` - centralized Brazusa copy layer
- `lib/integrations/` - Resend, Airtable, Google Sheets
- `lib/validators/` - form validation logic and tests

---

## Brazusa Cleaning Page

Main entry:
- `app/clean/page.tsx`

Major page sections:
- Sticky navigation
- Hero
- Trust strip
- Positioning
- Client accordion
- Services
- How it works
- Pricing
- Testimonials
- Service area
- About
- Quick contact
- Final CTA
- Footer
- Quote drawer
- Scroll-to-top
- Mobile CTA bar

All Brazusa-specific components live in `components/clean/`.

The page now uses a real copy layer rather than relying only on hardcoded component strings:
- shared/default copy in `lib/copy/brazusa-cleaning/base.ts`
- segment overrides in `lib/copy/brazusa-cleaning/segments/`
- render-time resolution via `getCopy(activeSegment)`

---

## Forms And Integrations

Two live API routes are in production:

| Route | Source UI | Behavior |
|---|---|---|
| `POST /api/quote` | `QuoteDrawer` | validate, then write to 3 destinations in parallel |
| `POST /api/newsletter` | footer newsletter UI | validate, then write to 3 destinations in parallel |

Current destinations:
1. Resend
2. Airtable
3. Google Sheets

This repo treats those paths as high-risk. Integration changes are intentionally gated by repo workflow rules and should not be treated as casual refactor targets.

---

## Assets

Current content-image assets:
- `public/images/hero.webp`
- `public/images/str.webp`
- `public/images/property.webp`
- `public/images/office.webp`
- `public/images/home.webp`
- `public/images/team.webp`

Brand / icon assets:
- `public/brand/logo.jpg`
- `public/favicons/*`

Design-review evidence packs live separately under:
- `docs/working/design-review/desktop/`
- `docs/working/design-review/mobile/`

Those files are review inputs, not app assets.

---

## Testing

Tests are colocated with the code they verify:
- validators
- integrations
- selected app/helpers code

Framework:
- Vitest

Notes:
- external services are mocked in tests
- on this Windows environment, sandboxed runs can hit `spawn EPERM`, so a failing test/build command is not automatically an app failure until the error is classified

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the real values:

```bash
cp .env.example .env.local
```

Primary env categories:
- Resend API key
- Airtable API token + Brazusa base ID
- Google service account key + Sheet ID
- notification email target

`.env.local` is git-ignored and must never be committed.

---

## Documentation Map

Primary durable docs:
- `CLAUDE.md` - main project contract
- `AGENTS.md` - Codex-facing adapter plus shared repo rules
- `CODEX.md` - thin Codex-specific operating layer
- `docs/decisions.md` - locked AI-facing startup context
- `docs/session-log.md` - human-facing chronology / learning log
- `docs/backlog.md` - feature backlog

Active input / strategy docs:
- `docs/briefs/copy.txt`
- `docs/briefs/marketresearch.txt`
- `docs/briefs/brand-rules.md`

Working / in-flight docs:
- `docs/working/`

AI workflow / case-study docs:
- `docs/ai-case-study.md`
- `docs/ai-config-export/`
- `docs/forVitor/`

This README intentionally stays focused on the app/codebase. The deeper Claude/Codex/ChatGPT workflow is documented in the AI docs instead of being duplicated here.

---

## Current Out Of Scope

Not the current focus:
- a finished root hub page at `/`
- fully built future client pages beyond scaffolds
- productionized file uploads in QuoteDrawer
- admin dashboard / CRM
- analytics / tracking
- SMS notification system
- per-segment subpages for Brazusa cleaning

---

## AI Workflow Preview

This repo is built with a shared Claude/Codex operating system rather than ad hoc chat-only prompting.

The short version:
- project rules live in repo files, not just chat history
- `docs/decisions.md` is the shared startup context
- durable wrap-up matters
- risky integration changes are intentionally gated
- design-review and copy-review workflows are part of the process, not afterthoughts

For the full explanation, current workflow history, and replication notes, see:
- `docs/ai-case-study.md`
- `docs/ai-config-export/INDEX.md`
