# Token architecture baseline

**Status:** FAIL as expected (2026-10-06)

Read-only audit against `artifacts/pencil-cli-ui-kit.pen` confirmed that the
pre-migration document has no project-shaped namespaced variables:

- `palette.neutral.50` — missing
- `spacing.x4` — missing
- `fonts.body` — missing
- `semantic.common.50.background` — missing

The master readback instead uses the previous simplified aliases, including
`$action-primary`, `$surface-raised`, `$surface-sunken`, `$text-primary`,
`$text-secondary`, `$font-body`, `$font-size-sm`, `$space-4` and `$radius-md`.
This is the intentional RED baseline for the token-architecture migration.

- Audit transcript: `.superpowers/sdd/2026-10-06-pencil-token-architecture/baseline-audit.log`
- Target SHA-256 before mutation:
  `7b6d40315f871047baeec8e969a4caf75112304927c5bfd24ae14510f2b719ae`
