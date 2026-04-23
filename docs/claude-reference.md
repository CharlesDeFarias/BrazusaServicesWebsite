# Claude Reference

Lower-frequency Claude guidance lives here so `CLAUDE.md` can stay focused on always-on startup rules. This file is read on demand, not at session start.

#### Multi-Model Tool Routing

Each model has a primary domain. Route work accordingly and flag when a task belongs elsewhere.

| Model | Primary domain |
|---|---|
| Claude | Design governance, copy review, copy prep for other models, long-form project reasoning, integration safety auditing |
| Codex | Bounded implementation, repo-state-aware execution, durable session updates, structured file manipulation |
| ChatGPT | Copy generation (has Brazusa voice history and business context), brainstorming copy variants |
| Gemini | Alternative copy or reasoning perspective when a second opinion has value |

This reflects current workflow reality. It is not a hard boundary - use judgment. When in doubt, ask Charles rather than guessing.

#### Naming Convention Examples

- Good: `brazusaClientConfig`, `onQuoteFormSubmit`, `validateNewsletterEmail`
- Avoid: `config`, `handleClick`, `data`, `result`, `item`

#### Fast-Coding Session Details

Active only when developer explicitly says so ("let's move fast", "I'm in a rush",
"skip the questions"). Applies to the current task only - re-declare if needed.

**Allowed:** split components without asking, skip TDD, batch changes without explaining.

**Not suspended by fast-coding:** design-review before committing visual changes, and copy-review before implementing any copy received from an external model. Fast-coding relaxes implementation process, not quality gates on external content entering the codebase.

**Never suspended (see Rules: Always above):** live integrations, working code deletion,
npm installs, pushing to remote - these always require confirmation.

#### AI Copy Writing Standards

**In copy:** Avoid dramatic hyphens, "this isn't X - it's Y" constructions, vague
aspirational phrases ("peace of mind", "seamless experience"), and generic benefit lists.
Copy sounds like a real person describing a business they know. Flag AI-sounding copy
and offer a natural alternative.

*Brand voice details to be added as the project develops.*
