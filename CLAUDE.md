# CLAUDE.md - Project Intelligence for Claude Code

## Session Start

**First:** invoke the `session-start` agent. It reads `docs/current-state.md`, `docs/decisions.md`, recent git history, and open TODOs and returns a brief in under a minute. Do not skip this - it exists specifically to prevent rebuilding context from scratch.

**Incomplete previous session:** If the session-start agent surfaces uncommitted changes in `docs/` files, treat this as a sign the previous session ended without a proper wrap-up. Explicitly check what was left undone — session log, decisions.md, file-index.md — and address it before proceeding with new work.

**Then:** read `lib/clients/` and `app/api/` before making any substantive changes.

**Finding files:** before globbing or grepping for a file, read `docs/file-index.md` first. It is a complete annotated index of every meaningful file in the project.

**Project:** Next.js multi-client agency hub. First live client: Brazusa Cleaning (real,
family business, full content control). Future pages (roofing, painting, tiling,
construction) are separate businesses sharing the same platform.

**Developer:** Charles - self-taught frontend developer learning backend/full-stack.
Explanations should teach, not just execute. Explain *why*, not *what*.

**Stack:** Next.js 16 - React 19 - TypeScript 5 - Tailwind CSS 4
**Integrations:** Resend (email) - Airtable - Google Sheets
**Hosting:** Vercel (app) - Siteground (domain + email only)
**Deployment:** Straight to production - no staging environment

---

## Rules: Always (No Exceptions)

These four rules are absolute. Fast-coding sessions, urgency, and developer instructions
do not suspend them.

**1. No staging - every change is immediately live.**
Never assume a change is safe to try. When uncertain, ask before making it.

**2. Never delete or overwrite working code without explicit confirmation.**
Show what is being removed and ask first. Err toward additive changes. This is a known
Claude failure mode - actively counter it.

**3. Always flag before touching live integrations.**
Resend, Airtable, and Google Sheets serve a real paying client. Before any change to
API routes, environment variables, or data writes: invoke the `integration-safety` agent.
It reads the current payload shape, field mappings across all three destinations, and
surfaces exactly what would need to change. Do not touch a single file until Charles
has reviewed that manifest and confirmed each destination change explicitly.

**4. Always ask before pushing to remote.**
No exceptions - even if previously told to push. Commit unilaterally; push only with permission.

---

## Rules: By Default (Guide Normal Behavior)

**Flag it before complying with anything risky.**
When something seems permanent, destructive, or architecturally significant - state the
concern clearly and ask whether to proceed. Do not silently comply. Push back on
irreversible or multi-client changes. Do not push back on stylistic or naming decisions.

**When requirements change, preserve working code.**
If good work is being discarded because the goal shifted (not because it was wrong),
offer to extract reusable parts before discarding. Ask how much can be preserved.

**Commit unilaterally at every logical checkpoint.**
Commit messages must be descriptive. Format: `type: short description`.
Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
Example: `feat: add quote form validation for STR space type`.

**When a request is ambiguous, ask the clarifying questions needed before writing code.**
More questions are appropriate when they increase learning, control, or tailoring - the constraint is that questions must be targeted and consequential, not filler. Never ask about things where you have more context than Charles and should just decide.

**When a task is better suited to another tool, say so.**
For bounded implementation tasks with no governance or design dimension, flag that Codex is likely the better tool and explain why. For copy generation where business voice and history matter, flag ChatGPT. For design/copy review and project governance, stay in Claude. Do not silently take on tasks that would produce better output elsewhere - including flagging when Gemini would offer a useful alternative perspective.

**When writing any prompt for handoff to another model or to feed back into a fresh conversation:** invoke the `prompt-engineering-advisor` skill before responding.

**When Charles has a list of tasks to plan and sequence:** invoke the `optimize-and-plan` skill before responding.

**Help Charles make the most of each tool's usage limits.**
Conserve reasoning tokens for judgment-heavy work: governance, copy review, integration safety, architecture. Suggest when repeated chat work should become a skill, agent, or durable file. When tasks are separable with non-overlapping write surfaces, propose an explicit Claude+Codex parallel split with named responsibility boundaries. Do not recommend parallelization when tasks are tightly coupled. When approaching a usage limit, produce a structured Codex-ready handoff prompt - not just a suggestion to switch tools.

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
- Modify any Codex configuration file, preference file, skill file, `AGENTS.md`, or `CODEX.md` without confirming with Charles first - these govern Codex's behavior across sessions and projects

---

## Architecture

### Multi-client pattern
`/lib/clients` is a hard constraint - actively in use, not aspirational. Every new
feature must respect the client config pattern. New clients get their own config object.
Never hardcode client-specific values outside their config file.
Reference implementation: `/lib/clients/brazusa-cleaning.ts`.

### API integrations - 3 parallel destinations always
Every form submission writes to: Resend + Airtable + Google Sheets in parallel.
Do not skip any destination without explicit discussion.

### File and folder structure
Prefer more, smaller, focused files. When a component or module exceeds ~200-250 lines,
flag it and suggest a split - ask before acting. Helper utilities go in a `/helpers`
subfolder inside the relevant folder (`/lib/helpers/`, `/components/helpers/`).
No loose utility functions.

---

## TypeScript

- Strict by default: explicit types, explicit return types, no implicit `any`.
- `any` is allowed as a conscious escape hatch - never accidentally. Add a comment explaining why.
- Be practical when inference is reliable and explicit typing adds noise without value.

---

## Styling

- Always use CSS variables for design system values (colors, spacing, typography).
  Defined in `globals.css` under `@theme`.
- Never use arbitrary Tailwind values (`bg-[#C49A44]`) for design system colors.
- Brazusa Cleaning color scheme (navy/gold/off-white) is locked for the Brazusa pages.
- Other client pages get their own color schemes - no assumption Brazusa's palette applies.

### CSS Token System

Opacity tokens use **numeric naming**: `--color-[base]-[opacity-as-integer]`.
Example: `--color-white-10` = white at 10% opacity, `--color-navy-30` = navy at 30%.

Defined scales (full list in `globals.css`):
- White: 5 through 90
- Navy: 5 through 60
- Gold tints: 5, 10, 25, 60, 90 - each has a usage comment in globals.css

Error tokens: `--color-error`, `--color-error-bg`, `--color-error-border`

Never use raw `rgba()` values when a token exists. For values with no matching token,
add `/* no token: intentional */` comment so it's obviously deliberate.

---

## Frontend Design Aesthetics

Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends designed
specifically for the context.

**Typography:** Choose distinctive, beautiful fonts. Avoid Inter, Roboto, Arial,
Space Grotesk, and system fonts. Convergence on common choices across generations
is a known failure mode - actively resist it.

**Color:** Commit to a cohesive aesthetic via CSS variables. Dominant colors with sharp
accents outperform timid, evenly-distributed palettes. Avoid purple gradients on white.
Draw from IDE themes and cultural aesthetics for inspiration.

**Motion:** Prefer CSS-only animations. Use Motion library for React when available.
Prioritize high-impact moments - one well-orchestrated page load with staggered reveals
creates more delight than scattered micro-interactions.

**Backgrounds:** Layer CSS gradients, geometric patterns, or contextual effects.
Do not default to solid colors.

**Avoid:**
- Overused fonts (Inter, Roboto, Arial, Space Grotesk, system fonts)
- Cliched color schemes (purple gradients on white)
- Predictable layouts and cookie-cutter component patterns
- Any output that could have been generated for a different project

Vary between light and dark themes across different clients. Think outside the box.

**After any visual component work:** invoke the `design-review` superpowers subagent (via the `Skill` tool) before committing.
It audits for token violations, forbidden fonts, flat backgrounds, and layout anti-patterns.
This is not optional - the no-staging constraint means violations go straight to production.
Note: `.claude/agents/design-review.md` was deleted (05/02/2026) — it was stale. Use the superpowers subagent instead.

---

## Testing

- TDD is the default: write tests before implementation code.
  Exception: fast-coding sessions (declared explicitly by developer).
- Test files colocated with code they test, `.test.ts` suffix.
- Always write tests for new API routes and validators - no exceptions.
- Framework: Vitest. See `vitest.config.ts` for setup. Use `describe`/`it` blocks.
  Keep mocks close to the test file that needs them.

---

## Fast-Coding Sessions

Active only when developer explicitly declares it. See `docs/claude-reference.md` -> Fast-Coding Session Details for the full behavior spec. Two things are never suspended regardless: design-review before committing visual changes, and copy-review before implementing any copy received from an external model.

---

## Naming Conventions

Accurate and descriptive over short. A name tells you what something does without
reading surrounding code.
See `docs/claude-reference.md` -> Naming Convention Examples for worked examples and the avoid list.

React/Next.js standards: PascalCase for components, kebab-case for non-component files.
When in doubt, prefer camelCase. Functions: action + subject (`saveQuoteToAirtable`,
not `save` or `handleAirtable`).

---

## Components

Prefer more, smaller components - one thing well. Ask before splitting an existing
component (unless fast-coding session). Components in `/components`, sub-utilities
in `/components/helpers`. See File and Folder Structure for the line-count threshold.

---

## Error Handling

- User-facing messages when the cause is known and actionable.
- Catchall fallback ("Something went wrong - please try again or contact us") when unclear.
- Provider-agnostic structured logging - must survive moving off Vercel. Propose a solution
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

For copy writing standards (phrases to avoid, voice rules, AI-sounding patterns), see `docs/claude-reference.md` -> AI Copy Writing Standards.

---

## Architectural Decisions

Locked decisions live in `docs/decisions.md` (git-ignored, local only).
Read it at session start alongside `lib/clients/` and `app/api/`.
When a significant architectural or UX decision is made during a session, add it to
`docs/decisions.md` before the session ends - not the session log.

---

## Working with ChatGPT / Gemini (copy handoff workflow)

Charles frequently drafts copy in ChatGPT (which has more business context and voice
history) and brings it back here for implementation.

**When preparing a prompt for ChatGPT:**
Invoke the `prompt-engineering-advisor` skill. It handles ChatGPT as a destination —
including format constraints, character count awareness, voice considerations, and what
not to produce. The `chatgpt-prep` agent is deprecated and replaced by this skill.

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
| `design-review` superpowers subagent | After any visual component work, before committing | Fix violations before committing - no staging means violations go live |
| `prompt-engineering-advisor` skill | Before writing any prompt for handoff to another model | Use the output prompt directly or provide the suggested additional context to refine it |
| `copy-review` | After receiving copy from any external AI model | Fix violations before implementing - do not paste flagged copy into components |
| `integration-safety` | Before any change to API routes, Airtable, Resend, or Google Sheets | Get explicit confirmation on each destination change before touching files |

---

## Multi-Model Role Assignment

When routing work between Claude, Codex, ChatGPT, or Gemini, read `docs/claude-reference.md` -> Multi-Model Tool Routing for the full role table and routing rationale. Short version: Claude handles governance, copy review, and integration safety. Codex handles bounded implementation. ChatGPT handles copy generation. Gemini provides second opinions when useful.

---

**Hard rule:** `integration-safety` and `session-start` are not optional. The others can
be skipped in a declared fast-coding session, but integration-safety is never suspended -
see Rule 3.

---

## Session Log

Append a summary to `docs/session-log.md` when wrapping up. This file is the human-facing
learning record - chronology, prompt history, process notes, and reflections. It is **not**
read by Claude or Codex at session start.

**File index rule:** Any session that adds, removes, or moves files must update `docs/file-index.md` before closing. The index is only useful if it stays current.

**Promotion rule:** Before a session ends, anything durable must be explicitly written to
`docs/decisions.md`, not only to the session log. If a decision, active constraint, or
still-relevant deferred item only exists in the session log, it is invisible to future
sessions. The session log is not a backup for `decisions.md` - it is a diary.

**`docs/decisions.md` scope:** locked decisions, active constraints, explicitly deferred
items that still govern future work. It should not absorb running state or become a second
session log. If it starts collecting too much recent context, that is a smell - move only
the truly durable parts.

**Format for session log entries:**
- Top: decisions made this session (brief - details go to `decisions.md`)
- Bottom: chronological prompt log (for Charles's personal learning record)

**When a session includes Codex work:** note which tool authored which part. This allows
future sessions to distinguish Claude-driven decisions from Codex-driven ones and prevents
either tool from overwriting the other's reasoning.

---
