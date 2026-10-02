# Design brief: Create Project

**Status:** proposed — awaiting Gate A confirmation.

## Objective

Add a **Create Project** flow to the existing dashboard: a user can open a form
from Projects, provide the required project details, submit, and see the new
project appear in Projects. The flow must be composed in the isolated Pen copy
from existing design-system contracts, without new masters, tokens, icons or
hardcoded substitutes.

## Required fields

| Field             | Kind     | Required | Notes                                                             |
| ----------------- | -------- | -------- | ----------------------------------------------------------------- |
| Name              | Text     | yes      | Project title.                                                    |
| Description       | Text     | yes      | Short project description.                                        |
| Owner             | Selection| yes      | Chosen from the existing owner options/component contract.        |
| Due date          | Date     | yes      | Date selection using existing form/input contracts.               |

## Required states and outcomes

1. **Entry point from Projects** — Projects exposes a Create Project trigger.
2. **Required-field validation** — the form shows a required/validation state
   for each missing required field before submit is allowed.
3. **Cancel** — a secondary action leaves the form without creating a project.
4. **Submit** — the primary action with all required fields valid.
5. **Success in Projects** — after submit, the created project appears in the
   Projects list with the entered values.

## Validation rules

- All four fields (name, description, owner, due date) are required.
- Submit is disabled until every required field is valid.
- Invalid or empty required fields must be visibly distinguished from valid
  ones, using the existing validation/error contract.
- Validation must not rely on placeholder-only styling; it must be an explicit
  form state.

## Actions

- **Primary:** Submit (disabled until valid, primary emphasis).
- **Secondary:** Cancel (visually distinct and less prominent than Submit).

## Acceptance criteria

- The flow covers the entry point, invalid/validation state, filled form,
  cancel and submit, and the success state in Projects.
- Every element reuses existing component refs, semantic tokens, theme contexts
  and canonical icon assets; no visual substitutes are introduced.
- Screens use `clip: true`; document roots stay clean.
- Structural, contrast and code-alignment evidence is recorded and reproducible.
- Unresolved aesthetic trade-offs are surfaced to the user as `HUMAN REVIEW`.
