# B1 Pen readback — Toggle / Toggle Group / Segmented Control

**Date:** 2026-10-03
**Method:** Pencil MCP `execute` read-only (`Get` visitor + `Print`). No `Update`/`Insert`/`Copy`/`Replace`/`Delete`/`Export`.
**Active document:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (unchanged; the only canvas editor reported by `get_app_state`).

## Source identity

| Role | Node | Name | Observed |
| --- | --- | --- | --- |
| Toggle master | `gkK5e` | Toggle | `frame` h=36; child `ihQWV` `icon` Glyph 16×16; child `N2L9IH` `text` Label "Toggle" |
| Toggle documentation | `MApo8` | Components — Actions — Toggle | `Header`, `Usage`, `Anatomy`, `Public variants`, `State contract`, `Token contract & audit`, `Theme comparison`, `Content & interaction rules`, `Accessibility contract`, `Composition examples` |
| Toggle Group master | `e5ySA` | Toggle Group | `frame`; `PIev4` Segment1 (`ILsrG` "Option 1"), `em3Np` Segment2 (`hhDp2` "Option 2"), `B2xw7x` Segment3 (`H5XSI` "Option 3"); labels `fw=$font-weight/medium` size `$font-size/sm` |
| Toggle Group documentation | `OHpCJ` | Components — Actions — Toggle Group | same section layout; specimens `yWNEk`; composition caps `Exclusive view · single` / `Multi format · multiple` |
| Segmented Control documentation | `yqYp1` | Components — Forms & selection — Segmented Control | stable master ref `Vpbjp` → `e5ySA`; specimens `r9whNR`, state frames `jWNfQ`, composition `M9Ly28` |

## Toggle contract (verbatim)

- Purpose: "Toggle is a two-state action that turns a setting on or off immediately, without a form submission."
- Anatomy labels: `root`, `icon or label`, `pressed surface`, `focus ring`.
- Public states (`State contract`): `default`, `hover`, `active`, `pressed`, `focus-visible`, `disabled`.
- Accessibility contract rules: "Expose pressed state to assistive technology." · "Keyboard toggles with Enter and Space." · "focus-visible ring identical to Button." · **"Icon-only toggles require an accessible label."**
- Content rules: "On and off are visually distinct through surface, not only through icon change." · "Label the setting, not the state: 'Bold', not 'Bold on'." · "Do not animate; show the resting and pressed key states only."
- Token contract: `decorative-boundary` surface/raised → border/subtle (INFO); `functional-boundary` surface/raised → border/strong (≥3); `focus-indicator` → focus/ring (≥3); `DISABLED / REVIEW` = 5 (light) / 5 (dark), never PASS.

## Toggle Group contract (verbatim)

- Purpose: "Toggle Group binds several toggles into one control where each option can be independently on or off, or where exactly one option is active."
- Usage: "Exclusive selection for compact view switching without navigation." · "Toolbar formatting where several attributes can be on at once." · "Never mix Toggle Group with tabs in the same region."
- Anatomy labels: `root`, `group surface`, `toggle item`, `divider`, `focus ring`.
- Public state specimens: `default`, `hover`, `pressed`, `focus-visible`, `disabled`; content rule **"Single vs multiple selection is a public variant and must be named."**
- Accessibility rules: "Expose selected and pressed state per item." · **"Arrow keys move between items; Enter and Space toggle."** · "focus-visible is drawn per item, not per group." · "Keep the group's accessible name describing the options, not the action."
- Token contract: `functional-boundary` surface/sunken → border/strong (≥3); `DISABLED / REVIEW` = 3 (light) / 3 (dark).

## Segmented Control projection contract (verbatim)

- `Variant names`: **"Public variants: two · three · four segments, with icon, disabled"**.
- Named parts: "root · segments · selected segment · sliding indicator · focus ring".
- State contract: `selected`, `hover`, `focus-visible`, `disabled`; usage "Two to five exclusive options."
- Content rules: **"One segment is always selected."** · "Labels stay short and parallel." · "The control keeps its width when the selection changes."
- Accessibility rules: **"Radiogroup semantics with arrow-key movement."** · **"The selected segment is announced."** · **"Each segment has an accessible name even when icon-only."**
- Selected specimen `OZiXD`: selected label `fw=600`, unselected `fw=500` (matches the existing recipe's `pressed` `fontWeight: semibold`). `r9whNR` default selected `Design` fill `#FFFFFF` / text `#0F172A`.
- Disabled specimen `UGVO0` shows a still-selected first segment on the disabled surface (`DISABLED / REVIEW`).

## Mapping decisions

- `gkK5e`/`MApo8` label-or-icon and the `icon-or-label` anatomy → `Toggle` optional `label` + decorative `icon`; the accessibility rule "Icon-only toggles require an accessible label" is the approved public API addition (`aria-label` required for the icon-only form).
- `e5ySA`/`OHpCJ` "single vs multiple selection is a public variant" → `ToggleGroup` `selectionMode: "single" | "multiple"` (default `multiple`).
- `yqYp1` radiogroup / arrow-key / announced selection / icon-only accessible names → the exclusive `single` projection. No `SegmentedControl` component or export is created; `e5ySA`/`toggle-group/` remains the single owner.
- `yqYp1` "sliding indicator" is a named part with no documented motion; per the migration behaviour boundary and the Batch B plan ("Do not create ... animation"), no animation is added.
