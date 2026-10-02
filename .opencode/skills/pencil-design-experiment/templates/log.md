# Log: <experiment name>

Chronological record of actions, evidence, tool output, and the exact role and
model/variant responsible for each finding. This log is the evidence source for
the retrospective; compaction is never the source of truth.

## YYYY-MM-DD — <phase>

### Paths

- Source (read-only): `<source .pen path>`
- Target (only writable Pen): `<isolated artifact path>`
- Durable state: `<experiment directory>`
- Code-side source of truth (read-only): `src/`
- Skill (writable after approval): `.opencode/skills/pencil-design-experiment/`

### User-gate rule

Local, reversible Pencil edits inside the approved experiment frame are allowed
without separate confirmation. Creating or changing a reusable master, token,
global canvas structure or any source-of-truth artifact requires an explicit
user gate.

### Actions and evidence

| # | Action   | Role                                    | Model/variant     | Evidence / disposition |
| - | -------- | --------------------------------------- | ----------------- | ---------------------- |
| 1 | <action> | <orchestrator \| implementation worker> | `<model#variant>` | <artifact and result>  |

<state what has not happened yet: no mutation, no review, etc.>
