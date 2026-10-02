# Batch 11 report: Select, Multi Select, Field, Radio Group and Pin Input from the Pen design system

**Date:** 2026-10-02
**Commit:** `feat: port Select, Multi Select, Field, Radio Group, Pin Input from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** `experiment/pencil-opencode-workflow`.
**Model:** `deepseek/deepseek-flash` (single model performed implementation and self-audit; no independent cross-model review available).

## Components ported

Five public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All five are slot recipes.

| Component | Pen master (id) | Recipe key | Anatomy |
| --- | --- | --- | --- |
| Field | `Field` frame `pHfEy` | `field` | root / labelRow / label / required / control / hint / error |
| Select | `Select` frame `tOLtR` (+ `Select Popup` `aXD61`, `Option` `GjzX0`) | `select` | root / label / control / select / chevron / hint / error |
| Multi Select | `Multi Select` frame `f985P` (+ shared `Tag` `UyMqu`) | `multiSelect` | root / label / control / placeholder / count / toggle / listbox / option / optionLabel / check / hint / error |
| Radio Group | `Radio Group` frame `IENTK` (composes `Radio` `UrFJz`) | `radioGroup` | root / label / options / hint / error |
| Pin Input | `Pin Input` frame `E3ZhdP` | `pinInput` | root / label / cells / cell / input / hint / error |

The reusable masters live in
`05 Components — Forms & selection — Components — Forms & selection — Masters
(library)`. The documentation frames
(`Components — Forms & selection — Field` `c6uIoT`, `Select` `vMd62`,
`Multi Select` `jZrkt`, `Radio Group` `BRhSj`, `Pin Input` `K8gNTw`)
supplied the public variants and state specimens.

## API shape

Every component follows the `Input`/`Textarea` contract: `label` above the
control, `hint`/`error` below, the component owns `aria-invalid` and
`aria-describedby` (consumer values of those two attributes are ignored), and
the label is bound with `htmlFor`/`id` or `aria-labelledby`.

- **Field** is the composition wrapper, not a control. It renders the label row,
  an optional `required` marker, the control (its only child), a `hint` and an
  `error`. A single React-element child receives `id`, `aria-invalid` and
  `aria-describedby`; a native `input`/`select`/`textarea` child additionally
  receives `required` and `disabled`. The error replaces the hint, matching
  Pen's "error replaces the hint" rule.
- **Select** is the simplest accessible option: a styled **native `<select>`**.
  Keyboard, type-ahead, form submission and screen-reader announcement of the
  selected option are all native; the Pen popup, option rows and search field are
  replaced by the platform dropdown. `options` carries `{ value, label, disabled? }`
  and `placeholder` renders an empty value option.
- **Multi Select** shows the selection as removable chips (it reuses the public
  `Tag`) and opens an inline `role="listbox"` with
  `aria-multiselectable="true"`. `value`/`defaultValue` are a `string[]`,
  reported through `onChange`; `maxVisible` collapses the rest into a `+N`
  counter. The list stays open while options are picked; `Escape` and an outside
  pointer press close it. No portal.
- **Radio Group** is a labelled `role="radiogroup"` that composes the public
  `Radio`. `value`/`defaultValue` is a single string; `onChange` reports the
  selected value; `orientation` is `vertical` (default) or `horizontal`. The
  group owns the shared native `name` and the error/`aria` contract.
- **Pin Input** renders `length` single-character inputs (default 6) and keeps a
  plain string value (`value`/`defaultValue` + `onChange`). Typing advances focus,
  Backspace clears and steps back, arrows move, and pasting fills the cells.
  `masked` renders password inputs; `name` adds a hidden field for form submission.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/focus/*`,
`semantic/feedback/*`, `semantic/shadow/*`) on top of the numeric matrix the code
foundation ports. The shared aliases from batches 1–10 carry over unchanged:
`surface/raised → common.50.background`, `surface/sunken`/`surface/hover →
common.100.background`, `surface/selected → brand.50.background`,
`border/strong → common.50.border.strong`, `border/subtle → common.200.divider`,
`text/primary → common.50.text`, `text/secondary → common.700.background`,
`text/tertiary → common.600.background`, `text/disabled → common.400.background`,
`text/link → brand.700.background`, `action/primary-bg → brand.700.background`,
`action/disabled-bg → common.100.background`, `action/disabled-fg →
common.400.background`, `focus/ring → brand.500.background`,
`feedback/negative-border → negative.600.background`, `feedback/negative-fg →
negative.700.background`, `shadow/500 → semantic.shadow.500`.

### Per-master values

- **Field**: 6px (`x3`) root gap, 4px (`x2`) label gap; label `sm` / medium /
  `text/primary`; required marker `feedback/negative-fg`; hint `xs` /
  `text/tertiary`; error `xs` / `feedback/negative-fg`.
- **Select**: 40px tall (`x20`), 12px inline padding (`x6`), 8px gap, radius
  `md`, raised surface, `border/strong`, 16px chevron in `text/tertiary`.
  Focus swaps the boundary for `focus/ring`; invalid swaps it for
  `feedback/negative-border`; disabled reads `action/disabled-bg` /
  `action/disabled-fg`.
- **Multi Select**: trigger pads 6px / 10px (`x3` / `x5`) with a 6px (`x3`) gap,
  radius `md`, raised surface, `border/strong`; chips are the `Tag` master.
  The listbox is `surface/overlay`, `border/subtle`, radius `md`, `shadow/500`
  and an 8px (`x4`) gap; option rows pad 8px / 10px (`x4` / `x5`) with a `sm`
  radius, hover `surface/hover`, selected `surface/selected` + semibold label +
  a `text/link` check.
- **Radio Group**: vertical gap 10px (`x5`); horizontal gap 24px (`x12`); group
  label `sm` / medium / `text/primary`; hint `xs` / `text/tertiary`; error `xs` /
  `feedback/negative-fg`. Radios are the ported 18px control (selected ring +
  8px dot in `action/primary-bg`).
- **Pin Input**: 8px (`x4`) cell gap; 40px-wide (`x20`), 44px-tall cells, radius
  `md`, raised surface, `border/strong`; digit `md` / `text/primary`. The focus
  ring is drawn on the cell through `:focus-within`; invalid swaps the boundary
  for `feedback/negative-border`; disabled reads `action/disabled-bg` /
  `action/disabled-fg`.

## Icons

No icon pipeline run. The only glyphs used are `chevron-down`, `check` and `x`,
all already in the committed manifest (32 icons). `mise run icons:check` stays
green. The Pen `search` glyph in the Select popup and the Number Input-style
steppers are not needed because the native Select has no search row.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all five are `theme.slotRecipes`, appended after Slider in the order
  `field`, `select`, `multiSelect`, `radioGroup`, `pinInput`). The recipe list
  (`icon`, `dividerRule`, `skeleton`, `spinner`) is unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward slot-recipe
  lists; the reversed-order guard; the `toBeDefined` / `toEqual` assertions. The
  slot-recipe list grows from 54 to 59.
- `panda.config.ts`: `staticCss.recipes` gains `field`, `select`, `multiSelect`,
  `radioGroup` and `pinInput` for their runtime boolean/orientation variants.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed in the forms section (a filled
  Select, a Multi Select with two visible chips and a `+1` counter, a Radio
  Group with a hint, a four-cell Pin Input, and a Field wrapping a native text
  input), so Knip sees real usage.

## Files

New, per component (`field`, `select`, `multi-select`, `radio-group`,
`pin-input`):

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
| `mise run gen` | ✓ codegen + cssgen (377 files extracted) |
| `mise run fix:all` | ✓ lint clean, format clean |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (567 unit / 325 browser) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`field__labelRow`,
`select__chevron`, `multiSelect__listbox`, `multiSelect__option`,
`radioGroup__options--orientation_horizontal`, `pinInput__cell`, …) and the
runtime variant classes (`select__select--invalid_true`,
`multiSelect__option--selected_true`, `pinInput__cell--disabled_true`, …).

## Accessibility

- The field contract is `Input`'s: `label` bound with `htmlFor`/`id`,
  `aria-invalid` on the control, and `aria-describedby` pointing at the error
  paragraph while `invalid` and a non-blank `error` are both present. The error
  replaces the hint. Consumer-supplied `aria-invalid` / `aria-describedby` are
  ignored on purpose.
- **Field** associates its label with the wrapped control, forwards `required`
  and `disabled` to native controls, and exposes `required` as a native state,
  not only as the `*` marker (which is `aria-hidden`).
- **Select** keeps the native `<select>`, so the browser owns keyboard
  interaction, the selected-option announcement and form semantics.
- **Multi Select** gives every chip remove button its own accessible name
  (`Remove <label>`), the trigger exposes `aria-haspopup="listbox"` /
  `aria-expanded`, and the popup is a labelled `aria-multiselectable` listbox
  whose options carry `aria-selected`.
- **Radio Group** is a `role="radiogroup"` with a visible or `aria-label` name;
  each option is a native radio sharing one `name`, so arrow keys and
  label/description association stay native. Invalidity is announced on the
  group.
- **Pin Input** is one `role="group"` with `aria-labelledby` (or `aria-label`)
  and each cell has an `aria-label` (`<name> character N`), plus
  `aria-invalid` / `aria-describedby` per cell. The first cell carries
  `autoComplete="one-time-code"`.
- Focus rings come from `semantic.brand.500.background` and match `Button` /
  `Input`. Select, Multi Select and Pin Input draw the ring with
  `:focus-visible` / `:focus-within`, matching the existing form controls.

## Approximations and concerns

- **Field is a wrapper, not a control.** Pen describes Field as the wrapper used
  by Text Input / Textarea / Select; this port exposes it as a standalone
  component (`cloneElement`-based wiring) and leaves `Input`, `Textarea` and
  `Select` owning their own field contract. Refactoring the existing controls
  onto Field would change their public slot contract, so it is deferred.
- **Field label face.** Pen's Field label is sentence-case `sm` / medium /
  `text/primary`, unlike `Input`'s uppercased `xs` field label. The port keeps
  Pen's face because Field wraps arbitrary controls and its label is a visible
  control name; this is the one deliberate divergence from `Input`'s label.
- **Select is the native platform control.** Pen's trigger shows a
  `text/tertiary` placeholder that switches to `text/primary` once a value is
  chosen, and opens a rich popup with option rows, check marks and an optional
  search field. A native `<select>` cannot style its placeholder per-browser and
  cannot host custom option rows, so the port preserves native behavior and
  drops the custom popup; the placeholder is an empty-value option and the value
  text always reads `text/primary`.
- **Multi Select chips reuse `Tag`.** The chip is the batch-8 `Tag` recipe, which
  is a close match to Pen's `Tag` master (raised surface, `border/strong`, `sm`
  radius, `sm` / medium secondary label). Pen's 14px close glyph uses the 16px
  `sm` icon; the overflow counter uses `body` + `xs` instead of Pen's mono face.
- **Multi Select listbox keyboard model.** Clicking an option toggles it and
  keeps the list open (Pen's rule); `Escape` and outside clicks close it. The
  port does not implement roving `ArrowDown`/`ArrowUp` focus between options or
  type-ahead — the options are real buttons and are reachable with Tab, so the
  control remains operable, but a richer combobox key model is out of scope.
- **Radio Group invalid is group-wide.** Pen's invalid specimen marks a single
  option; the port passes `invalid` to every radio so the group reads as one
  invalid control, and the message sits under the group.
- **Pin Input mono face and cell height.** Pen renders the digit in the mono face
  and the cell 44px tall; the foundation ships only `body` and has no `x22`
  step, so the digit uses `body` + `md` and the height is the literal `44px`.
  Pen's focused cell doubles the ring to 2px; the port uses the shared
  `borderWidths.thick` ring.
- **Pin Input sequential entry.** Because the value is a contiguous string,
  typing into a cell after a gap redirects focus to the first empty cell rather
  than creating a hole; this keeps `value` well-defined without an array model.
- **Disabled surfaces.** As with `Textarea`, the port uses the shared
  `Input`-style disabled treatment (`action/disabled-bg` plus the disabled text
  role / opacity) rather than Pen's per-component disabled fills, so every form
  control disables alike.
