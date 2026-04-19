# CODEX.md

Codex-specific adapter for the `claudecoding` repo.

This file is intentionally thin. It exists to help Codex apply the repo's existing operating system consistently without duplicating the full project contract.

## Read Order

For meaningful work in this repo, read in this order:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/decisions.md`
4. `lib/clients/`
5. `app/api/`
6. `docs/session-log.md` when recent context or follow-up state matters

## Purpose

- Treat `CLAUDE.md` as the primary project contract unless a Codex-specific instruction here clearly adds a Codex-only adaptation.
- Use this file to clarify how Codex should work inside that contract, not to replace it.
- Preserve shared project truth in durable repo files rather than restating it here.

## Codex Session Start

At the start of meaningful work:

- restore context before coding
- review current repo instructions and decisions
- check `git status`
- identify in-progress work that should not be disturbed
- summarize the current state briefly before substantial implementation

If the task is substantial, prefer the `charles-session-start` workflow.

## Safety

- Follow the stronger live-system safeguards in `CLAUDE.md` as mandatory.
- Preserve working code unless Charles explicitly approves deletion, replacement, or a meaningful refactor.
- Ask before risky, irreversible, or live-impacting changes.
- Before touching live form integrations, payload shape, validators, or destination mappings, use `claudecoding-integration-safety` first and produce a manifest before editing code.

## Collaboration Style

- Make the Codex experience feel as similar as practical to Charles's Claude workflow while still using Codex's strengths.
- Be explanatory by default and teach the reasoning behind recommendations.
- Ask targeted questions when they improve learning, control, or the shape of the implementation.
- Treat prompt design, workflow review, and meta-analysis as valid project work.

## Durable Project Tracking

- Contribute faithfully to `docs/session-log.md` when the session produces meaningful work or durable lessons.
- Preserve the distinction between:
  - session history
  - locked decisions
  - deferred follow-up items
- Put durable workflow or project lessons in the smallest correct place:
  - `docs/decisions.md`
  - `docs/session-log.md`
  - `AGENTS.md`
  - `CODEX.md`
  - global Codex preferences or skills when the lesson is cross-project

## Codex-Specific Guidance

- Prefer bounded tasks over sprawling asks.
- Prefer file-backed context over chat-only context.
- Keep diffs focused and avoid unrelated cleanup.
- When a repeated workflow emerges, prefer a skill or durable doc update over re-explaining it in chat every time.

## Local Skill Guidance

Use the Charles skills when relevant:

- `charles-session-start` for meaningful repo starts
- `charles-clean-code` for implementation quality, naming, structure, and dependency judgment
- `charles-llm-workflow` for prompt review, handoff prep, returned-output review, and workflow critique
- `charles-codex-optimizer` when the task is about improving Codex usage itself
- `charles-durable-update` when wrapping up meaningful work and deciding what to preserve
- `claudecoding-integration-safety` before any live integration change

## Anti-Duplication Rule

Do not copy large rule sections from `CLAUDE.md` into this file unless a Codex-specific mismatch is causing real friction.

If a shared project rule changes, prefer updating the shared source of truth rather than drifting into separate Claude and Codex contracts.
