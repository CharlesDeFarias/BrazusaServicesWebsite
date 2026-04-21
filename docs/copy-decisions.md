# Brazusa Copy Decisions

## Updated plan

### Decided now
- CTA direction: restore "free" language in the main quote CTA so the offer clearly signals there is no charge for a quote or walkthrough. Exact wording still needs final confirmation.
- Hero copy direction: drastically shorten the mobile hero. The current combination of body paragraph plus 10 differentiators is too long on a large phone and is blocking the design pass.
- Hero format must be resolved before the next copy pass: prose only, bullets only, or a much shorter hybrid.

### Still open
- Exact accordion headline wording. The current live section headline is "Spaces we're built for" in `components/clean/ClientAccordion.tsx`, and it is not yet stored in the copy layer.
- Exact hero copy shape: keep shortened body text, keep a very short bullet list, or choose one and remove the other.
- Exact CTA label. Direction is to restore "free," but final wording still needs Charles to confirm.
- "Other" segment hero stub. `lib/copy/brazusa-cleaning/index.ts` currently maps `other` to `baseCopy`, so there is no distinct `segments/other.ts` yet.

### Mechanical follow-up once decisions land
- Wire the approved `serviceDefinitions` and `extendedServiceDefinitions` copy into the copy layer and/or Services component path.
  Owner: Codex
  Status: mechanical, independent of the hero/CTA/accordion decisions — can run in parallel once Charles confirms the copy is approved.

### Copy-independent follow-up
- Fix the blank beige gap below the moving banner on mobile.
  Owner: Codex
  Status: layout bug, independent of the copy decisions.

### Current copy-layer reality
- `lib/copy/brazusa-cleaning/base.ts` and `segments/*.ts` currently store only `hero.h1`, `hero.body`, `hero.differentiators`, and `hero.microcopy`.
- The accordion headline is still hardcoded in `components/clean/ClientAccordion.tsx`.
- The hero CTA label is still hardcoded in `components/clean/Hero.tsx`.
- `serviceDefinitions` and `extendedServiceDefinitions` copy exists in `docs/session-log.md` (04/21), but is not yet wired into the segment copy system.

## Questions for Charles
1. Do you want the hero bullet list removed entirely, or kept in a very short version of 3 items max?
-Keep it in a short version of 6 items max. and dont have them numbered. size depends on design constraints and how the body apragraph is changed
2. Should the hero keep a shortened body paragraph, or should the bullets replace the body entirely?
-the body paragraph should be shortened to be more like a subtitle, and the bullets kept to fill in the rest.
3. The current accordion headline in the live component is "Spaces we're built for." Do you want to keep refining that, or is there already a newer approved version elsewhere?
-I do want to keep refining that, including the wording of "spaces we're built for" itself
4. For the main hero CTA, do you want the exact label "Get a free quote," or a different "free" phrasing?
-I'd like to see options, as i'm unsure.
5. "Other" segment currently falls back to base copy — that is the live default. ChatGPT Prompt 3 in `docs/chatgpt-prompts.md` is ready to produce a distinct version if you want one. Decision: send to ChatGPT now, or leave as base copy for this pass?
-send to chatgpt
6. The following claims in the current copy need a quick yes/no from you before they can be considered final: (a) "24/7 virtual communication when needed" — is this actually true? (b) "Consistent team that learns your space" — do you guarantee the same team, or is this aspirational? (c) "Handles inventory, linen, and basic property tasks" — is linen handling currently part of the STR offering?
a- yes true b- no we try our best and almost always its the same team, but it can change C- yes, property management as well
