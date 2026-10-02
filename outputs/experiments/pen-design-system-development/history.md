# История: Разработка дизайн-системы в Pen

## 2026-10-02 — старт эксперимента

- Пользователь зафиксировал новую цель: проверить агентный рефакторинг существующей Pen-дизайн-системы в component-first documentation system.
- Проведены два read-only ревью `design_system_ex_1.pen`: первоначально найдены плоская структура landing frames, неполное theme inheritance и отсутствующие compositions; затем подтверждено их исправление.
- После анализа структуры документации уточнена следующая гипотеза: каждый компонент должен иметь свой самостоятельный documentation frame; overview групп объясняет выбор компонента, а global state frame содержит только общую модель состояний.
- Полный промпт сохранён в `pen-agent-prompt.md`.
- Добавлен `notes/design-system-prompting-reference.md`: подробная база решений по Pen boundaries, architecture, tokens, contrast, component documentation, states, responsive screens, prompting и review; она отделяет принятые решения от будущей миграции `border.subtle` / `border.strong`.
- Эксперимент остаётся active до прямой команды пользователя о закрытии.


## 2026-10-02 — завершение эксперимента

- Semantic border model применена: legacy group/step `border` удалён, введены `border/subtle` и `border/strong`; canonical contracts проходят 132/132 contexts.
- Добавлен component-role contrast audit: 66 локальных `Token contract & audit` sections и Foundation index. Логика проверяет resolved instances, nearest actual fill, node kind и отдельное disabled treatment; финальный independent scan не нашёл enabled text/icon contrast failures.
- Исправлены реальные component-role pairs: primary/danger action states, secondary-action icons, Toggle pressed, Icon Button, Checkbox, Tooltip/CodeBlock, option checks, feedback boundaries и Foundation eyebrow.
- Добавлен `Assets — Icons`: 17 manifest glyphs, один reusable tile master, static usage inventory, dynamic-usage notes и theme preview.
- Добавлены 18 dashboard compositions: Login, Projects и Project detail в desktop/tablet/mobile и light/dark; lifecycle `Draft → Active → Completed`, `Paused → Active`, any status → Archived.
- Итоговые Pen structural checks: 16 named major root frames, 82 masters, 1,720 instances, 0 `ctx.problems`.
- Полный проектный `mise run check` завершился успешно: 189 unit и 41 browser tests.
- Пользователь завершил эксперимент. Подробный итог, границы, agent workflow, тонкие места и backlog: `notes/final-results.md`.
