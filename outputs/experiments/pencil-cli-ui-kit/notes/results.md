# Pre-review audit: Pencil CLI UI Kit

**Status:** ready for human review (2026-10-06).

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

## HUMAN REVIEW

- Open `artifacts/pencil-cli-ui-kit.pen` in GUI and assess visual hierarchy,
  typography, spacing and the compositional quality of Projects overview.
- Decide whether the Lucide placeholder in ButtonIcon is visually acceptable
  for this clean-document experiment or whether an explicit project-icon import
  gate is desired.
- Review the Foundation and Projects overview under the new semantic theme
  projection; mechanical verification does not replace visual approval.
