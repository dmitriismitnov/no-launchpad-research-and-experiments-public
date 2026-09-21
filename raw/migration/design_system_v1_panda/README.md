# Design System v1: Panda CSS Rules

## Система

Design system состоит из application manifest, static vocabulary и component-scoped projections. Manifest активирует global context; в v1 это только `theme=light|dark`. Static vocabulary хранит неизменяемые constants: palette, spacing, dimensions, radii и typography values.

Каждый компонент сам описывает anatomy и visual rules в одном Panda recipe. Для Button это `root`, `prefixIcon`, `label` и `suffixIcon`; `tone` и `size` -- его public variants. Theme приходит с application root через `data-theme`, но light/dark rules находятся внутри recipe Button.

Это visual-only слой. Behavior, runtime states, contrast, density и motion пока исключены. Dynamic vocabulary появится только для редких application-wide policies, а не для component families.

## Решаемые проблемы

- Visual решение компонента не распределяется между theme files и общими группами компонентов: anatomy, variants и theme branches читаются рядом.
- Global theme не передаётся в props каждого компонента и не создаёт отдельные Button overrides.
- Каждый CSS property можно найти и проверить вместе со всеми условиями, которые его меняют.
- Panda остаётся compiler и implementation layer, а не источником скрытой component architecture.

## Правила Panda Recipes

- Один визуальный компонент -- один `defineRecipe` для single-part anatomy или один `defineSlotRecipe` для multipart anatomy.
- Slots recipe должны в точности соответствовать declared anatomy компонента.
- Использовать только longhand CSS property names: `backgroundColor`, `paddingInline`, `outlineWidth`. Shorthands (`bg`, `px`, `py`, `w`, `h`) запрещены.
- Base rules описывают общее устройство part; public differences живут в `variants`.
- `tone` и `size` -- variants. Не превращать environment context или platform conditions в variants.
- Если condition меняет один property, он вложен в этот property: `backgroundColor._light._hover`. Condition blocks на уровне style block не используются.
- Порядок nested conditions: `theme -> hover -> focusVisible`. Более глубокое condition уточняет внешнее.
- Использовать static tokens. Не создавать component-family layers, `extends` или общие component overrides.
- `compoundVariants` допустимы только для реального пересечения public variants, которое нельзя выразить их независимым merge.

Этот документ является основой для development skill: recipe должен соответствовать этим правилам до code review и visual testing.
