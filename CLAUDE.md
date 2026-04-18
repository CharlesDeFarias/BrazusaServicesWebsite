# CLAUDE.md — Project Intelligence for Claude Code

## Session Start

**First:** invoke the `session-start` agent. It reads `docs/decisions.md`, recent git history, and open TODOs and returns a brief in under a minute. Do not skip this — it exists specifically to prevent rebuilding context from scratch.

**Then:** read `lib/clients/` and `app/api/` before making any substantive changes.

**Project:** Next.js multi-client agency hub. First live client: Brazusa Cleaning (real,
family business, full content control). Future pages (roofing, painting, tiling,
construction) are separate businesses sharing the same platform.

**Developer:** Charles — self-taught frontend developer learning backend/full-stack.
Explanations should teach, not just execute. Explain *why*, not *what*.

**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4 · Vitest  
**Integrations:** Resend (email) · Airtable · Google Sheets  
**Hosting:** Vercel (app) · Siteground (domain + email only)  
**Deployment:** Straight to production — no staging environment

---

## Rules: Always (No Exceptions)

These four rules are absolute. Fast-coding sessions, urgency, and developer instructions
do not suspend them.

**1. No staging — every change is immediately live.**
Never assume a change is safe to try. When uncertain, ask before making it.

**2. Never delete or overwrite working code without explicit confirmation.**
Show what is being removed and ask first. Err toward additive changes. This is a known
Claude failure mode — actively counter it.

**3. Always flag before touching live integrations.**
Resend, Airtable, and Google Sheets serve a real paying client. Before any change to
API routes, environment variables, or data writes: invoke the `integration-safety` agent.
It reads the current payload shape, field mappings across all three destinations, and
surfaces exactly what would need to change. Do not touch a single file until Charles
has reviewed that manifest and confirmed each destination change explicitly.

**4. Always ask before pushing to remote.**
No exceptions — even if previously told to push. Commit unilaterally; push only with permission.

---

## Rules: By Default (Guide Normal Behavior)

**Flag it before complying with anything risky.**
When something seems permanent, destructive, or architecturally significant — state the
concern clearly and ask whether to proceed. Do not silently comply. Push back on
irreversible or multi-client changes. Do not push back on stylistic or naming decisions.

**When requirements change, preserve working code.**
If good work is being discarded because the goal shifted (not because it was wrong),
offer to extract reusable parts before discarding. Ask how much can be preserved.

**Commit unilaterally at every logical checkpoint.**
Commit messages must be descriptive. Format: `type: short description`.
Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
Example: `feat: add quote form validation for STR space type`.

**When a request is ambiguous, ask one clarifying question before writing code.**
Do not guess and proceed.

**After completing a task, immediately suggest next steps.**
Always offer two distinctly different options: one moving *forward* (next feature),
one moving *deeper* (harden, test, or improve what was just built).

**When a test fails: stop, explain, ask.**
Do not attempt to fix it first. Explain what broke and why, then ask how to proceed.

**Never do these without explicit permission:**
- Install a new npm package
- Split a component into smaller pieces
- Change an API route in a way that affects live data
- Rename or move files imported elsewhere without verifying all import paths
- Begin a refactor that wasn't part of the original request
- Any destructive git operation (reset, force push, branch delete)

---

## Architecture

### Multi-client pattern
`/lib/clients` is a hard constraint — actively in use, not aspirational. Every new
feature must respect the client config pattern. New clients get their own config object.
Never hardcode client-specific values outside their config file.
Reference implementation: `/lib/clients/brazusa-cleaning.ts`.

### API integrations — 3 parallel destinations always
Every form submission writes to: Resend + Airtable + Google Sheets in parallel.
Do not skip any destination without explicit discussion.

### File and folder structure
Prefer more, smaller, focused files. When a component or module exceeds ~200-250 lines,
flag it and suggest a split — ask before acting. Helper utilities go in a `/helpers`
subfolder inside the relevant folder (`/lib/helpers/`, `/components/helpers/`).
No loose utility functions.

---

## TypeScript

- Strict by default: explicit types, explicit return types, no implicit `any`.
- `any` is allowed as a conscious escape hatch — never accidentally. Add a comment explaining why.
- Be practical when inference is reliable and explicit typing adds noise without value.

---

## Styling

- Always use CSS variables for design system values (colors, spacing, typography).
  Defined in `globals.css` under `@theme`.
- Never use arbitrary Tailwind values (`bg-[#C49A44]`) for design system colors.
- Brazusa Cleaning color scheme (navy/gold/off-white) is locked for the Brazusa pages.
- Other client pages get their own color schemes — no assumption Brazusa's palette applies.

### CSS Token System

Opacity tokens use **numeric naming**: `--color-[base]-[opacity-as-integer]`.
Example: `--color-white-10` = white at 10% opacity, `--color-navy-30` = navy at 30%.

Defined scales (full list in `globals.css`):
- White: 5 through 90
- Navy: 5 through 60
- Gold tints: 5, 10, 25, 60, 90 — each has a usage comment in globals.css

Error tokens: `--color-error`, `--color-error-bg`, `--color-error-border`

Never use raw `rgba()` values when a token exists. For values with no matching token,
add `/* no token: intentional */` comment so it's obviously deliberate.

---

## Frontend Design Aesthetics

Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends designed
specifically for the context.

**Typography:** Choose distinctive, beautiful fonts. Avoid Inter, Roboto, Arial,
Space Grotesk, and system fonts. Convergence on common choices across generations
is a known failure mode — actively resist it.

**Color:** Commit to a cohesive aesthetic via CSS variables. Dominant colors with sharp
accents outperform timid, evenly-distributed palettes. Avoid purple gradients on white.
Draw from IDE themes and cultural aesthetics for inspiration.

**Motion:** Prefer CSS-only animations. Use Motion library for React when available.
Prioritize high-impact moments — one well-orchestrated page load with staggered reveals
creates more delight than scattered micro-interactions.

**Backgrounds:** Layer CSS gradients, geometric patterns, or contextual effects.
Do not default to solid colors.

**Avoid:**
- Overused fonts (Inter, Roboto, Arial, Space Grotesk, system fonts)
- Clichéd color schemes (purple gradients on white)
- Predictable layouts and cookie-cutter component patterns
- Any output that could have been generated for a different project

Vary between light and dark themes across different clients. Think outside the box.

**After any visual component work:** invoke the `design-review` agent before committing.
It audits for token violations, forbidden fonts, flat backgrounds, and layout anti-patterns.
This is not optional — the no-staging constraint means violations go straight to production.

---

## Testing

- TDD is the default: write tests before implementation code.
  Exception: fast-coding sessions (declared explicitly by developer).
- Test files colocated with code they test, `.test.ts` suffix.
- Always write tests for new API routes and validators — no exceptions.
- Framework: Vitest. See `vitest.config.ts` for setup. Use `describe`/`it` blocks.
  Keep mocks close to the test file that needs them.

---

## Fast-Coding Sessions

Active only when developer explicitly says so ("let's move fast", "I'm in a rush",
"skip the questions"). Applies to the current task only — re-declare if needed.

**Allowed:** split components without asking, skip TDD, batch changes without explaining.

**Never suspended (see Rules: Always above):** live integrations, working code deletion,
npm installs, pushing to remote — these always require confirmation.

---

## Naming Conventions

Accurate and descriptive over short. A name tells you what something does without
reading surrounding code.
- Good: `brazusaClientConfig`, `onQuoteFormSubmit`, `validateNewsletterEmail`
- Avoid: `config`, `handleClick`, `data`, `result`, `item`

React/Next.js standards: PascalCase for components, kebab-case for non-component files.
When in doubt, prefer camelCase. Functions: action + subject (`saveQuoteToAirtable`,
not `save` or `handleAirtable`).

---

## Components

Prefer more, smaller components — one thing well. Ask before splitting an existing
component (unless fast-coding session). Components in `/components`, sub-utilities
in `/components/helpers`. See File and Folder Structure for the line-count threshold.

---

## Error Handling

- User-facing messages when the cause is known and actionable.
- Catchall fallback ("Something went wrong — please try again or contact us") when unclear.
- Provider-agnostic structured logging — must survive moving off Vercel. Propose a solution
  before implementing. Every API route needs both user-facing errors and server-side logging.

---

## Packages and Dependencies

Always ask before installing. Explain what it is, why it's needed, and whether a simpler
alternative exists. No exclusions at this time.

---

## AI Writing Quality

**In code:** Comments explain *why*, never *what*. No generic names (`data`, `item`,
`result`). No functions doing multiple things. Code reads like it was written by someone
who knows this domain.

**In copy:** Avoid dramatic hyphens, "this isn't X — it's Y" constructions, vague
aspirational phrases ("peace of mind", "seamless experience"), and generic benefit lists.
Copy sounds like a real person describing a business they know. Flag AI-sounding copy
and offer a natural alternative.

*Brand voice details to be added as the project develops.*

---

## Architectural Decisions

Locked decisions live in `docs/decisions.md` (git-ignored, local only).
Read it at session start alongside `lib/clients/` and `app/api/`.
When a significant architectural or UX decision is made during a session, add it to
`docs/decisions.md` before the session ends — not the session log.

---

## Working with ChatGPT / Gemini (copy handoff workflow)

Charles frequently drafts copy in ChatGPT (which has more business context and voice
history) and brings it back here for implementation.

**When preparing a prompt for ChatGPT:**
Invoke the `chatgpt-prep` agent with the component name. It reads the source file,
counts characters per section, maps the data structure, and outputs a ready-to-paste
brief with format constraints already filled in. Do not manually write ChatGPT briefs
for copy work — the agent produces a more accurate brief faster.

**When receiving copy from ChatGPT:**
Invoke the `copy-review` agent before implementing anything. Paste the returned copy
into the prompt. It flags AI writing violations, character count drift, and generic
phrasing before any of it touches the codebase.

When implementing: do not paste copy directly into components. Map each section name
from the returned copy to the exact data structure key in the component first. If a
section name doesn't match a key, flag it before writing anything.

This same workflow applies when preparing prompts for Gemini or any other model.

---

## Agent Roster

Custom agents live in `.claude/agents/`. Invoke with `@agent-name` or let Claude route
ambient triggers. The description field in each file is what Claude uses for auto-discovery.

| Agent | Invoke when | What to do with output |
|---|---|---|
| `session-start` | First thing in every new session | Read the brief, then proceed with the task |
| `design-review` | After any visual component work, before committing | Fix violations before committing — no staging means violations go live |
| `chatgpt-prep` | Before preparing any copy for ChatGPT or Gemini | Paste the output brief directly into ChatGPT, fill in `INSTRUCTION_HERE` |
| `copy-review` | After receiving copy from any external AI model | Fix violations before implementing — do not paste flagged copy into components |
| `integration-safety` | Before any change to API routes, Airtable, Resend, or Google Sheets | Get explicit confirmation on each destination change before touching files |

**Hard rule:** `integration-safety` and `session-start` are not optional. The others can
be skipped in a declared fast-coding session, but integration-safety is never suspended —
see Rule 3.

---

## Session Log

When the developer says they are wrapping up, append a summary to `docs/session-log.md`
(git-ignored, local only).

**Format:**
- Top section: "Decisions made this session" — what was decided and why (this is for
  Claude's use in future sessions).
- Bottom section: chronological prompt log — each prompt and what was done (this is
  for Charles's personal learning record).

---
