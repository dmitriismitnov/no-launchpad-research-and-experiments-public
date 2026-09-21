---
confidence: high
last_verified: 2026-09-21
sources:
  - raw/migration/component-axes-model.md
  - raw/migration/component-axes-graph.md
---

# Component Axes Model

Четыре разные категории configuration, из которых складывается визуальное состояние компонента.

| Категория | Кто активирует | Примеры | Правило |
| --- | --- | --- | --- |
| Component variants | designer или consumer | `visual`, `size` | публичный API; независимые rules merge-ятся |
| System contexts | application, user, environment | `theme`, позже `density` | не передаются в props; уточняют локальные properties |
| Behavior states | runtime или business logic | `disabled`, `loading`, `invalid` | behavior contract; могут перекрывать interaction response |
| Interaction conditions | платформа | `_hover`, `_focusVisible`, `_active` | уточняют только свойства с visual response |

## Ортогональность и пересечения

Variants желательно делать ортогональными. При `m` группах и `nᵢ` значениях в группе число базовых комбинаций равно `∏ nᵢ`; например `visual(2) × size(3) = 6`. System contexts расширяют пространство анализа, но код не материализует полный декартов продукт: rule добавляется только для реального пересечения, иначе независимые ветки merge-ятся.

`theme` обычно влияет на visual properties, `density` — на sizing. `disabled` пока рассматривается не как полностью независимая ось, а как overriding state: подавляет hover/focus response и задаёт согласованный override. Гипотеза проверяется во второй итерации.

## Порядок вложенности

Рабочий порядок: `theme -> hover -> focusVisible`. Density и behavior states добавляются после проверки на реальных компонентах. Condition, меняющий одно свойство, вложен в это свойство; более глубокое condition уточняет внешнее и задаёт precedence.

Граф слоёв: [raw/migration/component-axes-graph.md](../raw/migration/component-axes-graph.md).

## Связанное

- [[component-projection]], [[panda-rules]], [[design-system-migration]]
