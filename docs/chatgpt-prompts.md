# ChatGPT Prompts For Brazusa Copy Decisions

## Prompt 1 - Shorten the hero copy

```text
You are helping refine the Brazusa Cleaning website copy for the hero section.

This is not a full rewrite. Tighten what exists.

Context:
- The site is live and mobile behavior matters.
- Current live hero is too long on mobile, even on a large phone (Pixel 10 Pro). On initial load, the hero gets cut off around differentiator bullet 10.
- The current problem is not just wording quality. It is length, redundancy, and mobile fit.
- The headline is acceptable directionally and should be kept or tightened, not replaced from scratch.
- Charles has not decided yet whether the hero should use:
  1. prose only
  2. bullets only
  3. a much shorter combination of both
- For now, assume the CTA label should be: "Get a free quote"

Current STR segment hero copy:
- headline: "Cleaning built for the gap between checkout and check-in"
- body: "Work is completed and confirmed through your system or ours, with linens, inventory, and tiered cleans built into the rotation. If something is off, it is flagged with context before it turns into a guest problem."
- bullets:
  - "Work completed and clearly confirmed"
  - "Issues flagged before they become problems"
  - "Communication you do not have to chase"
  - "Works with your tools, apps, or systems"
  - "Consistent team that learns your space"
  - "Flexible scope without losing structure"
  - "Handles inventory, linen, and basic property tasks"
  - "24/7 virtual communication when needed"
  - "Scope and pricing structured around your volume"
  - "Scales with occupancy, volume, or activity"
- microcopy: "Tell us how your turnovers run and we'll tell you where we fit."
- cta: "Get a free quote"

Your task:
Write two versions for this same STR hero:

Version A:
- Keep or tighten the headline
- Use prose only
- No bullets
- Max about 30 words total for the body

Version B:
- Keep or tighten the headline
- No prose body
- Use bullets only
- Max 3 bullets
- Keep total bullet text to about 30 words combined

Constraints:
- Mobile-first
- Must fit comfortably on a large phone without the hero feeling like a wall of text
- Keep the same operational positioning
- Do not turn it into generic marketing copy
- Do not invent claims that are not already implied by the current copy
- Preserve Brazusa's practical operator-facing tone

Output format:

Version A (prose only — no bullets)
headline:
body:
microcopy:
cta:

Version B (bullets only — no prose body)
headline:
bullets:
- 01:
- 02:
- 03:
microcopy:
cta:
```
## Prompt 1 - chatgpt reply

Version A (prose only — no bullets)
headline:
Cleaning built for the gap between checkout and check-in

body:
Work is completed and confirmed through your system or ours. Linens, inventory, and tiered cleans stay in rotation, and issues are flagged with context before they reach guests.

microcopy:
Tell us how your turnovers run and we’ll tell you where we fit.

cta:
Get a free quote

---

Version B (bullets only — no prose body)
headline:
Cleaning built for the gap between checkout and check-in

bullets:

* 01: Completed and confirmed through your system or ours
* 02: Inventory, linens, and cleans stay in rotation
* 03: Issues flagged with context before guests see them

microcopy:
Tell us how your turnovers run and we’ll tell you where we fit.

cta:
Get a free quote


## Prompt 2 - Accordion headline

```text
You are helping refine one section heading for the Brazusa Cleaning website. Use the Brazusa voice and positioning context from our previous sessions.

This is not a full copy rewrite. I only need headline options.

Context:
- The site serves multiple audience segments, especially short-term rentals, property managers, offices/clinics, and homes.
- There is an accordion section where users pick the type of space/operation that fits them.
- The current live headline is: "Spaces we're built for"
- Earlier alternatives were more operator-focused, but the final wording has not been locked.
- The headline should feel inviting and clear, not cold or checklist-like.
- It also needs to work across all segments, not just one.

What I need:
- 3 to 5 headline variants
- Each under 10 words
- They should fit Brazusa's voice: practical, confident, not corporate, not salesy
- They should feel like a lead-in to an accordion that helps people identify their fit

Avoid:
- Generic corporate language
- Overly casual wording
- Anything that sounds like a survey, form, or checklist
- Anything segment-specific

Output format:
1. [headline]
2. [headline]
3. [headline]
4. [headline]
5. [headline]
```
## Prompt 2 - Chatgpt reply
1. Where this fits your setup
2. How your space runs
3. What you’re running
4. The kind of work you need
5. Where we usually plug in


## Prompt 3 - "Other" segment hero stub

```text
You are writing one missing hero stub for the Brazusa Cleaning website.

Context:
- The site already has hero variants for:
  - short-term rentals
  - property managers / multi-unit buildings
  - offices / clinics
  - homes / apartments
- The missing segment is "Other"
- "Other" is the catch-all for jobs that do not fit neatly into the main buckets:
  - unusual spaces
  - one-off jobs
  - mixed-use spaces
  - event venues
  - setups where cleaning overlaps with logistics or coordination

Important implementation context:
- The current hero copy structure in code is:
  - h1
  - body
  - differentiators
  - microcopy
- There is no separate subheadline field yet
- The CTA label is currently handled outside the copy layer, but the intended CTA wording for this pass is: "Get a free quote"

Current base/default hero copy for reference:
- h1: "Cleaning built for rentals, offices, and multi-unit operations."
- body: "Work is completed and confirmed through your preferred channel, and when something is off it is flagged with context so it can be handled before it affects guests, staff, or schedules."
- differentiators:
  - "Work completed and clearly confirmed"
  - "Issues flagged before they become problems"
  - "Communication you do not have to chase"
  - "Works with your tools, apps, or systems"
  - "Consistent team that learns your space"
  - "Flexible scope without losing structure"
  - "Handles inventory, linen, and basic property tasks"
  - "24/7 virtual communication when needed"
  - "Scope and pricing structured around your volume"
  - "Scales with occupancy, volume, or activity"
- microcopy: "Tell us how your space runs and we will say if it fits or not."

Your task:
Write a distinct "Other" hero variant that fits the same overall site voice.

Constraints:
- It should feel like a real catch-all, not an afterthought
- It should not overlap too heavily with STR, property, offices, or homes language
- It should still sound operational and practical
- Do not invent risky promises or guarantees
- Keep the wording specific enough to feel intentional
- Max 3 differentiators — the site has a mobile-first layout and 10-item lists are too long on a phone

Output format:
h1:
body:
differentiators:
- 01:
- 02:
- 03:
microcopy:
cta:
```
## Prompt 3 - chatgpt reply

h1:
Cleaning that fits setups that don’t fit a category

body:
Some jobs don’t follow a standard model. We work with mixed-use spaces, one-off projects, and setups where cleaning overlaps with access, scheduling, or coordination. The work is defined clearly, completed, and confirmed so nothing gets lost between steps.

differentiators:

* 01: Scope defined upfront so nothing gets assumed or missed
* 02: Work completed and confirmed through your preferred channel
* 03: Coordination handled when cleaning overlaps with logistics

microcopy:
Tell us what you’re dealing with and we’ll tell you if it fits.

cta:
Get a free quote
