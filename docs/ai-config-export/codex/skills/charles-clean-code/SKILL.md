---
name: charles-clean-code
description: Apply Charles's clean-code preferences during implementation and code review. Use when writing or refactoring code, reviewing a planned implementation, evaluating naming and structure choices, deciding whether to split files or components, judging dependency additions, shaping TypeScript strictness, or checking whether code is clear, focused, additive, and well-explained in the Charles style.
---

# Charles Clean Code

Use this skill to make implementation choices align with Charles's preferences instead of drifting toward generic AI-generated code.

## Core goals
- Preserve working code unless change is clearly justified.
- Prefer additive, reversible changes when direction is still being explored.
- Produce code that is clear, focused, descriptive, and domain-aware.
- Avoid vague naming, sprawling responsibilities, and unnecessary abstraction.
- Keep explanations and comments useful by explaining why, not what.

## When to use
Use this skill when:
- planning an implementation approach
- deciding whether a refactor is warranted
- reviewing code quality before or after edits
- choosing names, file structure, helper placement, or component boundaries
- deciding whether a dependency is worth introducing
- checking whether TypeScript, tests, and comments are being handled in the Charles style

## Implementation rules

### 1. Preserve working code first
- Do not delete or overwrite working code unless Charles has approved the removal or replacement.
- If requirements changed, look for reusable parts before discarding work.
- Prefer additive and reversible changes when the right shape is still emerging.

### 2. Keep diffs focused
- Avoid unrelated cleanup.
- Do not hide a refactor inside a feature unless the refactor is necessary to complete the task cleanly.
- If a broader cleanup is tempting, flag it separately instead of quietly expanding scope.

### 3. Prefer descriptive naming
- Use accurate, descriptive names over short vague ones.
- Avoid generic names like `data`, `item`, `result`, `config`, and `handleClick` when a more specific name is available.
- Prefer names that explain the domain role of the thing, not just its type.

### 4. Favor focused structure
- Prefer smaller, focused files and components when the split is justified.
- Flag oversized files or components and discuss splitting before acting if the split is not already part of the request.
- Put helpers in intentional locations rather than scattering loose utilities.

### 5. TypeScript should be intentional
- Prefer explicit, strict thinking.
- Avoid accidental `any`.
- If `any` is truly needed, make it a conscious escape hatch and explain why.
- Be practical when inference is strong and explicit types would add noise without value.

### 6. Dependencies require justification
- Ask before adding packages.
- Explain what the package does, why it is needed, and whether a simpler alternative exists.
- Favor existing platform capabilities or current dependencies when they can solve the problem cleanly.

### 7. Testing should protect meaningful logic
- Default toward TDD or at least test-aware implementation for meaningful logic.
- Strongly prefer tests for validators, API behavior, and transformation logic.
- If a test failure changes the plan materially, stop and explain before blindly patching forward.

### 8. Comments and explanations should teach
- Code comments should explain why, not narrate the obvious.
- Avoid comments that restate the code mechanically.
- When explaining implementation choices to Charles, optimize for learning and mental-model building.

## Review lens
When reviewing code or a planned implementation, ask:
- Is this preserving working code appropriately?
- Is the diff tightly scoped?
- Are the names descriptive enough?
- Does each file or component have a clear responsibility?
- Is any abstraction premature or unnecessary?
- Is the TypeScript posture intentional?
- Are dependencies justified?
- Are comments and explanations actually useful?
- Would Charles likely see this as thoughtful code or as generic AI output?

## Output structure
When giving clean-code feedback, prefer this structure unless Charles asks otherwise:

### What is weak
- Specific code-quality or structure issues

### Why it matters
- The maintainability, clarity, or risk consequence

### Better direction
- The cleaner implementation choice or naming/structure direction

### Ask before changing
- Any parts that should be confirmed before editing because they involve deletion, refactoring, splitting, renaming, or dependency changes

## Style
- Be specific and opinionated.
- Preserve Charles's priorities even when a more aggressive refactor might appeal to another engineer.
- Teach through the feedback rather than delivering abstract style judgments.

## References
- Read `references/clean-code-checklist.md` for a compact implementation checklist.
