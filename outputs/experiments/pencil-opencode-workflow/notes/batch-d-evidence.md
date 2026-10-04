# Batch D evidence — D1 atoms (Avatar · Badge · Tag · Status Indicator · Divider)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Pen identity:** `9294654` bytes, SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` (unchanged after inspection).\
**Base commit:** `ac24dee6d6842df01a24f4354d38f511e2e6aa08` (`docs(shared): record Batch C final verification`).\
**Method:** Pencil MCP read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), code reads, focused Bun composition tests and Vitest + Playwright Chromium story tests. Statuses follow the migration spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.\
**Cycle:** D1 cycle 1/2.

> **Hash note (honest):** the handoff quoted the Pen SHA-256 as a 63-character string (`…dde787421daf7fa`, one `7` short of a SHA-256 digest). The file's true digest is the 64-character `…dde7874217daf7fa` above, which is the quoted value with the omitted digit restored, and it matches `batch-c-evidence.md` (`45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa`). The Pen was not modified.

## D1 scope

Recipe/token-role corrections plus regression stories for five passive atoms, under the user-approved contract. Public component `.tsx` files, `index.ts` barrels, `panda.config.ts`, the Foundation/token layer and generated `src/shared/styled-system/**` were **not** hand-edited. No new public components.

## Pen source node IDs (read-only)

| Owner | Master | Documentation frame | Verbatim Pen facts used |
| --- | --- | --- | --- |
| Status Indicator | `a4r4Y` | `x8pveA` | Named parts `root · dot · label`; variants `tone: positive · warning · negative · neutral · inactive`; "The status is text, not colour alone"; "Decorative dots are hidden from assistive technology." |
| Avatar | `q9qgrL` | `YoSlU` | Named parts `root · image · initials · presence dot · fallback icon`; variants `size, image · initials · icon, with presence, stacked group`; "The image carries the person's name as alternative text."; "Initials are exposed as text, not as an image."; "Presence is announced only when it matters." |
| Tag | `UyMqu` | `QIUyy` | Named parts `root · label · leading dot or icon · remove control · selection state`; variants `static · removable · selectable, tone, size`; state contract `default · hover · selected · disabled`; "A remove control is a separate, labelled target." |
| Badge | `as3xr` | `NT57b` | Named parts `root · label · optional icon · optional count`; border role "Outline: border.subtle — a badge is a non-interactive status label, so its outline is decorative."; variants `tone (neutral, brand, positive, negative) x appearance (subtle, solid, outline) x size`; variant names add tone `info`, sizes `sm · md`, `dot · count`. |
| Divider | `vZUUG` | `Uyuv7` | Named parts `root · line`; variants `horizontal · vertical, subtle · strong, with label`; "Purely decorative and hidden from assistive technology."; "A labelled divider uses a real heading or separator role." |

## Enumeration and disposition

| Owner | Axis | Pen values / rule | Disposition |
| --- | --- | --- | --- |
| Status Indicator | neutral dot | functional boundary role `border/strong` | **PASS** — base dot `semantic.border.strong`; light `rgb(100, 116, 139)` |
| Status Indicator | positive dot | feedback positive step 700 | **PASS** — `semantic.positive.700.background`; light `rgb(21, 128, 61)` |
| Status Indicator | negative dot | feedback negative step 700 | **PASS** — `semantic.negative.700.background`; light `rgb(185, 28, 28)` |
| Status Indicator | label | muted foreground role | **PASS (regression)** — `semantic.text.secondary`; value-equal to the prior `common/700/background`, asserted not claimed RED |
| Status Indicator | brand tone | not documented by Pen | **INFO** — kept as `semantic.brand.600.background` extension |
| Status Indicator | warning / inactive tones | documented, not in this slice | **BLOCKED** (ledger below) |
| Avatar | presence outline | raised surface role | **PASS** — base presence `borderColor: semantic.surface.raised`; light `rgb(255, 255, 255)` |
| Avatar | online presence dot | feedback positive step 700 | **PASS** — `semantic.positive.700.background`; light `rgb(21, 128, 61)` |
| Avatar | away / busy / offline presence | retained from prior slice | **INFO (regression)** — `occasional/600`, `negative/600`, `common/600` unchanged, both themes asserted |
| Avatar | icon fallback / stacked group / disabled-hover-focus / initials-as-text | documented | **BLOCKED** (ledger below) |
| Tag | surface | raised surface role | **PASS** — `semantic.surface.raised`; light `rgb(255, 255, 255)` |
| Tag | hover surface | state contract lists hover | **PASS (recipe-level)** — `_hover: semantic.surface.hover`; not browser-claimed (headless `:hover`; Batch C INFO) |
| Tag | boundary | functional boundary `border/strong` | **PASS** — light-value-equal to prior `common/50/border.strong` (`neutral.500`); **discriminates in dark** (`common/50/border.strong` = `neutral.500` both themes vs `border/strong` = `neutral.400` dark) |
| Tag | label | muted foreground role | **PASS (regression)** — `semantic.text.secondary`; value-equal, asserted not claimed RED |
| Tag | close | tertiary foreground role | **PASS (regression)** — `semantic.text.tertiary`; value-equal, asserted not claimed RED |
| Tag | close focus ring | not Pen-proven | **INFO** — left `semantic.brand.500.background`, unchanged |
| Tag | selectable / selected / tone / size / leading dot-icon / disabled | documented, not in this slice | **BLOCKED** (ledger below) |
| Badge | dot tone roles | documented neutral / positive / negative / brand | **PASS (regression)** — recipe already `common/600`, `positive/600`, `negative/600`, `brand/600`; no production change |
| Badge | label | inverse text role | **PASS (regression)** — `common/50/text`, unchanged |
| Badge | appearance / size / count / leading icon / info tone | documented, not in this slice | **BLOCKED** (ledger below) |
| Divider | rule | quiet divider role | **PASS (regression)** — `semantic.common.200.divider`, unchanged; orientation-independent |
| Divider | subtle / strong / with label / decorative-vs-separator ARIA | documented, not in this slice | **BLOCKED** (ledger below) |
| Foundation | named role `feedback/*-fg`, `feedback/*-border` | Pen names feedback foreground/border roles | **BLOCKED** — value-mapped to the existing context matrix (`common/positive/negative`), recorded INFO, not renamed |

## Approved contract and changed paths

- **StatusIndicator:** neutral dot `semantic.border.strong`; positive `semantic.positive.700.background`; negative `semantic.negative.700.background`; label `semantic.text.secondary`; `brand` left as-is (INFO).
- **Avatar:** online presence `semantic.positive.700.background`; presence outline `semantic.surface.raised`; away/busy/offline left as-is (INFO).
- **Tag:** root `semantic.surface.raised`; boundary `semantic.border.strong`; label `semantic.text.secondary`; close `semantic.text.tertiary`; recipe-level `_hover` → `semantic.surface.hover`; close focus ring unchanged.
- **Badge / Divider:** token-correctness verification and both-theme regression stories only; preset doc comments now name the resolved roles.

Changed paths: `src/shared/components/{status-indicator,avatar,tag,badge,divider}/preset.ts`, the five `*.composition.test.tsx` and the five `*.stories.tsx`, this evidence, `artifacts/batch-d/atoms/` (new captures). Component `.tsx` files, `index.ts`, `panda.config.ts` and the token layer were not touched; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited). No export changed, so `check:deps` was not required.

## Tests-first proof (RED → GREEN)

### Composition (Bun)

RED was observed after adding the focused assertions and before the recipe edits:

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bun test src/shared/components/status-indicator/StatusIndicator.composition.test.tsx src/shared/components/avatar/Avatar.composition.test.tsx src/shared/components/tag/Tag.composition.test.tsx src/shared/components/badge/Badge.composition.test.tsx src/shared/components/divider/Divider.composition.test.tsx` | — |
| RED | `1` | `4 fail` / `23 pass` (27 tests, 5 files, 58 expect calls) |
| RED failures | status indicator `paints the dot and label token roles`; avatar `paints the presence dot and its outline from the role tokens`; tag `paints the chip surface, boundary and hover roles`; tag `paints the label and close roles` | |
| GREEN | `0` | `27 pass` / `0 fail` (27 tests, 5 files, 64 expect calls) |

True RED (light value discriminates): the StatusIndicator step-700 and `border/strong` dots, the Avatar presence dot + `surface/raised` outline, and the Tag `surface/raised` + hover surface. The Tag label/close and the StatusIndicator label are value-equal role renames: asserted, but **not claimed as RED** (no light-value discriminator — e.g. Tag label `common/700/background` and `text/secondary` both resolve `neutral.700` light / `neutral.300` dark). The Tag **boundary** is light-value-equal only and **discriminates in dark** (`common/50/border.strong` `neutral.500` both themes vs `border/strong` `neutral.400` dark), so the dark `Surface Tokens` RED is attributable to both the surface and the boundary. Badge and Divider assertions passed on the pre-change recipe (pure regression).

### Browser stories (Vitest + Playwright Chromium)

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/status-indicator/StatusIndicator.stories.tsx src/shared/components/avatar/Avatar.stories.tsx src/shared/components/tag/Tag.stories.tsx src/shared/components/badge/Badge.stories.tsx src/shared/components/divider/Divider.stories.tsx` | — |
| RED | `1` | `3 failed` / `2 passed` files, `6 failed` / `23 passed` (29) |
| RED failures | avatar `Presence Tokens Light`, `Presence Tokens Dark`; status-indicator `Tone Tokens Light`, `Tone Tokens Dark`; tag `Surface Tokens Light`, `Surface Tokens Dark` | |
| GREEN | `0` | `5 passed` files, `29 passed` (29) |

The dark story rows are non-discriminating for the label/boundary regressions (both roles resolve the same dark value) but discriminate for the step-700 dots and the raised outline; they are captured for completeness. Badge `Tone Tokens Light/Dark` (7) and Divider `Rule Tokens Light/Dark` (4) passed on both runs — regression evidence.

Focused coverage across the five files moved `19 → 27` unit tests (`+8`) and `19 → 29` browser tests (`+10`).

## Both-theme evidence (computed style, in browser)

Code-side Storybook-iframe captures (`deviceScaleFactor: 2`), in `artifacts/batch-d/atoms/`: `status-dot-tokens-{light,dark}`, `avatar-presence-tokens-{light,dark}`, `tag-surface-tokens-{light,dark}`, `badge-tone-tokens-{light,dark}`, `divider-rule-tokens-{light,dark}` (10 PNGs) plus `computed-styles.json`.

| Surface / role | Light (computed) | Dark (computed) |
| --- | --- | --- |
| StatusIndicator neutral dot `border/strong` | `rgb(100, 116, 139)` | `rgb(148, 163, 184)` |
| StatusIndicator positive dot `positive/700/background` | `rgb(21, 128, 61)` | `rgb(134, 239, 172)` |
| StatusIndicator negative dot `negative/700/background` | `rgb(185, 28, 28)` | `rgb(252, 165, 165)` |
| StatusIndicator label `text/secondary` | `rgb(51, 65, 85)` | `rgb(203, 213, 225)` |
| Avatar online presence `positive/700/background` | `rgb(21, 128, 61)` | `rgb(134, 239, 172)` |
| Avatar presence outline `surface/raised` (2px) | `rgb(255, 255, 255)` | `rgb(15, 23, 42)` |
| Avatar away / offline `occasional/600` / `common/600` | `rgb(71, 85, 105)` | `rgb(148, 163, 184)` |
| Avatar busy `negative/600/background` | `rgb(220, 38, 38)` | `rgb(248, 113, 113)` |
| Tag root `surface/raised` (1px `border/strong`) | `rgb(255, 255, 255)` / `rgb(100, 116, 139)` | `rgb(15, 23, 42)` / `rgb(148, 163, 184)` |
| Tag label `text/secondary` | `rgb(51, 65, 85)` | `rgb(203, 213, 225)` |
| Tag close `text/tertiary` | `rgb(71, 85, 105)` | `rgb(148, 163, 184)` |
| Badge neutral / positive / negative / brand dot | `rgb(71, 85, 105)` / `rgb(22, 163, 74)` / `rgb(220, 38, 38)` / `rgb(22, 163, 74)` | `rgb(148, 163, 184)` / `rgb(74, 222, 128)` / `rgb(248, 113, 113)` / `rgb(74, 222, 128)` |
| Badge label `common/50/text` | `rgb(15, 23, 42)` | `rgb(248, 250, 252)` |
| Divider `common/200/divider` (horizontal + vertical) | `rgb(203, 213, 225)` | `rgb(51, 65, 85)` |

### Contrast (real WCAG ratios)

Content against the story shell `surface/base` (`#F8FAFC` light / `#020617` dark) unless noted; thresholds text `≥ 4.5`, icon/boundary `≥ 3`.

| Pair | Light | Dark | Verdict |
| --- | --- | --- | --- |
| StatusIndicator label `text/secondary` | 9.90 | 13.59 | PASS (text) |
| StatusIndicator positive dot `positive/700` | 4.79 | 14.37 | PASS (icon) |
| StatusIndicator negative dot `negative/700` | 6.18 | 10.63 | PASS (icon) |
| StatusIndicator neutral dot `border/strong` | 4.55 | 7.87 | PASS (icon) |
| Tag label `text/secondary` / `surface/raised` | 10.35 | 12.02 | PASS (text) |
| Tag label `text/secondary` / `surface/hover` | 9.45 | 9.85 | PASS (text) |
| Tag close `text/tertiary` / `surface/raised` | 7.58 | 6.96 | PASS (text) |
| Tag boundary `border/strong` / `surface/raised` | 4.76 | 6.96 | PASS (functional boundary) |
| Avatar online dot `positive/700` | 4.79 | 14.37 | PASS (icon) |
| Avatar busy dot `negative/600` | 4.62 | 7.29 | PASS (icon) |
| Avatar away/offline dot `occasional/600` | 7.24 | 7.87 | PASS (icon) |
| Avatar presence outline `surface/raised` on `brand/100` | 1.10 | 1.96 | **INFO** — decorative boundary |
| Badge neutral dot `common/600` | 7.24 | 7.87 | PASS (icon) |
| Badge positive dot `positive/600` | 3.15 | 11.58 | PASS (icon) |
| Badge negative dot `negative/600` | 4.62 | 7.29 | PASS (icon) |
| Badge label `common/50/text` | 17.06 | 19.28 | PASS (text) |
| Divider `common/200/divider` / `surface/base` | 1.42 | 1.95 | **INFO** — divider, no WCAG verdict |

### DISABLED / REVIEW (Pen audit ratios, never counted PASS)

The Pen component-role audits for these five atoms contain disabled specimens; their real ratios are quoted for parity, and no disabled visual is claimed as PASS in this slice.

| Owner | Pen failure-list row | Light | Dark |
| --- | --- | --- | --- |
| Avatar | `st-disabled disabled-boundary action/disabled-bg → surface/raised` | 1.10 DISABLED | 1.22 DISABLED |
| Avatar | `st-disabled disabled-boundary surface/base → common/200/divider` | 1.42 DISABLED | 1.95 DISABLED |
| Avatar | `st-disabled disabled-icon / disabled-text surface/base → text/tertiary` | 7.24 DISABLED | 7.87 DISABLED |
| Avatar | `st-disabled disabled-text surface/raised → text/tertiary` | 7.58 DISABLED | 6.96 DISABLED |
| Avatar | `st-disabled disabled-text action/disabled-bg → brand/100/text` | 9.45 DISABLED | 13.44 DISABLED |
| Tag | `tag-disabled disabled-text action/disabled-bg → action/disabled-fg` | 2.34 DISABLED | 3.07 DISABLED |
| Tag | `Tag states disabled-boundary surface/raised → border/strong` | 4.76 DISABLED | 6.96 DISABLED |
| Tag | `tag-disabled disabled-icon action/disabled-bg → text/tertiary` | 6.92 DISABLED | 5.71 DISABLED |
| Tag | `st-disabled disabled-text surface/raised → text/tertiary` | 7.58 DISABLED | 6.96 DISABLED |
| Tag | `st-disabled disabled-text action/disabled-bg → text/secondary` | 9.45 DISABLED | 9.85 DISABLED |

StatusIndicator, Badge and Divider report `No FAIL or DISABLED rows` in their Pen audits.

## BLOCKED ledger (recorded, not implemented)

| Item | Pen authority | Reason |
| --- | --- | --- |
| Badge `appearance` (subtle / solid / outline) | `as3xr` / `NT57b` variants | New visual axis; outside the approved D1 contract |
| Badge `size` (`sm` / `md`) | `NT57b` variant names | New geometry axis |
| Badge `count` / leading `icon` | `NT57b` named parts + variant names | New content parts |
| Badge tone `info` | `NT57b` variant names | New tone; no feedback `info` role decided |
| Tag `selectable` / `selected` | `UyMqu` / `QIUyy` | New interaction/ARIA state |
| Tag `tone` / `size` | `QIUyy` variant names | New axes |
| Tag leading dot-icon | `QIUyy` named parts | New content part |
| Tag `disabled` | `QIUyy` state contract | Disabled semantics + Foundation disabled roles undecided |
| StatusIndicator `warning` / `inactive` tones | `x8pveA` variant names | New tones; no feedback role decided |
| Avatar `icon` fallback | `YoSlU` named parts / variants | New fallback content |
| Avatar stacked group | `YoSlU` variant names | New composition behaviour |
| Avatar disabled / hover / focus semantics | `YoSlU` state contract | Interaction semantics not in scope |
| Avatar initials-as-text ARIA | `YoSlU` accessibility ("Initials are exposed as text, not as an image.") | ARIA contract change; current decorative fallback unchanged |
| Divider `subtle` / `strong` | `vZUUG` / `Uyuv7` variants | New axes; role pairs undecided |
| Divider `with label` | `Uyuv7` variants | New composition + heading/separator semantics |
| Divider decorative-vs-separator ARIA | `Uyuv7` accessibility ("Purely decorative and hidden from assistive technology.") | Current `role="separator"` retained; ARIA contract change out of scope |
| Foundation named role `feedback/*-fg` / `feedback/*-border` | Pen audit legend | Value-mapped to the existing context matrix (`common` / `positive` / `negative`); INFO, not renamed |
| New public components | — | Explicitly excluded |

## Verification

| Command | Exit | Result |
| --- | --- | --- |
| focused composition RED | `1` | `4 fail` / `23 pass` (27) |
| focused composition GREEN | `0` | `27 pass` / `0 fail` (64 expect calls) |
| focused browser RED | `1` | `3 failed` / `2 passed` files, `6 failed` / `23 passed` (29) |
| focused browser GREEN | `0` | `5 passed` files, `29 passed` (29) |
| `mise run check` | `0` | lint + types + format; `✓ icons up to date (38 icons)`; `✓ web fonts up to date (2 faces)`; unit `821 pass / 0 fail` (90 files, `4139 expect()` calls); browser `682 passed` (73 files) |
| `mise run build` | `0` | Vite production build, `141 modules transformed`, `✓ built` |
| `git diff --check` | `0` | no whitespace errors |
| `check:deps` | n/a | no exports or dependencies changed |

## Concerns / INFO

- **INFO — Tag hover.** Pen's Tag state contract lists `hover`, while its content rule says static tags carry no interaction/hover. The approved contract adds a recipe-level `_hover: semantic.surface.hover` for the (removable) chip; headless Chromium did not apply `:hover` (Batch C behavior), so hover is machine-guarded at the recipe selector only and not browser-claimed.
- **INFO — Avatar presence outline.** The `surface/raised` outline against `brand/100` resolves 1.10 light / 1.96 dark; Pen classifies it as a decorative boundary (INFO), not a functional one.
- **INFO — StatusIndicator brand tone.** Kept from the prior slice; Pen documents `positive · warning · negative · neutral · inactive`, so `brand` is an explicit extension.
- **INFO — Badge / Divider "no change".** Their recipes already matched the documented pairs; this slice adds both-theme regression coverage and role-naming doc comments only.
- **INFO — Tag boundary.** `border/strong` is light-value-equal to the prior `common/50/border.strong` (`neutral.500`); it **discriminates in dark** (`common/50/border.strong` = `neutral.500` both themes vs `border/strong` = `neutral.400` dark). Recorded as a role correction; the dark `Surface Tokens` RED covers both surface and boundary.
- The Pen digest in the handoff was one character short; the real, unchanged digest is recorded in the header.

## D1 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `0d40feb9d09841e9d9bf1e0bc662c4748db042b3` vs parent `ac24dee`.
**Verdict:** **APPROVED** (code) — one Important evidence-accuracy defect, corrected here (documentation/comments only).

- StatusIndicator dot roles, Avatar presence dot+outline, Tag root/hover/label/close/boundary verified; Tag close focus ring untouched; Badge/Divider comment-only + regression; no component `.tsx`/`index.ts`/`panda.config.ts`/foundation/generated change; scope clean; Pen unchanged.
- TDD: composition RED independently reproduced (`4 fail / 23 pass` against parent); true RED only for light-discriminating roles; value-equal renames stated as regression; no RED for blocked axes.
- BLOCKED rows recorded; `DISABLED / REVIEW` ratios real (all 17 reproduce).
- Reviewer confirmed Badge needs no production change (its missing appearance/outline axis is BLOCKED) and Divider `common.200.divider` is correct.

**Important (corrected):** the Tag **boundary** was described as value-equal in both themes, but `common/50/border.strong` = `neutral.500` both themes while `border/strong` = `neutral.500` light / `neutral.400` dark — so the boundary discriminates in dark. Evidence and the `Tag.stories.tsx` / `Tag.composition.test.tsx` comments were corrected; no production change.

**Minor (recorded):** (1) one Pen-audit disabled ratio (`9.45/13.44`) does not reproduce against code foundation (`8.32/13.97`); row stays `DISABLED / REVIEW`, never PASS; (2) composition RED is role-name-level while "value RED" is light-value-level — wording clarified; (3) StatusIndicator neutral dot discriminates in light only; (4) per-file `ThemeShell` scaffolding duplicated (consistent with repo pattern).
