# Current State

## Current phase
Active micro-fix rounds as of 2026-05-02. Two design passes locked on 04/30 (commits `81b06d0` + `9cc8978`). Three rounds of targeted micro-fixes applied in this session:

- **Round 1** (commit `487f304`): nav hover states (cursor-pointer on logo/wordmark/Get a Quote), Hero CTA font-medium → font-semibold, TrustStrip gold bullets + darker text, Positioning right card 300px → 400px, ClientAccordion "Other spaces too" cursor, Services bottom row restructured to 2-col grid (optional layers note + not sure button)
- **Round 2** (commit `4cffe31`): Positioning subtitle restyled as true subtitle (Syne 13px/500/white-40/tracking), ScrollToTop cursor-pointer added, Services bottom row centered with flex justify-center (mt-4 → mt-2), pre-existing `color: 'white'` token violation fixed in Positioning h2
- **Round 3** (in progress / about to commit): ServiceArea "not sure" text made clickable, "check if we cover your area" button removed, towns/neighborhoods column widths adjusted, About top spacing reduced

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

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium). Replace `public/images/hero.webp`.
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
- Both design passes (04/30/2026) and all micro-fix rounds implemented entirely in Claude — no Codex involvement.
