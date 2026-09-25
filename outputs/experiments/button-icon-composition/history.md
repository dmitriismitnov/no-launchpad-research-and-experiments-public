# Button Icon Composition — history

- 2026-09-25 — эксперимент открыт, ветка `experiment/button-icon-composition`
  (от `experiment/icon-asset-component`, так как модуль `Icon` ещё не в `main`).
  Этап — проектирование; реализация ожидает отдельного сигнала.
- 2026-09-25 — согласованы границы и модель:
  - `_Button` — строго внутренняя деталь в том же файле, без экспорта;
    принимает `ReactNode` в prefix/suffix.
  - Публичный `Button` принимает `prefixIcon?: IconName` и
    `suffixIcon?: IconName` и сам создаёт `Icon`; имена props сохраняются,
    меняется только тип (осознанный breaking change для вызовов с узлами).
  - Соответствие `ButtonSize → IconSize` живёт в модуле `Button` и не опирается
    на совпадение названий; начально `sm → sm`, `md → sm`.
  - Цвет задаёт `Button`, `Icon` наследует через `currentColor`.
  - Иконки в кнопке декоративные; доступное имя — у кнопки.
  - Сравнение с однокомпонентным вариантом входит в критерии успеха.
- 2026-09-25 — зафиксировано исходное состояние: `IconName` уже экспортируется,
  отдельная map имён нужна только при конкретном потребителе.
- 2026-09-25 — реализация (задачи 1–7 плана):
  - baseline зафиксирован (usages, DOM, слоты `x8`, visual baseline);
  - добавлен приватный `_Button` (`ReactNode`) и публичный `Button`
    (`IconName`); `ButtonSize → IconSize` живёт в модуле Button;
  - мигрированы `App.tsx` и stories; добавлены истории `WithIcons` и `IconOnly`
    с play-проверками (декоративные иконки, одно доступное имя, наследование
    цвета);
  - контрактные тесты `Button.composition.test.tsx` (RED→GREEN), типы, Knip,
    build, storybook, visual (прошёл без обновления baseline) — зелёные;
  - сравнение B/C: `notes/comparison.md`;
  - решение: `_Button` оставлен как согласованная модель; рекомендация —
    свернуть до B (минус 20 строк), если не появится конкретный неиконочный
    потребитель слота;
  - результаты: `notes/results.md`.
- 2026-09-25 — финальное ревью ветки (subagent, Critical нет) и правки:
  - Important: `ref` был в критериях успеха, но не типизировался и не
    проверялся. Исправлено: `ButtonProps` выведен из `ComponentProps<"button">`,
    внутренний тип — из публичного; добавлен unit-тест (RED→GREEN) и browser play
    `RefForwarding` (ref указывает на нативный `BUTTON`).
  - Important: заметка `notes/comparison.md` утверждала, что вариант B сохранён в
    истории; фактически он был измерен и удалён. Заметка исправлена, фрагмент B
    встроен как реальный откат.
  - Проверки после правок: 73 unit, 15 browser, `check:deps`, `build`,
    `storybook:build`, `test:visual` (без изменения baseline) — зелёные.
  - Minors вынесены в отчёт: статусы README/`outputs/history.md` (при закрытии),
    пробелы в покрытии, импорт generated-файла в stories, подтягивание icon CSS
    при импорте `Button`.
- 2026-09-25 — ревью-комментарий 2: `tone="icon"` признан лишним. Под именем
  цветовой оси лежала форма и тип содержимого, а кнопка только с иконкой станет
  отдельным компонентом. Решение: убрать сейчас.
  - `ButtonTone` → `primary | secondary | ghost`; из recipe удалён вариант
    `icon` и два compound-variant; `staticCss` обновлён.
  - Обновлены `App.tsx` и stories: `IconOnly` удалён, проверка наследования
    цвета перенесена в `WithIcons`.
  - TDD: RED — 2 unit-падения и unused `@ts-expect-error` для `tone="icon"`;
    GREEN после правок.
  - Visual: baseline обновлён осознанно (убрана квадратная icon-only кнопка,
    54 px), повторный прогон зелёный.
  - Проверки: 73 unit, 14 browser, `check:deps`, `build`, `storybook:build`.
