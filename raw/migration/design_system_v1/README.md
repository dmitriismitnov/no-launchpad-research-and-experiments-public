# Design System v1: Visual Projection Prototype

Этот prototype фиксирует только visual API. В нём нет behavior states, событий, state machines, ARIA или runtime implementation.

## Состав

- `manifest.json` -- доступные global visual axes и порядок разрешения rules.
- `vocabulary/static.json` -- неизменяемые visual constants.
- `components/button.json` -- component-scoped проекция Button.

## Правила

- Component описывает свою anatomy и visual rules локально.
- Application выбирает значение `theme`; компонент сам содержит branches для `light` и `dark`.
- `tone` и `size` -- public variants Button. Их rules merge-ятся с base rules.
- `_hover` и `_focusVisible` -- platform visual conditions, не behavior states.
- Условный block уточняет внешний block. Приоритет разрешается в порядке из manifest.
- Значения vocabulary записываются как `{static.path.to.value}`.
- `static` содержит только неизменяемые constants. Dynamic vocabulary, motion, contrast, density и component-family layers намеренно исключены.

## Button API

```text
tone: primary | secondary (default: primary)
size: sm | md (default: md)
theme: light | dark
```

Anatomy: `root`, `prefixIcon`, `label`, `suffixIcon`.
