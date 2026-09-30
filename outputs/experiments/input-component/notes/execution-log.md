# Input Component — журнал исполнения

Запись для ревью эксперимента. Здесь ход реализации, принятые решения, границы
проверенного и открытые вопросы. Итог и оценка автономности —
[`results.md`](results.md).

## Как исполнялось

- Ветка `experiment/input-component` от `main` (`a5444ed`). Коммиты
  `d1c47d0..` (см. `git log --oneline`).
- План — `plan.md`, спецификация — `notes/design-spec.md`.
- Исполнение inline по четырём задачам: артефакты → рецепт и регистрация →
  компонент и barrel → stories/browser → интеграционные проверки. Каждая задача
  по TDD: сначала падающий тест, затем минимальная реализация, затем зелёный
  прогон.
- Внешнее ревью — отдельным агентом в чистом контексте, по диффу всей ветки.

## Проверки

| Проверка | Результат |
| --- | --- |
| `bun test src/shared/components/input` | 20 pass / 0 fail |
| `mise run test:browser` | 41 pass / 0 fail (6 файлов; `Input.stories.tsx` — 7) |
| `mise run check` | lint, types, format, `icons:check`, `fonts:check`, unit (184) + browser (41) — зелёные |
| `mise run check:deps` (Knip) | чисто |
| Визуальная проверка (headless Chromium, `iframe.html`) | геометрия, токены, фокус-кольцо, invalid/disabled, light/dark |

## Решения

1. **`git pull` в Task 0 пропущен.** У репозитория нет настроенного remote;
   ветка создана от локального `main`. Цена ошибки: ветка могла бы отстать от
   внешнего `main`, которого в этой рабочей копии нет.
2. **`src/shared/styled-system` исключён из `git add`.** Во всех шагах плана он
   перечислен, хотя путь сгенерирован и перечислен в `.gitignore`; `git add`
   по нему падает. Прецедент — журнал `card-component`.
3. **Тест «rejects the size prop»** связывает JSX с константой и проверяет
   `toBeDefined()`, а не одиночное выражение-инструкцию: последнее отклоняется
   ESLint `no-unused-expressions` и расходится с тестами Button/Card.
   `@ts-expect-error` по-прежнему доказывает, что `size` вне публичного API.
4. **Два `Review Focus`-пункта закрыты регрессионными тестами в Task 4.** План
   в Self-Review заявляет, что пункты 1–6 закрыты тестами, но перечень тестов
   Task 2 не покрывал п.2 (`invalid` без непустого `error`) и п.6
   (controlled/uncontrolled). Оба поведения явно описаны в спецификации, поэтому
   добавлены два composition-теста. Тест на `invalid` без `error` проверен
   негативным контролем: при снятии guard-а `hasText(error)` он падает.
5. **Визуальная проверка выполнена headless-браузером, а не вручную.**
   К десктоп-браузеру сессии подключения не было, поэтому Storybook открыт
   Playwright/Chromium по `iframe.html`; сняты вычисленные стили и скриншоты
   light/invalid/dark. Storybook запущен на 6007 (`STORYBOOK_PORT`), потому что
   6006 занят давним чужим dev-сервером; после проверки процесс остановлен.

## Границы проверенного

Доказано:

- рецепт: анатомия слотов, единственный вариант `invalid`, отсутствие
  `_light`/`_dark` и shorthand-свойств, типографика на `label` (не на `root`/
  `control`), фокус-кольцо идентично `Button`;
- `placeholder` — через `common.500.background`, `invalid`-рамка — через
  `negative.600.background`;
- SSR-контракт: связь `label`↔`input`, проброс нативных атрибутов,
  `aria-invalid`, `aria-describedby` + `<p id>`, переиспользование
  потребительского `id`, мерж `className`, отсутствие пустых областей,
  controlled/uncontrolled без внутреннего состояния;
- вычисленные стили в Chromium: control 50px, radius 6px, padding 12px, gap 6px,
  label Inter 12/500 uppercase, placeholder `neutral.500`, focus-visible
  `solid 2px brand.500`, invalid рамка и текст `negative.600` (`rgb(166,29,18)`),
  disabled `opacity .45` + `not-allowed`, фон `rgb(255,255,255)` / `rgb(0,0,0)` в
  light/dark; контент не обрезан (см. скриншоты в рабочей области плана);
- проектные проверки: `mise run check` и `check:deps` зелёные, barrel учтён
  Knip, регрессия сборки пресетов дополнена `input`.

Не проверено / открыто:

- единообразие фокус-кольца с `Button` закреплено на уровне рецепта и
  вычисленного `input`; программный `focus()` на `<button>` не включает
  `:focus-visible`, поэтому computed-сравнение с Button не снималось;
- аппроксимация mono-лейбла шрифтом `body` — осознанная (в foundation только
  Inter); реальный mono face — отдельный font-pipeline, вне scope;
- нет size-вариантов, textarea, headless-интеграции, hint/счётчика/иконок —
  сознательно вне v1;
- оценка автономности и решение о закрытии — за пользователем.

## Открытые вопросы

- Нужен ли `Input` own `size`-вариант до появления второго размера в макете?
- Стоит ли поднять mono-шрифт в foundation отдельным экспериментом.
- Проверка контраста `common.500.background` как placeholder на
  `common.50.background` не вынесена в foundation как системное правило (как и
  cross-projection muted-текст в `Card`).
