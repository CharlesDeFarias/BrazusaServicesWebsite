# Current State

## Current phase

Meta cleanup complete as of 05/02/2026 session. All micro-fix rounds complete and committed. Root cause of the persistent FinalCTA blank space found and fixed (globals.css `.grain` CSS cascade bug — see decisions.md). Three deferred items enacted: Testimonials/About section swap, Examples nav link, ScrollToTop section-aware color.

Commits this session:
- **Round 1** (commit `487f304`): nav hover states, Hero CTA font-medium → font-semibold, TrustStrip gold bullets + darker text, Positioning right card 300px → 400px, ClientAccordion "Other spaces too" cursor, Services bottom row restructured to 2-col grid
- **Round 2** (commit `4cffe31`): Positioning subtitle restyled (Syne 13px/500/white-40/tracking), ScrollToTop cursor-pointer, Services bottom row centered with flex justify-center
- **Round 3** (commit `3d2e...`): ServiceArea "not sure" text made clickable, "check if we cover your area" button removed, column widths adjusted to 11fr/9fr, About top spacing reduced, deferred items added to decisions.md
- **Round 4** (commit `4feb84b`): ServiceArea bottom padding tightened (py-10 → pt-10 pb-3), Framingham removed from towns list (fixed +more chip line-wrap)
- **Round 5** (commit `59cc30d`): **Critical fix** — globals.css `.grain > *` rule removed, `::after` z-index changed from 1 to -1. Root cause of the persistent 320px blank space above FinalCTA.
- **Round 6** (commit `9cc8978`): Testimonials/About swap, Examples nav link in StickyNav, ScrollToTop IntersectionObserver color adaptation (navy → off-white over dark sections)
- **Meta cleanup** (commit `3b0bc46`): Deleted design-review.md agent, chatgpt-prep.md agent, agent-memory/design-review, all 34 design-review screenshots, 3 working txt files, all 5 superpowers plan/spec docs. Updated decisions.md, ai-case-study.md, CLAUDE.md, file-index.md.
- **Mobile review fixes** (commit `bfab488`): StickyNav hamburger menu gets explicit top+bottom borders in both scroll states; clientTypes children made visually subordinate (xs, indented, dimmer). Hero differentiator pills hidden on mobile (hidden sm:flex). TrustStrip gets 'Scope Adapts to Your Needs' and 'No Oversight Required'; removed '100% Insured' duplicate. Three deferred items added to decisions.md.
- **Mobile nav scroll + ticker drag** (commit `628cafd`): StickyNav inner menu div scrollable (overflow-y-auto, maxHeight 415px). TrustStrip converted to 'use client' with pointer-driven drag-to-scroll; animation pauses on drag, wrapper eases back on release. Mobile marquee speed halved to 14s via media query.
- **Services button arrow removed** (commit `628cafd` area): Removed trailing → from "Not sure what fits?" button text — was wrapping to a second line on mobile with just the arrow.
- **Ticker drag fix + 50% speed increase** (commit `d323dbc`): First two attempts at CSS animation-delay approach — both failed. Root cause: `animationDelay` set as a separate property after the `animation` shorthand starts is ignored by CSS spec; delay only applies at animation start time. Even embedding delay in the shorthand was unreliable due to `getComputedStyle` edge cases on paused animations.
- **TrustStrip rewrite to RAF loop** (commit `1036cc0`): Replaced CSS animation entirely with a `requestAnimationFrame` loop. Position lives in a `posRef` (plain number, px). Loop subtracts `(halfWidth / duration / 1000) * dt` each frame. Drag adds pointer deltas directly to `posRef` on each `pointermove`. On release the loop just continues — no restart, no timing math, no CSS animation involved. `lastTimeRef` reset to `undefined` on pointer-up prevents a dt spike from the drag pause. `.marquee-track` CSS class no longer applied to the element (class still exists in globals.css but is dead).
- **Speed calibration** (commits `6d19242`, `cf130ff`): 19s/9s was too fast once drag worked. Final: desktop 60s, mobile 46s.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Section order is locked — see decisions.md Section Architecture. Current order: StickyNav → Hero → TrustStrip → Positioning → TrustStats → ClientAccordion → Services → Pricing → Testimonials → About → ServiceArea → FinalCTA → Footer.
- Gold discipline is temporarily suspended pending a final review pass. Do not treat current gold usage as the locked final state.
- Hero photo still codes as residential premium. Do not treat the visual pass as complete until the hero photo is swapped.
- The CSS variable `--font-ibm-plex-sans` now loads Geist. The alias is intentional for backwards compat — do not rename the variable.
- TrustStats stat values are gold (not white) — locked state after the second design pass.
- Positioning subtitle is Syne 13px/500/--color-white-40 — intentional subtitle styling, not body text.
- `.grain::after` uses z-index: -1 (within isolation: isolate stacking context). The `.grain > *` rule is gone. Do not re-add it.
- `.claude/agents/design-review.md` is deleted. Use the superpowers design-review subagent (Skill tool) instead.
- TrustStrip uses a `requestAnimationFrame` loop (not CSS animation). Position is `posRef.current` in px. Speed is controlled by `DURATION_DESKTOP` / `DURATION_MOBILE` constants in the component — no globals.css sync required. The `.marquee-track` CSS class is dead (do not re-apply it to the element).

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium). Replace `public/images/hero.webp`. — Or: run the deferred hero image prompt task (Claude derives dimensions + writes AI generation prompt for Charles to run).
- `Deferred:` WhatsApp and WeChat contact buttons — placement TBD, Charles to supply number/ID.
- `Deferred:` Hero image dimensions + AI generation prompt (Claude task, then Charles generates).
- `Claude or Codex:` Final gold discipline pass — requires stable rendered state first.
- `Deferred:` Component render test coverage (jsdom + RTL). After site is more finished.
- `Deferred:` Code-review personal skill.
- `Deferred:` ServiceArea responsive column equalization (progressive hide of low-priority towns).
- `Deferred:` Service area checker widget.
- `Deferred:` Services "Other" accordion panel — copy not written yet.
- `Deferred:` Services section copy per space type.
- `Done:` TrustStrip drag-to-scroll — complete (RAF loop, both platforms).
- `Deferred:` Decide whether to remove hero differentiator pills on desktop too.
- `Deferred:` QuoteDrawer email/phone field split — touches API, Airtable, Resend. Requires integration-safety agent first.

## Known blockers
- Hero photo swap pending (Charles sourcing).
- Gold discipline final pass requires stable rendered state — blocked on hero photo and any remaining visual changes.

## Charles note
- Claude Max subscription active as of end of 04/29/2026 session.
- All design passes and micro-fix rounds implemented entirely in Claude — no Codex involvement.
