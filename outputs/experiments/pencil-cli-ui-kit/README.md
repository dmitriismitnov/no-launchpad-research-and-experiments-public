# Experiment: Pencil CLI UI Kit

**Status:** closed (2026-10-06, by direct user instruction).

Branch: `experiment/pencil-cli-ui-kit` from `main`.

## Question and hypothesis

Can a clean Pencil `.pen` document be created and activated without manual
Pencil UI operations, using CLI, then controlled through MCP to build a small,
code-aligned UI Kit?

Both paths are mandatory evidence, irrespective of the first result:

1. direct `pen --out … --prompt …` creation;
2. `pen interactive --out …` headless interactive shell with MCP tools.

The hypothesis passes when at least one path creates the target without GUI and
the headless session identifies that target as active before any mutation. The
user opens GUI only for final visual review.

## Scope

The clean target contains:

- Foundation: light/dark semantic colour roles, typography, spacing, radii,
  borders, shadows, focus and interaction roles;
- reusable masters: `Button`, `ButtonIcon`, `Card`;
- showcase frames that evidence variants and states.

`src/`, existing `.pen` documents and the icon set are read-only code/design
contracts. The user explicitly authorizes foundation variables, reusable masters
and local canvas structure only in this clean target.

## Non-goals

- Production React/PandaCSS changes, codegen, icon/font work or a product screen.
- GUI creation/opening of the target.
- Mutation of existing `.pen` documents or source-of-truth code/design artifacts.

## Boundaries

| Object | Mode |
| --- | --- |
| `src/` and canonical icons | read-only contract |
| Existing `.pen` documents | read-only |
| `artifacts/pencil-cli-ui-kit.pen` | only writable Pen artifact |
| This experiment root | writable durable state |

## Success criteria

1. Both CLI paths are tested with reproducible commands and recorded outcomes.
2. `pencil-cli-ui-kit.pen` is created without manual Pencil UI operations.
3. MCP confirms the target as active before each mutation.
4. Foundation, Button, ButtonIcon and Card match their code-side contracts.
5. Each atomic section has structure, `ctx.problems` and screenshot evidence.
6. Findings use `PASS`, `FAIL`, `INFO` or `HUMAN REVIEW`; only the user closes
   the experiment after visual review.

## Artifact map

```text
README.md                 # this contract
plan.md                   # approved implementation plan
roadmap.md                # phases and gates
todo.md                   # atomic tasks
log.md                    # commands, evidence and dispositions
history.md                # human-readable journal
notes/                    # brief, protocol and evidence
artifacts/pencil-cli-ui-kit.pen # sole writable Pen document
```

## State (2026-10-06)

- The headless `pen interactive` route created, owned and mutated the clean
  target without the GUI. The direct `pen --out --agent` route exceeded the
  harness limit and the CLI does not expose the requested DeepSeek IDs.
- The target contains the Foundation, the `Button`, `ButtonIcon` and `Card`
  masters, a `Projects overview` composition, a layered token architecture and
  decomposed theme axes (`palette`, `typography`, `spacing`, `shape`,
  `effects`, plus `mode`).
- `mise run check` passed (840 unit / 724 browser) and the final active-document
  audit reported three masters, valid typography resolution and no
  `ctx.problems`.
- Closed on the user's direct instruction after visual review. Outcome,
  retrospective and classification: `notes/results.md`.
