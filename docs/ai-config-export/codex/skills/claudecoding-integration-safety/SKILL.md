---
name: claudecoding-integration-safety
description: Protect live integrations in the claudecoding project before any risky changes. Use before changing API routes, validators, payload shape, Airtable fields, Resend templates, Google Sheets mapping, environment-variable usage, or any form flow that affects real client data. Read the current state, produce a manifest, and require explicit confirmation before code is touched.
---

# claudecoding Integration Safety

Use this skill before any meaningful change to the live form and integration layer in `claudecoding`.

## Core purpose
This project writes real client submissions to three destinations in parallel:
- Resend
- Airtable
- Google Sheets

A change to one path often implies changes to the others. This skill exists to prevent silent breakage, lost data, or incomplete updates.

## When to use
Use this skill before changing:
- `app/api/quote/route.ts`
- `app/api/newsletter/route.ts`
- validators in `lib/validators/`
- mapping logic in `lib/integrations/`
- client integration config in `lib/clients/`
- environment-variable usage tied to these flows
- payload shape, field names, or field requirements for live submissions

Do not skip this step because the change seems small.

## Required reading order
Read in this order:
1. Relevant API route in `app/api/`
2. Relevant validator in `lib/validators/`
3. `lib/integrations/resend.ts`
4. `lib/integrations/airtable.ts`
5. `lib/integrations/google-sheets.ts`
6. Relevant client config in `lib/clients/`

If the proposed change is already known, trace exactly where it would propagate.

## Output requirements
Produce a manifest, not an implementation plan.

Use this structure:

## Integration Safety Manifest — [route or flow]

### Current payload shape
- field, type, required/optional, validation summary

### Field mapping across destinations
- field to Resend usage
- field to Airtable column
- field to Sheets column

### Proposed change impact
- Resend impact
- Airtable impact
- Google Sheets impact
- Validator impact
- API route impact

### Files that would need updating
- exact file list only

---
CONFIRMATION REQUIRED before proceeding.

Do not touch any of the files listed above until Charles has reviewed the manifest
and explicitly confirmed each destination change.

State your confirmation: "Confirmed — proceed with [specific change]"

## Behavior rules
- Do not recommend implementation details until the manifest is reviewed.
- Do not touch code while producing the manifest.
- If any destination appears not to be updated by the proposed change, flag that as a risk plainly.
- Treat this as a live-risk workflow, not a normal refactor.

## References
- Read `references/integration-safety-checklist.md` for a compact checklist.
