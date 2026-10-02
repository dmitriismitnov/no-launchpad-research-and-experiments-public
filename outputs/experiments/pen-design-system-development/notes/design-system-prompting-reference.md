# Design-system prompting reference for Pen

**Статус:** рабочая база для будущего skill; не является самим skill.

## Назначение

Документ фиксирует решения, принятые при проектировании и ревью двутемной дизайн-системы в Pen. Он нужен будущему агенту для подготовки точных промптов на создание или рефакторинг Pen-документа. Это не заменяет PandaCSS-реализацию и runtime-поведение компонентов.

## 1. Границы Pen

Pen — visual design и documentation layer. В нём проектируются и проверяются:

- variables, primitive и semantic tokens, theme axis;
- reusable masters и instances;
- anatomy, public variants и статические visual states;
- canvas hierarchy, light/dark specimens и responsive screens;
- clipping, выравнивание, token references и contrast audit.

Pen не является источником React API, PandaCSS recipes, generated output, browser state machines, keyboard handlers, ARIA-атрибутов, focus management или motion implementation. Accessibility в Pen существует как visual contract: focus ring, accessible name requirement, видимые состояния и anatomy.

## 2. Ownership architecture

| Слой | Владеет |
| --- | --- |
| Settings | Document-level policy: preflight и global CSS |
| Foundation | Tokens и system contexts |
| Component | Anatomy, public variants, visual rules, published states |
| Application/screen | Активирует context и собирает components |

Не допускаются global component-family overrides, отдельные light/dark копии компонентов, скрытая inheritance и общие styles, изменяющие чужие компоненты. Theme задаётся на screen или themed-preview frame; reusable component использует theme-aware variables.

## 3. Canvas architecture

В document root находятся только major frames:

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

Нельзя оставлять в root отдельные `Header`, `Hero`, `Footer`, `Masters`, specimens или state galleries.

### Foundation

```text
01 Foundation
├── Foundation — Header
├── Foundation — Primitive palette
├── Foundation — Semantic matrix
├── Foundation — Semantic contrast audit
├── Foundation — Typography
├── Foundation — Spacing & sizing
├── Foundation — Shape & effects
├── Foundation — Icon size scale
├── Foundation — Theme comparison
└── Foundation — Legend
```

### Components overview и state model

`02 Components — Overview` — навигационное оглавление: имя, назначение, категория и ссылка на documentation frame. Оно не дублирует variants, anatomy или states.

`03 Components — State model` — короткий общий словарь:

- public variants;
- system context `theme: light | dark`;
- behavior states: `disabled`, `loading`, `invalid`, `selected`, `open`;
- interaction conditions: `hover`, `active`, `focus-visible`;
- precedence `theme → hover → focus-visible`;
- disabled/loading/focus rules и state applicability by component class.

Конкретные state matrices живут только в documentation frame компонента.

## 4. Foundation vocabulary

### Primitive tokens

Foundation содержит immutable palette families `neutral`, `blue`, `green`, `red`, `sky`, `cyan`; steps `50…950`; spacing/sizes; typography atoms; radii; border widths и shadows. Palette не зависит от theme. Semantic layer сопоставляет primitive values с light/dark context.

### Текущая semantic model

```text
semantic.<group>.<step>.background
semantic.<group>.<step>.text
semantic.<group>.<step>.icon
semantic.<group>.<step>.border.subtle
semantic.<group>.<step>.border.strong
semantic.<group>.<step>.divider
```

Groups: `common`, `occasional`, `rare`, `brand`, `positive`, `negative`. Values theme-aware и ссылаются на primitive palette.

### Согласованная целевая border model

Contrast audit выявил, что единый `border` не может одновременно быть мягкой structural line и functional control boundary. Для следующего builder-шага принята целевая модель:

```text
semantic.<group>.<step>
├── background
├── text
├── icon
├── border
│   ├── subtle
│   └── strong
└── divider
```

Миграция применена и verified: старый `border` удалён после переноса потребителей; aliases не оставлены.

| Token | Роль | Contract |
| --- | --- | --- |
| `text` | Контентный текст | `text/background ≥ 4.5:1` |
| `icon` | Значимая UI-иконка | `icon/background ≥ 3:1` |
| `border.subtle` | Декоративная/структурная граница | Нет фиксированного WCAG threshold |
| `border.strong` | Functional control boundary | `strong/background ≥ 3:1` |
| `divider` | Layout separator | Нет фиксированного WCAG threshold |

Для canonical same-group/same-step pair обязательна hierarchy:

```text
contrast(divider, background)
< contrast(border.subtle, background)
< contrast(border.strong, background)
```

Не вводить `quiet / standard / loud` одновременно для border и divider: такая матрица раздувается и создаёт семантически неясные пересечения. Визуально громче `border.strong` — это отдельная роль: focus, selected, invalid или positive/negative state.

### Contrast audit

Audit проверяет только canonical:

```text
same group × same step × same theme
```

Он не гарантирует mixed groups/steps: такие сочетания валидирует component recipe. В обеих темах audit обязан проверить все 66 pairs:

```text
text / background ≥ 4.5:1
icon / background ≥ 3:1
border.strong / background ≥ 3:1
divider < border.subtle < border.strong
```

`border.subtle` показывает ratio как diagnostic value, но не получает PASS/FAIL по WCAG threshold.

До миграции audit показал её причину: text/icon проходили не все contexts, старый `border ≥ 3:1` проходил только 3 из 66 contexts каждой темы, а divider hierarchy не была полной инвариантой. После миграции canonical contracts проходят во всех 132 theme-aware contexts.

## 5. Component taxonomy

Классифицировать компоненты нужно по пользовательскому намерению.

| Category | Components |
| --- | --- |
| Actions | Button, Icon Button, Toggle, Toggle Group |
| Forms & selection | Field, Input, Textarea, Number Input, Checkbox, Radio Group, Switch, Slider, Select, Multi Select, Date controls, Pin Input, File Upload, Color Picker, Rating, Editable, Segmented Control |
| Navigation & disclosure | Link, navigations, Breadcrumbs, Tabs, Accordion, Menu, Context Menu, Pagination, Steps, Tree View, Carousel |
| Overlays | Tooltip, Popover, Hover Card, Dialog, Alert Dialog, Drawer, Sheet, Floating Panel, Tour |
| Feedback & status | Alert, Toast, Badge, Tag, Status Indicator, Progress, Spinner, Skeleton, Empty State |
| Content & data | Icon, Avatar, Card, Statistic, Data Table, List, Timeline, Clipboard, Code Block, Scroll Area, Splitter, Media Placeholder, QR Code, Divider |

`Link` — navigation, не action. `Switch` — form value, не Toggle. `Tag` может быть статичным marker или selectable/removable value; master не дублируется.

Каждая category начинается с overview: правила выбора компонента, общая иерархия и ссылки на documentation frames. Overview не дублирует component matrices.

## 6. Component documentation frame

Каждый компонент получает независимый frame:

```text
Components — <Category> — <Component>
├── Header
├── Usage: Use when / Do not use when
├── Anatomy: annotated master и named parts
├── Public variants
├── State contract
├── Theme comparison
├── Content & interaction rules
├── Accessibility contract
└── Composition examples
```

Неприменимые sections не добавляются искусственно. Passive component не должен получать hover, active, disabled или loading только ради симметрии.

## 7. Variants, states и contexts

| Категория | Кто активирует | Примеры |
| --- | --- | --- |
| Public variants | Designer/consumer | tone, size, appearance, orientation |
| System contexts | Application/environment | theme |
| Behavior states | Runtime/business logic | disabled, loading, invalid, selected, open |
| Interaction conditions | Platform | hover, active, focus-visible |

Theme никогда не становится public variant. Не строить полный декартов продукт: variants section показывает static choices, state matrix — только meaningful `variant × state`, theme comparison — важные states в light/dark.

| Component class | Required visual states |
| --- | --- |
| Pressable action | default, hover, active, focus-visible, disabled |
| Async action | То же + loading |
| Text-like form control | empty, placeholder, filled, hover, focus-visible, disabled, read-only where relevant, invalid |
| Selection control | selected/checked, unselected, focus-visible, disabled; Checkbox также indeterminate |
| Disclosure/overlay | closed trigger, hover, focus-visible, open, item states, disabled |
| Passive display | Только применимые variants/states |

## 8. Button как эталон

Button documentation frame обязан содержать anatomy:

```text
root / prefix icon / label / suffix icon / loading indicator
```

Public variants:

```text
tone: primary | secondary | ghost | destructive
size: sm | md
width: hug | full
icon placement: none | prefix | suffix
```

Icon-only action оформляется через Icon Button.

В обеих темах нужен полный state matrix:

```text
Columns: primary | secondary | ghost | destructive
Rows: default | hover | active | focus-visible | disabled | loading
```

Недостаточно показать states только для primary. Focus-visible должен быть заметным; disabled подавляет hover/active; loading сохраняет layout; Icon Button требует accessible label и/или tooltip.

## 9. Responsive screens

```text
10 Landing — desktop: 1440px
11 Landing — tablet: 768px
12 Landing — mobile: 390px
```

Каждый screen: vertical layout, `clip: true`, `theme: light`, дочерние Header, Hero, Value strip, Features, Workflow, CTA, Footer; instances reusable components и компактный dark themed preview. Mobile адаптирует composition, а не только уменьшает desktop; touch targets не меньше 44px.

## 10. Builder prompt rules

Промпт для Pen-агента должен требовать:

1. Сначала читать variables, root frames и reusable masters.
2. Не перезаписывать user content и не дублировать masters.
3. Предпочитать Move/Update/Copy существующих nodes перед Insert.
4. Давать точную hierarchy с именами frames.
5. Отделять visual documentation от implementation claims.
6. Указывать state contracts по component class.
7. Явно задавать theme inheritance и screen dimensions.
8. Выполнять structural check через `Get` и `ctx.problems`.
9. Делать screenshots после готовности major section.
10. Давать отдельный migration plan, если меняются token paths.

Порядок хорошего prompt: inspect → foundation → hierarchy → masters/compositions → instances → audit → screenshots → verification.

## 11. Review checklist

### Canvas

- В root только запланированные major frames.
- Все nodes имеют понятные names.
- Повторяемый UI использует master + `ref`.
- Нет `partially clipped` или `fully clipped` nodes.
- Нет пустых технических root frames.
- Screens имеют корректную ширину, `clip: true` и theme.

### Design system

- Foundation variables не дублируются.
- Theme не реализована как duplicate component variant.
- Anatomy, variants и states находятся рядом в component frame.
- Global state model не дублирует individual matrices.
- States соответствуют природе компонента.
- Audit показывает реальные ratios и не скрывает failures.

### Review method

Сначала проверять структуру, variables, refs и `ctx.problems`; затем screenshots. Verified facts следует отделять от объяснений агента. Failure canonical same-step pair нельзя списывать на mixed-step usage.

## 12. Не принимать преждевременно

Без реального потребителя и отдельной проверки не добавлять в Foundation:

- runtime state machines;
- motion policy;
- density axis;
- component-family style layers;
- generic loud token levels;
- новый semantic domain без use case;
- PandaCSS API, dependencies или generated output.

## 13. Источники

- Проект: `AGENTS.md`, `.agents/project.md`, `wiki/panda-rules.md`, `wiki/component-axes-model.md`, `wiki/component-projection.md`.
- Foundation: `src/shared/styles/foundation/`.
- WCAG 2.2 SC 1.4.11: meaningful UI/state indicators требуют 3:1, но декоративная boundary не обязана быть contrast indicator; focus indicator должен быть различим.
- Ark UI/Zag: reference anatomy, component states и headless behavior.
- Atlassian, Carbon и Material: taxonomy, component documentation, surfaces и token usage.

## 14. Переход к будущему skill

До создания deployable skill этот reference нужно проверить по skill-authoring workflow: сформулировать pressure scenarios, увидеть baseline без skill, зафиксировать реальные failure modes, написать минимальный skill и повторить scenarios с ним. До этого документ остаётся источником решений, а не skill.


## 15. Component-role audit

Canonical rank audit проверяет token matrix, но не доказывает корректность реальных components. Поэтому каждый component frame получает `Token contract & audit` после `State contract` и перед `Theme comparison`. У passive component без `State contract` section располагается после `Public variants`.

Audit должен читать **resolved instances** и находить nearest actual resolved fill, включая `palette/*`, а не только ближайший ancestor с `semantic/*`. Игнорирование palette fill создало ложные CodeBlock failures в эксперименте.

Каждая audit row сначала классифицируется как `text`, `icon`, `functional-boundary`, `decorative-boundary`, `divider`, `focus-indicator` или `disabled-*`; только затем выбирается contract. Boundary/focus/divider никогда не ожидают `text/*`. `DISABLED / REVIEW` разрешён только у фактически disabled specimen и не является PASS.

Финальная проверка Pen не нашла enabled text pairs ниже 4.5:1, enabled icon pairs ниже 3:1 и enabled functional boundary/focus pairs ниже 3:1.

## 16. Assets — Icons

`Assets — Icons` — major root inventory между Foundation и component catalog. Он документирует **actual public icon keys и real code usage**, а не похожие иконки из внешней library. Повторяемые tiles должны быть refs одного local reusable tile master. Dynamic usages без доказуемого key становятся явной `Dynamic / unresolved` note.

## 17. Agent workflow и observability

Надёжный Pen workflow:

```text
inspect → constrained prompt → focused change → structure/variables/refs check
→ resolved-instance computation → focused screenshots → independent review
→ corrective prompt, if needed
```

Нельзя принимать agent report как evidence. Проверка обязана отделять visual assertion от raw document facts, проверять `ctx.problems`, root structure, refs, theme and token resolution. В больших systems visual layer следует держать отдельно от dense matrices, audits и libraries: иначе canvas становится плохо обозримым.

## 18. Responsive product compositions

Product screens — composition tests, не новый слой design system. Dashboard experiment добавил Login, Projects и Project detail для desktop/tablet/mobile в light/dark: 18 screens, assembled only from existing component refs. Theme задаётся screen context, а mobile меняет composition (например DataTable → Card/List), а не масштабирует desktop.

Подробнее: [`final-results.md`](final-results.md).
