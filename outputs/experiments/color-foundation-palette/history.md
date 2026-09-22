# History: Color Foundation Palette

## 2026-09-22 - Старт эксперимента

- Сформулированы вопрос, scope и success criteria.
- Ресёрч текущих значений: `colors.ts` (9 ролей), `effects/shadows.ts` (8 теней),
  `raw/migration/design_system_v1/vocabulary/static.json`.
- Решение: сохранить статическую модель ролей (`*.light` / `*.dark`), ввести
  `staticPalette` и перевести роли на ссылки к ней без смены дизайна.
- Следующий шаг: спроектировать шкалы от текущих anchor-значений.

## 2026-09-22 - Проектирование палитры

- Все текущие значения ролей разложены по шкале `50…950` и закреплены на точных
  шагах; свободные шаги интерполированы в OKLCH с монотонной светлотой.
- `neutral` (11 значений ролей = 11 шагов): 50 `#FFFFFF`, 100 `#F7F8FA`,
  200 `#F3F5F8`, 300 `#EDEFF2`, 400 `#A8B0BB`, 500 `#666666`, 600 `#4A5462`,
  700 `#212831`, 800 `#1A1A1A`, 900 `#151A22`, 950 `#0D1016`.
- `brand`: 400 `#5AB0EA`, 500 `#4A9FD8`, 700 `#1E6BB8`, 800 `#1B5FA8` как anchors.
- `danger`: 300 `#F87171`, 700 `#C0392B` как anchors.
- Следующий шаг: реализовать `staticPalette`, роли и Panda-проекцию.

## 2026-09-22 - Реализация foundation

- Добавлены `foundation/colors/palette.ts` (`staticPalette`), `colors.ts`
  (`themeConditions`, `roles`) и `index.ts`; старый `foundation/colors.ts` удалён.
- Роли структурированы: `surface.base`, `surface.raised`, `ink.strong`,
  `ink.soft`, `line.strong`, `line.soft`, `accent.base`, `accent.deep`,
  `status.danger`; значения — ссылки на `staticPalette`.
- `foundation/preset.ts` собирает `tokens.colors` из палитры, ролей и теней и
  ограничивает `colorPalette` тремя семействами.
- Panda резолвит `{colors.*}`-ссылки в static tokens:
  `--colors-surface-base-light: var(--colors-neutral-50)`.
- Обнаружена коллизия: группа ролей `danger` затеняла семейство `danger`
  (`Missing token: colors.danger.700`); роль переименована в `status.danger`.
- Button, `global-css.ts`, `App.tsx`, stories переведены на новые роли.
- `foundation.test.ts` расширен: полнота шкал, hex-значения, источник ролей,
  сохранение текущих визуальных значений.
- Storybook: `Foundation/Colors` (шкалы, роли, native `colorPalette`).
- `mise run gen` компилирует палитру, роли и определения `colorPalette`.

## 2026-09-22 - Проверки

- `mise run check`, `check:deps`, `build`, `storybook:build` — проходят.
- Browser tests: 7 тестов (5 Button + 2 Colors).
- Playwright visual baseline прошёл без обновления — дизайн landing не изменился.

## 2026-09-22 - Границы эксперимента

- Интеграция с PEN/дизайн-программой исключена из scope: задача слишком
  обширная и вынесена в отдельный исследовательский трек.
- Черновые PEN-артефакты перенесены в
  `outputs/shared/pen-design-system-integration/`; смотри
  `../../shared/notes/pen-design-system-integration.md`.
- Неподтверждённые записи о PEN-миграции удалены из истории и results.

## 2026-09-22 - Статус

- Эксперимент остаётся активным: выводы ещё не сделаны.
- Черновики материалов: `notes/palette-rules.md` (правила), `notes/results.md`
  (наблюдения и ограничения).

## 2026-09-22 - Panda `defineTokens`

- Каждый foundation-фрагмент обёрнут в `defineTokens.<category>`: `palette.ts`,
  `colors.ts`, `shadows.ts`, `spacing.ts`, `sizes.ts`, `radii.ts`,
  `border-widths.ts`, `font-sizes.ts`, `font-weights.ts`, `fonts.ts`.
- Aggregate в `foundation/preset.ts` также обёрнут в `defineTokens`.
- Типы, `gen`, `check`, `check:deps` и browser tests проходят; сгенерированный
  CSS не изменился (role vars по-прежнему ссылаются на palette vars).
- Синхронизирован `.agents/project.md`: `foundation/colors/` вместо `colors.ts`.

## 2026-09-22 - Имена border widths

- `borderWidths` переименованы из scale-индексов в понятные толщины:
  `none` (0), `thin` (1px), `thick` (2px).
- Button preset и `Colors.stories.tsx` переведены на новые имена; значения
  не изменились.
- `gen`, `check`, `check:deps` проходят; сгенерированный CSS сохраняет те же
  значения (`--border-widths-thin: 1px`, `--border-widths-thick: 2px`).

## 2026-09-22 - Component-oriented foundation names

- `radii`: `control`/`surface` → нейтральная шкала `sm` (6px) / `md` (10px);
  имена больше не привязаны к применению.
- `fontSizes`: компонентное `button` (15px) убрано из foundation; Button владеет
  размером label как локальной константой `LABEL_FONT_SIZE`.
- В foundation остаётся только `heading` (1.5rem) как переиспользуемая роль.
- `gen`, `check`, `check:deps` проходят; сгенерированный CSS: `--radii-sm`,
  `--radii-md`, `--font-sizes-heading`, label Button — `0.9375rem`.

## 2026-09-22 - Закрытие

- Все критерии успеха выполнены; выводы сведены в `notes/results.md`.
- Итог: `staticPalette` + `roles` работают в PandaCSS без semantic tokens,
  дизайн не изменился, foundation-имена очищены от компонентной привязки.
- Число ролей не сокращено — осознанное ограничение сохранения дизайна.
- PEN-интеграция, нормализация `neutral`, elevation и проверка на
  multipart-компоненте переданы за пределы эксперимента.
- Статус в `README.md` — completed.
