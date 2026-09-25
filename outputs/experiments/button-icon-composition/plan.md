# Button Icon Composition — план реализации

Основание — `README.md`. Статус: реализация выполнена; закрытие — по прямой
команде. `[x]` done.

## Решения по умолчанию

- Публичный API: `prefixIcon?: IconName`, `suffixIcon?: IconName`.
- Внутренний `_Button` — в `src/shared/components/button/button.tsx`, без
  экспорта.
- Соответствие размеров: `sm → sm`, `md → sm` (оба слота `x8`).
- Миграция существующих вызовов с узлами — часть задачи.

## Задачи

### 1. Baseline — done
- [x] Зафиксированы usages `prefixIcon`/`suffixIcon` (App ×2, stories ×2).
- [x] Зафиксированы DOM, размеры слотов (`x8`) и visual baseline.
- Проверка: список usages и baseline в ledger.

### 2. Достаточность контракта Icon — done
- [x] `IconName`, `IconSize`, `currentColor`, `className` достаточны.
- [x] Runtime-список/map имён не добавлен: для типизации достаточно `IconName`.
- Проверка: запись решения (ledger, `notes/results.md`).

### 3. Внутренний `_Button` и публичный `Button` — done
- [x] `_Button` принимает `ReactNode`, владеет DOM, слотами и recipe.
- [x] Публичный `Button` принимает имена, создаёт `Icon`, передаёт узлы.
- [x] Добавлено `ICON_SIZE_BY_BUTTON_SIZE`.
- [x] DOM-обёртка не добавлена, стили не дублированы.
- Проверка: TDD RED→GREEN (`Button.composition.test.tsx`, 7 тестов);
  `check:types`.

### 4. Миграция потребителей и stories — done
- [x] `App.tsx` и `Button.stories.tsx` переведены на имена иконок.
- [x] Ручное создание `Icon` у потребителя убрано.
- [x] Добавлены `WithIcons` и `IconOnly` (`tone="icon"` + `aria-label`).
- Проверка: `mise run check`.

### 5. Проверки контракта и поведения — done
- [x] Типы отклоняют `ReactNode` и неизвестное имя (`@ts-expect-error`).
- [x] Unit: соответствие размеров проверено поведенчески для `sm` и `md`.
- [x] `_Button` не экспортируется (namespace модуля = `["Button"]`).
- [x] Browser/Storybook: обе иконки, icon-only, декоративность, одно доступное
      имя, наследование цвета.
- [x] Нативное поведение `<button>`: `type`, `disabled`, `aria-label`.
- Проверка: `test:unit` (72), `test:browser` (14), `check:deps`.

### 6. Visual — done
- [x] `test:visual` прошёл **без** обновления baseline: DOM и внешний вид не
      изменились.

### 7. Сравнение подходов и вывод — done
- [x] Сопоставлены A/B/C: строки, компоненты, типы, публичный API, косвенность.
- [x] Зафиксировано: у `_Button` нет доказуемой текущей пользы; аргумент —
      гипотетический неиконочный потребитель слота.
- [x] Решение (пересмотрено в задаче 10): разделение признано избыточным и
      свёрнуто до B.
- Проверка: `notes/comparison.md`.

### 8. Итог — done
- [x] `notes/results.md`, `notes/comparison.md`.
- [x] `history.md`.
- [x] `notes/retrospective.md` — цели, достигнутое, отменённое, ограничения
      доказательств, архитектурные и процессные выводы.
- [x] `README.md` (Итог) и `outputs/history.md`.
- [x] Закрытие по прямой команде пользователя (2026-09-25).

### 9. Ревью-комментарий: удаление `tone="icon"` — done
- [x] `ButtonTone` → `primary | secondary | ghost`.
- [x] Recipe: удалён вариант `icon` и два compound-variant; `staticCss` обновлён.
- [x] `App.tsx` и stories обновлены; `IconOnly` удалён, проверка наследования
      цвета перенесена в `WithIcons`.
- [x] TDD: RED (2 unit + unused `@ts-expect-error`) → GREEN.
- [x] Visual baseline обновлён осознанно (убрана icon-only кнопка).
- Проверка: `mise run check`, `check:deps`, `build`, `storybook:build`,
  `test:visual` — зелёные.

### 10. Ревью-комментарий: удаление `_Button` — done
- [x] Приватный `_Button` и `InternalButtonProps` удалены; реализация сведена к
      варианту B.
- [x] `button.tsx` — 64 строки, один компонент; приватной осталась только
      таблица `ICON_SIZE_BY_BUTTON_SIZE`.
- [x] Тест приватности переименован в «exports only the public button».
- [x] `notes/comparison.md` обновлён: итог — B.
- Проверка: `mise run check` (73 unit / 14 browser), `check:deps`, `build`,
  `storybook:build`, `test:visual` (без изменения baseline) — зелёные.

### 11. Ревью-комментарий: цвет по слотам — done
- [x] `root` больше не объявляет foreground-`color`.
- [x] `label` → роль `text`, `prefixIcon` / `suffixIcon` → роль `icon`.
- [x] `primary` → `common.950.text/icon`; `secondary` / `ghost` →
      `common.50.text/icon`. `primary` и `secondary` без изменения вида.
- [x] Согласовано в ревью: `ghost` становится контрастнее — его прежний
      «мягкий ink» был ролью `background`, ролевого эквивалента нет.
- [x] TDD: RED (2 unit) → GREEN (21 unit).
- [x] Браузерная проверка `SlotColourRoles` / `DarkSlotColourRoles` с
      переопределением CSS-переменных `…-50/950-text` и `…-icon` разными
      значениями — доказывает, что иконки читают роль `icon`, а не `text`.
- [x] Visual baseline обновлён осознанно (149 пикселей, только `ghost`), diff
      просмотрен, прогон повторён.
- Проверка: `check` (76 unit / 16 browser), `check:types`, `check:deps`, `build`,
  `storybook:build`, `test:visual` — зелёные.
