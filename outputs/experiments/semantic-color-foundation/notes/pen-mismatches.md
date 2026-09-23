# PEN Mismatches

Источник: `raw/migration/design_system_v1_panda_pen_example/design_raw.pen`
(только чтение; сам макет не изменяется в этом эксперименте).

Каждая запись: исходное значение PEN → выбранный palette/semantic token →
состояние (open = макет ещё не синхронизирован). После утверждения палитры
синхронизация PEN — отдельный шаг.

## Цветовые токены

| PEN token | Light | Dark | Выбранный token | Примечание | Состояние |
| --- | --- | --- | --- | --- | --- |
| `ds/surface` | `#FFFFFF` | `#0D1016` | `palette.neutral.50` / `.950` | light точный; dark → чистый чёрный | open |
| `ds/surface-raised` | `#F7F8FA` | `#151A22` | `semantic.primary.100.background` | light `#E9EBEE`, dark `#212429` | open |
| `ds/ink` | `#1A1A1A` | `#F3F5F8` | `semantic.primary.50.text` | near-black / white | open |
| `ds/ink-2` | `#666666` | `#A8B0BB` | `semantic.primary.600.background` | проекция `text` не даёт мягкий ink | open |
| `ds/ink-3` | `#8B939C` | `#6E7885` | `semantic.primary.500.background` | мягкий/подпись | open |
| `ds/line` | `#1A1A1A` | `#4A5462` | `semantic.primary.700.background` (border) | проекция `border` даёт спокойный контраст | open |
| `ds/line-soft` | `#EDEFF2` | `#212831` | `semantic.primary.200.background` | граница карточек/полей | open |
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

## Вывод

- Расхождения — ожидаемые: палитра строится от pivot «по науке», а не копирует
  PEN 1:1. Точные совпадения: surface light, accent light, live light,
  danger light, shadow 1:1.
- Синхронизация PEN-макета — отдельный последующий эксперимент.
