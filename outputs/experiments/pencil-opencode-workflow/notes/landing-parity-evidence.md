# Landing visual-parity evidence — fourth/final cycle

**Date:** 2026-10-03
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`
**Active canvas editor:** `ex_2.pen` (confirmed with `get_app_state` before the query)
**Capability:** Pen read through the Pencil MCP only (`Get` visitor +
`GetVariables`, `resolveVariables: true`) and `Export`; the document was never
mutated.

## Artifact identity

| Fact | Value |
| --- | --- |
| Path | `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen` |
| SHA-256 | `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` |
| Size | `9294654` bytes |
| Captured at (UTC) | `2026-10-02T22:21:57Z` |

The SHA-256 is the identity of the document that produced every measurement
below. The capture happened after the last mutation, so the hash covers the
frames that were read.

## Are there dark Pen landing frames?

**No.** In this document the landing screen exists only as three single-theme
frames, and none of them carries a `theme` property:

- desktop `DsHK8` "10 Landing — desktop" (1440 wide)
- tablet `XiPDu` "11 Landing — tablet" (768 wide)
- mobile `T4klu9` "12 Landing — mobile" (390 wide)

The `… — Dark` roots that do exist in the document (`ROVha`, `j8ilqo`,
`Z14gV8`, `B8b44`, …) belong to the theme-comparison / library frames, not to
the landing screen. Dark landing parity can therefore only be checked in code
through `data-theme`; there is no Pen dark frame to compare against.

## Measured geometry (raw Pen facts)

All `x` / `y` values are in the parent's coordinate space, exactly as returned
by `ctx.bounds`.

### Desktop — frame `DsHK8`

- Feature frames: `M2zLU` (Primitive and semantic tokens), `v9iF0`
  (Component-scoped architecture), `V7lQbB` (Responsive and state-aware UI).
- Feature frame: `gap 72`, `padding 64`, children `Copy` + `Visual`.
- `Copy` (`skv9R`): `gap 18`; children Tag, H2 (Inter 40/700, lh 1.15,
  `#0F172A`), P (Inter 16, lh 1.6, `#334155`), `Bullets` (`LjRvF`, gap 10),
  and the secondary action ref `Df1Dk`.
- `Visual` (`k6MjK`): `560 × 380`, `cornerRadius 16`, stroke `#E2E8F0`.
- Hero action group `bambL` "CTA": horizontal, `gap 12`, height `48`;
  `xVDkZ` "Get the tokens" `179 × 48`, `WA9Ty` "Explore components"
  `201 × 48`.

### Tablet — frame `XiPDu`

- Feature frames: `vzXfY` / `tVuSG` / `m6tsN3`.
- Feature frame: `gap 32`, `padding [48, 32]`, four children Tag / H2 / P /
  Visual (no `Bullets`, no secondary action).
- `Visual` (`whc8u`): `height 300`.
- Hero action group `L1Xf4m` "CTA": horizontal, `gap 12`, height `48`;
  `fMEoc` `179 × 48`, `A4jcn` `201 × 48`.

### Mobile — frame `T4klu9`

- Hero action group `P6A8Xm` "CTA" (inside the hero): **`x 20`, `y 299`,
  `350 × 108`, `gap 12`, vertical**.
  - `gPvdL` "Get the tokens": `350 × 48`, `y 0`.
  - `Up935` "Explore components": `350 × 48`, `y 60` (48 + 12 gap).
- Feature frames: `pRsS2`, `oLr23`, `qGeM3`.
  - Feature frame: **`padding [36, 20]`, `gap 16`**, four children Tag / H2 /
    P / Visual (no `Bullets`, no secondary action).
  - `Visual` (`XoL2U`): **`height 260`**, `cornerRadius 16`, stroke `#E2E8F0`.
  - Title (`Pra13`): **Inter `24` / weight `700`, lh `1.15`, fill `#0F172A`**.
  - Description (`JUf2J`): **Inter `14`, lh `1.6`, fill `#334155`**.

## What changed in code this cycle

Acceptance is defined by the geometry/anatomy assertions in
`test/visual/landing-responsive.spec.ts`, which read the fresh evidence from
`test/visual/landing-pen-evidence.ts`; screenshots stay regression-only.

| Change | Pen basis | Code |
| --- | --- | --- |
| mobile hero actions stacked, full width, 48px, gap 12 | `T4klu9` `P6A8Xm` (`gPvdL` / `Up935`) | base column `stretch`, gap `x6` (12px), controls `width 100%` / `height x24` (48px); from `md` the intrinsic horizontal 40px row is kept |
| feature bullet list and secondary action hidden below `xl` | `M2zLU` keeps `LjRvF` / `Df1Dk`; `vzXfY`, `pRsS2` drop both | `bulletList` `display: none` below `xl`, `grid` at `xl`; action wrapper `display: none` below `xl`, `block` at `xl` |

Tag / title / description / visual, their order and the component usage are
unchanged.

## Pen frame exports and code captures

- Pen: `artifacts/landing-parity/pen/landing-desktop-DsHK8.png`,
  `landing-tablet-XiPDu.png`, `landing-mobile-T4klu9.png`.
- Code: `artifacts/landing-parity/code/landing-{desktop,tablet,mobile}-{light,dark}.png`
  (produced by `scripts/capture-landing-parity.ts`; the script writes only in
  `landing-parity/code/` and never touches snapshots or the evidence constants).

## RED / GREEN

**RED (before the production change),**
`bunx playwright test test/visual/landing-responsive.spec.ts`:

```text
4 failed
  landing tablet light matches the Pen frame     (bullets visible, expected hidden)
  landing tablet dark matches the Pen frame
  landing mobile light matches the Pen frame     (hero primary width 129, expected 350)
  landing mobile dark matches the Pen frame
2 passed (desktop light / dark)
```

**GREEN (after the production change):** the explicit geometry and anatomy
assertions pass at every viewport; the remaining diffs were the intentional
tablet/mobile screenshot changes, refreshed as regression baselines.

## Remaining mismatches (truthful)

- Hero control height at `md` and up stays the existing **40px**, while Pen
  `bambL` / `L1Xf4m` show **48px**. The parity plan explicitly freezes the
  current horizontal intrinsic 40px layout from `md`, so this is a declared
  divergence, not an accidental one.
- Mobile feature padding (`36 / 20`), gap `16` and visual height `260` are
  recorded as Pen facts but were **not** adopted: the plan scope for this cycle
  was anatomy visibility, and tag/title/description/visual had to be preserved.
  The code keeps its existing feature padding/gap and lets the visual size to
  content.
- Dark landing has no Pen counterpart (see above), so dark parity is only
  guarded by the code-side `data-theme` test matrix.

---

# Remediation cycle 1 — feature/hero geometry (2026-10-03)

**Plan:** `docs/superpowers/plans/2026-10-03-landing-pen-parity-remediation.md`
**Cycle timestamp (UTC):** `2026-10-03T00:13:39Z`
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`.
Re-hashed this cycle: SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`,
`9294654` bytes — identical to the committed artifact. Capability: Pencil MCP
`get_app_state`, `execute` (`Get` / `GetVariables` / `Export` only); no mutation.

## Pen re-query (fresh, read-only)

Values identical to `test/visual/landing-pen-evidence.ts`; no evidence-module
change was required.

| Fact | Desktop `DsHK8` | Tablet `XiPDu` | Mobile `T4klu9` |
| --- | --- | --- | --- |
| feature node | `M2zLU` / `v9iF0` / `V7lQbB` | `vzXfY` / `tVuSG` / `m6tsN3` | `pRsS2` / `oLr23` / `qGeM3` |
| feature `padding` | `64` | `[48, 32]` | `[36, 20]` |
| feature `gap` | `72` | `32` | `16` |
| visual frame | `k6MjK` `560×380` | `whc8u` `300` | `XoL2U` `260` |
| hero actions | `bambL` horizontal, `48` | `L1Xf4m` horizontal, `48` | `P6A8Xm` vertical `350×48`, gap `12` |

No dark landing frame exists; the only themed nodes belong to the
theme-comparison/library frames. Dark remains a code-only `data-theme` axis.

## Implemented facts (measured Pen → code)

| Measurement | Pen (desktop / tablet / mobile) | Code before | Code after |
| --- | --- | --- | --- |
| feature `paddingBlock` | 64 / 48 / 36 | 32 / 24 / 24 | x32 64 / x24 48 / `36px` |
| feature `gap` | 72 / 32 / 16 | 32 / 24 / 24 | `72px` / x16 32 / x8 16 |
| feature visual height | 380 / 300 / 260 | 273 / 204 / 204 (content) | `380px` / `300px` / `260px` |
| hero action height | 48 / 48 / 48 | 40 / 40 / 48 | x24 48 / x24 48 / x24 48 |

Desktop `72px` and mobile `36px` exceed the `xN` scale, so they keep the literal
Pen values; `x32` = 64, `x24` = 48, `x16` = 32, `x8` = 16. Changes are
Landing-local only (`src/app/Landing.tsx`); no shared recipe or public API
changed.

## RED / GREEN

**RED (before the Landing change)** —
`bunx --no-install playwright test test/visual/landing-responsive.spec.ts`:

```text
6 failed
  desktop light/dark  hero primary height  expected 48, received 40
  tablet  light/dark  hero primary height  expected 48, received 40
  mobile  light/dark  feature padding-top  expected 36, received 24
```

**GREEN (after the Landing change + `mise run gen`):** every geometry and
anatomy assertion passes at both themes; only the seven screenshot expectations
remained, refreshed below.

## Fresh capture artifacts

- Pen re-export `Export(DsHK8/XiPDu/T4klu9, png, scale 1)` re-created the three
  `artifacts/landing-parity/pen/*.png` byte-for-byte identical to the committed
  exports (`cmp` clean).
- Current code light/dark desktop/tablet/mobile captured with
  `bun run scripts/capture-landing-parity.ts` into
  `artifacts/landing-parity/code/landing-{desktop,tablet,mobile}-{light,dark}.png`.

## Snapshot delta attribution

The committed baselines predate the Batch A foundation line-height correction:
`3c8f9a1` refreshed them for Pen `1.15 / 1.4 / 1.6`, then `5fa4533` reverted
them to `3c8f9a1^`. The refreshed baselines therefore capture **both** the
documented Batch A line-height correction and this plan's four corrections. The
fresh pre-change measurement (`landing-feature-tokens` desktop) was
`paddingBlock 32` / `gap 32` / `visual 273` / hero-height `40`, exactly the RED
values above; the corrected values are the Pen targets.

| Snapshot | Committed | Refreshed | Δ H |
| --- | --- | --- | --- |
| `landing-responsive … desktop light` | 1440×3762 | 1440×4044 | +282 |
| `landing-responsive … desktop dark` | 1440×3762 | 1440×4045 | +283 |
| `landing-responsive … tablet light` | 768×3888 | 768×4280 | +392 |
| `landing-responsive … tablet dark` | 768×3888 | 768×4281 | +393 |
| `landing-responsive … mobile light` | 390×5037 | 390×5012 | −25 |
| `landing-responsive … mobile dark` | 390×5037 | 390×5013 | −24 |
| `landing.spec … full page` | 1280×7667 | 1280×8133 | +466 |

Decomposition (fresh measurement): Batch A line-height shortened the current
code from the committed baseline (desktop `3762 → 3662`, tablet `3888 → 3796`,
mobile `5037 → 4903`; full page `7667 → 7459`), after which the four corrections
restore/extend it to the refreshed heights (desktop `3662 → 4044`, tablet
`3796 → 4280`, mobile `4903 → 5012`, full page `7459 → 8133`). Every delta is a
measured consequence of a documented Pen correction; no snapshot was
self-baselined to mask an unexplained change.

## Residual measured deltas — `HUMAN REVIEW`

Post-fix code computed styles vs Pen. These are **not** corrected: the plan
freezes non-feature/hero geometry, the evidence module is only changed when a
fresh query changes a value, and the differences come from Pen's nested section
composition rather than one Landing-local property.

| Section | Desktop | Tablet | Mobile | Pen basis |
| --- | --- | --- | --- | --- |
| container content width | 1184 | 704 | 350 | Pen content 1312 / 704 / 350 (`maxWidth 1312` is border-box) |
| hero `paddingBlock` | 64 | 40 | 32 | Pen 88 / 56 / 40 (`mPIzN` / `DDN3S` / `oRZiN`) |
| hero grid `gap` | 40 | 24 | 24 | Pen 64 / 40 / 20 |
| value strip `paddingBlock` | 32 | 24 | 24 | Pen 36 / 8 / 8 (`gw3Zj` / `e20nR` / `fdc5K`) |
| workflow `paddingBlock` | 50 | 40 | 32 | Pen outer 16 / 48 / 32; Pen nests Section Header + Steps |
| theme preview `paddingBlock` | 50 | 40 | 32 | Pen 56 / 40 / 32; Pen nests Section Header |
| CTA `paddingBlock` | 50 | 40 | 32 | Pen outer 80 / 56 / 36 + nested CTA panel `56…` |
| footer `paddingBlock` | 32 | 24 | 24 | Pen 56 / 40 / 32; Pen nests Top / Gap / Divider / Bottom |

## Clipping caveat — `HUMAN REVIEW`

Pen feature visuals are fixed, clipped frames. The code matches the exact
heights (380 / 300 / 260). Desktop and tablet content fits (max natural height
273 / 220). Mobile `landing-feature-components` natural content is 289px, so the
fixed 260px frame trims ~29px (the pane's bottom padding and the last meta-row
descender); the text stays readable but the bottom padding is not visible. This
is the direct consequence of the mandated Pen mobile visual height.

## Command results (cycle 1)

| Command | Exit | Result |
| --- | --- | --- |
| `mise run gen` | 0 | codegen + cssgen, `425` files |
| focused responsive spec (RED) | 1 | `6 failed` (geometry) |
| focused responsive spec (post-fix) | 1 | screenshot only |
| `mise run test:visual:update` | 0 | `7 passed`, 7 snapshots re-generated |
| `mise run test:visual` | 0 | `7 passed` |
| `mise run check` | 0 | lint + types + format; `icons` 38, `fonts` 2 faces; unit `659 pass / 0 fail`; browser `392 passed` |
| `mise run check:deps` | 0 | Knip, no findings |
| `mise run build` | 0 | `✓ 141 modules transformed`; `dist/assets/index-Bo4-cSJN.css` 210.97 kB |
| `mise run test:visual` (final) | 0 | `7 passed` |

Status: **PASS** for the plan's four facts. Residual non-feature/hero section
deltas remain recorded as `HUMAN REVIEW` with numbers above.
