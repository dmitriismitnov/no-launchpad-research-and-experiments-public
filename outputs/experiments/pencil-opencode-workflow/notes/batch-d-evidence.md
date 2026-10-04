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

---

# Batch D evidence — D2 feedback & status (Alert · Toast · EmptyState · Skeleton · Spinner · Progress · ProgressRing)

**Date:** 2026-10-04\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Pen identity:** `9294654` bytes, SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` (verified before and after inspection; unchanged).\
**Base commit:** `a029aab951e6cbe992329da2b9c119ace076accb` (`docs(shared): correct Batch D1 Tag boundary evidence and record review`).\
**Method:** Pencil MCP read-only `Get`/`Print` (`get_app_state` confirmed `ex_2.pen` as the active editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), code reads, focused Bun composition tests and Vitest + Playwright Chromium story tests. Statuses follow the migration spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.\
**Cycle:** D2 cycle 1/2.

> **Hash note (honest):** the handoff again quoted the Pen SHA-256 as a 63-character string (`…dde787421daf7fa`, one digit short). The file's true digest is the 64-character `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` above, matching the D1 header. The Pen was not modified.

## D2 scope

Recipe/token-role substitutions on existing slots for seven feedback & status components, under the user-approved contract, plus both-theme computed-style stories. Public component `.tsx` files, `index.ts` barrels, `panda.config.ts`, the Foundation/token layer and generated `src/shared/styled-system/**` were **not** hand-edited. No new public components; `progress-ring/` stays where it is.

## Pen source node IDs (read-only)

| Owner | Master | Documentation frame | Verbatim Pen facts used |
| --- | --- | --- | --- |
| Alert | `Q2PWF` | `K2iLH` | Named parts `root · status icon · title · description · action · dismiss control`; variants `info · positive · negative · neutral, with title, with action, dismissible`; "A live region announces inserted alerts."; "The icon is decorative; the text carries the meaning."; "Dismiss controls have accessible names." |
| Toast | `F1P1XX` | `UldIG` | Named parts `root · status icon · message · action · close`; variants `info · positive · negative, with action, dismissible`; "Toasts stack in one corner and never cover primary controls."; "A toast with an action stays until it is used or dismissed."; "The toast region is a live region." |
| Progress | `tTGQi` | `qxDaq` | Named parts `root · track · filled range · value label · indeterminate indicator`; variants `linear · ring, determinate · indeterminate, with value label, error`; state contract `empty · in progress · complete · error`; "Expose the progress value to assistive technology."; "Indeterminate progress never shows a fake percentage." |
| Progress Ring | `yz7HH` | `qxDaq` (shared with Progress) | No standalone documentation frame exists; the ring is documented inside the Progress frame (`Public variants: linear · ring`). Master binds track `surface/sunken` and arc `action/primary-bg`. |
| Spinner | `lpijt` | `l4jso` | Named parts `root · indicator · optional label`; variants `size: sm · md · lg, with label, on surface · on colour`; "Expose a busy state on the region it belongs to."; "Respect reduced-motion preferences." |
| Skeleton | `qfUOu` | `oPSvA` | Named parts `root · block shapes · text lines · avatar shape · media shape`; variants `text · block · media · avatar, composed rows`; "Hidden from assistive technology; the region announces loading."; "Reduced-motion users see a static placeholder." |
| Empty State | `Kj5Nm` | `EtNCb` | Named parts `root · illustration or icon · title · description · primary action · secondary action`; variants `default · compact, with action, error variant`; state contract `default · compact · open action · disabled action`; "The title is a heading in the surrounding structure."; "The action is the only focusable element." |

Master role bindings confirmed via read-only `Get`: Alert `feedback/neutral-bg · feedback/neutral-border · feedback/neutral-fg · text/link · text/tertiary · text/secondary`; Toast `surface/overlay · border/subtle · text/primary · text/secondary · text/link · text/tertiary`; Skeleton `surface/sunken`; Spinner `text/secondary`; Progress `surface/sunken` + `action/primary-bg`; Progress Ring `surface/sunken` + `action/primary-bg`; Empty State `surface/raised · border/subtle · text/tertiary · text/primary · text/secondary`.

## Enumeration and disposition

| Owner | Axis / slot | Pen role | Disposition |
| --- | --- | --- | --- |
| Toast | root surface | `surface/overlay` | **PASS** — `semantic.surface.overlay`; **discriminates in both themes** (white `rgb(255,255,255)` vs prior `neutral.50` `rgb(248,250,252)` light; `neutral.800` `rgb(30,41,59)` vs prior `neutral.950` `rgb(2,6,23)` dark) |
| Toast | root boundary | `border/subtle` | **PASS** — `semantic.border.subtle`; **discriminates in both themes** (`neutral.200` vs prior `common/200/divider` `neutral.300` light; `neutral.800` vs `neutral.700` dark) |
| Toast | action | `text/link` | **PASS (dark RED)** — `semantic.text.link`; light `green.700` value-equal to prior `brand/700/background`, **discriminates in dark** (`green.400` vs prior `green.300`) |
| Toast | title / body / dismiss | `text/primary` / `text/secondary` / `text/tertiary` | **PASS (regression)** — value-equal role renames, asserted not claimed RED |
| Toast | leading icon | tone-tinted alias | **INFO** — left on the existing tone alias; value-equal to Pen `feedback/positive-fg` / `negative-fg`, unchanged |
| Empty State | root surface | `surface/raised` | **PASS** — `semantic.surface.raised`; **discriminates in both themes** (white vs `neutral.50` light; `neutral.900` vs `neutral.950` dark) |
| Empty State | root boundary | `border/subtle` | **PASS** — `semantic.border.subtle`; **discriminates in both themes** (`neutral.200` vs `neutral.300` light; `neutral.800` vs `neutral.700` dark) |
| Empty State | icon / title / description | `text/tertiary` / `text/primary` / `text/secondary` | **PASS (regression)** — value-equal; asserted |
| Empty State | radius | `radius/lg` | **PASS (regression)** — `lg` resolves `1rem` / `16px`, value-equal to the prior literal |
| Skeleton | base surface | `surface/sunken` | **PASS (dark RED)** — `semantic.surface.sunken`; light `neutral.100` value-equal, **discriminates in dark** (`neutral.950` `rgb(2,6,23)` vs prior `common/100/background` `neutral.900`) |
| Progress | track | `surface/sunken` | **PASS (dark RED)** — track; light value-equal, dark `neutral.950` |
| Progress | fill | `action/primary-bg` | **PASS (dark RED)** — fill; light `green.700` value-equal, dark `green.700` vs prior `brand/700/background` `green.300` |
| Progress | radius | `radius/pill` | **PASS (regression)** — `full` resolves `9999px`, value-equal |
| Progress Ring | track stroke | `surface/sunken` | **PASS (dark RED)** — `semantic.surface.sunken` |
| Progress Ring | arc stroke | `action/primary-bg` | **PASS (dark RED)** — `semantic.action.primary.background` |
| Spinner | glyph | `text/secondary` | **PASS (regression)** — `semantic.text.secondary`; value-equal to prior `common/700/background` in both themes |
| Alert | neutral surface/boundary/fg; positive/negative surface/fg | `feedback/*` | **PASS (regression)** — named `feedback/*` roles are **BLOCKED** in the foundation; recipe keeps value-mapped matrix aliases (`common/50/background`, `common/200/divider`, `common/50/icon`, `positive|negative/*`), asserted not changed |
| Alert | action / info tone / brand tone | `text/link`, `feedback/info-*`, brand | **BLOCKED** (ledger below) |

## Approved contract and changed paths

- **Toast:** root `semantic.surface.overlay`; boundary `semantic.border.subtle`; action `semantic.text.link`; title `semantic.text.primary`; body `semantic.text.secondary`; dismiss `semantic.text.tertiary`.
- **EmptyState:** root `semantic.surface.raised`; boundary `semantic.border.subtle`; icon `semantic.text.tertiary`; title `semantic.text.primary`; description `semantic.text.secondary`; radius `lg`.
- **Skeleton:** base `semantic.surface.sunken`.
- **Progress:** track `semantic.surface.sunken`; fill `semantic.action.primary.background`; radius `full`.
- **ProgressRing:** track stroke `semantic.surface.sunken`; arc stroke `semantic.action.primary.background`.
- **Alert:** value-equal regression assertions only; no recipe change.
- **Spinner:** glyph `semantic.text.secondary` (value-equal regression). Each preset doc comment now names the resolved Pen role.

Changed paths: `src/shared/components/{alert,toast,empty-state,skeleton,spinner,progress,progress-ring}/{preset.ts,*.composition.test.tsx,*.stories.tsx}` (21 files), this evidence, `artifacts/batch-d/feedback-status/` (new captures). Component `.tsx` files, `index.ts`, `panda.config.ts` and the token layer were not touched; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited). No export changed, so `check:deps` was not required.

## Tests-first proof (RED → GREEN)

### Composition (Bun)

RED was observed by restoring the parent `a029aab` presets, keeping the new assertions, and running:

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bun test src/shared/components/{alert,toast,empty-state,skeleton,spinner,progress,progress-ring}/*.composition.test.tsx` | — |
| RED | `1` | `6 fail` / `40 pass` (46 tests, 7 files, 105 expect calls) |
| RED failures | skeleton `paints the sunken placeholder surface`; toast `paints the overlay surface, subtle boundary and copy roles`; empty state `paints the raised surface, subtle boundary and copy roles`; spinner `paints the loader with the secondary text role`; progress ring `paints the sunken track and primary arc strokes`; progress `paints the sunken track and primary fill` | |
| GREEN | `0` | `46 pass` / `0 fail` (46 tests, 7 files, 114 expect calls) |

The Alert assertion passed on the parent recipe (pure regression). Composition RED is **role-name-level**: every renamed role fails the recipe assertion even when its value is equal; the value-level discriminator is the browser table below. **True RED** (rendered value discriminates): Toast surface + boundary (both themes) and action (dark); EmptyState surface + boundary (both themes); Skeleton, Progress and ProgressRing (dark only). **Regressions** (value-equal, asserted not claimed RED): Toast title/body/dismiss; EmptyState icon/title/description + radius; Spinner; Progress/ProgressRing `full` radius; Alert.

### Browser stories (Vitest + Playwright Chromium)

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts` on the seven `*.stories.tsx` | — |
| RED | `1` | `5 failed` / `2 passed` files, `7 failed` / `39 passed` (46) |
| RED failures | empty-state `Token Surface Light`, `Token Surface Dark`; progress `Token Surface Dark`; progress-ring `Token Surface Dark`; skeleton `Token Surface Dark`; toast `Token Surface Light`, `Token Surface Dark` | |
| GREEN | `0` | `7 passed` files, `46 passed` (46) |

The browser RED is **value-level** and matches the classification exactly: Toast Light/Dark and EmptyState Light/Dark fail (surfaces + boundaries discriminate in both themes), Skeleton/Progress/ProgressRing fail in **dark only**, and Alert `Token Roles Light/Dark` plus Spinner `Token Color Light/Dark` pass on the parent (value-equal regressions). Focused coverage moved `39 → 46` composition tests (all files were extended in place, `+7`) and added 14 browser token tests (`46` total story tests).

## Both-theme evidence (computed style, in browser)

Code-side Storybook-iframe captures (`deviceScaleFactor: 2`), in `artifacts/batch-d/feedback-status/`: `toast-surface-tokens-{light,dark}`, `empty-state-surface-tokens-{light,dark}`, `skeleton-surface-tokens-{light,dark}`, `spinner-color-tokens-{light,dark}`, `progress-surface-tokens-{light,dark}`, `progress-ring-surface-tokens-{light,dark}`, `alert-role-tokens-{light,dark}` (14 PNGs) plus `computed-styles.json`.

| Surface / role | Light (computed) | Dark (computed) |
| --- | --- | --- |
| Toast root `surface/overlay` / `border/subtle` | `rgb(255, 255, 255)` / `rgb(226, 232, 240)` | `rgb(30, 41, 59)` / `rgb(30, 41, 59)` |
| Toast action `text/link` | `rgb(21, 128, 61)` | `rgb(74, 222, 128)` |
| Toast title / body / dismiss | `rgb(15, 23, 42)` / `rgb(51, 65, 85)` / `rgb(71, 85, 105)` | `rgb(248, 250, 252)` / `rgb(203, 213, 225)` / `rgb(148, 163, 184)` |
| EmptyState root `surface/raised` / `border/subtle` (16px) | `rgb(255, 255, 255)` / `rgb(226, 232, 240)` | `rgb(15, 23, 42)` / `rgb(30, 41, 59)` |
| EmptyState icon / title / description | `rgb(71, 85, 105)` / `rgb(15, 23, 42)` / `rgb(51, 65, 85)` | `rgb(148, 163, 184)` / `rgb(248, 250, 252)` / `rgb(203, 213, 225)` |
| Skeleton `surface/sunken` | `rgb(241, 245, 249)` | `rgb(2, 6, 23)` |
| Spinner `text/secondary` | `rgb(51, 65, 85)` | `rgb(203, 213, 225)` |
| Progress track `surface/sunken` / fill `action/primary-bg` | `rgb(241, 245, 249)` / `rgb(21, 128, 61)` | `rgb(2, 6, 23)` / `rgb(21, 128, 61)` |
| ProgressRing track / arc stroke | `rgb(241, 245, 249)` / `rgb(21, 128, 61)` | `rgb(2, 6, 23)` / `rgb(21, 128, 61)` |
| Alert neutral surface / boundary / fg | `rgb(248, 250, 252)` / `rgb(203, 213, 225)` / `rgb(51, 65, 85)` | `rgb(2, 6, 23)` / `rgb(51, 65, 85)` / `rgb(226, 232, 240)` |
| Alert positive surface / fg | `rgb(240, 253, 244)` / `rgb(21, 128, 61)` | `rgb(5, 46, 22)` / `rgb(134, 239, 172)` |
| Alert negative surface / fg | `rgb(254, 242, 242)` / `rgb(185, 28, 28)` | `rgb(69, 10, 10)` / `rgb(252, 165, 165)` |

### Contrast (real WCAG ratios)

Content against its resolved surface; thresholds text `≥ 4.5`, icon/boundary `≥ 3`.

| Pair | Light | Dark | Verdict |
| --- | --- | --- | --- |
| Toast title `text/primary` / `surface/overlay` | 17.85 | 13.98 | PASS (text) |
| Toast body `text/secondary` / `surface/overlay` | 10.35 | 9.85 | PASS (text) |
| Toast dismiss `text/tertiary` / `surface/overlay` | 7.58 | 5.71 | PASS (text) |
| Toast action `text/link` / `surface/overlay` | 5.02 | 8.40 | PASS (text) |
| Toast boundary `border/subtle` / `surface/overlay` | 1.23 | 1.00 | **INFO** — decorative boundary |
| EmptyState title `text/primary` / `surface/raised` | 17.85 | 17.06 | PASS (text) |
| EmptyState description `text/secondary` / `surface/raised` | 10.35 | 12.02 | PASS (text) |
| EmptyState icon `text/tertiary` / `surface/raised` | 7.58 | 6.96 | PASS (icon) |
| EmptyState boundary `border/subtle` / `surface/raised` | 1.23 | 1.22 | **INFO** — decorative boundary |
| Spinner `text/secondary` / `surface/base` | 9.90 | 13.59 | PASS (icon) |
| Skeleton `surface/sunken` / `surface/base` | 1.05 | 1.00 | **INFO** — placeholder surface, no WCAG verdict |
| Progress track `surface/sunken` / `surface/base` | 1.05 | 1.00 | **INFO** — track, no WCAG verdict |
| Progress fill `action/primary-bg` / `surface/base` | 4.79 | 4.02 | PASS (functional boundary ≥ 3) |
| ProgressRing track / arc vs `surface/base` | 1.05 / 4.79 | 1.00 / 4.02 | track **INFO**; arc PASS (≥ 3) |
| Alert neutral fg `common/50/icon` / `common/50/background` | 9.90 | 16.36 | PASS (text) |
| Alert positive fg `positive/700` / `positive/50` | 4.79 | 10.62 | PASS (icon) |
| Alert negative fg `negative/700` / `negative/50` | 5.91 | 8.51 | PASS (icon) |

### DISABLED / REVIEW (Pen audit ratios, never counted PASS)

Pen component-role audits for the seven D2 owners. Only EmptyState reports disabled specimens; the other six report `DISABLED / REVIEW 0`. The EmptyState ratios were independently reproduced against the code foundation and match exactly.

| Owner | Pen failure-list row | Light | Dark |
| --- | --- | --- | --- |
| Empty State | `st-disabled action disabled-icon action/disabled-bg → text/tertiary` | 6.92 DISABLED | 5.71 DISABLED |
| Empty State | `st-disabled action disabled-text action/disabled-bg → text/secondary` | 9.45 DISABLED | 9.85 DISABLED |
| Empty State | `st-disabled action disabled-text action/disabled-bg → text/primary` | 16.30 DISABLED | 13.98 DISABLED |

Alert (`7/7` text, `4/4` icon), Toast (`6/6` text, `2/2` icon), Progress (`3/3` text), Spinner (`3/3` text, `2/2` icon), Skeleton (`3/3` text) and the shared Progress/Ring audit report `No FAIL or DISABLED rows`.

## BLOCKED ledger (recorded, not implemented)

| Item | Pen authority | Reason |
| --- | --- | --- |
| Toast queue / auto-dismiss timers / viewport / stacking / portal / dismiss policy | `F1P1XX` / `UldIG` ("stack in one corner"; "stays until used or dismissed"; "Timeout is long enough") | Behaviour/portal; outside the approved token contract |
| Toast `info` tone / neutral default / live politeness | `UldIG` variants + "live region" | New tone + ARIA policy undecided |
| Alert `info` tone | `K2iLH` / `Q2PWF` variants | No feedback `info` role decided |
| Alert `brand` disposition | `K2iLH` variants | Extension policy undecided |
| Alert action part | `Q2PWF` `Action: text/link` | New part; no `action` change in this slice |
| Alert neutral-dark root role | `Q2PWF` `feedback/neutral-bg` | Named role absent; alias kept, dark step differs |
| Alert body-dismiss tint | `Q2PWF` `text/secondary` / `text/tertiary` | Value-equal; not renamed |
| Alert role policy (live-region / decorative-icon / dismiss naming) | `K2iLH` accessibility contract | ARIA contract change out of scope |
| EmptyState illustration | `Kj5Nm` / `EtNCb` named parts | New content part |
| EmptyState primary-secondary action split | `EtNCb` named parts | New composition |
| EmptyState `default` · `compact` · `error` variants | `EtNCb` variants | New visual axes |
| EmptyState title heading semantics | `EtNCb` ("title is a heading") | ARIA/heading contract change |
| EmptyState disabled-action roles | `EtNCb` state contract + 3 disabled rows | Disabled semantics undecided |
| Skeleton pulse animation | `oPSvA` ("Never animate more than a subtle pulse") | Motion contract (reduced-motion already honoured) |
| Skeleton `text` · `block` · `media` · `avatar` shape API | `oPSvA` named parts + variants | New component API |
| Spinner sizes `sm` · `md` · `lg` | `l4jso` variants | New geometry axis |
| Spinner `on surface` · `on colour` | `l4jso` variants | New colour-context axis |
| Spinner busy-region ARIA | `l4jso` ("Expose a busy state on the region") | ARIA contract change |
| Progress linear-ring split / determinate-indeterminate | `qxDaq` variants | New API split |
| Progress error state | `qxDaq` variants + state contract | New state/roles |
| Progress visible value label | `qxDaq` named parts + ("Show a value label…") | New content part |
| Progress completion announcement | `qxDaq` ("Announce completion once") | ARIA contract change |
| ProgressRing indeterminate / error | `qxDaq` (shared) variants | New API/states |
| Foundation feedback named roles | Pen audit legend (`feedback/*-bg`, `feedback/*-fg`, `feedback/*-border`) | Value-mapped to the context matrix; INFO, not renamed |
| New public components | — | Explicitly excluded |

## Verification

| Command | Exit | Result |
| --- | --- | --- |
| focused composition RED | `1` | `6 fail` / `40 pass` (46) |
| focused composition GREEN | `0` | `46 pass` / `0 fail` (114 expect calls) |
| focused browser RED | `1` | `5 failed` / `2 passed` files, `7 failed` / `39 passed` (46) |
| focused browser GREEN | `0` | `7 passed` files, `46 passed` (46) |
| `mise run check` | `0` | lint + types + format; `✓ icons up to date (38 icons)`; `✓ web fonts up to date (2 faces)`; unit `828 pass / 0 fail`; browser `696 passed` (73 files) |
| `mise run build` | `0` | Vite production build, `141 modules transformed`, `✓ built in 84ms` |
| `git diff --check` | `0` | no whitespace errors |
| `check:deps` | n/a | no exports or dependencies changed |

## Concerns / INFO

- **INFO — Progress Ring has no standalone documentation frame.** Its Pen authority `yz7HH` is documented inside the Progress frame `qxDaq` (`Public variants: linear · ring`). It remains the `progress-ring/` component; no new frame or component was created.
- **INFO — Toast boundary and EmptyState boundary are true RED, not regressions.** Both move from `common/200/divider` (`neutral.300`/`neutral.700`) to `border/subtle` (`neutral.200`/`neutral.800`) and discriminate in both themes; the earlier D1-era reading of `common/200/divider` as `neutral.200` was wrong and is corrected here.
- **INFO — Spinner is value-equal.** `common/700/background` and `text/secondary` both resolve `neutral.700`/`neutral.300`; the browser `Token Color` stories pass on the parent recipe, so it is a role rename, not a value RED.
- **INFO — Skeleton, Progress and ProgressRing are dark-only.** Light values are value-equal to the prior `common/100/background`; only the dark step changes (`neutral.900` → `neutral.950`). Progress fill changes from `brand/700/background` (`green.300` dark) to `action/primary-bg` (`green.700` both), dark-only.
- **INFO — Alert unchanged.** Its named `feedback/*` roles are absent from the foundation; the recipe retains value-mapped matrix aliases and the tests are pure regression assertions.
- The Pen digest in the handoff was one character short; the real, unchanged digest is recorded in the header.

## D2 review disposition (reviewer: DeepSeek v4.1 Flash)

**Reviewed at:** `2b19d4ed9c37e94aa32e552394f9d6b2ac0b938d` vs parent `a029aab`.
**Verdict:** **APPROVED** — no Critical/Important findings.

- Toast/EmptyState/Skeleton/Progress/ProgressRing token roles verified; Alert recipe unchanged (JSDoc only); Spinner single value-equal rename. No `.tsx`/`index.ts`/`panda.config.ts`/foundation/generated change; no new exports; ProgressRing stayed in its own dir.
- Scope exactly the 38 expected paths; D1 evidence preserved (199 insertions / 0 deletions, D2 at line 210). The prior interrupted attempt's 21 modified files were completed coherently by the retry.
- TDD: composition `46 pass`; browser `7 files / 46 passed`; true RED only where values discriminate (Toast surface/boundary + action dark; EmptyState both; Skeleton/Progress/Ring dark-only); Alert/Spinner value-equal regression; no blocked axis asserted.
- BLOCKED ledger populated and unimplemented; EmptyState `DISABLED / REVIEW` ratios reproduce; other six report 0; Pen unchanged.

**Minor (corrected):** evidence said "`46 → 46` composition tests"; the true delta is `39 → 46` (+7 in-place cases). Corrected in the ledger.
**INFO:** Toast dark `surface.overlay` == `border.subtle` == `neutral.800`; Skeleton/Progress track boundary 1.00 on `surface.base` dark — follows approved Pen roles and recorded INFO.

---

# Batch D evidence — D3 Card · Statistic

**Date:** 2026-10-05\
**Pen source (read-only):** `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`\
**Pen identity:** `9294654` bytes, SHA-256 `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` (verified before and after inspection; unchanged).\
**Base commit:** `a76ec20b232a7c2f0e9abd25bbfb26b294272d04` (`docs(shared): correct Batch D2 coverage delta and record review`).\
**Method:** Pencil MCP read-only `Get`/`Print`/`GetVariables` (`get_app_state` confirmed `ex_2.pen` as the active editor; no `Insert`/`Update`/`Replace`/`Delete`/`SetVariables`), code reads, focused Bun composition tests and Vitest + Playwright Chromium story tests. Statuses follow the migration spec: `PASS`, `FAIL`, `INFO`, `HUMAN REVIEW`, `BLOCKED`, `DISABLED / REVIEW`.\
**Cycle:** D3 cycle 1/2.

> **Hash note (honest):** the handoff again quoted the Pen SHA-256 as a 63-character string (`…dde787421daf7fa`, one digit short). The file's true digest is the 64-character `45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa` above, matching the D1/D2 headers. The Pen was not modified.

## D3 scope

Token/focus-role corrections on existing slots for two content & data owners, plus both-theme computed-style stories. Public component `.tsx` files, `index.ts` barrels, `panda.config.ts`, the Foundation/token layer and generated `src/shared/styled-system/**` were **not** hand-edited. No new public components; `Card Plain`/`Card Compact` stay `card/` variants and `Statistic` stays its own owner.

## Pen source node IDs (read-only)

| Owner | Master | Documentation frame | Verbatim Pen facts used |
| --- | --- | --- | --- |
| Card | `ziJHM` | `l3a7qL` | Named parts `root · media · header · title · description · footer · meta · action`; variants "plain · raised · compact, with media, interactive, selected"; state contract `default · hover · selected · disabled · focus-visible`; "An interactive card is a single target with one focus stop"; "An interactive card exposes a link or button role"; "Selected state is exposed, not only coloured"; audit summary `focus-indicator 1/1 PASS` light + dark. |
| Card Plain | `vTMbw` | `l3a7qL` (shared) | Media-less body, `surface/raised` + `border/subtle`; `text/primary` title, `text/tertiary` action glyph, `text/secondary` description, `text/tertiary` meta, `text/link` link. |
| Card Compact | `XqPjN` | `l3a7qL` (shared) | 280px media-less body, 6px gap, `sm` title, `xs` `text/tertiary` description; `xs` `text/tertiary` badge. |
| Statistic | `CjnzL` | `gLCov` | Named parts `root · label · value · delta · delta icon · context`; variants "with delta · with icon · loading · compact"; state contract `default · disabled · loading · positive delta · negative delta`; "The label states what is measured and over what period"; "Direction of change uses an icon as well as colour"; "Trend direction is stated in text, never colour alone"; audit summary `focus-indicator 0/0 PASS`. |

Master/doc role bindings confirmed with `GetVariables` + `Get` (read-only). Pen named roles resolved from the variables: `text/primary` = `neutral.900`/`neutral.50`, `text/secondary` = `neutral.700`/`neutral.300`, `text/tertiary` = `neutral.600`/`neutral.400`, `surface/raised` = `base.white`/`neutral.900`, `surface/sunken` = `neutral.100`/`neutral.950`, `border/subtle` = `neutral.200`/`neutral.800`, `focus/ring` = `green.600`/`green.500`, `feedback/positive-fg` = `green.700`/`green.300`, `feedback/negative-fg` = `red.700`/`red.300`.

- **Card** `ziJHM` root stroke `$semantic/border/subtle`, fill `$semantic/surface/raised`; media `$semantic/surface/sunken` with `$semantic/text/tertiary` glyph; title `$semantic/text/primary`; description `$semantic/text/secondary`; meta `$semantic/text/tertiary`; link `$semantic/text/link`. `vTMbw`/`XqPjN` repeat the same roles; `XqPjN` description is `$semantic/text/tertiary`.
- **Card interactive/focus** `fz3DO` (interactive, ref `vTMbw`) → `q4UQZm`/`X3L3d2` focus-visible ref `ziJHM`, `stroke: $semantic/focus/ring`, `strokeWidth: 2`, `strokeAlignment: outer`.
- **Statistic** `CjnzL`/`FMXaz` anatomy: label `$semantic/text/tertiary`, value `$semantic/text/primary`, DIcon `$semantic/text/secondary`, DText `$semantic/text/primary`. State specimens `Nz6WE`/`YZsWF` paint glyph + copy `feedback/positive-fg` / `feedback/negative-fg`.

## Enumeration and disposition

| Owner | Axis / slot | Pen role | Disposition |
| --- | --- | --- | --- |
| Card | root surface | `surface/raised` | **PASS (regression)** — already `semantic.surface.raised`; light `rgb(255, 255, 255)` / dark `rgb(15, 23, 42)`, asserted |
| Card | root boundary | `border/subtle` | **PASS (regression)** — already `semantic.border.subtle`; light `rgb(226, 232, 240)` / dark `rgb(30, 41, 59)`, INFO decorative |
| Card | media surface + glyph | `surface/sunken` + `text/tertiary` | **PASS (regression)** — already `semantic.surface.sunken` / `semantic.text.tertiary`; light `rgb(241, 245, 249)` / `rgb(71, 85, 105)`, asserted |
| Card | title / description / meta / link | `text/primary` / `text/secondary` / `text/tertiary` / `text/link` | **PASS (regression)** — already the named roles, both themes asserted |
| Card | focus-visible ring | `focus/ring` (2px outer) | **PASS** — root `:focus-visible` outline added; **discriminates in both themes** (no ring → `green.600` `rgb(22, 163, 74)` light / `green.500` `rgb(34, 197, 94)` dark) |
| Card | hover / selected / disabled / interactive | `surface/hover` / `surface/selected` + `action/primary-bg` border / `action/disabled-bg` + `text/disabled` | **BLOCKED** (ledger below) — new public variant/state |
| Statistic | label | `text/tertiary` | **PASS (regression)** — `semantic.text.tertiary`, value-equal to prior `common.600.background` in both themes |
| Statistic | value | `text/primary` | **PASS (regression)** — `semantic.text.primary`, value-equal to prior `common.50.text` in both themes |
| Statistic | delta glyph | `text/secondary` | **PASS** — `semantic.text.secondary`; **discriminates in both themes** (prior inherited `text/tertiary`; light `rgb(51, 65, 85)` vs `rgb(71, 85, 105)`, dark `rgb(203, 213, 225)` vs `rgb(148, 163, 184)`) |
| Statistic | delta copy | `text/primary` | **PASS** — `semantic.text.primary`; **discriminates in both themes** (prior inherited `text/tertiary`; light `rgb(15, 23, 42)` vs `rgb(71, 85, 105)`, dark `rgb(248, 250, 252)` vs `rgb(148, 163, 184)`) |
| Statistic | trend up / down | `feedback/positive-fg` / `feedback/negative-fg` | **PASS (regression)** — value-equal `positive.700.background` / `negative.700.background`; the trend variant now paints the glyph and copy directly instead of the delta frame, values unchanged |
| Statistic | tone neutral / positive / negative / brand | `text/primary` / `feedback/*-fg` (positive delta) / brand extension | **PASS (regression)** — neutral `semantic.text.primary`; positive/negative `positive|negative.700.background` (value-equal `feedback/*-fg`); brand kept (light exact, dark one step) |
| Statistic | loading / disabled states, `with icon` / `compact` variants | `gLCov` state contract | **BLOCKED** (ledger below) |
| Foundation | named role `feedback/*-fg` / `feedback/*-border` | Pen audit legend | **BLOCKED** — value-mapped to the existing context matrix (`positive`/`negative`); INFO, not renamed |

## Approved contract and changed paths

- **Card:** resting roles already matched Pen (no value change); root gains the `:focus-visible` outline (`outlineStyle: solid`, `outlineWidth: {borderWidths.thick}` = 2px, `outlineColor: semantic.focus.ring`), matching the interactive card's Pen focus indicator (`q4UQZm`/`X3L3d2`). Hover/selected/disabled/interactive variants BLOCKED.
- **Statistic:** label `semantic.text.tertiary`; value + `tone.neutral` `semantic.text.primary`; `deltaIcon` `semantic.text.secondary`; `deltaText` `semantic.text.primary`; `trend.up` paints glyph + copy `semantic.positive.700.background`; `trend.down` paints glyph + copy `semantic.negative.700.background`; the delta frame is no longer a colour carrier. Loading/disabled states and `with icon`/`compact` variants BLOCKED. Each preset doc comment now names the resolved roles.

Changed paths: `src/shared/components/card/{preset.ts,Card.composition.test.tsx,Card.stories.tsx}`, `src/shared/components/statistic/{preset.ts,Statistic.composition.test.tsx,Statistic.stories.tsx}`, this evidence, `artifacts/batch-d/cards-metrics/` (new captures). Component `.tsx` files, `index.ts`, `panda.config.ts` and the token layer were not touched; generated `src/shared/styled-system/` was regenerated via `mise run gen` (git-ignored; never hand-edited). No export changed, so `check:deps` was not required.

## Tests-first proof (RED → GREEN)

### Composition (Bun)

RED was observed by restoring the parent `a76ec20` presets (`git checkout --` on both `preset.ts`), keeping the new assertions, running the focused files, then regenerating (`mise run gen`) and re-running to GREEN:

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bun test src/shared/components/card/Card.composition.test.tsx src/shared/components/statistic/Statistic.composition.test.tsx` | — |
| RED | `1` | `3 fail` / `27 pass` (30 tests, 2 files, 88 expect calls) |
| RED failures | card `paints the raised surface, subtle boundary and the focus ring`; statistic `paints the label, value and delta roles`; statistic `paints the up and down trend roles on the delta glyph and copy` | |
| GREEN | `0` | `30 pass` / `0 fail` (30 tests, 2 files, 93 expect calls) |

Composition RED is **role-name-level**: every renamed role fails the recipe assertion even when its value is equal. The value-level discriminator is the browser table below.

### Browser stories (Vitest + Playwright Chromium)

| Step | Exit | Result |
| --- | --- | --- |
| RED command | `bunx --no-install vitest run --config ./vitest.config.ts src/shared/components/card/Card.stories.tsx src/shared/components/statistic/Statistic.stories.tsx` (parent presets + `mise run gen`) | — |
| RED | `1` | `2 failed` files, `4 failed` / `16 passed` (20) |
| RED failures | card `Token Focus Light`, `Token Focus Dark`; statistic `Token Delta Light`, `Token Delta Dark` | |
| GREEN | `0` | `2 passed` files, `20 passed` (20) |

**True RED** (rendered value discriminates): Card focus ring (both themes); Statistic neutral delta glyph + copy (both themes). **Regressions** (value-equal, asserted not claimed as RED): Statistic label/value renames and the trend up/down retargeting — their stories (`Token Trend Light/Dark`) pass on the parent recipe. Focused coverage moved `27 → 30` composition tests (`+3`) and added 6 browser token stories (`14 → 20` in the two files).

## Both-theme evidence (computed style, in browser)

Code-side Storybook-iframe captures (`deviceScaleFactor: 2`), in `artifacts/batch-d/cards-metrics/`: `card-surface-tokens-{light,dark}`, `card-focus-ring-{light,dark}`, `statistic-delta-tokens-{light,dark}`, `statistic-trend-tokens-{light,dark}` (8 PNGs) plus `computed-styles.json` and `capture.mjs`.

| Surface / role | Light (computed) | Dark (computed) |
| --- | --- | --- |
| Card root `surface/raised` / `border/subtle` | `rgb(255, 255, 255)` / `rgb(226, 232, 240)` | `rgb(15, 23, 42)` / `rgb(30, 41, 59)` |
| Card title / description / meta / link | `rgb(15, 23, 42)` / `rgb(51, 65, 85)` / `rgb(71, 85, 105)` / `rgb(21, 128, 61)` | `rgb(248, 250, 252)` / `rgb(203, 213, 225)` / `rgb(148, 163, 184)` / `rgb(74, 222, 128)` |
| Card media `surface/sunken` + glyph `text/tertiary` | `rgb(241, 245, 249)` / `rgb(71, 85, 105)` | `rgb(2, 6, 23)` / `rgb(148, 163, 184)` |
| Card `:focus-visible` outline `focus/ring` (2px solid) | `rgb(22, 163, 74)` | `rgb(34, 197, 94)` |
| Statistic label `text/tertiary` | `rgb(71, 85, 105)` | `rgb(148, 163, 184)` |
| Statistic value `text/primary` | `rgb(15, 23, 42)` | `rgb(248, 250, 252)` |
| Statistic delta glyph `text/secondary` | `rgb(51, 65, 85)` | `rgb(203, 213, 225)` |
| Statistic delta copy `text/primary` | `rgb(15, 23, 42)` | `rgb(248, 250, 252)` |
| Statistic trend up glyph + copy `positive.700` | `rgb(21, 128, 61)` | `rgb(134, 239, 172)` |
| Statistic trend down glyph + copy `negative.700` | `rgb(185, 28, 28)` | `rgb(252, 165, 165)` |

### Contrast (real WCAG ratios)

Statistic content against the story shell `surface/base` (`#F8FAFC` light / `#020617` dark); Card content against its `surface/raised`. Thresholds text `≥ 4.5`, icon/boundary/focus `≥ 3`.

| Pair | Light | Dark | Verdict |
| --- | --- | --- | --- |
| Statistic label `text/tertiary` / `surface/base` | 7.24 | 7.87 | PASS (text) |
| Statistic value `text/primary` / `surface/base` | 17.06 | 19.28 | PASS (text) |
| Statistic delta glyph `text/secondary` / `surface/base` | 9.90 | 13.59 | PASS (icon) |
| Statistic delta copy `text/primary` / `surface/base` | 17.06 | 19.28 | PASS (text) |
| Statistic trend up `positive.700` / `surface/base` | 4.79 | 14.37 | PASS (text) |
| Statistic trend down `negative.700` / `surface/base` | 6.18 | 10.63 | PASS (text) |
| Card title `text/primary` / `surface/raised` | 17.85 | 17.06 | PASS (text) |
| Card description `text/secondary` / `surface/raised` | 10.35 | 12.02 | PASS (text) |
| Card meta `text/tertiary` / `surface/raised` | 7.58 | 6.96 | PASS (text) |
| Card link `text/link` / `surface/raised` | 5.02 | 10.25 | PASS (text) |
| Card media glyph `text/tertiary` / `surface/sunken` | 6.92 | 7.87 | PASS (icon) |
| Card boundary `border/subtle` / `surface/raised` | 1.23 | 1.22 | **INFO** — decorative boundary |
| Card focus `focus/ring` / `surface/raised` | 3.30 | 7.83 | PASS (focus indicator ≥ 3) |

### DISABLED / REVIEW (Pen audit ratios, never counted PASS)

The Pen component-role audits for Card and Statistic contain disabled specimens; their ratios are quoted for parity. Ratios marked ❋ did not reproduce against the code foundation and stay `DISABLED / REVIEW` regardless (disabled visuals are never PASS).

| Owner | Pen failure-list row | Light | Dark |
| --- | --- | --- | --- |
| Card | `States 2 disabled-boundary surface/base → border/subtle` | 1.18 DISABLED | 1.38 DISABLED |
| Card | `Cards disabled-boundary surface/raised → border/subtle` | 1.23 DISABLED | 1.22 DISABLED |
| Card | `Cards disabled-text action/disabled-bg → text/disabled` | 2.34 DISABLED | 1.93 DISABLED |
| Card | `Cards disabled-text action/disabled-bg → text/link` | 6.12 DISABLED ❋ (code 4.58) | 5.75 DISABLED ❋ (code 8.40) |
| Card | `Cards disabled-icon action/disabled-bg → text/tertiary` | 6.92 DISABLED | 5.71 DISABLED |
| Card | `Cards disabled-text action/disabled-bg → text/tertiary` | 6.92 DISABLED | 5.71 DISABLED |
| Statistic | `st-disabled disabled-icon action/disabled-bg → feedback/positive-fg` | 4.58 DISABLED | 10.42 DISABLED |
| Statistic | `st-disabled disabled-text action/disabled-bg → feedback/positive-fg` | 4.58 DISABLED | 10.42 DISABLED |
| Statistic | `st-disabled disabled-text action/disabled-bg → text/tertiary` | 6.92 DISABLED | 5.71 DISABLED |
| Statistic | `st-disabled disabled-text surface/raised → text/tertiary` | 7.58 DISABLED | 6.96 DISABLED |
| Statistic | `st-disabled disabled-text action/disabled-bg → text/primary` | 16.30 DISABLED | 13.98 DISABLED |

Card reports `FAIL rows 0` and `DISABLED / REVIEW 11` (6 rows listed + 5 grouped); Statistic reports `FAIL rows 0` and `DISABLED / REVIEW 5` (all listed). Neither reports a focus-indicator failure (Card `1/1 PASS`, Statistic `0/0`).

## BLOCKED ledger (recorded, not implemented)

| Item | Pen authority | Reason |
| --- | --- | --- |
| Card interactive variant | `l3a7qL` "interactive"; `fz3DO` | New public variant + link/button role; outside the token contract |
| Card hover / selected / disabled states | `l3a7qL` state contract; `CaHpa`, `mBcXT`, `Xo724` | New interaction/selection states (`surface/hover`, `surface/selected` + `action/primary-bg` border, `action/disabled-bg` + `text/disabled`) |
| Card elevation affordance | `l3a7qL` ("Interactive cards signal affordance with elevation and text") | Shadow/elevation policy undecided |
| Card selected-state ARIA | `D8pkI`/`u6YqKX` ("Selected state is exposed, not only coloured") | ARIA contract change |
| Card footer separator (`divider`) | `RH6sw` ("Separators inside a card use divider") | No footer divider in the current API; new part |
| Card named part `meta`/`action` split | `c8W54` named parts | Current `header`/`footer` mapping retained |
| Statistic `loading` state + skeleton | `gLCov` state contract; `BSME1` | New state/geometry |
| Statistic `disabled` state | `gLCov` state contract; `TqTPX` + 5 disabled rows | Disabled semantics + Foundation disabled roles undecided |
| Statistic `with icon` / `compact` variants | `vcfL8` variant names | New content/geometry axes |
| Statistic `context` named part | `aZkUR` named parts | New content part |
| Statistic tabular digits | `WF6qJ` ("Digits are tabular so values align") | Numeric font feature; no Foundation token |
| Statistic value size `2xl` | `CjnzL` value `font-size/2xl` | Foundation tops out at `xl`; existing approximation retained |
| Foundation named role `feedback/*-fg` / `feedback/*-border` | Pen audit legend | Value-mapped to `positive|negative` matrix; INFO, not renamed |
| New public components | — | Explicitly excluded |

## Verification

| Command | Exit | Result |
| --- | --- | --- |
| focused composition RED | `1` | `3 fail` / `27 pass` (30) |
| focused composition GREEN | `0` | `30 pass` / `0 fail` (93 expect calls) |
| focused browser RED | `1` | `2 failed` files, `4 failed` / `16 passed` (20) |
| focused browser GREEN | `0` | `2 passed` files, `20 passed` (20) |
| `mise run check` | `0` | lint + types + format; `✓ icons up to date (38 icons)`; `✓ web fonts up to date (2 faces)`; unit `831 pass / 0 fail` (90 files); browser `702 passed` (73 files) |
| `mise run build` | `0` | Vite production build, `141 modules transformed`, `✓ built in 80ms` |
| `git diff --check` | `0` | no whitespace errors |
| `check:deps` | n/a | no exports or dependencies changed |

## Concerns / INFO

- **INFO — Card resting roles were already aligned.** The master/doc (raised surface, subtle boundary, sunken media, primary/secondary/tertiary text, link) already matched the code; this slice adds the focus ring and both-theme regression coverage only.
- **INFO — Card focus ring is state-level, not a declared variant.** Pen's focus indicator belongs to the interactive card (`fz3DO`), which the code does not model. The ring is applied to the existing root slot and is observable when a consumer makes the native `article` focusable (`tabIndex`); a declared interactive variant is BLOCKED.
- **INFO — Statistic delta architecture change.** The delta frame no longer carries the colour; `deltaIcon` and `deltaText` now own their roles, and the `trend` variants retarget them. The trend up/down values are unchanged (value-equal `feedback/*-fg`), so the browser `Token Trend` stories pass on the parent recipe.
- **INFO — Statistic delta specimen split.** The Pen `default` state and `FMXaz` anatomy give the delta glyph `text/secondary` and the copy `text/primary`; the abstract `CjnzL` master and the positive/negative state specimens paint both with `feedback/*-fg`. The anatomy/default (neutral) roles are used as the base; the state roles drive the trend variants.
- **INFO — Card disabled text/link ratio.** Pen's `6.12/5.75` did not reproduce against the code foundation (`4.58/8.40`); the row stays `DISABLED / REVIEW` and is never counted PASS.
- The Pen digest in the handoff was one character short; the real, unchanged digest is recorded in the header.
