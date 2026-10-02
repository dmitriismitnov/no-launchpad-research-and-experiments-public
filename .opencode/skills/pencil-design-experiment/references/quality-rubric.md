# Quality rubric

Defines the finding statuses, the resolved-fill logic and the anti-slop
questions used by mechanical checks and the orchestrator's visual review.

## Finding statuses

- **PASS** — the claim is verified against a Pen/code/screenshot artifact and no
  open concern remains. Disabled specimens never count as an enabled `PASS`.
- **FAIL** — the observation contradicts a contract or brief requirement. Record
  the artifact, the observed fact, the expected contract and the needed
  correction.
- **INFO** — true and useful, but no action is required.
- **HUMAN REVIEW** — an aesthetic or priority trade-off that mechanical checks
  cannot settle, including a composition that is mechanically valid but visually
  weak. `HUMAN REVIEW` is never silently promoted to `PASS`; the orchestrator
  presents it to the user at Gate D.

Every finding must carry evidence: file/frame/node, observed fact, expected
contract, severity and recommended disposition.

## Nearest actual resolved fill

Contrast review uses the **nearest actual resolved fill**, never only a semantic
ancestor token name:

1. Start from the text, icon or boundary node.
2. Walk up to the first ancestor that actually paints a fill, following resolved
   instances.
3. Include concrete `palette/*` variables and their resolved values.
4. Compare the resolved foreground/background pair, not the token names.
5. A semantic token label alone is not evidence; an unresolved or inherited name
   is `FAIL` until the actual painted value is shown.

The same rule applies to boundaries and state variants: verify the value that is
actually painted, not the value the name implies.

## Mechanical checks

- Existing semantic tokens, theme contexts, component refs and canonical icon
  assets are used; no duplicate masters or hardcoded substitutes.
- No unintended global edits.
- `ctx.problems` shows no clipping or collapsed layout.
- Contrast and component-role contracts hold on actual resolved fills.
- Each container has a functional reason; no generic card wrapping by default.

## Anti-slop questions

- Is the form hierarchy readable and is the scanning order intentional?
- Are primary and secondary actions visibly distinct?
- Does each container exist for a functional reason rather than decoration?
- Is the composition intentional, or a uniform generic grid?
- Are effects and decoration restrained and consistent with the design system?
- Does the result read as the established dashboard language rather than a
  template?
