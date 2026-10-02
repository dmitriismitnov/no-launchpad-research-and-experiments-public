# Итоги: разработка дизайн-системы в Pen

**Статус:** completed — 2026-10-02.

## Вопрос эксперимента

Может ли связка Pen и OpenCode преобразовать существующий большой canvas в
компонентную двутемную дизайн-систему, последовательно документировать её и
собирать новые product screens без локальных visual substitutes?

## Итог

**Гипотеза подтверждена частично.** Pen + OpenCode показали практическую
ценность для структуры canvas, Foundation, component documentation, contrast
analysis, icon inventory и responsive composition. Связка позволяет свести
inspect, builder prompt, structural review, visual screenshot review и
повторную проверку в единый workflow.

Полная автономность пока не подтверждена. Критичная следующая проверка —
сравнить качество и надёжность управления Pen через OpenCode/MCP с работой в
нативном интерфейсе Pen. Без предсказуемого управления и filesystem-backed
контрактов агент будет создавать труднообозримый canvas-мусор.

## Что планировалось

- Перестроить canvas в component-first documentation system.
- Сохранить reusable masters, instances, Foundation и landing screens.
- Поместить anatomy, variants, state contracts, theme comparison и usage рядом
  с конкретным компонентом.
- Сохранить глобальный State model только как словарь.
- Зафиксировать Button `tone × state` в light/dark.
- Ввести проверяемую semantic color model и contrast audit.
- Проверить, что компонентная система пригодна для responsive product screens.

## Что завершено

### Canvas и документация

- 16 named major root frames: Foundation, Assets — Icons, component catalog,
  State model, category frames, three landing screens и три dashboard groups.
- 66 самостоятельных component documentation frames.
- 82 reusable masters и 1,720 instances на финальной проверке.
- Button получил полный `tone × state` contract.
- Passive components не получили искусственных state matrices.
- `ctx.problems` не обнаружил partially/fully clipped nodes.

### Foundation и contrast

- Старый ambiguous `semantic/<group>/<step>/border` удалён.
- Введена semantic model:

  ```text
  semantic/<group>/<step>/
  ├── background
  ├── text
  ├── icon
  ├── border/subtle
  ├── border/strong
  └── divider
  ```

- Canonical contract проверяется для `6 groups × 11 steps × 2 themes`:

  ```text
  text/background ≥ 4.5:1
  icon/background ≥ 3:1
  border.strong/background ≥ 3:1
  divider < border.subtle < border.strong
  ```

- Финальный canonical audit: 132/132 contexts проходят каждый required
  contract.
- Role token values были скорректированы для primary/danger action states,
  functional boundaries, feedback borders и secondary/tertiary text.

### Component-role audit

- Каждый из 66 component frames получил `Token contract & audit`.
- Foundation получил `Foundation — Component-role contrast audit`.
- Audit анализирует resolved instances, а не только masters.
- Node сначала получает kind, и только затем expected contract:

  ```text
  text
  icon
  functional-boundary
  decorative-boundary
  divider
  focus-indicator
  disabled-text / disabled-icon / disabled-boundary
  ```

- Required statuses:

  ```text
  PASS
  FAIL
  INFO
  DISABLED / REVIEW
  ```

- На финальной проверке nearest actual fill (включая palette fills) не выявил
  enabled text pairs ниже 4.5:1 и enabled icon pairs ниже 3:1.
- `INFO` остаётся только для decorative boundary/divider; disabled rows не
  выдаются за PASS.

### Assets — Icons

- Добавлен root frame `Assets — Icons` между Foundation и component catalog.
- Inventory отражает все 17 public keys текущего icon manifest.
- Один reusable `Asset Icon Tile` и 17 refs; glyph geometry взята из canonical
  SVG assets, не заменена чужими библиотеками.
- Документация показывает usage count/consumers, dynamic/unresolved usages,
  usage contract и light/dark preview.

### Dashboard compositions

- Добавлены три major root groups:

  ```text
  13 Dashboard — Login
  14 Dashboard — Projects
  15 Dashboard — Project detail
  ```

- В каждом — Desktop/Tablet/Mobile × Light/Dark: 18 screen compositions.
- Projects использует DataTable на desktop/tablet и Card/List composition на
  mobile.
- Lifecycle зафиксирован так:

  ```text
  Draft → Active → Completed
                ↘ Paused → Active
  any status → Archived
  ```

- Покрыты static workflow specimens: add, edit, delete, archive, complete,
  pause и resume.
- Screens собраны из existing component instances без новых dashboard masters
  или token changes.

## Как велась работа с агентом

Устойчивым оказался цикл:

```text
inspect existing document/code
→ write constrained builder prompt
→ apply focused change
→ inspect structure and variables
→ resolve instances
→ recompute contracts independently
→ screenshot focused frames
→ classify findings
→ issue corrective prompt
→ repeat verification
```

### Что было важно в prompts

- Сначала требовать variables, root frames, masters и refs.
- Давать точные frame names, location и invariants.
- Запрещать duplicate masters, component copies, hardcoded hex и изменение
  несвязанных Foundation values.
- Формулировать acceptance checks как observable facts, а не как просьбу
  «сделать красиво».
- Требовать `ctx.problems`, screenshots и resolved-instance inspection.
- Исправлять source master/state override, а не отдельный случайный instance.

### Что не сработало с первого раза

1. **Canonical audit не равен component audit.**
   Green canonical matrix не гарантировала читаемость actual component pairs.

2. **Audit по ближайшему semantic ancestor давал ложные failures.**
   Например CodeBlock line на `$palette/blue/950` ошибочно сравнивалась с более
   внешней semantic surface. Корректное правило: брать nearest actual resolved
   fill, включая palette values.

3. **Role type нельзя выводить только из цвета.**
   Boundary, divider, focus и content имеют разные contracts. Boundary не может
   ожидать `text/*`; disabled нельзя назначать enabled specimen ради зелёного
   summary.

4. **Agent report не является доказательством.**
   Утверждение `0 FAIL` было принято только после независимого пересчёта
   resolved fills и проверки конкретных known failures.

5. **Большой canvas плохо обозрим глазами.**
   Полные matrices и index tables быстро становятся плотными. Нужны hierarchy,
   compact summaries, локальные failures и разделение visual/reference layers.

## Тонкие места и правила

### Visual layer vs system layer

Рекомендуемое canvas placement:

```text
верх / рядом с первичным маршрутом:
  Foundation overview
  Assets — Icons
  product screens и high-signal component examples

ниже / в отдельных category regions:
  full component documentation
  state matrices
  token contracts and audits
  masters/library frames
  exhaustive indexes
```

Полный audit не должен становиться основной visual gallery. В component frame
нужны contract, summary и failures; полный register остаётся в Foundation.

### Theme

- Theme — system context, не public component variant.
- Theme задаётся на screen/themed preview frame.
- Нельзя создавать light/dark copies masters.

### Token ownership

- Foundation владеет palette, semantic tokens и system contexts.
- Component владеет anatomy, public variants, visual states и expected token
  pairs.
- Screen владеет composition, но не переопределяет token semantics локально.

### Semantic roles

- `border.strong` — functional boundary, ≥3:1.
- `border.subtle` и `divider` — structural/diagnostic, не generic functional
  indicator.
- Focus — отдельная role `focus/ring`, не более яркий generic border.
- Functional feedback borders используют feedback border role, а не content
  foreground.

### Content hierarchy — следующая гипотеза

Текущая система доказала необходимость разделять boundary levels. Следующая
непроверенная гипотеза: согласованная hierarchy для content roles уменьшит
cross-rank usage внутри components:

```text
text: primary / secondary / note
icon: primary / secondary / note
```

Эти roles должны быть surface-aware, иметь явные contracts и не быть просто
произвольными palette steps. Это **backlog research**, не принятая текущая
Foundation migration.

### Assets

- Source SVG/icon manifest — источник истины для icon inventory.
- Inventory показывает actual public keys и real code usages.
- Не подменять project glyph похожей library icon.
- Dynamic icon usage должен быть видимым как unresolved, а не превращаться в
  выдуманный tile.

## Что отложено

- Effects, advanced shadows, motion и более глубокая visual language policy.
- Проверка паритета OpenCode/MCP управления Pen и нативного Pen UI.
- Filesystem-backed component descriptions, machine-readable contracts и
  автоматически запускаемые validators/planners.
- Исследование surface-aware `text`/`icon` hierarchy.
- Более удобная компоновка длинных inventories/audits и способы визуально
  выделять важное среди большого числа components.
- Реализация dashboard в React/PandaCSS; в эксперименте созданы только Pen
  compositions.
- Очистка четырёх legacy unnamed root refs, существовавших до работы и
  намеренно не затрагивавшихся.

## Границы эксперимента

Эксперимент в целом остался в границах visual system/documentation research:
не изменялись runtime behavior, raw assets, React/PandaCSS implementation или
production data model. Scope расширился от исходного component-first
рефакторинга до contrast/audit, asset inventory и dashboard compositions, но
все additions опирались на уже существующую дизайн-систему и были проверены
структурно.

Риск scope drift компенсировали explicit prompts, no-new-token/no-new-master
constraints и повторные independent reviews.

## Следующий эксперимент

Сначала проверить управляемость Pen из OpenCode/MCP против нативного UI на
одной ограниченной задаче с filesystem-backed contracts. Успехом будет
предсказуемая цепочка:

```text
component description file
→ OpenCode planning
→ Pen change
→ structural/contrast checks
→ reviewable report
```

Только после этого имеет смысл проектировать автономный workflow для большей
дизайн-системы.
