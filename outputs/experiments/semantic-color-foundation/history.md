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

## 2026-09-23 - Снимок состояния

- Добавлена `notes/state.md`: текущие решения, состояние реализации, проверки,
  пробелы модели и открытые вопросы.
- Закоммичено: `609d4ca` (feat styles), `8eec671` (docs outputs).

## 2026-09-23 - Дизайн-ревью по Material Design 3

- Разобрана токен-модель MD3 (ref/system tokens, `on-*`/`container`, tonal
  palettes, state layers) и сопоставлена с текущей моделью.
- Решения:
  - `primary`/`secondary`/`tertiary` переосмыслены как частота применения и
    переименованы в `common`/`occasional`/`rare`; цветовой маппинг не изменился;
  - добавлена пятая проекция `divider` для всех групп; она всегда тише
    `border` в том же canonical context и не имеет WCAG-порога;
  - `text` и `icon` остаются разными проекциями (AA vs `3:1`).
- Рассмотрено и отложено: state layers (hover/focus/pressed/dragged),
  `surface`-домен, `inverse`/`scrim`, узкий small API. Причины — в
  `notes/state.md`.
- Foundation-тест получил проверку `6 × 11 × 5` и инвариант `divider < border`;
  Foundation Colors Story показывает `divider` и его ratio.

## 2026-09-23 - Button parity с PEN

> Уточнено 2026-09-24: формулировка «parity» и «полная state matrix» ниже
> не подтверждены текущим `assets/design_raw.pen` (там только Primary states).
> См. запись «Уточнение границ: код как source of truth».

- PEN Button board (`01 · Действия`) доведён до canonical: отдельные spec
  cards Primary/Secondary/Ghost/Icon, полная state matrix `4 × 5 × 2`;
  Secondary унифицирована, Ghost получил card.
- Приняты решения: policy B (surface-feedback) для Secondary/Ghost/Icon;
  opacity-модель для Primary; `shadow/700` для Primary/Secondary/Ghost;
  Icon без shadow; общий focus ring `blue/500` outer `outlineOffset: 0`.
- Реализована parity в `src/shared/components/button/preset.ts`:
  Primary fill `common/50.text`, Ghost border `common/200.divider`,
  hover/active ограничены `_enabled`, disabled `opacity 0.45`,
  `cursor: not-allowed`.
- Panda extraction: `secondary`/`ghost` не попадали в CSS из-за `tones.map`;
  добавлен `staticCss` в `panda.config.ts`, теперь генерируются все tone/size.
- `size="sm"` сохранён как code-only extension.
- Тесты recipe расширены (contract + `_disabled`/`_enabled`), Storybook
  получил `LightStateMatrix`/`DarkStateMatrix`.
- Проверки: unit 18, browser 7, types, gen — зелёные.

## 2026-09-24 - Уточнение границ: код как source of truth

- Пересмотрены формулировки после аудита: основной результат эксперимента —
  код foundation и его тесты; PEN-артефакты — подтверждение выразимости
  (feasibility), а не двусторонняя синхронизация.
- `assets/design_raw.pen` зафиксирован как versioned working copy; `raw/`
  остаётся immutable историческим входом.
- Убрано заявление о полной Button parity: PEN board содержит Primary states,
  но Secondary/Ghost/Icon states, Ghost spec card и live Secondary sample не
  доведены. Эти пункты вынесены в отдельный последующий эксперимент.
- Исправлены устаревшие факты в `notes/state.md` (unit 18, visual baseline
  обновлён после Button work).
- Полная PEN-интеграция и Button board synchronization — вне scope текущего
  эксперимента; здесь PEN лишь подтверждает, что модель выразима.

## 2026-09-24 - Закрытие эксперимента

- Статус: `completed`. Гипотеза подтверждена кодом и тестами.
- Зафиксирован урок процесса: побочная работа по адаптации PEN велась внутри
  эксперимента и размыла фокус. Правильно было поставить эксперимент на паузу
  и оформить отдельную проверку; две цели одновременно размывают процесс.
  Идея допустима, но процесс должен оставаться контролируемым.
- Полная PEN-интеграция продолжается отдельно:
  `outputs/shared/pen-design-system-integration/`.
- Следующий цикл (иконки, типографика, page background внутри шкалы, Input со
  сложным поведением, composite Card, список компонентов лендинга, общее
  ревью) вынесен в `outputs/shared/notes/landing-system-roadmap.md`.
- Артефакты эксперимента (код, заметки, `assets/*.pen`, visual baseline)
  зафиксированы в git.
