# Current State

## Current phase
- Startup-context cleanup and design-review prep before the next product pass.

## Active constraints most likely to matter this session
- Read this file first, then `docs/decisions.md`; `docs/session-log.md` is not startup context.
- Do not touch live integrations without the manifest-first safety workflow.
- Do not add new operational claims to site copy without Charles verifying them first.
- Brazusa stays single-page `/clean`; segment-specific copy belongs in the copy layer, not ad hoc component strings.
- During the future design pass, take one focused Claude design exploration before coding major visual changes.

## Next tasks
- `Claude:` Review this startup-context cleanup and later run the focused design review once the prep packet is ready.
- `Codex:` Resume bounded implementation after this cleanup, likely design-prep support or the next scoped app task Charles chooses.
- `Charles only:` Write the short design-review observation memo / review notes so the next Claude design pass has a tighter packet.

## Known blockers
- Operational claim verification is still incomplete for broader per-segment copy expansion.
- The review-packet workflow is not formalized yet, so large review requests still need careful manual scoping.

## Charles note
- Token efficiency matters more than perfect doc elegance right now. I want the system to preserve quality while making it easier to keep moving when Claude or Codex usage limits get tight.
