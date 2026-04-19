---
name: charles-durable-update
description: Capture what a session should preserve before wrapping up. Use when finishing meaningful work, when Charles asks to update logs or decisions, when a session produced durable workflow lessons, or when you need to decide what belongs in a session log, decisions doc, AGENTS file, preferences file, skills, or the global Codex usage log.
---

# Charles Durable Update

Use this skill at the end of meaningful work so session value is preserved in the right durable place instead of fading with the chat.

## Core purpose
Turn session wrap-up into a repeatable workflow:
- identify what was decided
- identify what changed
- identify what is still open
- decide what belongs in durable files
- preserve both the engineering record and the learning record

## When to use
Use this skill when:
- a meaningful work session is ending
- Charles asks to update a session log
- a significant decision was made during the session
- a durable workflow lesson emerged
- follow-up items need to be preserved cleanly

Do not use it for trivial one-off interactions with no durable value.

## Durable destinations
Choose among these based on the type of information:
- session log for what happened and what was learned in the session
- decisions doc for locked architectural, UX, or workflow decisions
- global or project `AGENTS.md` when future behavior needs to change systematically
- preferences files when a stable Charles preference was clarified
- skills when a repeated workflow deserves its own reusable tool
- Codex usage log when a durable lesson about using Codex emerged across projects

Prefer the smallest durable place that will preserve the lesson reliably.

## Workflow

### 1. Identify session outcomes
Extract the outcomes of the session:
- decisions made
- work completed
- risks or caveats discovered
- follow-up items
- workflow lessons

### 1a. Note authorship if multiple tools contributed
If the session included work by both Claude and Codex, record which tool authored which part - implementation, reasoning artifact, or decision. Add this to the session log entry. Do not blend contributions without attribution. This allows future sessions to identify which tool reached which conclusion.

### 2. Separate what happened from what was decided
Do not blur chronology with decisions.
- Session logs can include chronology and learning record.
- Decisions docs should only capture locked decisions with rationale and constraints.

### 3. Decide what deserves durability
Ask:
- Will this matter next session?
- Will future Codex behavior improve if this is saved?
- Is this a one-off detail or a reusable rule?
- Is this project-specific or global?

### 4. Recommend or perform the update
When Charles wants the update done, prepare or apply the exact durable update.
When Charles is still deciding, recommend the best destination and explain why.

## Output structure
When reviewing what to preserve from a session, prefer this structure unless Charles asks otherwise:

## Durable Update Review

### Decisions to preserve
- items that belong in a decisions doc

### Session record
- items that belong in a session log

### Workflow lessons
- items that belong in AGENTS, preferences, skills, or the Codex usage log

### Follow-up items
- unfinished work or reminders worth preserving

### Best durable destinations
- one short explanation of where each category should go and why

## Behavior rules
- Preserve the difference between decision records and chronological logs.
- Preserve Charles's learning journey, not just engineering facts.
- Favor durable updates that improve future sessions, not just historical completeness.
- If nothing durable emerged, say so plainly instead of inventing updates.

## References
- Read `references/durable-update-checklist.md` for a compact wrap-up checklist.
