# Experiment: Design system → code port

**Status:** closed (2026-10-05) as a separate workstream of the extended
Pencil × OpenCode experiment.

**Final assessment:** the authoritative final report is
[`../pencil-opencode-workflow/notes/retrospective.md`](../pencil-opencode-workflow/notes/retrospective.md).
This file keeps its original wording; the closure note below records how the
scope extended and what the bounded code acceptance means.

> **Closure note (2026-10-05).** Original question and scope (below) covered the
> foundation token port and a landing screen as verification, with "all ~70
> documented Pen components … over multiple increments" and "porting all ~70 …
> not in this pass" both stated — a scope wording conflict. In practice the work
> extended into the full Pen component migration
> (`docs/superpowers/plans/2026-10-03-full-pen-component-migration.md`, spec
> `docs/superpowers/specs/2026-10-03-full-pen-component-migration-design.md`),
> whose Pen authority and evidence live under
> `../pencil-opencode-workflow/artifacts/ex_2.pen` and
> `../pencil-opencode-workflow/notes/batch-*-evidence.md`. Final outcome:
> **bounded code acceptance** — 82 Pen masters reconciled to 72 owner
> directories, but many documented public axes remain `BLOCKED`, so this is not
> full behavioral/visual parity. See the retrospective §4.3, §4.4 and §10. This
> closure did not itself commit the documentation; committing it is left to the
> user.

## Question

Can the Pen design system be ported into the PandaCSS/React codebase so the code
becomes the source of truth, verified by a real landing screen?

## Decisions (2026-10-02)

- **Pen is the full source of truth for color.** The code palette and semantic
  matrix adopt Pen values (Tailwind-like palette; brand is green).
- **All ~70 documented Pen components** are in scope, over multiple increments.
- Because the palette and the semantic matrix are tuned to each other, they are
  ported as one atomic change; a palette-only swap leaves the contrast tests red.

## Scope

In scope:

- port the **foundation token layer** to match the Pen system, starting with the
  semantic boundary model (`border.subtle` + `border.strong`, replacing the single
  `border`, keeping `divider`);
- the components required by the landing screen (existing `Button`, `ButtonIcon`,
  `Icon`, `Card`, `Input`; new ones only if a section genuinely needs them);
- a **landing screen** composed from those tokens/components, light + dark,
  desktop/tablet/mobile, as the verification artifact.

Out of scope:

- runtime behavior, state machines, motion;
- the dashboard;
- porting all ~70 documented Pen components in this pass (separate follow-up);
- editing Pen documents.

## Rules (from AGENTS.md and .agents/)

- `src/shared` uses isolated PandaCSS presets; each component owns its preset.
- Never edit `src/shared/styled-system`; change theme/config and run `mise run gen`.
- Exact dependency versions; no `package.json` scripts; `mise` only.
- Every change is verified with `mise run check` (and `check:deps` when exports change).

## Success

- Foundation boundary model matches Pen (`border.subtle` < `border.strong`,
  `divider` quieter than `border.subtle`; `border.strong` ≥ 3:1 on its background).
- A landing screen renders from tokens/components in light and dark.
- `mise run check` is green; no generated files edited by hand.

## Artifacts

- `plan.md` — task list.
- `history.md` — chronology.
- `notes/` — evidence, when needed.
