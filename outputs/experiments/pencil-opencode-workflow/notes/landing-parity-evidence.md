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
