# Typography Asset Foundation — history

- 2026-09-30 — эксперимент открыт. Ветка `experiment/typography-asset-foundation`.
  Зафиксированы вопрос, scope, классификация asset-модуля и критерии успеха
  (`README.md`).
- 2026-09-30 — канонические variable TTF Inter (normal + italic) и `OFL.txt`
  перенесены в `src/shared/fonts/assets/raw/`; исходный дистрибутив и static-набор
  удалены; введён контракт путей и `FONT_FAMILY` (`819ebbd`).
- 2026-09-30 — добавлены валидация и конвертация: `fontkit` для метаданных,
  `wawoff2` для WOFF2, проверка семьи, стиля, осей `opsz`/`wght` и диапазона
  `100 900` (`5ea3c86`).
- 2026-09-30 — детерминированный pipeline `TTF → WOFF2 + manifest` и задачи
  `fonts:build` / `fonts:check` (`ee66c0e`).
- 2026-09-30 — навык `build-web-font` и документация задач (`7a366b4`).
- 2026-09-30 — регистрация `@font-face`; Inter заменяет Geist в foundation
  (`578f797`).
- 2026-09-30 — первая композиция: `Button.label` собирает типографику из
  foundation, `Button.root` её не содержит (`07ffe73`).
- 2026-09-30 — зафиксированы результаты: размеры, хеши, проверки (`d191e0f`).
- 2026-09-30 — закрыты пробелы ревью: drift-проверка стала обязательной в
  `check`, добавлены тесты выравнивания CSS/manifest и диапазона `wght`
  (`b76c225`).
- 2026-09-30 — харденинг pipeline (ветка `experiment/font-pipeline-hardening`):
  источник читается и валидируется один раз (`87f77a5`), generated runtime CSS
  (`e2b8b41`) и генерация регистрации вместо handwritten `font.css` (`f72b750`).
- 2026-09-30 — добавлена общая заметка `outputs/shared/notes/backlog.md`;
  отложенное по эксперименту собрано там; roadmap п. 2 получил ссылку и
  уточнённый pipeline (`ddfa5d3`).
- 2026-09-30 — **закрытие эксперимента**. Статус: `completed`.
  - Пользовательское ревью выполнено; оценка — хорошая: автономная реализация по
    структуре проекта, достойный код и документация.
  - Проверки на закрытии: `mise run check` (136 unit + 26 browser), `fonts:check`
    (2 faces), `check:deps`, `build` — зелёные; в production output нет
    `.ttf`/`.otf`.
  - Урок: правила, skills и scripts — основной рычаг разработки агентами;
    автономность не отменяет независимое ревью.
  - Не вошло и продолжается отдельно: subsetting, `preload`, публичный API
    вариативных осей, вторая семья, composite text styles, responsive- и
    density-шкалы, tooling-долг — см. `../../../shared/notes/backlog.md`.
  - Оценка реализации — `notes/results.md`.
  - Ветки `experiment/typography-asset-foundation` и
    `experiment/font-pipeline-hardening` влиты в `main` fast-forward и удалены.
