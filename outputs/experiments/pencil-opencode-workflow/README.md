# Experiment: Pencil × OpenCode workflow

**Status:** completed (2026-10-02).

**Spec:** [`docs/superpowers/specs/2026-10-02-pencil-opencode-workflow-design.md`](../../../docs/superpowers/specs/2026-10-02-pencil-opencode-workflow-design.md)

**Plan:** [`docs/superpowers/plans/2026-10-02-pencil-opencode-workflow.md`](../../../docs/superpowers/plans/2026-10-02-pencil-opencode-workflow.md)

## Hypothesis

A project-local OpenCode skill can drive Pencil MCP work predictably enough to
compose a new dashboard flow, visually consistent with the existing design
system, without canvas clutter and without template "AI slop", if the workflow:

- reads the code-side and Pen-side contracts first;
- keeps every Pencil mutation inside one isolated experiment document;
- records the plan, operations and evidence outside the conversation context;
- runs independent read-only reviews in the orchestrator and verifies each finding against an artifact;
- separates mechanical checks from human visual judgment;
- stops at an explicit checkpoint before context is lost.

This experiment tests the workflow, not a product implementation.

## Scope — Create Project flow

The benchmark is a new **Create Project** flow inside the existing dashboard.

Required fields:

- name;
- short description;
- owner;
- due date.

Required states and outcomes:

- entry point from Projects;
- required-field validation;
- cancel;
- submit;
- success state where the created project appears in Projects.

In scope: an isolated copy of the Pen document for the benchmark; Pen-first,
code-aware composition; reading existing React/PandaCSS presets, tokens,
components, icon assets, tests and Pen contracts as sources of truth; local
frames/screens with evidence; the project-local OpenCode skill and persistent
experiment artifacts; structural, contrast, code-alignment and visual reviews.

Out of scope: React/PandaCSS or production behavior changes; changes to the
source `design_system_ex_1.pen`; changes to foundation tokens, reusable
masters, public components or the icon set; a production-ready Create Project
implementation; motion/effects research beyond workflow-quality observations.

## Source / target boundaries

| Object                                       | Mode                                                | Owner                |
| -------------------------------------------- | --------------------------------------------------- | -------------------- |
| Source Pen design-system document            | read-only reference                                 | existing design system |
| `artifacts/create-project.pen`               | only writable Pen benchmark                         | experiment           |
| `src/` and PandaCSS contracts                | read-only source of truth                           | codebase             |
| Persistent experiment files                  | writable                                            | orchestrator         |
| `.opencode/skills/pencil-design-experiment/` | writable after implementation-plan approval         | experiment           |

Source path (read-only):
`/Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen`

Target path (writable):
`outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`

Local, reversible Pencil edits inside the approved experiment frame are allowed
without separate confirmation. Creating or changing a reusable master, token,
global canvas structure or any source-of-truth artifact requires an explicit
user gate.

## Success criteria

The experiment succeeds when:

- the agent creates and uses persistent state without hidden decisions;
- the Create Project flow is composed in the isolated Pen copy from existing
  design-system contracts;
- structural, contrast and code-alignment reports are reproducible evidence;
- at least one checkpoint/handoff is resumed in a new session without material
  loss of work state;
- independent reviews are executed and their findings are verified or rejected
  with evidence;
- the user accepts the final visual review;
- the resulting project-local skill can be loaded and followed for a comparable
  future task.

## Honest-failure criteria

The experiment is partially or fully unsuccessful if Pencil MCP lacks the
required observability/control, persistent artifacts cannot restore work, the
rubric misses obvious visual failures, or the agent needs continual manual
microcommands to avoid canvas clutter. A mechanically valid but visually weak
composition is recorded as `HUMAN REVIEW`, not as success.

## Artifact map

```text
outputs/experiments/pencil-opencode-workflow/
├── README.md                 # this file: question, scope, boundaries, criteria
├── roadmap.md                # phases, decisions, gates, checkpoint position
├── todo.md                   # atomic tasks with planned/active/blocked/verified
├── log.md                    # dated actions, evidence, tool output, role/model
├── history.md                # short human-readable journal
├── notes/
│   ├── design-brief.md       # Create Project fields, states and acceptance
│   ├── benchmark-protocol.md # Gates A–D, evidence, model contract, human review
│   ├── review-report.md      # created in a later task
│   └── results.md            # created in a later task
└── artifacts/
    └── create-project.pen    # isolated writable benchmark (later task)
```
