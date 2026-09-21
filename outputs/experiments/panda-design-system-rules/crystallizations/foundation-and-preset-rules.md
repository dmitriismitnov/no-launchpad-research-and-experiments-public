# Crystallization: Foundation And Preset Rules

Итоговая статья эксперимента
[panda-design-system-rules](../README.md). Кристаллизация проверенных правил
visual design system на [[panda-css]], готовая к переносу в wiki по отдельному
решению.

## Вопрос

Как имплементировать визуальную часть дизайн-системы через PandaCSS так, чтобы
компонент полностью владел своей visual projection, foundation оставался
консервативным набором переиспользуемых шкал, а правила были проверяемыми и
однозначными.

## Доказательная база

- `mise run gen`, `check`, `check:deps`, `build`, `storybook:build` проходят.
- Unit-тесты фиксируют правила рецепта и регулярность foundation-шкалы.
- Storybook browser tests: 5 stories — проходят.
- Playwright visual baseline фиксирует light/dark gallery.
- Модель проверена на Button: real interface, public variants, тема, hover и
  focusVisible.

## Подтверждённые правила

### Preset ownership

- `settings` владеет только `preflight` и `globalCss`.
- `foundation` владеет только tokens и system conditions.
- Component preset владеет только рецептом своего компонента.
- Компонент не модифицирует foundation или другой компонент.
- Запрещены component-family overrides, hidden inheritance и component-level
  `extends`.
- Корневой `panda.config.ts` хранит только техническую интеграцию.

### Исключение для `conditions.extend`

`conditions.extend` допустим только для объявления system conditions, например
переопределения `_light`/`_dark` на `[data-theme="..."]`. Это декларация
условия, а не component inheritance: единственное касание встроенного
namespace, без владения чужими зонами.

### Foundation boundary

Foundation содержит только общие визуальные шкалы и identity-level values.
Запрещены selectors, `globalCss`, recipes, component/slot/variant имена,
CSS-property-имена как token-имена, behavior и interaction rules.

### Units and scales

- `spacing` и `sizes` используют регулярную шкалу с шагом `0.125rem`.
- `xN` — индекс шкалы, не значение в пикселях: `x1 = 0.125rem`.
- `radii` — `rem`; `border-widths`, shadow offsets и blur — `px`.
- `settings/global-css.ts` не меняет root `font-size`.

### Theme model

- Static paired tokens `*.light` / `*.dark` плюс property-local
  `_light` / `_dark` в рецепте.
- Токен — статическое значение; переключение темы происходит на месте
  использования.
- Смешивать статическую модель и semantic tokens нельзя.

### Component rules

- Один `defineRecipe` для single-part anatomy, один `defineSlotRecipe` для
  multipart.
- Slots точно соответствуют declared anatomy.
- Только longhand CSS properties.
- Base rules описывают общую структуру part; public differences — в `variants`.
- Environment context и platform conditions не становятся public variants.
- Condition, меняющий одно property, вложен в это property.
- Nesting order: `theme -> hover -> focusVisible`.
- Только foundation tokens.
- `compoundVariants` допустимы только для пересечения public variants,
  не выражаемого независимым merge. На Button их три: `icon x sm`, `icon x md`,
  `secondary x md`.

### `preset-panda` exclusion

При явном `presets` Panda исключает `@pandacss/preset-panda` (tokens,
breakpoints, keyframes, textStyles), но оставляет `@pandacss/preset-base`
(conditions, utilities, patterns). Это делает foundation единственным
владельцем токенов. Плата — отсутствие breakpoints, keyframes и textStyles по
умолчанию.

## Границы применимости

- Rules подтверждены на одном single-part компоненте (Button). Multipart
  slot-anatomy и второй компонент не проверялись.
- Responsive отсутствует: breakpoints и layout-ключевые слова не введены.
- Motion, density и типографические шкалы не затрагивались.
- Поведение: визуальные состояния покрыты, runtime behavior и полный
  accessibility-контракт — нет.

## Отложенные развилки

Вынесены в [open-questions](../notes/open-questions.md) и упираются в один
узел — static tokens против semantic tokens:

- semantic tokens vs статические пары;
- breakpoints / keyframes / textStyles при исключённом `preset-panda`;
- семантическое представление elevation вместо `shadow1..8`.

## Результат

Гипотеза подтверждена для single-part visual component: архитектура из
изолированных presets компилируется, владение визуальной проекцией не
размывается, foundation остаётся консервативным, а правила проверяемы тестами.
Эксперимент закрыт как успешный proof of concept; распространение на multipart
и responsive — предмет будущих экспериментов.

## Связанное

- [foundation-and-preset-rules](../notes/foundation-and-preset-rules.md)
- [open-questions](../notes/open-questions.md)
- [history](../history.md)
