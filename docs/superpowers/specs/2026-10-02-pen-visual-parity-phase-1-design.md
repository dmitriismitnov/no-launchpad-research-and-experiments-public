# Design: Pen visual parity — phase 1

**Status:** proposed

## Goal

Make the code implementation visually conform to the approved Pen source of
truth for the first, highest-impact scope:

- `Button`;
- `ButtonIcon`;
- `Card` (`default`, `plain`, `compact`);
- the landing at desktop, tablet and mobile breakpoints.

The same implementation must resolve correctly in light and dark contexts.
This is a visual-parity task; it must not broaden public APIs or redesign the
system.

## Source of truth and evidence

| Area       | Pen source                                                                                          | Code source                              |
| ---------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Button     | `IcuBw` master in `artifacts/ex_2.pen`                                                              | `src/shared/components/button/`          |
| ButtonIcon | `L72UAx` master in `artifacts/ex_2.pen`                                                             | `src/shared/components/button-icon/`     |
| Card       | `ziJHM`, `vTMbw`, `XqPjN` masters in `artifacts/ex_2.pen`                                           | `src/shared/components/card/`            |
| Landing    | `10 Landing — desktop` (`DsHK8`), `11 Landing — tablet` (`XiPDu`), `12 Landing — mobile` (`T4klu9`) | `src/app/Landing.tsx`, `src/app/App.tsx` |

Pen is the visual authority. Existing port reports are evidence of past
decisions, not permission to retain a divergence.

## Scope

### In scope

1. Audit the listed Pen masters and landing frames against current Storybook or
   app renders in light and dark.
2. Correct component recipes, component markup and landing composition where
   the render differs from Pen.
3. Add only the foundation tokens needed to express an approved Pen value
   consistently. Tokens remain semantic or scale tokens; no component-local
   raw colour substitutions.
4. Add visual/browser and composition regression coverage for every corrected
   component state and landing breakpoint.
5. Rebuild Panda output through `mise run gen`.

### Out of scope

- other component masters and dashboard screens;
- changing Pen files, reusable Pen masters or semantic theme definitions;
- new interaction features not required by Button, ButtonIcon, Card or the
  landing render;
- mono typography, inverse tooltip surface, overlay scrim role and unrelated
  missing icons;
- replacing the icon font architecture.

## Visual contract

### Shared principles

- Preserve `data-theme` as the sole light/dark axis; do not fork components by
  theme.
- Use semantic tokens for colour, foundation tokens for scale and Panda recipes
  for component visuals.
- Match Pen geometry before introducing a new component prop. A public API
  change needs an explicit follow-up decision.
- Platform rasterization differences are acceptable; geometry, role colours,
  hierarchy and responsive structure are not.

### Button and ButtonIcon

For each public tone and supported size, verify and align:

- control dimensions, inline/block padding, corner radius, icon box and label
  alignment;
- fill, border, shadow and label/icon roles in both themes;
- hover, active, disabled and focus-visible behaviour;
- Button and ButtonIcon alignment when used side by side.

The Pen Button master is the baseline. Any code-only size that Pen does not
document remains supported, but must not distort the documented size.

### Card

Align the three Pen masters without duplicating the public Card component:

- `default`: media surface, body, header, footer and action geometry;
- `plain`: 320px source geometry, no media, body density and no footer divider;
- `compact`: 280px source geometry, no media, compact type/density and no
  footer divider;
- raised surface, subtle boundary, shadow, media ratio, title/description
  hierarchy and corner radius.

If Pen requires `radius/lg`, introduce a shared foundation value rather than
silently mapping it to `md`.

### Landing

The landing is a composition of existing components plus app-local Panda CSS.
It must match the three Pen frames, including:

- desktop header, hero, action row, statistics strip, feature cards, workflow,
  theme section, CTA and footer;
- tablet reflow and spacing rather than desktop auto-fit incidental layout;
- mobile header/menu treatment, one-column hierarchy, typography and section
  spacing;
- the same content hierarchy and component usage in light and dark.

The landing must not use visual substitutes for reusable components where a
ported component exists.

## Implementation approach

1. Create a read-only comparison inventory: each target master/frame, its Pen
   measurements and token roles, current code selector/API, current render,
   and a PASS/FAIL finding.
2. Work component-by-component in dependency order: foundation gap (if any),
   Button/ButtonIcon, Card, then Landing.
3. For every behaviour or visual contract correction, add a failing targeted
   regression test before production code. Observe the failure, implement the
   minimal correction, then run the focused test.
4. Capture side-by-side Pen/code screenshots after each component group and
   after every landing breakpoint/theme pair.
5. Keep a findings table distinguishing `PASS`, `FAIL`, `INFO` and `HUMAN
   REVIEW`; documented old approximations are reassessed against this spec.

## Acceptance criteria

### Components

- No unresolved visual FAIL remains for the documented Pen Button, ButtonIcon
  and Card masters in light or dark contexts.
- Component dimensions, padding, radius, typography, token roles and visual
  states are covered by tests or computed-style assertions.
- Existing accessibility contracts remain valid: native buttons, names,
  disabled state and visible focus treatment.
- Card variants retain one public Card API and do not regress media omission or
  footer semantics.

### Landing

- Desktop, tablet and mobile screenshots each match the corresponding Pen
  frame in section order, responsive structure, component selection and visual
  hierarchy for both themes.
- No clipping, overflow or collapsed layout is reported by browser tests or
  Pen comparison review.

### Verification

Run and record:

```sh
mise run gen
mise run check
mise run check:deps
mise run build
```

The implementation is accepted only after a final evidence-based visual review
of side-by-side Pen and code screenshots. Remaining subjective differences are
classified `HUMAN REVIEW`, never silently accepted.

## Risks and decisions

- The present code intentionally maps some Pen values to nearby foundation
  values. This phase reverses only divergences within scope, preferring a
  shared token extension when Pen needs a real missing scale value.
- The current landing relies heavily on generic `auto-fit` rules. Dedicated
  breakpoint styles are permitted when the Pen tablet/mobile frames demonstrate
  distinct structure.
- Existing untracked files are outside this task and must not be staged,
  modified or removed.
