# Foundation evidence

**Status:** PASS (2026-10-06)

## Target and task

- Active target: `artifacts/pencil-cli-ui-kit.pen`.
- Foundation root: `Qwxp6` (`Foundation`, frame, 1200 × 680, `clip: true`).
- Screenshot: `foundation.png` (600 × 340 PNG).
- Target SHA-256: `fcc350adf00e7acb82aa96fe62556041ac605d700b8a3019500342b98f206bd5`.

## Code alignment

The variables use the project palette and foundation scale: neutral 50/950,
neutral 900/50, neutral 600/300, neutral 400/600, green 600/500, red 600/500;
spacing 16/24/32; radii 6/10/16; borders 1/2; Inter at 14/16/20.

## Structural result

The readback lists a single top-level `Foundation` frame, role cards
`Surface`, `Primary action`, `Danger action`, `Focus ring`, and scale groups
`Spacing`, `Radii`, `Borders`, `Type`. The corrected visitor query
`Get("Qwxp6", (n,c) => c.problems && Print(...))` returned no problem rows.
All displayed fills refer to foundation variables, except white foreground text
on saturated action cards.

## Notes

The first multiline interactive-shell request was rejected before `execute`
because each input line is parsed as a separate tool call. The JSON-escaped,
single-line `execute` request created the section. A subsequent query used the
literal string `"foundation"` rather than the actual root id and rolled back;
the follow-up query uses `Qwxp6` and confirms the saved structure.
