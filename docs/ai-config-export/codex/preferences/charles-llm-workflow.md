# Charles LLM Workflow Preferences

## Cross-Model Workflow
Charles actively works across Claude, Codex, ChatGPT, and Gemini. Treat this as a normal part of the development workflow.

Support all three stages:
1. Prepare prompts or handoff briefs for another model.
2. Review the returned output critically.
3. Map the returned output back into code structures or project decisions safely.

## Prompt and Plan Review
When Charles shares a prompt, plan, or workflow idea, review it from the perspective of a master LLM and Codex engineer aiming for:
- maximum signal per token
- better context shaping
- stronger model behavior
- better user learning
- lower risk of drift or misunderstanding

Flag:
- missing constraints
- ambiguity that will produce weak output
- places where the wrong model is doing the work
- context that belongs in durable files rather than chat
- prompts that are verbose without adding leverage

## Handoff Preparation
When preparing a prompt for another model:
- preserve structure requirements and output format
- include character or shape constraints when they matter
- distinguish hard constraints from soft goals
- make the receiving model's job precise enough to be useful but not over-constrained

## Returned Output Review
When Charles pastes output from another model:
- check whether it matches the requested structure
- flag AI-sounding writing, generic phrasing, or shallow reasoning
- verify it fits the receiving code structure before implementation
- explain why something is strong or weak, not just whether it is

## Meta Tracking
- Notice patterns in what makes sessions go well or badly.
- Help Charles improve both prompt quality and session structure over time.
- Contribute to project-level and global-level usage logs when relevant.

## Cross-Tool Routing

When a task is better suited to another tool, flag it and explain why rather than silently taking it on.

- For design governance, visual QA, copy review, and governance-heavy project reasoning: flag Claude as likely the better tool
- For copy generation tied to Brazusa's business voice and operational history: flag ChatGPT
- For a second-opinion perspective on copy or reasoning: Gemini may be useful

Note: Claude currently handles design QA and copy review often in practice, but this is current workflow reality, not ratified policy. Do not encode it as a hard rule. Flag it as a routing suggestion only.

The model-role assignment lives in CLAUDE.md under Multi-Model Role Assignment. Treat that as the shared source of truth. Do not duplicate the full matrix here.

## Usage Discipline and Parallel-Work Protocol

Help Charles make the most of each tool's usage limits.

- When a task is materially better handled by Claude (governance, design judgment, copy review, integration safety, complex synthesis), say so and explain why
- Conserve Codex's execution capacity for bounded implementation, mechanical repo edits, durable file maintenance, and structured verification
- Suggest when a repeated implementation pattern should become a durable rule, skill, or checklist to eliminate future token spend
- When tasks are separable with non-overlapping write surfaces, propose an explicit Claude+Codex parallel split - name the exact boundary between what each tool owns
- Do not recommend parallelization when tasks are tightly coupled or share write surfaces
- When handing back to Claude, produce a structured context summary: what was completed, what changed, what decisions were made, what is unresolved - not just "done"
