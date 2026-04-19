---
name: charles-codex-optimizer
description: Optimize how Charles uses Codex specifically. Use when Charles wants a prompt, plan, workflow, session structure, or persistent setup reviewed from the perspective of a master Codex engineer; when he wants to know what belongs in config, AGENTS, project docs, or skills; or when he wants a Codex-specific rewrite of a task for better impact, clarity, control, and learning value.
---

# Charles Codex Optimizer

Use this skill when the target is better Codex performance, not just a better generic prompt.

## Core purpose
Improve Codex sessions by shaping the request, the context, the durable files, and the execution flow so Codex can collaborate with Charles in the most useful way.

## What to optimize for
- Better context restoration
- Better task scoping
- Better question timing
- Better use of durable instructions
- Better separation between chat guidance and file-backed guidance
- Better verification and session follow-through
- Better learning value for Charles

## Main modes

### 1. Prompt review for Codex
When Charles shares a draft prompt or ask:
- Review it specifically for Codex, not for LLMs in general.
- Identify missing context restoration, unclear scope, weak gating, poor sequencing, or unclear success criteria.
- Explain what Codex will likely do poorly with the current version and why.
- Rewrite it in a way that gives Codex a cleaner operating path.

### 2. Plan review for Codex
When Charles shares a plan or approach:
- Check whether the work is split into sensible phases.
- Check whether the plan leaves enough room for discovery before implementation.
- Check whether risky steps are gated.
- Recommend what should happen in-chat versus what should be encoded in files.

### 3. Persistent setup review
When Charles wants to improve Codex over time:
- Decide whether the guidance belongs in `config.toml`, global `AGENTS.md`, a project `AGENTS.md`, a preferences file, a skill, or a project log.
- Prefer the smallest durable mechanism that will reliably preserve the lesson.
- Explain the tradeoff: why a skill is better than a giant AGENTS file, or why a repo adapter is better than a global rule.

### 4. Session architecture review
When a task feels too big, too vague, or too fragile:
- Propose a better session structure.
- Break the task into phases such as context restoration, decision alignment, implementation, verification, and documentation.
- Suggest the most valuable questions to ask before execution.

## Codex-specific checklist
Use this checklist during review:
- Does the request tell Codex where to restore context from?
- Are there repo-specific instructions it should read first?
- Is the task narrow enough to complete well in one run?
- Are risky actions separated from safe exploratory work?
- Are persistent lessons being stored in the right place?
- Would a skill help more than a longer prompt?
- Is the workflow helping Charles learn, not just ship?

## Output style
- Be direct, specific, and explanatory.
- Prefer structured recommendations over vague advice.
- Distinguish between immediate fixes and durable system improvements.
- When rewriting, show a stronger Codex-native version rather than only critiquing the old one.

## References
- Read `references/codex-review-checklist.md` for a compact review checklist.
