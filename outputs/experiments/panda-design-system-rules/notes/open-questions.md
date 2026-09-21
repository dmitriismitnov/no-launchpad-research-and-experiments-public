# Open Questions

Развилки, которые не решаются внутри `panda-design-system-rules`. Они
зафиксированы с контекстом, вариантами и текущим решением, чтобы стать основой
будущих экспериментов.

## Статус

| # | Вопрос | Решение в этой итерации |
| --- | --- | --- |
| 1 | Semantic tokens vs статические пары `*.light` / `*.dark` | Оставить текущую модель |
| 2 | breakpoints / keyframes / textStyles при исключённом `preset-panda` | Отложено, вне целей |
| 3 | Семантическое представление elevation вместо `shadow1..8` | Оставить как есть |

---

## 1. Semantic tokens vs статические пары `*.light` / `*.dark`

**Контекст.** `foundation/colors.ts` объявляет каждую роль двумя статическими
токенами (`surface.light`, `surface.dark`), а рецепт ветвит по property:
`backgroundColor: { _light: "surface.light", _dark: "surface.dark" }`.
Panda поддерживает semantic tokens, где значение само меняется по condition:
`surface: { value: { base: "#FFFFFF", _dark: "#0D1016" } }`, а рецепт пишет
`backgroundColor: "surface"`.

**Сравнение.**

| Аспект | Статические пары + conditions | Semantic tokens |
| --- | --- | --- |
| Токенов на роль | 2 | 1 |
| Переключение темы | в каждом рецепте | в foundation |
| Читаемость веток | явно на месте использования | скрыто в токене |
| Риск забыть ветку | есть | почти нет |
| Дублирование | растёт с компонентами | минимальное |
| Соответствие правилам | прямое | требует пересмотра «только static tokens» |
| Вложенность hover+theme | `backgroundColor._light._hover` | `_hover: "accent"` |
| Выход CSS | `--colors-surface-light/dark` | `--colors-surface` |

**Последствия для правил.** Переход на semantic tokens переписывает правило 6
(property-local conditions) и порядок `theme -> hover -> focusVisible`: ось
`theme` уходит из рецептов в слой токенов. Также возникает вопрос двух слоёв —
primitive palette + semantic роли — вместо текущего одного.

**Текущее решение.** Оставить статическую модель. Она доказана на реальном
интерфейсе в этой итерации и соответствует действующим правилам. Смешивать обе
модели нельзя.

**Кандидат в будущий эксперимент.** Перевести один компонент на semantic tokens,
сравнить CSS, объём рецепта и переключение `data-theme`; проверить, резолвится
ли `_dark` через `[data-theme="dark"] &`, и нужен ли primitive-слой.

---

## 2. breakpoints / keyframes / textStyles при исключённом `preset-panda`

**Контекст.** Когда указан `presets`, Panda не добавляет
`@pandacss/preset-panda`, но добавляет `@pandacss/preset-base` (conditions,
utilities, patterns, globalCss). Вместе с `preset-panda` исчезают:
`breakpoints`, `keyframes`/`animations`, `textStyles`, `lineHeights`,
`letterSpacings`, ключевые слова `sizes` (`full`, `fit`, `min`, `max`),
`aspectRatios`, `borders`, `containerSizes`, `largeSizes`, палитра цветов и
числовая шкала `spacing`.

Часть исчезает намеренно: foundation — единственный владелец токенов, числовая
шкала не должна давать `padding: "4"`.

**Проблема.** Часть шкал (responsive, layout-ключевые слова, типографика)
исчезла «молча». Сейчас Button их не использует, но лендинг без responsive не
соберётся.

**Варианты.**

- **a. Добавлять шкалы в foundation по мере необходимости.** Согласуется с
  единственным владением. Приоритетный вариант.
- **b. Вернуть `preset-panda`.** Вернёт палитру, числовой spacing и recipes по
  умолчанию — нарушает единственное владение. Отклонён.
- **c. `eject: true`.** Потеряем conditions/utilities/patterns из
  `preset-base`. Не нужен.

**Текущее решение.** Не делаем. Выходит за пределы эксперимента. Когда понадобится
responsive: `foundation/layout/breakpoints.ts` и ключевые слова в `sizes`;
до первой типографской вёрстки — `lineHeights`/`letterSpacings` в
`foundation/typography`; motion — позже в `foundation/motion`.

**Кандидат в будущий эксперимент.** Responsive-слой лендинга: где живут
breakpoints и как foundation поглощает нужные ключевые слова без возврата
`preset-panda`.

---

## 3. Семантическое представление elevation вместо `shadow1..8`

**Контекст.** `effects/shadows.ts` хранит цвета теней по темам
(`shadow3.light`, `shadow3.dark`), а геометрия (`"0 2px 8px ..."`) зашита в
рецепте Button.

**Проблема.**

- Токен — это цвет, а не elevation; уровень поверхности размазан между
  foundation и компонентом.
- `shadow1..8` — недифференцированная шкала без смысла уровня.
- Несколько компонентов с одинаковой тенью копируют геометрию и обе ветки темы.
- В тёмных темах обычно меняется и геометрия, а не только цвет.

**Варианты.**

- **a. Оставить как есть** до появления 2–3 компонентов с одинаковой тенью.
- **b. Semantic elevation в foundation:**
  `elevation1: { value: { base: "0 1px 2px {colors.shadow1.light}", _dark: "0 1px 2px {colors.shadow1.dark}" } }`;
  рецепт пишет `boxShadow: "elevation1"`.
- **c. Композитные elevation-токены + property-local conditions**
  (`shadows.elevation1.light`/`.dark`): централизует значения, но разворачивает
  условия в каждом компоненте.

Чистый вариант (b) доступен только на semantic tokens (см. вопрос 1). Пока
модель статическая, доступен вариант (c).

**Текущее решение.** Оставить как есть. Геометрия временно component-owned.
Повысить до elevation-шкалы, когда одна тень повторится в нескольких
компонентах, тогда же ввести уровни `elevation1..N` и переименовать `shadow1..8`
в примитивную палитру.

**Кандидат в будущий эксперимент.** Elevation как системная шкала: уровни,
связь с theme, primitive palette под semantic-именами.

---

## Связь вопросов

Все три упираются в один узел: **остаёмся ли на статических токенах с
property-local conditions или переходим на semantic tokens**. От этого зависят
theme-ветки, elevation, breakpoints-стратегия и часть правил (6, 7,
`resolutionOrder`). Решение этой итерации — не менять модель.
