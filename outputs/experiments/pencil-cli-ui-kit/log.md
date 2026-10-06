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
| 3 | Tested direct `pen --out` route | orchestrator | `pen.dev CLI 0.3.10`, agent `codex` | **BLOCKED:** harness terminated the one permitted invocation after 120 seconds. `direct-cli.stdout.log` contains active `pi-agent` design-operation messages (213,930 bytes); stderr is empty; no target/usage file exists. |
| 4 | Created and reopened headless target | orchestrator | `pen.dev CLI 0.3.10` | **PASS:** `pen interactive --out` created the 96-byte target; initial and reopened `get_app_state()` report the exact target path; SHA-256 remained `2ba5b42b…3218b1`. |
| 5 | Queried clean baseline | orchestrator | `pen.dev CLI 0.3.10` | **PASS:** no top-level nodes, no masters and no `Get` visitor layout-problem rows. First `Print(ctx.problems)` query failed/rolled back because `ctx` is visitor-local; correction used `Get((n,c)=>c.problems && …)`. |
| 6 | Created Foundation section | orchestrator | `pen.dev CLI 0.3.10` | **PASS:** root `Qwxp6`, 22 light/dark colour/layout/type variables, role/scales specimen, no visitor `ctx.problems` rows, screenshot `notes/evidence/foundation.png`; evidence in `notes/evidence/foundation.md`. |
| 7 | Created Button master and showcase | orchestrator | `pen.dev CLI 0.3.10` | **PASS:** reusable master `z6FBhy`, clipped showcase `t74zKZ`, semantic tone/state evidence, no visitor layout-problem rows and `notes/evidence/button.png`; evidence in `notes/evidence/button.md`. |
| 8 | Retried direct CLI route with user-selected DeepSeek | orchestrator | requested `deepseek/deepseek-flash#high` | **FAIL:** CLI exited 1 before file creation: `Unknown model 'deepseek/deepseek-flash'`. OpenCode model registry confirms the ID/effort, but pen.dev CLI 0.3.10 does not expose it. |
| 9 | Retried direct CLI route with short DeepSeek ID | orchestrator | requested `deepseek-flash#high` | **FAIL:** CLI exited 1 before file creation: `Unknown model 'deepseek-flash'`; target unchanged. |
| 10 | Inventoried built-in Pen skills | orchestrator | `pen.dev CLI 0.3.10` | **INFO:** read-only `read_skill()` lists schema, execute, generation, components, whiteboard, code and design-domain guides; recorded in `notes/pen-skills-inventory.md`. |
| 11 | Snapshotted built-in Pen guides | orchestrator | `pen.dev CLI 0.3.10` | **INFO:** copied all 15 Markdown resources from the installed `pen-dev` skill to `notes/pen-guides/`; source hashes are in `SHA256SUMS`, use protocol in `notes/pen-guides-snapshot.md`. |
| 12 | Created ButtonIcon master and showcase | orchestrator | `pen.dev CLI 0.3.10` | **PASS:** reusable master `ngKcI`, Lucide plus asset, Foundation-variable paints, clipped showcase `RBsKd`, no visitor layout-problem rows and `notes/evidence/button-icon.png`; evidence in `notes/evidence/button-icon.md`. |

### Rulings

- Run on local branch `experiment/pencil-cli-ui-kit` without a worktree by
  explicit user instruction. Cost if wrong: unrelated current-checkout changes
  could share the branch; task-scoped commits mitigate it.
- Direct CLI evidence is retained as logs/hash. The headless route starts an
  empty canvas and overwrites the target to ensure the final UI Kit is clean.
  Cost if wrong: the direct-route canvas itself is not retained.
- Direct CLI timeout is an external harness limit, not a CLI failure: do not
  rerun because the approved plan permits exactly one direct invocation. Cost if
  wrong: this route has no completed direct-output result, but its inability to
  complete within the harness constraint is reproducibly evidenced.
- Empty canvas baseline has no screenshot. `--enable-preview` emits only after a
  canvas change, and inserting a test frame would violate the no-mutation
  baseline. Cost if wrong: there is no image for the empty target, but the
  active-document, root scan and SHA-256 evidence prove its state.
