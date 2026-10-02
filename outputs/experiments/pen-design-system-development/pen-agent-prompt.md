# Промпт для Pen-агента: component-first documentation system

Рефакторизуй существующий `.pen`-документ в component-first documentation system.

Не создавай новую дизайн-систему и не удаляй существующие tokens, reusable masters, component instances, landing pages или user content. Используй Move, Update, Copy и существующие reusable components. Цель — не изменить визуальный язык, а сделать документацию компонентов понятной, локальной и масштабируемой.

# Цель

Сейчас информация о компонентах разделена между:

- masters;
- component specimens;
- глобальным state catalogue;
- landing examples.

Нужно перестроить canvas так, чтобы **каждый компонент имел собственный самостоятельный documentation frame**. Внутри него должны находиться назначение, anatomy, variants, states, темы, правила использования и examples.

---

# 1. Сначала исследуй существующий документ

1. Прочитай:
   - variables;
   - reusable masters;
   - existing category frames;
   - component specimens;
   - state catalogue;
   - landing screen frames.

2. Зафиксируй, какие components уже существуют как reusable masters.

3. Не создавай дубликаты существующих masters.

4. Если component уже существует, перемещай или переиспользуй его current documentation/specimens внутри нового component documentation frame.

5. Сохрани:
   - Foundation;
   - light/dark semantic variables;
   - existing components;
   - landing desktop/tablet/mobile;
   - existing dark previews;
   - existing visual language.

---

# 2. Новая root-level структура

В document root должны находиться только следующие major frames:

```text
01 Foundation
02 Components — Overview
03 Components — State model
04 Components — Actions
05 Components — Forms & selection
06 Components — Navigation & disclosure
07 Components — Overlays
08 Components — Feedback & status
09 Components — Content & data
10 Landing — desktop
11 Landing — tablet
12 Landing — mobile
```

Не оставляй в root отдельно:

- `Masters`;
- `Button specimens`;
- `Inputs`;
- `Selection controls`;
- `Actions`;
- `Form controls states`;
- `Navigation states`;
- `Overlays states`;
- `Data display states`;
- отдельные component examples;
- отдельные Hero, Header, Footer или landing sections.

Все такие frames должны быть вложены в соответствующие category, component или landing frames.

Все nodes должны сохранить понятные names.

---

# 3. Foundation

Сохрани `01 Foundation` как единый documentation frame.

Он должен содержать:

```text
01 Foundation
├── Foundation — Header
├── Foundation — Primitive palette
├── Foundation — Semantic matrix
├── Foundation — Typography
├── Foundation — Spacing & sizing
├── Foundation — Shape & effects
├── Foundation — Icon size scale
├── Foundation — Theme comparison
└── Foundation — Legend
```

Не переносить в Foundation компонентные states и component examples.

---

# 4. Components — Overview

Создай или переработай `02 Components — Overview`.

Это навигационный frame, а не gallery и не state catalogue.

Содержимое:

```text
02 Components — Overview
├── Title and purpose
├── How to use this design system
├── Component taxonomy
├── Actions
├── Forms & selection
├── Navigation & disclosure
├── Overlays
├── Feedback & status
├── Content & data
└── Navigation map to component documentation frames
```

Для каждого компонента покажи:

- component name;
- короткое назначение;
- его category;
- визуальную ссылку/стрелку/указатель на конкретный component documentation frame.

Не дублируй здесь variants, state matrices и anatomy.

---

# 5. Components — State model

Создай компактный `03 Components — State model` сразу после Component Overview.

Он объясняет общую терминологию, но не показывает конкретные реализации Button, Input, Dialog и других компонентов.

Содержимое:

```text
03 Components — State model
├── Public variants
├── System context
│   └── theme: light / dark
├── Behavior states
│   └── disabled / loading / invalid / selected / open
├── Interaction conditions
│   └── hover / active / focus-visible
├── Precedence
│   └── theme → hover → focus-visible
├── Disabled behavior
├── Loading behavior
├── Focus-visible guidance
└── State applicability by component type
```

Добавь компактную таблицу:

| Component class | Required visual states |
|---|---|
| Pressable actions | default, hover, active, focus-visible, disabled |
| Async actions | plus loading |
| Form controls | default, filled, hover, focus-visible, disabled, read-only where relevant, invalid |
| Selection controls | selected/checked, unselected, focus-visible, disabled |
| Disclosure/overlay triggers | closed, hover, focus-visible, open, disabled |
| Passive status/display | only applicable variants; do not invent hover/active |

Не размещай тут реальные Button, Input, Select или Dialog state matrices.

---

# 6. Component category structure

Каждая category — самостоятельный top-level frame.

Внутри category сначала находится overview, далее — отдельный frame для каждого компонента.

## 6.1 Components — Actions

```text
04 Components — Actions
├── Components — Actions — Overview
├── Components — Actions — Button
├── Components — Actions — Icon Button
├── Components — Actions — Toggle
└── Components — Actions — Toggle Group
```

### Components — Actions — Overview

Покажи:

- что относится к action-компонентам;
- hierarchy: primary / secondary / ghost / destructive;
- Button vs Icon Button;
- Toggle vs Switch;
- общие правила disabled;
- общие правила loading;
- общие правила focus-visible;
- ссылки на component documentation frames.

`Link` не должен быть в Actions: он относится к Navigation & disclosure.

## 6.2 Components — Forms & selection

```text
05 Components — Forms & selection
├── Components — Forms & selection — Overview
├── Components — Forms & selection — Field
├── Components — Forms & selection — Text Input
├── Components — Forms & selection — Textarea
├── Components — Forms & selection — Number Input
├── Components — Forms & selection — Checkbox
├── Components — Forms & selection — Radio Group
├── Components — Forms & selection — Switch
├── Components — Forms & selection — Slider
├── Components — Forms & selection — Select
├── Components — Forms & selection — Multi Select
├── Components — Forms & selection — Date Input
├── Components — Forms & selection — Date Picker
├── Components — Forms & selection — Pin Input
├── Components — Forms & selection — File Upload
├── Components — Forms & selection — Color Picker
├── Components — Forms & selection — Rating
├── Components — Forms & selection — Editable
└── Components — Forms & selection — Segmented Control
```

## 6.3 Components — Navigation & disclosure

```text
06 Components — Navigation & disclosure
├── Components — Navigation & disclosure — Overview
├── Components — Navigation & disclosure — Link
├── Components — Navigation & disclosure — Top Navigation
├── Components — Navigation & disclosure — Sidebar Navigation
├── Components — Navigation & disclosure — Breadcrumbs
├── Components — Navigation & disclosure — Tabs
├── Components — Navigation & disclosure — Accordion
├── Components — Navigation & disclosure — Menu
├── Components — Navigation & disclosure — Context Menu
├── Components — Navigation & disclosure — Pagination
├── Components — Navigation & disclosure — Steps
├── Components — Navigation & disclosure — Tree View
└── Components — Navigation & disclosure — Carousel
```

## 6.4 Components — Overlays

```text
07 Components — Overlays
├── Components — Overlays — Overview
├── Components — Overlays — Tooltip
├── Components — Overlays — Popover
├── Components — Overlays — Hover Card
├── Components — Overlays — Dialog
├── Components — Overlays — Alert Dialog
├── Components — Overlays — Drawer
├── Components — Overlays — Sheet
├── Components — Overlays — Floating Panel
└── Components — Overlays — Tour
```

## 6.5 Components — Feedback & status

```text
08 Components — Feedback & status
├── Components — Feedback & status — Overview
├── Components — Feedback & status — Alert
├── Components — Feedback & status — Toast
├── Components — Feedback & status — Badge
├── Components — Feedback & status — Tag
├── Components — Feedback & status — Status Indicator
├── Components — Feedback & status — Progress
├── Components — Feedback & status — Spinner
├── Components — Feedback & status — Skeleton
└── Components — Feedback & status — Empty State
```

`Tag` может иметь две documented modes:

- static status tag;
- selectable/removable tag.

Если Tag работает как value input, сделай ссылку на Forms & selection, но не создавай второй master.

## 6.6 Components — Content & data

```text
09 Components — Content & data
├── Components — Content & data — Overview
├── Components — Content & data — Icon
├── Components — Content & data — Avatar
├── Components — Content & data — Card
├── Components — Content & data — Statistic
├── Components — Content & data — Data Table
├── Components — Content & data — List
├── Components — Content & data — Timeline
├── Components — Content & data — Clipboard
├── Components — Content & data — Code Block
├── Components — Content & data — Scroll Area
├── Components — Content & data — Splitter
├── Components — Content & data — Media Placeholder
├── Components — Content & data — QR Code
└── Components — Content & data — Divider
```

---

# 7. Шаблон documentation frame для каждого компонента

Каждый компонент должен иметь свой самостоятельный frame.

Используй одинаковую структуру, если конкретный раздел применим:

```text
Components — <Category> — <Component>
├── Header
│   ├── Component name
│   ├── Short purpose
│   └── Status if relevant
├── Usage
│   ├── Use when
│   └── Do not use when
├── Anatomy
│   ├── Annotated master component
│   └── Named parts
├── Public variants
│   ├── Variant names
│   └── Default specimens
├── State contract
│   ├── Required states
│   ├── State matrix
│   └── Explicitly unsupported states, if any
├── Theme comparison
│   ├── Light
│   └── Dark
├── Content & interaction rules
├── Accessibility contract
└── Composition examples
```

Не добавляй пустые разделы. Например:

- Divider не требует state matrix.
- Badge не требует hover/active, если он не интерактивный.
- Spinner не требует disabled.
- Dialog требует anatomy, open state, focus-visible actions и destructive variant.
- Form controls требуют validation examples.

---

# 8. Button: обязательный пример полной документации

`Components — Actions — Button` должен стать образцом для остальных компонентов.

## 8.1 Purpose

Объясни:

- Button запускает действие;
- Link используется для перехода;
- Icon Button допустим только при понятной icon semantics и accessible label;
- destructive tone используется только для необратимых действий.

## 8.2 Anatomy

Покажи и подпиши:

```text
root
prefix icon
label
suffix icon
loading indicator
```

## 8.3 Public variants

Покажи в default state:

- tone: primary, secondary, ghost, destructive;
- size: sm, md;
- width: hug, full;
- icon placement: none, prefix, suffix;
- icon-only composition через Icon Button, а не через скрытый Button variant.

## 8.4 State contract

Создай две отдельные state matrices: light и dark.

Для каждой theme:

- столбцы: primary, secondary, ghost, destructive;
- строки:
  - default;
  - hover;
  - active;
  - focus-visible;
  - disabled;
  - loading.

Каждая ячейка — instance Button с соответствующим tone и state.

Не показывай states только для primary. Secondary, ghost и destructive обязаны иметь тот же полный visual contract.

## 8.5 Interaction and accessibility

Покажи:

- focus-visible ring;
- disabled suppresses hover/active;
- loading сохраняет layout;
- destructive action имеет понятный label;
- icon-only action требует accessible label и/или tooltip.

## 8.6 Composition examples

Покажи:

- form actions;
- dialog actions;
- destructive confirmation;
- landing CTA;
- compact toolbar.

---

# 9. State contracts для других component classes

## Pressable actions

Для Icon Button, Toggle и Toggle Group покажи применимые:

- default;
- hover;
- active where relevant;
- focus-visible;
- pressed/selected where relevant;
- disabled;
- loading only where it действительно поддерживается.

## Form controls

Для Text Input, Textarea, Number Input, Select и Date Input покажи:

- empty/default;
- placeholder;
- filled;
- hover;
- focus-visible;
- disabled;
- read-only where relevant;
- invalid;
- required;
- valid only where it is useful.

Для Checkbox:

- unchecked;
- checked;
- indeterminate;
- hover;
- focus-visible;
- disabled;
- invalid.

Для Radio Group:

- unselected;
- selected;
- hover;
- focus-visible;
- disabled;
- invalid.

Для Switch:

- off;
- on;
- hover;
- focus-visible;
- disabled.

Для Select, Menu, Context Menu, Date Picker, Popover:

- closed trigger;
- trigger hover;
- trigger focus-visible;
- open;
- item default;
- item hover;
- item selected where applicable;
- item disabled;
- invalid where applicable.

## Navigation and disclosure

Tabs:

- inactive;
- hover;
- active;
- focus-visible;
- disabled.

Accordion:

- closed;
- trigger hover;
- trigger focus-visible;
- open;
- disabled.

Pagination:

- default;
- hover;
- current;
- disabled previous;
- disabled next.

## Overlays

Dialog and Alert Dialog:

- trigger default;
- trigger hover;
- trigger focus-visible;
- open;
- focus-visible action;
- disabled action;
- destructive action where relevant.

## Feedback and passive components

Не добавляй неестественные interaction states.

Например:

- Badge: tone, appearance, size;
- Spinner: size;
- Skeleton: shape;
- Divider: appearance;
- Status Indicator: status tone;
- Progress: empty, in-progress, complete, error;
- Empty State: default and compact.

---

# 10. Landing pages

Сохрани и не перестраивай без необходимости:

```text
10 Landing — desktop
11 Landing — tablet
12 Landing — mobile
```

Каждый screen frame обязан сохранять:

- correct fixed width;
- light theme;
- `clip: true`;
- dark preview;
- responsive structure;
- instances reusable components.

После перемещения component documentation не оставляй landing Header, Hero, CTA или Footer в root.

---

# 11. Проверка

Перед завершением:

1. Проверь, что в root находятся только 12 major frames.
2. Проверь, что у каждого компонента есть отдельный documentation frame.
3. Проверь, что component states больше не существуют отдельной глобальной галереей.
4. Проверь, что `03 Components — State model` содержит только общую модель состояний.
5. Проверь, что Button имеет полный tone × state contract:
   - primary;
   - secondary;
   - ghost;
   - destructive;
   - в light и dark.
6. Проверь, что states каждого компонента соответствуют его природе, а не добавлены механически.
7. Проверь, что все component frames используют existing reusable masters и instances.
8. Проверь, что нет duplicated masters.
9. Проверь отсутствие clipping, collapsed layout и horizontal overflow.
10. Проверь читаемость text, focus rings, borders и controls в обеих темах.
11. Сделай screenshots:
    - `02 Components — Overview`;
    - `03 Components — State model`;
    - `04 Components — Actions`;
    - `05 Components — Forms & selection`;
    - `06 Components — Navigation & disclosure`;
    - `07 Components — Overlays`;
    - `08 Components — Feedback & status`;
    - `09 Components — Content & data`;
    - desktop, tablet и mobile landing screens.
