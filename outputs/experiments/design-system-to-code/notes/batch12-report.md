# Batch 12 report: Date Input, Calendar, Date Picker, File Upload, Color Picker, Rating and Editable from the Pen design system

**Date:** 2026-10-02
**Commit:** `feat: port Date Input, Calendar, Date Picker, File Upload, Color Picker, Rating, Editable from Pen design system`
**Source of truth:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (read-only UTF-8 JSON, inspected with `node`).
**Branch:** current worktree (no branch or worktree switch).
**Model:** `deepseek/deepseek-flash` (single model performed implementation and self-audit; no independent cross-model review available).

## Components ported

Seven public React + PandaCSS components, each with a preset, component, barrel,
composition test and Storybook story. All seven are slot recipes. `Calendar`
also exports the nested `CalendarDay` master, sharing the one `calendar` recipe.

| Component | Pen master (id) | Recipe key | Anatomy |
| --- | --- | --- | --- |
| Date Input | `Date Input` frame `ivx6N` | `dateInput` | root / label / control / icon / input / hint / error |
| Calendar | `Calendar` frame `zh2sP` (+ `Calendar Day` `oKLr9`) | `calendar` | root / header / monthLabel / navButton / grid / weekdays / weekday / week / day |
| Date Picker | `Date Picker` frame `bpCbJ` (+ `Date Input` `ivx6N`, `Calendar` `zh2sP`) | `datePicker` | root / control / field / icon / value / hint / error |
| File Upload | `File Upload` frame `YxCMD` | `fileUpload` | wrapper / root / input / icon / title / description / count / hint / error |
| Color Picker | `Color Picker` frame `Ecy07` (+ `Color Popup` `vUOIa`) | `colorPicker` | root / control / field / swatch / value / chevron / palette / swatchButton / hint / error |
| Rating | `Rating` frame `qIRY3` | `rating` | root / star / valueLabel |
| Editable | `Editable` frame `zoEMh` | `editable` | root / control / value / icon / editor / input / error |

The reusable masters live in
`05 Components — Forms & selection — Masters (library)`. There is no separate
`Calendar` documentation frame; its public variants and state contract are
documented inside `Components — Forms & selection — Date Picker`. The
documentation frames supplied the public variants, state contract, role-token
contract and interaction rules.

## API shape

- **Date Input** follows the `Input` field contract: `label` above, `hint` or
  `error` below, the component owns `aria-invalid` / `aria-describedby`, and a
  native `<input type="text">` with a decorative `calendar` glyph. It is a
  typed ISO date; parsing and formatting stay with the consumer.
- **Calendar** is a month grid of `CalendarDay` buttons. Displayed month is
  `month` + `onMonthChange` or `defaultMonth`; the selected day is `value` +
  `onChange` or `defaultValue`. `min`, `max`, `isDateDisabled`, `rangeStart` /
  `rangeEnd`, `today` and `weekStartsOn` are optional. `surface` is `overlay`
  (its own card) or `embedded` (for a host popover). Keyboard: arrows move by
  day/week, `Home` / `End` by week edge, `PageUp` / `PageDown` by month.
- **Calendar Day** is a public button with `date`, `selected`, `today`,
  `inRange`, `outsideMonth`, `disabled` and `onSelect`.
- **Date Picker** pairs a button trigger styled as the Date Input field with the
  `Calendar` inside the shared `Popover`. `value` / `defaultValue` + `onChange`,
  `open` / `defaultOpen` + `onOpenChange`, `min`, `max`, `today`,
  `weekStartsOn`, `disabled`, `invalid`, `hint`, `error`. Selecting a day closes
  the surface.
- **File Upload** is a dropzone-styled `<label>` over a hidden native file
  input. Clicking anywhere opens the platform picker; drag events are handled on
  the label. `onFilesChange` reports the `File[]`, the selected count is shown,
  and `title` / `description` / `hint` / `error` / `invalid` / `disabled` are
  supported.
- **Color Picker** is a swatch trigger plus a `6 × 2` palette inside the shared
  `Popover`. `value` / `defaultValue` + `onChange` carry the colour string;
  `palette` overrides the 12-colour default; `open` / `defaultOpen` /
  `onOpenChange`, `disabled`, `invalid`, `hint`, `error` are supported.
- **Rating** is a row of `max` (default 5) star buttons. `value` / `defaultValue`
  + `onChange`, `readOnly`, `disabled`, `size` (`sm` / `md` / `lg`),
  `showValue` and an accessible `label`. Interactive mode is a `radiogroup`;
  hover previews the score; arrows, `Home` and `End` adjust it.
- **Editable** renders a focusable read view that switches to a controlled
  input. `value` is required; `onSave` receives the confirmed value on Enter or
  blur, `onCancel` fires on Escape, and `placeholder`, `affordance`, `disabled`,
  `invalid`, `error` are supported.

## Pen → code mapping

Pen carries a **role** layer (`semantic/surface/*`, `semantic/text/*`,
`semantic/border/*`, `semantic/action/*`, `semantic/focus/*`,
`semantic/feedback/*`, `semantic/brand/*`, `semantic/shadow/*`) on top of the
numeric matrix the code foundation ports. The shared aliases from batches 1–11
carry over unchanged: `surface/raised`/`surface/overlay` →
`common.50.background`, `surface/sunken`/`surface/hover` →
`common.100.background`, `surface/selected` → `brand.50.background`,
`border/strong` → `common.50.border.strong`, `border/subtle` →
`common.200.divider`, `text/primary` → `common.50.text`, `text/secondary` →
`common.700.background`, `text/tertiary` → `common.600.background`,
`text/disabled` → `common.400.background`, `text/link` →
`brand.700.background`, `action/primary-bg` → `brand.700.background`,
`action/primary-fg` → `common.50.background`, `action/disabled-bg` →
`common.100.background`, `action/disabled-fg` → `common.400.background`,
`focus/ring` → `brand.500.background`, `feedback/negative-border` →
`negative.600.background`, `feedback/negative-fg` → `negative.700.background`,
`shadow/500` → `semantic.shadow.500`.

### Per-master values

- **Date Input**: 200×40 field, `surface/raised`, `border/strong`, `md` radius,
  12px (`x6`) inline padding, 8px (`x4`) gap, 16px `calendar` glyph in
  `text/tertiary`, value `sm` in `text/primary`. Focus swaps the boundary for
  `focus/ring`; invalid for `feedback/negative-border`; disabled reads
  `action/disabled-bg` / `action/disabled-fg`.
- **Calendar**: 292px overlay, `surface/overlay`, `border/subtle`, `md` radius,
  `shadow/500`, 8px (`x4`) gap, 12px (`x6`) padding. Month label `sm` /
  semibold / `text/primary`; nav chevrons 16px in `text/secondary`; weekday
  labels `xs` in `text/tertiary`; day cell 32px tall, `sm` radius, number `xs`.
  Selected day `action/primary-bg` + `action/primary-fg`; today
  `surface/selected` + `border/strong` ring + `text/link`; range band
  `brand.100.background` + `brand.100.text`; disabled `text/disabled`.
- **Date Picker**: 300px column with a 10px (`x5`) gap; trigger is the Date
  Input field; the calendar is the same master. The popover owns the overlay.
- **File Upload**: 280×150 dropzone, `surface/raised`, `border/strong`, 24px
  (`x12`) padding, 8px (`x4`) gap, centred; 24px `upload` glyph in
  `text/tertiary`; title `md` / semibold / `text/primary`; body `sm` /
  `text/secondary`. Hover `surface/hover`; drag-active and focus `focus/ring`;
  error `feedback/negative-border`; disabled `action/disabled-bg` /
  `text/disabled`.
- **Color Picker**: 180×40 trigger, `surface/raised`, `border/strong`, 12px
  (`x6`) inline padding with a 8px (`x4`) gap; 20px swatch with a
  `border/subtle` ring; value `xs` / `text/primary`; 14px chevron in
  `text/tertiary`. Popup 220px, `surface/overlay`, `border/subtle`, `md`
  radius, `shadow/500`, 12px (`x6`) padding, `6 × 2` swatches at 24px with an
  `sm` radius; the selected swatch ring is `text/primary`.
- **Rating**: 4px (`x2`) row gap; 20px stars in `border/strong` (empty) and
  `text/primary` (filled); `sm` / `md` / `lg` reuses the shared Icon scale.
- **Editable**: 6px / 8px (`x4`) root padding, `sm` radius; value `sm` /
  medium / `text/primary`; 14px pencil in `text/tertiary`; hover
  `surface/hover`; focus/edit `surface/raised` + `focus/ring`; invalid
  `feedback/negative-border`; disabled `action/disabled-bg`.

## Icons

Four new glyphs were added through the icon pipeline (Material filled sources),
bringing the committed manifest from 32 to **36**:

- `calendar` → `Date Input`, `Date Picker`
- `upload` → `File Upload`
- `star` → `Rating`
- `pencil` → `Editable`

`mise run icons:check` is green and the manifest/font are committed.

## Registration

- `src/shared/styles/index.ts`: imports, exports and `componentPresetSources`
  (all seven are `theme.slotRecipes`, appended after `pinInput` in the order
  `dateInput`, `calendar`, `datePicker`, `fileUpload`, `colorPicker`, `rating`,
  `editable`). The recipe list (`icon`, `dividerRule`, `skeleton`, `spinner`) is
  unchanged.
- `src/shared/styles/presets.test.ts`: recipe imports; both forward and reversed
  slot-recipe lists; the `toBeDefined` / `toEqual` assertions. The slot-recipe
  list grows from 59 to 66.
- `panda.config.ts`: `staticCss.recipes` gains the seven recipes for their
  runtime variants.
- `knip.jsonc`: each component `index.ts` added as an entry point.
- `src/app/App.tsx`: every component composed in the forms section (a Date
  Input with a format hint, an open Date Picker, a Calendar with a selected day,
  a multiple File Upload, a Color Picker, a Rating with a value label, and an
  Editable), so Knip sees real usage.

## Files

New, per component (`date-input`, `calendar`, `date-picker`, `file-upload`,
`color-picker`, `rating`, `editable`):

- `src/shared/components/<name>/preset.ts`
- `src/shared/components/<name>/<name>.tsx`
- `src/shared/components/<name>/index.ts`
- `src/shared/components/<name>/<Pascal>.composition.test.tsx`
- `src/shared/components/<name>/<Pascal>.stories.tsx`

`Calendar` additionally owns `date-utils.ts` (pure, dependency-free date math
shared with `Date Picker`).

Modified:

- `panda.config.ts`
- `src/shared/styles/index.ts`
- `src/shared/styles/presets.test.ts`
- `knip.jsonc`
- `src/app/App.tsx`
- `src/shared/components/icon/assets/svg/{calendar,pencil,star,upload}.svg`
- `src/shared/components/icon/assets/font/icon.woff2`
- `src/shared/components/icon/manifest.generated.ts`

## Commands and results

| Command | Result |
| --- | --- |
| `mise run gen` | ✓ codegen + cssgen (399 files extracted) |
| `mise run fix:format` / `fix:lint` | ✓ clean |
| `mise run check` | ✓ lint, types, format, icons, fonts, tests (620 unit / 377 browser) |
| `mise run check:deps` | ✓ Knip clean |

The generated CSS contains the new classes (`dateInput__icon`,
`calendar__day--selected_true`, `datePicker__field--invalid_true`,
`fileUpload__count`, `colorPicker__swatchButton--selected_true`,
`rating__star--filled_true`, `editable__control--disabled_true`, …) and the
runtime variant classes emitted through `staticCss`.

## Accessibility

- **Date Input** reuses the `Input` contract: the label is bound with
  `htmlFor`/`id`, `aria-invalid` sits on the control, and `aria-describedby`
  points at the error while `invalid` and a non-blank `error` are both present.
  The calendar glyph is decorative.
- **Calendar** is a `role="grid"` with a labelled nav, `role="columnheader"`
  weekdays that carry the long day name, `role="gridcell"` day buttons with
  `aria-selected`, `aria-current="date"` for today and `aria-disabled` for
  unavailable days. Roving tabindex and arrow / `Home` / `End` / `PageUp` /
  `PageDown` navigation are implemented; the selected day’s accessible name is
  the full date.
- **Date Picker** reuses `Popover`’s `aria-haspopup="dialog"` /
  `aria-expanded`; the surface is a labelled dialog containing the calendar
  grid; selecting closes it and `Escape` / outside click leave the value
  untouched.
- **File Upload** keeps the native file input (form semantics, keyboard and
  platform picker) visually hidden inside the label, so the dropzone is
  reachable and activatable by keyboard. `aria-invalid` /
  `aria-describedby` sit on the input; drag-and-drop has a keyboard equivalent
  through the same input.
- **Color Picker** exposes the swatch value as the trigger’s name and renders
  the palette as a labelled `role="listbox"` of `role="option"` buttons with
  `aria-selected`; every swatch has an accessible name.
- **Rating** interactive mode is a `role="radiogroup"` of `role="radio"`
  buttons with `aria-checked`, labelled (“N of M”), arrow-key adjustable and a
  single roving tab stop. Read-only / disabled ratings are a single
  `role="img"` (“N out of M”) with decorative glyphs.
- **Editable** read view is a focusable button that announces its action
  (`Edit <value>`); the edit view is a labelled input with `aria-invalid` and
  `aria-describedby` bound to the error. Enter confirms, Escape cancels, blur
  confirms.
- Focus rings come from `semantic.brand.500.background` and match `Button` /
  `Input`. Date Input, Calendar, Date Picker, Color Picker, File Upload, Rating
  and Editable all draw the same shared ring.

## Approximations and concerns

- **Date Picker trigger is a button, not a typed input.** The shared `Popover`
  wraps its trigger in a button, so the picker trigger is a button styled as
  the Date Input field and the value is chosen from the calendar. Typed entry
  lives in the standalone Date Input. The trigger’s accessible name is its
  value; there is no separate visible label association because `Popover` owns
  the button. Consumer-supplied typed parsing is out of scope.
- **Calendar has no date library.** `calendar/date-utils.ts` implements the few
  local-time helpers (start of week/month, add days/months, day counts) with
  plain `Date`; no dependency was added. Month and weekday names are English
  literals, matching Pen’s `M T W T F S S` and “March 2025”.
- **Calendar range is visual only.** `rangeStart` / `rangeEnd` paint the
  `brand/100` band; the component does not manage range selection gestures.
- **Calendar opens on `defaultMonth`.** A controlled `month` only moves through
  `onMonthChange`, matching the repository’s controlled/uncontrolled
  convention; the `NextMonth` story uses `defaultMonth` to exercise navigation.
- **File Upload reports the count, not per-file progress.** Pen’s file row,
  progress bar and retry affordance are out of scope. Dropped files are held in
  component state and reported through `onFilesChange`; they are not injected
  into the native `input.files`, so a plain form submit does not include them.
- **Color Picker palette values are literals.** The default 12 colours mirror
  `palette` steps 600 and 500 for blue, sky, cyan, green, red and neutral; they
  are literal hex strings because a colour value is data, not chrome. Pen’s
  opacity field and value field are out of scope.
- **Rating filled colour.** Pen’s master draws every star in `border/strong`
  and its specimens do not paint a distinct filled state, so the port defines
  filled as `text/primary`; the hover row fill from `surface/hover` is not
  reproduced.
- **Editable saving state.** Pen’s saving state, confirm/cancel buttons and
  multiline variant are out of scope. Blur confirms in addition to Enter, and
  `value` remains controlled by the consumer.
- **Mono face.** Pen renders the Date Input value, Calendar day numbers, the
  Color Picker value and the File Upload caption in a mono face. The foundation
  ships only `body`, so those slots compose `body` at the nearest size.
- **File Upload and Editable radii.** Pen uses a `lg` radius for the dropzone
  and `sm` elsewhere; the foundation only has `sm` / `md`, so the dropzone uses
  `md` and the 150px height stays a literal.
- **Disabled surfaces.** As with `Textarea`, the port uses the shared
  `Input`-style disabled treatment rather than Pen’s per-component fills, so
  every form control disables alike.
