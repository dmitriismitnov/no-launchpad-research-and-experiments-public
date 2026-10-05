# CLI discovery evidence

## Direct pen.dev CLI route

| Command | Exit status | Target result | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| `pen --out … --prompt … --agent codex` | harness timeout after 120 s | no target file; no usage JSON | `artifacts/direct-cli.stdout.log` (213,930 bytes), `direct-cli.stderr.log` (0 bytes) | `BLOCKED` |
| `pen --out … --model deepseek/deepseek-flash --effort high` | 1 | target unchanged | `artifacts/direct-cli-deepseek.stderr.log` | `FAIL` — installed pen.dev CLI does not recognize the OpenCode model ID |
| `pen --out … --model deepseek-flash --effort high` | 1 | target unchanged | `artifacts/direct-cli-deepseek-flash.stderr.log` | `FAIL` — installed pen.dev CLI does not recognize the short ID |

The OpenCode registry identifies **DeepSeek V4.1 Flash** as
`deepseek/deepseek-flash`, with `high` as a supported effort variant. The
installed pen.dev CLI 0.3.10 rejects that exact ID before creating a file:
`Unknown model 'deepseek/deepseek-flash'`. Its unqualified `--list-models`
output exposes Claude models only (`artifacts/pen-cli-models.stdout.log`).

## Interactive headless CLI route

| Command | Exit status | Active document | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| `pen interactive --out …` with `read_skill`, `get_app_state`, `save` | 0 | exact target path, confirmed in initial and reopened sessions | `artifacts/headless-session.log`; target SHA-256 `2ba5b42b85f8049b9df04c241511ef0c439dff47967b4c5e5690ea2cbc3218b1` | `PASS` |

## Baseline

- Target is a 96-byte clean `.pen` with no top-level nodes or reusable components.
- A read-only `Get` root scan and `Get((n,c) => c.problems && …)` emitted no
  rows, so the empty document has no observable layout problems.
- `ctx.problems` is a `Get` visitor context in pen.dev CLI 0.3.10, not a global;
  the failed `Print(ctx.problems)` query rolled back without mutating the target.
- `--enable-preview` produced no `headless-baseline.png`: an empty document has
  no canvas node to render. This is `INFO`, not a failure; focused screenshots
  begin with the first UI Kit frame.
