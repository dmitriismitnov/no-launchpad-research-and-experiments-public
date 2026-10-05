# Log: Pencil CLI UI Kit

Chronological record of actions, evidence, tool output and exact responsible
model. Durable state is authoritative; conversation context and compaction are
not.

## 2026-10-06 — Bootstrap

### Paths

- Source contracts (read-only): `src/shared/styles/foundation/` and
  `src/shared/components/{button,button-icon,card,icon}/`.
- Existing `.pen` documents: read-only.
- Target (only writable Pen):
  `outputs/experiments/pencil-cli-ui-kit/artifacts/pencil-cli-ui-kit.pen`.
- Durable state: `outputs/experiments/pencil-cli-ui-kit/`.

### User-gate rule

The user authorizes foundation variables, reusable masters and local canvas
structure only inside the clean target. A target mismatch, source mutation or
scope expansion blocks work. GUI is only for final user review.

### Actions and evidence

| # | Action | Role | Model/variant | Evidence / disposition |
| --- | --- | --- | --- | --- |
| 1 | Opened durable experiment state | orchestrator | `openai/gpt-5.6-terra` | Bootstrap files created; no `.pen` file or MCP mutation yet. |
| 2 | Verified bootstrap contract | orchestrator | `openai/gpt-5.6-terra` | All nine required durable files exist; `outputs/history.md` has the active entry. |

### Rulings

- Run on local branch `experiment/pencil-cli-ui-kit` without a worktree by
  explicit user instruction. Cost if wrong: unrelated current-checkout changes
  could share the branch; task-scoped commits mitigate it.
- Direct CLI evidence is retained as logs/hash. The headless route starts an
  empty canvas and overwrites the target to ensure the final UI Kit is clean.
  Cost if wrong: the direct-route canvas itself is not retained.
