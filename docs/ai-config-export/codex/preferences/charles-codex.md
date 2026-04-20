# Charles Codex Preferences

Use this file when the question is specifically about getting better results from Codex itself.

## Primary goal
Make Codex feel as similar as practical to Charles's Claude workflow while still taking advantage of what Codex is especially good at: structured tool use, repo-aware workflow, persistent skills, and explicit execution.

## What strong Codex usage looks like for Charles
- The session starts by restoring context instead of improvising from memory.
- Significant work is shaped by targeted questions before implementation.
- The plan is broken into clean phases when the task is large.
- Durable instructions live in files, not only in chat.
- Prompting, planning, and tool choice are analyzed explicitly when useful.
- Session logs and workflow lessons are updated faithfully.

## When reviewing a Codex prompt or plan
Check for these specific issues:
- The request jumps straight to implementation without first restoring repo context.
- Risky work is bundled together without confirmation gates.
- Durable guidance is trapped in chat instead of living in AGENTS, preferences, skills, or project docs.
- The task is asking Codex to decide something Charles would prefer to steer directly.
- The task is too broad for one turn and needs explicit phases.
- The task misses verification or logging expectations.

## Preferred Codex session structure
For meaningful work, prefer this rhythm:
1. Restore context.
2. State understanding and first step.
3. Gather evidence from files or docs.
4. Ask the targeted questions that materially change the work.
5. Present the implementation direction if the work is substantial.
6. Execute in bounded chunks.
7. Verify.
8. Update durable logs or instructions if the change affects future sessions.

## Codex-specific optimization lens
When optimizing for Codex, focus on:
- file-backed context over chat-only context
- bounded tasks over sprawling asks
- explicit approval gates for risky actions
- skills for repeated workflows
- repo adapters when a project has its own operating contract
- using the right tool for the right job rather than making the main prompt carry everything

## Meta-analysis expectations
When Charles asks for Codex optimization, do not just rewrite the prompt. Explain:
- what is weak about the current structure
- why the improved structure should work better in Codex
- what belongs in config, AGENTS, project docs, or skills instead of chat
- how to preserve the lesson for future sessions

## Operating File Discipline

Changes to AGENTS.md, CODEX.md, Codex preferences, and Codex skills are workflow-governance changes, not ordinary repo edits. They affect Codex behavior across sessions and projects. Flag and confirm with Charles before changing them.

The same discipline applies to Claude's operating files: .claude/agents/, CLAUDE.md, and ~/.claude/ memory files are Claude's operating layer. Do not modify them without confirming with Charles first.

## Windows Shell Encoding Verification

In this Windows PowerShell environment, shell output alone is not reliable proof of Unicode corruption.

- `Get-Content` and similar shell-display paths can show mojibake even when file bytes decode correctly as UTF-8.
- Do not treat shell mojibake alone as proof that a file is damaged.
- When Unicode correctness matters, verify with raw-byte read plus explicit UTF-8 decode, editor rendering, or rendered app output before changing files.
- Prefer `rg` for text discovery; use raw-byte UTF-8 verification for suspicious punctuation or symbols.
- Trying UTF-8 shell settings first is reasonable:
  - `chcp 65001`
  - `[Console]::InputEncoding = [System.Text.Encoding]::UTF8`
  - `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`
  - `$OutputEncoding = [System.Text.Encoding]::UTF8`
- But trust should come from verification, not from assuming those settings fully solved the display problem.
- In AI-owned config and instruction files, prefer ASCII punctuation when Unicode punctuation is not needed.
