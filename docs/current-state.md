# Current State

## Current phase
All micro-fix rounds from 05/02/2026 session now complete and committed. Root cause of the persistent FinalCTA blank space found and fixed (globals.css `.grain` CSS cascade bug — see decisions.md).

Commits this session:
- **Round 1** (commit `487f304`): nav hover states, Hero CTA font-medium → font-semibold, TrustStrip gold bullets + darker text, Positioning right card 300px → 400px, ClientAccordion "Other spaces too" cursor, Services bottom row restructured to 2-col grid
- **Round 2** (commit `4cffe31`): Positioning subtitle restyled (Syne 13px/500/white-40/tracking), ScrollToTop cursor-pointer, Services bottom row centered with flex justify-center
- **Round 3** (commit `3d2e...`): ServiceArea "not sure" text made clickable, "check if we cover your area" button removed, column widths adjusted to 11fr/9fr, About top spacing reduced, deferred items added to decisions.md (section swap + nav link)
- **Round 4** (commit `4feb84b`): ServiceArea bottom padding tightened (py-10 → pt-10 pb-3), Framingham removed from towns list (fixed +more chip line-wrap)
- **Round 5** (commit `59cc30d`): **Critical fix** — globals.css `.grain > *` rule removed, `::after` z-index changed from 1 to -1. This was the root cause of the persistent 320px blank space above FinalCTA's gold rule. See decisions.md CSS/Design System section for full explanation.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Section order is locked — see decisions.md Section Architecture. Do not reorder, add, or remove sections without an explicit decision.
- Gold discipline is temporarily suspended pending a final review pass. Do not treat current gold usage as the locked final state.
- Hero photo still codes as residential premium. Do not treat the visual pass as complete until the hero photo is swapped.
- The CSS variable `--font-ibm-plex-sans` now loads Geist. The alias is intentional for backwards compat — do not rename the variable.
- TrustStats stat values are gold (not white) — locked state after the second design pass.
- Positioning subtitle is Syne 13px/500/--color-white-40 — intentional subtitle styling, not body text.
- `.grain::after` uses z-index: -1 (within isolation: isolate stacking context). The `.grain > *` rule is gone. Do not re-add it.

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium). Replace `public/images/hero.webp`.
- `Charles:` Visually verify the FinalCTA blank space is resolved and ServiceArea bottom padding (pb-3) feels right — it may need to go to pb-4 or pb-6 depending on how it looks now that the 320px phantom block is gone.
- `Claude or Codex:` Final gold discipline pass — requires stable rendered state first.
- `Claude:` Update `.claude/agents/design-review.md` to reflect current design standards (Geist headings, cool slate tokens, no CalloutBand, TrustStats at pos 5, TrustStats numbers now gold). Deferred until gold pass is complete.
- `Deferred:` Component render test coverage (jsdom + RTL). After site is more finished.
- `Deferred:` Code-review personal skill.
- `Deferred:` ServiceArea responsive column equalization (progressive hide of low-priority towns).
- `Deferred:` Service area checker widget.
- `Deferred:` Services "Other" accordion panel — copy not written yet.
- `Deferred:` Services section copy per space type.
- `Deferred:` TrustStrip ticker — more items; revisit font/bullet colors (partially done: gold bullets + navy-60 text).
- `Deferred:` ScrollToTop section-aware color (navy button disappears over navy sections).
- `Deferred:` Swap Testimonials and About section order.
- `Deferred:` Add Testimonials/Examples link to StickyNav.

## Known blockers
- Hero photo swap pending (Charles sourcing).
- Gold discipline final pass requires stable rendered state — blocked on hero photo and any remaining visual changes.

## Charles note
- Claude Max subscription active as of end of 04/29/2026 session.
- Both design passes (04/30/2026) and all micro-fix rounds (05/02/2026) implemented entirely in Claude — no Codex involvement.
