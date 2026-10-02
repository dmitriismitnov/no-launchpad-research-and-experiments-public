# Design system contract

Names the source paths, ownership and no-source-edit rules for the Pencil
experiment. This contract is read-only for the experiment; the experiment may
only add local frames inside its isolated Pen copy.

## Source paths

| Object                        | Path                                                                         | Mode                         |
| ----------------------------- | ---------------------------------------------------------------------------- | ---------------------------- |
| Source Pen design system      | `/Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen` | read-only reference          |
| Isolated writable Pen target  | `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`  | writable                     |
| React/PandaCSS implementation | `src/`                                                                       | read-only                    |
| Shared components             | `src/shared/components/`                                                     | read-only                    |
| Foundation tokens             | `src/shared/styles/foundation/`                                              | read-only                    |
| Icon assets                   | `src/shared/components/icon/`                                                | read-only                    |
| Project conventions           | `.agents/project.md`                                                         | read-only                    |
| Generated PandaCSS output     | `src/shared/styled-system/`                                                  | generated, never edit        |
| Durable experiment state      | `outputs/experiments/pencil-opencode-workflow/`                              | writable                     |
| This skill                    | `.opencode/skills/pencil-design-experiment/`                                 | writable after plan approval |

## Ownership

| Object                                      | Owner                  |
| ------------------------------------------- | ---------------------- |
| Source Pen document, tokens, masters, icons | existing design system |
| `src/` and PandaCSS contracts               | codebase               |
| `artifacts/create-project.pen`              | experiment             |
| Durable state under `outputs/experiments/`  | orchestrator           |
| This skill                                  | experiment             |

## No-source-edit rules

1. Never write to the source Pen document or to any `.pen` file other than the
   isolated writable target.
2. Never edit `src/`, foundation tokens, reusable masters, public components or
   the icon set; never run codegen as part of the experiment.
3. Never edit generated files such as `src/shared/styled-system/`.
4. Reuse existing component refs, semantic tokens, theme contexts and canonical
   icon assets. A hardcoded color, font, spacing or shape that substitutes for an
   existing token is a defect (`FAIL`).
5. Do not create a new master, token, icon or global canvas structure, and do not
   delete or rename existing ones.
6. Local, reversible edits inside the approved experiment frame are allowed
   without separate confirmation.

## Stop-and-ask condition

If the required element cannot be composed from existing refs, or if a change
would touch a master, token, global canvas structure or any source-of-truth
artifact, stop and ask the user for an explicit gate. Do not design a substitute.
