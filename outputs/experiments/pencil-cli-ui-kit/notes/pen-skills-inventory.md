# Pen built-in skills inventory

**Observed:** 2026-10-06 via read-only `pen interactive` → `read_skill()`.

## Required for `.pen` work

| Path | Purpose |
| --- | --- |
| `pen-schema.md` | Schema and properties of a `.pen` document. |
| `execute.md` | Protocol for querying and mutating the canvas with `execute`. |

## Available specialised guidance

| Path | Purpose |
| --- | --- |
| `generate.md` | AI/stock image generation, SVG artwork and image transforms. |
| `guide/components.md` | Components, reusable masters and instances. |
| `scripts-and-shaders.md` | Canvas scripts and shaders. |
| `whiteboard.md` | Canvas-based research, comparison, planning and preparation using live browser nodes. |
| `guide/code.md` | Generating code from `.pen` files. |
| `guide/design-system.md` | Composing screens with design-system components. |
| `guide/landing-page.md` | Landing pages and promotional websites. |
| `guide/mobile-app.md` | Mobile-app design. |
| `guide/slides.md` | Presentation slides. |
| `guide/table.md` | Tables and dashboards. |
| `guide/tailwind.md` | Tailwind CSS v4 implementation. |
| `guide/web-app.md` | Web-application design. |

## Use in this experiment

The headless CLI route reads `pen-schema.md` and `execute.md` before a mutation.
`guide/components.md` is required before creating the remaining `ButtonIcon` and
`Card` masters. The inventory describes instruction resources, not agent models:
they guide the current OpenCode agent and do not start an independent Pen agent.
