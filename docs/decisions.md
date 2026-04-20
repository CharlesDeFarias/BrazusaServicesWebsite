# Architectural Decisions

This file tracks locked decisions about architecture, UX behavior, and project structure.
Tracked in the repo. Read this at session start alongside `lib/clients/` and `app/api/`.

When a decision is made, add it here before the session ends. Format:
**Decision:** what was decided
**Why:** the reasoning
**Constraints:** what this rules out going forward

---

## UI Architecture

**Decision:** `ClientAccordion` and `Services` are separate full-width sections, in that order (accordion first, services second).
**Why:** Users should select their client type first, which then influences what they see in Services. Side-by-side layout was broken at all screen sizes.
**Constraints:** Never put them back in a shared horizontal container. Never reverse the order without discussion.

**Decision:** State sync between ClientAccordion and Services is one-way. Accordion selection sets the Services filter. Services filter can be changed independently without affecting the accordion.
**Why:** Users may want to explore services for a different type than their space without losing their place in the accordion.
**Constraints:** Accordion does not react to Services filter changes. This is a deliberate asymmetry.

**Decision:** "We clean it all" card in ClientAccordion sits at the bottom of the list and opens an inline expansion (not a modal). The expansion contains 3 navigation links: Testimonials, Pricing, QuoteDrawer.
**Why:** Bottom position matches visual weight (fallback option, not primary). Inline expansion keeps user in context and works on mobile.
**Constraints:** Do not re-add the `onCTAClick('other')` drawer behavior to this card.

---

## CSS / Design System

**Decision:** CSS opacity tokens use numeric naming: `--color-[base]-[integer]` (e.g. `--color-white-10`, `--color-navy-30`).
**Why:** Self-documenting for a developer not strong in CSS. No need to memorize what "faint" or "muted" means.
**Constraints:** New tokens follow this pattern. The existing semantic aliases (`--color-white-faint` etc.) are kept as-is since they're already in use.

**Decision:** Gold tint tokens: `--color-gold-5`, `--color-gold-10`, `--color-gold-25`, `--color-gold-60`, `--color-gold-90`. Usage described in globals.css comments.
**Why:** `rgba(196,154,68,N)` appeared in 5 files with ~10 different values — no tokens existed to reach for.
**Constraints:** Use these instead of raw gold rgba values. If a value doesn't fit a stop, use the nearest and note it.

**Decision:** Error tokens: `--color-error`, `--color-error-bg`, `--color-error-border`.
**Why:** `#E07070` appeared hardcoded in 2 files. Form validation states need a consistent set.

**Decision:** Seven sections that had flat solid backgrounds (About, QuickContact, ServiceArea, Positioning, HowItWorks, Testimonials, Pricing) get one of two layering treatments:
- Treatment A (light sections): subtle linen-to-off-white gradient + geometric grid at ~1.5% opacity
- Treatment B (ServiceArea): `.grain` class + faint gold radial glow
**Why:** Sections looked like a plain word document. FinalCTA's grid + radial pattern is the reference for "done."

---

## Pricing Section

**Decision:** No static price ranges displayed anywhere in the Pricing section.
**Why:** Static ranges create anchoring pressure and don't reflect Brazusa's custom/flexible pricing model.
**Constraints:** Pricing section focuses on how pricing is calculated. Actual examples live in Testimonials as case studies.

**Decision:** Pricing section links to Testimonials via 5 client-type filter chips (STR / Property / Offices / Apartments / Other) using shareable hash fragments.
**Why:** The earlier in-page scroll behavior worked for exploration but was not shareable. The current single-page `/clean` architecture can support direct-link state cleanly with hash fragments like `#testimonials-str` without widening scope into route changes.
**Constraints:** Pricing chips should point to explicit hash states (`#testimonials`, `#testimonials-str`, `#testimonials-property`, `#testimonials-offices`, `#testimonials-homes`, `#testimonials-other`). Direct page load and refresh with those hashes should preselect the matching Testimonials filter. Keep this as a single-page hash-state pattern until there is an explicit decision to move to multi-page segment routes.

---

## Form (QuoteDrawer)

**Decision:** Contact is split into separate `email` and `phone` fields (both optional, at least one required). Preference toggle is shown when phone is filled, auto-derived when only email.
**Why:** Single contact field was ambiguous. Users should be able to provide both.
**Constraints:** This change touches the API route, Airtable fields, and Resend template. Never implement without producing a change manifest and getting confirmation first.

---

---

## AI Operating System

**Decision:** Tailwind v4 source scanning must exclude the repo `docs/` directory.
**Why:** A rebuild triggered by the Pricing-to-Testimonials hash-link implementation surfaced a Tailwind/PostCSS failure that appeared to blame `app/globals.css`, but the actual trigger was Tailwind source scanning over `docs/session-log.md`. Temporarily moving that file out of the way allowed the CSS compile to succeed, confirming the docs scan as the cause. The fix is `@source not "../docs";` in `app/globals.css`.
**Constraints:** Keep `docs/` out of Tailwind source scanning unless there is an explicit future need to style-render documentation content through the app. When Tailwind/PostCSS errors point at `app/globals.css` unexpectedly, verify whether the source scanner is pulling in non-app files before assuming the stylesheet itself is broken.

**Decision:** In this Windows PowerShell environment, shell-displayed mojibake alone is not evidence of file corruption.
**Why:** `Get-Content` and similar shell-display paths can mis-render valid UTF-8 punctuation in this environment. We confirmed this by comparing shell output against raw-byte reads with explicit UTF-8 decode: the shell showed mojibake like `â€”`, while the same file bytes decoded correctly to `—`. The shell state is also mixed (`chcp 437`, `$OutputEncoding` US-ASCII, console output UTF-8, console input IBM437), which makes false positives more likely.
**Constraints:** Do not treat shell mojibake alone as proof of corruption. Verify with raw-byte read + explicit UTF-8 decode, editor rendering, or rendered app output before concluding a file is damaged. Prefer `rg` for text discovery. When Unicode correctness matters, prefer raw-byte UTF-8 verification over `Get-Content`. Trying UTF-8 shell settings first (`chcp 65001`, `[Console]::InputEncoding = [System.Text.Encoding]::UTF8`, `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`, `$OutputEncoding = [System.Text.Encoding]::UTF8`) is reasonable, but trust should still come from verification, not assumption. In AI-owned config/instruction files, ASCII punctuation is still safer when Unicode punctuation is not needed.

**Decision:** For the current Brazusa copy overhaul, ChatGPT should rewrite `docs/briefs/copy.txt` first, not the live component copy.
**Why:** The current need is strategic messaging refinement before layout-fit refinement. `copy.txt` is the blueprint layer, so ChatGPT can use its stronger Brazusa voice and business context without being prematurely constrained by section lengths. After that, Claude/Codex can map the revised blueprint back onto the current repo structure and only then request tightly constrained section-level rewrites where needed.
**Constraints:** Do not ask ChatGPT for an end-to-end rewrite of the currently rendered site copy yet. The workflow for this phase is: rewrite `copy.txt` -> review against current repo structure and locked decisions -> generate targeted section prompts only where additional copy passes are needed.
**Status:** Phase 2 complete as of 2026-04-19. `copy.txt` rewritten (brand positioning layer). Design audit completed. Section-level ChatGPT brief produced, 3 copy-review passes run, copy approved. Implementation delegated to Codex. Accordion copy (all 4 segments) refined via 4-pass ChatGPT cycle and implemented by Claude — committed 7a8beab, pushed. Post-implementation deep review pass found and fixed 3 issues (2 live dev notes in Services.tsx, Hero P2/P3 duplicate ending) — committed d79419b, pushed. Next: design review pass (prompt generated, ready for new session) and ChatGPT refinement of Services section copy.

**Decision:** Brazusa site remains single-page (`/clean`) for the current phase. Multi-page architecture (separate `/clean/str`, `/clean/office`, `/clean/clinic`, `/clean/property` routes) is the correct long-term target but not the right move now.
**Why:** The main benefit of separate pages is SEO indexability per service segment — a longer-game benefit that isn't a bottleneck until there is traffic to route. The existing single-page segment routing (accordion + services filter) achieves the trust-building and self-identification goals just as well for now. Building full per-segment content depth first is the right prerequisite.
**Constraints:** Do not add new routes or restructure navigation for segment pages without an explicit decision to begin Phase 3. When per-segment content is deep enough to justify it, migration to separate routes is straightforward in Next.js.

**Decision:** Navy/gold design system confirmed as aligned with `marketresearch.txt` direction. No color changes needed.
**Why:** Full design audit conducted 2026-04-19. Gold (`#C49A44`) is used only as a restrained functional accent — step numbers, thin divider lines, arrow markers, one CTA button. It never appears as a decorative fill or dominant visual element. The "avoid luxury golds" note in marketresearch refers to warm lifestyle usage, not functional accent usage. Navy is correctly dominant.
**Constraints:** Gold usage must stay restrained and functional. Any future use of gold as a background wash or decorative element should be flagged against this decision.

**Decision:** Authorship notation convention for dual-tool sessions.
**Why:** Both Claude and Codex now have authorship notation rules, but no shared convention. Without one, session log entries will accumulate inconsistent formats.
**Constraints:** Use exactly three labels — `Claude-authored`, `Codex-authored`, `Joint decision`. No other variants. Apply at the artifact level (each decision, implementation block, or reasoning artifact), not at the session level.

**Decision:** `optimize-and-plan` personal skill created at `~/.claude/skills/optimize-and-plan/SKILL.md`.
**Why:** Charles repeatedly needs to (1) turn raw intent into an optimized Claude/Codex prompt and (2) get an expert-reviewed implementation plan with tool routing for a task list. Doing this ad hoc was inconsistent and didn't reliably apply LLM expert perspective.
**Constraints:** Two modes — prompt optimizer and task sequencer. Expert lens always outweighs generic Claude defaults. Triggered automatically by CLAUDE.md when Charles asks to turn context into a prompt or plan a task list. Codex-side wording provided for `charles-llm-workflow.md` — Claude must not touch that file directly.

**Decision:** Usage discipline and parallel-work protocol added as a durable rule.
**Why:** Claude and Codex both have usage limits. Without explicit routing discipline, the wrong tool silently takes the wrong task, tokens get wasted on repeated work, and parallelization opportunities are missed.
**Constraints:** Claude conserves reasoning tokens for judgment-heavy work. Repeated chat patterns should become skills/agents/files. Parallel splits only when write surfaces are disjoint. At usage-limit boundaries, Claude produces a structured Codex-ready handoff prompt. Full detail in `memory/feedback_usage_discipline.md` and `CLAUDE.md`.

---

## Deferred Items (not decisions — pending)

- No protocol exists for multi-tool write conflicts — what happens when Claude and Codex both attempt to write to the same durable file in the same session. Not a current problem (sessions are sequential). Revisit when concurrent usage becomes real.
- Static inline style cleanup — many `style={{ color: 'var(--color-...)' }}` calls should be Tailwind utilities (e.g. `text-white-40`). Tailwind v4 exposes all `@theme` tokens as utilities automatically. Static values only — dynamic/conditional inline styles require a separate decision (data attributes or Tailwind variants). Scope: all components in `components/clean/`.

- Service area town list (awaiting ChatGPT audit)
- Testimonials pricing context (awaiting real data from Charles)
- ~~Token migration pass 2~~ — completed 2026-04-18
- ChatGPT refinement of per-client service copy (Services.tsx — next copy pass after design review)
- QuoteDrawer file uploads — temporary Phase 1 should be email-first, with file metadata saved to the existing integrations. Charles wants broad file-type support for now, especially images, videos, and PDFs, but Gmail's documented direct attachment limit is about 25 MB total, so a 1 GB pure-email upload flow is not viable. When files exceed the email-safe limit, the UI should recommend sending them by WhatsApp to the default Brazusa contact number: 781-686-7189. Revisit later with a proper storage-backed upload system.
- Accordion image file replacements (Charles to re-export)
- Create agent for clean code / Charles's code preferences (naming, structure, TS standards, etc.)
- ~~Create agent for LLM / Claude optimization engineering~~ — completed 2026-04-19 as `optimize-and-plan` personal skill
- Turn the evolving ChatGPT copy-handoff workflow into a first-class reusable tool: update Claude's existing copy-prep/review flow and add the Codex-side equivalent skill/guidance so blueprint rewrite -> repo-aware review -> targeted section prompts becomes repeatable.
