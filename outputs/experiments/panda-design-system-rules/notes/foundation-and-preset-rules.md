# Foundation And Preset Rules

## Scope

Цель системы: имплементировать visual design system через PandaCSS.
Foundation хранит только консервативные переиспользуемые визуальные шкалы.
Settings хранит глобальные политики.
Каждый компонент полностью владеет своей visual projection.

## Panda Configuration

- Корневой `panda.config.ts` хранит только техническую интеграцию:
  `include`, `outdir`, `jsxFramework`, `importMap`, `presets`.
- Каждый preset имеет уникальное имя.
- Root config не содержит visual rules.
- Panda технически merge-ит presets, но наши presets не имеют пересекающихся зон владения.
- `conditions.extend` допустим только для объявления новых Panda conditions; это не component inheritance.

## Preset Ownership

- `settings` владеет только `preflight` и `globalCss`.
- `foundation` владеет только tokens и system conditions.
- Component preset владеет только recipe своего компонента.
- Компонент не модифицирует foundation или другой компонент.
- Запрещены component-family overrides, hidden inheritance и component-level `extends`.

## Foundation Boundary

Foundation не является набором базовых CSS-стилей.

Foundation не содержит:

- selectors;
- `globalCss`;
- recipes;
- component names;
- slot names;
- variants;
- CSS-property names как token names;
- behavior и interaction rules.

Foundation содержит только общие визуальные шкалы и identity-level values.

Допустимы:

- `brand`, `primary`;
- общесистемные роли без связи с конкретным component part, например `surface`, `ink`, `line`;
- количественные шкалы `x1`, `x2`, `x3`;
- общие time-scale имена `fast`, `standard`, `slow`.

Недопустимы:

- `backgroundColor`, `borderColor`, `padding`;
- `buttonBackground`, `cardSurface`, `inputBorder`;
- `buttonPrimary`, `ghostButton`;
- `hover`, `disabled`, `focus` как foundation token values.

## Foundation Structure

- `colors.ts`
- `layout/spacing.ts`
- `layout/sizes.ts`
- `shape/radii.ts`
- `shape/border-widths.ts`
- `effects/shadows.ts`
- `typography/fonts.ts`
- `typography/font-sizes.ts`
- `typography/font-weights.ts`

Каждый файл владеет одной независимой группой values.
`foundation/index.ts` собирает fragments.
`foundation/preset.ts` создаёт Panda preset.

## Axes

- `colors.ts` объявляет `_light` и `_dark`.
- Другие foundation groups могут использовать theme conditions, но не объявляют их повторно.
- `layout` сейчас не объявляет axes.
- Если появится density, `layout` будет владельцем `_compact` и `_comfortable`.
- Не создавать conditions для группы properties без доказанной системной необходимости.
- Theme variants не создаются автоматически для typography, radii или spacing.

## Units And Scales

- `spacing` и `sizes` используют регулярную шкалу с шагом `0.125rem`.
- Имена `xN` — индексы шкалы, не значения в пикселях.
- `x1 = 0.125rem`, `x2 = 0.25rem`.
- PEN values: `x5 = 0.625rem`, `x8 = 1rem`, `x11 = 1.375rem`,
  `x12 = 1.5rem`, `x16 = 2rem`, `x25 = 3.125rem`.
- `radii` предпочтительно используют `rem`.
- `border-widths` могут использовать `px`.
- Shadow offsets и blur могут использовать `px`.
- `settings/global-css.ts` не меняет root `font-size`.

## Component Rules

- Один visual component использует один `defineRecipe` для single-part anatomy
  или один `defineSlotRecipe` для multipart anatomy.
- Slots точно соответствуют declared anatomy.
- Используются только longhand CSS properties.
- Base rules описывают общую структуру part.
- Public differences находятся в `variants`.
- System contexts и platform conditions не становятся public variants.
- Conditions, меняющие одно property, вложены в это property.
- Nesting order: `theme -> hover -> focusVisible`.
- Используются только foundation tokens.
- `compoundVariants` допустимы только для доказанного пересечения public variants,
  не выражаемого независимым merge.

## Validation

- `mise run gen`
- `mise run check`
- `mise run check:deps`
- `mise run build`
- `mise run storybook:build`
- Storybook browser tests
- Playwright visual test для light и dark Button gallery
