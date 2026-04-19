---
name: charles-session-start
description: Open meaningful Codex sessions the Charles way. Use when starting work in an existing repo, when returning to a project after time away, or before substantial implementation. Restore context from project instructions, decisions docs, recent git history, TODOs, and current workspace state; produce a short brief; identify likely risks; and suggest the best first questions or next step.
---

# Charles Session Start

Use this skill at the beginning of meaningful work so Codex starts from durable context instead of improvising from partial memory.

## Core purpose
Turn the start of a session into a repeatable workflow:
- restore context
- surface active constraints
- identify in-progress work
- point to the best starting move
- preserve Charles's preference for structured, explanatory collaboration

## When to use
Use this skill when:
- entering an existing repo for real work
- resuming a project after time away
- starting a substantial task that should not jump straight to implementation
- you suspect important context lives in files rather than in the current chat

Do not use it for tiny one-off asks that do not depend on repo context.

## Workflow

### 1. Restore project instructions
Look for the most relevant project instruction sources first:
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `TEAM_GUIDE.md`
- `.agents.md`

Read the strongest relevant instructions before doing anything else.

### 2. Restore durable project context
Read the most relevant durable files that explain the current project state.
- Treat docs/decisions.md as the primary durable context source for startup when the repo uses it.
- Do not read docs/session-log.md at session start. It is the human-facing learning record unless Charles explicitly asks for historical or process review.
- Prioritize other durable artifacts like plans, task trackers, and architecture notes only when they materially clarify the current situation.

Prefer the smallest set of files that explains the current situation clearly.

### 3. Inspect recent and current repo state
Use repo state to ground the brief:
- recent git history
- open TODOs in high-signal areas
- current git status or other signs of in-progress work

Do not overdo exploration. The goal is orientation, not a full audit.

### 4. Identify the operating constraints
State the constraints that matter for this session, such as:
- live integrations
- destructive-change guardrails
- architecture constraints
- pending deferred work

### 5. Recommend the next move
Based on the current state, say what should happen first:
- ask targeted questions
- inspect a specific subsystem
- implement a bounded change
- review a plan or handoff
- update a durable file before coding

## Output format
Keep the brief tight and scannable. Prefer this structure unless the repo has a stronger local convention:

## Session Brief

### Project state
- 3 to 5 bullets on what appears active or recently changed

### Active constraints
- bullets with the constraints that should shape this session

### Open threads
- TODOs, deferred items, or in-progress changes that matter now

### Risks to respect
- bullets only if there are meaningful risks or live-impact concerns

### Best starting point
- one short paragraph explaining the first move and why

### Questions worth asking first
- only include questions that materially change the work or improve Charles's understanding

## Behavior rules
- Be concise but not shallow.
- Prefer constraints and implications over long summaries.
- Ground the brief in files and repo state, not guesswork.
- If the project clearly has a stronger local startup workflow, follow it.
- If the repo uses logs or meta-tracking, remember that this session will likely need a follow-up update later.

## References
- Read `references/session-start-checklist.md` for a compact startup checklist.
