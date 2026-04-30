# Current State

## Current phase
18-item design pass complete (04/30/2026). Geist replaces IBM Plex Sans as the heading typeface (CSS variable alias kept). CalloutBand merged into Positioning and deleted. TrustStats repositioned between Positioning and ClientAccordion. Testimonials now opens STR by default. Multiple contrast, legibility, and layout fixes applied across 7 components. Dev server not yet tested after this pass — verify visually before pushing.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Section order is locked — see decisions.md Section Architecture. Do not reorder, add, or remove sections without an explicit decision.
- Gold discipline is temporarily suspended pending a final review pass. Do not treat current gold usage as the locked final state.
- Hero photo still codes as residential premium. Do not treat the visual pass as complete until the hero photo is swapped.
- The CSS variable `--font-ibm-plex-sans` now loads Geist, not IBM Plex Sans. The alias is intentional for backwards compat — do not rename the variable.

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium — should read commercial/B2B cleaning operation). Replace `public/images/hero.webp`.
- `Claude or Codex:` Final gold discipline pass — greyscale test each gold element per section, strip those that fail when another gold element is already doing structural work. Requires looking at the fully rendered page first.
- `Claude:` Update `.claude/agents/design-review.md` to reflect current design standards (Geist headings, cool slate tokens, no CalloutBand, TrustStats at pos 5, section label bar not universal). Deferred until gold pass is complete.
- `Deferred:` Stale permissions cleanup in `.claude/settings.local.json` — scaffold allow-list entries cleaned this session, but review remains to confirm nothing useful was removed.
- `Deferred:` Component render test coverage (jsdom + RTL). After site is more finished.
- `Deferred:` Code-review personal skill. Builds on CLAUDE.md standards.

## Known blockers
- Hero photo swap pending (Charles sourcing).
- Gold discipline final pass requires a stable rendered state to evaluate — blocked on hero photo and any remaining visual changes.

## Charles note
- Claude Max subscription active as of end of 04/29/2026 session.
- 04/30/2026 session: 18-item pass implemented entirely in Claude after context compaction mid-session. All items committed in single commit `81b06d0`.
