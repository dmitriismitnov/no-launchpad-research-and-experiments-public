# Experiment: Design system → code port

**Status:** active (2026-10-02).

## Question

Can the Pen design system be ported into the PandaCSS/React codebase so the code
becomes the source of truth, verified by a real landing screen?

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
