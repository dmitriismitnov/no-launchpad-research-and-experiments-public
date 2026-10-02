# Спецификация: эксперимент Pencil × OpenCode workflow

**Статус:** proposed — ожидает user review.

## 1. Контекст и вопрос

Предыдущий эксперимент подтвердил, что Pen и OpenCode полезны для
component-first документации, semantic contrast audit, icon inventory и
responsive compositions. Он не подтвердил, что OpenCode может предсказуемо
управлять Pencil через MCP достаточно автономно, чтобы создавать качественные
макеты без canvas-мусора и шаблонного «AI slop».

Этот эксперимент проверяет workflow, а не реализацию продукта: способен ли
project-local OpenCode skill организовать Pencil MCP работу с существующей
дизайн-системой, изолированными артефактами, проверками, subagent reviews,
persistent state и управляемым восстановлением после остановки сессии.

## 2. Гипотеза

OpenCode может использовать Pencil MCP и встроенные Pencil-инструкции для
создания нового dashboard flow, визуально согласованного с существующей
дизайн-системой, если workflow:

- сначала читает code-side и Pen-side contracts;
- ограничивает Pencil mutations isolated experiment document;
- документирует план, операции и evidence вне conversation context;
- делегирует независимые read-only reviews узким subagents;
- отделяет механические проверки от human visual judgment;
- останавливается на явном checkpoint до потери контекста.

## 3. Benchmark

### 3.1. Design scenario

Новый flow **«Создание проекта»** в существующем dashboard.

Обязательные поля:

- название;
- краткое описание;
- владелец;
- срок.

Обязательные состояния/исходы:

- entry point из Projects;
- required-field validation;
- отмена;
- отправка;
- success state с появлением созданного проекта в Projects.

### 3.2. Scope

В рамках:

- отдельная копия Pen-документа для benchmark;
- Pen-first, code-aware composition;
- чтение существующих React/PandaCSS presets, tokens, components, icon assets,
  tests и Pen contracts как источников истины;
- создание локальных frames/screens и их evidence;
- создание project-local OpenCode skill и persistent experiment artifacts;
- структурные, contrast, code-alignment и visual reviews.

Вне рамок:

- изменение React/PandaCSS или production behavior;
- изменение исходного `design_system_ex_1.pen`;
- изменение foundation tokens, reusable masters, public components или icon set;
- production-ready implementation Create Project flow;
- motion/effects research, кроме наблюдений о качестве Pencil workflow.

## 4. Boundaries и ownership

| Объект                                       | Режим                                       | Владелец                    |
| -------------------------------------------- | ------------------------------------------- | --------------------------- |
| Исходный Pen design-system document          | read-only reference                         | существующая дизайн-система |
| `artifacts/create-project.pen`               | единственный writable Pen benchmark         | эксперимент                 |
| `src/` и PandaCSS contracts                  | read-only source of truth                   | кодовая база                |
| Persistent experiment files                  | writable                                    | orchestrator                |
| `.opencode/skills/pencil-design-experiment/` | writable после approval implementation plan | эксперимент                 |

Локальные, обратимые Pencil edits внутри approved experiment frame допустимы
без отдельного подтверждения. Создание/изменение reusable master, token,
глобальной canvas structure или любого source-of-truth артефакта требует
явного user gate.

## 5. Persistent artifacts

После утверждения implementation plan создаётся:

```text
outputs/experiments/pencil-opencode-workflow/
├── README.md
├── roadmap.md
├── todo.md
├── log.md
├── history.md
├── notes/
│   ├── design-brief.md
│   ├── benchmark-protocol.md
│   ├── review-report.md
│   └── results.md
└── artifacts/
    └── create-project.pen
```

- `roadmap.md` хранит фазы, decisions, gates и текущую checkpoint position.
- `todo.md` хранит атомарные задачи со статусами `planned`, `active`,
  `blocked`, `verified`.
- `log.md` хранит действия, даты, evidence, tool outputs, subagent role,
  model/variant и disposition каждого finding.
- `history.md` остаётся кратким human-readable journal.

## 6. OpenCode skill

Skill располагается по стандартному OpenCode V2 project-local пути:

```text
.opencode/skills/pencil-design-experiment/
├── SKILL.md
├── references/
│   ├── design-system-contract.md
│   ├── quality-rubric.md
│   ├── pencil-mcp-protocol.md
│   └── handoff-protocol.md
└── templates/
    ├── roadmap.md
    ├── todo.md
    └── log.md
```

`SKILL.md` должен:

1. описывать trigger и read-first protocol;
2. требовать загрузить встроенный Pencil skill и нужные Pencil references;
3. читать persistent state до планирования или mutation;
4. ограничивать Pencil changes isolated artifact;
5. определять gates, evidence и quality rubric;
6. описывать selective delegation read-only reviewers;
7. задавать checkpoint/handoff protocol;
8. требовать retrospective на основе evidence, а не впечатления.

Supporting files должны читаться только when needed, чтобы не увеличивать
контекст основного агента без необходимости.

## 7. Workflow

```text
bootstrap
→ code/Pen inventory and baseline
→ design brief and atomic plan
→ user gate
→ local Pencil mutations with immediate verification
→ independent reviews
→ evidence-based corrections
→ human visual review
→ retrospective and skill update
```

### 7.1. Bootstrap and baseline

До первых Pencil edits workflow создаёт persistent state, isolated Pen copy и
baseline record. Он фиксирует source documents, allowed frames, known reusable
components, token/theme contracts, icon assets и initial `ctx.problems` facts.

### 7.2. Mutation protocol

Каждая mutation должна быть привязана к одной atomic task и иметь ожидаемую
проверку. Перед изменением workflow сверяет scope. После завершения секции он
немедленно проверяет structure, clipping, resolved instances и screenshot;
не ждёт окончания всего макета.

### 7.3. Reviews

В findings должен быть evidence: файл/frame/node, observed fact, expected
contract, severity и recommended disposition. Orchestrator не принимает
subagent statement как proof без проверки факта в Pen/code/screenshot.

## 8. Roles и delegation

| Роль                      | Режим              | Ответственность                                                |
| ------------------------- | ------------------ | -------------------------------------------------------------- |
| Orchestrator              | primary            | persistent state, planning, allowed mutations, evidence, gates |
| Code-system auditor       | read-only subagent | actual code-side component/token/icon contracts                |
| Pencil structural auditor | read-only subagent | refs, variables, resolved fills, clipping, node structure      |
| Visual reviewer           | read-only subagent | hierarchy, readability, composition, anti-slop rubric          |
| Human reviewer            | user               | final visual and scope decision                                |

Модельный contract фиксирован для этого эксперимента: implementation workers
используют `deepseek/deepseek-flash` (DeepSeek V4.1 Flash), а текущий primary
agent `openai/gpt-5.6-terra` выполняет planning, orchestration, evidence
verification и все reviews. В `log.md` фиксируются exact model/variant и роль.
Workers не проводят review и не запускают других subagents.

## 9. Quality gates

### Gate A — readiness

- isolated Pen artifact существует;
- design brief и acceptance criteria утверждены;
- code/Pen contracts и baseline зафиксированы.

### Gate B — before mutation

- задача есть в `todo.md` и атомарна;
- target находится внутри approved experiment scope;
- master/token/global mutation отсутствует;
- verification method известен до запуска.

### Gate C — per section

- `ctx.problems` не содержит clipping или collapsed layout;
- root не загрязнён leaf nodes;
- existing refs/assets/tokens используются вместо substitutes;
- text hierarchy, boundaries и contrast проверены на actual resolved fills;
- focused screenshot сохранён как review evidence.

### Gate D — before human review

- flow покрывает все required fields и outcomes;
- findings классифицированы как `PASS`, `FAIL`, `INFO` или `HUMAN REVIEW`;
- mechanical checks завершены;
- unresolved aesthetic trade-offs явно вынесены пользователю.

## 10. Quality rubric

Mechanical checks:

- existing semantic tokens, theme contexts, component refs и icon assets;
- absence of duplicate masters, hardcoded substitutes и unintended global edits;
- clipping, layout integrity, contrast and component-role contracts;
- functional reason for each container; no generic card wrapping by default.

Human visual checks:

- readable form hierarchy and scanning order;
- visible distinction between primary and secondary action;
- intentional composition rather than uniform generic grid;
- restrained, system-consistent effects and decoration;
- coherence with the established dashboard language.

## 11. Context checkpoint and handoff

OpenCode compaction is lossy, therefore it is not the source of truth.
Before a new major phase, large inspection result, subagent fan-out or Pencil
mutation, orchestrator evaluates whether it can safely complete the next atomic
operation with current context.

When it cannot:

1. finish only the current safe atomic operation;
2. update `roadmap.md`, `todo.md` and `log.md` with evidence;
3. do not start a new subagent or Pencil mutation;
4. choose autonomously between manual compaction and a clean-session handoff;
5. for compaction, request it at the safe point, log the request/result and continue after completion;
6. for a clean session, emit a handoff containing objective, completed work, active task, blockers, exact next action and files, then end the current run without asking the user to select a mode.

The same protocol is used proactively at phase boundaries; it must not wait for
a context-limit failure. The user receives no compaction-mode question; only a
final benchmark review requires human input.

## 12. Success and failure criteria

The experiment succeeds when:

- the agent creates and uses persistent state without hidden decisions;
- Create Project flow is composed in the isolated Pen copy from existing design
  system contracts;
- structural, contrast and code-alignment reports are reproducible evidence;
- at least one checkpoint/handoff is resumed in a new session without material
  loss of work state;
- independent reviews are executed and their findings verified or rejected with
  evidence;
- the user accepts the final visual review;
- the resulting project-local skill can be loaded and followed for a comparable
  future task.

The experiment is partially or fully unsuccessful if Pencil MCP lacks required
observability/control, persistent artifacts cannot restore work, rubric misses
obvious visual failures, or the agent requires continual manual microcommands
to avoid canvas clutter.

## 13. Verification

This documentation change is verified by:

- Markdown format check through `mise run check` before committing;
- review of the spec for placeholders, contradictory boundaries and ambiguous
  success criteria;
- explicit user approval before invoking `writing-plans`.
