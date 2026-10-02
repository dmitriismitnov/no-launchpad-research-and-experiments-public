# Structural & contrast audit — Create Project benchmark

**Status:** partial (2026-10-02). **Role/model:** single-model operator — `deepseek/deepseek-flash`.
**Artifact:** `artifacts/create-project.pen`. **Scope audited:** local frame `x9le7`
(`Create Project — Form — Desktop Light`).

## Method

- Pencil MCP read-only queries (`Get` visitor, `GetVariables`) plus `TakeScreenshot`.
- Pen target is the isolated copy; source `design_system_ex_1.pen` untouched.
- Contrast uses the nearest actual resolved fill (`resolveVariables: true`).

## PASS

| Check | Evidence |
| --- | --- |

| No master/token/icon/source change | 82 masters preserved; only a local root frame + refs inserted. |
| Existing refs used | `Field`, `Button` (×2), `Select`, `Date Input` instances; no local substitutes. |
| Semantic tokens used | Title `$semantic/common/50/text` → `#0F172A`; subtitle `$semantic/common/600/background` → `#475569`; controls use master tokens. |
| Theme context | Frame carries `theme:{theme:'light'}`; variables resolve per theme. |
| Text contrast (sampled) | Title `#0F172A` on `#F8FAFC` ≈ 17:1; subtitle `#475569` on `#F8FAFC` ≈ 7:1. |
| Root cleanliness | No leaf nodes added directly under `document`. |

## FAIL

| Check | Evidence |
| --- | --- |
| **Isolation mechanism failed** | `tools.pencil.execute` applied mutations to the **active editor** document (`design_system_ex_1.pen`), not to the passed relative path to the copy. The composed frame `x9le7` was found inside the source document via an absolute-path query. Experimental nodes were deleted afterwards and the on-disk source hash re-verified unchanged (`c9695a1d…`), but the read-only boundary was breached in-app. A relative `filePath` is not isolation; the copy must be explicitly opened and confirmed active via `get_app_state` before any mutation. |
| Layout overlap | `Fields` at y=143 h=300 (ends 443), but `Actions` at y=371 → 72 px overlap; due-date row and Cancel/Create render on one line. Reproduced after repeated property touches. |
| Brief coverage | Missing Description field, empty/invalid state, distinct filled vs empty states, Projects entry point, success state, dark theme, tablet/mobile. |
| Hint content | `Field` hint still renders the master default `Lowercase, no spaces.`; instance-level hint `Update` had no visible effect. |

## INFO

| Finding | Evidence / disposition |
| --- | --- |
| Render/layout cache | New nested content does not render in `TakeScreenshot`/`Export` until the frame is touched (`Update` prop). Without the touch the frame looks blank. |
| Ref variant override unsupported | `Insert(..., {type:'ref', tone:'secondary'})` → `unexpected property "tone"`. Secondary styling was done by overriding fill/label tokens instead. |
| `Date Picker` master embeds a calendar | Using it inline produced a 356 px popup; switched to the `Date Input` master. |
| `Textarea`-based field broke layout | A `Field` instance whose control was replaced by `Textarea` left a large empty block; reverted. |
| Frame border props | `borderWidth`/`borderStyle`/`borderColor` are not valid frame properties in the `.pen` schema. |

## Verdict

Mechanical foundation (isolation, refs, tokens, theme) passes. The composed
section does **not** pass layout integrity (overlap) and is incomplete against
the brief. This is a partial-failure result, recorded honestly rather than
promoted to PASS. Remaining items are `HUMAN REVIEW`.
