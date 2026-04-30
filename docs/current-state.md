# Current State

## Current phase
Claude Design pass (round 2) complete and fully implemented. Site substantially redesigned: new section order locked, new components added (CalloutBand, TrustStats), retired components removed (HowItWorks, MobileCTABar, QuickContact), Testimonials replaced with accordion, FinalCTA merged with contact info. Hero photo swap still pending.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Section order is locked — see decisions.md Section Architecture. Do not reorder, add, or remove sections without an explicit decision.
- Gold discipline is temporarily suspended pending a final review pass. Do not treat current gold usage as the locked final state.
- Hero photo still codes as residential premium. Do not treat the visual pass as complete until the hero photo is swapped.

## Next tasks
- `Charles only:` Source an operational-scale hero photo (not residential/premium — should read commercial/B2B cleaning operation). Replace `public/images/hero.webp`.
- `Claude or Codex:` Final gold discipline pass — greyscale test each gold element per section, strip those that fail when another gold element is already doing structural work. Requires looking at the fully rendered page first.
- `Claude:` Update `.claude/agents/design-review.md` to reflect current design standards (section label bar, IBM Plex Sans headings, cool slate tokens). Deferred until gold pass is complete.
- `Deferred:` Stale permissions cleanup in `.claude/settings.local.json` (scaffold allow-list). Do in one pass once remaining config changes settle.
- `Deferred:` Component render test coverage (jsdom + RTL). After site is more finished.
- `Deferred:` Code-review personal skill. Builds on CLAUDE.md standards.

## Known blockers
- Hero photo swap pending (Charles sourcing).
- Gold discipline final pass requires a stable rendered state to evaluate — blocked on hero photo and any remaining visual changes.

## Charles note
- Claude Max subscription active as of end of 04/29/2026 session.
- The 04/29/2026 design pass was run as a disjointed review — two Claude sessions with context breaks. Process notes are in docs/ai-case-study.md.
- Workflow tooling added in prior sessions: prompt-engineering-advisor skill, PreToolUse Glob hook, Stop hook. All still active.
