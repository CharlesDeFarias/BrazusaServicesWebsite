# Brazusa Copy Decisions

## Updated plan

### Locked now
- Hero CTA direction is settled: restore "free" language to make it explicit that the quote / estimate has no charge.
- Hero CTA label is implemented as `Start with a free quote`.
- Hero copy direction is settled: shorten the mobile hero substantially.
- Hero format is settled: a short subtitle-style body paragraph plus a shortened bullet list.
- Shared hero differentiators are now capped at 6. The `other` segment intentionally uses only 3.
- Accordion headline is locked as `The kind of work you need`.
- Accordion headline has been moved into the copy layer.
- `other` now has its own hero stub instead of falling back to `baseCopy`.
- Three hero-related claims are verified and safe to use:
  - `24/7 virtual communication when needed` = true
  - `Consistent team that learns your space` = aspirational / best-effort, not a guarantee
  - `Handles inventory, linen, and basic property tasks` = true for STR and property management

### Still open
- Wire the approved `serviceDefinitions` and `extendedServiceDefinitions` copy into the copy layer and/or Services component path.
- Run the next design pass.
- Broader operational-trust verification for stronger final copy/design claims.

### Mechanical follow-up
- Wire the approved `serviceDefinitions` and `extendedServiceDefinitions` copy into the copy layer and/or Services component path.
  Owner: Codex
  Status: mechanical, now unblocked by the hero / CTA / accordion decisions.

### Copy-independent follow-up
- Fix the blank beige gap below the moving banner on mobile.
  Owner: Codex
  Status: layout bug, independent of the copy decisions.

### Design follow-up
- During the future design pass, take one focused exploration pass in Claude Design before coding major visual changes.
  Owner: Claude
  Status: exploratory, not source of truth for implementation.

### Current copy-layer reality
- `lib/copy/brazusa-cleaning/base.ts` and `segments/*.ts` now store shared `hero` copy and the shared `accordion.headline`.
- The accordion headline is no longer hardcoded in `components/clean/ClientAccordion.tsx`.
- The hero CTA label is still hardcoded in `components/clean/Hero.tsx`.
- `serviceDefinitions` and `extendedServiceDefinitions` copy exists in `docs/session-log.md` (04/21), but is not yet wired into the segment copy system.

## Remaining Verification Questions
1. Are inspections on every service a real operational claim, or is that too strong?
2. Do you currently provide any real proof-of-completion workflow beyond normal confirmation messages, such as photos, checklists, or written reports?
3. Is there a real response-time expectation you want the site to imply or state, or should we avoid response-time claims entirely for now?
4. Is there truly one accountable point of contact for a client/account, or is that not consistent enough to claim yet?
5. Are there any service checklists, reports, or recurring standards that are real enough to mention on-site?
6. For clinics specifically, are there any real protocols or boundaries we can safely mention, or should clinic language stay general for now?
7. For STR work, are there any stronger guarantees or workflow elements that are definitely true today beyond linens, inventory, tiered cleans, and issue flagging?
8. Workforce truth check: is the team direct employees, subcontractors, or a hybrid?
