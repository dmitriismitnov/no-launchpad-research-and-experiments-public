---
confidence: high
last_verified: 2026-09-21
sources:
  - raw/migration/README.md
  - raw/migration/design_system_v1_panda/README.md
---

# Panda Rules

Правила visual-слоя на [[panda-css]]. Recipe должен соответствовать им до code review и visual testing.

1. Один visual component — один `defineRecipe` (single-part anatomy) либо один `defineSlotRecipe` (multipart).
2. Slots recipe точно соответствуют declared anatomy.
3. Только longhand CSS properties: `backgroundColor`, `paddingInline`, `outlineWidth`. Shorthands (`bg`, `px`, `py`, `w`, `h`) запрещены.
4. Base rules описывают общее устройство part; public differences — в `variants`.
5. Environment context и platform conditions не становятся public variants.
6. Condition, меняющий одно property, вложен в это property: `backgroundColor._light._hover`. Condition blocks на уровне style block не используются.
7. Порядок nested conditions: `theme -> hover -> focusVisible`; глубже — уточнение внешнего.
8. Только static tokens. Никаких component-family layers, `extends` и общих component overrides.
9. `compoundVariants` допустимы только для реального пересечения public variants, не выразимого независимым merge.

## Решаемые проблемы

- Visual решение не размазано между theme files и общими группами компонентов.
- Global theme не передаётся в props и не создаёт отдельные overrides.
- Каждое CSS property находится вместе со всеми условиями, которые его меняют.
- Panda — compiler и implementation layer, а не источник скрытой component architecture.

## Связанное

- [[component-projection]], [[component-axes-model]], [[button]]
