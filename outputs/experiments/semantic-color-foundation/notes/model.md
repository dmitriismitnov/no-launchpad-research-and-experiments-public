# Semantic Color Model

Полный контракт имён и ownership для эксперимента. Это вывод, а не изменение
постоянных правил `wiki/`.

## Три уровня

`theme.tokens.colors` (primitive) и `theme.semanticTokens.colors` (semantic)
разделены.

1. `colors.palette.*` — primitive opaque colors (`palette.ts`).
2. `opacity.*` — technical scale (`opacity.ts`); не semantic.
3. `colors.semantic.*` — theme-aware semantic tokens (`semantic.ts`).

Плюс `themeConditions` (`_light` / `_dark`) в `colors.ts`; другие группы
используют их, но не объявляют.

## Primitive palette

- Путь: `colors.palette.<family>.<step>`.
- Family names — только цвет: `neutral`, `blue`, `green`, `red`, `sky`,
  `cyan`.
- Steps — `50…950`; `.500` — pivot family.
- Значение — один opaque цвет, без темы.
- Прямое применение palette допустимо в компоненте.

## Opacity

- Путь: `opacity.<percent>`.
- Значения: `0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100`.
- Не semantic token; техническая шкала для specialized domains и компонентов.

## Semantic context groups

- Путь: `colors.semantic.<group>.<step>.<projection>`.
- Groups: `common`, `occasional`, `rare`, `brand`, `positive`, `negative`.
- Steps: `50…950`.
- Projections: `background`, `text`, `icon`, `border`, `divider`.
- Контракт полный: каждый group содержит `11 × 5` токенов.
- Каждый токен имеет theme branches (`_light` / `_dark`) и ссылается на
  `colors.palette.*`.
- Один step — canonical согласованный набор; смешивание steps разрешено.
- `50…950` — property-independent шкала вариаций.
- Имя группы означает ожидаемую частоту применения; не hue, не иерархию:
  `common` — самый частый neutral-контекст, `occasional` — периодический,
  `rare` — исключительный. Это осознанно не акцентные роли Material 3.
- `text` и `icon` остаются разными projection: оба контрастируют с
  `background`, но `text` держит AA (`4.5:1`), а `icon` допускает `3:1`.
- `divider` — всегда тише `border` в том же canonical context
  (`contrast(divider, background) < contrast(border, background)`) и не имеет
  WCAG-порога: это разделение layout-областей, а не контент и не граница
  интерактивного элемента.

## Specialized semantic domains

- Часть модели: `overlay`, `shadow`, `data`, `decoration`.
- Форма API собственная, theme-aware, не обязана быть прямоугольной.
- В этой итерации реализуется только `colors.semantic.shadow.*`
  (technical scale, есть потребитель).
- `overlay`, `data`, `decoration` наполняются только с реальным потребителем.

## Ownership

- `settings` — только `preflight` и `globalCss`.
- `foundation` — palette, opacity, semantic tokens, system conditions.
- Component preset — только recipe своего компонента; может брать semantic,
  palette, literal или `color-mix()`.
- Компонент не создаёт новую общесистемную семантику без второго потребителя.
- Корневой `panda.config.ts` — только техническая интеграция.

## Применение

- Semantic — рекомендованный путь, но не обязательный.
- Отклонение от семантики не требует отдельной документации; достаточно
  ревью и корректной реализации дизайна.
