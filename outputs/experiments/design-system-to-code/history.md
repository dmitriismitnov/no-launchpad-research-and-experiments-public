# History: Design system → code port

## 2026-10-02 — experiment opened

- Closed the Pencil workflow experiment; porting the design system into code is
  the next step.
- Code already has foundation (palette, semantic, spacing, typography, shape,
  effects) and five components (`Button`, `ButtonIcon`, `Icon`, `Card`, `Input`).
- Known divergence: Pen uses `semantic/<group>/<step>/border/subtle` and
  `border/strong`; code has a single `border`. No component references the
  `border` projection, so aligning it is low risk to components.
- Scope: foundation token alignment + landing screen; behavior and dashboard
  deferred.
