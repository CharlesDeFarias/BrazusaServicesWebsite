# Current State

## Current phase
Two design passes complete as of 04/30/2026. First pass (commit `81b06d0`): 18-item Claude Design pass — Geist font, section reorder, CalloutBand removed, TrustStats repositioned, 7 contrast/legibility fixes. Second pass (commit `9cc8978`): copy refinements, gold label pass, nav text updates, whitespace tightening. Hero photo swap still pending — current image reads residential/premium, not operational/B2B.

## What changed in the second pass (9cc8978)
- **TrustStats**: stat values changed from white → gold
- **TrustStrip**: 3 new ticker items added (30+ Years Experience, 100% Insured, 24/7 Availability); "Fully Insured" renamed "Fully Insured & Documented"
- **Positioning**: callout ("You shouldn't have to manage the people managing your space.") moved to subtitle directly below the H2; key points copy updated
- **Pricing**: section label colors → gold
- **About**: gap reduced between section label and heading (mb-8 → mb-4)
- **FinalCTA + ServiceArea**: vertical whitespace reduced (py-14 → py-10)
- **Hero copy**: "Cleaning built" → "Cleaning especially built" across all 5 applicable segments
- **StickyNav**: "Clean my..." → "Spaces we clean"; "Something else..." → "Everything else"; cursor-pointer added to dropdown trigger; mobile instances fixed
- **Raw rgba() values**: no-token-intentional comments added in TrustStrip, Positioning, StickyNav

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Section order is locked — see decisions.md Section Architecture. Do not reorder, add, or remove sections without an explicit decision.
- Gold discipline is temporarily suspended pending a final review pass. Do not treat current gold usage as the locked final state.
- Hero photo still codes as residential premium. Do not treat the visual pass as complete until the hero photo is swapped.
- The CSS variable `--font-ibm-plex-sans` now loads Geist. The alias is intentional for backwards compat — do not rename the variable.
- TrustStats stat values are gold (not white) — this is the locked state after the second design pass.

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium — should read commercial/B2B cleaning operation). Replace `public/images/hero.webp`.
- `Claude or Codex:` Final gold discipline pass — greyscale test each gold element per section, strip those that fail when another gold element is already doing structural work. Requires looking at the fully rendered page first.
- `Claude:` Update `.claude/agents/design-review.md` to reflect current design standards (Geist headings, cool slate tokens, no CalloutBand, TrustStats at pos 5, section label bar not universal, TrustStats numbers now gold). Deferred until gold pass is complete.
- `Deferred:` Stale permissions cleanup in `.claude/settings.local.json` — scaffold allow-list entries may still need review.
- `Deferred:` Component render test coverage (jsdom + RTL). After site is more finished.
- `Deferred:` Code-review personal skill.
- `Deferred:` ServiceArea responsive column equalization (hide low-priority towns to equalize column heights).
- `Deferred:` Service area checker widget (address input → coverage tier A/B/C/D).
- `Deferred:` Services "Other" accordion panel — copy not written yet.
- `Deferred:` Services section copy per space type — "What we handle daily" currently static regardless of active segment.
- `Deferred:` TrustStrip ticker — more items; revisit font/bullet colors.

## Known blockers
- Hero photo swap pending (Charles sourcing).
- Gold discipline final pass requires stable rendered state — blocked on hero photo and any remaining visual changes.

## Charles note
- Claude Max subscription active as of end of 04/29/2026 session.
- Both design passes (04/30/2026) implemented entirely in Claude — no Codex involvement.
