# Code-system inventory

**Status:** verified (2026-10-02).
**Task:** Task 3, Steps 1–2 — read-only code-system audit and evidence check.
**Role/model:** single-model operator — `deepseek/deepseek-flash`.

This is the code-side source of truth for the benchmark. It records what the
repository actually exposes and how it maps to the Pen document. No code was
changed.

## Implemented components (code)

| Component | Source | Slots | Public variants | States | Key tokens |
| --- | --- | --- | --- | --- | --- |
| `Button` | `src/shared/components/button/button.tsx`, `preset.ts` | root / prefixIcon / label / suffixIcon | tone `primary\|secondary\|ghost`, size `sm\|md` | enabled, hover, active, disabled, focus-visible | root fill `semantic.common.50.text` (primary), label `common.950.text`, icons `common.950.icon`; secondary border `common.700.background`; ghost bg `common.50.background`, border `common.200.divider`; focus `brand.500.background`; h `x25`/`x16`; radius `sm`; gap `x5` |
| `ButtonIcon` | `src/shared/components/button-icon/` | root / icon | tone `primary\|secondary\|ghost`, size `sm\|md` | enabled, hover, active, disabled, focus-visible | square `x25`/`x16`; primary root `common.50.text`, icon `common.950.icon`; secondary icon `common.50.icon` |
| `Input` | `src/shared/components/input/` | root / label / control / error | `invalid` true\|false | enabled, focus-visible, disabled, invalid | control h `x25`, border `common.200.divider`, bg `common.50.background`, text `common.50.text`, placeholder `common.500.background`; invalid border `negative.600.background`; error text `negative.600.background`; label `common.600.background`; focus `brand.500.background`; disabled opacity `0.45` |
| `Card` | `src/shared/components/card/` | root / media / body / header / title / description / footer / footerPrimary / footerSecondary / actionButton | none (fixed anatomy) | static; hosts `actionButton` (Button) | bg `common.50.background`, border `common.200.divider`, title `common.50.text`, description/header `common.600.background`, shadow `semantic.shadow.500` |
| `Icon` | `src/shared/components/icon/` | asset component | `size` (sm/md), name from manifest | decorative, `currentColor` | 17 public keys from `manifest.generated.ts` |

Notes:

- `Button` primary feedback is opacity-only (`1 / 0.85 / 0.7 / 0.45`); no hue swap.
- `Card` takes no variant and no children; content arrives via typed props.
- Panel/table/dialog/navigation etc. are **not implemented in code** but exist
  as documented components and masters in Pen; the benchmark composes in Pen and
  treats code as the contract reference for the five implemented components.

## Icon keys (17, canonical)

`arrow-right`, `check`, `flask-conical`, `gauge`, `mail`, `map-pin`, `menu`,
`phone`, `settings`, `shield-check`, `sliders-horizontal`, `test-tube`,
`thermometer`, `truck`, `waves`, `wrench`, `x`.

Source: `src/shared/components/icon/manifest.generated.ts`; geometry under
`src/shared/components/icon/assets/svg/`.

## Token ownership

| Layer | Owner | Contents |
| --- | --- | --- |
| Foundation | `src/shared/styles/foundation/` | palette, semantic tokens, theme axis, spacing/sizing, typography, shape, effects |
| Component | each component `preset.ts` | anatomy, public variants, visual states, token references |
| Screen | composition | layout and composition only; no local token redefinition |

Theme is carried inside semantic tokens (`_light` / `_dark`); recipes never
branch on theme. Theme is applied as a screen/context, not as a component
variant.

## Theme mechanism

- Code: `themes.theme` axis `light` / `dark` in `colors.ts`; semantic token pairs.
- Pen copy: variable themes `{"theme": ["light", "dark"]}`, 231 themed nodes.
- Theme is set on a screen or themed preview frame; no light/dark master copies.

## Pen-side semantic projections (verified in the isolated copy)

- Content/roles: `semantic/<group>/<step>/{background,text,icon,divider}`.
- Boundaries: `semantic/<group>/<step>/border/{subtle,strong}`.
- Global aliases: `semantic/border/{default,subtle,strong}`, `semantic/focus/ring`.
- Action/feedback: `semantic/action/*`, `semantic/feedback/*`.
- Shadows: `semantic/shadow/{100..800}`.
- Palette roots: `palette/<family>/<step>`.

## Code ↔ Pen divergence (evidence)

| Topic | Code | Pen copy | Disposition |
| --- | --- | --- | --- |
| Border projections | single `border` + `divider` | `border/subtle` + `border/strong` + `divider` | `INFO` — Pen benchmark follows Pen tokens; code is behind by one migration. Not in scope to change code. |
| Component coverage | 5 components | ~70 documented components/masters | `INFO` — benchmark composes from Pen refs; code is the contract for the 5 implemented components. |
| Source document structure | n/a | 155 root frames, 82 masters, 1720 refs | `INFO` — flatter than the previous experiment's 16-group summary; recorded in `pen-baseline.md`. |

## Stop-and-ask check

No element required by the Create Project brief needs a new master/token. All
required primitives (field/input, button, card, table/list, icons, semantic
tokens, themes) exist in the Pen copy. Gate A can be met without a source change.
