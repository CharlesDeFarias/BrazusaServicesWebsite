# Architectural Decisions

This file tracks locked decisions about architecture, UX behavior, and project structure.
Tracked in the repo. Read this at session start after `docs/current-state.md`, alongside `lib/clients/` and `app/api/` when relevant.

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
**Why:** `rgba(196,154,68,N)` appeared in 5 files with ~10 different values and no tokens existed to reach for.
**Constraints:** Use these instead of raw gold rgba values. If a value does not fit a stop, use the nearest and note it.

**Decision:** Error tokens: `--color-error`, `--color-error-bg`, `--color-error-border`.
**Why:** `#E07070` appeared hardcoded in 2 files. Form validation states need a consistent set.

**Decision:** Seven sections that had flat solid backgrounds (About, QuickContact, ServiceArea, Positioning, HowItWorks, Testimonials, Pricing) get one of two layering treatments:
- Treatment A (light sections): subtle linen-to-off-white gradient + geometric grid at ~1.5% opacity
- Treatment B (ServiceArea): `.grain` class + faint gold radial glow
**Why:** Sections looked like a plain word document. FinalCTA's grid + radial pattern is the reference for "done."
**Constraints:** Preserve these two treatments as the default background language unless an explicit design decision replaces them.

---

## Pricing Section

**Decision:** No static price ranges displayed anywhere in the Pricing section.
**Why:** Static ranges create anchoring pressure and do not reflect Brazusa's custom/flexible pricing model.
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

## AI Operating System

**Decision:** Tailwind v4 source scanning must exclude the repo `docs/` directory.
**Why:** A rebuild triggered by the Pricing-to-Testimonials hash-link implementation surfaced a Tailwind/PostCSS failure that appeared to blame `app/globals.css`, but the actual trigger was Tailwind source scanning over `docs/session-log.md`. Temporarily moving that file out of the way allowed the CSS compile to succeed, confirming the docs scan as the cause. The fix is `@source not "../docs";` in `app/globals.css`.
**Constraints:** Keep `docs/` out of Tailwind source scanning unless there is an explicit future need to style-render documentation content through the app. When Tailwind/PostCSS errors point at `app/globals.css` unexpectedly, verify whether the source scanner is pulling in non-app files before assuming the stylesheet itself is broken.

**Decision:** Any non-ASCII punctuation in JS/TS string literals or JSX prop strings must be written as a Unicode escape (`\u2014`, `\u2013`, `\u2026`, `\u2019`, `\u201C`/`\u201D`, etc.), not as a literal character. In .ts/.tsx source, represent non-ASCII punctuation in JSX text nodes in a shell-safe way; default to Unicode escapes.
**Why:** Windows PowerShell codepage mismatch (`chcp 437` / UTF-8 mismatch) corrupts literal non-ASCII bytes during AI tool read-modify-write cycles. Confirmed for em dashes; applies equally to all non-ASCII punctuation in the same file positions.
**Constraints:** Applies to .ts/.tsx source files. Config/instruction files (AGENTS.md, CLAUDE.md, CODEX.md) use plain ASCII punctuation throughout. Markdown/docs may use literal Unicode. "Use Unicode escapes" means represent the character correctly in source rather than substituting inferior ASCII punctuation in rendered output.

**Decision:** In this Windows PowerShell environment, shell-displayed mojibake alone is not evidence of file corruption.
**Why:** `Get-Content` and similar shell-display paths can mis-render valid UTF-8 punctuation in this environment. We confirmed this by comparing shell output against raw-byte reads with explicit UTF-8 decode: the shell showed mojibake, while the same file bytes decoded correctly. The shell state is also mixed, which makes false positives more likely.
**Constraints:** Do not treat shell mojibake alone as proof of corruption. Verify with raw-byte read + explicit UTF-8 decode, editor rendering, or rendered app output before concluding a file is damaged. Prefer `rg` for text discovery. When Unicode correctness matters, prefer raw-byte UTF-8 verification over `Get-Content`. Trying UTF-8 shell settings first is reasonable, but trust should still come from verification, not assumption. In AI-owned config/instruction files, ASCII punctuation is still safer when Unicode punctuation is not needed.

**Decision:** For the current Brazusa copy overhaul, ChatGPT should rewrite `docs/briefs/copy.txt` first, not the live component copy.
**Why:** The current need is strategic messaging refinement before layout-fit refinement. `copy.txt` is the blueprint layer, so ChatGPT can use its stronger Brazusa voice and business context without being prematurely constrained by section lengths. After that, Claude/Codex can map the revised blueprint back onto the current repo structure and only then request tightly constrained section-level rewrites where needed.
**Constraints:** Do not ask ChatGPT for an end-to-end rewrite of the currently rendered site copy yet. The workflow for this phase is: rewrite `copy.txt` -> review against current repo structure and locked decisions -> generate targeted section prompts only where additional copy passes are needed.

**Decision:** The Brazusa Services umbrella will contain multiple independent one-page apps: Brazusa Cleaning (`/clean`, live), Primo's construction business (future), and Ze Jr's tiling/ceramics business (future). Each is a separate client in `lib/clients/` with its own page, config, and design. They share the platform but nothing else.
**Why:** The multi-client architecture in `lib/clients/` was built explicitly for this. Adding a new business is a matter of creating a config file and a new page route.
**Constraints:** Do not share components, colors, or copy between client pages without an explicit decision. Each business has its own brand. A platform footer linking to sibling pages is appropriate once at least two are live.

**Decision:** Domain relay is a planned marketing layer, not a codebase change. Separate domains (e.g. `bostonofficeclean.com`) will eventually point at targeted versions of business pages for segment-specific SEO and direct marketing.
**Why:** The single-page-per-business architecture is sufficient. Domain relays add marketing targeting on top without requiring route changes.
**Constraints:** This is a DNS/hosting configuration decision, not a Next.js routing decision. Do not restructure the app to support it.

**Decision:** Brazusa site remains single-page (`/clean`) for the current phase. Multi-page architecture (separate `/clean/str`, `/clean/office`, `/clean/clinic`, `/clean/property` routes) is the correct long-term target but not the right move now.
**Why:** The main benefit of separate pages is SEO indexability per service segment, which is a longer-game benefit that is not the bottleneck yet. The existing single-page segment routing achieves the trust-building and self-identification goals just as well for now.
**Constraints:** Do not add new routes or restructure navigation for segment pages without an explicit decision to begin the next phase of that work.

**Decision:** Per-segment copy is stored in `lib/copy/brazusa-cleaning/` and resolved at render time via `getCopy(activeSegment)`.
**Why:** Copy was scattered across hardcoded component strings with no path to segment-specific variation. Centralizing into typed config files makes the single-page state-driven approach viable and keeps the structure route-ready if separate pages are added later.
**Constraints:** `lib/copy/brazusa-cleaning/base.ts` is the source of truth for default (no segment selected) copy. Segment files in `segments/` spread base and override only what changes. Do not hardcode copy strings directly in components; all copy that varies by segment must live in this layer. Components receive copy as props, not by importing copy directly.

**Decision:** Hero differentiators are capped at 6 across standard segments, with "Other" intentionally shorter.
**Why:** The longer list caused mobile overflow and repeated itself. The cap is a layout constraint as much as a content decision.
**Constraints:** Keep standard segments at max 6 differentiators. "Other" remains an intentional short exception rather than inheriting the full base set.

**Decision:** Hero format is a short body paragraph plus up to 6 differentiators, with no visible numbering for users.
**Why:** The original full body plus long differentiator list was redundant. The new format gives one positioning statement plus operational proof points.
**Constraints:** The internal `n` field stays in the differentiator data. Do not re-expand the visible hero into a long paragraph stack plus oversized bullet list without discussion.

**Decision:** Hero CTA label is "Start with a free quote". The form supports both a virtual quote request and scheduling an in-person walkthrough/estimate.
**Why:** "Start with a free quote" is softer on commitment while still surfacing "free" as a trust signal in context.
**Constraints:** The CTA label is currently hardcoded in `components/clean/Hero.tsx`; do not move it into the copy layer without a deliberate decision to do so.

**Decision:** "Other" segment has a distinct hero stub (`segments/other.ts`), not a fallback to base copy.
**Why:** Base copy mentions rentals, offices, and multi-unit work, which does not describe the catch-all audience well enough.
**Constraints:** "Other" hero uses a shorter, intentionally different differentiator set rather than inheriting the base segment content.

**Decision:** Accordion headline is locked as "The kind of work you need" and should live in the copy layer, not remain hardcoded in `ClientAccordion.tsx`.
**Why:** Charles chose this wording because it is clearer on first read and works better for fast-skimming commercial buyers.
**Constraints:** Keep it shared across segments unless there is an explicit future decision to vary it by segment.

**Decision:** Operational claim status currently cleared for production copy is limited to these three claims: (a) "24/7 virtual communication when needed" is true, (b) "Consistent team that learns your space" is aspirational/best-effort and must not be phrased as a guarantee, and (c) "Handles inventory, linen, and basic property tasks" is true for STR and property management.
**Why:** These were the highest-risk hero claims during the copy decision pass and were explicitly reviewed with Charles before implementation.
**Constraints:** Do not generalize beyond these cleared claims. Other operational claims remain unverified unless Charles confirms them.

**Decision:** Active segment is driven by two inputs: accordion item click (real-time) and `?for=` URL query param (on load).
**Why:** This matches the existing hash-state approach already in use and supports direct-link entry without adding route complexity.
**Constraints:** Valid segment values are `'str' | 'offices' | 'property' | 'homes' | 'other'`. Invalid or missing `?for=` falls back silently. Do not add `useSearchParams`; the window-based initializer is the established pattern here.

**Decision:** Navy/gold design system is aligned with `marketresearch.txt` direction.
**Why:** The full design audit confirmed gold is being used as a restrained functional accent, not a dominant decorative fill.
**Constraints:** Keep gold usage restrained and functional. Any future gold-heavy decorative treatment should be flagged against this decision.

**Decision:** Authorship notation convention for dual-tool sessions uses exactly three labels: `Claude-authored`, `Codex-authored`, and `Joint decision`.
**Why:** Both tools now contribute to the same operating system and session history, so attribution needs to stay consistent.
**Constraints:** Apply the labels at the artifact level (decision, implementation block, reasoning artifact), not only at the session level.

**Decision:** `optimize-and-plan` personal skill exists at `~/.claude/skills/optimize-and-plan/SKILL.md`.
**Why:** Charles repeatedly needs help turning raw intent into optimized prompts and sequenced task plans.
**Constraints:** Two modes only: prompt optimizer and task sequencer. Codex-side wording lives separately; Claude must not modify Codex workflow files directly.

**Decision:** Usage discipline and parallel-work protocol is a durable rule.
**Why:** Claude and Codex both have usage limits; without explicit routing discipline, the wrong tool silently takes the wrong task and tokens get wasted on repeated work.
**Constraints:** Conserve high-value reasoning for judgment-heavy work. Repeated chat patterns should become skills, agents, or durable files. Parallel splits only when write surfaces are disjoint. At usage-limit boundaries, produce a structured handoff rather than a vague suggestion to switch tools.

**Decision:** Working docs live under `docs/working/`. Temporary or in-flight artifacts should not stay at the top level of `docs/`.
**Why:** Top-level `docs/` had started mixing durable operating docs with temporary review packs and worksheets, which made both startup context and human navigation noisier.
**Constraints:** Put review-prep material, evidence packs, and working worksheets under `docs/working/` unless a file is clearly durable project truth.

**Decision:** Active briefing docs in `docs/briefs/` are limited to `copy.txt`, `marketresearch.txt`, and `brand-rules.md`.
**Why:** Briefing docs are still useful, but only when they are real live inputs. Retired prompt-input artifacts create drift and waste review time.
**Constraints:** Treat those three files as the active brief layer unless a future deliberate decision changes the set.

---

## Brand & Positioning

**Decision:** Trust proof on the Brazusa site must be layered across multiple formats, in this priority order: (1) operational proof, (2) workforce credibility, (3) accountability proof, (4) segment relevance proof, (5) deliverable proof, (6) social proof, (7) identity proof.
**Why:** The design review flagged that Testimonials currently delivers only social proof. Identity proof is the weakest form and must not carry the full trust burden.
**Constraints:** Do not position identity proof as a primary trust signal. Operational assurance content belongs above or alongside the Testimonials carousel, not below it. See `docs/briefs/brand-rules.md` for the full trust hierarchy and copy rules.

**Decision:** The following operational claims require factual verification before appearing in production copy or design: inspections on every service, verified completion/photo proof, defined response-time commitments, dedicated account manager, backup coverage, same-day issue handling, low turnover, consistently used checklists, clinic-specific protocols, turnover-specific guarantees, supply/linen/reset handling, direct-hire staffing.
**Why:** These claims would strengthen positioning but are meaningless or damaging if not operationally true.
**Constraints:** If a section depends on one of these claims to work, tag it `[VERIFY]` and do not ship it unverified. Full claim safety list is in `docs/briefs/brand-rules.md`.

---

## Startup-Relevant Warnings

- Do not add new operational claims to copy or design without Charles verifying them first.
- During the future design pass, take one focused Claude Design exploration before coding major visual changes.
