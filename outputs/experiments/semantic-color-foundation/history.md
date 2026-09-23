# History: Semantic Color Foundation

## 2026-09-23 - Старт эксперимента

- Сформулированы вопрос, scope и success criteria.
- Изучены `wiki/`, предыдущий эксперимент
  [color-foundation-palette](../color-foundation-palette/README.md) и
  PEN-макет `raw/migration/design_system_v1_panda_pen_example/design_raw.pen`
  (только чтение, без опоры на имена его токенов).
- Принята модель: `colors.palette.*` + `colors.semantic.*`
  (6 context groups × `50…950` × 4 projections), technical `opacity`,
  specialized domains.
- Имена palette families — только по цвету; `brand`/`danger` уходят из
  primitive palette.
- Контраст: canonical same-step обязателен (`4.5:1` текст, `3:1` иконки и
  functional border), mixed-step — диагностика.
- PEN-макет вне scope; расхождения фиксируются в `notes/pen-mismatches.md`.
- Эксперимент закрывается только по прямой команде.
- Рабочая ветка: `experiment/semantic-color-foundation`.

## 2026-09-23 - Primitive palette и opacity

- Добавлен генератор `tools/generate-palette.ts`: регулярная OKLCH-шкала
  `50…950` от pivot `.500`; концы фиксированы, pivot сдвигает середину.
- Pivots: `blue #4A9FD8`, `green #1E9E63`, `red #C0392B`, `sky #7FB3E8`,
  `cyan #8FCBE8`, `neutral` — cool mid OKLCH(0.535 0.018 258).
- Крайние шаги `neutral` — истинные `#FFFFFF` / `#000000`, чтобы canonical
  пары достигали порогов контраста на средних светлотах.
- `opacity`: `0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100` (%).
- `palette.ts` теперь отдаёт `colors.palette.*`; `brand`/`danger` как
  primitive-имена удалены.

## 2026-09-23 - Semantic layer

- `semantic.ts` строит полную матрицу `6 групп × 11 шагов × 4 проекции`.
- Группы: `primary`/`secondary`/`tertiary` (neutral, сдвиг шага 0/1/2),
  `brand` (blue), `positive` (green), `negative` (red).
- Каждый токен сам переключает тему (`_light` / `_dark` внутри значения) и
  ссылается на `colors.palette.*`.
- `text`/`icon` выбирают ближайший neutral-экстремум; `border` — самый
  спокойный шаг family с контрастом ≥ 3.
- Specialized: `colors.semantic.shadow.100…800` (theme-aware, значения
  сохранены из старых `shadow1…8`). `overlay`/`data`/`decoration` в модели,
  но без токенов до потребителя.

## 2026-09-23 - Panda-проекция

- `foundation/preset.ts` разделяет `theme.tokens` (palette, opacity) и
  `theme.semanticTokens` (`colors.semantic.*`).
- `colorPalette.include: ["palette.*"]` — вложенные families дают
  `colors.color-palette.*`; проверено на генерации.
- Сгенерированный CSS: `--colors-semantic-*` с ветками
  `[data-theme="light|dark"]`; значения ссылаются на `--colors-palette-*`.
- Составной `boxShadow` требует полного пути `{colors.semantic.shadow.300}`.

## 2026-09-23 - Миграция потребителей

- Button переведён на semantic: `primary.900` + hover `brand.700`; secondary
  использует `transparent` + `primary.100.background`; ghost/icon —
  `primary.600.background` как мягкий ink; focus ring —
  `brand.500.background`.
- `App.tsx`, `global-css.ts`, `Button.stories.tsx` — на
  `semantic.primary.100.*`.
- Обнаруженные пробелы модели (смешивание шагов/прямой palette допустимы):
  - мягкий текст (`ink.soft`) не выражается projection `text`
    (там всегда near-black/white) — взят `.background` среднего шага;
  - сильная граница (`line`) не выражается projection `border`
    (там спокойный контраст ~3) — взят `.background` более тёмного шага;
  - `transparent` не входит в quartett — оставлен literal.

## 2026-09-23 - Рефакторинг semantic.ts

- Убрана вся расчётная логика (`contrastRatio`, поиск border, выбор foreground,
  `Object.fromEntries`, построение дерева).
- Файл — один литеральный объект `semanticColors`: `semantic.<group>.<step>.
  <projection>.value.{_light,_dark}` со ссылками `{colors.palette.*}`.
- Отдельный `semanticTree` удалён; тест и галерея читают `semanticColors`
  напрямую и резолвят ссылку в hex локально.
- Значения заморожены из предыдущего расчёта; сгенерированный CSS не изменился
  (тот же хеш), visual baseline не менялся.

## 2026-09-23 - Контраст-утилиты

- `contrast.ts` вынесен из `foundation/colors/` в `src/shared/utils/` как
  самостоятельный набор (`hexToRgb`, `relativeLuminance`, `contrastRatio`)
  с JSDoc и примерами; у foundation-слоя он больше не экспортируется.
- `src/shared/utils/index.ts` добавлен в entry-точки Knip.

## 2026-09-23 - Проверки

- `check`, `check:deps`, `build`, `storybook:build` — проходят.
- Browser tests: 7 тестов.
- Playwright visual: расхождение 16 px (0.01); baseline осознанно обновлён и
  повторный прогон зелёный.
- Canonical same-step: все пары проходят без исключений (см.
  `notes/contrast-exceptions.md`).
