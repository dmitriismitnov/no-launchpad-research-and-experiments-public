# Pen visual parity — phase 1 evidence

**Date:** 2026-10-03
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`
**Code scope:** Button, ButtonIcon, Card (default/plain/compact), Landing desktop/tablet/mobile.

Pen is the visual authority. Measurements below were read from the live document
with the Pencil MCP (`Get` / `GetVariables`), never mutated. Renders:
`pen/*.png` (Pen frames/masters) and `code/*.png` (code at 1440 / 768 / 390,
light + dark).

## Token findings (foundation)

The code's semantic layer was a numeric context matrix only
(`semantic.<group>.<step>.*`) plus `shadow`; Pen also ships named role tokens.
They were added verbatim and locked by `foundation.test.ts`:

| Pen token                        | Light             | Dark              | Code before                         | Finding |
| -------------------------------- | ----------------- | ----------------- | ----------------------------------- | ------- |
| `semantic/surface/base`          | `neutral/50`      | `neutral/950`     | `semantic.common.50.background`     | PASS (equal) |
| `semantic/surface/raised`        | `base/white`      | `neutral/900`     | `semantic.common.50.background`     | FAIL → added |
| `semantic/surface/sunken`        | `neutral/100`     | `neutral/950`     | `semantic.common.200.background`    | FAIL → added |
| `semantic/surface/hover`         | `neutral/100`     | `neutral/800`     | `semantic.common.100.background`    | FAIL → added |
| `semantic/surface/selected`      | `green/50`        | `green/950`       | `semantic.common.100.background`    | FAIL → added |
| `semantic/text/primary`          | `neutral/900`     | `neutral/50`      | `semantic.common.50.text`           | PASS (equal) |
| `semantic/text/secondary`        | `neutral/700`     | `neutral/300`     | `semantic.common.600.background`    | FAIL → added |
| `semantic/text/tertiary`         | `neutral/600`     | `neutral/400`     | `semantic.common.500.background`    | FAIL → added |
| `semantic/text/link`             | `green/700`       | `green/400`       | `semantic.brand.700.background`     | FAIL → added |
| `semantic/border/subtle`         | `neutral/200`     | `neutral/800`     | `semantic.common.200.divider`       | FAIL → added |
| `semantic/focus/ring`            | `green/600`       | `green/500`       | `semantic.brand.500.background`     | FAIL → added |
| `semantic/action/primary-bg`     | `green/700`       | `green/700`       | `semantic.common.50.text` (neutral) | FAIL → added |
| `semantic/action/secondary-bg`   | `base/white`      | `neutral/800`     | `transparent`                       | FAIL → added |
| `semantic/action/disabled-*`     | `neutral/100/400` | `neutral/800/500` | opacity `0.45`                      | FAIL → added |
| `radius/lg`                      | `16px`            | `16px`            | absent (Card mapped to `md` = 10)   | FAIL → added |

Breakpoints were also absent, so responsive composition was impossible. Declared
`sm/md/lg/xl/2xl` (640/768/1024/1280/1536) in the foundation preset.

## Button (`IcuBw`) and ButtonIcon (`L72UAx`)

| Property            | Pen master                    | Code before                    | Finding |
| ------------------- | ----------------------------- | ------------------------------ | ------- |
| md control height   | 40 (`control/md`)             | 50 (`x25`)                     | FAIL → fixed to `x20` |
| sm control height   | 32 (`Sm`, pad [6,12])         | 32 (`x16`, padInline 10)       | PARTIAL → padding now `x6` |
| radius              | 10 (`radius/md`)              | 6 (`radius/sm`)                | FAIL → fixed to `md` |
| gap                 | 8 (`x4`)                      | 10 (`x5`)                      | FAIL → fixed to `x4` |
| md padding          | [10, 16]                      | inline 24, block 0             | FAIL → fixed to `x5`/`x8` |
| primary fill        | `action/primary-bg` green/700 | `common.50.text` neutral/900   | FAIL → fixed |
| primary feedback    | colour swap (hover/active)    | opacity 0.85/0.7               | FAIL → fixed |
| shadow              | none                          | `0 2px 8px shadow.700`         | FAIL → removed |
| secondary           | raised + `secondary-border`   | transparent, `common.700`      | FAIL → fixed |
| ghost               | fill none, `text/secondary`   | fill `common.50`, divider border | FAIL → fixed |
| focus ring          | `focus/ring` green/600        | `brand.500` green/500          | FAIL → fixed |
| ButtonIcon square   | 40 / 32                       | 50 / 32                        | FAIL → fixed to `x20` |
| ButtonIcon glyph md | 18×18                         | 16×16 (`icon/sm`)              | HUMAN REVIEW — no 18 token; icon architecture out of scope |
| destructive tone    | documented                    | not implemented                | HUMAN REVIEW — public API extension, out of phase 1 |

Code-only `sm` remains supported and now matches Pen's documented 32px control.

## Card (`ziJHM`, `vTMbw`, `XqPjN`)

| Property        | Pen master                    | Code before                    | Finding |
| --------------- | ----------------------------- | ------------------------------ | ------- |
| surface         | `surface/raised`              | `common.50.background`         | FAIL → fixed |
| boundary        | `border/subtle`               | `common.200.divider`           | FAIL → fixed |
| radius          | 16 (`radius/lg`)              | 10 (`md`)                      | FAIL → fixed |
| shadow          | none                          | `0 8px 22px shadow.500`        | FAIL → removed |
| root gap/pad    | 0                             | 8 / 8                          | FAIL → fixed to `x0` |
| media           | 140px flush, `surface/sunken` | 16:9 inset, `common.200`       | FAIL → fixed |
| body            | pad 16, gap 10                | pad 12, gap 12                 | FAIL → fixed |
| title           | 16 (`font-size/md`)           | 20 (`lg`)                      | FAIL → fixed |
| description     | `sm`, lh 1.4, `text/secondary`| `sm`, lh 1.6, `common.600`     | FAIL → fixed |
| footer          | no divider, gap 10            | top divider, gap 8             | FAIL → fixed |
| plain           | no media, body gap 10         | matched                        | PASS |
| compact         | 280px, body gap 6, `sm`/`xs`  | gap 6 / `sm` / `xs`            | PASS (280 source frame asserted in story) |
| footer link     | `text/link` green             | `common.600`                   | INFO — the public API has a note, not a link; rendered as a note per public API |

## Landing (`DsHK8`, `XiPDu`, `T4klu9`)

| Property            | Pen                                    | Code before                       | Finding |
| ------------------- | -------------------------------------- | --------------------------------- | ------- |
| content column      | 1312/1440, 704/768, 350/390            | 1120 max, 24px gutters            | FAIL → fixed (`1312`, 20/32/64 gutters) |
| H1                  | 56 / 40 / 32                           | 56 flat                           | FAIL → responsive |
| H2                  | 40 / 32 / 24                           | 40 flat                           | FAIL → responsive |
| hero sub            | 20 / 16 / 16                           | 20 flat                           | FAIL → responsive |
| section copy        | 16 / 16 / 14                           | 20 flat                           | FAIL → responsive |
| stats / value strip | 1 / 2 / 3 (code has 3 stats)           | auto-fit                          | FAIL → explicit tracks |
| workflow            | 4 / 2x2 / 1                            | auto-fit                          | FAIL → explicit tracks |
| features            | 1 row desktop, stacked tablet/mobile   | auto-fit (2 cols tablet)          | FAIL → explicit tracks |
| footer groups       | multi-col desktop, 1 col mobile        | auto-fit                          | FAIL → explicit tracks |
| header              | full / primary action / brand+menu     | always full (841px at 390 → overflow) | FAIL → responsive visibility |
| section order/anatomy | value strip + alternating feature sections + product preview + theme preview | sections present but different composition | HUMAN REVIEW — content-model redesign beyond phase 1 |
| mobile menu trigger | interactive menu                       | static menu glyph, no menu        | HUMAN REVIEW — new interaction, out of scope |

Playwright `test/visual/landing-responsive.spec.ts` asserts the explicit tracks,
H1 scale and zero horizontal overflow at 1440 / 768 / 390.

## Verification

- `bun test src` — 653 pass / 0 fail (button + card contract rewritten, foundation role tokens locked).
- `mise run test:browser` — 397 pass / 0 fail (computed colour, geometry, plain/compact stories).
- `mise run test:visual` — 4 pass (3 responsive breakpoints + landing snapshot).
- `mise run gen` — exit 0.
- `mise run check` — exit 0 (lint, types, format, icons:check, fonts:check, 653 unit + 397 browser).
- `mise run check:deps` — exit 0.
- `mise run build` — exit 0.

## RED / GREEN evidence

- Button: `Button.test.ts` — 7 failing tests before the recipe change (geometry,
  primary/secondary/ghost roles, focus ring); 16/16 pass after.
- ButtonIcon: `ButtonIcon.test.ts` — 7 failing before (action roles, square
  40/32, focus ring); 16/16 pass after.
- Card: `Card.test.ts` — 5 failing before (raised surface, `radius/lg`, flush
  media, body density, no footer divider); 12/12 pass after.
- Landing: `landing-responsive.spec.ts` — 2 failing at tablet/mobile
  (auto-fit tracks + header overflow) before the explicit composition; 3/3 pass
  after.
- Foundation: role tokens + breakpoints locked by `foundation.test.ts`
  (17/17).
