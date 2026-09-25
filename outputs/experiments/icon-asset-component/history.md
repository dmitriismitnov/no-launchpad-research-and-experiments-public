# Icon Asset Component — history

- 2026-09-25 — эксперимент открыт. Ветка `experiment/icon-asset-component`.
  Зафиксирована классификация asset-компонента и решения по scope, API,
  accessibility, manifest и политике обновления.
- 2026-09-25 — feasibility-проба (вне репозитория): `svgicons2svgfont@16`,
  `svg2ttf@6.1`, `woff2` через `wawoff2@2.0.1` собирают детерминированный WOFF2
  с корректным codepoint; фиксированный `ts` делает TTF стабильным.
- 2026-09-25 — реализованы контракт SVG, manifest, pipeline, компонент `Icon`,
  интеграция в проект и visual baseline.
- 2026-09-25 — реализован поток обновления набора с защитой от breaking changes.
- 2026-09-25 — созданы навыки `build-icon-font` и `update-icon-set`; оба
  обнаружены `skill` tool.
- 2026-09-25 — проверки: `check` (65 unit + 12 browser), `icons:check`,
  `check:deps`, `build`, `storybook:build`, `test:visual` — зелёные.
  Выводы — `notes/results.md`. Эксперимент оставлен активным.
