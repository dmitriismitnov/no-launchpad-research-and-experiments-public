# Structural & contrast audit — Create Project benchmark (ex_2)

**Status:** pass with minor deferrals (2026-10-02). **Model:** `deepseek/deepseek-flash`.
**Artifact:** `artifacts/ex_2.pen` (active editor, confirmed via `get_app_state`).
**Audited frames:** `WqoYt`, `R1Yg8`, `iKbNI`, `XKqHF`, `negSS`.

## Method

Read-only Pencil MCP queries plus forced-render screenshots/exports. Contrast uses
nearest actual resolved fills (`resolveVariables: true`).

## PASS

| Check | Evidence |
| --- | --- |
| Correct isolation | `get_app_state` active editor = `artifacts/ex_2.pen`; the read-only source `design_system_ex_1.pen` was never the active editor for this pass. |
| Existing refs used | `Field`, `Button`, `Select`, `Date Input`, `Card` instances only; no new masters/tokens/icons. |
| Semantic tokens | Title `common/50/text`→`#0F172A`; subtitle `common/600/background`→`#475569`; success banner `positive/50/background` + `positive/50/text`. |
| Theme | Light and dark frames render from the same tokens (`WqoYt` light, `R1Yg8` dark); no light/dark master copies. |
| Layout integrity | Bounds are sequential with no overlap in all five frames (form: header 48, fields 135/247/359/471, actions 583; projects: header 48, actions 135, cards 203; success: header 48, banner 135, actions 212, cards 280). |
| Contrast (sampled) | `#0F172A`/`#F8FAFC` ≈ 17:1; `#475569`/`#F8FAFC` ≈ 7:1; buttons use master tokens. |
| Root cleanliness | No leaf nodes under `document`; five isolated experiment frames only. |

## FAIL / deferred

| Check | Evidence |
| --- | --- |
| Explicit validation messages | Error text (`ss2MJ`) stays hidden without the Field `invalid` variant, which a `ref` cannot set. The empty state is conveyed by empty fields + a dimmed primary action, not by red error copy. |
| Responsive | Tablet and mobile variants are not built yet. |

## INFO

| Finding | Evidence / disposition |
| --- | --- |
| Render cache | Nested content needed a frame "touch" before appearing in screenshots/exports. |
| Field hint id | Hint is `uOwyc`, not `ss2MJ` (which is Error); overriding error text does not reveal it. |
| Frame radius | `cornerRadius` is the valid frame property; `borderRadius` is rejected. |
| Ref variant | `ref` rejects `tone`; secondary styling is done by overriding fill/label tokens. |
| Nested ref value | Setting a control value works via path `instance/bIaC6/f8QzS` after creation, not via creation-time `descendants`. |

## Verdict

Isolation, reuse, tokens, theme and layout integrity **pass** for the five frames.
Validation copy and responsive variants are deferred, recorded honestly.
