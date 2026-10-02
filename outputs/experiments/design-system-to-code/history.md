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

## 2026-10-02 — решения по scope

- Пользователь выбрал: **Pen — полный источник цвета** и **все ~70 компонентов**.
- Проверено на практике: палитра Pen несовместима с текущей semantic-матрицей
  кода — при замене только палитры `bun test src/shared/styles/foundation` даёт
  53 contrast-провала и 22 нарушения `divider < border`. Значит палитру и
  семантическую матрицу переносим одним атомарным изменением.
- Изменение палитры откатано, дерево оставлено зелёным; перенос — следующий шаг.
