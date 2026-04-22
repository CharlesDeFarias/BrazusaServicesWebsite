# Architectural Decisions

This file tracks locked decisions about architecture, UX behavior, and project structure.
Tracked in the repo. Read this at session start alongside `lib/clients/` and `app/api/`.

When a decision is made, add it here before the session ends. Format:
**Decision:** what was decided
**Why:** the reasoning
**Constraints:** what this rules out going forward

---

## UI Architecture

**Decision:** `StickyNav` lives in `components/clean/`, not at root `components/` level.
**Why:** StickyNav is Brazusa-specific. Its `clientTypes` array, "Clean my..." dropdown, props, and logo are all tied to the Brazusa page. Root-level placement implies cross-client reuse that does not exist.
**Constraints:** If a shared nav abstraction is needed for future clients, design it as a new component. Do not reuse this one.

**Decision:** `QuoteDrawer` stays monolithic until the email/phone contact field split is implemented and stable.
**Why:** The component exceeds the 250-line threshold, but splitting a form while its core state shape is actively changing stacks structural churn on top of a live integration change.
**Constraints:** When the split is eventually scheduled, proposed boundaries are: `QuoteDrawer` (main shell + state), `QuoteDrawerContactFields`, `QuoteDrawerDetailFields`, `QuoteDrawerSchedulingFields`. Do not combine the contact field change and the component split into a single commit.

---

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

**Decision:** Any non-ASCII punctuation in JS/TS string literals or JSX prop strings must be written as a Unicode escape (`\u2014`, `\u2013`, `\u2026`, `\u2019`, `\u201C`/`\u201D`, etc.), not as a literal character. In .ts/.tsx source, represent non-ASCII punctuation in JSX text nodes in a shell-safe way; default to Unicode escapes.
**Why:** Windows PowerShell codepage mismatch (`chcp 437` / UTF-8 mismatch) corrupts literal non-ASCII bytes during AI tool read-modify-write cycles. Confirmed for em dashes; applies equally to all non-ASCII punctuation in the same file positions.
**Constraints:** Applies to .ts/.tsx source files. Config/instruction files (AGENTS.md, CLAUDE.md, CODEX.md) use plain ASCII punctuation throughout. Markdown/docs may use literal Unicode. "Use Unicode escapes" means represent the character correctly in source -- do not substitute inferior ASCII punctuation in rendered output.

**Decision:** In this Windows PowerShell environment, shell-displayed mojibake alone is not evidence of file corruption.
**Why:** `Get-Content` and similar shell-display paths can mis-render valid UTF-8 punctuation in this environment. We confirmed this by comparing shell output against raw-byte reads with explicit UTF-8 decode: the shell showed mojibake like `â€”`, while the same file bytes decoded correctly to `—`. The shell state is also mixed (`chcp 437`, `$OutputEncoding` US-ASCII, console output UTF-8, console input IBM437), which makes false positives more likely.
**Constraints:** Do not treat shell mojibake alone as proof of corruption. Verify with raw-byte read + explicit UTF-8 decode, editor rendering, or rendered app output before concluding a file is damaged. Prefer `rg` for text discovery. When Unicode correctness matters, prefer raw-byte UTF-8 verification over `Get-Content`. Trying UTF-8 shell settings first (`chcp 65001`, `[Console]::InputEncoding = [System.Text.Encoding]::UTF8`, `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`, `$OutputEncoding = [System.Text.Encoding]::UTF8`) is reasonable, but trust should still come from verification, not assumption. In AI-owned config/instruction files, ASCII punctuation is still safer when Unicode punctuation is not needed.

**Decision:** For the current Brazusa copy overhaul, ChatGPT should rewrite `docs/briefs/copy.txt` first, not the live component copy.
**Why:** The current need is strategic messaging refinement before layout-fit refinement. `copy.txt` is the blueprint layer, so ChatGPT can use its stronger Brazusa voice and business context without being prematurely constrained by section lengths. After that, Claude/Codex can map the revised blueprint back onto the current repo structure and only then request tightly constrained section-level rewrites where needed.
**Constraints:** Do not ask ChatGPT for an end-to-end rewrite of the currently rendered site copy yet. The workflow for this phase is: rewrite `copy.txt` -> review against current repo structure and locked decisions -> generate targeted section prompts only where additional copy passes are needed.
**Status:** Phase 3 in progress. `copy.txt` rewritten. Design audit complete. Accordion copy refined and committed (ce06324). Hero copy updated 2026-04-20 and then tightened/locked on 2026-04-21 (`38eaae8`). Segment copy layer scaffolded (`lib/copy/brazusa-cleaning/`) -- Hero, shared accordion headline, and Services are now wired. Hero segment stubs filled for STR, property, offices, homes (082f5e4). "Other" hero stub created and wired (`38eaae8`). Per-segment `serviceDefinitions` and `extendedServiceDefinitions` approved from ChatGPT are now moved into the copy layer base Services config (`f1a8ef6`). Remaining phase work is design-pass / layout follow-up plus broader operational-claim verification.

**Decision:** The Brazusa Services umbrella will contain multiple independent one-page apps: Brazusa Cleaning (`/clean`, live), Primo\u2019s construction business (future), and Ze Jr\u2019s tiling/ceramics business (future). Each is a separate client in `lib/clients/` with its own page, config, and design. They share the platform but nothing else.
**Why:** The multi-client architecture in `lib/clients/` was built explicitly for this. Adding a new business is a matter of creating a config file and a new page route.
**Constraints:** Do not share components, colors, or copy between client pages without an explicit decision. Each business has its own brand. A platform footer linking to sibling pages is appropriate once at least two are live.

**Decision:** Domain relay is a planned marketing layer, not a codebase change. Separate domains (e.g., bostonofficeclean.com) will eventually point at targeted versions of business pages for segment-specific SEO and direct marketing.
**Why:** The single-page-per-business architecture is sufficient. Domain relays add marketing targeting on top without requiring route changes.
**Constraints:** This is a DNS/hosting configuration decision, not a Next.js routing decision. Do not restructure the app to support it.

**Decision:** Brazusa site remains single-page (`/clean`) for the current phase. Multi-page architecture (separate `/clean/str`, `/clean/office`, `/clean/clinic`, `/clean/property` routes) is the correct long-term target but not the right move now.
**Why:** The main benefit of separate pages is SEO indexability per service segment -- a longer-game benefit that isn't a bottleneck until there is traffic to route. The existing single-page segment routing (accordion + services filter) achieves the trust-building and self-identification goals just as well for now. Building full per-segment content depth first is the right prerequisite.
**Constraints:** Do not add new routes or restructure navigation for segment pages without an explicit decision to begin Phase 3. When per-segment content is deep enough to justify it, migration to separate routes is straightforward in Next.js.

**Decision:** Per-segment copy is stored in `lib/copy/brazusa-cleaning/` and resolved at render time via `getCopy(activeSegment)`. Hero is the first component wired to this system. All other components follow the same pattern as their segment-specific copy is approved.
**Why:** Copy was scattered across hardcoded component strings with no path to segment-specific variation. Centralizing into typed config files (one per segment) makes the single-page state-driven approach viable and keeps the structure route-ready if separate pages are added later.
**Constraints:** `lib/copy/brazusa-cleaning/base.ts` is the source of truth for default (no segment selected) copy. Segment files in `segments/` spread base and override only what changes. Do not hardcode copy strings directly in components -- all copy that varies by segment must live in this layer. Components receive copy as props, not by importing copy directly.

**Decision:** Hero differentiators trimmed from 10 to 6 across all segments. The retained six (in order): "Work completed and clearly confirmed", "Issues flagged before they become problems", "Communication you do not have to chase", "Works with your tools, apps, or systems", "Consistent team that learns your space", "Handles inventory, linen, and basic property tasks".
**Why:** On a large phone (Pixel 10 Pro), the 10-item list caused the hero to overflow the viewport on initial load, cutting off at bullet 10. The removed four were the weakest and most redundant: two near-duplicate volume/scale items, a flexibility item restating other bullets, and a 24/7 comms item (true, but not a differentiator in the same tier).
**Constraints:** "Consistent team that learns your space" is aspirational/best-effort -- not a hard guarantee. It is intentionally kept because it reflects real operating intent and is worth the trust signal. Do not rewrite it as a guarantee. If the operational reality changes, revisit. Other segments with distinct differentiator needs should override the array in their segment file, not modify base.ts.

**Decision:** Hero format is: short body paragraph (subtitle-length, ~30 words) plus max 6 bullets, no bullet numbering visible to users.
**Why:** The original format (full body + 10 differentiators) was redundant -- the bullets largely restated the body. The new format uses the body as a positioning statement and the bullets as operational proof points.
**Constraints:** The `n` field in differentiator objects stays in the data structure (used internally). Max 6 differentiators is a mobile layout constraint, not a content preference. The "Other" segment is an exception with only 3 differentiators by design.

**Decision:** Hero CTA label is "Start with a free quote". The form supports both a virtual quote request and scheduling an in-person walkthrough/estimate. Both "free quote" and "free walkthrough" language are appropriate in context.
**Why:** "Get a free quote" (previous) was generic. "Start with a free quote" is softer on commitment while still surfacing "free" prominently, which is a meaningful trust signal in a market where competitors often charge for estimates. The walkthrough option in the form reinforces that showing up is also free.
**Constraints:** The CTA label is currently hardcoded in `components/clean/Hero.tsx` -- it is not yet in the copy layer. Do not move it into the copy layer without a deliberate decision to do so.

**Decision:** "Other" segment has a distinct hero stub (`segments/other.ts`), not a fallback to base copy.
**Why:** Base copy mentions rentals, offices, and multi-unit -- none of which describe the "Other" catch-all audience. A distinct stub ("Cleaning that fits setups that don't fit a category") correctly positions the segment as intentional.
**Constraints:** "Other" hero uses only 3 differentiators (not the base 6) because its audience is the most varied and a short list is more appropriate than a comprehensive one.

**Decision:** Accordion headline is locked as "The kind of work you need" and should live in the copy layer, not remain hardcoded in `ClientAccordion.tsx`.
**Why:** Charles chose this over "Where we usually plug in" because it is clearer on first read and works better for fast-skimming commercial buyers. Now that the wording is locked, it should follow the same central copy pattern as the rest of the segment-driven content instead of staying embedded in the component.
**Constraints:** Store the headline in `lib/copy/brazusa-cleaning/` and pass it into `ClientAccordion` as props. Keep it shared across segments unless there is an explicit future decision to vary it by segment.

**Decision:** Operational claim status as of 2026-04-21 -- three claims verified by Charles: (a) "24/7 virtual communication when needed" -- TRUE, operationally accurate. (b) "Consistent team that learns your space" -- ASPIRATIONAL, best-effort only, not a guarantee; kept intentionally for trust value. (c) "Handles inventory, linen, and basic property tasks" -- TRUE for STR and property management.
**Why:** These were the three claims identified as highest-risk in the hero copy during the copy decision pass. Verified before implementation.
**Constraints:** The broader operational claim verification list (inspections, workforce documentation, etc.) in the Deferred Items section remains open. These three are cleared for production copy; others are not.

**Decision:** Active segment is driven by two inputs: accordion item click (real-time) and `?for=` URL query param (on load). The URL param uses the same lazy-init `useState` pattern as Testimonials hash state -- reads `window.location.search` in the initializer, no `useSearchParams` or Suspense needed.
**Why:** Consistent with the existing hash-state pattern already in use. Supports direct-link entry (/clean?for=str) and domain relay targeting without adding routing complexity.
**Constraints:** Valid segment values are `'str' | 'offices' | 'property' | 'homes' | 'other'`. Invalid or missing `?for=` param falls back to base copy silently. Do not add `useSearchParams` -- the window-based initializer is the established pattern here.

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

## Brand & Positioning

**Decision:** Trust proof on the Brazusa site must be layered across multiple formats, in this priority order: (1) operational proof -- visible process, how service is checked, how issues are handled; (2) workforce credibility -- legal/documented/insured team; (3) accountability proof -- single point of contact, response expectations; (4) segment relevance proof -- STR, office, clinic-specific language; (5) deliverable proof -- checklists, service examples; (6) social proof -- testimonials, reviews; (7) identity proof -- local/immigrant-owned.
**Why:** The design review flagged that Testimonials currently delivers only social proof (item 6 of 7). Identity proof is the weakest form and must not carry the full trust burden.
**Constraints:** Do not position identity proof as a primary trust signal. Operational assurance content belongs above or alongside the Testimonials carousel, not below it. See `docs/briefs/brand-rules.md` for the full trust hierarchy and copy rules.

**Decision:** The following operational claims require factual verification before appearing in production copy or design: inspections on every service, verified completion/photo proof, defined response-time commitments, dedicated account manager, backup coverage, same-day issue handling, low turnover, consistently used checklists, clinic-specific protocols, turnover-specific guarantees, supply/linen/reset handling, direct-hire staffing.
**Why:** These are common claims in the cleaning market that would strengthen positioning but are meaningless or damaging if not operationally true.
**Constraints:** If a section depends on one of these claims to work, tag it [VERIFY] and do not ship it unverified. Full claim safety list is in `docs/briefs/brand-rules.md`.

---

## Deferred Items (not decisions — pending)

- No protocol exists for multi-tool write conflicts — what happens when Claude and Codex both attempt to write to the same durable file in the same session. Not a current problem (sessions are sequential). Revisit when concurrent usage becomes real.
- ~~Static inline style cleanup~~ — completed 2026-04-20, Codex commit 90d698d
- ~~Service area town list~~ — completed 2026-04-20, Codex commit 0f99376 (full Greater Boston coverage)
- ~~Testimonials pricing context~~ — completed 2026-04-20, real per-engagement numbers added to Thatch, Michelle, New Horizons, Dr. Silver cards
- ~~Token migration pass 2~~ — completed 2026-04-18
- ~~ChatGPT refinement of per-client service copy~~ — completed 2026-04-20, mechanism-based language pass committed 078bc43
- QuoteDrawer file uploads — temporary Phase 1 should be email-first, with file metadata saved to the existing integrations. Charles wants broad file-type support for now, especially images, videos, and PDFs, but Gmail's documented direct attachment limit is about 25 MB total, so a 1 GB pure-email upload flow is not viable. When files exceed the email-safe limit, the UI should recommend sending them by WhatsApp to the default Brazusa contact number: 781-686-7189. Revisit later with a proper storage-backed upload system.
- ~~Accordion image file replacements~~ -- completed 2026-04-21, hero/client-type/about photos replaced with compressed `.webp` assets and code references updated
- WhatsApp contact integration \u2014 the business actively uses WhatsApp (781-686-7189). Add to QuickContact, footer contact block, and QuoteDrawer contact method options. WeChat is a future addition after WhatsApp is live.
- During the future design pass, take one focused exploration pass in Claude Design before coding major visual changes. Use it for layout/prototype exploration only, not as a source of truth for repo implementation.
- ~~Refresh `README.md` and `docs/ai-case-study.md`~~ -- completed 2026-04-21. README reframed as Brazusa Services platform-first overview; AI case study updated to read as both historical build story and current-state explainer.
- Working docs live under `docs/working/`. Temporary/in-flight artifacts (for example copy-decision worksheets and design-review evidence packs) should not stay at the top level of `docs/`.
- Active briefing docs in `docs/briefs/` are now limited to `copy.txt`, `marketresearch.txt`, and `brand-rules.md`. Retired prompt-input artifacts (`aesthetics.txt`, `wireframe.txt`) were removed once they stopped acting as live inputs.
- Create agent for clean code / Charles's code preferences (naming, structure, TS standards, etc.)
- Operational claim verification (required before per-segment page copy can be finalized): Are inspections formalized or informal? What workforce/documentation claims are precisely true and safe for the site? Is there a documented proof-of-completion workflow? What is the real response-time expectation? Is there a true single point of contact per account? Are service checklists or reports showable on-site? What clinic-specific claims are operationally safe? What STR workflow elements are currently real? Does Brazusa use direct employees, subcontractors, or a hybrid?

---

## Design Review — 2026-04-20 (Claude-authored)

Full strategic + standards audit run against Hero, Positioning, ClientAccordion, Services, Testimonials, FinalCTA.

### Standards violations (from design-review agent)

**[MEDIUM] ClientAccordion.tsx:184** — flat `bg-off-white` with no texture layer. No `.grain`, no gradient, no grid overlay. Fix: remove `bg-off-white` class, add `.grain` and `linear-gradient(to bottom, var(--color-off-white), var(--color-linen))` inline style to match Treatment A used in Positioning and Testimonials.

**[MEDIUM] FinalCTA.tsx:10** — `bg-off-white` base with grid overlay + radial gold glow, but no `.grain` class. Judgment call needed: is grid + radial glow sufficient layering, or should `.grain` be added? Document the decision with a comment either way.

**[MEDIUM] Services.tsx:275** — `rgba(196,154,68,0.7)` raw value. `/* no token: intentional */` comment is correct form. Nearest tokens are `--color-gold-60` (0.60) and `--color-gold-90` (0.90). Decision: round to `--color-gold-60`, or keep raw value and add `/* nearest token: --color-gold-60 */` annotation.

**[LOW] ClientAccordion.tsx:138 and 242** — `background: 'white'` raw keyword. Replace with `var(--color-off-white)` or `var(--color-linen)`.

**[LOW] Testimonials.tsx:149** — `#fff` raw hex on active filter pill. Replace with `var(--color-white-90)` or `text-white` Tailwind class.

### Strategic gaps (from Claude judgment)

**[HIGH] CTA language: "Get a Free Quote" appears in FinalCTA and AccordionItem** — "Free" is commodity framing. Market research explicitly flags this. Fix: FinalCTA → "Request a Walkthrough"; AccordionItem → "Get a Quote".

**[HIGH] Testimonials: zero Office cases** — Offices is a named primary audience. Empty chip reads as "we haven't done this." Add at least one credible office case.

**[HIGH] Hero body: three paragraphs all restate the same point** — P1/P2/P3 all say "work done, confirmed, no follow-up." Repetition reads as anxiety. Distill to one statement; use recovered space for mechanism detail (HOW confirmation happens, WHAT triggers on an issue).

**[MEDIUM] ClientAccordion headline: "What kind of space?"** — Consumer/lifestyle question after strong operator positioning. Replace with operator vocabulary: "Which operation do you manage?" or similar.

**[MEDIUM] Testimonials: single proof modality** — Market research says proof should be layered (visible process + workforce/insurance signals + social proof). Testimonials section delivers social proof only. Consider 2–3 compact operational assurance items above or beside the carousel.

**[LOW] Accordion expanded images** — If these are generic stock, they conflict with marketresearch.txt direction. Audit whether real Brazusa imagery is available. If not, lean on structure over stock.

### Confirmed working — do not change
- Navy/gold token system — no violations
- Cormorant + Syne typography — consistent and correct
- Hero structure (type-led, asymmetric grid, portrait right column)
- Services filter + opacity-dim interaction pattern
- Testimonials case format (result + operational detail, not star ratings)
- Gold as functional accent only across all reviewed components
- "Not sure if this fits? Reach out and we'll tell you honestly." — keep verbatim
- ~~Create agent for LLM / Claude optimization engineering~~ — completed 2026-04-19 as `optimize-and-plan` personal skill
- Turn the evolving ChatGPT copy-handoff workflow into a first-class reusable tool: update Claude's existing copy-prep/review flow and add the Codex-side equivalent skill/guidance so blueprint rewrite -> repo-aware review -> targeted section prompts becomes repeatable.
