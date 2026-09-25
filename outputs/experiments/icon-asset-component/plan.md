# Icon Asset Component — план реализации

Ledger эксперимента. Статус задач обновляется по ходу. Основание — `README.md`.

Обозначения: `[ ]` todo, `[~]` in progress, `[x]` done.
Для каждой задачи фиксируется проверочная команда и результат.

## Решения по умолчанию

- Исходные SVG (canonical): `src/shared/components/icon/assets/svg/`.
- Сгенерированные: `assets/font/icon.woff2`, `assets/font/icon.woff`,
  `manifest.generated.ts` — коммитятся.
- Pipeline: `src/shared/components/icon/tools/`.
- Font-face: компонентный `icon.css`, импортируется `icon.tsx`.
- Размеры: `sm=x8`, `md=x10`, `lg=x12` (шкала `xN = N * 0.125rem`).
- Kanonical набор для эксперимента: seed `arrow-right` из drop `assets/icons/`
  (копия, drop не изменяется).

## Задачи

### 1. Контракт исходных SVG: нормализация и валидация
- [ ] `tools/svg.ts`: `normalizeSvg`, `validateSvg`.
- [ ] `tools/svg.test.ts`: валидный/невалидный вход, диагностика, идемпотентность.
- [ ] Проверка: `bun test src/shared/components/icon/tools/svg.test.ts`.

### 2. Manifest и codepoint-политика
- [ ] `tools/manifest.ts`: назначение codepoint, рендер/парсинг `manifest.generated.ts`.
- [ ] `tools/manifest.test.ts`: стабильность существующих ключей, порядок новых,
      отсутствие коллизий.
- [ ] Проверка: `bun test src/shared/components/icon/tools/manifest.test.ts`.

### 3. Font pipeline и генерация ассетов
- [ ] `tools/font.ts`: SVG list → SVG font → TTF → WOFF/WOFF2 (детерминированно).
- [ ] `tools/build.ts`: нормализация → валидация → font + manifest, отчёт, `--check`.
- [ ] Seed canonical `assets/svg/arrow-right.svg` (нормализованный).
- [ ] Прогон сборки; проверка детерминизма (`--check` дважды).
- [ ] Проверка: `bun run src/shared/components/icon/tools/build.ts` и `--check`.

### 4. Компонент Icon
- [ ] `preset.ts`: `defineRecipe` c `size`, longhand-only, без theme-ветвлений.
- [ ] `icon.tsx`: API `name/size/label`, accessibility, `currentColor`.
- [ ] `icon.css`: `@font-face`.
- [ ] `index.ts`: barrel.
- [ ] `Icon.test.ts`: recipe и manifest-контракт.
- [ ] `Icon.stories.tsx`: набор, размеры, light/dark, decorative/labelled + play.
- [ ] Проверка: `bun test src/shared/components/icon` и `mise run test:browser`.

### 5. Подключение в проект
- [ ] Регистрация `iconPreset` в `src/shared/styles/index.ts` + `manifest.json`.
- [ ] Использование `Icon` в `App.tsx` вместо placeholder-иконок.
- [ ] `knip.jsonc`: entry для tools.
- [ ] `mise run icons:build` / `icons:check` / `icons:update` + синхронизация
      README и `.agents/workflows.md`.
- [ ] Проверка: `mise run gen`, `check:types`, `check:lint`, `check:deps`.

### 6. Навыки
- [ ] `.opencode/skills/build-icon-font/SKILL.md`.
- [ ] `.opencode/skills/update-icon-set/SKILL.md`.
- [ ] Проверка: `skill` tool перечисляет оба навыка.

### 7. Обновление набора и breaking changes
- [ ] `tools/update.ts`: diff набора против manifest, классификация, usages,
      режимы `--apply` и подтверждение.
- [ ] `tools/update.test.ts`: addition / glyph change / rename / removal /
      collision.
- [ ] Проверка: `bun test src/shared/components/icon/tools/update.test.ts`.

### 8. Проверки и visual
- [ ] `mise run check`, `check:deps`, `build`, `storybook:build`.
- [ ] `mise run test:visual` с осознанным пересмотром baseline.
- [ ] Проверка: см. команды.

### 9. Итог и кристаллизация
- [ ] `notes/` с выводами и решением по технологии.
- [ ] Обновление `README.md` (Итог) и `history.md`.
- [ ] Статус эксперимента и `outputs/history.md`.
