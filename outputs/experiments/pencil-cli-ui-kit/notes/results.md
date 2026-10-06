# Results: Pencil CLI UI Kit

**Status:** closed (2026-10-06, direct user instruction).

## PASS

- Headless `pen interactive --out` created, reopened and owned the target
  without Pencil GUI.
- Foundation, Button, ButtonIcon and Card are reusable/master-backed artifacts
  with theme-aware Foundation variable references.
- `Projects overview` composes all three masters as `ref` instances.
- Final active-document scan found the three masters: `Button` (`z6FBhy`),
  `ButtonIcon` (`ngKcI`) and `Card` (`COzjp`).
- Target/root readback reports no `ctx.problems` clipping or collapsed layout
  rows for the Card or Projects overview section.
- Foundation variables now follow the project’s primitive → semantic → component
  logic, including theme-aware semantic aliases and scale/typography namespaces;
  details: `notes/evidence/token-architecture.md`.

## INFO

- The direct prompt-agent CLI route was attempted with Codex and two DeepSeek
  IDs; see `notes/cli-discovery.md`. Headless CLI is the verified workable path.
- The clean document has no imported project icon library. ButtonIcon uses the
  Pen-built-in Lucide `plus` asset; it does not modify the repository icon set.
- `Card` screenshot evidence includes a targeted correction of an initial
  layout finding; the final check passes.
- A token migration initially materialized removed aliases as literal values;
  the final targeted audit found no literal visual tokens or legacy aliases.
- Deleting a theme axis deletes its dependent variables: after the external
  removal of the `typography` axis, all 47 text nodes were materialized to
  `fontSize: 0` / empty weight. Recovered from the committed HEAD artifact and
  verified clean.
- `palette`, `typography`, `spacing`, `shape` and `effects` axes now exist with
  a single value each; only `mode` (`light`/`dark`) carries real variation.

## HUMAN REVIEW (resolved)

- The user completed the visual review and closed the experiment on
  2026-10-06: "Эксперимент можно заканчивать."

## Closing assessment

- **Planned vs done:** the approved spec (CLI-only creation, both CLI routes,
  Foundation + Button/ButtonIcon/Card, showcase evidence, Gate A–D) is
  complete. Two user-authorized extensions were added mid-run: the layered
  token architecture and the theme-axis decomposition.
- **Not done / deferred:** the direct `pen --out --agent` route never produced
  an output inside the harness limit, and the CLI does not expose the requested
  DeepSeek IDs. The Lucide placeholder icon and full palette parity remain
  deliberate NON-goals.
- **Scope:** the experiment stayed inside its boundaries; the two extensions
  were explicit user requests, not unilateral drift.
- **Pen capability verdict:** workable headless as a platform, strongest when
  combined with its own guides; deterministic `execute` operations are real but
  not exposed as a stable standalone API.
- **Process verdict:** evidence-first durable state worked; the notable process
  risk is that external GUI edits can silently drop axis-linked variables,
  which the final audit caught and repaired.
