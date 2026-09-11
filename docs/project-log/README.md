# ZHIGALEV-CORE Project Chat Log Policy

Created: 2026-09-11 05:19:50 EDT (America/New_York)

## Purpose

Preserve project decisions and chat history with maximum fidelity for DEAD SIGNAL, HAZY96/HZ96, RL LIFE EXP, and related ZHIGALEV-CORE work.

## Exactness rules

1. **VERBATIM** means the text is copied exactly from chat text available to the assistant at logging time. Do not silently fix spelling, punctuation, profanity, emoji, capitalization, or wording.
2. **RECONSTRUCTED** means the exact original turn is not available. It may be summarized from project context/memory, but must never be presented as a quotation.
3. **TIMESTAMP EXACT** is used only when an exact timestamp is available from a trusted conversation/tool source.
4. **TIMESTAMP COARSE** is used when only the conversation/thread time or date is known.
5. **TIMESTAMP UNAVAILABLE** is used when per-message time is not exposed. Never invent a minute/second.
6. Tool actions are logged with concrete repository paths, branch names, commit SHAs, or externally returned IDs where available.
7. Architectural decisions are linked to their canonical spec files. Chat text and specs are separate records: transcript preserves what was said; specs preserve the current approved design.
8. Superseded ideas are not deleted from history. Mark them as superseded and link the newer decision.
9. Sensitive/private data should not be copied into the project log unless it is necessary for the project and the user explicitly asked for it.

## Logging cadence

For active project-development chats, append meaningful user and assistant turns to the relevant dated log during the session. Preserve exact wording when available and record tool/commit results separately.

## Branch roles

- `main`: canonical project architecture/specifications and project logs.
- `feature/dead-signal-v0.0.1`: isolated DEAD SIGNAL prototype implementation work.
- Other temporary branches may exist; compare them before merging or deleting.

## Known limitation

The assistant does not receive exact per-message timestamps for every historical chat turn, and historical conversation context may be summarized rather than fully verbatim. Retrospective backfills therefore explicitly distinguish VERBATIM from RECONSTRUCTED content.