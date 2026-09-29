# Эксперимент: Typography Asset Foundation

**Статус:** completed (2026-09-30). Пользовательское ревью — следующий шаг.

Source of truth — код модуля `src/shared/fonts`, задачи `fonts:build` / `fonts:check`
и навык `build-web-font`.

## Вопрос

Как подключить брендовый шрифт к проекту так, чтобы:

1. исходный шрифт превращался в оптимизированные web-ассеты воспроизводимым
   pipeline;
2. типографические значения жили в `foundation` как атомарные «запчасти»;
3. компонент сам собирал из них шрифт для своего слота (первый потребитель —
   `Button.label`), а не получал готовые именованные text styles.

## Классификация

Шрифт — **asset-модуль**, а не компонент и не часть foundation: он владеет
исходными файлами, сгенерированными WOFF2, manifest, `@font-face` и скриптами
сборки. Foundation владеет только токенами-шкалами и не знает о файлах.

Модуль живёт отдельно от components (`src/shared/fonts/`), потому что это
класс по источнику данных и pipeline, а не React-адаптер: в отличие от `Icon`,
у web-шрифта нет React-компонента вообще — его единственный runtime-контракт
это CSS и токены.

## Scope

В рамках:

- канонические variable TTF Inter (normal + italic) как единственный источник;
- pipeline `variable TTF → WOFF2 + manifest`, детерминированный по выходу;
- manifest с family/style/weight range/axes и относительным именем файла;
- регистрация `@font-face` в приложении и Storybook;
- project-local навык `build-web-font` и задачи `fonts:build` / `fonts:check`;
- атомарные typography-шкалы в foundation (family, size, weight, line height,
  tracking);
- первая композиция: `Button.label` собирает типографику из этих атомов;
- проверки: unit (валидация источника, детерминизм, drift), browser, visual.

Вне рамок:

- Unicode subsetting;
- `preload` и приоритизация загрузки;
- публичный API для OpenType features и `font-variation-settings`;
- навык деструктивного обновления шрифта (аналог `update-icon-set`);
- responsive-типографика и breakpoint-зависимые шкалы;
- глобальный слой `textStyles` / именованные роли (`body`, `caption`, …);
- вторая семья шрифтов и замена Inter.

## Модель (принятые решения)

- **Атомарность foundation.** Только независимые шкалы: `fonts`, `fontSizes`,
  `fontWeights`, `lineHeights`, `letterSpacings`. Никаких `buttonLabel`,
  `heading-1` или composite text styles — они либо принадлежат компоненту, либо
  относятся к конкретной странице.
- **Композиция в компоненте.** `Button.label` сам назначает пять свойств из
  foundation. `Button.root` не содержит типографики: `root` владеет геометрией,
  заливкой, тенью и interaction-состояниями.
- **WOFF2 — конечный web-формат.** Исходник — variable TTF; WOFF2 — то, что
  грузит браузер. Оба WOFF2-начертания объявляются одним семейством `Inter` с
  `font-weight: 100 900` и `font-display: swap`.
- **Optical sizing остаётся браузерной.** Ось `opsz` сохраняется в шрифте и
  управляется `font-optical-sizing: auto` (значение по умолчанию), без явных
  `font-variation-settings`.
- **Строгая валидация источника.** Неверная семья, статический файл, другой
  диапазон весов или потеря оси при конвертации — это ошибка, которую надо
  исправить в источнике, а не предупреждение, которое обходят.
- **Детерминированность.** Повторная сборка без изменений даёт побайтово
  идентичные WOFF2 и manifest; `fonts:check` фиксирует расхождение.
- **Raw-источники вне `public/`.** Vite копирует весь `public/` в production
  output, поэтому исходный дистрибутив шрифта там храниться не должен.

## Критерии успеха

- Pipeline валидирует семью/стиль/оси и падает на несоответствии.
- Повторная сборка не меняет артефакты; `fonts:check` это подтверждает.
- `@font-face` ссылается на реальные сгенерированные файлы.
- Foundation содержит только атомарные шкалы; имена токенов не кодируют
  компоненты, слоты или CSS-свойства.
- `Button.label` собирает типографику из foundation; `Button.root` её не
  содержит.
- Браузерно подтверждено, что Inter (normal + italic, веса 500/600) реально
  загружается; кириллица рендерится.
- В production output нет `.ttf`/`.otf`.
- Выводы и ограничения зафиксированы.

## Итог

- Добавлен asset-модуль `src/shared/fonts/` с детерминированным pipeline
  `variable TTF → WOFF2 + manifest` и проверкой дрейфа.
- Появился навык `build-web-font` и задачи `fonts:build` / `fonts:check`.
- Inter заменил Geist в foundation и реально подключается в приложении и
  Storybook.
- Foundation получил пять атомарных typography-шкал; `Button.label` — первая
  подтверждённая композиция.
- Проверки зелёные: unit, browser, visual, build, storybook:build, Knip, типы,
  формат.

Ограничения и отложенные решения — `notes/results.md`.

## Ссылки

- `notes/results.md` — фактические результаты и измеренные размеры
- `plan.md` — утверждённый план реализации
- `../../../shared/notes/landing-system-roadmap.md` — общий следующий цикл
- `../../../shared/components/icon` — asset-компонент, чей pipeline стал образцом
