# AI Collaboration Case Study

This document is a detailed account of how this project was built using Claude and Codex together - not just as coding tools, but as a system that was deliberately shaped over time.

It is written for a developer who can write code but is not necessarily current on LLM tooling. The goal is to explain the actual mechanics, what worked, what was genuinely hard, and what you would take away if you wanted to try something similar.

---

## Why this case study exists

The problem that prompted all of this was not "AI writes bad code." It was something subtler: AI behaves inconsistently across sessions.

Every time you start a new Claude conversation, it has no memory of what you decided last time. Every rule you established, every architectural constraint, every "we agreed not to do X" - gone. You either re-explain everything at the start of each session, or you accept that the AI is operating without that context.

For a one-off task, that is fine. For a project that is actively being developed over weeks, with a live production system and real integrations, it is a real problem.

The other problem: normal prompting is fragile for safety-critical decisions. If you just tell Claude "don't touch the Airtable fields without asking me first," it will follow that instruction when it is in context. But the next session, it is gone. And even within a session, under pressure or when a task seems simple, that kind of conversational instruction gets ignored.

This project needed something more structural - not because the tasks were technically hard, but because the constraints needed to be enforced consistently across many sessions, involving live integrations with a real paying client.

Charles is also a self-taught developer who was using this project to learn full-stack development. The AI tools were not just for speed. They were part of how he structured the learning process - getting explanations, understanding tradeoffs, building judgment about architecture rather than just receiving code.

---

## What the operating model looks like

The system is built in layers. Each layer has a specific job.

**`CLAUDE.md`** - the project contract. Claude loads this automatically at the start of every session. It contains absolute rules (hard constraints with no exceptions), architecture constraints, and workflow defaults. The key distinction is between "always" rules and "by default" rules - Claude knows which can flex and which cannot.

Example absolute rule: before any change to API routes, Airtable fields, Resend templates, or Google Sheets columns - invoke the integration-safety agent, get a manifest of what would change across all three destinations, and do not touch a single file until Charles has confirmed each change explicitly.

**`CODEX.md`** - a thin adapter. Codex reads the same project contract (CLAUDE.md), and this file explains how to apply it specifically in Codex. It is kept deliberately thin to avoid the two tools diverging into separate contracts. If a shared rule changes, it changes in CLAUDE.md, not in both files separately.

**`docs/decisions.md`** - the AI-facing startup context. This is where locked architectural and UX decisions live. Both tools read it at session start. This is the core solution to the context-loss problem: decisions made in one session get written here, and they survive to the next session without re-explanation. The session-start workflow automates reading this file.

**`docs/session-log.md`** - human-facing only. This is a diary - chronology, prompts submitted, what was learned, what was frustrating. Neither AI tool reads this at session start. This distinction took several sessions to get right (more on that below). The session log is for Charles, not for the AI.

**`.claude/agents/`** - five Claude subagents, each with one job. They run in their own context window with their own tool list. Giving an agent only the tools it needs is structural enforcement - the integration-safety agent cannot edit files because it does not have write access, not just because you told it not to.

**`~/.codex/preferences/` and `~/.codex/skills/`** - Codex reusable behavior at runtime. These cover collaboration style, session structure, question-asking policy, and repeated workflows like session start and durable updates. For portability, this repo now mirrors the relevant Codex setup under `docs/ai-config-export/codex/`, but the live runtime copy still lives in `~/.codex/`.

---

## Why two tools instead of one

This was not a decision made upfront. It emerged from using both tools and noticing where each one was stronger.

**Claude** ended up handling: design governance, copy review, long-form project reasoning, integration safety auditing, workflow critique, and anything where judgment and consistency matter more than execution speed. Claude's agent system - where you can give an agent a fixed tool list and model selection - makes it well-suited for tasks that need structural enforcement.

**Codex** ended up handling: bounded implementation tasks, repo-aware execution, durable file manipulation, and session updates. Codex is stronger when the task is "follow this defined structure precisely" rather than "interpret this and decide what to do." Its skills and preferences system is also well-designed for reusable workflows.

**ChatGPT** handled copy generation. It has business context and voice history for Brazusa that was built up in separate conversations, and copy tasks benefit from that continuity.

**Gemini** was occasionally used for a second opinion when the first answer did not feel right.

This division is not a hard rule. There is plenty of overlap. But having an explicit role table meant that when a task clearly belonged to another tool, it got flagged and routed rather than silently handled by whatever tool was already open.

---

## The recursive improvement loop

This is the most distinctive part of the setup.

The tools were used to improve each other's governance - not just to write code.

The sequence went roughly like this: Claude reviewed the Codex customization system (preferences, skills, CODEX.md) and identified gaps and inconsistencies. Codex reviewed Claude's recommendations and pushed back where it disagreed. Both tools' startup workflows were then aligned through shared durable files. Claude agents and Codex skills were updated based on what the other tool found.

One concrete example started as a narrow em dash disagreement and turned into a broader source-representation rule. Claude recommended using a clean em dash when fixing an encoding artifact in a Codex-owned skill file. Codex pushed back, arguing that the real rule should be wider: AI-owned config and instruction files should stay ASCII-safe, and non-ASCII punctuation in JS/TS source should be represented in a shell-safe way rather than as literal characters. That argument was correct. Claude updated its recommendation. The resulting convention is now in the project contract.

Another: Codex added a step to its durable-update skill for authorship notation in mixed sessions. Claude reviewed it, found the line had actually introduced a mojibake encoding artifact, and fed a corrected prompt back to Codex.

The result is a shared operating system that neither tool designed alone. It is more coherent than what either tool would have produced working in isolation.

---

## Concrete mechanisms that made it work

**Startup context restoration.** Both tools have a startup workflow that reads `docs/decisions.md` before doing anything substantial. Without this, every session spends the first several minutes re-establishing context. With it, the session brief is ready in under a minute and work starts from where it left off.

**The integration safety gate.** Before any change to API routes, Airtable fields, Resend templates, or Google Sheets columns - a dedicated agent reads all three destinations, produces a field-mapping manifest showing exactly what would change, and requires explicit confirmation before a file is touched. This gate prevented several potential data schema mismatches on a live production system. The agent has Glob, Grep, and Read access only - no write access, no Bash. It cannot accidentally do damage while auditing.

**Agents for enforcement, not just delegation.** The quality bar is encoded in the tooling. The copy-review agent does not give general impressions - it flags specific violations with quoted text. The integration-safety agent does not just suggest caution - it stops the session until you confirm. These are structural gates, not conversational reminders.

**The promotion rule.** Anything durable must be written to `docs/decisions.md` before a session ends. If a decision only exists in the session log, it is invisible to future AI sessions. The session log is a diary, not a backup for the decisions file.

**Model routing.** Explicit rules about which task goes to which tool. When a task clearly belongs elsewhere, the current tool flags it and explains why rather than taking it on silently. This prevents both tools from creeping into each other's domain.

**Authorship notation.** When both tools contributed to a session, the session log records which tool authored which part. This sounds like overhead, but it matters: future sessions can distinguish Claude-driven decisions from Codex-driven ones and avoid misattributing reasoning.

---

## What changed over time

This was not designed all at once. It evolved.

1. **Claude-only setup** - started with CLAUDE.md and custom agents. No Codex involvement.
2. **Codex added** for bounded implementation tasks where repo-aware execution mattered.
3. **CODEX.md thin adapter created** - the repo needed a way to tell Codex how to apply the existing project contract without duplicating it.
4. **Inconsistent startup behavior identified** - both tools had different understandings of what to read at session start. Solved by making `docs/decisions.md` the shared AI-facing startup context explicitly.
5. **Session log architecture reworked** - originally the session log was treated as dual-purpose: both a decision reference for the AI and a learning record for Charles. This caused confusion about what belonged where. The final architecture is clean: session log is human-facing diary only, decisions.md is the AI startup context. This took several sessions to identify and implement cleanly.
6. **Model role assignment made explicit** - the division between Claude and Codex was implicit for a while, which caused both tools to occasionally take on tasks that belonged to the other. Writing the role table into CLAUDE.md fixed this.
7. **Authorship notation added** - sessions were producing decisions that mixed Claude and Codex contributions without attribution. Adding notation conventions made the record reliable.
8. **Codex preferences and skills refined** through multiple passes, often with Claude reviewing the output of each pass.

---

## What worked well

**Context restoration.** The startup workflow is the single highest-leverage thing in this setup. Starting a session without it is noticeably worse.

**The integration safety gate.** On a live production system with no staging environment, this gate is not optional - it is the difference between catching a schema mismatch in a manifest and catching it after a broken form submission.

**Cross-model handoffs.** The chatgpt-prep and copy-review agents made the Claude-to-ChatGPT-to-Claude loop reliable. Copy came back already mapped to the component's data structure. Violations were caught before anything landed in code.

**Having two tools audit each other.** The recursive improvement loop produced real corrections that neither tool would have found alone. Codex's encoding argument was correct and changed the convention. Claude's structural catches fixed Codex's outputs multiple times.

**Structural enforcement via agents.** Agents enforce the quality bar - they do not just suggest caution. The integration-safety agent stops the session until you confirm the manifest. The copy-review agent produces a list of specific violations, not a general impression. This only works because the agents have restricted tool lists: the integration-safety agent cannot accidentally edit anything because it does not have write access. Rules written as absolute constraints in CLAUDE.md ("never do X without Y") work for the same reason - they leave less room for interpretation under pressure than preferences do.

---

## What was hard

**Encoding fragility.** LLM-generated text sometimes contains UTF-8 em dashes that get written into config files as corrupted bytes - `â€"` instead of `—`. Finding and diagnosing this the first time takes longer than it should. The fix is straightforward (ASCII hyphens in AI-owned files), but the issue is subtle enough that it can survive several rounds of inspection before getting caught. See the Known Problems section for a specific incident.

What the project learned later is that the em dash symptom was narrower than the real rule. The true risk surface was non-ASCII punctuation more broadly during AI read-modify-write cycles in this Windows PowerShell environment. The durable fix ended up being two rules, not one: keep AI-owned config and instruction files ASCII-safe, and represent non-ASCII punctuation in JS/TS source in a shell-safe way rather than as literal characters.

**Instruction drift.** Rules written in one file do not automatically propagate to other files. CLAUDE.md, CODEX.md, AGENTS.md, and the Codex preferences can drift apart if changes are not applied symmetrically. This happened multiple times and required audit passes to catch. The thin-adapter principle (keep CODEX.md short, keep CLAUDE.md authoritative) helps, but does not eliminate the problem.

**Over-optimization risk.** It is easy to spend a full session tuning the workflow instead of building the product. There is a real tension between "the operating system is not good enough yet" and "stop and ship something." The current setup has a deferred items list partly to create a forcing function: if something is deferred, it stays deferred until the product work justifies returning to it.

**Agent vs. skill asymmetry.** Claude agents are structurally enforced - they have defined tool lists, a specific model, and run in isolated context windows. Codex skills are prose-governed - they work if the model follows the instructions. These are different failure modes. Agents can fail by being over-constrained or having the wrong tools. Skills can fail by being ignored or misread. Neither approach is strictly better, but the asymmetry means the same workflow pattern behaves differently depending on which tool is running it.

**Multi-tool write conflicts.** There is no protocol yet for what happens when both tools try to edit the same durable file in the same session. Currently avoided by running sessions sequentially. This is documented as an open gap, not a solved problem. See the Known Problems section.

**Knowing when to stop.** Every hour spent on workflow infrastructure is an hour not spent on the actual product. The right stopping point is a judgment call with no clean answer. This setup was built on a real project with real constraints - that helped, because the product work created natural pressure to stop tuning and start building.

**Session log architecture.** The original mental model - session log as dual-purpose, both AI reference and human diary - was plausible but wrong. It created confusion about what belonged where and caused both tools to sometimes read or write the wrong file. Getting to the correct architecture (session log is human-facing only; decisions.md is the AI startup context) required recognizing the problem, understanding why it mattered, and then propagating the change across both tools' startup workflows. It took longer than it should have.

---

## What to take from this

Start with one durable contract file. Get your primary tool reading it reliably before adding anything else. A CLAUDE.md with five absolute rules and three architecture constraints is more useful than a twenty-page style guide nobody reads.

Separate decisions from session logs early. If your architectural decisions live in chat history, they are already invisible to future sessions.

Write absolute rules as absolute rules. "Prefer X" gets ignored under pressure. "Never do X without Y" does not. The distinction matters most for safety-critical workflows.

Be precise about source representation versus rendered output. The right fix for the punctuation issue was not "downgrade the copy to plain ASCII everywhere." It was "store risky punctuation safely in source, and verify shell output before calling something corrupted." That framing preserves both correctness and copy quality.

Encode safety gates in tooling, not conversation. A dedicated agent that stops you from editing live integration files until you confirm a manifest is worth more than a rule you have to remember.

Do not add the second tool until you have real division of labor. If you are doing everything in one tool and it is working, a second tool adds coordination overhead without adding value. The second tool became useful here because there were genuinely different tasks that each tool handled better.

Do not over-fit too early. Build a real feature, notice what breaks, then add the governance that fixes that specific thing. Building governance before you have production problems means you are guessing at the failure modes.

If you use two tools together, make them audit each other deliberately. The recursive improvement loop is not an accident - it requires explicitly asking each tool to review the other's output and configuration.

---

## Things that can still be done

These are not all equal. Some are immediate and blockers for clean product work. Others are longer-term improvements that would strengthen the system but are not urgent.

### Actionable now

- **Commit the current governance changes.** Four files are currently modified and uncommitted: `AGENTS.md`, `CODEX.md`, `docs/decisions.md`, `docs/session-log.md`. These represent the completed Claude/Codex alignment pass and should be committed as one unit before any product work starts.
- **Run the copy blueprint workflow on `docs/briefs/copy.txt`.** Use ChatGPT for the broad rewrite first, then bring the result back to Claude/Codex for repo-aware critique and mapping before requesting any section-level final copy.
- **Inline style cleanup.** Many components in `components/clean/` use `style={{ color: 'var(--color-...)' }}` where a Tailwind utility should be used instead. Tailwind v4 exposes all `@theme` tokens automatically. Static values only - dynamic/conditional inline styles need a separate decision.
- **QuoteDrawer email/phone split.** The contact field is currently a single field. The decision to split it into separate email and phone fields (both optional, at least one required) has been made. Implementation is blocked on running the integration-safety agent first to produce a manifest across Resend, Airtable, and Google Sheets.
- **Accordion image replacements.** Charles to re-export the accordion images.
- **Service area town list.** Awaiting a ChatGPT audit pass.
- **Testimonials pricing context.** Awaiting real data from Charles.

### Longer-term and aspirational

- **Multi-tool write conflict protocol.** No protocol currently exists for what happens when Claude and Codex both attempt to write to the same durable file in the same session. Sessions are sequential now, so this is not a real problem yet. It will need a solution when concurrent or overlapping usage becomes real.
- **Create a clean code agent.** A dedicated Claude agent for implementation quality review - naming conventions, component structure, TypeScript standards, helper organization. Currently this guidance lives in CLAUDE.md as text; an agent would enforce it at review time.
- **Create an LLM optimization agent.** A dedicated agent for reviewing prompt design, context management, and token efficiency. The charles-codex-optimizer skill covers part of this for Codex; a Claude-side equivalent would complete the picture.
- **Shareable hash links for Pricing filter chips.** Currently in-page scroll only; deferred.
- **ChatGPT refinement of per-client service copy.** The per-client service descriptions have not had a full copy pass.
- **QuoteDrawer file uploads.** Phase 1 should be email-first, with a WhatsApp fallback for files that exceed Gmail's attachment limit (~25MB). A proper storage-backed system is Phase 2.
- **Periodic governance audit workflow.** As the project grows and more sessions happen, the governance files will drift. A scheduled audit pass - reading all operating files and checking for inconsistencies - would catch problems earlier. This could eventually become a dedicated agent or skill.
- **Formal versioning of the operating system.** Right now there is no version marker on CLAUDE.md or the Codex preferences. If a major architecture change is made, there is no easy way to know whether a given session was running the old or new version. Low priority now; matters more if the system becomes complex enough to have breaking changes.
- **Formalize the ChatGPT copy workflow as reusable tooling.** The emerging pattern - ChatGPT for blueprint rewrite, Claude/Codex for repo-aware review and mapping, then targeted follow-up prompts - should eventually become a dedicated workflow update on the Claude side plus a Codex-side skill or equivalent reusable guide.

---

## Known problems and issues

### Mojibake encoding incident - April 2026

During a governance alignment pass where both Claude and Codex were working on the same set of durable files, a disagreement emerged about whether encoding corruption was present in `CODEX.md`.

**What Codex reported:** Lines 32 and 33 of `CODEX.md` contained mojibake - the character sequence `â€"` where an em dash should appear. Codex confirmed that this was content-level corruption (the file was valid UTF-8 overall, but the em dash had been written as already-corrupted bytes, so they were stored as three normal characters rather than one). Codex recommended a surgical fix: replace the two bad lines with ASCII hyphens.

**What Claude observed:** Reading the same file, the lines appeared clean - proper em dashes rendered correctly. A grep for the mojibake sequence (`â€"`) across all markdown files in the repo returned no matches.

**What likely happened:** The corruption was real at some point. Either Codex fixed it during its investigation before writing the summary, or there was a difference between how the tools inspect files (Claude's Read tool may normalize certain characters that appear differently in raw byte inspection). The tools could not agree on whether the issue was present because they were looking at different states of the file, or using different inspection methods, without knowing it.

**Why this matters beyond the specific incident:** The two tools have different inspection capabilities. Claude's Read tool is optimized for rendering - it normalizes some things. Codex can inspect at a lower level. This means subtle file hygiene issues can appear to exist in one tool's view and not the other's. The disagreement is not either tool being wrong - it is a genuine gap in cross-tool observability.

**Current status:** No mojibake found in any repo markdown file as of the final verification pass. Considered resolved.

**Lesson:** When one tool finds a file-level anomaly that the other does not, do not dismiss either report. Verify at the character/codepoint level before changing files. Do not do broad re-encoding - a surgical content fix on the specific lines is correct. And treat this as a source-representation rule, not a copy-quality downgrade: AI-owned config files stay ASCII-safe, while JS/TS source represents non-ASCII punctuation in a shell-safe way.

### Shell-display mojibake in Windows PowerShell

Later, a different encoding problem showed up: not corrupted file content, but misleading shell output.

In this environment, `Get-Content` could display valid UTF-8 files incorrectly. We confirmed this on `README.md`, `components/StickyNav.tsx`, and `CODEX.md` by comparing normal shell output against a raw-byte read with explicit UTF-8 decode. The shell path showed mojibake like `â€”` and `2Ã—2`, while the raw-byte UTF-8 decode showed the correct characters `—` and `2×2`.

The shell state was mixed at the time of verification: `chcp` was `437`, `$OutputEncoding` was US-ASCII, console output was UTF-8, and console input was IBM437. Even after trying the normal UTF-8 shell settings (`chcp 65001` plus UTF-8 input/output encodings), the display path was still not trustworthy enough to use as the sole source of truth.

The important distinction is this: not every mojibake-looking shell read means the file is damaged. In this environment, shell display alone is not evidence. The safer workflow is: use `rg` for discovery, verify suspicious text with raw-byte read plus explicit UTF-8 decode, and trust editor rendering or rendered app output over misleading shell output until verified.

This incident also clarified the policy boundary. Verification is one rule: shell display can lie, so confirm before treating mojibake as corruption. Source representation is a separate rule: AI-owned config and instruction files stay ASCII-safe, while non-ASCII punctuation in JS/TS source is represented in a shell-safe way when exact rendering matters.

### Multi-tool write conflict gap

There is no protocol for what happens when Claude and Codex both attempt to edit the same durable file in the same session. Currently avoided by running sessions sequentially. Documented in `docs/decisions.md` Deferred Items. Revisit when concurrent or overlapping usage becomes real.

---

## Where to look in this repo

**In the repo:**

- `CLAUDE.md` - the rules Claude operates under. Read the "Rules: Always" section first. The rest of the file governs defaults and architecture.
- `CODEX.md` - the thin adapter layer for Codex. Short by design.
- `docs/decisions.md` - locked decisions with rationale and constraints. The AI-facing startup context.
- `docs/session-log.md` - the human-facing session diary. Not read by AI tools at startup.
- `.claude/agents/` - five subagent files. Each is self-contained: you can read any one cold and understand exactly what it does, what tools it has, and what it produces.

**Codex runtime config and repo export:**

At runtime these live in `~/.codex/` on the developer's machine, and they apply across all Codex sessions, not just this project. For reproducibility, the relevant files are also mirrored in this repo under `docs/ai-config-export/codex/`.

- `~/.codex/preferences/charles-core.md` - collaboration style, question-asking policy, response defaults
- `~/.codex/preferences/charles-codex.md` - Codex-specific optimization and session structure
- `~/.codex/preferences/charles-llm-workflow.md` - cross-model workflow, handoff prep, returned-output review
- `~/.codex/skills/charles-session-start/` - session startup workflow
- `~/.codex/skills/charles-durable-update/` - session wrap-up and durable file updates
- `~/.codex/skills/charles-clean-code/` - implementation quality, naming, structure
- `~/.codex/skills/charles-codex-optimizer/` - prompt review and Codex usage improvement
- `~/.codex/skills/charles-llm-workflow/` - multi-model workflow guidance
