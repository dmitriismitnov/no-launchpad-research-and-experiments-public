# History: Design system → code port

## 2026-10-02 — experiment opened

- Closed the Pencil workflow experiment; porting the design system into code is
  the next step.
- Code already has foundation (palette, semantic, spacing, typography, shape,
  effects) and five components (`Button`, `ButtonIcon`, `Icon`, `Card`, `Input`).
- Known divergence: Pen uses `semantic/<group>/<step>/border/subtle` and
  `border/strong`; code has a single `border`. No component references the
  `border` projection, so aligning it is low risk to components.
- Scope: foundation token alignment + landing screen; behavior and dashboard
  deferred.

## 2026-10-02 — решения по scope

- Пользователь выбрал: **Pen — полный источник цвета** и **все ~70 компонентов**.
- Проверено на практике: палитра Pen несовместима с текущей semantic-матрицей
  кода — при замене только палитры `bun test src/shared/styles/foundation` даёт
  53 contrast-провала и 22 нарушения `divider < border`. Значит палитру и
  семантическую матрицу переносим одним атомарным изменением.
- Изменение палитры откатано, дерево оставлено зелёным; перенос — следующий шаг.

## 2026-10-02 — T0: палитра Pen + semantic-матрица перенесены

- Написан генератор `tools/port-foundation.ts`: читает `ex_2.pen` (обычный JSON)
  и генерирует `palette.ts` (+ `base` white/black) и `semantic.ts` с nested
  `border.subtle` / `border.strong`.
- Палитра заменена на Pen-значения (Tailwind-подобные); `neutral.50=#F8FAFC`,
  `neutral.950=#020617`, добавлены `base` white/black.
- Semantic-проекции: `background, text, icon, border, divider`, где `border`
  разбит на `subtle` и `strong`.
- Тесты обновлены: матрица, контраст (`text ≥4.5`, `icon ≥3`, `border.strong ≥3`),
  иерархия `divider < border.subtle < border.strong`. Все проходят.
- Story `Colors` обновлена под nested border; хардкод-цвета в `Input`/`Card`
  story-тестах обновлены под новую палитру.
- Проверки: `mise run gen`, `mise run check` (189 unit / 41 browser),
  `mise run check:deps` — зелёные.

## 2026-10-02 — T2: первый компонент (Badge)

- Определён набор компонентов, который реально использует Pen-лендинг
  (`10 Landing — desktop`): Brand, Nav Item, Button, Badge, Text Input,
  Icon Button, Tab, Table Row, Code Block, Icon, Progress, Theme Switch Preview.
  Из них в коде уже есть Button/Input/ButtonIcon/Icon.
- Перенесён `Badge` по правилам репозитория: `preset.ts` (слоты root/dot/label,
  tone neutral|positive|negative|brand), компонент, `index.ts`, composition-тест,
  story; зарегистрирован в `styles/index.ts`, `presets.test.ts`, `knip.jsonc`,
  использован в `App.tsx`.
- Badge из Pen: dot 6px (`common.600`), label 12/500 (`common.50.text`), pill.
- Проверки: `mise run gen`, `mise run check` (189 unit / 46 browser),
  `mise run check:deps` — зелёные. Коммиты: `05779b4`, `c9078a1`.
- Осталось: Nav Item, Brand, Tab, Table Row, Code Block, Progress,
  Theme Switch Preview; затем лендинг.

## 2026-10-02 — T2 выполнен: перенесены все компоненты Pen

- Перенесены все masters Pen в код (React + PandaCSS), батчами через
  foreground-субагентов с независимой проверкой оркестратором.
- Итог: 72 каталога компонентов в `src/shared/components/`.
- Покрытие 82 masters: 72 компонента + под-части, представленные внутри
  родителей: `Icon Button` → `button-icon`, `Text Input` → `input`;
  `Option`/`Select Popup` → Select, `Calendar Day` → Calendar,
  `Color Popup` → Color Picker, `Menu Item` → Menu, `List Item` → List,
  `Timeline Item` → Timeline, `Table Row` → Data Table;
  `Card Plain`/`Card Compact` → варианты `Card`.
- Каждый компонент: preset + компонент + index + composition-тест + story,
  зарегистрирован в `styles/index.ts`, `presets.test.ts`, `knip.jsonc`,
  использован в `App.tsx`.
- Иконки расширены пайплайном `icons:build` (38 glyphs).
- Проверки: `mise run gen`, `mise run check` (635 unit / 389 browser),
  `mise run check:deps`, `mise run build` — зелёные.
- Отчёты по батчам: `notes/batch1..13-report.md`.
- Осталось (T3): экран лендинга из токенов и компонентов.

## 2026-10-02 — T3 выполнен: экран лендинга

- Перенесена типографическая шкала Pen (`2xl/3xl/4xl`) в foundation, тест обновлён.
- `src/app/Landing.tsx` собран из перенесённых токенов и компонентов:
  Header (`TopNavigation` + `Brand` + `NavItem` + `ThemeSwitchPreview` + `Link` + `Button`),
  Hero + `Statistic`-полоса, Features (`Card`), Workflow, Themes/CTA, Footer (`Divider` + `Link`).
- `App.tsx` рендерит лендинг в light и dark через `data-theme` (тема — контекст, не вариант).
- Адаптивность: grid `auto-fit minmax(...)` и flex-wrap.
- Проверки: `mise run gen`, `mise run check` (389 browser), `mise run check:deps`, `mise run build` — зелёные.

- Визуальная проверка: Playwright-скриншоты `notes/landing-desktop.png` и
  `notes/landing-mobile.png`; лендинг рендерится в light и dark из одних
  компонентов, адаптивен на мобильной ширине.

## 2026-10-02 — fix: theme-контекст в Storybook

- Проблема: semantic-токены объявлены только под `[data-theme="light"|"dark"]`, а
  базовый `:root` не содержит `--colors-semantic-*`; Storybook не выставлял тему,
  поэтому стори без своей обёртки показывали неопределённые переменные
  (например `--colors-semantic-brand-100-text`).
- Решение (как в приложении): глобальный декоратор в `.storybook/preview.tsx`
  ставит `data-theme` на `<html>`, плюс переключатель темы в тулбаре
  (`globalTypes.theme`), плюс `.storybook/preview.css` задаёт фон/текст canvas
  через semantic-токены. `preview.ts` → `preview.tsx`.
- Обновлены `knip.jsonc` (entry `.storybook/*.{ts,tsx}`) и `Font.test.ts`.
- Проверено визуально: `notes/avatar-light.png`, `notes/avatar-dark.png`.
- Проверки: `mise run check`, `mise run check:deps` — зелёные.

## 2026-10-02 — fix: сломанная иконка sun

- Причина: `sun.svg` использовал `circle`/`rect` + `transform`, а билдер шрифта
  (`svgicons2svgfont`) переносит в глиф только `path`-геометрию — светлая
  иконка темы получалась пустой.
- По скиллу `build-icon-font`: raw-источник нормализован (flatten в один
  fill-based `<path>`), импортирован `mise run icons:build -- --from assets/icons`,
  пересобраны font/manifest. Ключ `sun` и codepoint сохранены.
- Проверено визуально: `notes/icon-inventory.png`.
- Проверки: `mise run icons:check`, `mise run check` — зелёные.
