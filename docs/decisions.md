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

**Decision:** Geist is the heading typeface (as of 04/30/2026, replacing IBM Plex Sans). Loaded via `next/font/google` under the CSS variable `--font-ibm-plex-sans` — the variable name is an intentional backwards-compat alias; do not rename it. Cascade rule in `globals.css` applies to h1/h2/h3 automatically.
**Why:** IBM Plex Sans was flagged for a stylized lowercase 'g' and 'a' that hurt legibility at heading weight. Geist (geometric sans, designed for interfaces) retains the B2B/operational authority while reading more cleanly at all sizes.
**Constraints:** Never re-introduce Cormorant Garamond or IBM Plex Sans in any context. Syne remains the body/UI font. Do not rename `--font-ibm-plex-sans` without updating all 9+ component references. If a future client needs a different heading typeface, scope it to their own CSS variable — never reuse this one.

**Decision:** Background palette updated from warm amber/linen to cool slate. Live token values: `--color-off-white: #EFF1F3`, `--color-linen: #E5E8EC`, `--color-linen-dark: #DCE0E5`, `--color-light-gray: #CACED4`.
**Why:** Warm amber tokens coded as residential/domestic. Cool undertone puts background temperature in harmony with the navy system and reads operational.
**Constraints:** These four values are now locked. Do not revert. If a future client uses warm backgrounds, scope to their config — never reintroduce warm values into the shared token layer.

**Decision:** Gold discipline rule suspended as of 04/30/2026. The one-gold-moment-per-section constraint is removed for now. Gold may be used freely where it aids legibility, hierarchy, or visual signal.
**Why:** The constraint was causing readability problems — the extra caution it generated pushed UI labels and supporting text to near-illegible gray tones. Readability takes priority over gold frequency.
**Constraints:** None currently active. If gold usage accumulates to the point where it loses meaning, re-introduce a targeted rule in a new design pass. The previous "strip it out" list is not binding.

**Deferred — Claude Design pass on background calibration:** Three interconnected issues observed after the 04/27 implementation pass require a targeted Claude Design session with fresh screenshots before any code changes: (1) StickyNav scrolled state feels jarring at the navy-to-slate transition, (2) cool slate background tones too similar — monotonous feel, (3) navy header text contrast on cool slate reads poorly. Screenshots needed: hero-to-nav scroll transition, a mid-page section showing the header contrast issue, desktop overview. Do not attempt to fix these independently in code before that session.

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

**Decision:** Accordion headline is "The kind of cleaning you need" (changed from "The kind of work you need" on 04/30/2026). Lives in `lib/copy/brazusa-cleaning/base.ts`, not hardcoded in `ClientAccordion.tsx`.
**Why:** "Cleaning" is more specific and accurate — "work" was ambiguous enough to describe any trade service.
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
**Why:** Charles needs help sequencing multi-step implementation tasks, identifying dependencies, and routing work between tools.
**Constraints:** Task sequencer only — Mode 1 (prompt optimizer) was removed and replaced by the dedicated `prompt-engineering-advisor` skill. Codex-side wording lives separately; Claude must not modify Codex workflow files directly.

**Decision:** `prompt-engineering-advisor` personal skill exists at `~/.claude/skills/prompt-engineering-advisor/SKILL.md`.
**Why:** Charles frequently writes prompts for handoff to other models (ChatGPT, Gemini, Claude Design, Codex, fresh Claude sessions) and also uses the write-prompt-then-feed-back strategy within the same session. The skill replaces Mode 1 of optimize-and-plan and the old chatgpt-prep agent.
**Constraints:** Trigger on any prompt intended for cross-model handoff or feed-back-to-self. Output always includes five sections: Engineering Assessment, Prompt, Why It's Written This Way, What Would Strengthen This, Token Notes. The write-prompt-then-feed-back strategy has real value for cross-model transfer (different context gap); for same-session self-prompting it is usually overhead — the skill assesses this per situation.

**Decision:** Two Claude Code hooks added to `.claude/settings.local.json` (project-level only):
- `PreToolUse` on `Glob` — echoes reminder to check `docs/file-index.md` before doing file discovery searches.
- `Stop` — echoes session-end checklist: append to session-log.md, write durable decisions to decisions.md, update file-index.md if files changed.
**Why:** Written rules are unreliable mid-task; hooks fire at the right moment. File index checking was being skipped (Claude globbed market research files instead of reading the index). Session-end documentation was inconsistent.
**Constraints:** Stop hook fires in interactive mode after every response turn, not only at true session end — treat it as a reminder, not a guarantee. Project-level only; do not add to global settings.

**Deferred:** Stale permissions in `.claude/settings.local.json` — the `allow` list contains scaffold commands from initial Next.js setup that are no longer needed. Clean these up in a single pass once remaining config changes settle. Do not remove them piecemeal.

**Decision:** Usage discipline and parallel-work protocol is a durable rule.
**Why:** Claude and Codex both have usage limits; without explicit routing discipline, the wrong tool silently takes the wrong task and tokens get wasted on repeated work.
**Constraints:** Conserve high-value reasoning for judgment-heavy work. Repeated chat patterns should become skills, agents, or durable files. Parallel splits only when write surfaces are disjoint. At usage-limit boundaries, produce a structured handoff rather than a vague suggestion to switch tools.

**Decision:** Lower-frequency Claude workflow detail lives in `docs/claude-reference.md`, while `CLAUDE.md` keeps compact pointer stubs for always-loaded startup use.
**Why:** Claude startup cost should stay low, but the moved guidance still needs to remain discoverable and explicit when a task actually needs it.
**Constraints:** Do not trim `CLAUDE.md` by silently deleting useful guidance. Move lower-frequency elaboration into `docs/claude-reference.md` first, then leave a stub in `CLAUDE.md` that says what moved, where it lives, and when Claude should consult it.

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

---

## Section Architecture (Brazusa /clean)

**Decision:** Section order is locked as of the 04/30/2026 design pass. Order: StickyNav → Hero → TrustStrip → Positioning → TrustStats → ClientAccordion → Services → Pricing → About → Testimonials → ServiceArea → FinalCTA → Footer.
**Why:** CalloutBand was removed and its content merged into Positioning (04/30). TrustStats moved to position 5 (between Positioning and ClientAccordion) to serve as an immediate credibility signal before the service selector.
**Constraints:** Do not reorder sections without an explicit design decision. HowItWorks and CalloutBand were removed — do not re-insert without discussion.

**Decision:** `TrustStats` is between Positioning and ClientAccordion (position 5). Navy bg + grain. Three stats: 30+ Years / 100% Insured / 24/7 Availability. Numbers in white (not gold), 24×1px gold rule per stat.
**Why:** Originally placed at position 12 (ServiceArea → TrustStats → FinalCTA), but the redesign moved it to position 5 so credibility signals appear before the service selector, not after.
**Constraints:** Numbers stay white — gold rules are the gold moment here. Do not change number color to gold without revisiting gold discipline.

**Decision:** `CalloutBand` deleted (04/30/2026). Its statement ("You shouldn't have to manage the people managing your space.") was merged as a closing callout inside `Positioning.tsx`, separated by a 1px white-10 hairline at the bottom of the left copy column.
**Why:** Standalone section for one line wasted vertical space. The statement is more effective as a closing punch inside the Positioning argument.
**Constraints:** Do not re-add CalloutBand as a standalone section.

**Decision:** `MobileCTABar` is retired. Persistent CTAs moved into the mobile nav header (StickyNav).
**Why:** Claude Design confirmed the nav header handles mobile CTAs — a fixed bottom bar creates redundancy.
**Constraints:** Do not re-add MobileCTABar. If mobile CTA behavior needs adjusting, adjust StickyNav.

**Decision:** `HowItWorks` component deleted. Not in the new section order.
**Why:** Claude Design omitted it from the new section order and it was not referenced anywhere else in the app.
**Constraints:** Do not restore without discussion.

**Decision:** `QuickContact` component deleted. Phone, email, and Google Business contact info merged into `FinalCTA`.
**Why:** Two consecutive contact surfaces were redundant. FinalCTA is the natural home for all contact info at page bottom.
**Constraints:** FinalCTA now contains a 3-column contact strip (CALL OR TEXT / EMAIL / GOOGLE). Do not add a separate contact section elsewhere.

**Decision:** `Testimonials` is a category accordion. Five categories: STR / Property / Offices / Homes / Other. STR opens by default on load. Toggle behavior in `helpers/testimonialToggle.ts`.
**Why:** Claude Design specified accordion over carousel for B2B credibility. STR auto-open makes the content immediately readable and demonstrates the interaction pattern without requiring an additional click.
**Constraints:** Do not revert to carousel without a new design decision. The `testimonialToggle` pure function is the canonical toggle logic — do not inline it.

**Decision:** Section label bar pattern: most sections get a 1px-wide × 32px-tall gold vertical bar + gold uppercase Syne text as the section label. Exceptions: Positioning (replaced by a 42×1px gold accent rule directly on the H2) and FinalCTA (label removed entirely — section identity is clear from context).
**Why:** Claude Design introduced this as a consistent wayfinding pattern. Positioning's label was "Positioning" — an internal descriptor that adds no user value. FinalCTA's "Contact" label was redundant alongside the H2.
**Constraints:** The gold bar counts toward the gold-per-section budget. Positioning uses the gold rule on the H2 instead. Do not re-add labels to Positioning or FinalCTA without discussion.

**Decision:** `--color-linen-deep: #D0D5DC` added as a CSS token. Used in Testimonials gradient background.
**Why:** Needed for the Testimonials section linen-to-off-white background range after background palette shifted to cool slate.
**Constraints:** Cool slate family only — do not reintroduce warm amber values.

**Deferred — Component render test coverage:** Full component render tests (jsdom + React Testing Library) are not possible with the current Vitest node environment. Package install required. Defer until the site is more finished — add tests in a single pass across all components rather than piecemeal.
**How to apply:** When the time comes, the package install conversation should cover: `@testing-library/react`, `@testing-library/user-event`, jsdom environment config in vitest.config.ts. Start with the most interactive components (QuoteDrawer, Testimonials, StickyNav).

**Deferred — Code-review skill:** A personal skill to run coding standards checks, catch basic errors, and audit file architecture/organization for messiness, loose files, and misplaced components. Not yet built.
**How to apply:** When building this skill, scope it to: CLAUDE.md rule compliance, TypeScript standards (strict mode, explicit types, no implicit any), component line count thresholds, file placement conventions (helpers in /helpers, utilities not loose), CSS token vs. raw rgba usage.

**Deferred — Design-review agent updates:** The `.claude/agents/design-review.md` agent needs to be updated to reflect the current design standards (Geist heading typeface, cool slate tokens, section label bar exceptions for Positioning and FinalCTA, TrustStats at position 5, no CalloutBand).
**How to apply:** Run a targeted agent update once the visual pass is stable.

**Deferred — Services "Other" space type:** Add an "Other" panel to the ClientAccordion (or the Services section "What we handle daily") for spaces that don't fit a category. No copy written yet.
**How to apply:** When copy is ready, add an accordion item matching the existing pattern in `page.tsx` clientItems array and a corresponding services filter entry.

**Deferred — Services section copy customization per space type:** The "What we handle daily" services grid currently shows the same items regardless of which accordion panel is open. The copy and service list should adapt per space type (STR, property, offices, homes, other). Currently there is no per-type copy for this section.
**How to apply:** Extend the copy layer in `lib/copy/brazusa-cleaning/` with a services-specific copy block per segment, following the same base+override pattern used for hero and accordion copy.

**Deferred — TrustStrip ticker: more items + color changes:** The ticker list needs more items added over time. Also, Charles flagged wanting to revisit the font color and/or bullet point colors in the strip.
**How to apply:** Add items to the `items` array in `TrustStrip.tsx`. For color/bullet changes, evaluate the current `--color-warm-gray-dark` text and `--color-navy-20` bullet against the off-white background — consider making the bullet gold or increasing text contrast.

**Deferred — ServiceArea responsive column equalization:** The "Greater Boston towns" column has significantly more chips than "Boston neighborhoods," making the two columns unequal height and visually awkward. Hide the least-important towns dynamically to equalize column heights. Least-important towns (hide first): Canton, Belmont, Winthrop, Revere, Chelsea, Framingham, Randolph.
**How to apply:** Implement a CSS or JS approach that progressively hides lower-priority chips until both columns reach equal height. Hiding should be responsive (depends on viewport/column width). The `+ more` chip already signals overflow.

**Deferred — Service area checker widget:** A quick interactive widget where someone can enter an address and immediately know whether we cover it. Four response tiers: (A) Definitely clean there, (B) Probably clean there, (C) Probably don't clean there, (D) Definitely don't clean there. Coverage zones would be defined as a structured data object mapping to the existing town/neighborhood lists.
**How to apply:** Design data structure for coverage zones first (town-level matched against the existing greaterBostonTowns and bostonNeighborhoods arrays). Then build a simple input + instant lookup. No API required — pure client-side match. Consider adding it to ServiceArea.tsx or as a modal/drawer triggered by the "Check if we cover your area" button.

---

## Startup-Relevant Warnings

- Do not add new operational claims to copy or design without Charles verifying them first.
- Design direction for the Brazusa /clean page is evolution-only (confirmed, not a full reset). Heading typeface is Geist (implemented 04/30/2026, under `--font-ibm-plex-sans` alias). Hero photo swap is still pending — current image codes as residential premium and needs operational-scale imagery. Do not treat the visual pass as complete until the hero photo is addressed.
- Background tone and gold discipline passes are complete (token values locked). Gold discipline suspension is deliberate — final pass deferred. See Section Architecture deferred item above.
- Section order locked as of 04/30/2026. See Section Architecture section above.
- The CSS variable `--font-ibm-plex-sans` loads Geist — this is an intentional alias kept for backwards compat. Do not rename the variable.
