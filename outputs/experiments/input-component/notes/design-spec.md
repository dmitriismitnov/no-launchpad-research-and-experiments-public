# Input v1 Design Specification

## Goal

Add a reusable, behavioural `Input` (single-line native `<input>`) to the shared
design system. It uses the `Input / Text` reference from
`outputs/shared/pen-design-system-integration/design/design_raw_1.pen`
(component id `YknUp`), while keeping the API independent of the reference.

`Input / Textarea` (id `G4rpg`) is out of scope for this experiment.

## Scope

### Included

- One `Input` React component in `src/shared/components/input/`.
- A PandaCSS slot recipe and registration in the shared component preset.
- An optional label, an `invalid` state and an optional `error` message with
  correct accessibility wiring (`aria-invalid`, `aria-describedby`,
  `htmlFor`/`id`).
- A shared focus-visible ring and disabled styling (opacity + `not-allowed`),
  matching `Button`.
- Native `<input>` attributes forwarded through; `className` merged with the
  recipe's control class.
- Unit, composition, and Storybook/browser coverage following Button/Card
  conventions.

### Excluded

- `Textarea` / `multiline`.
- zagjs / Ark UI / headless integration.
- Size variants (`sm`/`lg`) and responsive sizes.
- A `hint` slot, character counter, or leading/trailing in-field icons.
- A `classNames`-per-slot escape hatch (backlog `component-slot-classnames`).
- Creating or editing skills.

## Public API

`Input` renders a native `<input>` inside a `<div>` root. It accepts native input
attributes except `size` and `children`: the component owns its size and internal
structure.

```ts
export type InputProps = Omit<ComponentProps<"input">, "size" | "children"> & {
    /** Label above the control; bound to the control via htmlFor/id. */
    label?: string;
    /** Marks the control invalid: negative border + error message shown. */
    invalid?: boolean;
    /** Error message; rendered only when invalid === true. */
    error?: string;
};
```

`size` is excluded from the public API: a design-system `size` variant is a
separate future step. `children` is excluded because the component owns its
structure (native `<input>` has no children).

Optional text is present only when it contains non-whitespace content. Blank
strings (`""`, `"   "`) are treated as absent, matching the Card rule: a blank
`label` or `error` must not render an empty element. So a blank `label` renders
no `<label>`, and a blank `error` renders no `<p>` (even when `invalid` is
true) and no `aria-describedby`.

## Rendered Anatomy

The Panda slot recipe uses this internal anatomy:

```text
root
├── label      (<label>, optional)
├── control    (<input>, always)
└── error      (<p>, only when invalid && error is non-blank)
```

`root` is a flex column carrying only structure (layout + spacing). Typography
and colour belong to `label`, `control` and `error`.

## Behaviour

- **Native input.** `type`/`value`/`defaultValue`/`onChange`/`placeholder`/
  `name`/`required`/`disabled`/`readOnly`/`id`/`aria-*`/`data-*`/`className`
  are forwarded. The component is stateless, so controlled and uncontrolled
  usage both work.
- **`id`.** A consumer-supplied `id` wins; otherwise the component generates one
  with React `useId()`. `label → htmlFor={controlId}`, `input → id={controlId}`,
  `error → id={`${controlId}-error`}`.
- **`invalid`.** The input gets `aria-invalid={invalid || undefined}`. When
  `invalid` is true and `error` is non-blank, the input also gets
  `aria-describedby={errorId}` and an `<p id={errorId}>{error}</p>` is rendered.
  An `invalid` input without a non-blank `error` shows only the negative border
  and `aria-invalid` — no `<p>` and no `aria-describedby`.
- **ARIA ownership.** `aria-invalid` and `aria-describedby` belong to the
  component: consumer-supplied values of those two attributes are ignored, and
  the component sets them from its own `invalid`/`error`.
- **`disabled`.** Owned by the recipe: `_disabled` sets `cursor: not-allowed`
  and `opacity: 0.45`, matching `Button`. The native attribute also prevents
  focus and editing.
- **`error` without `invalid`.** The error stays hidden: no `<p>`, no
  `aria-invalid`, no `aria-describedby`.
- **Focus ring.** focus-visible outline is identical to `Button`: solid outline,
  `{borderWidths.thick}` width, `0` offset, `semantic.brand.500.background`
  colour.

## Visual Contract

- Match the reference's single control projection: surface fill, thin semantic
  divider border, `sm` radius, soft shadow, `x25` (50px) height, `x6` horizontal
  padding. Do not add public size or tone variants.
- Use only existing foundation and semantic tokens. The recipe must not branch on
  `_light` / `_dark`; semantic tokens own theme switching.
- Label typography is composed from foundation atoms: `body` family, `xs` size,
  `medium` weight, `normal` line height, `wide` tracking, `uppercase`
  transform. The reference's mono field-label face has no foundation equivalent;
  approximating it with `body` is deliberate and recorded here — adding a font is
  a separate font-pipeline step, out of scope.
- The placeholder is muted through the `semantic.common.500.background`
  projection via `&::placeholder`.
- Invalid border and error text use the `negative.600.background` accent
  projection. This is a code-only extension (the PEN reference has no error
  state), analogous to `Button.sm`.
- Muted text and accents use `.background` projections, following existing
  precedents (focus ring on Button = `brand.500.background`; muted text on Card
  = `common.<step>.background`).
- Control text is set in `body`/`sm`/`regular`/`normal` (14px) and does not
  inherit the UA default size.

## Integration and Verification

Register `inputPreset` with `componentPresetSources` in
`src/shared/styles/index.ts`, then run `mise run gen`. Never hand-edit
`src/shared/styled-system` (generated).

The barrel `src/shared/components/input/index.ts` is registered as a Knip entry
point, following the Button/Card convention.

Unit tests assert the recipe contract (anatomy, public variants, no theme
branches, no shorthands, shared focus ring, disabled styling, placeholder
projection, invalid border, label and control typography, typography kept out of
the root). Composition tests render to static markup and prove label binding,
native attribute forwarding, blank-region omission, invalid/error a11y wiring,
consumer-id reuse, and `className` forwarding. Stories cover a reference-like
composition, minimal, invalid, disabled and light/dark shells, with browser
`play` assertions.
