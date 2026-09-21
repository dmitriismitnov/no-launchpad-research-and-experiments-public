# Panda PEN Button Example

This folder is a visual-only, non-runnable Panda CSS example derived from
`design_raw.pen`. The application root supplies the sole global context with
`data-theme="light|dark"`. `panda.config.ts` defines static tokens and registers
the Button slot recipe; `src/theme/button.recipe.ts` keeps Button anatomy,
variants, and property-local light/dark conditions together.

`src/Button.tsx` illustrates the Button API. It consumes generated `button`
recipe styles and `cx`, composes the `root`, `prefixIcon`, `label`, and
`suffixIcon` slots, and exposes `tone` (`primary`, `secondary`, `ghost`,
`icon`) and `size` (`sm`, `md`). The label is omitted when no children are
provided, allowing the `icon` tone to compose an icon-only visual control.
Icon nodes supplied to Button must be exactly 16px for both `sm` and `md`,
derived from this PEN example's only icon size. Sizing is caller-owned because
this example deliberately has no runtime icon wrapper.

## Exclusions

This example intentionally omits package setup, dependencies, generated Panda
output, tests, runtime behavior, motion, density policy, and accessibility
behavior implementation. It does not define component-family layers,
extensions, or component overrides.
