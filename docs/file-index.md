# Project File Index
# Last updated: 2026-04-26
# Written by Claude with codebase context — not a dumb directory listing.
# Update this file whenever files are added, removed, or moved.

---

## Root Config

| File | Purpose |
|---|---|
| `CLAUDE.md` | Claude Code project instructions — rules, architecture, workflow, agent roster |
| `CODEX.md` | Codex project instructions — mirrors CLAUDE.md intent for Codex sessions |
| `AGENTS.md` | Codex agent config — defines Codex agent behaviors for this project |
| `README.md` | Project overview, setup instructions, app shape, documentation map |
| `next.config.ts` | Next.js config — Tailwind @source exclusions live here |
| `tsconfig.json` | TypeScript config — strict mode enabled |
| `vitest.config.ts` | Vitest test runner config |
| `eslint.config.mjs` | ESLint rules |
| `postcss.config.mjs` | PostCSS config (required by Tailwind CSS 4) |
| `package.json` | Dependencies and npm scripts |
| `.env.example` | Template for required environment variables |
| `.env.local` | Live environment variables — never committed |
| `.gitignore` | Git ignore rules |
| `.claude/settings.local.json` | Claude Code local permissions and settings |
| `.vscode/settings.json` | VS Code workspace settings |

---

## App (Next.js Routes)

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — fonts, metadata, global wrappers |
| `app/globals.css` | Global styles and full CSS token system — all design tokens defined here under @theme |
| `app/page.tsx` | Root `/` route — currently a stub/placeholder |
| `app/clean/page.tsx` | Brazusa Cleaning page at `/clean` — assembles all clean/ components |
| `app/construction/page.tsx` | Construction client stub — not live |
| `app/painting/page.tsx` | Painting client stub — not live |
| `app/roofing/page.tsx` | Roofing client stub — not live |
| `app/tiling/page.tsx` | Tiling client stub — not live |
| `app/api/quote/route.ts` | Quote form submission handler — writes to Resend + Airtable + Google Sheets in parallel |
| `app/api/quote/route.test.ts` | Tests for quote API route |
| `app/api/newsletter/route.ts` | Newsletter signup handler — writes to Resend + Airtable + Google Sheets in parallel |
| `app/api/newsletter/route.test.ts` | Tests for newsletter API route |
| `app/globals.test.ts` | Smoke tests for global CSS token presence |

---

## Components

All components are Brazusa Cleaning-specific and live under `components/clean/`.

| File | Purpose |
|---|---|
| `components/clean/Hero.tsx` | Hero section — segment-aware headline, body, differentiators, quote CTA |
| `components/clean/StickyNav.tsx` | Top navigation bar — logo, nav links, sticky behavior |
| `components/clean/TrustStrip.tsx` | Scrolling horizontal trust banner below the hero |
| `components/clean/Positioning.tsx` | "Built for operators, not oversight" section — value proposition |
| `components/clean/ClientAccordion.tsx` | Space-type selector — expandable panels for STR, property, offices, homes, other |
| `components/clean/Services.tsx` | Services grid — filterable by space type, daily + extended services |
| `components/clean/HowItWorks.tsx` | Process explainer section |
| `components/clean/Pricing.tsx` | Pricing overview — filter chips by space type, custom quote card |
| `components/clean/Testimonials.tsx` | Client testimonials carousel |
| `components/clean/ServiceArea.tsx` | Greater Boston coverage map and town list |
| `components/clean/About.tsx` | Team/about section |
| `components/clean/QuickContact.tsx` | Quick contact block — phone, email, WhatsApp |
| `components/clean/QuoteDrawer.tsx` | Slide-in quote request form — segment-aware, submits to /api/quote |
| `components/clean/FinalCTA.tsx` | Bottom conversion section before newsletter |
| `components/clean/NewsletterCTA.tsx` | Newsletter signup block — submits to /api/newsletter |
| `components/clean/MobileCTABar.tsx` | Fixed bottom bar on mobile with primary CTA |
| `components/clean/ScrollToTop.tsx` | Scroll-to-top button |
| `components/clean/Footer.tsx` | Page footer — links, logo, contact info |

---

## Lib

### Clients

| File | Purpose |
|---|---|
| `lib/clients/brazusa-cleaning.ts` | Brazusa Cleaning client config — reference implementation for the multi-client pattern |
| `lib/clients/index.ts` | Client registry — exports all client configs keyed by slug |

### Copy

| File | Purpose |
|---|---|
| `lib/copy/brazusa-cleaning/base.ts` | Shared/fallback copy for all segments — used when segment override not present |
| `lib/copy/brazusa-cleaning/index.ts` | Copy resolver — merges base copy with segment overrides, main entry point |
| `lib/copy/brazusa-cleaning/types.ts` | TypeScript types for all copy structures (HeroCopy, SegmentCopy, ServiceDefinition, etc.) |
| `lib/copy/brazusa-cleaning/segments/str.ts` | Copy overrides for short-term rental segment |
| `lib/copy/brazusa-cleaning/segments/property.ts` | Copy overrides for property management segment |
| `lib/copy/brazusa-cleaning/segments/offices.ts` | Copy overrides for offices segment |
| `lib/copy/brazusa-cleaning/segments/homes.ts` | Copy overrides for homes segment |
| `lib/copy/brazusa-cleaning/segments/other.ts` | Copy overrides for "other spaces" segment |

### Integrations

| File | Purpose |
|---|---|
| `lib/integrations/airtable.ts` | Airtable write helper — used by both API routes |
| `lib/integrations/airtable.test.ts` | Airtable integration tests |
| `lib/integrations/google-sheets.ts` | Google Sheets write helper — used by both API routes |
| `lib/integrations/google-sheets.test.ts` | Google Sheets integration tests |
| `lib/integrations/resend.ts` | Resend email send helper — used by both API routes |
| `lib/integrations/resend.test.ts` | Resend integration tests |

### Validators

| File | Purpose |
|---|---|
| `lib/validators/quote.ts` | Input validation for quote form submissions |
| `lib/validators/quote.test.ts` | Quote validator tests |
| `lib/validators/newsletter.ts` | Input validation for newsletter signups |
| `lib/validators/newsletter.test.ts` | Newsletter validator tests |

### Helpers & Types

| File | Purpose |
|---|---|
| `lib/helpers/logger.ts` | Provider-agnostic structured logger — survives moving off Vercel |
| `lib/helpers/logger.test.ts` | Logger tests |
| `lib/types.ts` | Shared TypeScript types — currently exports ValidationResult |

---

## Docs

### Core working docs (read at session start)

| File | Purpose |
|---|---|
| `docs/current-state.md` | Live project state — read by session-start agent every session |
| `docs/decisions.md` | Locked architectural and UX decisions — authoritative source of truth, not the session log |
| `docs/claude-reference.md` | Lower-frequency Claude guidance — naming conventions, copy standards, tool routing |
| `docs/backlog.md` | Feature backlog organized by priority tier |
| `docs/session-log.md` | Human-facing session diary — prompts, learnings, chronology. Not read by Claude. |
| `docs/file-index.md` | This file — full project file index with descriptions |

### Briefs

| File | Purpose |
|---|---|
| `docs/briefs/brand-rules.md` | Brazusa brand voice rules — phrases to avoid, tone guidelines |
| `docs/briefs/copy.txt` | Full site copy blueprint — source of truth for all on-page text |
| `docs/briefs/marketresearch.txt` | Raw market research notes |

### Design review working files

| File | Purpose |
|---|---|
| `docs/working/design-review/review-notes.txt` | Active design review input doc — Charles's observations, constraints, screenshot priorities |
| `docs/working/design-review/marketresearch-distilled.txt` | Distilled market research — trust hierarchy scoring rubric, anti-patterns, positioning statement |
| `docs/working/design-review/review-prep-todo.txt` | Checklist of prep tasks before review sessions |
| `docs/working/design-review/desktop/` | 17 desktop screenshot captures of the /clean page (desktop-01 through desktop-17) |
| `docs/working/design-review/mobile/` | 17 mobile screenshot captures of the /clean page (mobile-01 through mobile-17) |

### Copy working files

| File | Purpose |
|---|---|
| `docs/working/copy-decisions.md` | Historical copy decision log — mostly superseded by decisions.md, kept as record |

### Plans & specs

| File | Purpose |
|---|---|
| `docs/superpowers/plans/2026-04-11-brazusa-cleaning-page.md` | Implementation plan for the Brazusa Cleaning page build |
| `docs/superpowers/plans/2026-04-15-backend.md` | Implementation plan for the backend/API layer |
| `docs/superpowers/plans/2026-04-16-codebase-standards-cleanup.md` | Plan for codebase standards cleanup pass |
| `docs/superpowers/specs/2026-04-11-brazusa-cleaning-page-design.md` | Design spec for the Brazusa Cleaning page |
| `docs/superpowers/specs/2026-04-15-backend-design.md` | Backend design spec |

### Other docs

| File | Purpose |
|---|---|
| `docs/ai-case-study.md` | Case study on AI-assisted development process |
| `docs/forVitor/README.md` | Intro doc for Vitor explaining the AI-assisted workflow |
| `docs/forVitor/ai-case-study.md` | Case study copy for Vitor outreach |
| `docs/forVitor/replicate-ai-setup.md` | Guide for replicating the Claude/Codex setup |

---

## AI Config Export (Codex mirror)

Point-in-time export of the Codex config. Not the authoritative source — live Codex config lives in `~/.codex/`. Kept here for reference and portability.

| File | Purpose |
|---|---|
| `docs/ai-config-export/INDEX.md` | Index of the exported Codex config files |
| `docs/ai-config-export/codex/config.toml` | Codex global config snapshot |
| `docs/ai-config-export/codex/meta/codex-usage-log.md` | Log of Codex sessions and usage notes |
| `docs/ai-config-export/codex/preferences/charles-codex.md` | Codex-specific behavioral preferences |
| `docs/ai-config-export/codex/preferences/charles-core.md` | Core preferences shared across tools |
| `docs/ai-config-export/codex/preferences/charles-llm-workflow.md` | Multi-model workflow preferences |
| `docs/ai-config-export/codex/preferences/charles-tech.md` | Tech stack and tooling preferences |
| `docs/ai-config-export/codex/skills/charles-clean-code/SKILL.md` | Clean code review skill definition |
| `docs/ai-config-export/codex/skills/charles-codex-optimizer/SKILL.md` | Codex prompt optimization skill |
| `docs/ai-config-export/codex/skills/charles-durable-update/SKILL.md` | Durable update workflow skill |
| `docs/ai-config-export/codex/skills/charles-llm-workflow/SKILL.md` | LLM workflow skill |
| `docs/ai-config-export/codex/skills/charles-session-start/SKILL.md` | Session start skill for Codex |
| `docs/ai-config-export/codex/skills/claudecoding-integration-safety/SKILL.md` | Integration safety skill for Codex |

---

## AI Tooling (Claude)

| File | Purpose |
|---|---|
| `.claude/agents/session-start.md` | Session-start agent — reads current-state, decisions, git log, returns brief |
| `.claude/agents/design-review.md` | Design-review agent — audits components for token violations, font violations, layout anti-patterns |
| `.claude/agents/chatgpt-prep.md` | ~~ChatGPT prep agent~~ — deprecated; replaced by the `prompt-engineering-advisor` personal skill |
| `.claude/agents/copy-review.md` | Copy-review agent — checks incoming copy for AI writing violations before implementation |
| `.claude/agents/integration-safety.md` | Integration-safety agent — documents current API/Airtable/Resend/Sheets payload before any change |

Personal skills (live at `~/.claude/skills/` on the developer's machine — global, not project-scoped, not tracked in this repo):

| Skill | Purpose |
|---|---|
| `prompt-engineering-advisor` | Structures any prompt written for handoff to another model — covers Claude Design, ChatGPT, Codex, Gemini, fresh session |
| `optimize-and-plan` | Task sequencer — orders multi-step implementation tasks, routes to Claude vs. Codex, surfaces write-surface conflicts |

---

## Public Assets

| Path | Purpose |
|---|---|
| `public/brand/logo.jpg` | Brazusa logo — white background, light surfaces only (dark version not yet available) |
| `public/images/hero.webp` | Hero section background image |
| `public/images/home.webp` | Homes segment image |
| `public/images/office.webp` | Offices segment image |
| `public/images/property.webp` | Property management segment image |
| `public/images/str.webp` | STR segment image |
| `public/images/team.webp` | Team/about section image |
| `public/favicons/` | Favicon variants — 16x16, 32x32, 96x96 |
