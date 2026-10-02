---
name: Pencil Design Experiment
description: Run a code-aware, evidence-first Pencil MCP experiment using the project's existing design system and durable workflow state.
---

# Pencil Design Experiment

Runs one isolated, code-aware Pencil MCP benchmark (for example the Create
Project flow) while durable experiment state stays authoritative. The workflow
is evidence-first: every design decision and review finding is tied to a
Pen/code/screenshot artifact, never to a recollection of the conversation.

Use this skill when the user asks to run, resume or review the Pencil × OpenCode
workflow experiment in this project.

## Hard stop

Do not plan or mutate Pencil content until all of these exist:

- the isolated writable Pen artifact, for this experiment
  `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`;
- the durable state
  `outputs/experiments/pencil-opencode-workflow/{README,roadmap,todo,log,history}.md`;
- the approved design brief and acceptance criteria in `notes/`.

If any is missing, report exactly what is missing and stop. Never create a
substitute target, design inside the read-only source document, or improvise
durable state.

## Read-first protocol

Before any planning or Pencil mutation, read:

1. the experiment `README.md`, then current `roadmap.md`, `todo.md` and
   `log.md` — durable state is the source of truth, compaction is not;
2. the relevant code contracts: `src/shared/components/`,
   `src/shared/styles/foundation/`, `src/shared/components/icon/`,
   `.agents/project.md`, and the current design brief;
3. the built-in Pencil skill plus the schema, `execute` and design-system
   references required for the next mutation.

Load this skill's references only when the next step needs them, so the main
context is not inflated:

- `references/design-system-contract.md` — source paths, ownership, edits.
- `references/quality-rubric.md` — statuses, resolved-fill logic, anti-slop.
- `references/pencil-mcp-protocol.md` — read/mutate/verify mechanics.
- `references/handoff-protocol.md` — checkpoint and continuation template.

The durable-state templates live in `templates/roadmap.md`, `templates/todo.md`
and `templates/log.md`; copy them when a new experiment is opened.

## Scope and ownership

- Only `artifacts/create-project.pen` is writable per experiment. The source Pen
  document and `src/` are read-only sources of truth.
- Reuse existing component refs, semantic tokens, theme contexts and canonical
  icon assets. Do not create visual substitutes.
- Creating or changing a reusable master, token, global canvas structure or any
  source-of-truth artifact requires an explicit user gate. If a needed element
  cannot be composed from existing refs, stop and ask the user.
- Full rules: `references/design-system-contract.md`.

## Delegation and context contract

Workers use `deepseek/deepseek-flash#high` only for scoped implementation work
assigned by the orchestrator. The `openai/gpt-5.6-terra` orchestrator conducts
the code-system, Pencil structural and visual reviews itself, verifies each
piece of evidence against a Pen/code/screenshot artifact, and records the
disposition. Workers do not review their own changes and do not start other
subagents. Record the exact model/variant and role for every worker operation in
`log.md`.

Before a new phase, a large inspection, a subagent fan-out or a Pencil mutation:

If the next action is a new phase, a large inspection, a subagent fan-out, or a Pencil mutation and the current context cannot safely complete it, update roadmap/todo/log and choose autonomously: request manual compaction and continue after it completes when the durable state is sufficient, or emit a clean-session handoff and stop the run when a fresh context is safer. Do not ask the user to choose.

The user is never asked to pick a continuation mode. The only required human
decision is the final visual review of the benchmark.

## Workflow

```text
bootstrap
→ code/Pen inventory and baseline
→ design brief and atomic plan
→ user gate
→ local Pencil mutations with immediate verification
→ independent reviews
→ evidence-based corrections
→ human visual review
→ retrospective and skill update
```

Gate summaries; the authoritative per-gate evidence is `notes/benchmark-protocol.md`
and `references/quality-rubric.md`.

- **Gate A — readiness:** isolated Pen artifact exists; brief and acceptance
  criteria approved; code/Pen contracts and baseline recorded.
- **Gate B — before mutation:** the task exists in `todo.md` and is atomic; the
  target is inside the approved experiment scope; no master/token/global change;
  the verification method is known before the run.
- **Gate C — per section:** `ctx.problems` has no clipping or collapsed layout;
  the root is not polluted with leaf nodes; existing refs/tokens/assets are used;
  hierarchy, boundaries and contrast are checked against actual resolved fills; a
  focused screenshot is saved.
- **Gate D — before human review:** the flow covers every required field and
  outcome; findings are classified `PASS`, `FAIL`, `INFO` or `HUMAN REVIEW`;
  mechanical checks are complete; unresolved aesthetic trade-offs are presented
  to the user.

## Mutation protocol

Apply `references/pencil-mcp-protocol.md`. In short: read-before-mutate, one
atomic task per mutation, `placeholder: true` while a new root's content is
unfinished, `clip: true` on screens, direct property updates instead of
delete/recreate, and an immediate `ctx.problems` plus focused-screenshot check
after each section.

## Evidence and retrospective

Classify every finding with the rubric. A mechanically valid but visually weak
composition is `HUMAN REVIEW`, not `PASS`. Do not accept a worker statement as
proof; verify the fact in Pen, code or a screenshot and log the disposition.
Base the retrospective on logged evidence, not impressions, and change this
skill only for a logged observation, citing that log entry.
