# ButtonIcon — ревью-комментарий: регистрация пресета

Замечание пользователя, решение и проверка. Итоговая оценка автономности здесь не
выносится.

## Замечание

Пресет `buttonIcon` расширял тему через `theme.extend`, тогда как `Button`
объявляет рецепт напрямую. Пользователь попросил посмотреть, как это делает
`Button`, оценить разницу и привести к единой модели.

## Что установлено (оркестратор, до правок)

- `mergeConfigs` из `@pandacss/config` shallow-мержит `theme` между пресетами:
  два прямых объявления `theme.slotRecipes` замещают раздел, а не складываются.
- Проверено запуском `mergeConfigs` на текущих пресетах:
  - текущая схема (`button` напрямую, `buttonIcon` через `extend`) → `button`,
    `buttonIcon`;
  - оба напрямую → только `buttonIcon`;
  - оба напрямую, обратный порядок → только `button`.
- `Icon` не конфликтовал, потому что использует другой раздел (`theme.recipes`).
- `theme.extend` — механизм объединения конфигурации, а не наследование рецепта
  `buttonIcon` от `button`.
- `wiki/panda-rules.md` разрешает только `conditions.extend`; `theme.extend`
  билдер ввёл без отдельного решения по политике.

## Выбранное решение

Компоненты объявляют свои рецепты напрямую, как `Button`; объединение словарей
делается явно в `src/shared/styles/index.ts` (`componentsPreset`). Сборка —
shallow, по двум ключам (`recipes`, `slotRecipes`), без component overrides и
скрытого наследования. Универсальный deep-merge не добавляется.

## Реализация (билдер)

- `src/shared/components/button-icon/preset.ts` — обходной путь убран; прямое
  `theme: { slotRecipes: { buttonIcon: buttonIconRecipe } }`.
- `src/shared/styles/index.ts` — `componentPresetSources`, shallow
  `collectComponentDictionaries`, технический `componentsPreset`;
  `presets = [settingsPreset, foundationPreset, componentsPreset]`.
- `src/shared/styles/presets.test.ts` — регрессионный тест (6 тестов) на реальном
  `mergeConfigs` из `@pandacss/config`, порядок как у загрузчика Panda.
- `.agents/project.md` — уточнена модель: компонент владеет своим пресетом и
  рецептом; `styles/index.ts` технически объединяет словари; прямое подключение
  нескольких `theme.slotRecipes` замещает раздел; component overrides и скрытое
  наследование запрещены.

### Регрессионный тест: RED → GREEN

| Этап | Результат |
| --- | --- |
| Шаг 1: тест добавлен при обходном `extend` | 3 pass / 2 fail — RED |
| Шаг 2: `buttonIconPreset` напрямую | 1 pass / 4 fail — тест ловит потерю `slotRecipes.button` |
| Шаг 3: явная сборка в `styles/index.ts` | 6 pass / 0 fail — GREEN |

## Проверки (по отчёту билдера)

- `mise run gen` — успешно; `recipes/index.mjs` содержит `icon`, `button`,
  `button-icon`; CSS содержит `button__root` и `buttonIcon__root/icon`.
- `mise run check` — 104 unit pass / 0 fail; 26 browser pass / 0 fail.
- типы, lint, format, `check:deps` — pass.
- `mise run build` — success; выходные хэши идентичны прежним
  (`index-f9HNj0al.css`, `index-CzAHfYGU.js`), что подтверждает неизменность
  оформления.
- `mise run storybook:build` — success.
- `mise run test:visual` — 1 passed **без обновления baseline** (ожидаемый
  результат).

## Отклонения и ограничения

- Изменён `knip.jsonc`: `@pandacss/config` добавлен в `ignoreDependencies` (тест
  импортирует транзитивный пакет напрямую). Это выход за изначальную границу
  «код + `.agents/project.md`», необходимый для зелёного `check:deps`. Отклонение
  зафиксировано.
- Экспортированы технические `componentPresetSources` и
  `collectComponentDictionaries` — расширение публичной поверхности entry-модуля
  для проверки независимости от порядка.
- `mergeConfigs` типизирован как `any`; в тесте результат сужается через `as Config`.
- `test:visual` прошёл без обновления baseline, но сам файл baseline остаётся
  изменённым относительно `HEAD` с первого прогона — это не результат данной
  задачи.
- Работа обоих прогонов **не закоммичена**: в ветке только docs-коммиты
  оркестратора.
- `outputs/`, `wiki/`, `raw/` билдер не трогал; эксперимент не закрывался.

## Статус

- Эксперимент открыт. Оценка автономности и решение о закрытии — за
  пользователем.
