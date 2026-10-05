# Спецификация: Pencil CLI UI Kit experiment

**Статус:** proposed — ожидает user review.

## 1. Вопрос и гипотеза

Предыдущий эксперимент подтвердил, что Pencil MCP управляет только документом,
открытым в активном редакторе: `filePath` сам по себе не выбирает target. Этот
эксперимент проверяет, можно ли создать и активировать **новый чистый** `.pen`
документ без ручных действий в Pencil, используя CLI, а затем управлять им через
MCP.

Проверяются оба пути, независимо от успеха первого:

1. нативные CLI-команды Pencil для создания и открытия документа;
2. CLI-запуск Pencil в интерактивном headless-режиме с управлением через MCP.

Гипотеза подтверждена, если хотя бы один путь создаёт и активирует новый
`pencil-cli-ui-kit.pen` без ручной операции в UI, а MCP подтверждает этот файл
как active document перед mutation. Пользователь откроет GUI только для финальной
визуальной проверки.

## 2. Benchmark и scope

В новом документе создаётся небольшой UI Kit, основанный на кодовых контрактах
проекта:

- foundation: light/dark semantic color roles, typography, spacing, radii,
  borders, shadows и focus/interaction roles;
- reusable masters: `Button`, `ButtonIcon`, `Card`;
- showcase frame с вариантами и состояниями каждого master как evidence, а не
  отдельный компонент.

Foundation отражает `src/shared/styles/foundation/`: theme-conditions,
semantic colors, layout scales, shape и typography. Компоненты отражают их
текущие PandaCSS recipes:

- `Button`: primary, secondary, ghost, destructive; размеры и состояния из
  `src/shared/components/button/preset.ts`;
- `ButtonIcon`: та же tone vocabulary и square size contract;
- `Card`: raised/subtle boundary, default/plain/compact anatomy и focus role.

Canonical icon assets допускаются только из
`src/shared/components/icon/assets/svg/`. Изменение icon set запрещено.

## 3. Boundaries и явное разрешение

| Объект                                  | Режим                            | Владелец                |
| --------------------------------------- | -------------------------------- | ----------------------- |
| `src/`, PandaCSS presets, tokens, icons | read-only contract               | codebase                |
| Все существующие `.pen`                 | read-only                        | existing design systems |
| `artifacts/pencil-cli-ui-kit.pen`       | единственный writable Pen target | experiment              |
| Durable experiment state                | writable                         | orchestrator            |

Пользователь явно разрешает создание foundation, reusable masters и локальной
canvas structure **только** внутри нового чистого experiment document. Никакие
existing master, token, icon, source Pen или production-code не меняются.

## 4. Experiment protocol and persistent artifacts

Эксперимент создаётся по проектному протоколу: корневой `README.md` фиксирует
вопрос, гипотезу, scope, non-goals и критерии успеха; `history.md` фиксирует
старт со статусом `active`. Эксперимент остаётся active до прямой команды
пользователя о закрытии. При bootstrap в `outputs/history.md` добавляется ссылка
на этот README со статусом active.

После утверждения implementation plan experiment создаёт:

```text
outputs/experiments/pencil-cli-ui-kit/
├── README.md
├── plan.md
├── roadmap.md
├── todo.md
├── log.md
├── history.md
├── notes/
│   ├── design-brief.md
│   ├── benchmark-protocol.md
│   ├── cli-discovery.md
│   ├── results.md
│   └── evidence/
└── artifacts/
    └── pencil-cli-ui-kit.pen
```

`plan.md` — утверждённый implementation plan и привязка к спецификации.
`roadmap.md` содержит фазы, decisions и gates; `todo.md` — одну атомарную
задачу на mutation; `log.md` — команды, результат, evidence, роль и модель;
`history.md` — короткий human-readable journal; `notes/results.md` — итог и
ограничения на закрытии. Compaction не является source of truth.

## 5. Workflow и gates

1. **Bootstrap:** создать durable state и записать code-side contracts.
2. **CLI discovery:** выполнить и задокументировать оба CLI-пути. Не выбирать
   путь только потому, что другой уже успешен.
3. **Isolation gate:** до каждой MCP mutation запросить active document. Любое
   несовпадение с `artifacts/pencil-cli-ui-kit.pen` — `BLOCKED`; запрещены
   мутации и попытки переключения через `filePath`.
4. **UI Kit:** foundation → `Button` → `ButtonIcon` → `Card`. Каждая операция
   — отдельная atomic task с заранее указанной проверкой.
5. **Review:** evidence-based self-audit, затем human visual review в GUI.

Если ни один CLI-путь не создаёт и не активирует новый документ без GUI,
завершить CLI bootstrap с доказанным `FAIL`: сохранить команды и результаты,
не использовать ручной обход и не начинать UI Kit phase.

Перед первой Pen mutation должен быть завершён Gate A:

- experiment root и target path определены;
- design brief и acceptance criteria approved;
- оба CLI-пути проверены и задокументированы;
- active document подтверждён MCP;
- baseline и `ctx.problems` зафиксированы.

Перед каждой mutation действует Gate B: task записан в `todo.md`, scope
соответствует этой спецификации, метод проверки указан. Gate C после каждого
section требует `ctx.problems`, проверки structure/resolved fills/root hygiene и
focused screenshot. Gate D требует классификации findings как `PASS`, `FAIL`,
`INFO` или `HUMAN REVIEW` до показа пользователю.

## 6. Acceptance criteria

1. `pencil-cli-ui-kit.pen` создан и открыт без ручных действий в Pencil UI.
2. Native CLI и interactive-headless CLI пути оба проверены с воспроизводимыми
   командами и evidence, независимо от их статуса.
3. Перед каждой mutation MCP подтверждает, что active document — именно target.
4. Foundation и masters `Button`, `ButtonIcon`, `Card` соответствуют кодовым
   contract; нет hardcoded visual substitutes и изменений source artifacts.
5. После каждого atomic section сохранены structure query, `ctx.problems` и
   screenshot evidence.
6. Честный failure каждого CLI-пути документирован; GUI не используется как
   рабочий обход и остаётся только финальной human review.

## 7. Error handling и safety

- Нет доступной CLI-команды: записать absence evidence и перейти к проверке
  interactive-headless path.
- Headless path недоступен или не открывает target: записать exact output и
  завершить bootstrap `FAIL` после проверки обоих путей.
- Active document отличается: не мутировать, пометить задачу `blocked`.
- Любой clipping, collapsed layout или stray root leaf: `FAIL`; исправить
  только локальный experiment section и перепроверить.
- Если создание UI Kit потребует изменения code/source Pen/icon set: остановить
  соответствующую задачу и запросить новый явный user gate.

## 8. Non-goals

- Производственные React/PandaCSS изменения, codegen и icon-font work.
- Изменение любого существующего `.pen`.
- Ручное создание или открытие target document в Pencil UI.
- Расширение UI Kit за пределы foundation, `Button`, `ButtonIcon`, `Card` и
  evidence showcase.
