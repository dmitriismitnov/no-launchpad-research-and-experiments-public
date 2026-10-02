# Benchmark protocol: Pencil × OpenCode workflow

**Status:** active (2026-10-02).

This protocol defines how the experiment produces, gates and records evidence.
Durable state (`roadmap.md`, `todo.md`, `log.md`) is the source of truth;
conversation context and compaction are not.

## Model contract (fixed)

| Role                              | Model/variant                    | Mode              | Responsibility                                                     |
| --------------------------------- | -------------------------------- | ----------------- | ------------------------------------------------------------------ |
| Orchestrator                      | `openai/gpt-5.6-terra`           | primary           | Planning, orchestration, evidence verification and all reviews.    |
| Implementation worker             | `deepseek/deepseek-flash#high`   | scoped            | Only the scoped implementation work assigned by the orchestrator.  |
| Human reviewer                    | user                             | human             | Final visual and scope decision.                                   |

Implementation workers do not perform reviews and do not start other
subagents. Every worker operation logs its exact model/variant and role in
`log.md`. The orchestrator verifies each subagent claim against an artifact
before accepting it.

## Gates and evidence

### Gate A — readiness

**Question:** can the experiment start safely?

Required evidence:

- the isolated Pen artifact `artifacts/create-project.pen` exists;
- the design brief and acceptance criteria are approved;
- code-side and Pen-side contracts and the baseline are recorded.

### Gate B — before mutation

**Question:** is this mutation allowed and verifiable?

Required evidence:

- the task exists in `todo.md` and is atomic;
- the target is inside the approved experiment scope;
- no master/token/global mutation is involved;
- the verification method is known before the run.

### Gate C — per section

**Question:** did this section stay mechanically sound?

Required evidence:

- `ctx.problems` contains no clipping or collapsed layout;
- the root is not polluted with leaf nodes;
- existing refs/assets/tokens are used instead of substitutes;
- text hierarchy, boundaries and contrast are checked against actual resolved
  fills (nearest actual fill, including `palette/*`);
- a focused screenshot is saved as review evidence.

### Gate D — before human review

**Question:** is the flow ready for the user's visual decision?

Required evidence:

- the flow covers all required fields and outcomes from the design brief;
- every finding is classified as `PASS`, `FAIL`, `INFO` or `HUMAN REVIEW`;
- mechanical checks are complete;
- unresolved aesthetic trade-offs are explicitly presented to the user.

A mechanically valid but visually weak composition is `HUMAN REVIEW`, not
`PASS`. Disabled specimens never count as an enabled `PASS`.

## Review separation

- Mechanical checks (structure, clipping, resolved fills, contrast,
  code-alignment) are reproducible and are verified against Pen/code/screenshot
  artifacts.
- Visual judgment (hierarchy, readability, composition, anti-slop rubric) is
  performed by the orchestrator against focused screenshots, but any
  non-mechanical concern remains `HUMAN REVIEW`.
- The final visual and scope decision belongs to the human reviewer.

## Checkpoint / handoff

Before a new major phase, a large inspection, a subagent fan-out or a Pencil
mutation, the orchestrator checks whether the next atomic action can be safely
completed with the current context. If not, it finishes only the current safe
atomic operation, updates `roadmap.md`, `todo.md` and `log.md`, and
autonomously requests compaction or emits a clean-session handoff, then stops.
The user is never asked to choose a mode; only the final benchmark review
requires human input.
