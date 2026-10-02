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
