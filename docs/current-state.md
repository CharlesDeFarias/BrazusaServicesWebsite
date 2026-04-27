# Current State

## Current phase
Design review first-impression pass complete. Evolution-only direction confirmed. Typeface direction + hero photo pass is the next Claude Design session.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- Design direction is evolution-only (confirmed 2026-04-27). Two structural fixes: typeface system-wide + hero photo swap. Background tone and gold are evolution fixes, not structural.
- Do not implement any visual changes until Claude Design pass on typeface/hero confirms direction.

## Next tasks
- `Charles only:` Run next Claude Design session — fresh conversation, paste the typeface+background+image prompt prepared in the 04/27 session, attach 4 screenshots (desktop-01, desktop-04, desktop-08 or desktop-09, mobile-01). Use "Other" template.
- `Claude:` After Charles returns with Claude Design output — review findings, make design decisions, produce Codex implementation prompts for visual changes.
- `Codex:` Design violation fixes (ClientAccordion background, FinalCTA grain, Services raw gold, Testimonials raw white) — resume after design direction is confirmed from Claude Design.
- `Deferred:` Stale permissions cleanup in `.claude/settings.local.json` (scaffold allow-list). Do in one pass once remaining config changes settle.

## Known blockers
- Claude Design session for typeface/hero not yet run -- this is the blocker for all visual implementation.

## Charles note
- Evolution-only is confirmed. The main open question is typeface direction and what the new hero imagery should look like. Claude Design answers both.
- Workflow tooling added this session: prompt-engineering-advisor skill, PreToolUse Glob hook, Stop hook.
