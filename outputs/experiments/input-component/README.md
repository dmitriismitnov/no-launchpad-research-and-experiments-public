# Эксперимент: Input Component

**Статус:** closed (2026-09-30).

Ветка: `experiment/input-component` от `main`.

## Вопрос

Может ли агент-билдер по сырому заданию + близкому образцу (`Button`, `Card`) +
накопленным правилам автономно собрать **поведенческий** компонент `Input` (с
focus/disabled/invalid-состояниями и a11y), не создавая навыков и не выходя из
согласованного scope?

## Классификация

Это **дизайн-эксперимент** («как это должно быть устроено»), а не проба
способности. Это пункт roadmap (`landing-system-roadmap.md`, п.4 «Сделать Input
со сложным поведением»): нужны очерченные scope и критерии.

## Scope

### Входит (v1)

- Компонент `Input` (однострочный, нативный `<input>`) в
  `src/shared/components/input/`.
- Слот-рецепт `root / label / control / error` + регистрация в точке сбора.
- `label?` (опционально), состояние `invalid` + `error?` (a11y: `aria-invalid`,
  `aria-describedby`, `htmlFor`/`id`).
- Фокус-кольцо (focus-visible), `disabled` (opacity + not-allowed) — по образцу
  `Button`.
- Нативные `<input>`-пропы проброшены; `className` мержится с классом рецепта.
- Принятые проверки: unit, composition, Storybook/browser, `check`,
  `check:deps`.

### Вне рамок (v1) — НЕ делать

- `Textarea` / `multiline` (отдельный следующий шаг).
- zagjs / Ark UI / headless-интеграция.
- Несколько размеров (`sm`/`lg`), responsive-размеры.
- `hint`-слот, счётчик символов, leading/trailing-иконки внутри поля.
- `classNames`-per-slot escape-hatch (backlog `component-slot-classnames`).
- Создание/изменение навыков.

## Модель (решения Input v1)

- **Декларативный `Input`**, владеющий своей разметкой
  (`<div>` + `<label>` + `<input>` + опц. `<p>` ошибки) и слот-рецептом.
  Поведение — нативное `<input>` (focus/disabled/invalid/a11y), без
  headless-интеграции.
- **Публичный контракт:**

  ```ts
  export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
      label?: string;
      invalid?: boolean;
      error?: string;
  };
  ```

  `size` и `children` исключены: компонент владеет размером и внутренней
  структурой. Дизайн-системный `size`-вариант — отдельный будущий шаг.
- **Анатомия слота recipe:**

  ```text
  root
  ├── label      (<label>, опционально)
  ├── control    (<input>, всегда)
  └── error      (<p>, только когда invalid && error непусто)
  ```

- **`id`:** потребительский `id` побеждает; иначе React `useId()`.
  `label → htmlFor={controlId}`, `input → id={controlId}`,
  `error → id={`${controlId}-error`}`.
- **`invalid`:** `input aria-invalid={invalid || undefined}`; когда
  `invalid && error` непусто — `aria-describedby={errorId}` и рендер
  `<p id={errorId}>{error}</p>`.
- **`disabled`:** через рецепт (`_disabled` → `cursor: not-allowed`,
  `opacity: 0.45`) — как `Button`.
- **Пустая/пробельная строка** в `label` или `error` = отсутствие (правило из
  `card-component`).
- **Единственный публичный вариант — `invalid`** (boolean). Варианта `size` в
  v1 нет (как у `Card` — одна проекция).
- **Референс — композиция, а не API.** `label="ИМЯ"` и плейсхолдер живут в
  Storybook-истории `Reference`.

### Visual mapping (PEN → токены кода)

| PEN (`Input / Text`) | Токен кода | Примечание |
| --- | --- | --- |
| label `common/600/background` | `semantic.common.600.background` | точное |
| control fill `common/50/background` | `semantic.common.50.background` | точное |
| control stroke `common/200/divider`, 1px | `semantic.common.200.divider`, `borderWidth: "thin"` | точное |
| placeholder `common/500/background` | `semantic.common.500.background` через `&::placeholder` | точное |
| вводимый текст | `semantic.common.50.text` + `body`/`sm`/`regular`/`normal` | типографика текста задана явно |
| control height `46` | `x25` (50px) | снэп вверх, выравнивание с Button md |
| padding horizontal `14` | `x6` (12px) | снэп вниз |
| label→control gap `7` | `x3` (6px) | снэп вниз |
| `radius-control` | `sm` (6px) | как Button |
| label `font-mono` 9px uppercase tracking 0.14 | `body` + `xs` + `medium` + `wide` + `textTransform: uppercase` | **осознанная аппроксимация**: mono-шрифта нет в foundation (только Inter `body`); добавление шрифта — отдельный font-pipeline, вне scope |

Ошибка/инвалидное состояние (кодовое расширение, в PEN отсутствует — как
`Button.sm`): рамка `invalid` → `semantic.negative.600.background`; текст ошибки
→ `semantic.negative.600.background`.

## Критерии успеха

- `Input` доступен как самостоятельный компонент и следует организации модуля
  (компонент, preset, barrel, stories, тесты).
- Публичный API универсален: нативный `<input>` + `label`/`invalid`/`error`,
  без доменных полей.
- `invalid`/`error` корректно связывают a11y (`aria-invalid`,
  `aria-describedby`, `htmlFor`/`id`).
- `disabled` не активируется (native + рецепт), фокус-кольцо едино с `Button`.
- Пустые опциональные области не рендерятся.
- Референс `Input / Text` воспроизводится как Storybook-композиция в light и
  dark.
- `mise run check` и `mise run check:deps` зелёные; barrel учтён Knip.
- Закрытие — по прямой команде пользователя.

## Состояние (2026-09-30)

- Компонент реализован на ветке `experiment/input-component`:
  `src/shared/components/input/` (preset, компонент, barrel, unit, composition и
  browser-проверки, 7 stories).
- Пресет зарегистрирован в явной точке сбора `src/shared/styles/index.ts`;
  регрессионный тест `src/shared/styles/presets.test.ts` дополнен `input`;
  barrel зарегистрирован в `knip.jsonc` как entry-точка.
- Проверки: `mise run check` (189 unit / 41 browser) и `mise run check:deps` —
  зелёные. Визуальная проверка (headless Chromium) подтвердила геометрию,
  токены, фокус-кольцо, invalid/disabled и light/dark.
- Закрыт разрыв плана: два входа `Review Focus`, обещанные Self-Review, но не
  покрытые перечнем тестов Task 2, добавлены composition-регрессиями.
- Эксперимент **закрыт по прямой команде пользователя** (2026-09-30). Вывод
  пользователя и направление следующего цикла — в
  [`notes/results.md`](notes/results.md). Ветка `experiment/input-component` на
  момент закрытия не влита; вливание — отдельная команда.

## Ссылки

- `plan.md` — утверждённый план реализации
- `notes/design-spec.md` — детальная спецификация Input v1
- `notes/execution-log.md` — журнал исполнения: решения, проверки, границы
  проверенного, открытые вопросы (материал для ревью)
- `history.md` — хронология эксперимента
- `../../shared/pen-design-system-integration/design/design_raw_1.pen` —
  референс `Input / Text` (`YknUp`) и `Input / Textarea` (`G4rpg`)
- `../../shared/notes/landing-system-roadmap.md` — общий следующий цикл
- `../card-component/README.md` — образец эксперимента
