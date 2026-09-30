# Результаты

Состояние на 2026-09-30. Эксперимент **закрыт** (2026-09-30); пользовательское
ревью — следующий шаг.

## Что сделано

- **Asset-модуль.** `src/shared/fonts/` владеет raw-источниками, WOFF2,
  manifest, generated CSS (`@font-face`) и скриптами сборки. Класс — asset, а не
  компонент: React-адаптера у шрифта нет.
- **Контракт источника.** Канонический вход — два variable TTF Inter (normal,
  italic) и `OFL.txt`. Static-набор и исходный дистрибутив удалены; ничто из
  этого не осталось под `public/`.
- **Pipeline.** `variable TTF → WOFF2 + TS manifest + generated CSS`; каждый
  источник и результат парсится и валидируется на семью, стиль, наличие осей
  `opsz`/`wght` и диапазон `100 900`.
- **Manifest.** Типизированный `manifest.generated.ts` с `id`, `family`,
  `style`, `weightRange`, `axes`, `fileName`.
- **Задачи.** `fonts:build` и `fonts:check` — тонкие обёртки над
  `src/shared/fonts/tools/build.ts` (`--check` для проверки).
- **Навык.** `build-web-font` (`.opencode/skills/build-web-font/SKILL.md`) и
  документация задач в README, AGENTS, `.agents/tooling.md`,
  `.agents/workflows.md`.
- **Регистрация.** `font.generated.css` (generated) объявляет два `@font-face`
  одним семейством `Inter`, `font-display: swap`; подключён в `src/main.tsx` и
  `.storybook/preview.ts`. Handwritten CSS удалён — generated CSS сам является
  runtime-контрактом.
- **Типографическая foundation.** Атомарные шкалы `fonts`, `fontSizes`
  (`xs…xl`), `fontWeights` (`regular…bold`), `lineHeights` (`tight/normal/relaxed`),
  `letterSpacings` (`tight/normal/wide`). Geist заменён на Inter; `heading`
  больше не существует как токен.
- **Первая композиция.** `Button.label` собирает `fontFamily`/`fontSize`/
  `fontWeight`/`lineHeight`/`letterSpacing` из foundation; `Button.root` не
  содержит типографики. Локальная константа `LABEL_FONT_SIZE` удалена.
- **Specimen.** В `App.tsx` добавлен experiment-local Inter specimen (Latin +
  Cyrillic, веса 400/500/600, italic, шкала `xs…xl`) с
  `data-testid="inter-specimen"`.

## Измеренные размеры

| Файл | Размер |
| --- | --- |
| `Inter-VariableFont_opsz,wght.ttf` (raw, normal) | 874 708 B (~854 KiB) |
| `Inter-Italic-VariableFont_opsz,wght.ttf` (raw, italic) | 904 532 B (~883 KiB) |
| `inter-normal.woff2` | 349 436 B (~341 KiB) |
| `inter-italic.woff2` | 385 120 B (~376 KiB) |
| `font.generated.css` | 495 B |

WOFF2 меньше raw TTF примерно на 60 % (normal) и 57 % (italic). Суммарно
~717 KiB web-ассетов против ~1.7 MiB исходников. Subsetting не выполнялся —
это сознательное решение, не недоработка.

## Детерминированность

Две последовательные сборки без изменений источников дают идентичные sha256:

- `inter-normal.woff2` — `45ae7b9bf689d6add79a9ae38913ebc06bbc207f1d3eaa3ac4fa60d53f768f7c`
- `inter-italic.woff2` — `58c061410da49077f626cbd492e963b0c2d0d90e7d82116c8af2b8071d3d08c9`
- `manifest.generated.ts` — `cf03ebabda1c71697ba08476518d7102fc674e9e235ff3d1b553f825a0c7f510`
- `font.generated.css` — `ba87f869432b48fb4cdc9a4a2ee1f2272869e05189e6d2f5f828862e33e5f593`

Проверить все артефакты одной командой:

```bash
shasum -a 256 src/shared/fonts/assets/web/inter/*.woff2 \
    src/shared/fonts/manifest.generated.ts src/shared/fonts/font.generated.css
```

## Проверки (фактические результаты)

- `mise run fonts:build` — 2 faces; `mise run fonts:check` →
  `✓ web fonts up to date (2 faces)`.
- `mise run check` — 136 unit-тестов, 0 fail; browser/Storybook — 26 тестов,
  4 файла, 0 fail; lint, types, format — чисто.
- `mise run check:deps` — Knip без замечаний.
- `mise run build` — успешно. В `dist/assets/`:
  `inter-normal` 349.43 kB, `inter-italic` 385.12 kB,
  `icon` 4.32 kB (иконочный шрифт больше не инлайнится — набор перерос порог
  Vite 4 kB; ожидаемое поведение из эксперимента `icon-asset-component`).
- `mise run storybook:build` — успешно.
- `mise run test:visual` — зелёный. Baseline обновлён осознанно и проверен
  глазами: Inter рендерится, кириллица «Запуск» корректна, веса 400/500/600
  различимы, italic виден, шкала `xs…xl` читается.
- Production output: `.ttf`/`.otf` отсутствуют; ровно три WOFF2 (два Inter +
  иконочный шрифт).

## Покрытие глифов

Импортированный источник Inter заявляет `latn`, `cyrl`, `grek`
(по данным таблиц OpenType). Подтверждено визуально на кириллице; греческий
набор отдельно не проверялся.

## Решение по формату

**WOFF2 принят как конечный web-формат.** Исходником остаётся variable TTF:
именно он несёт оси и лицензию. Отдельный WOFF и устаревшие форматы не
добавлялись — целевые браузеры поддерживают WOFF2.

Subsetting **остаётся недоказанным и намеренно отсутствует**: покрытие
профилями (`latin`, `latin-cyrillic`, `all`) не проверялось, а автоматический
subset по текстам проекта рискованно вырезал бы будущий контент.

## Отклонения от исходного плана (осознанные)

- `ValidatedFontFace` получил `sourcePath`/`outputPath`: manifest нуждается в
  относительном имени файла, которого не было в исходном описании записи.
- Добавлены `@types/fontkit` (fontkit 2.0.4 не поставляет типы) и `fontkit`
  2.0.4.
- Non-variable fixture для тестов валидации генерируется через уже
  зафиксированный `svg2ttf`, а не коммитится бинарником.
- `letterSpacings.normal` — строка `"0"`: типы Panda не принимают число.
- `knip.jsonc` игнорирует `**/*.generated.*` (как ESLint и dprint), поэтому
  generated-артефакты не анализируются как мёртвый код.
- `checkFontAssets` принимает инъектируемый IO — дрейф тестируется в temp-каталоге
  без изменения закоммиченных ассетов.

## Открытые вопросы

- Нужен ли Unicode subsetting и по каким профилям.
- Нужен ли `preload` для критичного начертания (после замера реального лендинга).
- Понадобится ли публичный API для OpenType features / `font-variation-settings`.
- Когда появится деструктивный сценарий обновления шрифта — нужен ли навык
  уровня `update-icon-set`.
- Когда типографика повторится в 3+ компонентах — стоит ли вводить composite
  text styles (сейчас сознательно нет).
- Нужны ли responsive-шкалы (breakpoint-зависимые размеры).

## Границы применимости

- Композиция типографики подтверждена на одном компоненте (`Button.label`) и
  одном experiment-specimen в `App`. Универсальная система text styles не
  проверялась и не заявляется.
- Responsive-типографика, density и вторая семья не затрагивались.
- Subsetting не проверялся.

## Оценка реализации (ревью, 2026-09-30)

Пользовательское ревью выполнено 2026-09-30; по прямой команде эксперимент
закрыт. Оценка — «в целом хороший»: фичу удалось реализовать достаточно
автономно, по структуре проекта, с достойным кодом и документацией.

Что получилось:

- Автономная реализация: агент собрал asset-модуль, pipeline, задачи, навык,
  foundation-токены и первую композицию без ручного написания кода.
- Настоящий контракт, а не набор файлов: WOFF2, manifest, generated CSS и токены
  связаны проверками и общим source of truth.
- Проверки работают как исполняемые правила: семья, стиль, оси, диапазон
  `100–900`, magic header WOFF2 и drift committed-артефактов падают, а не
  предупреждают.
- Foundation остался атомарным; `Button.label` доказывает композицию,
  `Button.root` типографикой не владеет.

Что не получилось (это границы, а не провалы):

- Композиция подтверждена на одном компоненте и одном specimen; общей модели
  типографики для разных компонентов ещё нет.
- Не проверены responsive/density-шкалы, вторая семья и замена Inter.
- Греческое покрытие заявлено источником, визуально не проверено.
- Нет доказательств пользы subsetting и `preload` на реальном лендинге.
- Нет публичного API вариативных осей и OpenType features.
- Нет сценария деструктивного обновления шрифта.

Что улучшилось после реализации:

- Runtime-контракт стал генерируемым: handwritten `font.css` заменён на
  `font.generated.css`, а drift-проверка покрывает WOFF2, manifest и CSS.
- Источник читается и валидируется один раз за сборку, а не повторно.
- Runtime roots обязаны импортировать generated CSS, и это проверяется.
- Отложенное собрано в единый [backlog](../../../shared/notes/backlog.md).

Что отложено: subsetting, `preload`, публичный API вариативных осей, вторая
семья, composite text styles (при повторе в 3+ компонентах), responsive- и
density-шкалы и tooling-долг — полный список в backlog.

За пределы эксперимента функционально не выходили: исключённые из scope
textStyles, preload, subsetting, responsive-правила и вторая семья не
добавлялись. Харденинг расширил реализацию, но не продуктовую область — он
усилил заявленный pipeline.

Урок процесса: правила, skills и scripts — основной рычаг разработки агентами.
Именно связка «очерченные границы + операторский skill + исполняемые задачи и
проверки» позволила пройти фичу автономно. Автономность при этом не отменяет
ревью: независимый разбор нашёл реальные пробелы (generated CSS не был
контрактом, источник валидировался дважды).

Следующий шаг: после составного `Card` — ревью повторяющихся решений по цветам и
типографике, кристаллизация единой структуры правил, skills и scripts, и только
затем компоненты со сложным поведением вроде `Input`.
