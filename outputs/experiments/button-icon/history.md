# ButtonIcon — history

- 2026-09-25 — эксперимент открыт, ветка `experiment/button-icon` от `main`
  (`b1f3c62`, рабочая директория чистая). Компонент отложен по итогам
  `button-icon-composition`. Готовых проектных решений заранее не задано:
  исходное задание передано агенту-билдеру, чтобы проверить, насколько API,
  оформление и композицию можно вывести из существующих правил, заметок и кода.
- 2026-09-25 — прогон агента-билдера (отдельный чистый контекст, сессия
  `ses_f27388c98ffe39JOM6bSSIzihx`). Билдеру передано только исходное задание;
  готовых решений и критериев оценки не передавалось.
  - Реализован самостоятельный модуль `src/shared/components/button-icon/`
    (`button-icon.tsx`, `preset.ts`, `index.ts`, stories, контрактные и
    composition-тесты). API: обязательный `icon` + `label` (`aria-label`),
    `tone`/`size` как у `Button`; компонент сам владеет размером и цветом
    иконки.
  - Затронуты `src/shared/styles/index.ts`, `panda.config.ts`, `knip.jsonc`,
    `src/app/App.tsx`, visual baseline.
  - По отчёту билдера проверки зелёные: `check` (98 unit / 26 browser), типы,
    lint, format, Knip, `build`, `storybook:build`, `test:visual` после
    намеренного обновления baseline.
  - Найден пробел: Panda shallow-мержит `theme` между пресетами, второй
    slot-recipe вытесняет `Button`. Билдер применил локальный workaround и
    запросил решение пользователя (узаконить `theme.extend` или агрегировать
    рецепты). Вопрос открыт.
  - Работа **не закоммичена**: в ветке только коммит эксперимента; изменения — в
    рабочей директории. Полный отчёт и фактические детали —
    `notes/builder-run.md`.
  - Эксперимент остаётся открытым: оценка автономности и решение — за
    пользователем.
- 2026-09-25 — ревью-комментарий: регистрация пресета. `buttonIcon` расширял
  тему через `theme.extend`, тогда как `Button` объявляет рецепт напрямую;
  пользователь попросил оценить разницу и привести к единой модели.
  - Оркестратор подтвердил на `mergeConfigs` (`@pandacss/config`): прямые
    `theme.slotRecipes` замещают раздел, а не складываются; `theme.extend` —
    механизм объединения, а не наследование рецепта.
  - Выбрано: компоненты объявляют рецепты напрямую, объединение словарей — явно
    в `src/shared/styles/index.ts` (`componentsPreset`, shallow по `recipes` и
    `slotRecipes`).
  - Билдер (та же сессия) внёс правку, добавил регрессионный тест
    `src/shared/styles/presets.test.ts` (RED → GREEN: 3/2 → 1/4 → 6/0) и уточнил
    `.agents/project.md`.
  - Отклонение: изменён `knip.jsonc` (`@pandacss/config` в `ignoreDependencies`).
  - Проверки по отчёту: `check` (104 unit / 26 browser), типы, lint, format,
    `check:deps`, `build` (хэши идентичны), `storybook:build`, `test:visual` без
    обновления baseline.
  - Детали — `notes/preset-registration-review.md`. Работа не закоммичена;
    эксперимент открыт.
- 2026-09-25 — эксперимент закрыт по прямой команде пользователя.
  - Код и правила закоммичены: `fa45fb0` (`feat: add button icon component` —
    модуль `button-icon`, сборка пресетов, `presets.test.ts`, `panda.config.ts`,
    `knip.jsonc`, `App.tsx`, visual baseline) и `dafd40a`
    (`docs(agents): clarify component preset composition`).
  - Добавлена `notes/retrospective.md`: цели, условия и ход, достигнутое, оценка
    автономности (наблюдение оркестратора), отменённое, ограничения
    доказательств, архитектурные и процессные выводы.
  - Проверки при закрытии (свежие, на дереве с закоммиченной работой):
    `check` — 104 unit / 26 browser, `check:types`, `check:lint`, `check:format`,
    `check:deps`, `build` (хэши совпали с прежними), `storybook:build`,
    `test:visual` — зелёные.
  - `README.md` и `outputs/history.md` переведены в completed.
  - Ветка `experiment/button-icon` содержит коммиты эксперимента; решение об
    интеграции — за пользователем.
