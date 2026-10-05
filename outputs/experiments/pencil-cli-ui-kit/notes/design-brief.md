# Design brief: Pencil CLI UI Kit

**Status:** approved (2026-10-06).

## Objective

Create a clean UI Kit `.pen` document only through CLI paths, then compose a
small reusable foundation and three masters from the code-side design contracts.

## Required deliverables

1. Both direct CLI and headless interactive CLI evidence.
2. Light/dark foundation variables for semantic colours, typography, layout,
   shape, shadows and focus roles.
3. `Button`, `ButtonIcon` and `Card` reusable masters.
4. A clipped showcase for variants/states and focused evidence per deliverable.

## Constraints

- GUI does not create or open the document.
- Code, existing Pen documents and icons are read-only.
- No product UI, source changes, generated artifacts or new icon set.
- The target is active before every Pencil mutation.

## Acceptance

The target is CLI-created, CLI/headless activation is evidenced, all four UI Kit
deliverables map to project contracts, and each mutation has `ctx.problems`,
structure and screenshot evidence.
