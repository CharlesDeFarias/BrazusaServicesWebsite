# AI Config Export — Replication Guide

This directory contains a snapshot of the full AI operating system used to build this
project: Claude agents (tracked in the repo) and Codex global preferences + skills
(exported here because they normally live outside any project directory).

---

## What's Here

### Claude (`.claude/agents/`)
Tracked directly in the repo at `.claude/agents/`. No export needed — cloning the repo
gives you all five agents automatically.

| Agent | Purpose |
|---|---|
| `session-start` | Reads decisions.md + git history at the start of every session |
| `design-review` | Audits visual components for design token violations before commit |
| `chatgpt-prep` | Prepares copy handoff briefs for ChatGPT/Gemini |
| `copy-review` | Reviews AI-generated copy before it enters the codebase |
| `integration-safety` | Surfaces all destination changes before touching live integrations |

Agents are structurally enforced: each agent definition restricts which tools it can
use. `integration-safety` has no write access by design.

### Codex (`docs/ai-config-export/codex/`)
Codex global config normally lives at `%USERPROFILE%\.codex\` (Windows) or `~/.codex/`
(Mac/Linux). For runtime, that is still where Codex reads it from. For this project,
the repo now holds the source-of-truth copy so the setup can be inspected and rebuilt.

| Path in export | Normal runtime location | Purpose |
|---|---|---|
| `preferences/charles-core.md` | `~/.codex/preferences/` | Core behavior defaults |
| `preferences/charles-tech.md` | `~/.codex/preferences/` | Tech stack preferences |
| `preferences/charles-llm-workflow.md` | `~/.codex/preferences/` | Multi-model workflow rules |
| `preferences/charles-codex.md` | `~/.codex/preferences/` | Codex-specific session behavior |
| `skills/charles-*/` | `~/.codex/skills/` | Reusable global skills (any project) |
| `skills/claudecoding-integration-safety/` | `~/.codex/skills/` | Project-specific skill (scoped to this repo) |
| `meta/codex-usage-log.md` | `~/.codex/meta/` | Session usage log |
| `config.toml` | `%USERPROFILE%\.codex\config.toml` | Machine-level Codex config |

---

## Replicating the Setup

### Step 1: Claude

Clone the repo. Done — agents are in `.claude/agents/` and load automatically.

```bash
git clone <repo-url>
cd claudecoding
```

### Step 2: Codex — Preferences and Skills

Copy the exported files to Codex's global config directory.

**Windows:**
```powershell
# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\preferences"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\skills"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\meta"

# Copy preferences
Copy-Item docs\ai-config-export\codex\preferences\* "$env:USERPROFILE\.codex\preferences\" -Force

# Copy skills
Copy-Item docs\ai-config-export\codex\skills\* "$env:USERPROFILE\.codex\skills\" -Recurse -Force

# Copy meta
Copy-Item docs\ai-config-export\codex\meta\* "$env:USERPROFILE\.codex\meta\" -Force
```

**Mac/Linux:**
```bash
mkdir -p ~/.codex/preferences ~/.codex/skills ~/.codex/meta

cp docs/ai-config-export/codex/preferences/* ~/.codex/preferences/
cp -r docs/ai-config-export/codex/skills/* ~/.codex/skills/
cp docs/ai-config-export/codex/meta/* ~/.codex/meta/
```

### Step 3: Codex — config.toml (read this before copying)

`config.toml` contains **absolute Windows paths** that are specific to the original machine:

```toml
[projects.'C:\Users\charl\Desktop\claudecoding']
trust_level = "trusted"
```

Do not copy this file directly. Instead, create a fresh one at `%USERPROFILE%\.codex\config.toml`
(Windows) or `~/.codex/config.toml` (Mac/Linux) with your own project paths:

```toml
project_doc_max_bytes = 131072
project_doc_fallback_filenames = ["CLAUDE.md", "GEMINI.md", "TEAM_GUIDE.md", ".agents.md"]

[features]
memories = true

[windows]
sandbox = "elevated"

[projects.'C:\YOUR\ACTUAL\PATH\TO\claudecoding']
trust_level = "trusted"
```

Replace `C:\YOUR\ACTUAL\PATH\TO\claudecoding` with the real absolute path on your machine.
On Mac/Linux, use forward slashes: `[projects.'/Users/you/projects/claudecoding']`.

---

## What Stays Ignored and Why

The `.gitignore` at the project root has this pattern:

```
.claude/*
!.claude/agents/
!.claude/agents/**
```

`.claude/` is blanket-ignored to keep Claude Code's internal state (settings.local.json,
agent memory, session cache) out of the repo. The `!.claude/agents/` exception surgically
unignores just the agent definitions, which are project source of truth.

Everything else in `.claude/` — session state, local settings, cache — stays ignored.
Committing those would leak machine-specific state and API context into the repo.

Codex's global config (`~/.codex/`) is outside the project directory entirely, so it's
not subject to `.gitignore` at all. The repo copy under `docs/ai-config-export/codex/`
is the reproducible source of truth for this project; the runtime copy still lives in
`~/.codex/`.

---

## Architecture Notes

**Global vs local config:**
Claude agents are project-scoped (`.claude/agents/` lives in the repo). Codex preferences
and most skills are global (`~/.codex/`) — they apply across all projects on the machine.
One skill (`claudecoding-integration-safety`) is project-scoped by naming convention, but
still lives in the global directory.

**Why two tools:**
Claude handles design governance, copy review, long-form reasoning, and integration safety
auditing. Codex handles bounded implementation, repo-state-aware execution, and durable
session updates. The division is documented in `docs/ai-case-study.md`.

**Keeping the export current:**
The repo copy is the source of truth for this project, but there is no automated sync to
the runtime `~/.codex/` directory. If the live Codex preferences or skills change on a
machine, mirror those updates back into `docs/ai-config-export/codex/` and commit them.
