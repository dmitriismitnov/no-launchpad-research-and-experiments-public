# Design System Migration Package

## Назначение

Этот каталог переносится в следующий проект как результат первой итерации. Он самодостаточен: содержит действующие решения, Panda rules, примеры данных и PEN-макет. Он не требует `wiki/` и не включает исторические исследования, которые были вынесены в `../archive/`.

## Решение

Не строить полную platform-agnostic implementation до проверки на реальном интерфейсе. Первая практическая версия использует Panda CSS как visual implementation layer и сохраняет следующие границы:

- application root активирует system context, сейчас только `data-theme="light|dark"`;
- static vocabulary содержит неизменяемые values: palette, spacing, dimensions, radii, typography и shadow colors;
- компонент сам локально описывает anatomy, public variants и все visual rules;
- отдельные theme files, component-family overrides, `extends` и скрытая inheritance не используются;
- behavior, runtime state machine, motion и density не входят в v1.

## Модель компонента

Компонент состоит из четырёх разных категорий configuration.

| Категория              | Кто активирует                 | Примеры                              | Правило                                                          |
| ---------------------- | ------------------------------ | ------------------------------------ | ---------------------------------------------------------------- |
| Component variants     | designer или consumer          | `visual`, `size`                     | Публичный API; независимые rules merge-ятся.                     |
| System contexts        | application, user, environment | `theme`, позднее `density`           | Не передаются в props; уточняют локальные component properties.  |
| Behavior states        | runtime или business logic     | `disabled`, `loading`, `invalid`     | Имеют behavior contract; могут перекрывать interactive response. |
| Interaction conditions | платформа                      | `_hover`, `_focusVisible`, `_active` | Уточняют только свойства, которым нужен visual response.         |

Для `visual(primary|secondary)` и `size(sm|md|lg)` потенциально есть `2 × 3 = 6` базовых комбинаций. System contexts расширяют пространство анализа, но код не должен материализовать полный декартов продукт. Rule добавляется только для реального пересечения; иначе независимые branches merge-ятся.

`disabled` не считается ещё одной полностью независимой осью: обычно он подавляет hover/focus response и задаёт согласованный override. Эта гипотеза должна быть проверена на реализации компонентов во второй итерации.

Подробнее: [Component Axes Model](component-axes-model.md) и [Component Axes Graph](component-axes-graph.md).

## Panda Rules

1. Один visual component использует один `defineRecipe` для single-part anatomy либо один `defineSlotRecipe` для multipart anatomy.
2. Slots recipe в точности соответствует declared anatomy.
3. Используются только longhand CSS properties: `backgroundColor`, `paddingInline`, `outlineWidth`. Shorthands `bg`, `px`, `py`, `w`, `h` запрещены.
4. Base rules описывают общую структуру part. Public differences находятся в `variants`.
5. Environment context и platform conditions не становятся public variants.
6. Condition, меняющий одно свойство, вложен в это свойство. Например: `backgroundColor._light._hover`.
7. Рабочий порядок условий: `theme -> hover -> focusVisible`.
8. Используются только static tokens. Не создавать common component overrides или component-family layers.
9. `compoundVariants` допустимы только для пересечения public variants, которое нельзя представить независимым merge.

Полный набор правил и минимальный Button example: [design_system_v1_panda](design_system_v1_panda/README.md). PEN-derived вариант с четырьмя Button tones: [design_system_v1_panda_pen_example](design_system_v1_panda_pen_example/README.md).

## Proof Of Concept

`design_system_v1_panda_pen_example/` содержит visual-only пример, извлечённый из `design_raw.pen`:

- статические light/dark tokens;
- Button anatomy: `root`, `prefixIcon`, `label`, `suffixIcon`;
- tones: `primary`, `secondary`, `ghost`, `icon`;
- sizes: `sm`, `md`;
- property-local theme, hover и focus-visible branches;
- React API как иллюстрация composition, без package setup и generated Panda output.

Размер icon nodes остаётся caller-owned: для этого примера он должен быть 16px.

## Следующая Итерация

Одна задача: перенести существующий статичный landing page в рабочий codebase без интерактивности, пользуясь этими rules и реальным boilerplate.

Проверить по ходу работы:

- достаточно ли component-scoped architecture для реальной страницы;
- какие Panda rules стабильны, а какие требуют корректировки;
- какие комбинации axes действительно нужны;
- какие behavior/state edge cases должны быть решены сейчас, а какие записаны как отложенные вопросы;
- как фиксировать code-linked decisions рядом с тестами и implementation, не теряя выводы brainstorming.

Не строить дальний roadmap. Каждая новая проблема оценивается локально: blocker текущей страницы решается сейчас; observation без текущей стоимости фиксируется и переносится на следующий шаг.

## Состав

- `design_system_v1/` — ранний agnostic data example: manifest, static vocabulary и Button projection.
- `design_system_v1_panda/` — действующие Panda policies и Button recipe example.
- `design_system_v1_panda_pen_example/` — PEN-макет и Panda-проекция его tokens и Button family.
- `component-projection-crystallization.md` — краткая архитектурная формулировка component-scoped projection.
- `component-axes-model.md` — термины и правила пересечения осей.
- `component-axes-graph.md` — Mermaid-граф модели.
- `iteration-1-retrospective.md` — завершение первой итерации и рамка следующей.

## Исключено

- runtime state machines и interaction behavior;
- accessibility implementation;
- motion и density policies;
- design tokens compiler, dependencies, generated Panda output и package setup;
- исторические эксперименты и преждевременные agnostic schemas: они находятся в `../archive/` и не являются инструкцией для следующего проекта.
