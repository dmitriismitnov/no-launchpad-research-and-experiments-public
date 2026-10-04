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

## C4 — Menu + ContextMenu cycle 1/2

**Scope:** `Menu`/`MenuItem` row focus-indicator role and the named-role corrections on the Menu overlay card and the Context Menu trigger. Approved contract only; no new public component, prop or API. `MenuItem` remains internal to `menu/`; `ContextMenu` keeps composing the public `Menu`/`MenuItem` (no row re-implementation).

### Pen source node IDs (read-only)

| Role | Master | Documentation / token contract |
| --- | --- | --- |
| Menu | `GLufg` | doc `C6zTA` |
| Menu Item | `CX1vE` | doc `C6zTA` |
| Context Menu | `rokhq` | doc `w7EbR` |

Contract facts applied:

- `C6zTA` (Menu / Menu Item): row focus-indicator uses `focus/ring`; overlay card uses `surface/overlay` + `border/subtle`; row hover uses `surface/hover`; check glyph uses `text/link`.
- `w7EbR` (Context Menu): trigger chrome uses `surface/raised` + `border/subtle`.

**Read-only confirmation:** Pen `ex_2.pen` SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged (mtime `2026-10-02 08:35`). No `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`; the Pen was never mutated.

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Menu Item | focus indicator | `focus/ring` (`C6zTA`) | **PASS** — `item.outlineColor._focusVisible` now `semantic.focus.ring`; `outlineStyle solid`, `{borderWidths.thick}` (2px), offset `0` retained |
| Menu | overlay card surface | `surface/overlay` (`C6zTA`) | **PASS** — `root.backgroundColor` now `semantic.surface.overlay` |
| Menu | overlay card border | `border/subtle` (`C6zTA`) | **PASS** — `root.borderColor` now `semantic.border.subtle` |
| Menu Item | row hover surface | `surface/hover` (`C6zTA`) | **PASS** — `item._hover.backgroundColor` now `semantic.surface.hover` (recipe-level; browser hover not claimed) |
| Menu Item | check glyph | `text/link` (`C6zTA`) | **PASS** — `check.color` now `semantic.text.link` |
| Context Menu | trigger surface | `surface/raised` (`w7EbR`) | **PASS** — `trigger.backgroundColor` now `semantic.surface.raised` |
| Context Menu | trigger border | `border/subtle` (`w7EbR`) | **PASS** — `trigger.borderColor` now `semantic.border.subtle` |
| Menu / Context Menu | ARIA / roles / shortcut / check / submenu / danger / disabled / Escape / right-click / positioning | `role=menu`/`menuitem`/`separator`, shortcut, checked/danger/disabled states, Escape close, right-click open, `x`/`y` positioning | regression only — unchanged and re-asserted |
| Menu Item | disabled background `action/disabled-bg` | Pen disabled rows | **DISABLED / REVIEW** — consistent with C3; `action/disabled-bg` is a Foundation token-role decision (`BLOCKED` below) |
| Menu Item | leading `icon` | `CX1vE` | **INFO** — left as-is (approved contract) |

### Approved public surface and behaviour

- `menu` recipe: `item.outlineColor._focusVisible` → `semantic.focus.ring`; `root.backgroundColor` → `semantic.surface.overlay`; `root.borderColor` → `semantic.border.subtle`; `item._hover.backgroundColor` → `semantic.surface.hover`; `check.color` → `semantic.text.link`. Geometry, slots, variants (`tone`/`checked`/`disabled`), the `divider` rule (`semantic.common.200.divider`) and `panda.config.ts` (`staticCss.menu` already covers tone/checked/disabled) are unchanged.
- `contextMenu` recipe: `trigger.backgroundColor` → `semantic.surface.raised`; `trigger.borderColor` → `semantic.border.subtle`. The surface still renders the public `Menu` component (`context-menu.tsx` untouched).
- Preset doc comments updated to name the resolved role tokens. No component markup changed; `menu.tsx`, `context-menu.tsx` and both `index.ts` barrels are untouched. No export changed, so `check:deps` was not required.
- Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited). New role variables emitted: `--colors-semantic-surface-overlay`, `--colors-semantic-surface-hover`, `--colors-semantic-surface-raised`, `--colors-semantic-text-link`, `--colors-semantic-focus-ring`, `--colors-semantic-border-subtle`.

Changed paths: `src/shared/components/menu/{preset.ts,Menu.composition.test.tsx,Menu.stories.tsx}`, `src/shared/components/context-menu/{preset.ts,ContextMenu.composition.test.tsx,ContextMenu.stories.tsx}`, this evidence, `artifacts/batch-c/menu-context/` (new captures).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/menu/Menu.composition.test.tsx src/shared/components/context-menu/ContextMenu.composition.test.tsx` |
| RED exit | `1` |
| RED result | `5 fail` / `12 pass` (17 total, 2 files, `41 expect() calls`) |
| RED failures | menu `paints the shared focus ring role`; menu `resolves the overlay card surface roles`; menu `resolves the row hover surface role`; menu `resolves the check glyph to the link text role`; context menu `resolves the trigger surface roles` |
| RED cause | all five recipe fields were still on the common step ramp / brand fill (`common.50.background`, `common.200.divider`, `common.100.background`, `brand.700.background`, `brand.500.background`) |
| GREEN exit | `0` |
| GREEN result | `17 pass` / `0 fail` (`41 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium), run before the implementation (presets untouched, generated CSS still old):

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/menu/Menu.stories.tsx src/shared/components/context-menu/ContextMenu.stories.tsx` |
| RED exit | `1` |
| RED result | `2 failed` files, `6 failed` / `10 passed` (16) |
| RED failures | context menu `Trigger Surface Light`, `Trigger Surface Dark`; menu `Focus Visible Light`, `Surface Light`, `Surface Dark`, `Checked Glyph Dark` |
| GREEN exit | `0` |
| GREEN result | `2 passed` files, `16 passed` (16) |

Non-discriminating stories passed before and after and are **not** claimed as proof: menu `Focus Visible Dark` (dark `brand.500.background` and `focus.ring` both resolve `green.500`), menu `Checked Glyph Light` (light `brand.700.background` and `text.link` both resolve `green.700`), and the regression stories (`Default`, `States`, `Grouped`, context `Default`, `Open`, `RightClick`, `Escape`).

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Menu row focus ring (`FocusVisibleLight` / `FocusVisibleDark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Menu overlay card (`SurfaceLight` / `SurfaceDark`) | bg `rgb(255, 255, 255)` (`surface.overlay` = `base.white`; old `neutral.50` `rgb(248, 250, 252)`), border `rgb(226, 232, 240)` (`border.subtle` = `neutral.200`; old `neutral.300` `rgb(203, 213, 225)`) | bg `rgb(30, 41, 59)` (`neutral.800`; old `neutral.950` `rgb(2, 6, 23)`), border `rgb(30, 41, 59)` (`neutral.800`; old `neutral.700` `rgb(51, 65, 85)`) — discriminating both |
| Menu check glyph (`CheckedGlyphLight` / `CheckedGlyphDark`) | `rgb(21, 128, 61)` (`text.link` = `green.700`; old `green.700` same) — **non-discriminating** | `rgb(74, 222, 128)` (`green.400`; old `green.300` `rgb(134, 239, 172)`) — discriminating |
| Context Menu trigger (`TriggerSurfaceLight` / `TriggerSurfaceDark`) | bg `rgb(255, 255, 255)` (`surface.raised`; old `neutral.50`), border `rgb(226, 232, 240)` (old `neutral.300`) | bg `rgb(15, 23, 42)` (`neutral.900`; old `neutral.950`), border `rgb(30, 41, 59)` (`neutral.800`; old `neutral.700`) — discriminating both |
| Menu row hover (`surface.hover`) | recipe assertion only; `neutral.100` (same as old `common.100.background`) | `neutral.800` (old `neutral.900`) — **INFO**: headless hover timing not asserted, as in C1–C3 |
| Menu divider rule (regression) | `semantic.common.200.divider` (unchanged) | same |

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)`; all six new role variables emitted |
| focused composition RED | `1` | `5 fail` / `12 pass` (41 expect calls) |
| focused composition GREEN | `0` | `17 pass` / `0 fail` (41 expect calls) |
| focused browser RED | `1` | `2 failed` files, `6 failed` / `10 passed` (16) |
| focused browser GREEN | `0` | `2 passed` files, `16 passed` (16) |
| unit suite | `0` | `782 pass / 0 fail` (90 files, 4051 expect calls) |
| browser suite | `0` | `73 passed` files, `639 passed` (639) |
| `mise run check` | `1` | **blocked at `check:lint`** by an untracked 0-byte `.zed/debug.json` editor artifact (outside this slice's allowed paths; not deleted). Per-stage evidence: `eslint . --ignore-pattern ".zed/**"` exit `0`; `dprint check` exit `0`; `tsc --noEmit` exit `0`; `icons:check` `✓ 38 icons`; `fonts:check` `✓ 2 faces`; unit `782`; browser `639` |
| `mise run check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index--m47Sug0.css 223.76 kB` |
| `git diff --check` | `0` | clean |

**Environment note (concurrent sibling, not this slice).** A parallel builder was editing `carousel/`, `pagination/` and `step/` in the same working tree during this cycle (and appended the C5 section of this ledger). Earlier `mise run check` attempts failed on that sibling's transient syntax/format state (`Carousel.stories.tsx`) and on load-induced browser timeouts (`Card.stories.tsx`, `Slider.stories.tsx > Keyboard`). Both flaked files pass in isolation (`Card` `10/10`; the full browser suite `639/639`). None of those files or failures belong to C4.

### Captures

Storybook iframe, `deviceScaleFactor: 2`, Playwright Chromium, in `artifacts/batch-c/menu-context/`: `menu-surface-{light,dark}`, `menu-focus-{light,dark}`, `menu-checked-{light,dark}`, `menu-states`, `context-trigger-surface-{light,dark}`, `context-open`, `context-right-click` (11 PNGs). `menu-focus-light` shows the `green.600` ring on the focused row; `menu-surface-dark` shows the `neutral.800` overlay card over the `neutral.950` shell.

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Menu Item focus indicator → `semantic.focus.ring` | **PASS** |
| Menu overlay card `surface/overlay` + `border/subtle` | **PASS** |
| Menu Item row hover `surface/hover` | **PASS** (recipe-level; browser hover not claimed) |
| Menu Item check glyph `text/link` | **PASS** |
| Context Menu trigger `surface/raised` + `border/subtle` | **PASS** |
| Menu / Context Menu ARIA, roles, shortcut, check, submenu, danger, disabled, Escape, right-click, positioning | **PASS** (regression, unchanged) |
| Disabled background `action/disabled-bg` | **DISABLED / REVIEW** (`BLOCKED` below) |
| **C4 final status** | **PASS with `DISABLED / REVIEW` and `INFO` rows** — no unresolved `FAIL`; `BLOCKED` items recorded below |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Disabled background role `action/disabled-bg` | `C6zTA` disabled rows | Foundation token-role decision; consistent with C3; disabled stays `DISABLED / REVIEW` |
| Submenu / nesting / flyout behaviour | `CX1vE` submenu affordance | interaction/API decision |
| Roving focus + arrow-key / Home / End | Menu keyboard model | interaction-policy decision |
| Menu open-state, Escape, focus-return-to-trigger | Menu interaction contract | interaction-policy decision |
| Selection-mode / checkable ARIA (`aria-checked`) | `CX1vE` checked row | public-API decision |
| Context Menu trigger event policy (keyboard / dedicated trigger) | `w7EbR` | interaction-policy decision |
| Portal / positioning / flip | `rokhq` surface placement | positioning/API decision |
| Dismiss-on-select policy | Menu selection model | interaction-policy decision |
| Inline / popup variant | Menu public variants | public-variant decision |
| Leading `icon` on `MenuItem` | `CX1vE` | **INFO** — left as-is per the approved contract |
| Group-label ARIA association / accessible name | `GLufg` label | accessibility/API decision |
| Typeahead | Menu keyboard model | interaction-policy decision |
| Virtualization | long-menu rendering | performance/API decision |
| New public component | — | explicitly excluded by the approved contract; `MenuItem` stays internal to `menu/` |

### Unresolved concerns

- **INFO — dark focus stories non-discriminating.** `FocusVisibleDark` passes before and after the role change (`brand.500.background` and `focus.ring` both resolve `green.500` in dark); the light story and the recipe-level composition test are the true guards.
- **INFO — hover not browser-asserted.** As in C1–C3, headless Chromium did not apply `:hover` reliably; `surface/hover` is proved at the recipe-selector level only. Light `surface/hover` equals the old `common.100.background`, so only the dark role is discriminating and it is recorded as recipe-level.
- **INFO — leading `icon` on `MenuItem`.** Left as-is (`CX1vE`) per the approved contract; not a regression.
- **INFO — static positioning.** `ContextMenu` keeps `position: absolute` + `zIndex: 10`; portal/flip is out of scope.
- **INFO — `check:deps` skipped.** No export changed (`index.ts` barrels, `menu.tsx`, `context-menu.tsx`, `panda.config.ts` untouched).

## C5 — Step + Pagination + Carousel cycle 1/2

**Scope:** approved recipe/token corrections only — Step upcoming marker number → `text/secondary`; Pagination `item` focus-visible ring → `focus/ring`; Carousel `control` and `dot` focus-visible rings → `focus/ring`. No component `.tsx`, `index.ts` barrel, `panda.config.ts` or new public component changed.

### Pen source node IDs (read-only)

| Role | Master | Documentation / token contract |
| --- | --- | --- |
| Step | `cAzIA` (`N73xY` Dot, `PC2Eg` Num, `t5z2Jc` Label) | `f9QCHG` — token contract `B9Zz0`, state contract `aRD7F`, content rules `T6ws7j`, accessibility `bQPSq` |
| Pagination | `DdvJi` (`j914Bi` Prev, page items, `MEYKy` Ell, `FyVKu` Next) | `yQPcK` — token contract, focus specimen `bPKuW`/`LLO1f` |
| Carousel | `rm4a0` (`lZBVI` Prev, `MuYfb` Slide, `cGfoS` Next, `G42WVc` Dots) | `hvrFF` — token contract, focus specimen `vQYgz`/`zqnW0`, motion rule `UaLXD` |

Verbatim Pen facts used:

- `cAzIA` master — `PC2Eg` (Num) fill resolves `$semantic/text/secondary` (`#334155` = neutral.700 light); `N73xY` (Dot) resolves `$semantic/surface/sunken` fill and `$semantic/border/strong` stroke (`strokeWidth: 1`).
- `f9QCHG` — named parts "root · step · indicator · connector · title · description"; public variants "horizontal · vertical, with description, with error, clickable"; state contract "upcoming · current · complete · error · disabled"; content rule "Completed, current and upcoming are visually distinct."; accessibility "The sequence is an ordered list.", "The current step exposes its position and total.", "Error is announced in text, not colour alone."
- `DdvJi` master — page number (`C1YSy`/`r1rcd9`/`DKb41`/`CbJAl`) fill `#334155` = `text/secondary`; `MEYKy` ellipsis fill `#475569` = `text/tertiary`.
- `yQPcK` focus specimen `LLO1f` — stroke `$semantic/focus/ring`, `strokeWidth: 2`; public variants "with first/last, with page size, compact, disabled prev/next"; state contract "default, current, disabled prev, disabled next, hover, focus-visible"; content rules "The current page is marked and is not a link.", "Ellipsis hides ranges, it is never a page number.", "Previous and next disable at the bounds rather than disappear."; accessibility "A navigation landmark with an accessible name.", "The current page exposes aria-current.", "Previous and next announce their disabled state."
- `rm4a0` master — controls `$semantic/action/secondary-bg` / `-border` / `-fg`; slide `$semantic/surface/sunken` + `$semantic/border/subtle`; dots `$semantic/border/strong`; active dot `$semantic/action/primary-bg`.
- `hvrFF` focus specimen `zqnW0` — stroke `$semantic/focus/ring`, `strokeWidth: 2`; public variants "with dots, with controls, with label, disabled"; content rule `UaLXD` "Auto-advance is not used; movement is user driven."; accessibility "Controls have accessible names.", "The slide region is reachable by keyboard and swipe.", "The current position is exposed in text."

**Read-only confirmation:** Pencil MCP `get_app_state` confirmed `ex_2.pen` as the active editor; only `Get`/`Print` visitors were used (no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`). Pen SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged after inspection.

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Step | upcoming marker number | `text/secondary` (`cAzIA`/`PC2Eg`; `f9QCHG`) | **PASS** — `variants.state.upcoming.marker.color` now `semantic.text.secondary`; surface `common.100.background` and boundary `common.50.border.strong` unchanged |
| Pagination | focus indicator | `focus/ring` (`yQPcK`/`LLO1f`) | **PASS** — `base.item.outlineColor._focusVisible` now `semantic.focus.ring`; `solid`, `{borderWidths.thick}`, offset `0` unchanged |
| Carousel | control focus indicator | `focus/ring` (`hvrFF`/`zqnW0`) | **PASS** — `base.control.outlineColor._focusVisible` now `semantic.focus.ring`; geometry unchanged |
| Carousel | dot focus indicator | `focus/ring` (`hvrFF`/`zqnW0`) | **PASS** — `base.dot.outlineColor._focusVisible` now `semantic.focus.ring`; geometry unchanged |
| Step | states completed · current · upcoming · error | `aRD7F` | regression only — unchanged and re-asserted (composition + stories) |
| Pagination | current · prev/next disable-at-bounds · ellipsis | `yQPcK` content rules | regression only — unchanged and re-asserted |
| Carousel | slides · dots · current/slide ARIA · no autoplay | `hvrFF`, `UaLXD` | regression only — unchanged and re-asserted |
| Step / Pagination / Carousel | disabled | Pen audit marks disabled rows `DISABLED` (`f9QCHG`, `yQPcK`, `hvrFF`) | **DISABLED / REVIEW** — real ratios shown below, never counted PASS |

### Approved public surface and behaviour

- `Step`: the upcoming marker number color switched from the numeric `semantic.common.600.background` to the role `semantic.text.secondary`. Marker surface (`common.100.background`), marker boundary (`common.50.border.strong`), all other states and the `StepProps` API are unchanged.
- `Pagination`: `item` focus-visible ring switched to `semantic.focus.ring`; outline style/width/offset unchanged. No `with page size` / `compact` / windowing / routing / disabled-role change.
- `Carousel`: `control` and `dot` focus-visible rings switched to `semantic.focus.ring`; geometry unchanged. No `with dots` / `with controls` / `with label` toggle, no ButtonIcon composition, no `arrow-left` icon, no swipe, no disabled-role swap, no timer/autplay. The no-autoplay contract (`UaLXD`) is untouched.
- No export changed (`index.ts` barrels and `panda.config.ts` untouched), so `check:deps` was not required. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

Changed paths: `src/shared/components/step/{preset.ts,Step.composition.test.tsx,Step.stories.tsx}`, `src/shared/components/pagination/{preset.ts,Pagination.composition.test.tsx,Pagination.stories.tsx}`, `src/shared/components/carousel/{preset.ts,Carousel.composition.test.tsx,Carousel.stories.tsx}`, this evidence, `artifacts/batch-c/step-pagination-carousel/` (new captures).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/step/Step.composition.test.tsx src/shared/components/pagination/Pagination.composition.test.tsx src/shared/components/carousel/Carousel.composition.test.tsx` |
| RED exit | `1` |
| RED result | `4 fail` / `19 pass` (23 total, 3 files, `57 expect() calls`) |
| RED failures | step `paints the upcoming marker number with the text/secondary role`; pagination `paints the shared focus ring role on its controls`; carousel `paints the shared focus ring role on the controls`; carousel `paints the shared focus ring role on the dots` |
| RED cause | Step `upcoming.marker.color` was `semantic.common.600.background`; Pagination `item` / Carousel `control` / Carousel `dot` `outlineColor._focusVisible` were `semantic.brand.500.background` |
| GREEN exit | `0` |
| GREEN result | `23 pass` / `0 fail` (`57 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium), run before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/step/Step.stories.tsx src/shared/components/pagination/Pagination.stories.tsx src/shared/components/carousel/Carousel.stories.tsx` |
| RED exit | `1` |
| RED result | `3 failed` files, `5 failed` / `19 passed` (24) |
| RED failures | carousel `Focus Visible Light` (`rgb(34, 197, 94)` vs expected `rgb(22, 163, 74)`); carousel `Dot Focus Visible Light`; pagination `Focus Visible Light`; step `Upcoming Number Light` (`rgb(71, 85, 105)` vs expected `rgb(51, 65, 85)`); step `Upcoming Number Dark` (`rgb(148, 163, 184)` vs expected `rgb(203, 213, 225)`) |
| GREEN exit | `0` |
| GREEN result | `3 passed` files, `24 passed` (24) |

Both Step number stories discriminate (light neutral.600 → neutral.700, dark neutral.400 → neutral.300). The dark focus-ring stories (`FocusVisibleDark`, `DotFocusVisibleDark`) are **non-discriminating**: before and after the change the dark outline is `green.500` (`rgb(34, 197, 94)`), because `brand.500.background` and `focus.ring` both resolve `green.500` in dark. The light focus stories and the recipe-level composition tests are the true guards. Step completed/current/error, Pagination current/prev-next/ellipsis and Carousel slides/dots/ARIA/no-autoplay are regression coverage, not fabricated RED.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Step upcoming marker number (`UpcomingNumberLight` / `Dark`) | `rgb(51, 65, 85)` (`neutral.700`, `text/secondary`) — **discriminating** | `rgb(203, 213, 225)` (`neutral.300`) — **discriminating** |
| Pagination control focus ring (`FocusVisibleLight` / `Dark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Carousel control focus ring (`FocusVisibleLight` / `Dark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Carousel dot focus ring (`DotFocusVisibleLight` / `Dark`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) | `outline: solid 2px rgb(34, 197, 94)` (`green.500`) — **non-discriminating** |
| Generated `styles.css` | `.step__marker--state_upcoming { color: var(--colors-semantic-text-secondary) }`; `.pagination__item:focus-visible`, `.carousel__control:focus-visible`, `.carousel__dot:focus-visible { outline-color: var(--colors-semantic-focus-ring) }` | theme-independent (same recipe/CSS) |
| Step completed / current / error, Pagination current + disabled bounds + ellipsis, Carousel slides + dots + `aria-roledescription` + no autoplay | regression asserted in the focused composition/story runs above; no runtime/ARIA change | theme-independent structure |

Disabled states are **DISABLED / REVIEW** (reported, never counted PASS). Pen audit ratios read from the contracts: Step (`f9QCHG`) disabled-boundary `action/disabled-bg → border/strong` 4.34 / 5.71, disabled-text `surface/raised → text/tertiary` 7.58 / 6.96, `surface/sunken → text/secondary` 9.45 / 13.59, `action/disabled-bg → text/secondary` 9.45 / 9.85; Pagination (`yQPcK`) disabled-text `action/disabled-bg → text/tertiary` 6.92 / 5.71, disabled-icon/text `action/disabled-bg → text/secondary` 9.45 / 9.85 (×2); Carousel (`hvrFF`) disabled-boundary `action/disabled-bg → border/subtle` 1.13 / 1.00, `action/disabled-bg → action/secondary-border` 4.34 / 5.71, disabled-icon `surface/sunken → text/tertiary` 6.92 / 7.87, disabled-text `surface/raised → text/tertiary` 7.58 / 6.96, disabled-icon `action/secondary-bg → action/secondary-fg` 14.63 / 13.35.

Code-side disabled tokens (this system paints no `action/disabled-bg`), ratios via `@shared/utils contrastRatio`: Pagination `item` disabled text `common.400.background` on `common.50.background` = 2.45 light / 2.66 dark; Carousel `control` disabled text `common.400.background` on `common.100.background` = 2.34 / 2.36; Carousel `dot` disabled fill `common.400.background` on `common.50.background` = 2.45 / 2.66. All below 4.5 → DISABLED / REVIEW, not PASS.

### Captures

Code-side Storybook-iframe captures, `deviceScaleFactor: 2`, in `artifacts/batch-c/step-pagination-carousel/`: `step-upcoming-number-{light,dark}`, `step-horizontal-light`, `step-stack-light`, `pagination-default-light`, `pagination-focus-{light,dark}`, `carousel-default-light`, `carousel-disabled-light`, `carousel-control-focus-{light,dark}`, `carousel-dot-focus-{light,dark}` (13 PNGs). The capture script recorded the focused element and its painted outline; focus stories show `solid 2px rgb(22, 163, 74)` light and `solid 2px rgb(34, 197, 94)` dark on `pagination__item` / `carousel__control` / `carousel__dot`.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)`; generated `.step__marker--state_upcoming` now reads `text-secondary`, Pagination/Carousel focus-visible read `--colors-semantic-focus-ring` |
| focused composition RED | `1` | `4 fail` / `19 pass` (57 expect calls) |
| focused composition GREEN | `0` | `23 pass` / `0 fail` (57 expect calls) |
| focused browser RED | `1` | `3 failed` files, `5 failed` / `19 passed` (24) |
| focused browser GREEN | `0` | `3 passed` files, `24 passed` (24) |
| `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `782 pass / 0 fail` (90 files); browser `639 passed` (73 files) |
| `mise run check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index--m47Sug0.css 223.76 kB` |
| `git diff --check` | `0` | clean |

Slice-local counts: `+4` focused unit composition checks (19 → 23 across the three files) and `+8` browser story checks (16 → 24 across the three story files). The aggregate `mise run check` totals above are measured in a shared working tree that also contains concurrent Batch C4 (`Menu` / `ContextMenu`) work, so the aggregate is not attributable to C5 alone. An intermittent pre-existing browser flake (`Card` "No Preview" under full-suite load) reproduced once and then passed in isolation and on the clean re-run; and an untracked zero-byte editor artifact `.zed/debug.json` broke `check:lint` and was temporarily relocated for the green run, then restored byte-identical (see concerns).

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Step upcoming marker number → `semantic.text.secondary` | **PASS** |
| Pagination `item` focus ring → `semantic.focus.ring` | **PASS** |
| Carousel `control` focus ring → `semantic.focus.ring` | **PASS** |
| Carousel `dot` focus ring → `semantic.focus.ring` | **PASS** |
| Step states, Pagination current/bounds/ellipsis, Carousel slides/dots/ARIA/no-autoplay | **PASS** (regression, unchanged) |
| Disabled contrast (Step / Pagination / Carousel) | `DISABLED / REVIEW` (both themes, real ratios) |
| **C5 final status** | **PASS with `DISABLED / REVIEW` rows** — no unresolved `FAIL`; `BLOCKED` items recorded below |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Step disabled state, orientation (vertical), clickable, connector component, ordered-list container, current-position + total, mono marker font | `f9QCHG` state contract, public variants, accessibility | public-variant/API + container-architecture decision |
| Pagination `with page size`, `compact`, windowing policy, URL routing, disabled role swap | `yQPcK` public variants, disabled rows | public-variant/API + routing decision |
| Carousel `with dots` / `with controls` / `with label` public toggles, controls composed from ButtonIcon, `arrow-left` icon addition, swipe gesture, disabled role swap | `hvrFF` public variants | public-variant/API + icon-set/dependency decision |
| Carousel autoplay / auto-advance / loop / timers | `UaLXD` "Auto-advance is not used; movement is user driven." | **FORBIDDEN** by the approved contract; movement stays user-driven |
| New public components (`StepBar` / `Stepper` / `PaginationItem` / `CarouselControl` / `CarouselSlide` / `Connector`) | — | explicitly excluded by the approved contract |

### Unresolved concerns

- **DISABLED / REVIEW — disabled contrast.** Step has no disabled runtime state in scope; Pagination and Carousel disabled controls use `common.400.background` against `common.50/100.background` (real ratios 2.34–2.66, reported, never PASS). The Pen `action/disabled-bg` disabled role swap is BLOCKED.
- **INFO — dark focus stories non-discriminating.** In dark, `brand.500.background` and `focus.ring` both resolve `green.500`; `FocusVisibleDark` / `DotFocusVisibleDark` pass before and after and are not claimed as proof.
- **INFO — mixed working tree.** `mise run check` / `build` ran while a concurrent C4 (`Menu` / `ContextMenu`) change set and untracked `.zed/debug.json` (empty, editor artifact) were present. The commit contains only the C5 paths; the concurrent files were not staged.
- **INFO — capture method.** Storybook-iframe Playwright captures (`deviceScaleFactor: 2`), consistent with C1/C2; the focused-element outline was read from the live page as part of the capture script.
- **INFO — Pen read-only.** The Pen was accessed through Pencil MCP `Get`/`Print` only; no mutation call was issued and the file hash is unchanged.

## C4 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `1d0285a9719d44a657029436c7f55a27f798aa16` vs `1a4395b`.
**Verdict:** **APPROVED** — no Critical findings.

- Menu item focus ring = `semantic.focus.ring`; six Pen-exact role corrections only (surface.overlay, border.subtle, surface.hover, text.link, context trigger surface.raised + border.subtle); geometry and all other tokens unchanged; doc comments match.
- `menu.tsx`/`context-menu.tsx`/`index.ts`/`panda.config.ts` unchanged; MenuItem internal; ContextMenu still composes public Menu/MenuItem; scope excludes the C5 files.
- True RED: focus role light + 5 discriminating role corrections (6 browser, 5 composition); dark focus / light check non-discriminating and not claimed.
- BLOCKED rows recorded; disabled bg stays `DISABLED / REVIEW`.

**Important (process):** the C4 `mise run check` was blocked at `check:lint` by the untracked 0-byte `.zed/debug.json`; C4 has no attributable green end-to-end check in its own commit (resolved for C5's run by temporarily relocating the artifact). To be reconciled at the Batch C final verification.
**Minor:** (1) evidence "all six new role variables emitted" is inaccurate — only `surface-overlay`/`surface-hover` are newly resolved; (2) Menu overlay dark bg and border both resolve `rgb(30,41,59)` (invisible boundary in dark) — follows Pen roles, INFO; (3) RED pass enumeration omits the `States` regression story; (4) bundled `toMatchObject` reduces per-role discrimination; (5) raw class-selector queries are unhardened.

## C5 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `1a4395b18633021687c357e19494bf0232c36960` vs `64df4da`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Step upcoming marker = `semantic.text.secondary` (only Step line); Pagination item + Carousel control/dot focus rings = `semantic.focus.ring`; geometry preserved; component `.tsx`/`index.ts`/`panda.config.ts` unchanged.
- Scope clean (no C4 menu files). Composition RED independently reproduced (`4 fail / 19 pass`); GREEN `23 pass`. Browser `3 passed / 24 passed`. Step number discriminates both themes; focus rings light-only.
- No autoplay/timers/loop; no new components; BLOCKED rows recorded; disabled ratios real and `DISABLED / REVIEW`.

**Minor:** (1) evidence overstates no-autoplay as "asserted" — carousel merely contains no timer code; (2) `Step.composition.test.tsx` comment says the label resolves `text/secondary` but the recipe keeps value-equivalent `common.700.background`; (3) browser RED is process evidence, not reproducible from the squashed commit; (4) typo "autplay".

## C6 — Tooltip + Popover + HoverCard + FloatingPanel cycle 1/2

**Scope:** approved recipe-only role corrections — the four trigger/focus controls move to `focus/ring`; the Popover/HoverCard/FloatingPanel overlay surfaces move to `surface/overlay` + `border/subtle` at `lg` (16px) radius; the named text roles resolve `text/primary` · `text/secondary` · `text/tertiary`. No `.tsx`, `index.ts`, `panda.config.ts` or new public component changed. No aria/roles/Escape/outside/hover/focus logic/placement/avatar/width/padding/shadow touched.

### Pen source node IDs (read-only)

| Role | Master | Documentation frame | Token contract frame / table |
| --- | --- | --- | --- |
| Tooltip | `eEhwI` | `UO5oQ` | `EOGvS` / `j92yv` (contract table) |
| Popover | `Qwced` | `H8KJm` | `q36Cjg` / `G7LBlJ` |
| Hover Card | `l7aEf` | `nij7I` | `xHnVP` / `j2sox` |
| Floating Panel | `J3VmmT` | `y3lqjy` | `yt0ku` / `fAZa3` |

Contract facts applied:

- `EOGvS` (Tooltip): decorative-boundary resolves `surface/raised` → `border/subtle`; the tooltip surface contract pair is `tooltip/bg` → `tooltip/fg`; `focus` row is `focus-indicator` 1/1 PASS both themes; accessibility "Reachable by focus as well as hover", "Described by the trigger, never focusable itself".
- `q36Cjg` (Popover): decorative-boundary `surface/raised` + `border/subtle`; the overlay specimen resolves `surface/overlay`; named parts "root · trigger · arrow · surface · header · content · close"; public variants "placement, with arrow, with header, modal · non-modal"; rules "Closes on Escape and on outside click", "Focus returns to the trigger on close", "One popover at a time".
- `xHnVP` (Hover Card): decorative-boundary `surface/raised` + `border/subtle`; the card specimen resolves `surface/overlay`; named parts "root · trigger · surface · header · meta · actions"; variants "with avatar, with actions, placement"; rules "Opens on hover and on keyboard focus", "Never traps focus and never blocks the page", "Adds a short delay".
- `yt0ku` (Floating Panel): decorative-boundary `surface/raised` + `border/subtle`; the panel specimen resolves `surface/overlay`; named parts "root · header · title · body · drag handle · collapse control · close"; variants "docked · floating, collapsible, resizable"; rules "The panel never steals focus on mount", "Position and collapsed state persist during the session".

All four token-contract tables carry the `focus-indicator 1/1 PASS` row in both themes, which is the `focus/ring` role the approved contract applies to each trigger/collapse/close control.

**Read-only confirmation:** Pencil MCP `get_app_state` confirmed `ex_2.pen` as the active canvas editor; only `Get` / `Print` reads were issued (no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`). Pen SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged (mtime `2026-10-02 08:35`).

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Tooltip | trigger focus indicator | `focus/ring` (`EOGvS`) | **PASS** — `trigger.outlineColor._focusVisible` now `semantic.focus.ring`; `solid`, `{borderWidths.thick}` (2px), offset `0` retained |
| Popover | trigger focus indicator | `focus/ring` (`q36Cjg`) | **PASS** — `trigger.outlineColor._focusVisible` now `semantic.focus.ring` |
| Hover Card | trigger focus indicator | `focus/ring` (`xHnVP`) | **PASS** — `trigger.outlineColor._focusVisible` now `semantic.focus.ring` |
| Floating Panel | trigger / collapse / close focus indicator | `focus/ring` (`yt0ku`) | **PASS** — all three `outlineColor._focusVisible` now `semantic.focus.ring` |
| Popover | overlay surface + boundary + radius | `surface/overlay` + `border/subtle` (`q36Cjg`) | **PASS** — `surface.backgroundColor` → `semantic.surface.overlay`, `borderColor` → `semantic.border.subtle`, `borderRadius` → `lg` (was `md`) |
| Hover Card | surface + boundary + radius | `surface/overlay` + `border/subtle` (`xHnVP`) | **PASS** — same three corrections |
| Floating Panel | panel surface + boundary + radius | `surface/overlay` + `border/subtle` (`yt0ku`) | **PASS** — same three corrections |
| Popover | title / description text | content-role text (`q36Cjg`) | **PASS** — `title` → `semantic.text.primary`, `description` → `semantic.text.secondary` (value-equivalent) |
| Hover Card | name / role / bio text | content-role text (`xHnVP`) | **PASS** — `name` → `semantic.text.primary`, `role` → `semantic.text.tertiary`, `bio` → `semantic.text.secondary` (value-equivalent) |
| Floating Panel | icon / title / collapse / close text | content-role text (`yt0ku`) | **PASS** — `icon` → `semantic.text.secondary`, `title` → `semantic.text.primary`, `collapse`/`close` color → `semantic.text.tertiary` (value-equivalent) |
| All four | ARIA / roles / Escape / outside-click / hover/focus open / placement / avatar / width / padding / shadow | docs above | regression only — unchanged and re-asserted |
| Tooltip | dark surface (`tooltip/bg` + `tooltip/fg`) | `EOGvS` tooltip pair | **BLOCKED / DISABLED-REVIEW** — Foundation has no `semantic.tooltip.bg`/`fg`; surface stays `common.900.*` and inverts to a light panel in dark. Recorded, never PASS |
| Floating Panel | disabled state | `yt0ku` audit `DISABLED / REVIEW 6/6` | **DISABLED / REVIEW** — no runtime disabled state in code; `action/disabled-bg` is a Foundation role decision (`BLOCKED` below) |
| All four | disabled backgrounds `action/disabled-bg` | Pen audit | **DISABLED / REVIEW** — consistent with C3–C5; no PASS |
| Tooltip | leading surface radius / mono shortcut | Pen `radius/sm`, mono family | **INFO** — left as-is (approved contract) |

### Approved public surface and behaviour

- `tooltip` recipe: `trigger.outlineColor._focusVisible` → `semantic.focus.ring`. Surface (`common.900.background`), label/shortcut (`common.900.text`), `radius/sm` and geometry are unchanged. Tooltip delay/hover-intent/arrow and the dark `tooltip/bg`/`fg` pair are out of scope.
- `popover` recipe: `trigger.outlineColor._focusVisible` → `semantic.focus.ring`; `surface.backgroundColor` → `semantic.surface.overlay`; `surface.borderColor` → `semantic.border.subtle`; `surface.borderRadius` → `lg`; `title.color` → `semantic.text.primary`; `description.color` → `semantic.text.secondary`. `minWidth`/`maxWidth`, placement variants and `shadow.500` unchanged. No arrow / header / modal / close / focus-return / stacking / portal change.
- `hoverCard` recipe: `trigger.outlineColor._focusVisible` → `semantic.focus.ring`; `surface.backgroundColor` → `semantic.surface.overlay`; `surface.borderColor` → `semantic.border.subtle`; `surface.borderRadius` → `lg`; `name.color` → `semantic.text.primary`; `role.color` → `semantic.text.tertiary`; `bio.color` → `semantic.text.secondary`. Avatar `brand.100.*`, 300px width, 36px avatar, placement and `shadow.500` unchanged. No delay / with-avatar / trigger composition change.
- `floatingPanel` recipe: `trigger`/`collapse`/`close` `outlineColor._focusVisible` → `semantic.focus.ring`; `panel.backgroundColor` → `semantic.surface.overlay`; `panel.borderColor` → `semantic.border.subtle`; `panel.borderRadius` → `lg`; `icon.color` → `semantic.text.secondary`; `title.color` → `semantic.text.primary`; `collapse.color`/`close.color` → `semantic.text.tertiary`. 320px width, 14px padding, `x10` corner inset, placement variants and `shadow.500` unchanged. No drag / resize / dragging / persistence / docked / floating / disabled change.
- Preset doc comments updated to name the resolved role tokens. No component markup changed; all `*.tsx`, both barrel sets and `panda.config.ts` are untouched. No export changed, so `check:deps` was not required. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited): the overlay classes now read `var(--colors-semantic-surface-overlay)`, `var(--colors-semantic-border-subtle)`, `var(--radii-lg)` and `var(--colors-semantic-focus-ring)`.

Changed paths: `src/shared/components/tooltip/{preset.ts,Tooltip.composition.test.tsx,Tooltip.stories.tsx}`, `src/shared/components/popover/{preset.ts,Popover.composition.test.tsx,Popover.stories.tsx}`, `src/shared/components/hover-card/{preset.ts,HoverCard.composition.test.tsx,HoverCard.stories.tsx}`, `src/shared/components/floating-panel/{preset.ts,FloatingPanel.composition.test.tsx,FloatingPanel.stories.tsx}`, this evidence, `artifacts/batch-c/anchored-overlays/` (new captures).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/tooltip/Tooltip.composition.test.tsx src/shared/components/popover/Popover.composition.test.tsx src/shared/components/hover-card/HoverCard.composition.test.tsx src/shared/components/floating-panel/FloatingPanel.composition.test.tsx` |
| RED exit | `1` |
| RED result | `10 fail` / `37 pass` (47 total, 4 files, `112 expect() calls`) |
| RED failures | tooltip `paints the shared focus ring role on the trigger`; popover `paints the shared focus ring role on the trigger`, `resolves the overlay surface roles and radius`, `resolves the header text roles`; hover card `paints the shared focus ring role on the trigger`, `resolves the overlay surface roles and radius`, `resolves the identity and bio text roles`; floating panel `paints the shared focus ring role on the controls`, `resolves the overlay surface roles and radius`, `resolves the header and control text roles` |
| RED cause | trigger `outlineColor._focusVisible` was `semantic.brand.500.background`; surface `backgroundColor` `semantic.common.50.background`, `borderColor` `semantic.common.200.divider`, `borderRadius` `md`; text colors on the common step ramp (`common.50.text`, `common.700.background`, `common.600.background`) |
| GREEN exit | `0` |
| GREEN result | `47 pass` / `0 fail` (`126 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium), run before `mise run gen` so the stale generated CSS provided the RED:

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/tooltip/Tooltip.stories.tsx src/shared/components/popover/Popover.stories.tsx src/shared/components/hover-card/HoverCard.stories.tsx src/shared/components/floating-panel/FloatingPanel.stories.tsx` |
| RED exit | `1` |
| RED result | `4 failed` files, `12 failed` / `28 passed` (40) |
| RED failures | tooltip `Focus Visible Light`; popover `Focus Visible Light`, `Surface Light`, `Surface Dark`; hover card `Focus Visible Light`, `Surface Light`, `Surface Dark`; floating panel `Panel Light`, `Panel Dark`, `Trigger Focus Visible Light`, `Collapse Focus Visible Light`, `Close Focus Visible Light` |
| GREEN exit | `0` |
| GREEN result | `4 passed` files, `40 passed` (40) |

The light focus-role change and the surface/border/radius corrections are true RED (browser-computed values changed). The dark focus stories are **not** claimed: in dark, `brand.500.background` and `focus.ring` both resolve `green.500`, so dark focus is non-discriminating; no dark focus story is asserted. The text role changes are true at recipe level but **not** browser-discriminating (same RGB), so no browser proof is claimed for them.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Tooltip trigger focus (`FocusVisibleLight`) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) — discriminating | not claimed (dark `brand.500.background` = `focus.ring` = `green.500`) |
| Popover trigger focus | `outline: solid 2px rgb(22, 163, 74)` — discriminating | not claimed (non-discriminating) |
| Hover Card trigger focus | `outline: solid 2px rgb(22, 163, 74)` — discriminating | not claimed (non-discriminating) |
| Floating Panel trigger / collapse / close focus | `outline: solid 2px rgb(22, 163, 74)` — discriminating | not claimed (non-discriminating) |
| Popover surface + radius | bg `rgb(255, 255, 255)` (`surface.overlay` = `base.white`; old `neutral.50` `rgb(248, 250, 252)`), border `rgb(226, 232, 240)` (`border.subtle` = `neutral.200`; old `neutral.300` `rgb(203, 213, 225)`), radius `16px` (old `10px`) | bg `rgb(30, 41, 59)` (`neutral.800`; old `neutral.950` `rgb(2, 6, 23)`), border `rgb(30, 41, 59)` (`neutral.800`; old `neutral.700` `rgb(51, 65, 85)`), radius `16px` |
| Hover Card surface + radius | same as Popover — discriminating both themes | same as Popover |
| Floating Panel panel + radius | same as Popover — discriminating both themes | same as Popover |
| Popover / Hover Card / Floating Panel text roles | `text.primary` = `neutral.900`, `text.secondary` = `neutral.700`, `text.tertiary` = `neutral.600` — **value-equivalent**, not browser-discriminating | `neutral.50` / `neutral.300` / `neutral.400` — **value-equivalent** |
| Tooltip dark surface (BLOCKED) | light surface: fill `neutral.900` `rgb(15, 23, 42)`, label `neutral.50` `rgb(248, 250, 252)`, ratio `17.06` | dark: the current pair resolves a **light** panel `neutral.100` `rgb(241, 245, 249)` with `neutral.900` `rgb(15, 23, 42)` text, ratio `16.30` — Pen wants a dark `tooltip/bg`/`tooltip/fg` pair that does not exist in Foundation → **BLOCKED / DISABLED-REVIEW**, never PASS |
| Floating Panel disabled (Pen audit `6/6`) | no runtime disabled state in code; `action/disabled-bg` absent → **DISABLED / REVIEW** | same |
| Generated `styles.css` | `.popover__surface`, `.hoverCard__surface`, `.floatingPanel__panel` read `var(--colors-semantic-surface-overlay)`, `var(--colors-semantic-border-subtle)`, `var(--radii-lg)`; all four triggers/controls read `var(--colors-semantic-focus-ring)` | theme-independent (same recipe/CSS) |
| ARIA / Escape / outside-click / hover+focus open / placement / avatar / width / padding / shadow | regression asserted in the focused composition/story runs above; no runtime/ARIA change | theme-independent structure |

Disabled / blocked ratios (reported, never PASS): Tooltip dark current pair `neutral.900` on `neutral.100` = `16.30`; the Pen `tooltip/bg` → `tooltip/fg` pair is unresolvable code-side (`BLOCKED`). `action.disabled.background` → `text.disabled` = `2.34` light (`#94A3B8` on `#F1F5F9`) / `1.93` dark (`#475569` on `#1E293B`), both below 4.5 → `DISABLED / REVIEW`, not implemented. Overlay control text `text.tertiary` on `surface.overlay` = `7.58` light / `5.71` dark (informational, not a blocked row).

### Captures

Code-side Storybook-iframe captures (`deviceScaleFactor: 2`), in `artifacts/batch-c/anchored-overlays/`: `tooltip-focus-light`, `tooltip-open-dark` (BLOCKED dark mismatch evidence), `popover-focus-light`, `popover-surface-{light,dark}`, `hover-card-focus-light`, `hover-card-surface-{light,dark}`, `floating-panel-surface-{light,dark}`, `floating-panel-{trigger,collapse,close}-focus-light` (13 PNGs) plus `computed-styles.json`. The capture script recorded each target's computed style; focus captures show `solid 2px rgb(22, 163, 74)` on `.tooltip__trigger` / `.popover__trigger` / `.hoverCard__trigger` / `.floatingPanel__trigger` / `.floatingPanel__collapse` / `.floatingPanel__close`, and surface captures show `rgb(255, 255, 255)` / `rgb(30, 41, 59)` with `16px` radius.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)`; overlay classes now read `surface-overlay` / `border-subtle` / `radii-lg` / `focus-ring` |
| focused composition RED | `1` | `10 fail` / `37 pass` (112 expect calls) |
| focused composition GREEN | `0` | `47 pass` / `0 fail` (126 expect calls) |
| focused browser RED | `1` | `4 failed` files, `12 failed` / `28 passed` (40) |
| focused browser GREEN | `0` | `4 passed` files, `40 passed` (40) |
| `mise run check:lint` | `1` | **blocked** by the pre-existing untracked 0-byte `.zed/debug.json` (`1:1 Parsing error: Unexpected end of input`); **no** lint error in any C6 path. Artifact left in place, not deleted |
| `mise run check:types` | `0` | clean |
| `mise run check:format` | `0` | clean after `dprint fmt` on the 12 changed files |
| `mise run icons:check` | `0` | `✓ icons up to date (38 icons)` |
| `mise run fonts:check` | `0` | `✓ web fonts up to date (2 faces)` |
| `mise run test:unit` | `0` | `792 pass` / `0 fail` (90 files, `4076 expect() calls`) |
| `mise run test:browser` | `0` | `73 passed` files, `651 passed` (651) |
| `mise run check` (aggregate) | n/a | not reachable as one command because of the pre-existing `.zed/debug.json` lint block; every stage above is green individually |
| `mise run check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ 141 modules transformed`; `dist/assets/index-DHUYtwx5.css 223.62 kB` |
| `git diff --check` | `0` | clean |

Slice-local counts: `+10` focused unit composition checks (37 → 47 across the four files) and `+12` browser story checks (28 → 40 across the four story files). Unit `782 → 792`; browser `639 → 651`.

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Tooltip / Popover / Hover Card / Floating Panel trigger focus → `semantic.focus.ring` | **PASS** |
| Floating Panel collapse / close focus → `semantic.focus.ring` | **PASS** |
| Popover / Hover Card / Floating Panel surface → `semantic.surface.overlay` + `semantic.border.subtle` + `lg` radius | **PASS** (discriminating both themes) |
| Popover title/description, Hover Card name/role/bio, Floating Panel icon/title/collapse/close text roles | **PASS** (recipe-level; value-equivalent) |
| ARIA / roles / Escape / outside-click / hover+focus open / placement / avatar / width / padding / shadow | **PASS** (regression, unchanged) |
| Tooltip dark surface (`tooltip/bg`/`tooltip/fg`) | **BLOCKED / DISABLED-REVIEW** — recorded, never PASS |
| Floating Panel disabled + `action/disabled-bg` | `DISABLED / REVIEW` (real ratios, not implemented) |
| **C6 final status** | **PASS with `BLOCKED` / `DISABLED-REVIEW` rows** — no unresolved `FAIL` |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Tooltip dark surface (`semantic/tooltip/bg` + `tooltip/fg`) | `EOGvS` tooltip pair | Foundation has no tooltip role tokens; surface stays `common.900.*`, which inverts to a light panel in dark — **DISABLED-REVIEW** |
| `action/disabled-bg` disabled backgrounds | audit rows | Foundation token-role decision (consistent with C3–C5) |
| Tooltip delay / hover-intent, tooltip arrow | `EOGvS` rules | interaction/API decision |
| Popover `with arrow`, `with header`, `modal`/`non-modal`, surface `close`, focus-return-to-trigger, one-at-a-time stacking, portal/positioning/flip/collision, `aria-controls` | `q36Cjg` variants / rules | public-variant/API + positioning decision |
| Hover Card open delay, `with avatar`, `with actions`, trigger composition | `xHnVP` variants / rules | public-variant/API decision |
| Floating Panel drag handle, resize, dragging state, session persistence, docked/floating, disabled | `yt0ku` variants / rules | interaction/API + state decision |
| New public components (TooltipArrow, PopoverHeader, HoverCardAvatar, FloatingPanelDragHandle, …) | — | explicitly excluded by the approved contract |

### Unresolved concerns

- **DISABLED-REVIEW — Tooltip dark surface.** `semantic.tooltip.bg` / `semantic.tooltip.fg` do not exist in Foundation; the dark theme renders a light panel (`neutral.100` fill, ratio `16.30`), which does not match Pen's `tooltip/bg` → `tooltip/fg` pair. Recorded with the capture `tooltip-open-dark`, reported, never PASS.
- **INFO — dark focus non-discriminating.** In dark, `brand.500.background` and `focus.ring` both resolve `green.500`; no dark focus story is asserted, and the light focus stories plus the recipe-level composition tests are the true guards.
- **INFO — dark overlay boundary invisible.** In dark, `surface.overlay` and `border.subtle` both resolve `neutral.800` (`rgb(30, 41, 59)`); this follows the Pen roles and matches the C4 Menu observation.
- **INFO — value-equivalent text roles.** The `text/primary`, `text/secondary` and `text/tertiary` corrections resolve the same RGB as the replaced `common.*` ramp; they are true at recipe level and are not claimed as browser-discriminating.
- **INFO — `mise run check` blocked at lint.** The pre-existing untracked 0-byte `.zed/debug.json` fails ESLint parsing; per instruction it was left in place (not deleted) and every other stage was run and recorded green individually.
- **INFO — capture method.** Storybook-iframe Playwright captures (`deviceScaleFactor: 2`, dedicated Storybook on port `6008`), consistent with C1–C5; focus was driven with a CDP `Tab` key event so `:focus-visible` engaged, and the focused element's computed outline was read from the live page.
- **INFO — Pen read-only.** The Pen was accessed through Pencil MCP `Get`/`Print` only; no mutation call was issued and the file hash is unchanged.

## C7 — Dialog + AlertDialog + Drawer + Sheet + Tour cycle 1/2

**Scope:** approved recipe-only role corrections — the Dialog, Alert Dialog, Drawer, Sheet and Tour triggers/closes (plus Alert Dialog cancel/confirm and Tour back/next) move to `focus/ring`; the modal surfaces resolve `surface/overlay` + `border/subtle`; the Drawer and Tour footer separators resolve `border/subtle`; the Sheet handle and Tour inactive dots resolve `border/strong`; the Tour current dot, Tour next and Alert Dialog destructive confirm resolve the `action/*` roles; and the named text roles (`text/primary` · `text/secondary` · `text/tertiary`) replace the common step ramp. The scrim stays a fixed literal. No component `.tsx`, `index.ts` barrel, `panda.config.ts` or new public component changed.

### Pen source node IDs (read-only)

| Role | Master | Documentation frame | Token contract & audit | State contract | Anatomy / accessibility |
| --- | --- | --- | --- | --- | --- |
| Dialog | `UJUPb` | `SV28R` | `ByFFJ` (table `ztw8c`) | `DdsbR` | `PKRLu` / `lhgaV` |
| Alert Dialog | `FiHft` | `ZOluA` | `P1EWw6` (table `tw1XG`) | `F3btC` | `DHvK4` / `T7kmS1` |
| Drawer | `UbA6r` | `P6x6P` | `egbSj` (table `g5rLz`) | `g4D79B` | `o6vTHS` / `WSZne` |
| Sheet | `aOMDf` | `kuTcw` | `VfAQJ` (table `DfFvq`) | `Z0o7X` | `gxLH8` / `y8iWyp` |
| Tour | `AHDih` | `p3wP8` | `b9WHl` (table `I6h1f8`) | `N8BO5g` | `GGdH9` / `Y8XKFw` |

Verbatim Pen facts used (token contract & audit tables):

- `ByFFJ` (Dialog) — content rows "`Dialogs | text + icon | surface/overlay | text/* (content role) …`"; functional-boundary rows "`surface/overlay … action/secondary-border`"; decorative-boundary rows "`… border/subtle`"; audit summary `focus-indicator 1/1 PASS` light + dark, `FAIL rows 0`.
- `P1EWw6` (Alert Dialog) — "`Scrim | decorative-boundary | overlay/scrim … border/subtle`"; "`theme light | text + icon | surface/base | text/* (content role)`"; audit summary `focus-indicator 1/1 PASS` both themes; failure list `st-destructive disabled … action/disabled-bg → action/danger-fg 1.10 / 14.63 DISABLED`.
- `egbSj` (Drawer) — "`Drawer col | decorative-boundary | surface/raised … border/subtle`"; "`Drawer col | text + icon | surface/overlay | text/*`"; `focus-indicator 1/1 PASS`; disabled boundary `action/disabled-bg → border/subtle 1.13 / 1.00 DISABLED`.
- `VfAQJ` (Sheet) — "`Sheet col | text + icon | surface/overlay | text/*`"; `focus-indicator 1/1 PASS`; disabled boundary `action/disabled-bg → action/secondary-border 4.34 / 5.71 DISABLED`.
- `b9WHl` (Tour) — "`Tour col | text + icon | surface/overlay | text/*`"; `focus-indicator 1/1 PASS` both themes; functional-boundary `1/1 PASS`; "`No FAIL or DISABLED rows — every resolved role pair meets its contract in both themes.`"

**Read-only confirmation:** Pencil MCP `get_app_state` confirmed `ex_2.pen` as the active canvas editor; only `Get`/`Print` reads were issued (no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`). Pen SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes, unchanged (mtime `2026-10-02 08:35`).

### Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Dialog | trigger / close focus indicator | `focus/ring` (`ByFFJ`) | **PASS** — both `outlineColor._focusVisible` now `semantic.focus.ring`; `solid`, `{borderWidths.thick}` (2px), offset `0` retained |
| Alert Dialog | trigger / close / cancel / confirm focus indicator | `focus/ring` (`P1EWw6`) | **PASS** — all four now `semantic.focus.ring` |
| Drawer | trigger / close focus indicator | `focus/ring` (`egbSj`) | **PASS** — both now `semantic.focus.ring` |
| Sheet | trigger / close focus indicator | `focus/ring` (`VfAQJ`) | **PASS** — both now `semantic.focus.ring` |
| Tour | trigger / back / next / close focus indicator | `focus/ring` (`b9WHl`) | **PASS** — all four now `semantic.focus.ring` |
| Dialog / Alert Dialog / Drawer / Sheet / Tour | modal surface + boundary | `surface/overlay` + `border/subtle` (`ByFFJ`, `P1EWw6`, `egbSj`, `VfAQJ`, `b9WHl`) | **PASS** — `surface`/`panel` `backgroundColor` → `semantic.surface.overlay`, `borderColor` → `semantic.border.subtle`; discriminating both themes |
| Drawer / Tour | footer separator | `border/subtle` (`egbSj`, `b9WHl`) | **PASS** — `footer.borderTopColor` → `semantic.border.subtle`; discriminating both themes |
| Sheet | grabber boundary | `border/strong` (`VfAQJ`) | **PASS** — `handle.backgroundColor` → `semantic.border.strong`; dark discriminates, light value-equivalent |
| Tour | inactive dot boundary / current dot | `border/strong` / `action/primary-bg` (`b9WHl`) | **PASS** — `dot.backgroundColor` → `semantic.border.strong`, `current.true.dot.backgroundColor` → `semantic.action.primary.background`; dark roles discriminate |
| Tour | back (secondary) action roles | `action/secondary-*` (`b9WHl`) | **PASS** — `back.borderColor` → `semantic.action.secondary.border`, `_hover.backgroundColor` → `semantic.action.secondary.hover`, `color` → `semantic.action.secondary.foreground` |
| Tour | next (primary) action roles | `action/primary-*` (`b9WHl`) | **PASS** — `next.backgroundColor` → `semantic.action.primary.background`, `color` → `semantic.action.primary.foreground` |
| Alert Dialog | secondary cancel action roles | `action/secondary-*` (`P1EWw6`) | **PASS** — `cancel.borderColor` → `semantic.action.secondary.border`, `_hover.backgroundColor` → `semantic.action.secondary.hover`, `color` → `semantic.action.secondary.foreground` |
| Alert Dialog | destructive confirm roles | `action/danger-*` (`P1EWw6`) | **PASS** — destructive `confirm.backgroundColor` → `semantic.action.danger.background`, `color` → `semantic.action.danger.foreground`; dark discriminates (red.400 → red.600, red.950 → white) |
| Dialog / Alert Dialog / Drawer / Sheet / Tour | named content text roles | `text/*` content role (`ByFFJ`, `P1EWw6`, `egbSj`, `VfAQJ`, `b9WHl`) | **PASS** — title/body/description/step/close roles resolve `semantic.text.primary` · `text.secondary` · `text.tertiary` (value-equivalent; not browser-discriminating) |
| All five | ARIA / roles / Escape / scrim / autofocus / sizes / placement / side / handle render / destructive behaviour / dots/current / back-disabled-first / finish label | docs above | regression only — unchanged and re-asserted |
| All five | disabled rows (`st-disabled`, `st-destructive disabled`) | token contract failure lists | **DISABLED / REVIEW** — real ratios shown below, never counted PASS; `action/disabled-bg` is a Foundation role decision (`BLOCKED` below) |
| Dialog / Alert Dialog / Drawer / Sheet / Tour | scrim role | Pen `overlay/scrim` | **BLOCKED / INFO** — Foundation has no scrim token; literal kept as approved |
| Alert Dialog | non-destructive base `confirm` fill/fg | `common.50.text` / `common.950.text` | **INFO** — the approved contract names only the destructive confirm; the base confirm is left as-is |
| Tour | back `_disabled` roles | state contract `N8BO5g` | **DISABLED / REVIEW** — `common.400.background` / `common.200.divider`, left as-is (no role swap) |

### Approved public surface and behaviour

- `dialog` recipe: `trigger`/`close` focus rings → `semantic.focus.ring`; `surface` `backgroundColor` → `semantic.surface.overlay`, `borderColor` → `semantic.border.subtle`; `title` → `semantic.text.primary`, `description` → `semantic.text.secondary`, `close` color → `semantic.text.tertiary`. `md` radius, `440px` width, scrim literal, `shadow.500` and all ARIA unchanged.
- `alertDialog` recipe: `trigger`/`close`/`cancel`/`confirm` focus rings → `semantic.focus.ring`; `surface` → `semantic.surface.overlay` + `semantic.border.subtle`; `cancel` → `semantic.action.secondary.{border,hover,foreground}`; destructive `confirm` → `semantic.action.danger.{background,foreground}`; `title`/`description`/`close` text roles. The non-destructive `confirm` fill/fg, the `icon` (`negative.700.background`), `420px` width, `md` radius, scrim and the destructive scrim/Escape policy are unchanged.
- `drawer` recipe: `trigger`/`close` focus rings → `semantic.focus.ring`; `panel` → `semantic.surface.overlay` + `semantic.border.subtle`; `footer.borderTopColor` → `semantic.border.subtle`; text roles resolved. `360px` width, inner-edge radii, `shadow.500` and `side` variants unchanged.
- `sheet` recipe: `trigger`/`close` focus rings → `semantic.focus.ring`; `panel` → `semantic.surface.overlay` + `semantic.border.subtle`; `handle.backgroundColor` → `semantic.border.strong`; text roles resolved. `18px` header, `85vh`, corner radii, `side` variants and the conditional handle render unchanged.
- `tour` recipe: `trigger`/`back`/`next`/`close` focus rings → `semantic.focus.ring`; `surface` → `semantic.surface.overlay` + `semantic.border.subtle`; `footer.borderTopColor` → `semantic.border.subtle`; `dot` → `semantic.border.strong`; `current.true.dot` → `semantic.action.primary.background`; `back` → `semantic.action.secondary.{border,hover,foreground}`; `next` → `semantic.action.primary.{background,foreground}`; `step`/`title`/`body` text roles. The `_disabled` back roles, `340px` width, placement variants and the no-target-highlight/no-focus-trap contract are unchanged.
- Preset doc comments updated to name the resolved role tokens. No component markup changed; all `*.tsx`, `index.ts` barrels and `panda.config.ts` are untouched. No export changed, so `check:deps` was not required. Generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited).

Changed paths: `src/shared/components/dialog/{preset.ts,Dialog.composition.test.tsx,Dialog.stories.tsx}`, `src/shared/components/alert-dialog/{preset.ts,AlertDialog.composition.test.tsx,AlertDialog.stories.tsx}`, `src/shared/components/drawer/{preset.ts,Drawer.composition.test.tsx,Drawer.stories.tsx}`, `src/shared/components/sheet/{preset.ts,Sheet.composition.test.tsx,Sheet.stories.tsx}`, `src/shared/components/tour/{preset.ts,Tour.composition.test.tsx,Tour.stories.tsx}`, this evidence, `artifacts/batch-c/modal-surfaces/` (new captures).

### Tests-first proof (RED → GREEN)

Focused composition (Bun), written before the implementation:

| Field | Value |
| --- | --- |
| RED command | `bun test src/shared/components/dialog/Dialog.composition.test.tsx src/shared/components/alert-dialog/AlertDialog.composition.test.tsx src/shared/components/drawer/Drawer.composition.test.tsx src/shared/components/sheet/Sheet.composition.test.tsx src/shared/components/tour/Tour.composition.test.tsx` |
| RED exit | `1` |
| RED result | `21 fail` / `44 pass` (65 total, 5 files, `160 expect() calls`) |
| RED failures | dialog `paints the shared focus ring role on the trigger and close`, `resolves the modal surface roles`, `resolves the named text roles`; alert dialog `paints the shared focus ring role on the trigger, close, cancel and confirm`, `resolves the modal surface roles`, `resolves the secondary cancel action roles`, `resolves the destructive confirm action roles`, `resolves the named text roles`; drawer `paints the shared focus ring role on the trigger and close`, `resolves the panel surface roles`, `resolves the footer boundary role`, `resolves the named text roles`; sheet `paints the shared focus ring role on the trigger and close`, `resolves the panel surface roles`, `resolves the handle boundary role`, `resolves the named text roles`; tour `paints the shared focus ring role on the trigger, back, next and close`, `resolves the bubble surface and footer boundary roles`, `resolves the dot and current dot roles`, `resolves the action roles`, `resolves the named text roles` |
| RED cause | `outlineColor._focusVisible` was `semantic.brand.500.background`; surfaces were `common.50.background` + `common.200.divider`; the Sheet handle and Tour dots were `common.50.border.strong`; the Tour current dot / next were `brand.700.background`; the Alert Dialog destructive confirm was `negative.600.*`; text roles were the common step ramp |
| GREEN exit | `0` |
| GREEN result | `65 pass` / `0 fail` (`182 expect() calls`) |

Focused browser stories (Vitest + Playwright Chromium), written and run before the implementation (stale generated CSS provided the RED):

| Field | Value |
| --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/dialog/Dialog.stories.tsx src/shared/components/alert-dialog/AlertDialog.stories.tsx src/shared/components/drawer/Drawer.stories.tsx src/shared/components/sheet/Sheet.stories.tsx src/shared/components/tour/Tour.stories.tsx` |
| RED exit | `1` |
| RED result | `5 failed` files, `21 failed` / `28 passed` (49) |
| RED failures | 5× `Focus Visible Light`; 5× `Surface Light`; 5× `Surface Dark`; alert dialog `Destructive Dark`, `Cancel Roles Light`, `Cancel Roles Dark`; sheet `Handle Dark`; tour `Dots Dark`, `Actions Dark` |
| GREEN exit | `0` |
| GREEN result | `5 passed` files, `49 passed` (49) |

All 21 new browser checks are true RED: the light focus-role mismatch, the surface/border changes, the dark destructive confirm, the cancel border/color, the dark Sheet handle, the dark Tour dots/current dot and the dark Tour actions all change the computed value. The dark focus-role stories are **not claimed** — in dark, `brand.500.background` and `focus.ring` both resolve `green.500`; the light focus stories and the recipe-level composition tests are the true guards. The text-role changes are **value-equivalent** (same RGB) and are not browser-discriminating.

### Both-theme evidence (computed style, in browser)

| Contract | Light | Dark |
| --- | --- | --- |
| Dialog / Alert Dialog / Drawer / Sheet / Tour surface (`SurfaceLight` / `SurfaceDark`) | bg `rgb(255, 255, 255)` (`surface.overlay` = white), border `rgb(226, 232, 240)` (`border.subtle` = `neutral.200`) — **discriminating** (old `common.50.background` `rgb(248, 250, 252)`, `common.200.divider` `rgb(203, 213, 225)`) | bg `rgb(30, 41, 59)` (`neutral.800`), border `rgb(30, 41, 59)` — **discriminating** (old `neutral.950` `rgb(2, 6, 23)`, `neutral.700` `rgb(51, 65, 85)`) |
| Drawer / Tour footer separator (`SurfaceLight`/`SurfaceDark` capture) | `border-top-color: rgb(226, 232, 240)` | `rgb(30, 41, 59)` — discriminating |
| Focus rings light (`FocusVisibleLight` ×5) | `outline: solid 2px rgb(22, 163, 74)` (`green.600`) — discriminating | not claimed (dark `brand.500.background` = `focus.ring` = `green.500`) |
| Alert Dialog destructive confirm (`DestructiveDark`) | not claimed (old `red.600` `rgb(220, 38, 38)` fill is equal) | bg `rgb(220, 38, 38)` (`action.danger.background`), color `rgb(255, 255, 255)` — **discriminating** (old `red.400` `rgb(248, 113, 113)`, `red.950` `rgb(69, 10, 10)`) |
| Alert Dialog cancel (`CancelRolesLight` / `CancelRolesDark`) | border `rgb(100, 116, 139)` (`neutral.500`), color `rgb(30, 41, 59)` (`neutral.800`) — discriminating (old `neutral.700` / `neutral.900`) | border `rgb(148, 163, 184)` (`neutral.400`), color `rgb(241, 245, 249)` (`neutral.100`) — discriminating |
| Sheet handle (`HandleDark`) | not claimed (light `neutral.500` both) | `rgb(148, 163, 184)` (`border.strong` = `neutral.400`) — **discriminating** (old `common.50.border.strong` = `neutral.500` `rgb(100, 116, 139)`) |
| Tour dots (`DotsDark`) | not claimed (light `neutral.500` both) | inactive `rgb(148, 163, 184)` (`border.strong`), current `rgb(21, 128, 61)` (`action.primary.background`) — **discriminating** (old `neutral.500` `rgb(100, 116, 139)` and `green.300` `rgb(134, 239, 172)`) |
| Tour actions (`ActionsDark`) | not claimed (light next `green.700` both; back border `neutral.500` both) | next bg `rgb(21, 128, 61)`, color `rgb(255, 255, 255)`; back border `rgb(148, 163, 184)`, color `rgb(241, 245, 249)` — **discriminating** (old `green.300` next, `common.50.background` text `neutral.950` `rgb(2, 6, 23)`, `neutral.500` border, `neutral.50` text) |
| Named text roles (title/body/description/step/close) | `text.primary` `neutral.900` `rgb(15, 23, 42)`, `text.secondary` `neutral.700` `rgb(51, 65, 85)`, `text.tertiary` `neutral.600` `rgb(71, 85, 105)` — **value-equivalent**, not browser-discriminating | `neutral.50` / `neutral.300` / `neutral.400` — **value-equivalent** |
| Generated `styles.css` | `.dialog__surface`, `.alertDialog__surface`, `.drawer__panel`, `.sheet__panel`, `.tour__surface` read `var(--colors-semantic-surface-overlay)` + `var(--colors-semantic-border-subtle)`; all triggers/closes/actions read `var(--colors-semantic-focus-ring)`; `.sheet__handle` and `.tour__dot` read `var(--colors-semantic-border-strong)`; `.tour__next` + `.tour__dot--current_true` read `var(--colors-semantic-action-primary-background)`; `.alertDialog__confirm--destructive_true` reads `var(--colors-semantic-action-danger-background)` | theme-independent (same recipe/CSS) |
| ARIA / roles / Escape / scrim / autofocus / sizes / placement / side / handle / dots / back-disabled-first / finish label | regression asserted in the focused composition/story runs above; no runtime/ARIA change | theme-independent structure |

Real ratios (`@shared/utils contrastRatio`; reported, never counted PASS):

- Content on `surface.overlay`: `text.primary` 17.85 light / 13.98 dark; `text.secondary` 10.35 / 9.85; `text.tertiary` 7.58 / 5.71; `action.secondary.foreground` 14.63 / 13.35; `action.danger.foreground` on `action.danger.background` 4.83 both; `action.primary.foreground` on `action.primary.background` 5.02 both.
- Boundaries on `surface.overlay`: `focus.ring` 3.30 light / 6.42 dark; `border.strong` 4.76 / 5.71; `border.subtle` 1.23 / 1.00 (structural decorative boundary, INFO); `action.secondary.border` 4.76 / 5.71.
- **DISABLED / REVIEW:** Tour back `_disabled` text `common.400.background` on `surface.overlay` = 2.56 light / 1.93 dark (below 4.5); Tour back `_disabled` border `common.200.divider` on `surface.overlay` = 1.48 / 1.41. The Pen contract failure lists report the same pattern against `action/disabled-bg` (Dialog 4 rows, Alert Dialog `1.10 / 14.63` + `2.34 / 3.07`, Drawer `1.13 / 1.00`, Sheet `4.34 / 5.71`); `action/disabled-bg` is absent from Foundation (`BLOCKED` below), so no disabled row is counted PASS.

### Captures

Code-side Storybook-iframe captures (`deviceScaleFactor: 2`, dedicated Storybook on port `6006`), in `artifacts/batch-c/modal-surfaces/`: `dialog-focus-light`, `dialog-surface-{light,dark}`, `alert-dialog-focus-light`, `alert-dialog-surface-{light,dark}`, `alert-dialog-destructive-dark`, `alert-dialog-cancel-{light,dark}`, `drawer-focus-light`, `drawer-surface-{light,dark}`, `sheet-focus-light`, `sheet-surface-{light,dark}`, `sheet-handle-dark`, `tour-focus-light`, `tour-surface-{light,dark}`, `tour-dot-inactive-dark`, `tour-dot-current-dark`, `tour-next-dark`, `tour-back-dark` (23 PNGs) plus `computed-styles.json`. The capture script recorded each target's computed style; focus captures show `solid 2px rgb(22, 163, 74)` on the trigger, surface captures show `rgb(255, 255, 255)` / `rgb(30, 41, 59)` with `rgb(226, 232, 240)` / `rgb(30, 41, 59)` borders, and the dark role captures show the destructive confirm `rgb(220, 38, 38)`, the Sheet handle `rgb(148, 163, 184)`, the Tour dots `rgb(148, 163, 184)` / `rgb(21, 128, 61)` and the Tour next/back roles.

### Command results

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | `0` | codegen + cssgen; `Successfully extracted css from 426 file(s)`; overlay/surface + focus-ring + action/border role variables emitted |
| focused composition RED | `1` | `21 fail` / `44 pass` (160 expect calls) |
| focused composition GREEN | `0` | `65 pass` / `0 fail` (182 expect calls) |
| focused browser RED | `1` | `5 failed` files, `21 failed` / `28 passed` (49) |
| focused browser GREEN | `0` | `5 passed` files, `49 passed` (49) |
| `mise run check` (aggregate) | `1` | **blocked at `check:lint`** by the pre-existing untracked 0-byte `.zed/debug.json` (`1:1 Parsing error: Unexpected end of input`); the artifact was left in place, not deleted |
| `check:lint` (`.zed` ignored) | `0` | `eslint . --ignore-pattern ".zed/**"` — no findings in any C7 path |
| `check:types` | `0` | clean |
| `check:format` | `0` | clean after `dprint fmt` on the 3 mis-ordered import lines |
| `icons:check` | `0` | `✓ icons up to date (38 icons)` |
| `fonts:check` | `0` | `✓ web fonts up to date (2 faces)` |
| `test:unit` | `0` | `813 pass` / `0 fail` (90 files, `4119 expect() calls`) |
| `test:browser` | `0` | `73 passed` files, `672 passed` (672) |
| `check:deps` | n/a | not run — no export changed |
| `mise run build` | `0` | `✓ built in 78ms`; `dist/assets/index-DnHxqs-t.css 223.36 kB` |
| `git diff --check` | `0` | clean |

Slice-local counts: `+21` focused unit composition checks (44 → 65 across the five files) and `+21` browser story checks (28 → 49 across the five story files). Aggregate unit `792 → 813`; aggregate browser `651 → 672`.

### Row disposition and final status

| Row | Disposition |
| --- | --- |
| Dialog / Alert Dialog / Drawer / Sheet / Tour trigger + close focus → `semantic.focus.ring` | **PASS** |
| Alert Dialog cancel + confirm focus → `semantic.focus.ring`; Tour back + next focus → `semantic.focus.ring` | **PASS** |
| Modal surface → `semantic.surface.overlay` + `semantic.border.subtle` (all five) | **PASS** (discriminating both themes) |
| Drawer / Tour footer separator → `semantic.border.subtle` | **PASS** (discriminating both themes) |
| Sheet handle + Tour inactive dot → `semantic.border.strong` | **PASS** (dark discriminating) |
| Tour current dot + next, Alert Dialog destructive confirm → `action/*` | **PASS** (dark discriminating) |
| Alert Dialog cancel + Tour back → `action/secondary-*` | **PASS** (discriminating both themes / dark) |
| Named text roles (`text/primary` · `text/secondary` · `text/tertiary`) | **PASS** (recipe-level; value-equivalent) |
| ARIA / roles / Escape / scrim / autofocus / sizes / placement / side / handle / dots / destructive behaviour | **PASS** (regression, unchanged) |
| Disabled rows (`st-disabled`, `st-destructive disabled`) | **DISABLED / REVIEW** (real ratios, never PASS) |
| **C7 final status** | **PASS with `DISABLED / REVIEW` and `BLOCKED` rows** — no unresolved `FAIL` |

### BLOCKED (recorded, not implemented)

| Item | Pen basis | Reason |
| --- | --- | --- |
| Portal / focus-trap / move-in / return | overlay interaction contract | interaction/API decision |
| Dismissal / backdrop-click / Enter-alone policy | overlay interaction contract | interaction-policy decision |
| Drawer `resizable` | `P6x6P` public variants | public-variant/interaction decision |
| Sheet snap heights / destructive item | `kuTcw` public variants | public-variant decision |
| Scroll lock / restore | overlay interaction contract | interaction-policy decision |
| Tour target-anchoring / target-highlight / progression | `p3wP8` behaviour | **FORBIDDEN** by the approved contract |
| Dialog `destructive` / `with close control` / `scrollable body` | `SV28R` public variants | public-variant/API decision |
| Alert Dialog `with close` / `with icon` toggles / `focusCancel` / `disabledDelete` / default-confirm-tone | `ZOluA` public variants | public-API decision |
| Scrim semantic token | `ByFFJ`/`P1EWw6` `overlay/scrim` | Foundation token-role decision; literal kept |
| Sheet side-axis public API | `kuTcw` variants | public-API decision |
| Alert Dialog base (non-destructive) confirm tone | `P1EWw6` | approved contract names only the destructive confirm |
| `action/disabled-bg` disabled backgrounds | token contract failure lists | Foundation token-role decision; stays `DISABLED / REVIEW` |
| New public components / merging Alert Dialog into Dialog / Sheet into Drawer | — | explicitly excluded by the approved contract |

### Unresolved concerns

- **DISABLED / REVIEW — disabled rows.** The Pen failure lists report `action/disabled-bg` ratios that Foundation cannot express; the code-side Tour back disabled text/border ratios are 2.56 / 1.93 and 1.48 / 1.41, reported and never counted PASS.
- **INFO — dark focus stories non-discriminating.** In dark, `brand.500.background` and `focus.ring` both resolve `green.500`; the light focus stories and the recipe-level composition tests are the true guards.
- **INFO — dark overlay boundary invisible.** In dark, `surface.overlay` and `border.subtle` both resolve `neutral.800` (`rgb(30, 41, 59)`); this follows the Pen roles and matches the C4/C6 observations.
- **INFO — value-equivalent text roles.** The `text/primary` / `text/secondary` / `text/tertiary` corrections resolve the same RGB as the replaced common step ramp; true at recipe level, not claimed as browser-discriminating.
- **INFO — base confirm left as-is.** The Alert Dialog non-destructive `confirm` keeps `common.50.text` fill + `common.950.text` fg; the approved contract names only the destructive confirm role pair.
- **INFO — `mise run check` blocked at lint.** The pre-existing untracked 0-byte `.zed/debug.json` fails ESLint parsing; per instruction it was left in place (not deleted) and every other stage was run and recorded green individually.
- **INFO — capture method.** Storybook-iframe Playwright captures (`deviceScaleFactor: 2`, Storybook on port `6006`); focus was driven with a CDP `Tab` key event so `:focus-visible` engaged, and the focused element's computed outline was read from the live page.
- **INFO — Pen read-only.** The Pen was accessed through Pencil MCP `Get`/`Print` only; no mutation call was issued and the file hash is unchanged.

## C6 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `b6cf7c6e3df752e4665905de211e618131a6253a` vs parent `57eab53`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Focus rings → `semantic.focus.ring` on tooltip/popover/hover-card triggers and floating-panel trigger/collapse/close; geometry preserved.
- Surfaces → `surface.overlay` + `border.subtle` + radius `lg`; text roles updated (value-equivalent) with matching doc comments. No component/API/export/barrel/config change.
- True RED: light focus + surface/border/radius; text roles not browser-claimed; dark focus non-discriminating and not claimed. ARIA/Escape/outside/hover/focus/placement regression.
- BLOCKED: Tooltip dark surface (`tooltip/bg`/`fg` absent in Foundation) stays `DISABLED-REVIEW` never PASS; delay/arrow/popover variants/focus-return/portal/hover-intent/FP drag-resize-persistence/`aria-controls`.

**Minor:** (1) evidence says "No `.tsx`" but story/test `.tsx` changed (means no component `.tsx`); (2) dark `SurfaceDark` asserts border == background (`neutral.800`) — faithful but not a visible-boundary proof, recorded INFO; (3) browser RED is process evidence only; (4) popover doc-comment "with header out of scope" is slightly ambiguous vs the rendered title/description header.

## C7 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `888ebd8daa6cfe28f65f010ce10cbc2d15e75561` vs parent `b6cf7c6`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Focus rings → `semantic.focus.ring` on 14 slots across dialog/alertDialog/drawer/sheet/tour; surfaces → `surface.overlay` + `border.subtle`; footer separators `border.subtle`; sheet handle + tour dot `border.strong`; tour current dot `action.primary.background`; action roles (tour next/back, alert destructive/cancel) corrected; text roles value-equivalent; scrim literal kept.
- No component/API/export/barrel/config/foundation change; AlertDialog not merged into Dialog; Sheet not merged into Drawer.
- True RED: 21 composition + 21 browser discriminating; dark focus non-discriminating not claimed; text roles not browser-claimed; existing DOM/role/aria/Escape regression.
- BLOCKED rows all recorded; `DISABLED / REVIEW` with real ratios (2.56/1.93 text, 1.48/1.41 border).

**Minor:** (1) evidence capture port stated as `6006` in places vs `6008` in C6 (documentation only); (2) dark `SurfaceDark` border == background (`neutral.800`) — recorded INFO.

## Batch C final verification (verifier: DeepSeek v4.1 Flash)

**Verified at:** `c1283de` (`docs(shared): record Batch C6 and C7 review dispositions`).
**Commit range:** Batch C slices `e3bb1d3` (C1) → `888ebd8` (C7), plus review-disposition docs commits. Program Batch C plan base: `6e3b000`.
**Pen read-only:** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`, `9294654` bytes — unchanged.
**Worktree:** only pre-existing untracked `outputs/shared/notes/*` remain; no modified tracked files. The transient 0-byte `.zed/debug.json` editor artifact (which broke `check:lint`) was removed before this run.

### Command results (exact)

| # | Command | Exit | Result |
| --- | --- | --- | --- |
| 1 | `mise run check` | `0` | lint + types + format + `✓ icons up to date (38 icons)` + `✓ web fonts up to date (2 faces)`; unit `813 pass / 0 fail` (90 files, `4119 expect()`); browser `672 passed` (73 files) |
| 2 | `mise run check:deps` | `0` | Knip, no findings |
| 3 | `mise run build` | `0` | `✓ built in 78ms`; `dist/assets/index-DnHxqs-t.css 223.36 kB`; `index-CMkGtUR1.js 273.25 kB` |
| 4 | `git diff --check` | `0` | clean |

Slices and reviewed commits:

| Slice | Owner(s) | Commit | Review |
| --- | --- | --- | --- |
| C1 | Link, NavItem, Brand, Breadcrumbs, SidebarItem | `e3bb1d3` | APPROVED |
| C2 | TopNavigation, Tab | `6c4721c` | APPROVED |
| C3 | AccordionItem, TreeItem | `5e480e2` | APPROVED |
| C4 | Menu, ContextMenu | `1d0285a` | APPROVED |
| C5 | Step, Pagination, Carousel | `1a4395b` | APPROVED |
| C6 | Tooltip, Popover, HoverCard, FloatingPanel | `b6cf7c6` | APPROVED |
| C7 | Dialog, AlertDialog, Drawer, Sheet, Tour | `888ebd8` | APPROVED |

All 24 Batch C masters are mapped to an existing owner directory; no duplicate owner or container component was created (Menu Item internal to `menu/`; ContextMenu composes public Menu; CalendarDay/ColorPopup unaffected; no Accordion/Tree/Step/Pagination/Carousel/Tour group component).

### Row disposition summary

- **PASS / PASS (regression):** focus-ring role unification to `semantic.focus.ring` across all touched owners; Pen-exact surface/border/radius/text/action role corrections (C4/C6/C7); Link external sr-only announcement; Breadcrumbs per-crumb icon; Accordion open-chevron emission; Step upcoming number; Tab indicator on active only; TopNavigation actions gap.
- **INFO:** documented token approximations and non-discriminating dark focus/aliased text roles (recorded per slice); Menu overlay dark boundary `neutral.800`==`neutral.800`.
- **REVIEW:** Tab absolute indicator bounds (`45.59/35.59` vs Pen `43/33`) — pre-existing `lineHeights.normal` label box (Foundation).
- **BLOCKED / DISABLED-REVIEW:** verified-unspecified axes recorded per slice (routing/active-matching, nesting/collapse/submenu, roving/arrow policy, open-state/dismissal/portal/focus-trap, panel/tour progression, drag/resize/persistence, icon additions, Foundation token gaps: scrim, `tooltip/bg|fg`, per-owner `action/disabled-bg`). Tooltip dark surface remains `DISABLED / REVIEW`, never PASS. Disabled contrast is `DISABLED / REVIEW` everywhere.
- **No** unresolved `FAIL`, Critical, or Important review finding across Batch C.

**Batch C: COMPLETE.** Next: Batch D (content/data/feedback), then Batch E (full evidence and final regression).
