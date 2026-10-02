# Log: Pencil × OpenCode workflow

Chronological record of actions, evidence, tool output, and the exact role and
model/variant responsible for each finding. This log is the evidence source for
the retrospective; compaction is never the source of truth.

## 2026-10-02 — Bootstrap

### Paths

- Source (read-only):
  `/Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen`
- Target (only writable Pen):
  `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`
- Durable state:
  `outputs/experiments/pencil-opencode-workflow/`
- Code-side source of truth (read-only): `src/`
- Skill (writable after approval): `.opencode/skills/pencil-design-experiment/`

### User-gate rule

Local, reversible Pencil edits inside the approved experiment frame are allowed
without separate confirmation. Creating or changing a reusable master, token,
global canvas structure or any source-of-truth artifact requires an explicit
user gate. Any new master/token/source change that an existing ref cannot
support must stop the workflow and ask the user rather than designing a
substitute.

### Actions and evidence

| # | Action                                                      | Role                    | Model/variant              | Evidence / disposition                                   |
| - | ----------------------------------------------------------- | ----------------------- | -------------------------- | -------------------------------------------------------- |
| 1 | Created durable state (README, roadmap, todo, log, history) | implementation worker   | `deepseek/deepseek-flash#high` | Committed in `6d8f2ca5c120725c2dbeec70b139a5e233a706fa`. |
| 2 | Defined design brief and benchmark protocol (Gates A–D)     | implementation worker   | `deepseek/deepseek-flash#high` | `notes/design-brief.md`, `notes/benchmark-protocol.md`; committed in `6d8f2ca5c120725c2dbeec70b139a5e233a706fa`. |
| 3 | Registered experiment in `outputs/history.md`               | implementation worker   | `deepseek/deepseek-flash#high` | `active (2026-10-02)` entry linking to the experiment README. |

At the end of the Bootstrap phase, no Pencil mutation had occurred, no isolated
Pen copy existed yet and no review had been performed in that phase.

## 2026-10-02 — Task 3 baseline (implementation worker)

Safe implementation portion of Task 3, Step 3 only. The current single-model operator
owns Steps 1, 2, 4 and 5 (code-system audit, evidence
verification, structural review and state/commit); Task 3 is **not** complete.

| # | Action | Role | Model/variant | Evidence / disposition |
| - | ------ | ---- | ------------- | ---------------------- |
| 4 | Copied source Pen to isolated target | implementation worker | `deepseek/deepseek-flash#high` | `cp /Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`; source and copy both SHA-256 `c9695a1da46e282f77d136455bee48affe8914fea96a5295db3492a126daddc2`, size `9271120` bytes. |
| 5 | Inspected copy via Pencil MCP without mutation | implementation worker | `deepseek/deepseek-flash#high` | Read-only `execute` (`Get` visitor, `GetVariables`, `Print`); 155 root frames, 82 reusable masters, 1720 refs, `ctx.problems` count 0, themes `{"theme":["light","dark"]}`, 587 variables, 231 themed nodes. Copy hash unchanged after inspection. |
| 6 | Drafted raw Pen baseline | implementation worker | `deepseek/deepseek-flash#high` | `notes/pen-baseline.md` created with root-frame/raw facts and timestamp `2026-10-02T04:13:50Z`. Not yet reviewed or marked verified. |

No Pencil mutation was performed against the copy. No skill, source, spec or
plan file was modified.


## 2026-10-02 — model change

| # | Action | Role | Model/variant | Evidence / disposition |
| - | ------ | ---- | ------------- | ---------------------- |
| 7 | GPT limits exhausted; switched to single-model operation | planning/orchestration | `deepseek/deepseek-flash` | Reason and compensation recorded in roadmap decision 4, history.md and benchmark-protocol.md. Independent cross-model review unavailable; replaced by rubric-based evidence self-audit plus mandatory human visual review. |

| 8 | Code-system audit (read-only) | orchestration/audit | `deepseek/deepseek-flash` | `notes/code-system-inventory.md`; five components, tokens, themes, 17 icon keys; divergence code `border` vs Pen `border/subtle+strong` recorded as INFO. |
| 9 | Re-queried Pen copy variables and re-ran baseline structural facts | orchestration/audit | `deepseek/deepseek-flash` | 451 semantic variables, palette roots, themes light/dark; baseline 155 root frames / 82 masters / 1720 refs / 0 problems confirmed. |
