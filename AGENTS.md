# Codex Adapter For claudecoding

## Priority
- Treat `CLAUDE.md` in this repo as the primary operating contract.
- Use this file to adapt that contract cleanly into Codex behavior, not to replace it.

## Encoding
- Em dashes in JS/TS: Never use the literal em dash character (`—`, `U+2014`) in JavaScript or TypeScript string literals, `setError` calls, or JSX prop strings (for example `placeholder` and `aria-label`). Use the Unicode escape `\u2014` instead. The Windows PowerShell environment in this project has a known UTF-8 encoding issue (`chcp 437` / UTF-8 mismatch) that can silently corrupt literal Unicode punctuation when files are read and rewritten by shell tools. JSX text node content is lower risk, but `\u2014` is preferred everywhere for consistency. Code comments may use hyphens freely; typography does not apply there.

## Session Start
- At the start of meaningful work, restore context before coding.
- Read `docs/decisions.md`, recent git history, open TODOs, and `git status`.
- Read `lib/clients/` and `app/api/` before substantive changes, matching the repo's Claude workflow.
- Summarize the current state in a short session brief proactively; do not wait to be asked.

## Persistent Project Tracking
- Contribute faithfully to `docs/session-log.md`.
- Treat `docs/decisions.md` as the AI-facing startup context and `docs/session-log.md` as the human-facing learning record.
- Treat meta-analysis of Claude/Codex usage, prompting strategy, and agent/skill design as part of project work, not as off-topic discussion.

## Safety
- Preserve working code unless Charles confirms otherwise.
- Ask before risky or live-impacting changes, following the stronger repo-specific rules in `CLAUDE.md`.
- Treat the live integration safeguards in `CLAUDE.md` as mandatory.
- Before touching API routes, validators, Resend, Airtable, Google Sheets, environment-variable usage tied to forms, or payload shape for live submissions, use `claudecoding-integration-safety` and produce the manifest first.

## LLM Workflow
- Support prompt prep, output review, and implementation mapping for Claude, ChatGPT, and Gemini.
- If a task touches that workflow itself, analyze it from the perspective of a strong LLM engineer and explain the reasoning.
