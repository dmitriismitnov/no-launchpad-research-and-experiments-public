# Design: full Pen component migration

**Status:** completed (bounded acceptance, 2026-10-05) — corrected from the
original `planned`; see
`outputs/experiments/pencil-opencode-workflow/notes/retrospective.md` and
`batch-e-evidence.md` §10. Bounded means 82 masters map to 72 owner directories
with the documented commands passing, but many documented public axes remain
`BLOCKED`; this is not full behavioral/visual parity.\
**Pen authority:** read-only `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` (82 reusable masters; inspected 2026-10-03).

## Goal and scope

Migrate every reusable Pen master, including every documented visual variant and state, into the existing React/Panda component system. Preserve the Pen theme axis and add only accessibility and interaction behaviour explicitly documented by Pen. The six component groups are Actions, Forms & selection, Navigation & disclosure, Content & data, Overlays, and Feedback & status. Cross-cutting Foundation, Assets—Icons, State model, and Theme Switch Preview are also included.

**Out of scope:** changing either Pen file; dashboard/screens; new product flows, persistence, networking, routing, validation rules, animations, or interaction semantics not documented by a master; generated `src/shared/styled-system/` edits; and reopening the completed Landing work. Landing screenshots remain final regression/evidence only.

## Mapping matrix

`Owner` is the production directory responsible for the master. `Aggregate` means the Pen master is an internal part of that owner, not a new public component. Each owner normally contains `{component}.tsx`, `preset.ts`, `index.ts`, `{Component}.stories.tsx`, and `{Component}.composition.test.tsx`.

### Cross-cutting (2)

| Pen ID / master               | Owner / decision                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `q5xZR3` Theme Switch Preview | `src/shared/components/theme-switch-preview/`; verify the themed preview only, not a global theme-setting runtime feature. |
| `pt3X0` Asset Icon Tile       | `src/shared/components/asset-icon-tile/`; use the canonical `icon/` manifest, never a drawn substitute.                    |

### Actions (4)

| Pen ID / master      | Owner / decision                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| `IcuBw` Button       | `src/shared/components/button/`                                                                     |
| `L72UAx` Icon Button | `src/shared/components/button-icon/`                                                                |
| `gkK5e` Toggle       | `src/shared/components/toggle/`                                                                     |
| `e5ySA` Toggle Group | `src/shared/components/toggle-group/`; also owns the documented Segmented Control projection below. |

### Forms & selection (23)

| Pen ID / master      | Owner / decision                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `dO8tX` Text Input   | `src/shared/components/input/`                                                                                        |
| `w6oNZ7` Textarea    | `src/shared/components/textarea/`                                                                                     |
| `EZfrL` Number Input | `src/shared/components/number-input/`                                                                                 |
| `e2q2z` Checkbox     | `src/shared/components/checkbox/`                                                                                     |
| `UrFJz` Radio        | `src/shared/components/radio/`; atomic control consumed by `radio-group/`.                                            |
| `BQvnn` Switch       | `src/shared/components/switch/`                                                                                       |
| `z57yzW` Slider      | `src/shared/components/slider/`                                                                                       |
| `tOLtR` Select       | `src/shared/components/select/`                                                                                       |
| `GjzX0` Option       | Aggregate under `src/shared/components/select/`; no standalone export unless code consumption proves one is required. |
| `aXD61` Select Popup | Aggregate under `src/shared/components/select/`; trigger/listbox relationship is tested at Select level.              |
| `f985P` Multi Select | `src/shared/components/multi-select/`                                                                                 |
| `ivx6N` Date Input   | `src/shared/components/date-input/`                                                                                   |
| `oKLr9` Calendar Day | Aggregate under `src/shared/components/calendar/`, consumed by `date-picker/`.                                        |
| `zh2sP` Calendar     | `src/shared/components/calendar/`; DatePicker owns its calendar integration.                                          |
| `E3ZhdP` Pin Input   | `src/shared/components/pin-input/`                                                                                    |
| `YxCMD` File Upload  | `src/shared/components/file-upload/`                                                                                  |
| `Ecy07` Color Picker | `src/shared/components/color-picker/`                                                                                 |
| `vUOIa` Color Popup  | Aggregate under `src/shared/components/color-picker/`.                                                                |
| `qIRY3` Rating       | `src/shared/components/rating/`                                                                                       |
| `zoEMh` Editable     | `src/shared/components/editable/`                                                                                     |
| `pHfEy` Field        | `src/shared/components/field/`                                                                                        |
| `IENTK` Radio Group  | `src/shared/components/radio-group/`; composes `radio/`.                                                              |
| `bpCbJ` Date Picker  | `src/shared/components/date-picker/`; composes `date-input/` and `calendar/`.                                         |

### Navigation & disclosure (15)

| Pen ID / master        | Owner / decision                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `QWV5n` Link           | `src/shared/components/link/`                                                                         |
| `l8wwSv` Nav Item      | `src/shared/components/nav-item/`                                                                     |
| `MGoSj` Brand          | `src/shared/components/brand/`                                                                        |
| `Bvk23` Breadcrumbs    | `src/shared/components/breadcrumbs/`                                                                  |
| `EagLC` Sidebar Item   | `src/shared/components/sidebar-item/`                                                                 |
| `KI0Dl` Top Navigation | `src/shared/components/top-navigation/`                                                               |
| `z2jG4r` Tab           | `src/shared/components/tab/`                                                                          |
| `YGgyy` Accordion Item | `src/shared/components/accordion-item/`                                                               |
| `CX1vE` Menu Item      | Aggregate under `src/shared/components/menu/`; atomic menu row is not separately exported by default. |
| `GLufg` Menu           | `src/shared/components/menu/`; owns Menu Item keyboard/focus composition.                             |
| `cAzIA` Step           | `src/shared/components/step/`                                                                         |
| `RFehj` Tree Item      | `src/shared/components/tree-item/`                                                                    |
| `rm4a0` Carousel       | `src/shared/components/carousel/`                                                                     |
| `DdvJi` Pagination     | `src/shared/components/pagination/`                                                                   |
| `rokhq` Context Menu   | `src/shared/components/context-menu/`; owns its menu-item composition.                                |

### Content & data (19)

| Pen ID / master           | Owner / decision                                                        |
| ------------------------- | ----------------------------------------------------------------------- |
| `M4GSR0` Icon             | `src/shared/components/icon/` and its generated manifest/font pipeline. |
| `q9qgrL` Avatar           | `src/shared/components/avatar/`                                         |
| `ziJHM` Card              | `src/shared/components/card/`                                           |
| `vTMbw` Card Plain        | Aggregate `plain` variant of `card/`.                                   |
| `XqPjN` Card Compact      | Aggregate `compact` variant of `card/`.                                 |
| `CjnzL` Statistic         | `src/shared/components/statistic/`                                      |
| `h9Cf2t` List Item        | Aggregate under `src/shared/components/list/`.                          |
| `d5pll` Timeline Item     | Aggregate under `src/shared/components/timeline/`.                      |
| `M2LZ59` Table Row        | Aggregate under `src/shared/components/data-table/`.                    |
| `fgxmm` List              | `src/shared/components/list/`                                           |
| `z4hUE9` Timeline         | `src/shared/components/timeline/`                                       |
| `FZPkF` Data Table        | `src/shared/components/data-table/`                                     |
| `Jfhu9` Clipboard         | `src/shared/components/clipboard/`                                      |
| `th3Nd` Code Block        | `src/shared/components/code-block/`                                     |
| `pHjwJ` Scroll Area       | `src/shared/components/scroll-area/`                                    |
| `U4KfQj` Splitter         | `src/shared/components/splitter/`                                       |
| `SX6Gf` Media Placeholder | `src/shared/components/media-placeholder/`                              |
| `kQTMg` QR Code           | `src/shared/components/qr-code/`                                        |
| `vZUUG` Divider           | `src/shared/components/divider/`                                        |

### Overlays (9)

| Pen ID / master         | Owner / decision                        |
| ----------------------- | --------------------------------------- |
| `eEhwI` Tooltip         | `src/shared/components/tooltip/`        |
| `Qwced` Popover         | `src/shared/components/popover/`        |
| `l7aEf` Hover Card      | `src/shared/components/hover-card/`     |
| `UJUPb` Dialog          | `src/shared/components/dialog/`         |
| `FiHft` Alert Dialog    | `src/shared/components/alert-dialog/`   |
| `UbA6r` Drawer          | `src/shared/components/drawer/`         |
| `aOMDf` Sheet           | `src/shared/components/sheet/`          |
| `J3VmmT` Floating Panel | `src/shared/components/floating-panel/` |
| `AHDih` Tour            | `src/shared/components/tour/`           |

### Feedback & status (10)

| Pen ID / master          | Owner / decision                          |
| ------------------------ | ----------------------------------------- |
| `Q2PWF` Alert            | `src/shared/components/alert/`            |
| `F1P1XX` Toast           | `src/shared/components/toast/`            |
| `as3xr` Badge            | `src/shared/components/badge/`            |
| `UyMqu` Tag              | `src/shared/components/tag/`              |
| `tTGQi` Progress         | `src/shared/components/progress/`         |
| `yz7HH` Progress Ring    | `src/shared/components/progress-ring/`    |
| `qfUOu` Skeleton         | `src/shared/components/skeleton/`         |
| `lpijt` Spinner          | `src/shared/components/spinner/`          |
| `Kj5Nm` Empty State      | `src/shared/components/empty-state/`      |
| `a4r4Y` Status Indicator | `src/shared/components/status-indicator/` |

The table totals 82 masters (2 + 4 + 23 + 15 + 19 + 9 + 10).

## Foundation, icons, state, and theme contracts

- Foundation audit owner: `src/shared/styles/foundation/{colors,layout,shape,typography}/`, `preset.ts`, `foundation.test.ts`, and `Colors.stories.tsx`. Semantic tokens and `data-theme` remain the sole colour-theme mechanism; components do not create light/dark implementations.
- Icon audit owner: `src/shared/components/icon/{assets/svg,manifest.generated.ts,icon.tsx,icon.css,tools/}` plus Asset Icon Tile. Raw SVG changes follow the icon pipeline and `mise run icons:check`; generated files are never hand-edited.
- State model: for each Pen documentation frame, transcribe only its shown public variants and state specimens (default/selected, hover, active where shown, focus-visible, disabled, invalid, open/closed, and light/dark). Native semantics and the Pen accessibility contract are implementation requirements; static art alone does not authorize additional async, persistence, route, validation, dismissal, or animation behaviour.
- Theme Switch Preview is a visual comparison component. It must render equivalent nested content in explicit light and dark contexts and must not become a global preference controller unless a separate product requirement says so.

## Segmented Control documentation decision

`Components — Forms & selection — Segmented Control` (`yqYp1`) explicitly labels its stable master `Toggle Group` and all anatomy/state/theme specimens are refs to `e5ySA`. It therefore maps to `toggle-group/`, not a missing component. Before implementation, the worker must re-query `yqYp1` and `e5ySA`, compare its named parts and variants, and confirm that the existing public API can express **two/three/four exclusive segments, icon, disabled, selected, hover, focus-visible**. Its documented accessibility is `radiogroup`, arrow-key movement, announced selected segment, and accessible names for icon-only segments. If any of those cannot be expressed without changing ToggleGroup's contract, record a blocking API decision rather than creating a second SegmentedControl implementation.

## Public-variant enumeration gate

Before a master is accepted, the worker must transcribe the **complete** public
variant list from its documentation frame (the explicit `Public variants` text
and its specimens), not infer it from the current React API. Every documented
axis (tone, size, width, icon placement, appearance, selection mode, state) must
either map to an existing public prop or be recorded as a `BLOCKED` API
decision. Carrying the existing API over unchanged is not sufficient evidence.

Known enumeration gaps found after Batch A / phase 1 (recorded here so they are
not lost):

- `IcuBw` Button: documented `tone` is `primary · secondary · ghost · destructive`;
  code ships only `primary · secondary · ghost`. `semantic.action.danger.*`
  already exists and matches Pen (`action/danger-bg` = red.600 both themes,
  `danger-bg-hover` = red.700, `danger-fg` = white, `danger-border` = red.300/500).
  `alert-dialog/preset.ts:26` works around the missing tone by duplicating the
  danger confirm styling locally.
- `L72UAx` Icon Button: `tone` (including destructive) must be re-enumerated.
- `QWV5n` Link: documented variants include inline · standalone, with icon,
  external, disabled, current.
- `as3xr` Badge: `tone × appearance (subtle · solid · outline) × size`.
- `Q2PWF` Alert: `info · positive · negative · neutral`, with title, with
  action, dismissible.
- `a4r4Y` Status Indicator: `positive · warning · negative · neutral · inactive`.
- `UyMqu` Tag: `static · removable · selectable`, tone, size.
- `e5ySA` Toggle Group: single vs multiple selection is a named public variant.

Each gap is closed in the owning batch slice with a failing test proven against
the Pen documentation frame before the recipe change. A master already marked
"migrated" (Button, ButtonIcon, Card) is not exempt: it returns to its batch for
the enumeration gap.

## Acceptance and evidence contract

For each matrix row, acceptance requires: (1) Pen source ID, documentation-frame ID, and exact state/variant list recorded; (2) an owner Storybook story covering every visual state in light and dark; (3) a failing focused test before a proven correction, then passing composition/unit/browser assertions for semantics, accessible name, keyboard/focus behaviour where Pen documents it; (4) computed-style or screenshot evidence for geometry, type, token role, boundaries, icons, and no clipping; and (5) a final row disposition.

Evidence is stored in the established experiment evidence location with the Pen ID, code story/route, viewport, theme, state, timestamp, and command result. Side-by-side capture is required for every owner and aggregate master; landing captures are regression-only and are not implementation targets. `PASS` means evidence meets the Pen contract; `FAIL` means a demonstrated mismatch; `INFO` is descriptive/non-normative; `HUMAN REVIEW` is a remaining subjective visual judgement; `BLOCKED` means a source/API decision is needed. Disabled contrast is recorded as `DISABLED / REVIEW`, never silently counted as PASS. A batch cannot advance with unresolved `FAIL`, `BLOCKED`, Critical, or Important review findings.

## Behaviour boundary

Implement only behaviour demonstrated or written in Pen documentation: semantic HTML/ARIA, keyboard navigation, focus-visible handling, disabled/read-only effects, selection/open/close where specimens or accessibility text state it, and controlled/uncontrolled state needed to expose those visuals. Do not infer server actions, validation policy, toast queues, carousel autoplay, tour progression, drag persistence, calendar business rules, file transfer, clipboard fallback policy, QR generation policy, or route transitions. Where Pen shows only a static visual and no interaction/accessibility rule, render it accessibly but leave runtime behaviour inert or externally controlled.
