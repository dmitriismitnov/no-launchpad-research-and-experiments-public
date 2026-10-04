# Batch C evidence — Navigation & disclosure

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Pen identity:** SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes (unchanged after inspection).\
**Base commit:** `47e4a5b34b854a4f4c7e0145c3611740ee64eda1` (`test(shared): add DateInput theme evidence and close Batch B gaps`).\
**Method:** Pencil MCP read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), code reads, focused Bun composition tests and Vitest + Playwright Chromium story tests. Statuses follow the migration spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.

## C1 — Navigation/disclosure atoms cycle 1/2

**Scope:** `Link`, `NavItem`, `Brand`, `Breadcrumbs`, `SidebarItem`. Approved contract only; no routing/API expansion.

### Pen source node IDs (read-only)

| Role | Master | Documentation frame (sub-frames) |
| --- | --- | --- |
| Link | `QWV5n` (Label, External glyph) | `n07t86` — anatomy `PepS9`, public variants `EJBov`, state contract `cG5Kz`, token contract `Z4EDge`, content `fFpIV`, accessibility `DTTTs` |
| Nav Item | `l8wwSv` (Label) | Top Navigation `LK4fe` — anatomy `i7Jca`, public variants `yL5Uy`, state contract `E1cOv`, token contract `iosjR`, content `V3mmGa`, accessibility `T5EFO` |
| Brand | `MGoSj` (Mark, Wordmark) | `DrhiG` / `xx7pJ` composition columns |
| Breadcrumbs | `Bvk23` (Crumb1, Sep2, Crumb2, Sep3, Crumb3) | `KiW8b` — anatomy `i2SiX`, public variants `H5sLG`, state contract `Mzd2Q`, token contract `A57dA`, content `U5t8b`, accessibility `sXHwZ` |
| Sidebar Item | `EagLC` (Icon, Label) | Sidebar Navigation `RLvWi` — anatomy `SULcX`, public variants `o8fgSP`, state contract `o2cnR`, token contract `uhiC3`, content `BCQA5`, accessibility `J0p5kC` |
| Shared states | — | `WHBN9` — "default, hover, current or active, focus-visible and disabled"; `yXciR` — "Exactly one destination is current in a navigation set" |

Verbatim Pen facts used:

- `Z4EDge` (Link) — token contract: focus-indicator row uses `focus/ring`; `DTTTs` — "External links announce that they leave the site."
- `iosjR` (Nav Item) — token contract: focus-indicator rows use `focus/ring`; `yL5Uy` — "Nav Item / Tab · default, hover, current, focus-visible, disabled".
- `A57dA` (Breadcrumbs) — token contract: focus-indicator row uses `focus/ring`; `i2SiX` — "Named parts: root · crumb · separator · current crumb · overflow control"; `H5sLG` — "Public variants: with overflow, with icon, compact"; `U5t8b` — "The last crumb is the current page and is not a link"; "Separators are decorative and hidden from assistive technology."
- `uhiC3` (Sidebar Item) — token contract: focus-indicator row uses `focus/ring`; `SULcX` — "Named parts: root · group label · item · icon · active indicator · nested item · collapse control"; `o8fgSP` — "Public variants: expanded · collapsed, with groups, with nesting".
- `MGoSj` (Brand) — Mark (rectangle) + Wordmark ("No Launchpad"); no link semantics.

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Link | focus indicator | `focus/ring` (`Z4EDge`) | **PASS** — `link` root now `semantic.focus.ring`; 2px `borderWidths.thick`, offset 2px |
| Link | external | decorative glyph + "leaves the site" announcement (`DTTTs`) | **PASS** — `external` keeps the `external-link` glyph `aria-hidden` and adds an sr-only "External link" phrase; no `target`/`rel` |
| Nav Item | focus indicator | `focus/ring` (`iosjR`) | **PASS** — `navItem` root now `semantic.focus.ring`; offset 0 |
| Nav Item | controlled current | one current item (`yXciR`) | **PASS** — controlled `active` → `aria-current="page"` (retained) |
| Nav Item | states | default · hover · current · focus-visible · disabled (`WHBN9`) | **PASS** — focus-visible/current/disabled browser-asserted both themes; hover documented at recipe level (browser hover timing not claimed) |
| Breadcrumbs | focus indicator | `focus/ring` (`A57dA`) | **PASS** — `breadcrumbs.link` now `semantic.focus.ring`; 2px, offset 2px |
| Breadcrumbs | per-crumb icon | icon part, public "with icon" (`i2SiX`, `H5sLG`) | **PASS** — `BreadcrumbItem.icon?: IconName` renders a decorative `Icon size="sm"` inside the crumb |
| Breadcrumbs | list/current/separators | ordered list; last crumb current; separators decorative (`sXHwZ`, `U5t8b`) | **PASS** — `<nav>` → `<ol>`; last crumb `aria-current` span (not a link); `<Icon>` separators decorative `aria-hidden` |
| Sidebar Item | focus indicator | `focus/ring` (`uhiC3`) | **PASS** — `sidebarItem` root now `semantic.focus.ring`; offset 0 |
| Sidebar Item | controlled current | active exposes `aria-current` (`J0p5kC`) | **PASS** — controlled `active` → `aria-current="page"` (retained) |
| Sidebar Item | states | default · hover · current · focus-visible · disabled (`WHBN9`) | **PASS** — focus-visible/current/disabled browser-asserted both themes; hover documented at recipe level |
| Brand | lockup | decorative mark + wordmark (`MGoSj`) | **PASS** — regression only: mark `aria-hidden`, wordmark `No Launchpad` / `name` override, no `href`/`tabindex`/`role` |
| Disabled contrast (Link / Nav Item / Sidebar Item disabled text) | — | Pen audit marks disabled rows `DISABLED` (`Z4EDge`, `iosjR`, `uhiC3`) | **DISABLED / REVIEW** — real ratios shown in the Pen audit, never counted PASS |

### Approved public surface and behaviour

- `Link` root focus ring switched to `semantic.focus.ring`. `external: true` now also renders a visually-hidden announcement (`link__visuallyHidden`, text `External link`); the trailing `external-link` glyph remains decorative. No `target`, `rel`, `href` policy or routing was added.
- `NavItem` / `SidebarItem`: the controlled `active` → `aria-current="page"` behavior is unchanged. No new props, group labels, nesting, collapse control or tooltips.
- `Breadcrumbs`: `BreadcrumbItem` gains `icon?: IconName`; the glyph is decorative and rendered inside the crumb. `<ol>` ordering, `aria-current` on the last (non-link) crumb and decorative separators are unchanged. `href` is still consumer-owned.
- `Brand`: unchanged; regression coverage added only.

Changed paths: `src/shared/components/link/{link.tsx,preset.ts,Link.composition.test.tsx,Link.stories.tsx}`, `src/shared/components/nav-item/{preset.ts,NavItem.composition.test.tsx,NavItem.stories.tsx}`, `src/shared/components/sidebar-item/{preset.ts,SidebarItem.composition.test.tsx,SidebarItem.stories.tsx}`, `src/shared/components/breadcrumbs/{breadcrumbs.tsx,preset.ts,Breadcrumbs.composition.test.tsx,Breadcrumbs.stories.tsx}`, `src/shared/components/brand/{Brand.composition.test.tsx,Brand.stories.tsx}`, this evidence, `artifacts/batch-c/nav-atoms/` (new captures). `index.ts` barrels and `panda.config.ts` were not touched; no export changed; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/link/Link.composition.test.tsx src/shared/components/nav-item/NavItem.composition.test.tsx src/shared/components/sidebar-item/SidebarItem.composition.test.tsx src/shared/components/breadcrumbs/Breadcrumbs.composition.test.tsx src/shared/components/brand/Brand.composition.test.tsx` |
| RED exit | `1` |
| RED result | `6 fail` / `29 pass` (35 total, 5 files, `85 expect() calls`) |
| RED failures | link `announces that an external link leaves the site`; link `paints the shared focus ring role`; nav-item `paints the shared focus ring role`; sidebar-item `paints the shared focus ring role`; breadcrumbs `renders a decorative icon inside a crumb link`; breadcrumbs `paints the shared focus ring role on the crumb link` |
| RED cause | 4× `outlineColor._focusVisible` was `semantic.brand.500.background`, expected `semantic.focus.ring`; Link had no `link__visuallyHidden`; Breadcrumbs ignored `item.icon` |
| GREEN exit | `0` |
| GREEN result | `37 pass` / `0 fail` (`92 expect() calls`); `+2` recipe hover-regression checks added for NavItem/SidebarItem after the first green |

Focused browser stories (Vitest + Playwright Chromium), proven test-first by `git stash push` of only the six implementation files (`link/link.tsx`, `link/preset.ts`, `nav-item/preset.ts`, `sidebar-item/preset.ts`, `breadcrumbs/breadcrumbs.tsx`, `breadcrumbs/preset.ts`), `mise run gen`, observing RED, then `git stash pop` + `mise run gen`:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/link/Link.stories.tsx src/shared/components/breadcrumbs/Breadcrumbs.stories.tsx src/shared/components/nav-item/NavItem.stories.tsx src/shared/components/sidebar-item/SidebarItem.stories.tsx` |
| RED exit | `1` |
| RED result | `4 failed` files, `8 failed` / `26 passed` (34) — link `External Announcement`, link `Dark External Announcement`, link `Focus Visible Light`, breadcrumbs `With Icons`, breadcrumbs `Dark With Icons`, breadcrumbs `Focus Visible Light`, nav-item `Focus Visible Light`, sidebar-item `Focus Visible Light` |
| GREEN exit | `0` |
| GREEN result | `5 passed` files, `40 passed` (40) (Brand included in the green run) |

Two a-priori hypotheses were corrected during the cycle and are recorded rather than hidden: (1) `userEvent.hover` did not apply the `:hover` pseudo-state in headless Chromium (`rgba(0, 0, 0, 0)`), so hover is no longer browser-claimed — it is documented at the recipe selector level; (2) dark `semantic.common.400.background` resolves `palette.neutral.600` `#475569` (`rgb(71, 85, 105)`), not `neutral.500`, so the disabled dark assertion uses the repository value.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Link focus ring (`FocusVisibleLight` / `FocusVisibleDark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) |
| Link external announcement (`ExternalAnnouncement` / `Dark…`) | `link__visuallyHidden` text `External link`, glyph `aria-hidden="true"`, no `target` | same |
| Breadcrumbs per-crumb icon (`WithIcons` / `DarkWithIcons`) | `.breadcrumbs__icon` is the glyph element, `aria-hidden="true"`, `icon` class | same |
| Breadcrumbs focus ring (`FocusVisibleLight` / `Dark`) | `solid 2px rgb(22, 163, 74)` | `solid 2px rgb(34, 197, 94)` |
| Nav Item current (`ActiveLight` / `ActiveDark`) | `aria-current="page"`, root bg `rgb(240, 253, 244)` (`green.50`), label `rgb(21, 128, 61)` (`green.700`) | `aria-current="page"`, root bg `rgb(5, 46, 22)` (`green.950`), label `rgb(134, 239, 172)` (`green.300`) |
| Nav Item focus ring (`FocusVisibleLight` / `Dark`) | `solid 2px rgb(22, 163, 74)` | `solid 2px rgb(34, 197, 94)` |
| Nav Item disabled (`DisabledLight` / `DisabledDark`) | `aria-disabled="true"`, `tabindex="-1"`, cursor `not-allowed`, label `rgb(148, 163, 184)` | label `rgb(71, 85, 105)` — **DISABLED / REVIEW** |
| Sidebar Item current (`ActiveLight` / `ActiveDark`) | `aria-current="page"`, root bg `rgb(240, 253, 244)`, label `rgb(21, 128, 61)` | root bg `rgb(5, 46, 22)`, label `rgb(134, 239, 172)` |
| Sidebar Item focus ring (`FocusVisibleLight` / `Dark`) | `solid 2px rgb(22, 163, 74)` | `solid 2px rgb(34, 197, 94)` |
| Sidebar Item disabled (`DisabledLight` / `DisabledDark`) | `aria-disabled="true"`, `tabindex="-1"`, cursor `not-allowed`, label `rgb(148, 163, 184)` | label `rgb(71, 85, 105)` — **DISABLED / REVIEW** |
| Brand lockup (`LockupLight` / `LockupDark`) | mark `aria-hidden="true"`, wordmark `No Launchpad`, root has no `href` | same |
| Brand custom name (`CustomNameLockup`) | wordmark `Acme` | — (theme-independent) |

Code-side both-theme captures (Storybook iframe, `deviceScaleFactor: 2`) are in `artifacts/batch-c/nav-atoms/`: `link-external-{light,dark}`, `link-focus-{light,dark}`, `breadcrumbs-icons-{light,dark}`, `breadcrumbs-focus-{light,dark}`, `nav-item-{active,focus,disabled}-{light,dark}`, `sidebar-item-{active,focus,disabled}-{light,dark}`, `brand-lockup-{light,dark}` (22 PNGs).

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `6 fail` / `29 pass` |
| focused composition GREEN | `0` | `37 pass` / `0 fail` (92 expect calls) |
| focused browser RED | `1` | `4 failed` files, `8 failed` / `26 passed` (34) |
| focused browser GREEN | `0` | `5 passed` files, `40 passed` (40) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `765 pass / 0 fail` (90 files); browser `615 passed` (73 files) |
| `mise run check:deps` | `0` | Knip, no findings (no export changed) |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-Dun0oDGa.css 223.81 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the HEAD baseline: this slice adds `+11` unit composition checks (`37` vs `26` across the five files) and `+23` browser story checks (`40` vs `17` across the five story files; unit `754 → 765`, browser `592 → 615`).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Focus-ring role → `semantic.focus.ring` (Link, NavItem, Breadcrumbs, SidebarItem) | **PASS** |
| Link external sr-only announcement (glyph stays decorative) | **PASS** |
| Breadcrumbs per-crumb decorative icon | **PASS** |
| NavItem / SidebarItem controlled `active` → `aria-current` | **PASS** (retained) |
| NavItem / SidebarItem state coverage (default, hover, focus-visible, current, disabled) | **PASS** — focus/current/disabled browser-asserted; hover documented at recipe level |
| Brand regression (mark `aria-hidden`, wordmark default/override, no link) | **PASS** |
| Disabled contrast | `DISABLED / REVIEW` (both themes) |
| **C1 final status** | **PASS** — no unresolved `FAIL`; `BLOCKED` items recorded below |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Routing / `href` / `target` / `rel` policy | `n07t86` content rules | API/routing decision owned outside this slice |
| Auto current-route matching | `yXciR` "Exactly one destination is current" | requires a router; the component stays controlled |
| Brand as link | `MGoSj` lockup | navigation ownership decision |
| Link `standalone` / `visited` / `current` variants and tone reconciliation | `EJBov` "inline · standalone … visited state"; `PepS9` "visited state" | public-variant/API decision |
| Breadcrumbs overflow / compact / middle-collapse | `i2SiX` overflow control; `H5sLG` "with overflow, compact"; `U5t8b` "Long trails collapse from the middle" | API/menu decision |
| Sidebar nested items / group label / collapse control / icon tooltip | `SULcX` "group label · active indicator · nested item · collapse control"; `o8fgSP` "expanded · collapsed, with groups, with nesting"; `BCQA5` "Collapsing keeps the icons and tooltips" | public-variant/API decision |
| Nav active-indicator as a separate element | `i7Jca` "active indicator" | the master uses the selected background, not a separate bar; visual decision |

### Unresolved concerns

- **INFO — browser hover.** Headless Chromium did not apply `:hover` via `userEvent.hover`; the hover surface (`semantic.common.100.background`) is asserted at the recipe-selector level only. No `FAIL`.
- **DISABLED / REVIEW — disabled contrast.** Nav Item / Sidebar Item disabled text and Link disabled text are the Pen `DISABLED` rows; ratios are reported, never counted `PASS`.
- **INFO — Breadcrumbs current-crumb icon.** `icon` renders for any crumb that supplies it, including the current (non-link) crumb, inside the current span; the Pen "with icon" variant is a linked-crumb affordance and is covered by the linked-crumb story.

## C1 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `e3bb1d37ba9875330c2d0742f84b2330cea48628` vs `47e4a5b`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Focus rings all switch to `semantic.focus.ring` (link/nav-item/sidebar-item/breadcrumbs); geometry and `aria-current` retained; no routing/nesting added.
- True RED confirmed: light focus-ring mismatch, missing Link external announcement, ignored Breadcrumbs `item.icon`. Dark focus stories are non-discriminating (both token roles resolve to `green.500` in dark) — the recipe-level composition tests are the true guard.
- BLOCKED axes recorded and not implemented.

**Minor (recorded, not blocking):** (1) Link announcement wording `"External link"` vs contract phrase "leaves this site" — acceptable conventional phrasing; (2) no explicit `rel` regression assertion in `Link.stories.tsx` (implementation adds neither `target` nor `rel`); (3) dark focus stories non-discriminating; (4) `Breadcrumbs.composition.test.tsx` icon-size assertion is scoped to whole markup. INFO: Breadcrumbs renders `item.icon` on the current crumb too when supplied (aria-hidden; permissive opt-in).

## C2 — TopNavigation + Tab cycle 1/2

**Scope:** `TopNavigation` actions-slot rhythm and `Tab` focus-ring role + indicator-on-active. Approved contract only; no new public components, props or layout API.

### Pen source node IDs (read-only)

| Role | Master | Documentation / specimen |
| --- | --- | --- |
| Top Navigation | `KI0Dl` (Brand, Nav, Spacer, Sign in, CTA; root `gap:24`, `padding:[0,16]`) | `LK4fe` — token contract `iosjR` |
| Tab | `z2jG4r` (`knYwe` Label, `PRWpN` Indicator `enabled:false`) | `CCpkF` — token contract `vfPHi`, content `BBltl`, accessibility `h7IXS` |
| Tab indicator specimens | — | `f2iIiG` (inactive, indicator off), `HcOEO` (active `surface/selected`, indicator off), `VWQNE` List (`t1` indicator on, every other trigger off) |

Verbatim Pen facts used:

- `KI0Dl` — the brand, nav, spacer, Sign in and CTA are direct root children of a single 24px-gap row, so the trailing account actions ride the bar rhythm (24px, `x12`).
- `vfPHi` (Tab token contract) — focus-indicator row uses `focus/ring`.
- `z2jG4r` — `PRWpN` Indicator is `enabled:false` by default; `VWQNE` enables it only on `t1`.
- `VWQNE` resolved bounds — `t1` (indicator on) height `43`, every indicator-off trigger height `33`; `pq7Ay/PRWpN` sits at `y=33`, `h=2` (8px above the trigger bottom, matching the `padding-block: x4` and `gap: x4`).
- `CCpkF` `BBltl` — "The indicator sits against the active tab, never floating." `h7IXS` — tablist/tab semantics, active announced, icon-only needs a name.

**Read-only confirmation:** Pencil MCP `Get`/`Print` only; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`. The active editor remained `ex_2.pen` (`get_app_state`), and no Pen byte was modified.

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Tab | focus indicator | `focus/ring` (`vfPHi`) | **PASS** — `tab` root `outlineColor._focusVisible` now `semantic.focus.ring`; 2px, offset 0 retained |
| Top Navigation | actions slot rhythm | root gap 24 (`KI0Dl`) | **PASS** — `topNavigation.actions.gap` now `x12` (24px, exact) |
| Tab | indicator on active only | `PRWpN.enabled:false`; `VWQNE` `t1` (`z2jG4r`) | **PASS** — indicator rendered only when `active`; `list.alignItems` `flex-start` so inactive triggers reserve no indicator space |
| Tab | absolute trigger bounds | `VWQNE`: active 43 / inactive 33 | **REVIEW** — measured 45.59 / 35.59; the 10px indicator contribution is exact but the label line box is 19.59px (`line-height: normal` 1.4) vs Pen's font-default 17px, so the absolute Pen bounds need a label geometry change outside this contract |
| Tab | tablist / tab / `aria-selected` / disabled / icon | `h7IXS` | regression only — unchanged and re-asserted |
| Tab | dark `action/primary-bg` indicator parity | `vfPHi` | `BLOCKED` — Foundation token ownership, out of scope; indicator keeps `semantic.brand.700.background` |

### Approved public surface and behaviour

- `Tab` root focus ring switched to `semantic.focus.ring` (geometry unchanged). The indicator `<span>` renders only for `active`; inactive triggers carry no indicator and no reserved space, so the list is `flex-start` rather than `stretch`. No new prop, no `active` API change.
- `TopNavigation` actions slot gap moved from `x4` (8px) to `x12` (24px). No other geometry changed; the slot contract (`actions?: ReactNode`) is unchanged.
- No export changed (`index.ts` barrels untouched), so `check:deps` was not required.

Changed paths: `src/shared/components/tab/{tab.tsx,preset.ts,Tab.composition.test.tsx,Tab.stories.tsx}`, `src/shared/components/top-navigation/{preset.ts,TopNavigation.composition.test.tsx}`, this evidence, `artifacts/batch-c/top-nav-tab/` (new captures). Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/tab/Tab.composition.test.tsx src/shared/components/top-navigation/TopNavigation.composition.test.tsx` |
| RED exit | `1` |
| RED result | `3 fail` / `11 pass` (14 total, 2 files, `35 expect() calls`) |
| RED failures | tab `renders the indicator only for the active trigger`; tab `paints the shared focus ring role`; top navigation `gaps the actions slot at the bar rhythm` |
| RED cause | `outlineColor._focusVisible` was `semantic.brand.500.background`; the indicator was always rendered; `actions.gap` was `x4` |
| GREEN exit | `0` |
| GREEN result | `14 pass` / `0 fail` (`35 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium), run before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/tab/Tab.stories.tsx src/shared/components/top-navigation/TopNavigation.stories.tsx` |
| RED exit | `1` |
| RED result | `1 failed` / `1 passed` files, `2 failed` / `10 passed` (12) |
| RED failures | tab `Focus Visible Light` (`rgb(34, 197, 94)` vs expected `rgb(22, 163, 74)`); tab `Indicator Geometry` (active height `46` under the then-absolute `43` assertion) |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `12 passed` (12) |

The `Indicator Geometry` assertion was narrowed from the unattainable absolute Pen heights to the genuine, token-independent contract (`active - inactive = 10`, indicator only on active, `2px` bar, `8px` above the trigger bottom). The absolute-height divergence is recorded as `REVIEW` below rather than fabricated green.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Tab focus ring (`FocusVisibleLight` / `FocusVisibleDark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** (brand fill and `focus/ring` both resolve `green.500` in dark) |
| Tab indicator geometry (`IndicatorGeometry`) | active `45.59px`, inactive `35.59px` (delta `10`), indicator `2px`, `8px` above the trigger bottom, inactive has no indicator, list `align-items:flex-start` | theme-independent (same recipe/CSS) |
| Tab disabled (regression) | `aria-selected="false"`, `disabled`, `tab__root--disabled_true` | — (no dark disabled tab story in scope) |
| Top Navigation actions gap (`Default`) | `column-gap: 24px` (`x12`), measured gap `24` | theme-independent (same recipe/CSS) |

Absolute Pen bounds `33`/`43` are **not** reached: with this system's `line-height: normal` (1.4) the label line box is `19.59px`, giving `35.59`/`45.59`. Pen's `43`/`33` assume its font-default `17px` label. Matching them would require a Tab label line-height/height override, which is a geometry decision outside the approved indicator change.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)` |
| focused composition RED | `1` | `3 fail` / `11 pass` |
| focused composition GREEN | `0` | `14 pass` / `0 fail` (35 expect calls) |
| focused browser RED | `1` | `1 failed` / `1 passed` files, `2 failed` / `10 passed` (12) |
| focused browser GREEN | `0` | `2 passed` files, `12 passed` (12) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `768 pass / 0 fail` (90 files); browser `618 passed` (73 files) |
| `mise run check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-AUy9uW-l.css 223.81 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the C1 baseline: `+3` unit composition checks (`765 → 768`, 90 files) and `+3` browser story checks (`615 → 618`, 73 files).

### Captures

Storybook iframe, `deviceScaleFactor: 2`, in `artifacts/batch-c/top-nav-tab/`: `tab-indicator-geometry`, `tab-row`, `tab-disabled`, `tab-focus-light`, `tab-focus-dark`, `top-navigation-default` (6 PNGs).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Tab focus indicator → `semantic.focus.ring` | **PASS** |
| Tab indicator only on the active trigger (inactive reserves no space) | **PASS** |
| Top Navigation actions gap → `x12` (24px) | **PASS** |
| Tab absolute trigger bounds `43` / `33` | **REVIEW** — 10px contribution exact; absolute heights `45.59` / `35.59` from `line-height: normal` (1.4) vs Pen font-default `17px` |
| Tab ARIA / tablist / tab / `aria-selected` / disabled / icon | **PASS** (regression, unchanged) |
| **C2 final status** | **PASS with one `REVIEW`** — no unresolved `FAIL`; `BLOCKED` items recorded below |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Mobile menu trigger, `aria-expanded`, collapse policy | `LK4fe` `tQq1f`; `yL5Uy` "mobile" | public-variant/behaviour decision |
| `with search` / `condensed` variants | `yL5Uy` "with search, with account, condensed" | public-variant decision |
| Bar-level hover / current / disabled / focus-visible container states | `E1cOv` | interaction/API decision |
| Default or required landmark name | `T5EFO` "The bar is a landmark with an accessible name" | content/API decision |
| Tab panel component + `aria-controls` / id ownership | `CCpkF` `h7IXS`; named parts "panel" | public-component/API decision |
| Tab keyboard roving (activation mode, wrap, disabled-skip) and Home/End | `h7IXS` "arrow-key movement" | interaction policy decision |
| `pill` / `with badge` / `scrollable` / compact | `CCpkF` `IorsF` | public-variant decision |
| Icon-only label-optional API | `h7IXS` "Icon-only tabs need an accessible name" | public-API decision |
| Dark `action/primary-bg` indicator token parity | `vfPHi` | Foundation token ownership, out of scope |

### Unresolved concerns

- **REVIEW — Tab absolute bounds.** The Pen `VWQNE` `43`/`33` trigger heights are not reached because this system pins `lineHeight: normal` (1.4 → `19.59px`) while Pen's label is font-default `17px`. The indicator contribution (`+10px = 8px gap + 2px bar`) and its position (`8px` above the trigger bottom) are exact.
- **INFO — dark focus stories.** `FocusVisibleDark` is not discriminating: before and after the change the dark outline is `green.500`. The light story and the recipe-level composition test are the true guards.
- **INFO — indicator fill token.** The indicator keeps `semantic.brand.700.background`; the Pen `action/primary-bg` (dark parity) is `BLOCKED` above and not claimed as PASS.

## C2 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `6c4721cf080bcc0b796ac17de2dc425c624f8700` vs `9c72c24`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Tab focus ring now `semantic.focus.ring`; geometry (2px, offset 0) unchanged; generated CSS confirms.
- TopNavigation `actions.gap` = `24px` (`x12`); only that line changed.
- Tab indicator renders only when active (`tab.tsx` conditional) with `list.alignItems: flex-start`; +10px indicator delta exact. ARIA intact.
- True RED confirmed: focus-role light mismatch, always-rendered indicator, `actions.gap x4`. Dark focus non-discriminating and not claimed as proof.
- Absolute Pen bounds `43`/`33` → `45.59`/`35.59` is an accepted **REVIEW**: divergence is the pre-existing label line box (`lineHeights.normal` token = 1.4 × 14px = 19.59px vs Pen 17px), a Foundation/typography matter outside the approved C2 surface; disclosed in commit, enumeration, both-theme table, summary, and concerns.

**Minor (recorded, non-blocking):** (1) `Tab.stories.tsx` comment says `lineHeight: normal` but it resolves to the project token `lineHeights.normal = 1.4`; (2) the committed `IndicatorGeometry` delta assertion has no recorded RED run (the RED was the prior absolute `43` assertion); (3) the TopNavigation `column-gap: 24px` evidence row sits in the "computed style, in browser" table but is machine-guarded only at recipe level (`TopNavigation.composition.test.tsx`), not by a `play` assertion — treat as recipe-level; (4) `preset.ts` `opacity: 0` base for the indicator is now redundant.

## C3 — AccordionItem + TreeItem cycle 1/2

**Scope:** `AccordionItem` and `TreeItem` focus-indicator role → `semantic.focus.ring`, and the `AccordionItem` open-chevron rotation emitted through `staticCss`. Approved Tier 1 only; no new public component, no group/container, no API expansion.

### Pen source node IDs (read-only)

| Role | Master | Documentation / token contract |
| --- | --- | --- |
| Accordion Item | `YGgyy` (Trigger/Title, Chevron, Panel) | `vswcF` — token contract (`focus/ring`) |
| Tree Item | `RFehj` (Expander, Icon, Label, Group) | `f4wq6` — token contract (`focus/ring`) |

Verbatim Pen facts used:

- `vswcF` (Accordion Item token contract) — focus-indicator row uses `focus/ring`; the chevron reflects the open state by rotation.
- `f4wq6` (Tree Item token contract) — focus-indicator row uses `focus/ring`; selection paints the row surface and glyph/label.

**Read-only confirmation:** Pen `ex_2.pen` SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged. No `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`; the Pen was never mutated.

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Accordion Item | focus indicator | `focus/ring` (`vswcF`) | **PASS** — trigger `outlineColor._focusVisible` now `semantic.focus.ring`; `outlineStyle solid`, `{borderWidths.thick}` (2px), offset `0` retained |
| Tree Item | focus indicator | `focus/ring` (`f4wq6`) | **PASS** — row `_focusWithin.outlineColor` now `semantic.focus.ring`; 2px, offset `0` retained |
| Accordion Item | open chevron | rotate `180deg` (`YGgyy`) | **PASS** — `staticCss.accordionItem` `open:["true"]` emits `.accordionItem__chevron--open_true { transform: rotate(180deg) }`; the runtime already carried the class, only the stylesheet rule was missing |
| Accordion Item / Tree Item | disabled | Pen audit marks disabled rows `DISABLED` | **DISABLED / REVIEW** — contrast is real in the Pen audit but `action/disabled-bg` is out of scope (BLOCKED below) |
| Accordion Item / Tree Item | ARIA / roles | `aria-expanded`, `aria-controls`, `role=region`/`treeitem`/`group`, `aria-selected`, `aria-level`, `aria-disabled` | regression only — unchanged and re-asserted |
| Tree Item | `+`/indicator geometry | row 6/10px padding, 18px indent, `x8` expander | regression / documented approximation (INFO below) |

### Approved public surface and behaviour

- `AccordionItem` trigger focus ring switched to `semantic.focus.ring`; the `outlineStyle` / `outlineWidth` / `outlineOffset` values are unchanged.
- `TreeItem` row `_focusWithin` focus ring switched to `semantic.focus.ring`; the 2px geometry and offset are unchanged. The preset doc comment (`focus/ring -> semantic.focus.ring`) now matches the code.
- `panda.config.ts` gains an `accordionItem` `staticCss` entry (`open:["true"], disabled:["true"]`), mirroring `treeItem`, so the runtime-selected `open` variant is emitted. No `Accordion`/`Tree` group component and no prop was added.
- No component markup changed. No `index.ts` barrel changed, so no export changed and `check:deps` was not required.
- Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

Changed paths: `src/shared/components/accordion-item/{preset.ts,AccordionItem.composition.test.tsx,AccordionItem.stories.tsx}`, `src/shared/components/tree-item/{preset.ts,TreeItem.composition.test.tsx,TreeItem.stories.tsx}`, `panda.config.ts`, this evidence, `artifacts/batch-c/accordion-tree/` (new captures).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/accordion-item/AccordionItem.composition.test.tsx src/shared/components/tree-item/TreeItem.composition.test.tsx` |
| RED exit | `1` |
| RED result | `3 fail` / `13 pass` (16 total, 2 files, `44 expect() calls`) |
| RED failures | accordion `paints the shared focus ring role`; tree `paints the shared focus ring role`; accordion `emits the open chevron rotation without source extraction` |
| RED cause | both recipes were `semantic.brand.500.background`; `staticCss` had no `accordionItem` entry, so `.accordionItem__chevron--open_true` was absent |
| GREEN exit | `0` |
| GREEN result | `16 pass` / `0 fail` (`44 expect() calls`) |

The open-chevron guard compiles the real `panda.config.ts` with an empty `include` (mirroring `src/shared/styles/panda-static-css.test.ts`, which is outside this slice's allowed paths), so whatever appears is emitted purely from `staticCss`. The runtime class assertion (`accordionItem__chevron--open_true` in the markup) is regression coverage and passed before the change.

Focused browser stories (Vitest + Playwright Chromium), proven test-first by `git stash push` of only the two implementation preset files, `mise run gen`, observing RED, then `git stash pop` + `mise run gen`:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/accordion-item/AccordionItem.stories.tsx src/shared/components/tree-item/TreeItem.stories.tsx` |
| RED exit | `1` |
| RED result | `2 failed` files, `2 failed` / `9 passed` (11) — accordion `Focus Visible Light`, tree `Focus Visible Light` (both expected `rgb(22, 163, 74)`, received `rgb(34, 197, 94)`) |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `11 passed` (11) |

Dark focus stories are non-discriminating: in dark, `brand.500.background` and `focus.ring` both resolve `green.500` (`rgb(34, 197, 94)`), so `FocusVisibleDark` passes before and after and is **not** claimed as proof of the role change.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Accordion Item focus ring (`FocusVisibleLight` / `FocusVisibleDark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Tree Item row focus ring (`FocusVisibleLight` / `FocusVisibleDark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Accordion Item open chevron (`Open`, generated CSS + composition test) | `.accordionItem__chevron--open_true { transform: rotate(180deg) }`; runtime `open` class present | theme-independent (same recipe/CSS) |
| Accordion Item disabled (regression) | `aria-expanded="false"`, `disabled`, `accordionItem__root--disabled_true`; recipe text `common.400.background` `rgb(148, 163, 184)` | `common.400.background` = `neutral.600` `rgb(71, 85, 105)` — **DISABLED / REVIEW** (token mapping; not browser-asserted in this slice) |
| Tree Item selected / disabled / tree roles (regression) | `aria-selected="true"`, `treeItem__root--selected_true`; `aria-disabled="true"`, `treeItem__root--disabled_true`; `role=treeitem`/`group`, `aria-level` | theme-independent structure |

Code-side captures (Playwright Chromium CLI, `devicePixelRatio 1`) are in `artifacts/batch-c/accordion-tree/`: `accordion-focus-{light,dark}`, `accordion-open-light`, `accordion-disabled-light`, `accordion-stack-light`, `tree-focus-{light,dark}`, `tree-expanded-light`, `tree-collapsed-light`, `tree-leaf-light` (10 PNGs). The light focus captures visibly show the `green.600` ring; `accordion-open-light` shows the rotated chevron over the rendered panel.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)`; `.accordionItem__chevron--open_true` and `--colors-semantic-focus-ring` now emitted |
| focused composition RED | `1` | `3 fail` / `13 pass` (44 expect calls) |
| focused composition GREEN | `0` | `16 pass` / `0 fail` (44 expect calls) |
| focused browser RED | `1` | `2 failed` files, `2 failed` / `9 passed` (11) |
| focused browser GREEN | `0` | `2 passed` files, `11 passed` (11) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `772 pass / 0 fail` (90 files, 4041 expect calls); browser `622 passed` (73 files) |
| `mise run check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-2WdMhsMZ.css 223.85 kB` |
| `git diff --check` | `0` | clean |

Counts moved from the C2 baseline: `+4` unit composition checks (`768 → 772`, 90 files) and `+4` browser story checks (`618 → 622`, 73 files).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Accordion Item focus indicator → `semantic.focus.ring` | **PASS** |
| Tree Item focus indicator → `semantic.focus.ring` | **PASS** |
| Accordion Item open chevron rotation emitted via `staticCss` | **PASS** |
| Accordion Item / Tree Item ARIA, disabled, selected, tree roles | **PASS** (regression, unchanged) |
| Disabled background `action/disabled-bg` for Accordion / Tree | **DISABLED / REVIEW** (BLOCKED below) |
| **C3 final status** | **PASS with `DISABLED / REVIEW` and `INFO` rows** — no unresolved `FAIL`; `BLOCKED` items recorded below |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Disabled background role `action/disabled-bg` for Accordion / Tree | `vswcF`, `f4wq6` disabled rows | Foundation token role decision; disabled stays `DISABLED / REVIEW` |
| Escape-close + focus return to trigger/row | disclosure/tree interaction contract | shared-model `Z2DD4`, not owner-frame; interaction-policy decision |
| Accordion group single/multiple, `with icon` / `with description`, panel animation | `YGgyy`/`vswcF` public variants | public-variant/API decision |
| Tree selection-mode API, roving/arrow-key container architecture, indent guide, lazy mount | `RFehj`/`f4wq6` behaviour | container-architecture/API decision; would introduce a group component |
| New public `Accordion` / `Tree` group components | — | explicitly excluded by the approved contract |

### Unresolved concerns

- **INFO — border token role.** Accordion root keeps `semantic.common.200.divider`; the Pen `border/subtle` role is a foundation-owned token decision, not this slice.
- **INFO — hover role.** Accordion trigger / Tree row keep `semantic.common.100.background`; the Pen `surface/hover` role is a foundation-owned token decision. Hover is documented at recipe level (headless hover timing remains non-asserted, as in C1).
- **INFO — selected text role.** Tree item keeps `semantic.brand.700.background` for the selected glyph/label; the Pen `text/link` role is a foundation-owned token decision.
- **INFO — padding approximation.** Accordion trigger pads `x6` (12px) block vs Pen 14px; the Tree expander box is `x8` (16px) vs Pen 14px. Both are pre-existing scale approximations.
- **DISABLED / REVIEW — disabled contrast.** Accordion / Tree disabled text uses `common.400.background` (`neutral.400` light `rgb(148, 163, 184)`, `neutral.600` dark `rgb(71, 85, 105)`); reported, never counted `PASS`.
- **INFO — dark focus stories non-discriminating.** `FocusVisibleDark` passes before and after the role change; the light story and the recipe-level composition tests are the true guards.
- **INFO — static-css guard location.** The open-chevron emission guard lives in `AccordionItem.composition.test.tsx` rather than the canonical `src/shared/styles/panda-static-css.test.ts` because the latter is outside this slice's allowed paths; it compiles the real config with an empty `include` exactly as that file does.

## C3 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `5e480e29933cbb33a396c9edeafe28b9923fd5ca` vs `51f34e1`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- AccordionItem trigger and TreeItem row focus roles now `semantic.focus.ring`; 2px geometry preserved; generated CSS confirms.
- `panda.config.ts` adds only the `accordionItem` staticCss entry; generated `.accordionItem__chevron--open_true { transform: rotate(180deg) }` now emitted; `styled-system` regenerated (styles.css hash identical before/after gen).
- No public API/prop/component/barrel change; no Accordion/Tree group container; aggregate ownership preserved.
- True RED confirmed: focus-role light mismatch ×2 and the missing chevron-open rule. Dark focus non-discriminating and not claimed as proof. ARIA/selected/disabled tests are regression.
- BLOCKED/INFO rows recorded and not implemented; capture-method deviation (Playwright CLI, `devicePixelRatio 1`, evidence-only) disclosed.

**Minor (recorded, non-blocking):** (M1) the static-css guard asserts selector presence only, not the `transform: rotate(180deg)` declaration; (M2) the static-css guard lives in `AccordionItem.composition.test.tsx` rather than the canonical `src/shared/styles/panda-static-css.test.ts` — consider consolidating; (M3) the dpr-1 CLI capture should be explicitly marked non-baseline-comparable vs the C1/C2 Storybook-iframe method; (M4) evidence wording "`--colors-semantic-focus-ring` now emitted" is inaccurate (it pre-existed from C1; only the chevron rule is new); (M5) one intermittent browser flake (testing-library timer race) observed, not reproduced, pre-existing; (M6) the added `disabled` static combination has no guard.
