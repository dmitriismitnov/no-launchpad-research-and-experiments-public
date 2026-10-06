# History: Pencil CLI UI Kit

## 2026-10-06 — experiment opened (active)

- The user requested a CLI-only Pencil experiment and will use GUI only for
  final visual review.
- Both direct `pen --out` and headless `pen interactive --out` routes must be
  tested even if the first route succeeds.
- The future target is a clean UI Kit document with foundation, Button,
  ButtonIcon and Card; it is not a copy of any existing design system.
- The experiment remains active until the user directly closes it.
- No `.pen` file exists or has been mutated at this checkpoint.

## 2026-10-06 — experiment closed (closed)

The user completed visual review and closed the experiment by direct
instruction. Final artifact: `artifacts/pencil-cli-ui-kit.pen` (Foundation,
three masters, Projects overview, layered token architecture and decomposed
theme axes).

### User retrospective (recorded verbatim in intent)

- Some questions were resolved during the run, mainly because the user did not
  initially know which Pen features existed. This can be called scope creep
  only formally; the clarified points were useful.
- Working without the GUI is possible. Headless mode plus Pen's own guides and
  the previously researched guides let Pen be used purely as a platform. That
  does not exclude alternatives: Figma is more capable but paid, OpenDesign
  does not allow point edits. Pen CLI could not invoke DeepSeek V4.1 Flash; the
  harness can drive it directly instead, so the loss is minor.
- Deterministic operations were confirmed, which is valuable for tighter
  control over results as the system matures.

### Orchestrator review

See `notes/results.md` for the PASS/INFO/HUMAN REVIEW classification and the
closing assessment.

## 2026-10-06 — merged into main

- Branch `experiment/pencil-cli-ui-kit` merged into `main` by fast-forward
  (`main` was an ancestor; 16 commits, then closure and cleanup commits).
- `mise run check` on the merged result: 840 unit / 724 browser, green
  (one Slider dark-theme timeout in the first run was a flaky false negative:
  the file passed 20/20 in isolation and in the repeated full run).
- Removed a stray nested export artifact
  (`artifacts/outputs/.../RBsKd.png`) left by an early `Export` path.
- The feature branch is kept (fully merged); `main` is not pushed to a remote
  by this action.
