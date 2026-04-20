# Codex Usage Log

Use this file to track durable lessons about how Charles uses Codex across projects.

## 2026-04-18
- Codex should be aligned to feel as similar as practical to Charles's Claude workflow.
- More targeted questions is a feature, not friction, because Charles values learning and control.
- Meta-analysis of prompt quality, plan quality, and assistant behavior is first-class work.
- Technical preferences established in Claude should be treated as global defaults unless a project overrides them.
- Codex should actively support handoff workflows with Claude, ChatGPT, and Gemini.
- Codex should contribute faithfully to persistent session and usage logs.
- Codex-specific optimization deserves its own layer: some guidance is cross-model, but some belongs in Codex-native prompt, plan, skill, and session design.
- A dedicated session-start workflow is the highest-leverage operational layer because it turns durable preferences into consistent behavior at the start of meaningful work.
- Implementation quality also deserves its own reusable layer so Charles's naming, structure, dependency, typing, and test preferences do not stay trapped in general prose.
- Session wrap-up also needs a reusable layer so decisions, learning, follow-up items, and workflow lessons are preserved in the right durable place instead of staying trapped in chat.
- The highest-value project-specific Codex preservation layer starts with live integration safety, because that is where silent drift would be most damaging.

## 2026-04-19
- In this Windows PowerShell environment, shell-displayed mojibake is not enough to prove file corruption.
- `Get-Content` can mis-render valid UTF-8 punctuation while raw-byte reads with explicit UTF-8 decode still show correct text.
- When Unicode correctness matters, prefer verification by raw-byte UTF-8 decode, editor rendering, or rendered app output before changing files.
- Trying UTF-8 shell settings first is reasonable, but trust should come from verification rather than assuming the shell display path is fixed.
