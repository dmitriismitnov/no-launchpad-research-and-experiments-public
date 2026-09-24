# PEN Mismatches

Источники:

- `raw/migration/design_system_v1_panda_pen_example/design_raw.pen` —
  immutable исторический вход, только чтение;
- `assets/design_raw.pen` — derived working copy: подтверждение выразимости
  модели (feasibility), а не независимый source of truth;
- код foundation и его тесты — source of truth для palette/semantic/shadow.

Каждая запись: исходное значение PEN → выбранный palette/semantic token →
состояние (open = макет ещё не синхронизирован). Полная синхронизация PEN и
Button board — отдельный последующий эксперимент.

## Цветовые токены

| PEN token | Light | Dark | Выбранный token | Примечание | Состояние |
| --- | --- | --- | --- | --- | --- |
| `ds/surface` | `#FFFFFF` | `#0D1016` | `palette.neutral.50` / `.950` | light точный; dark → чистый чёрный | open |
| `ds/surface-raised` | `#F7F8FA` | `#151A22` | `semantic.common.100.background` | light `#E9EBEE`, dark `#212429` | open |
| `ds/ink` | `#1A1A1A` | `#F3F5F8` | `semantic.common.50.text` | near-black / white | open |
| `ds/ink-2` | `#666666` | `#A8B0BB` | `semantic.common.600.background` | проекция `text` не даёт мягкий ink | open |
| `ds/ink-3` | `#8B939C` | `#6E7885` | `semantic.common.500.background` | мягкий/подпись | open |
| `ds/line` | `#1A1A1A` | `#4A5462` | `semantic.common.700.background` (border) | проекция `border` даёт спокойный контраст | open |
| `ds/line-soft` | `#EDEFF2` | `#212831` | `semantic.common.200.divider` | теперь есть проекция `divider`, тише `border` | open |
| `ds/accent` | `#4A9FD8` | `#5AB0EA` | `palette.blue.500` | light точный pivot; dark → `blue.400` | open |
| `ds/accent-deep` | `#1B5FA8` | `#1E6BB8` | `palette.blue.800` | dark → `blue.700` | open |
| `ds/live` | `#1E9E63` | `#3ECF8E` | `palette.green.500` | light точный pivot; dark → `green.300` | open |
| `ds/danger` | `#C0392B` | `#F87171` | `palette.red.500` | light точный pivot; dark → `red.300` | open |
| `ds/glow-sky` | `#7FB3E8…` | `#7FB3E8…` | `palette.sky.500` | база glow | open |
| `ds/glow-cyan` | `#8FCBE8…` | `#8FCBE8…` | `palette.cyan.500` | база glow | open |
| `ds/glow-blue` | `#4A9FD8…` | | `palette.blue.500` | декоративный glow | open |
| `ds/elev-1…8` | см. значения | см. значения | `semantic.shadow.100…800` | значения сохранены 1:1 | open |

## Прозрачность и оверлеи

| PEN token | Исходное | Решение | Состояние |
| --- | --- | --- | --- |
| `ds/glass`, `ds/veil`, `ds/halo` | RGBA/alpha | `overlay.*` (проектируется), пока `opacity` + `color-mix()` | open |
| `ds/scrim`, `ds/scrim-edge` | RGBA | `overlay.*` | open |
| `ds/data-idle`, `ds/grid` | opaque | `data.*` | open |

## Button: код-контракт против PEN

Код-контракт утверждён и реализован. PEN board отражает его лишь частично;
столбец «PEN» описывает фактическое покрытие, а не подтверждение parity.

Источник PEN: `assets/design_raw.pen`, section `01 · Действия`.

| Аспект | Код | PEN-покрытие | Состояние |
| --- | --- | --- | --- |
| Primary default | `common/50/text` fill, content `common/50/background`, без border | spec card + live sample | подтверждено |
| Primary states | opacity 0.85 / 0.70 / 0.45 (`_enabled` guard) | 5 состояний × light/dark | подтверждено |
| Secondary default | transparent, border `common/700/background`, padding 22 | spec card совпадает | частично: live sample расходится |
| Secondary/Ghost/Icon states | hover `common/100/background`, active `common/200/background` | нет samples | код-only, PEN не покрыт |
| Ghost border | `common/200/divider` | нет spec card | код-only, PEN не покрыт |
| Icon | 32×32, transparent, без border/shadow | spec card + live sample | подтверждено |
| Focus ring | `blue/500`, outer, `outlineOffset: 0` | Primary only, stroke на крае рамки | представление отличается |
| Elevation | `shadow/700` для Primary/Secondary/Ghost | spec card | подтверждено |

Открытые PEN-расхождения для следующего эксперимента:

- live Secondary sample использует surface fill, `common/50/divider` и padding
  24 против code `transparent` + `common/700/background` + 22;
- `ds/line-mid` мигрировал в `common/50/divider` без записи в таблице;
- captions spec cards всё ещё называют старые роли (`ink`, `surface`,
  `line-mid`, `elev-3`).

`ds/pen/paint/*` остаётся PEN-only: в код не переносится на этом этапе.
`size="sm"` — code-only extension без PEN source.

## Вывод

- Расхождения — ожидаемые: палитра строится от pivot «по науке», а не копирует
  PEN 1:1. Точные совпадения: surface light, accent light, live light,
  danger light, shadow 1:1.
- PEN подтверждает feasibility модели (token vocabulary, aliases, theme
  branches) и хранит Primary reference. Полная синхронизация PEN и Button board
  — отдельный последующий эксперимент.
