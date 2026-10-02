# Batch 10 report: Toggle, Toggle Group, Textarea, Number Input, Checkbox, Radio, Switch and Slider from the Pen design system

**Date:** 2026-10-02
**Commit:** `bee4c1adef7c9ff189b3170238ce18dcbb4afb2b`
**Message:** `feat: port Toggle, Toggle Group, Textarea, Number Input, Checkbox, Radio, Switch, Slider from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** `experiment/pencil-opencode-workflow`.

## Components ported

Eight public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All eight are slot recipes and all render
native form elements.

| Component | Pen master (id) | Recipe key | Anatomy |
| --- | --- | --- | --- |
| Toggle | `Toggle` frame `gkK5e` | `toggle` | root / icon / label |
| Toggle Group | `Toggle Group` frame `e5ySA` | `toggleGroup` | root / item / label |
| Textarea | `Textarea` frame `w6oNZ7` | `textarea` | root / label / control / footer / counter / error |
| Number Input | `Number Input` frame `EZfrL` | `numberInput` | root / label / control / input / unit / stepper / stepButton / error |
| Checkbox | `Checkbox` frame `e2q2z` | `checkbox` | root / label / control / input / box / mark / text / error |
| Radio | `Radio` frame `UrFJz` | `radio` | root / label / control / input / box / dot / text / error |
| Switch | `Switch` frame `BQvnn` | `switchControl` | root / label / control / input / track / thumb / text / error |
| Slider | `Slider` frame `z57yzW` | `slider` | root / header / label / value / control / input / track / range / thumb / error |

The reusable masters live in
`05 Components — Forms & selection — Components — Forms & selection — Masters
(library)` and `04 Components — Actions — Components — Actions — Reusable
masters`. The per-component documentation frames (`Components — Forms &
selection — Textarea` `N0ymEX` / `Number Input` `oTL4D` / `Checkbox` `RB6lx` /
`Radio Group` `BRhSj` / `Switch` `gHtWp` / `Slider` `lLkUG`, and `Components —
Actions — Toggle` `MApo8` / `Toggle Group` `OHpCJ`) supplied the public variants
and state specimens. Pen has no standalone `Radio` documentation frame; the
single-control states come from the `Radio` master plus the Radio Group
specimens.

### API shape

Every field follows the `Input` contract: `label` above the control, `error`
below, the component owns `aria-invalid` and `aria-describedby` (consumer values
of those two attributes are ignored), and the label is bound with
`htmlFor`/`id`.

- **Toggle** is a `<button type="button">` with `aria-pressed`. It is
  uncontrolled by default (`defaultPressed`) or controlled with `pressed` /
  `onPressedChange`, and takes a `label` plus an optional decorative `icon`.
- **Toggle Group** is a labelled `role="group"` of toggle buttons. `options`
  carries `{ value, label, disabled? }`; the pressed set is `value: string[]`
  (controlled) or `defaultValue` (uncontrolled), reported through `onChange`.
  A single-selection group is an array with one entry.
- **Textarea** is the multiline sibling of `Input`; it adds an optional
  character counter that turns itself on when `maxLength` is present
  (`showCount` overrides).
- **Number Input** is a native `<input type="number">` in a bordered control
  with optional plus/minus `stepper` buttons and an optional `unit`. The steppers
  call the native `stepUp` / `stepDown` and dispatch an `input` event, so they
  work in both controlled and uncontrolled mode.
- **Checkbox** and **Radio** are native inputs under a custom 18px control. The
  box/dot follow native `:checked` / `:indeterminate` / `:focus-visible` through
  `peer` selectors; `Checkbox` adds `indeterminate`.
- **Switch** is a native checkbox with `role="switch"` and `aria-checked`. State
  is controlled (`checked` / `onChange`) or uncontrolled (`defaultChecked`).
- **Slider** is a native `<input type="range">` over a styled track, fill and
  20px thumb. It accepts numeric `value` / `defaultValue`, `min` / `max`,
  `step`, and optional `showValue` / `formatValue` (which also sets
  `aria-valuetext`).

A future **Radio Group** composes the ported `Radio` control; the group layout
is out of scope here.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/focus/*`,
`semantic/feedback/*`) on top of the numeric matrix the code foundation ports.
Each role alias was resolved to the closest token; the shared aliases from
batches 1–9 carry over.

### Shared role aliases

| Pen role (resolved from `variables`) | Resolved light / dark | Code token | Exact? |
| --- | --- | --- | --- |
| `surface/base` | `neutral.50` / `neutral.950` | `semantic.common.50.background` | exact |
| `surface/raised` | `white` / `neutral.900` | `semantic.common.50.background` | light near-exact; dark one step |
| `surface/sunken` | `neutral.100` / `neutral.950` | `semantic.common.100.background` | light exact; dark one step |
| `surface/hover` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact; dark one step |
| `surface/selected` | `green.50` / `green.950` | `semantic.brand.50.background` | exact |
| `border/subtle` | `neutral.200` / `neutral.800` | `semantic.common.200.divider` | nearest structural boundary |
| `border/strong` | `neutral.500` / `neutral.400` | `semantic.common.50.border.strong` | light exact; dark one step |
| `text/primary` | `neutral.900` / `neutral.50` | `semantic.common.50.text` | exact |
| `text/secondary` | `neutral.700` / `neutral.300` | `semantic.common.700.background` | exact |
| `text/tertiary` | `neutral.600` / `neutral.400` | `semantic.common.600.background` | exact |
| `text/disabled` | `neutral.400` / `neutral.600` | `semantic.common.400.background` | exact, both themes |
| `text/link` | `green.700` / `green.400` | `semantic.brand.700.background` | light exact; dark one step |
| `focus/ring` | `green.600` / `green.500` | `semantic.brand.500.background` | shared with `Button` / `Input` |
| `action/primary-bg` | `green.700` / `green.700` | `semantic.brand.700.background` | light exact; dark one step |
| `action/primary-fg` | `white` / `white` | `semantic.brand.700.text` | theme-aware pair (see below) |
| `action/primary-bg-hover` | `green.800` / `green.800` | `semantic.brand.800.background` | light exact; dark one step |
| `action/disabled-bg` | `neutral.100` / `neutral.800` | `semantic.common.100.background` | light exact; dark one step |
| `action/disabled-fg` | `neutral.400` / `neutral.500` | `semantic.common.400.background` | light exact; dark one step |
| `feedback/negative-border` | `red.500` / `red.400` | `semantic.negative.600.background` | light one step (matches `Input`) |
| `shadow/300` | `#0F172A1C` / `#00000066` | `semantic.shadow.300` | exact (opacity variants) |

### Per-master values

- **Toggle**: 36px tall, 8px / 14px padding, radius `md` (10px), raised surface,
  `border/strong`, secondary text. Selected (`aria-pressed`) reads
  `surface/selected` + `action/primary-bg` border + `text/link`. Hover is
  `surface/hover`; `:active` is the full `action/primary-bg` /
  `action/primary-fg` fill; disabled is `action/disabled-bg` /
  `action/disabled-fg`.
- **Toggle Group**: a 2px (`x1`) padded sunken strip with a 2px gap and radius
  `md`. Items pad 6px / 16px (`x3` / `x8`), radius `sm`, secondary text; the
  pressed item lifts onto the raised surface, `border/strong`, primary text and
  semibold label.
- **Textarea**: 96px minimum height, 10px / 12px padding (`x5` / `x6`), radius
  `md`, raised surface, `border/strong`, primary value text; the counter reads
  tertiary `xs`. Invalid swaps the border for the negative role.
- **Number Input**: 40px tall (`x20`), 12px inline padding (`x6`), 8px gap,
  radius `md`, raised surface, `border/strong`. The stepper is a vertical pair
  of 14px glyphs in tertiary; the value is `sm` primary.
- **Checkbox / Radio**: 18px control, radius `sm` / pill, raised fill,
  `border/strong`. Checked/indeterminate fill with `action/primary-bg` and a
  `primary-fg` mark (12px check / dash, 8px radio dot). Label is `sm` primary;
  disabled is `action/disabled-bg` plus the disabled text role.
- **Switch**: a 40x22 pill track, 3px padding, sunken fill, `border/strong`, and
  a 16px raised thumb with a `shadow/300` drop. Label gaps 10px (`x5`).
- **Slider**: a 4px (`x2`) sunken track, `action/primary-bg` fill and a 20px
  (`x10`) raised thumb with a 2px `action/primary-bg` ring and `shadow/300`.
  The value label reads secondary `sm`.

## Icons

No icon pipeline run: the `plus` and `minus` glyphs needed by the Number Input
stepper were already imported by batch 9 (`mise run icons:build -- --from`).
`mise run icons:check` stays green (32 icons). Checkbox uses the existing
`check` / `minus`; all other glyphs are reused (`chevron-*`, `x`, …).

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all eight are `theme.slotRecipes`, appended after Tour in the order
  `toggle`, `toggleGroup`, `textarea`, `numberInput`, `checkbox`, `radio`,
  `switchControl`, `slider`). The recipe list (`icon`, `dividerRule`,
  `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 46 to 54.
- `panda.config.ts`: `staticCss.recipes` gains `toggle`, `toggleGroup`,
  `textarea`, `numberInput`, `checkbox`, `radio`, `switchControl` and `slider`
  for their runtime boolean variants.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed in one forms section (a pressed
  and a disabled Toggle, a two-option Toggle Group, a counter Textarea, a Number
  Input with unit, checked/indeterminate Checkboxes, a Radio, a Switch and a
  Slider with a value label), so Knip sees real usage.

## Files

New, per component (`toggle`, `toggle-group`, `textarea`, `number-input`,
`checkbox`, `radio`, `switch`, `slider`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

Modified:

- `panda.config.ts`
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run gen` | ✓ codegen + cssgen (352 files extracted) |
| `mise run fix:all` | ✓ lint clean, format clean |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (525 unit / 287 browser) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`toggle__root`,
`toggleGroup__item`, `textarea__control`, `numberInput__stepButton`,
`checkbox__box`, `radio__dot`, `switch__track`, `slider__range`, …) and the
runtime variant classes (`toggle__root--pressed_true`,
`checkbox__box--disabled_true`, `slider__range--invalid_true`, …).

## Accessibility

- The field contract is `Input`'s: `label` bound with `htmlFor`/`id`,
  `aria-invalid` on the control, and `aria-describedby` pointing at the error
  paragraph while `invalid` and a non-blank `error` are both present.
  Consumer-supplied `aria-invalid` / `aria-describedby` are ignored on purpose.
- **Toggle** exposes `aria-pressed`; **Toggle Group** is a labelled
  `role="group"` whose items each expose `aria-pressed` and an accessible name.
- **Checkbox / Radio / Switch** keep the native input as the source of truth, so
  keyboard, Space/Enter and form semantics stay native. **Switch** adds
  `role="switch"` and a computed `aria-checked`. **Checkbox** exposes the mixed
  state through the DOM `indeterminate` property.
- **Slider** is a native range; `formatValue` also sets `aria-valuetext`, and
  the optional value label is text (not the only accessible value).
- Focus rings come from `semantic.brand.500.background` and match `Button` /
  `Input`. Checkbox, Radio and Switch draw the ring on the visual control while
  the transparent native input owns focus.

## Approximations and concerns

- **Off-scale literals.** Pen's geometry is not always on the `xN` scale, so the
  Toggle's 36px height and 14px inline padding, the Textarea's 96px minimum
  height, the 18px Checkbox/Radio control and 12px / 8px marks, the Switch's
  40 / 22 / 16 / 3px, and the Slider's 4px / 20px are literals.
- **`action/primary-fg` is white in both Pen themes.** The code semantic matrix
  is theme-aware, so the nearest theme-safe foreground is the foreground of the
  same brand step (`brand.700.text`: light `green.50`, dark `green.900`). This
  keeps the mark/knob legible on the brand fill in both themes.
- **`text/link` has no code token.** It maps to `brand.700.background`
  (`green.700` light, `green.300` dark); Pen's dark value is `green.400`, one
  step away.
- **Invalid border.** Pen's `feedback/negative-border` is `red.500` / `red.400`;
  the port uses `negative.600.background` (`red.600` / `red.400`) to match the
  existing `Input` invalid treatment.
- **Pen's Switch on-state is unspecified.** The `Switch` master and its on/off
  specimens are identical (no fill change, no thumb offset, no `x`), so the port
  uses the conventional treatment from the same role set: the checked track
  fills with `action/primary-bg` and the thumb slides by its own width plus the
  track padding (`translateX(18px)`).
- **Number Input steppers.** Pen draws up/down chevrons at 14px; the icon set has
  no `chevron-up`, so the stepper uses `plus` / `minus`. The buttons drive the
  native `stepUp` / `stepDown`; they are not disabled at `min` / `max` (Pen's
  "Min/Max reached" states) because the component does not own the numeric
  value. The focus ring sits on the control through `:focus-within`, so it can
  also appear on pointer focus — `Input` uses `:focus-visible` because its
  control is the focusable element itself.
- **Textarea disabled surface.** Pen paints the disabled Textarea with
  `action/disabled-bg`; the port uses the shared `Input` opacity treatment
  (`opacity: 0.45`) so every form control disables alike.
- **Slider scope.** Pen's thumb grows to 24px on hover and 28px on focus and
  fills with the brand colour while dragging; the port keeps the 20px thumb and
  moves only the focus ring, for stable geometry. The range variant (two thumbs)
  and the tick marks are out of scope. The value label is opt-in (`showValue`).
- **Field-label face.** As in `Input`, the foundation ships only the `body`
  (Inter) face, so field labels compose `body` + `xs` + `medium` + `wide` +
  `uppercase` instead of Pen's mono field-label face.
- **`switchControl` recipe key.** Panda's codegen emits
  `export declare const switch` for a recipe named `switch`, which TypeScript
  rejects (`'switch' is not allowed as a variable declaration name`). The
  recipe key is therefore `switchControl` while `className: "switch"` keeps the
  generated classes `switch__*`.
- **Panda `peer` merge with two conditions.** Writing `backgroundColor` in both
  `_peerChecked` and `_peerIndeterminate` made Panda emit
  `.checkbox__box, .peer:checked ~ .checkbox__box { background: brand }`, which
  painted every box. Checkbox now uses one combined selector
  (`".peer:is(:checked, :indeterminate) ~ &"`); the other peer-driven controls
  write each conditional property once.
- **Radio Group out of scope.** `Radio` is the single control a future Radio
  Group composes; group orientation, group label and description are deferred.
