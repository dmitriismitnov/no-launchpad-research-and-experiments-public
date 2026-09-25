# Icon Asset Component — план и ledger

Основание — `README.md`. Статус задач: `[x]` done.

## Решения по умолчанию

- Исходные SVG (canonical): `src/shared/components/icon/assets/svg/`.
- Сгенерированные: `assets/font/icon.woff2`, `manifest.generated.ts` — коммитятся.
- Pipeline: `src/shared/components/icon/tools/`.
- Font-face: компонентный `icon.css`, импортируется `icon.tsx`.
- Размеры: `sm=x8`, `md=x10`, `lg=x12` (шкала `xN = N * 0.125rem`).
- Canonical набор: seed `arrow-right` из drop `assets/icons/` (drop не изменён).

## Задачи

### 1. Контракт исходных SVG — done
- [x] `tools/svg.ts`: `normalizeSvg`, `validateSvg`.
- [x] `tools/svg.test.ts`.
- Проверка: `bun test .../svg.test.ts` → 16 pass (включая 3 найденных бага:
  self-closing теги, `xmlns` как внешняя ссылка, порядок атрибутов).

### 2. Manifest и codepoint-политика — done
- [x] `tools/manifest.ts`, `tools/manifest.test.ts`.
- Проверка: 9 pass. Решение: существующие ключи сохраняют codepoint, удалённый
  может быть переиспользован (шрифт и manifest пересобираются вместе).

### 3. Font pipeline и генерация — done
- [x] `tools/font.ts`, `tools/font.test.ts`, `tools/assets.ts`, `tools/build.ts`.
- [x] Seed canonical `assets/svg/arrow-right.svg`.
- Проверка: `icons:build`; `icons:check` дважды; хеши шрифта и manifest
  идентичны; `font.test.ts` → 3 pass (`wOF2`, детерминизм, зависимость от codepoint).

### 4. Компонент Icon — done
- [x] `preset.ts` (`defineRecipe`, `size`, longhand-only, без colour).
- [x] `icon.tsx`, `icon.css`, `index.ts`.
- [x] `Icon.test.ts` → 10 pass.
- [x] `Icon.stories.tsx` (5 историй, play-проверка a11y).
- Проверка: browser-тесты 12 pass.

### 5. Подключение в проект — done
- [x] Preset в `styles/index.ts` и `styles/manifest.json`; `staticCss` для icon.
- [x] `Icon` в `App.tsx`.
- [x] `knip.jsonc`: entry для barrel и tools.
- [x] `icons:build` / `icons:check` в `.mise.toml` + README, `.agents`.
- Проверка: `check:types`, `check:lint`, `check:deps`, `build` — зелёные.

### 6. Навыки — done
- [x] `.opencode/skills/build-icon-font/SKILL.md`.
- [x] `.opencode/skills/update-icon-set/SKILL.md`.
- Проверка: оба навыка обнаружены `skill` tool.

### 7. Обновление набора и breaking changes — done
- [x] `tools/diff.ts` (`classifyChanges`, `scanIconUsages`, `migrateUsages`),
      `tools/diff.test.ts` → 6 pass.
- [x] `tools/update.ts` с `--apply`, `--allow-glyph-change`, `--allow-remove`,
      `--keep-alias`, `--migrate-usage`; `icons:update` в `.mise.toml`.
- Проверка (вручную): same → 0; add → 0; changed → 1 (blocked, показаны usages);
  collision → 1; empty → 1; keep-alias → 0 и `--apply` сохранил оба ключа;
  migrate-usage → 0. Тестовые артефакты удалены, состояние восстановлено.

### 8. Проверки и visual — done
- [x] `mise run check` — 65 unit + 12 browser, зелёный.
- [x] `mise run check:deps`, `mise run build`, `mise run storybook:build`.
- [x] `mise run test:visual` — baseline обновлён и проверен визуально.

### 9. Итог и кристаллизация — done
- [x] `notes/results.md` с выводами и решением по технологии.
- [x] README (Состояние), `history.md`, `outputs/history.md`.
- [ ] Закрытие эксперимента — по прямой команде пользователя.
- [ ] Кристаллизация правил в `wiki/` — по прямой команде.
