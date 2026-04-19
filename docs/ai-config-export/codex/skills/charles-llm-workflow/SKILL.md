---
name: charles-llm-workflow
description: Optimize prompts, plans, and handoff workflows for Claude, Codex, ChatGPT, and Gemini. Use when Charles wants meta-analysis of how he is using an LLM, wants a prompt or implementation plan reviewed from the perspective of a master Codex/LLM engineer, wants a structured handoff brief prepared for another model, wants returned output reviewed and mapped safely back into a project, or wants help deciding what belongs in chat versus durable files like AGENTS, preferences, skills, and session logs.
---

# Charles LLM Workflow

Use this skill to improve how Charles works with language models, not just what the model outputs.

## Core goals
- Increase clarity, leverage, and learning value.
- Reduce ambiguity, drift, and wasted context.
- Improve handoffs between models.
- Preserve structure so external-model output can be used safely.
- Turn one-off workflow lessons into durable improvements.

## First decision: choose the right mode

### Prompt or plan review
Use this when Charles already has a draft prompt, task framing, or implementation plan and wants it critiqued and improved.

### Handoff preparation
Use this when Charles wants a ready-to-send brief for Claude, ChatGPT, or Gemini.

### Returned output review
Use this when another model has already answered and Charles wants to know whether the result is usable, what is wrong with it, and how it maps back into the project.

### Workflow meta-analysis
Use this when the real target is improving how Charles uses LLMs over time, not just improving one artifact.

## Workflow modes

### 1. Prompt or plan review
When Charles shares a prompt, implementation plan, or working approach:
- Review it like a master LLM and Codex engineer.
- Identify ambiguity, missing constraints, weak sequencing, hidden assumptions, and places where the wrong model is doing the work.
- Explain why each issue matters.
- Recommend a stronger version with better context shape, not just shorter wording.
- Distinguish between immediate prompt fixes and system-level fixes.

### 2. Handoff preparation
When preparing work for Claude, ChatGPT, or Gemini:
- Preserve exact output structure requirements.
- Separate hard constraints from soft goals.
- Include length, shape, or formatting constraints when they matter.
- If the destination model is being used for copy, keep tone, anti-generic guidance, and structure constraints explicit.
- If the destination model is being used for planning or reasoning, keep the problem statement sharp and remove noise.
- If the destination model is being used for ideation, preserve creative freedom while still bounding the return shape.

### 3. Returned output review
When Charles pastes back output from another model:
- Check whether the structure matches what was requested.
- Flag generic writing, AI-sounding phrasing, shallow reasoning, unsupported claims, or output that does not fit the target code structure.
- State what is strong, what is weak, and what must be fixed before implementation.
- If useful, map the output to the receiving project's data shape, component structure, or decision framework before any code changes.
- If the output is not usable, say why plainly instead of trying to salvage it silently.

### 4. Workflow meta-analysis
When Charles wants to improve how he uses Codex or Claude over time:
- Analyze session design, prompt strategy, persistent docs, model selection, and task sequencing.
- Identify what should live in durable files versus chat.
- Suggest changes that improve consistency, context reuse, and learning value.
- Favor systems that make future sessions better, not just the current one easier.

## Model-selection lens
When it is useful, comment on whether the work seems better suited to:
- Codex for repo-aware implementation, tool use, and durable workflow execution
- Claude for long-form collaborative reasoning and project-governance style interaction
- ChatGPT or Gemini for copy generation, brainstorming variants, or alternative perspectives

Do not make model selection the main point unless it materially improves the workflow.

## Durable-vs-chat lens
Always consider whether the lesson should stay in chat or be moved into one of these:
- global `AGENTS.md`
- project `AGENTS.md`
- preferences files
- skills
- decisions docs
- session logs

Prefer the smallest durable mechanism that will preserve the lesson reliably.

## Review lens
Apply this lens during any of the modes above:
- Is the model being asked to do the right job?
- Are the constraints specific enough to produce useful output?
- Is anything important missing?
- Is anything verbose without adding leverage?
- Will the returned output be easy to apply safely?
- Does this workflow help Charles understand more, not just move faster?
- Is there a durable improvement hiding inside this one-off request?

## Output structure
When reviewing a prompt, plan, or workflow, prefer this structure unless Charles asks otherwise:

### What is weak
- Specific issues in the current artifact

### Why it matters
- The likely failure mode or lost leverage

### Better version
- The rewritten prompt, plan, or handoff brief

### Durable improvement
- What should be saved to files, skills, or logs for future sessions

## Output style
- Be specific and opinionated.
- Explain the reasoning, not just the fix.
- Prefer structured feedback over vague impressions.
- When rewriting, preserve Charles's intent while making the workflow sharper.
- If something is already strong, say what is working and why.

## References
- Read `references/review-checklist.md` when you want a compact checklist for reviewing prompts, plans, handoffs, and durable workflow choices.
