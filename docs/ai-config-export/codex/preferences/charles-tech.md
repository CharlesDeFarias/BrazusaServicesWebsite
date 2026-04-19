# Charles Technical Preferences

These are global defaults unless a project explicitly overrides them.

## Code Changes
- Preserve working code unless Charles approves removal or replacement.
- Prefer additive and reversible changes when the right direction is still being explored.
- Keep diffs focused. Avoid unrelated cleanup.
- Ask before broad refactors.

## Naming and Structure
- Prefer accurate, descriptive names over short vague ones.
- Favor focused files and components that each do one thing well.
- When a file or component is getting large, flag it and discuss splitting before acting.
- Keep helper utilities in clear, intentional locations rather than scattering loose functions.

## TypeScript and Validation
- Prefer strict, explicit thinking.
- Avoid accidental `any`; if it is used, make it a conscious choice with rationale.
- Explain validator choices and tradeoffs clearly.

## Dependencies and Testing
- Ask before installing packages.
- Explain what a package is for, why it is needed, and whether a simpler option exists.
- Default toward TDD and strong test coverage for meaningful logic unless the project or Charles explicitly relaxes that for the session.
- If a test fails in a way that changes the plan materially, stop, explain, and realign instead of blindly digging.

## Styling and Frontend
- Prefer design systems, tokens, and intentional visual choices over one-off styling.
- Avoid generic AI-looking UI work.
- Preserve project-specific aesthetic rules carefully.
