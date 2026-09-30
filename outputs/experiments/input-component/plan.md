# Input Component — Experiment Plan (для агента-билдера)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Цель:** Реализовать поведенческий компонент `Input` (текстовое поле с опциональным лейблом и состоянием ошибки) по референсу `Input / Text` из PEN-макета, следуя накопленным правилам проекта, без создания навыков.

**Архитектура:** `Input` — декларативный React-компонент, владеющий своей разметкой (`<div>` + `<label>` + `<input>` + опц. `<p>` ошибки) и слот-рецептом PandaCSS. Рецепт владеет визуальной проекцией и регистрируется в явной точке сбора пресетов. Поведение — нативное `<input>` (focus/disabled/invalid/a11y), без headless-интеграции.

**Tech Stack:** React + TypeScript, PandaCSS slot recipes, Bun Test, Storybook/Vitest browser tests.

**Референс:** `outputs/shared/pen-design-system-integration/design/design_raw_1.pen` → компоненты `Input / Text` (id `YknUp`) и `Input / Textarea` (id `G4rpg`). Только `Input / Text` входит в этот эксперимент.

**Спецификация:** `outputs/experiments/input-component/notes/design-spec.md` (создаётся билдером в Task 0).

---

## 0. Правила процесса (прочитать ПЕРВЫМ — жёстко)

Эти правила обязательны и не отменяются дальнейшими разделами.

### 0.1 Порядок работы

1. **Сначала артефакты, потом код.** До написания любого кода создай все артефакты эксперимента (см. 0.2). Код пишется только после этого.
2. **Запрет на навыки.** НЕ создавай и НЕ редактируй навыки (skills): ни `superpowers`, ни `.opencode/skills/`, ни иные SKILL.md. Все правила живут инлайн в этом плане. Навыки будут добавлены в отдельных экспериментах, если этот пройдёт успешно.
3. **Закрытие — только по команде.** Эксперимент закрывается ТОЛЬКО по явной команде пользователя. НЕ закрывай эксперимент, НЕ вливай ветку в `main`, НЕ создавай PR самостоятельно.
4. **Ветка и коммиты.** Работай на ветке `experiment/input-component` от `main`. Коммить по ходу — после каждой задачи. Не оставляй незакоммиченной работы (урок `button-icon`).
5. **Проверки — исполняемое правило.** Полагайся на `mise run check`, `check:deps` и тесты, а не на повторное чтение заметок. Каждая находка превращается в регрессионный тест.

### 0.2 Артефакты эксперимента (создать до кода, в Task 0)

В каталоге `outputs/experiments/input-component/`:

| Файл | Содержимое |
| --- | --- |
| `README.md` | Вопрос, классификация, scope, модель (решения), критерии успеха. По образцу `outputs/experiments/card-component/README.md`. |
| `plan.md` | Копия этого плана (план-запись). |
| `history.md` | Хронология: начать с записи «эксперимент открыт, ветка `experiment/input-component`». |
| `notes/design-spec.md` | Детальная спецификация Input v1 (из раздела 4 ниже). |
| `notes/execution-log.md` | Пустой скелет: журнал решений, проверок, границ проверенного, открытых вопросов. Заполняется по ходу. |

`notes/results.md` создаётся в конце (не до кода) и содержит итоги и оценку автономности.

`outputs/history.md` (общий индекс) обновляет пользователь/оркестратор при закрытии — не трогай его.

### 0.3 Что означает «создать все артефакты до кода»

Task 0 завершается коммитом только этих артефактов (без изменений в `src/`). Только после этого переходи к Task 1 (код).

---

## 1. Вопрос эксперимента

Может ли агент-билдер по сырому заданию + близкому образцу (`Button`, `Card`) + накопленным правилам автономно собрать **поведенческий** компонент `Input` (с focus/disabled/invalid-состояниями и a11y), не создавая навыков и не выходя из согласованного scope?

## 2. Классификация

**Дизайн-эксперимент** («как это должно быть устроено»), а не проба способности. Это пункт roadmap (`landing-system-roadmap.md`, п.4 «Сделать Input со сложным поведением»). Нужны очерченные scope и критерии.

## 3. Scope

### Входит (v1)

- Компонент `Input` (однострочный, нативный `<input>`) в `src/shared/components/input/`.
- Слот-рецепт `root / label / control / error` + регистрация в точке сбора.
- `label?` (опционально), состояние `invalid` + `error?` (a11y: `aria-invalid`, `aria-describedby`, `htmlFor`/`id`).
- Фокус-кольцо (focus-visible), `disabled` (opacity + not-allowed) — по образцу `Button`.
- Нативные `<input>`-пропы проброшены; `className` мержится с классом рецепта.
- Принятые проверки: unit, composition, Storybook/browser, `check`, `check:deps`.

### Вне рамок (v1) — НЕ делать

- `Textarea` / `multiline` (отдельный следующий шаг).
- zagjs / Ark UI / headless-интеграция.
- Несколько размеров (`sm`/`lg`), responsive-размеры.
- `hint`-слот, счётчик символов, leading/trailing-иконки внутри поля.
- `classNames`-per-slot escape-hatch (backlog `component-slot-classnames`).
- Создание/изменение навыков.

## 4. Модель (решения Input v1) — детально

### 4.1 Public API

```ts
export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
    /** Лейбл над контролом; связывается с контролом через htmlFor/id. */
    label?: string;
    /** Помечает контрол невалидным: негативная рамка + показ error. */
    invalid?: boolean;
    /** Сообщение об ошибке; показывается только когда invalid === true. */
    error?: string;
};
```

- `size` и `children` исключены из публичного API (компонент владеет размером и внутренней структурой). Дизайн-системный `size`-вариант — отдельный будущий шаг.
- Пустая/пробельная строка в `label` или `error` = отсутствие (не рендерить пустой элемент) — правило из `card-component`.

### 4.2 Анатомия слота recipe

```text
root
├── label      (<label>, опционально)
├── control    (<input>, всегда)
└── error      (<p>, только когда invalid && error непусто)
```

### 4.3 Поведение

- Нативное `<input>`: `type`/`value`/`defaultValue`/`onChange`/`placeholder`/`name`/`required`/`disabled`/`readOnly`/`id`/`aria-*`/`data-*`/`className` пробрасываются без внутреннего состояния (компонент stateless, controlled/uncontrolled работают).
- `id`: если потребитель передал `id` — использовать его; иначе сгенерировать через React `useId()`. `label` → `htmlFor={controlId}`, `input` → `id={controlId}`, `error` → `id={`${controlId}-error`}`.
- `invalid`: `input aria-invalid={invalid || undefined}`; когда `invalid && error` непусто — `aria-describedby={errorId}` и рендер `<p id={errorId}>{error}</p>`.
- `disabled`: через рецепт (`_disabled` → `cursor: not-allowed`, `opacity: 0.45`) — как `Button`.

### 4.4 Visual mapping (PEN → токены кода)

Правило: используй **только существующие** foundation/semantic токены; точное совпадение берётся как есть, иначе — **снэп к ближайшему токену шкалы**, отклонение фиксируй в `notes/design-spec.md` и `execution-log.md` как осознанное.

| PEN (`Input / Text`) | Токен кода | Примечание |
| --- | --- | --- |
| label `common/600/background` | `semantic.common.600.background` | точное |
| control fill `common/50/background` | `semantic.common.50.background` | точное |
| control stroke `common/200/divider`, 1px | `semantic.common.200.divider`, `borderWidth: "thin"` | точное |
| placeholder `common/500/background` | `semantic.common.500.background` через `&::placeholder` | точное |
| вводимый текст | `semantic.common.50.text` | подразумевается |
| control height `46` | `x25` (50px) | снэп вверх, выравнивание с Button md |
| padding horizontal `14` | `x6` (12px) | снэп вниз |
| label→control gap `7` | `x3` (6px) | снэп вниз |
| `radius-control` | `sm` (6px) | как Button |
| label `font-mono` 9px uppercase tracking 0.14 | `body` + `xs` + `medium` + `wide` + `textTransform: uppercase` | **осознанная аппроксимация**: mono-шрифта нет в foundation (только Inter `body`); добавление шрифта — отдельный font-pipeline, вне scope |

Ошибка/инвалидное состояние (кодовое расширение, в PEN отсутствует — как `Button.sm`):
- рамка `invalid` → `semantic.negative.600.background`;
- текст ошибки → `semantic.negative.600.background`.

Акцентные цвета через `.background`-проекцию — прецеденты: фокус-кольцо `Button` (`semantic.brand.500.background`) и muted-текст `Card` (`.background`-проекции шагов 500/600).

### 4.5 Рецепт (полный, без заполнителей)

`src/shared/components/input/preset.ts`:

```ts
import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Input visual projection. Slots: root / label / control / error.
 * Colors come from the semantic layer; the recipe never branches on
 * `_light` / `_dark`. Label typography is composed from foundation atoms;
 * the mono field-label face is approximated with `body` (see design-spec).
 */
export const inputRecipe = defineSlotRecipe({
    className: "input",
    slots: [ "root", "label", "control", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        control: {
            width: "100%",
            height: "x25",
            paddingInline: "x6",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            cursor: { _disabled: "not-allowed", },
            opacity: { _disabled: 0.45, },
            "&::placeholder": {
                color: "semantic.common.500.background",
            },
        },

        error: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.600.background",
        },
    },

    variants: {
        invalid: {
            true: {
                control: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },
    },

    defaultVariants: {
        invalid: false,
    },
});

export const inputPreset = definePreset({
    name: "@no-launchpad/input",
    theme: { slotRecipes: { input: inputRecipe, }, },
});
```

Единственный публичный вариант — `invalid` (boolean). Варианта `size` в v1 нет (как у `Card` — одна проекция).

### 4.6 Компонент (полный)

`src/shared/components/input/input.tsx`:

```tsx
import { useId, } from "react";
import type { ComponentProps, } from "react";

import { cx, } from "@shared/styled-system/css";
import { input, } from "@shared/styled-system/recipes";

export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
    label?: string;
    invalid?: boolean;
    error?: string;
};

export const Input = ({
    label,
    invalid = false,
    error,
    className,
    id,
    ...props
}: InputProps) => {
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const errorId = `${controlId}-error`;
    const showError = invalid && hasText(error);
    const styles = input({ invalid, });

    return (
        <div className={styles.root}>
            {hasText(label) && (
                <label className={styles.label} htmlFor={controlId}>
                    {label}
                </label>
            )}
            <input
                {...props}
                id={controlId}
                className={cx(styles.control, className)}
                aria-invalid={invalid || undefined}
                aria-describedby={showError ? errorId : undefined}
            />
            {showError && (
                <p className={styles.error} id={errorId}>
                    {error}
                </p>
            )}
        </div>
    );
};

/** Пустая/пробельная строка — отсутствие (урок Card). */
function hasText(value: string | undefined): boolean {
    return value != null && value.trim() !== "";
}
```

`src/shared/components/input/index.ts` (по образцу `button/index.ts`):

```ts
export { Input, } from "./input";
export type { InputProps, } from "./input";
export { inputPreset, inputRecipe, } from "./preset";
```

---

## 5. Правила из предыдущих экспериментов (действуют здесь инлайн)

1. **Точка сбора пресетов.** Пресет объявляет только свой рецепт. Регистрируй его в `src/shared/styles/index.ts` → импорт + `componentPresetSources`. НЕ объявляй несколько `theme.slotRecipes` рядом, НЕ используй `theme.extend`, НЕ переопределяй чужой рецепт (Panda shallow-мержит `theme`). Регрессионный тест — `src/shared/styles/presets.test.ts` (добавь `input`).
2. **Нет `_light`/`_dark` в рецепте.** Темы переключает семантический токен, не рецепт.
3. **Полные имена CSS-свойств, без shorthand.** Запрещены `bg`, `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `w`, `h`, `size` (покрыть тестом, как `Button.test.ts`).
4. **Генерируемое не редактировать.** `src/shared/styled-system` — генерируемое; после регистрации рецепта выполни `mise run gen`.
5. **Типографика/цвет на слотах, не на root.** Типографика лейбла — на `label`, цвет текста/рамки — на `control`/`error`; `root` несёт только структуру.
6. **Muted-текст и акценты через `.background`-проекцию.** Muted — `semantic.common.<step>.background` (прецедент `Card`); акцент — `<group>.<step>.background` (фокус `Button`: `brand.500.background`; инвалид — `negative.600.background`).
7. **Поведение важнее структуры.** Тестируй: focus-visible, `disabled` (не фокусируется/не редактируется), `invalid` → `aria-invalid` + связь ошибки через `aria-describedby`, доступное имя из `label`.
8. **Коммит-дисциплина.** Коммить после каждой задачи.
9. **Границы задачи покрывают обязательные сопутствующие правки.** Регистрация barrel в `knip.jsonc` (`entry`) — часть задачи компонента, а не отклонение.
10. **Противоречие правилу → спроси, не обходи.** Различай: (а) нет детали → локальное допущение с обоснованием и фиксацией; (б) противоречие правилу → воспроизведи, предложи варианты, спроси пользователя ДО закрепления обхода; (в) нужна смежная работа → обоснуй расширение рамок и спроси.
11. **Без story-only экспортов.** Ничего не экспортируй из компонента/foundation, чей единственный потребитель — story/тест. Story-only данные живут в story-файле (прецедент `Card` — данные каталога в `CatalogReference`).
12. **Пустые опциональные области не рендерятся** (пустой `label`/`error` = отсутствие).
13. **Без навыков в этом эксперименте** (см. 0.1 п.2).
14. **Проброс нативных атрибутов** с сохранением `className` (мерж с классом рецепта), `aria-*`, `data-*`, `id`, `name`, `type`, `value`, `defaultValue`, `onChange`, etc.
15. **Фокус-кольцо едино.** focus-visible outline как у `Button`: `outlineStyle: solid`, `outlineWidth: {borderWidths.thick}`, `outlineOffset: 0`, `outlineColor: semantic.brand.500.background`.

## 6. Критерии успеха

- `Input` доступен как самостоятельный компонент и следует организации модуля (компонент, preset, barrel, stories, тесты).
- Публичный API универсален: нативный `<input>` + `label`/`invalid`/`error`, без доменных полей.
- `invalid`/`error` корректно связывают a11y (`aria-invalid`, `aria-describedby`, `htmlFor`/`id`).
- `disabled` не активируется (native + рецепт), фокус-кольцо едино с `Button`.
- Пустые опциональные области не рендерятся.
- Референс `Input / Text` воспроизводится как Storybook-композиция в light и dark.
- `mise run check` и `mise run check:deps` зелёные; barrel учтён Knip.
- Закрытие — по прямой команде пользователя.

---

## Review Focus (входы, которые ломают работу)

1. **Пустой/пробельный `label` или `error`** → не рендерить `<label>`/`<p>` вовсе.
2. **`invalid` без `error`** → рамка негативная + `aria-invalid`, но без `<p>` и без `aria-describedby`.
3. **`error` без `invalid`** → ошибка скрыта, `aria-invalid` отсутствует.
4. **Потребительский `id`** → `htmlFor` и `aria-describedby` используют его, а не сгенерированный.
5. **`className`** → мержится с классом `control` рецепта, не заменяет его.
6. **Controlled/uncontrolled** → нет внутреннего состояния, `value`/`defaultValue`/`onChange` проброшены.

Каждый пункт закрыт тестом в Task 2 (composition) или Task 3 (browser).

---

## План реализации

### Task 0: Подготовка эксперимента (артефакты, до кода)

**Files:**
- Create: `outputs/experiments/input-component/README.md`
- Create: `outputs/experiments/input-component/plan.md`
- Create: `outputs/experiments/input-component/history.md`
- Create: `outputs/experiments/input-component/notes/design-spec.md`
- Create: `outputs/experiments/input-component/notes/execution-log.md`

- [ ] **Step 1: Создай ветку**

```bash
git checkout main && git pull && git checkout -b experiment/input-component
```

- [ ] **Step 2: Создай артефакты**

Создай файлы из таблицы 0.2. `README.md` — по образцу `card-component/README.md` (вопрос из раздела 1, классификация из 2, scope из 3, модель из 4, критерии из 6). `design-spec.md` — детали из раздела 4. `history.md` — первая запись «эксперимент открыт». `plan.md` — копия этого плана. `execution-log.md` — пустой скелет с заголовками «Решения / Проверки / Границы / Открытые вопросы».

- [ ] **Step 3: Коммит артефактов**

```bash
git add outputs/experiments/input-component
git commit -m "docs(input): open input-component experiment"
```

---

### Task 1: Визуальный рецепт и регистрация

**Files:**
- Create: `src/shared/components/input/preset.ts`
- Create: `src/shared/components/input/Input.test.ts`
- Modify: `src/shared/styles/index.ts`
- Modify: `src/shared/styles/presets.test.ts`

**Interfaces:**
- Consumes: `definePreset`, `defineSlotRecipe`, foundation/semantic токены.
- Produces: `inputRecipe`, `inputPreset`, сгенерированный `input()` со слотами `root/label/control/error`.

- [ ] **Step 1: Падающий контрактный тест рецепта**

Создай `Input.test.ts` по образцу `Button.test.ts`. Скопируй `bannedShorthands` и рекурсивный `collectKeys` из `Button.test.ts`. Тесты:

```ts
import { describe, expect, test, } from "bun:test";
import { inputRecipe, } from "./preset";

describe("input recipe", () => {
    test("declares the anatomy", () => {
        expect(inputRecipe.slots).toEqual([ "root", "label", "control", "error", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(inputRecipe.variants ?? {})).toEqual([ "invalid", ]);
        expect(Object.keys(inputRecipe.variants?.["invalid"] ?? {})).toEqual([ "true", ]);
    });

    test("declares default variants", () => {
        expect(inputRecipe.defaultVariants).toEqual({ invalid: false, });
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(inputRecipe)).not.toMatch(/_(light|dark)\b/);
    });

    test("uses no shorthand property names", () => {
        // bannedShorthands + collectKeys over base, variants, compounds
    });

    test("shares one focus ring with Button", () => {
        const control = inputRecipe.base?.["control"];
        expect(control).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        });
    });

    test("disabled control drops opacity and cursor", () => {
        const control = inputRecipe.base?.["control"];
        expect(control).toMatchObject({
            cursor: { _disabled: "not-allowed", },
            opacity: { _disabled: 0.45, },
        });
    });

    test("placeholder is muted via the background projection", () => {
        expect(inputRecipe.base?.["control"]?.["&::placeholder"]).toMatchObject({
            color: "semantic.common.500.background",
        });
    });

    test("invalid control uses the negative accent border", () => {
        const control = inputRecipe.variants?.["invalid"]?.["true"]?.["control"];
        expect(control).toMatchObject({ borderColor: "semantic.negative.600.background", });
    });

    test("composes label typography from foundation atoms", () => {
        expect(inputRecipe.base?.["label"]).toMatchObject({
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
        });
    });

    test("keeps typography out of the control and root", () => {
        for ( const slot of [ "control", "root", ] ) {
            for ( const property of [ "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
                expect(inputRecipe.base?.[slot]).not.toHaveProperty(property);
            }
        }
    });
});
```

- [ ] **Step 2: Убедись, что тест падает**

Run: `bun test src/shared/components/input/Input.test.ts`
Expected: FAIL (нет `./preset`).

- [ ] **Step 3: Реализуй рецепт и зарегистрируй**

Создай `preset.ts` в точности как в разделе 4.5. Обнови `src/shared/styles/index.ts`: импортируй и экспортируй `inputPreset`, добавь в `componentPresetSources`:

```ts
import { inputPreset, } from "../components/input/preset";
export const componentPresetSources: readonly Preset[] = [
    buttonPreset, buttonIconPreset, cardPreset, iconPreset, inputPreset,
];
```

Дополни `src/shared/styles/presets.test.ts` ожиданием `input` в итоговом наборе рецептов (RED → GREEN).

- [ ] **Step 4: Сгенерируй и проверь**

Run: `mise run gen && bun test src/shared/components/input/Input.test.ts`
Expected: генерация успешна, тесты рецепта PASS.

- [ ] **Step 5: Коммит**

```bash
git add src/shared/components/input/preset.ts src/shared/components/input/Input.test.ts src/shared/styles/index.ts src/shared/styles/presets.test.ts src/shared/styled-system
git commit -m "feat(input): add input visual recipe"
```

---

### Task 2: Компонент, barrel, Knip

**Files:**
- Create: `src/shared/components/input/input.tsx`
- Create: `src/shared/components/input/index.ts`
- Create: `src/shared/components/input/Input.composition.test.tsx`
- Modify: `knip.jsonc`

**Interfaces:**
- Consumes: сгенерированный `input()`, `cx`, React `useId`.
- Produces: `Input`, `InputProps`, `inputPreset`, `inputRecipe`.

- [ ] **Step 1: Падающие composition-тесты**

`Input.composition.test.tsx` на `renderToStaticMarkup` (образец `Button.composition.test.tsx`):

```tsx
import { renderToStaticMarkup, } from "react-dom/server";
import { describe, expect, test, } from "bun:test";
import { Input, } from "./input";

describe("Input composition", () => {
    test("links a label to the control and forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <Input label="Имя" name="name" type="text" placeholder="Как к вам обращаться" required />,
        );
        expect(markup).toContain("<label");
        expect(markup).toContain('for="');
        expect(markup).toContain("Имя");
        expect(markup).toContain('name="name"');
        expect(markup).toContain('type="text"');
        expect(markup).toContain('placeholder="Как к вам обращаться"');
        expect(markup).toContain("required");
    });

    test("omits the label element when label is absent or blank", () => {
        expect(renderToStaticMarkup(<Input />)).not.toContain("<label");
        expect(renderToStaticMarkup(<Input label="   " />)).not.toContain("<label");
    });

    test("invalid input sets aria-invalid and links the error via aria-describedby", () => {
        const markup = renderToStaticMarkup(<Input invalid error="Заполните поле" />);
        expect(markup).toContain('aria-invalid="true"');
        expect(markup).toContain('aria-describedby="');
        expect(markup).toContain("Заполните поле");
        expect(markup).toContain("<p");
    });

    test("error without invalid renders no message and no aria-invalid", () => {
        const markup = renderToStaticMarkup(<Input error="Заполните поле" />);
        expect(markup).not.toContain("aria-invalid");
        expect(markup).not.toContain("Заполните поле");
    });

    test("consumer id is reused for htmlFor and aria-describedby", () => {
        const markup = renderToStaticMarkup(<Input id="email" label="Email" invalid error="Нужен email" />);
        expect(markup).toContain('for="email"');
        expect(markup).toContain('id="email"');
        expect(markup).toContain('id="email-error"');
        expect(markup).toContain('aria-describedby="email-error"');
    });

    test("className is forwarded", () => {
        const markup = renderToStaticMarkup(<Input className="my-field" />);
        expect(markup).toContain("my-field");
    });

    test("rejects the size prop", () => {
        // @ts-expect-error size is not a public prop in v1
        <Input size="sm" />;
    });
});
```

- [ ] **Step 2: Убедись, что тесты падают**

Run: `bun test src/shared/components/input/Input.composition.test.tsx`
Expected: FAIL (нет `./input`).

- [ ] **Step 3: Реализуй компонент и barrel**

Создай `input.tsx` и `index.ts` в точности как в разделах 4.6 и 4.6. Зарегистрируй barrel в `knip.jsonc` (секция `entry`): добавь `"src/shared/components/input/index.ts",`.

- [ ] **Step 4: Проверь**

Run: `mise run gen && bun test src/shared/components/input && mise run check:types`
Expected: PASS.

- [ ] **Step 5: Коммит**

```bash
git add src/shared/components/input/input.tsx src/shared/components/input/index.ts src/shared/components/input/Input.composition.test.tsx knip.jsonc src/shared/styled-system
git commit -m "feat(input): add input component"
```

---

### Task 3: Storybook и browser-проверки

**Files:**
- Create: `src/shared/components/input/Input.stories.tsx`

**Interfaces:**
- Consumes: публичный `Input` API, `ThemeShell`-паттерн Button/Card.

- [ ] **Step 1: Stories и play-проверки**

`Meta<typeof Input>` с title `Components/Input`, fullscreen layout. Скопируй `ThemeShell` из `Button.stories.tsx`. Stories: `Playground`, `Reference`, `Minimal`, `Invalid`, `Disabled`, `Light`, `Dark`.

`Reference` (референс `Input / Text`): `label="ИМЯ"`, `placeholder="Как к вам обращаться"` — данные живут в story, не в компоненте.

Play-проверки (browser): `Reference` выставляет input с доступным именем `ИМЯ` и плейсхолдером; `Invalid` выставляет input с `aria-invalid="true"` и видимый текст ошибки; `Disabled` выставляет недоступный для ввода (disabled) input; `Light`/`Dark` выставляют input.

- [ ] **Step 2: Browser-тесты**

Run: `mise run test:browser`
Expected: PASS. Если assertion падает — исправь разметку/рецепт/story под спецификацию. Не добавляй варианты или headless-поведение.

- [ ] **Step 3: Осмотр**

Run: `mise run dev:storybook`
Expected: Storybook на `$STORYBOOK_URL`. Проверь `Components/Input` в light/dark: поле 50px, фокус-кольцо едино с Button, контент не обрезан, контраст читаем. Останови сервер.

- [ ] **Step 4: Коммит**

```bash
git add src/shared/components/input/Input.stories.tsx
git commit -m "docs(input): add input stories"
```

---

### Task 4: Интеграционная проверка

**Files:**
- Modify: только если проверка нашла нарушение спецификации.

- [ ] **Step 1: Регенерация**

Run: `mise run gen`
Expected: без ошибок.

- [ ] **Step 2: Фокусные тесты**

Run: `bun test src/shared/components/input`
Expected: PASS.

- [ ] **Step 3: Quality gate и зависимости**

Run: `mise run check && mise run check:deps`
Expected: lint, types, format, asset drift, unit/browser, Knip — PASS.

- [ ] **Step 4: Коммит правок при необходимости**

Run: `git status --short`
Expected: без незакоммиченных изменений. Если есть verification-правки — закоммить `chore(input): verify input integration`.

---

## Self-Review (план)

- **Покрытие spec:** Task 1 — рецепт/регистрация/слоты; Task 2 — публичный API, a11y, проброс атрибутов, пустые области, Knip; Task 3 — stories/browser; Task 4 — все проверки.
- **Без заполнителей:** точные пути, токены, код, команды, ожидаемые результаты.
- **Согласованность типов:** `InputProps`, `inputRecipe`, `inputPreset`, слоты `root/label/control/error` — едины.
- **Review Focus:** пункты 1–6 закрыты composition-тестами Task 2 и browser-проверками Task 3.

## Условия завершения (НЕ закрытие)

- Все задачи выполнены, `mise run check` и `check:deps` зелёные, ветка закоммичена.
- `notes/execution-log.md` заполнен (решения, отклонения, границы проверенного, открытые вопросы).
- `notes/results.md` написан (итоги + оценка автономности по образцу `card-component/notes/results.md`).
- **Эксперимент НЕ закрывается и ветка НЕ вливается.** Дождись явной команды пользователя.
