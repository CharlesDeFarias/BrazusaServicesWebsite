# Current State

## Current phase
Design review prep complete. Ready for the design review pass.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- During the design pass, take one focused Claude Design exploration before coding major visual changes.

## Next tasks
- `Claude:` Run the design review — three-pass structure in `docs/working/design-review/review-notes.txt`. Charles fills in Part 1 (observations) and Part 4 (screenshot priorities) first.
- `Codex:` Design-violation fixes once Claude's review produces a ranked findings list (ClientAccordion background, FinalCTA grain, Services raw gold token, Testimonials raw white). Resume after design direction is confirmed.
- `Charles only:` Fill in the observation memo and screenshot priority labels in `docs/working/design-review/review-notes.txt`. Declare evolution-only vs redesign-acceptable before starting the review.

## Known blockers
- Charles's observation memo not yet written — required before the Claude CLI design review can start.
- Design direction not locked — no implementation work should start on visual changes until the review is complete.

## Charles note
- Token efficiency work is done for now. Workflow system is in a good state. The design review is the next meaningful product task.
