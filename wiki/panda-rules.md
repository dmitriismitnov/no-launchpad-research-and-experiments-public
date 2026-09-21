---
confidence: high
last_verified: 2026-09-22
sources:
  - raw/migration/README.md
  - raw/migration/design_system_v1_panda/README.md
  - outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md
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
8. Только static tokens. Никаких component-family layers, `extends` и общих component overrides. Единственное исключение — технический `conditions.extend` для объявления system conditions (см. ниже).
9. `compoundVariants` допустимы только для реального пересечения public variants, не выразимого независимым merge.
10. Preset ownership: `settings` владеет только `preflight` и `globalCss`; `foundation` — только tokens и system conditions; component preset — только recipe своего компонента. Зоны владения не пересекаются.
11. При явном `presets` Panda исключает `@pandacss/preset-panda` (tokens, breakpoints, keyframes, textStyles), но оставляет `@pandacss/preset-base` (conditions, utilities, patterns). Foundation остаётся единственным владельцем токенов.
12. Регулярная шкала: `spacing` и `sizes` — `xN = N * 0.125rem`. `xN` — индекс шкалы, не пиксели. `radii` — `rem`; `border-widths`, shadow offsets и blur — `px`.

## `conditions.extend`: пометка о смене решения

**Прежнее решение.** Правило 8 запрещало любые `extends` без исключений. Формулировка перенесена из migration-пакета и на реальном проекте не проверялась.

**Текущее решение.** `conditions.extend` разрешён, но только для объявления system conditions — например, переопределения `_light` / `_dark` на `[data-theme="..."]` вместо встроенных `.light` / `.dark` из `preset-base`.

**Почему принято взамен.** В Panda `conditions.extend` — объявление условия, а не component inheritance: он не даёт доступа к чужим tokens, recipes или styles и не создаёт component-family layers. Без него theme-условия нельзя привязать к `data-theme`. Проверено на Button: `mise run gen`, unit-тесты, Storybook browser tests и Playwright baseline проходят. Полный запрет остаётся для `extends` в recipes, component overrides и любой скрытой inheritance.

## Решаемые проблемы

- Visual решение не размазано между theme files и общими группами компонентов.
- Global theme не передаётся в props и не создаёт отдельные overrides.
- Каждое CSS property находится вместе со всеми условиями, которые его меняют.
- Panda — compiler и implementation layer, а не источник скрытой component architecture.

## Связанное

- [[component-projection]], [[component-axes-model]], [[button]]

## Источник crystallization

- [outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md](../outputs/experiments/panda-design-system-rules/crystallizations/foundation-and-preset-rules.md)
