# Pen baseline: isolated `create-project.pen` copy

**Status:** drafted (worker evidence only; not yet reviewed/verified).
**Task:** Task 3, Step 3 — copy and inspect baseline without mutation.
**Worker role/model:** implementation worker — `deepseek/deepseek-flash#high`.
**Timestamp:** 2026-10-02T04:13:50Z (2026-10-02 07:13:50 MSK).

This file records raw facts read from the isolated copy. It is not a review and
does not contain dispositions. No Pencil mutation was performed.

## Paths and identity

| Item | Value |
| --- | --- |
| Source (read-only) | `/Users/es/Shared/vm/no-vm-shared/design_system/ex_1/design_system_ex_1.pen` |
| Copy (writable target) | `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen` |
| Source SHA-256 | `c9695a1da46e282f77d136455bee48affe8914fea96a5295db3492a126daddc2` |
| Copy SHA-256 | `c9695a1da46e282f77d136455bee48affe8914fea96a5295db3492a126daddc2` |
| Source size (bytes) | `9271120` |
| Copy size (bytes) | `9271120` |

Source and copy hashes are identical before and after inspection, so the
read-only queries did not alter the copy. Source and copy are byte-identical at
this checkpoint.

## Method

- Tool: Pencil MCP `execute` (read-only operations only: `Get` visitor,
  `GetVariables`, `Print`).
- `filePath`: `outputs/experiments/pencil-opencode-workflow/artifacts/create-project.pen`.
- No `Insert`, `Copy`, `Update`, `Replace`, `Move`, `Delete`, `SetVariables`,
  `Generate`, `Export` or `TakeScreenshot` call was made against the copy.
- Query shape: one visitor over the whole document collecting root children
  (`ctx.depth === 1`), reusable nodes, `ref` counts, type counts, node `theme`
  usage and `ctx.problems`; plus `GetVariables()` for variable/theme facts.

## Aggregate counts (raw)

| Fact | Value |
| --- | --- |
| Top-level `document` children | `155` |
| Reusable masters (`reusable === true`) | `82` |
| `ref` nodes | `1720` |
| `frame` nodes | `5752` |
| `text` nodes | `5778` |
| `icon` nodes | `256` |
| `rectangle` nodes | `1285` |
| `path` nodes | `27` |
| `group` nodes | `0` |
| Variables (`GetVariables().variables`) | `587` |
| Nodes carrying an explicit `theme` property | `231` (light `115`, dark `116`) |
| `ctx.problems` entries | `0` |
| Top-level frames with `reusable === true` | `0` |

## Root frames (`ctx.depth === 1`, 155 total)

Raw name / id / size / clip. No top-level root has `reusable: true`; only
`vAQdH` has `clip: true`:

```text
Zs8fQ   frame  Foundation — Header
nrxVa   frame  Foundation — Primitive palette
RnRBs   frame  Foundation — Semantic matrix
m0I5v   frame  Foundation — Semantic contrast audit
Q4BjX   frame  Foundation — Component-role contrast audit
n23ldJ  frame  Foundation — Typography
xQGMu   frame  Foundation — Spacing & sizing
kV9Rx   frame  Foundation — Shape & effects
tlRSP   frame  Foundation — Icon size scale
v78OuT  frame  Foundation — Theme comparison
O7j8hN  frame  Foundation — Legend
qXos6   frame  Header
twgEI   frame  Usage contract
BsKMS   frame  Icon inventory
rIjcY   frame  Usage map
w8TpWx  frame  Dynamic / unresolved icon usage
GK9K0   frame  Theme preview
n8Yzd   frame  Legend
iHRno   frame  Components — Actions — Overview
vW8MG   frame  Components — Actions — Button
L2cyL   frame  Components — Actions — Icon Button
MApo8   frame  Components — Actions — Toggle
OHpCJ   frame  Components — Actions — Toggle Group
ZPe0g   frame  Components — Actions — Reusable masters
t6A7QW  frame  Components — Forms & selection — Overview
c6uIoT  frame  Components — Forms & selection — Field
VSh2R   frame  Components — Forms & selection — Text Input
N0ymEX  frame  Components — Forms & selection — Textarea
oTL4D   frame  Components — Forms & selection — Number Input
RB6lx   frame  Components — Forms & selection — Checkbox
BRhSj   frame  Components — Forms & selection — Radio Group
gHtWp   frame  Components — Forms & selection — Switch
lLkUG   frame  Components — Forms & selection — Slider
vMd62   frame  Components — Forms & selection — Select
jZrkt   frame  Components — Forms & selection — Multi Select
dW2kV   frame  Components — Forms & selection — Date Input
qPx25   frame  Components — Forms & selection — Date Picker
K8gNTw  frame  Components — Forms & selection — Pin Input
pikCU   frame  Components — Forms & selection — File Upload
RLmkc   frame  Components — Forms & selection — Color Picker
PxfEf   frame  Components — Forms & selection — Rating
RN3EO   frame  Components — Forms & selection — Editable
yqYp1   frame  Components — Forms & selection — Segmented Control
D8Txdn  frame  Components — Forms & selection — Masters (library)
o6fYt   frame  Components — Navigation & disclosure — Overview
n07t86  frame  Components — Navigation & disclosure — Link
LK4fe   frame  Components — Navigation & disclosure — TopNavigation
RLvWi   frame  Components — Navigation & disclosure — SidebarNavigation
KiW8b   frame  Components — Navigation & disclosure — Breadcrumbs
CCpkF   frame  Components — Navigation & disclosure — Tabs
vswcF   frame  Components — Navigation & disclosure — Accordion
C6zTA   frame  Components — Navigation & disclosure — Menu
w7EbR   frame  Components — Navigation & disclosure — ContextMenu
yQPcK   frame  Components — Navigation & disclosure — Pagination
f9QCHG  frame  Components — Navigation & disclosure — Steps
f4wq6   frame  Components — Navigation & disclosure — TreeView
hvrFF   frame  Components — Navigation & disclosure — Carousel
mDzms   frame  Components — Navigation & disclosure — Masters (library)
ds4DI   frame  Components — Content & data — Overview
FwsfN   frame  Components — Content & data — Icon
YoSlU   frame  Components — Content & data — Avatar
l3a7qL  frame  Components — Content & data — Card
gLCov   frame  Components — Content & data — Statistic
g02ukq  frame  Components — Content & data — DataTable
dm7Dn   frame  Components — Content & data — List
K7WV8o  frame  Components — Content & data — Timeline
wsiFp   frame  Components — Content & data — Clipboard
VLMbo   frame  Components — Content & data — CodeBlock
EbeiJ   frame  Components — Content & data — ScrollArea
ZVJu8   frame  Components — Content & data — Splitter
vUaGv   frame  Components — Content & data — MediaPlaceholder
dF7N0   frame  Components — Content & data — QRCode
Uyuv7   frame  Components — Content & data — Divider
GEJC2   frame  Components — Content & data — Masters (library)
rOHL0   frame  Header                                    (h=76)
mPIzN   frame  Hero
gw3Zj   frame  Value strip
vaCHO   frame  Section Header
M2zLU   frame  Feature Primitive and semantic tokens
v9iF0   frame  Feature Component-scoped architecture
V7lQbB  frame  Feature Responsive and state-aware UI
iiBxc   frame  Workflow
La6I3   frame  Theme preview
aMKcr   frame  CTA
Q5WYG   frame  Footer
QpVUz   frame  Header                                    (h=68)
DDN3S   frame  Hero
e20nR   frame  Value strip
vzXfY   frame  Feature Primitive and semantic tokens
tVuSG   frame  Feature Component-scoped architecture
m6tsN3  frame  Feature Responsive and state-aware UI
zW48B   frame  Workflow
xICWD   frame  Theme preview
RDK9k   frame  CTA
WJuFa   frame  Footer
hPWtr   frame  Header                                    (h=64)
M2D0g   frame  Mobile menu
oRZiN   frame  Hero
fdc5K   frame  Value strip
pRsS2   frame  Feature Primitive and semantic tokens
oLr23   frame  Feature Component-scoped architecture
qGeM3   frame  Feature Responsive and state-aware UI
GelBI   frame  Workflow
SecFa   frame  Theme preview
TC0UQ   frame  CTA
AN6ha   frame  Footer
bvxct   frame  Header
yCGm6   frame  Vocabulary
K58Cg9  frame  Precedence and behaviour
vAQdH   frame  State applicability by component type      (clip=true)
R8NJLP  frame  Legend
REMGk   frame  Header
jt3TG   frame  How to use this design system
rlBgT   frame  Component taxonomy
HF9bI   frame  Navigation map to component documentation frames
dJuC8   frame  Components — Overlays — Overview
UO5oQ   frame  Components — Overlays — Tooltip
H8KJm   frame  Components — Overlays — Popover
nij7I   frame  Components — Overlays — HoverCard
SV28R   frame  Components — Overlays — Dialog
ZOluA   frame  Components — Overlays — AlertDialog
P6x6P   frame  Components — Overlays — Drawer
kuTcw   frame  Components — Overlays — Sheet
y3lqjy  frame  Components — Overlays — FloatingPanel
p3wP8   frame  Components — Overlays — Tour
UKvkf   frame  Components — Overlays — Masters (library)
FCVSX   frame  Components — Feedback & status — Overview
K2iLH   frame  Components — Feedback & status — Alert
UldIG   frame  Components — Feedback & status — Toast
NT57b   frame  Components — Feedback & status — Badge
QIUyy   frame  Components — Feedback & status — Tag
x8pveA  frame  Components — Feedback & status — StatusIndicator
qxDaq   frame  Components — Feedback & status — Progress
l4jso   frame  Components — Feedback & status — Spinner
oPSvA   frame  Components — Feedback & status — Skeleton
EtNCb   frame  Components — Feedback & status — EmptyState
F7wZXq  frame  Components — Feedback & status — Masters (library)
yv6hO   frame  Desktop — Light                            (w=1440, clip=true)
ROVha   frame  Desktop — Dark                             (w=1440, clip=true)
GjSch   frame  Tablet — Light                             (w=768, clip=true)
j8ilqo  frame  Tablet — Dark                              (w=768, clip=true)
q6ZJWs  frame  Mobile — Light                             (w=390, clip=true)
Z14gV8  frame  Mobile — Dark                              (w=390, clip=true)
cmS1l   frame  Desktop — Light                            (w=1440, clip=true)
B8b44   frame  Desktop — Dark                             (w=1440, clip=true)
j9W3K   frame  Tablet — Light                             (w=768, clip=true)
eWv5M   frame  Tablet — Dark                              (w=768, clip=true)
InLbm   frame  Mobile — Light                             (w=390, clip=true)
Qg2me   frame  Mobile — Dark                              (w=390, clip=true)
T3NKG   frame  Desktop — Light                            (w=1440, clip=true)
V3HSo   frame  Desktop — Dark                             (w=1440, clip=true)
l0DXND  frame  Tablet — Light                             (w=768, clip=true)
EpyDj   frame  Tablet — Dark                              (w=768, clip=true)
nP4tQ   frame  Mobile — Light                             (w=390, clip=true)
xTTBD   frame  Mobile — Dark                              (w=390, clip=true)
```

Note: the `clip=true` markers above are reproduced from the raw read; the root
screen frames (`Desktop/Tablet/Mobile — Light/Dark`) report `clip=true`, while
most documentation roots report `clip=undefined`. `vAQdH` is the only
non-screen root that reported `clip=true`.

## Reusable masters (`reusable === true`, 82 total, raw names)

```text
Theme Switch Preview [frame]
Asset Icon Tile [frame]
Button [frame]
Icon Button [frame]
Toggle [frame]
Toggle Group [frame]
Text Input [frame]
Textarea [frame]
Number Input [frame]
Checkbox [frame]
Radio [frame]
Switch [frame]
Slider [frame]
Select [frame]
Option [frame]
Select Popup [frame]
Multi Select [frame]
Date Input [frame]
Calendar Day [frame]
Calendar [frame]
Pin Input [frame]
File Upload [frame]
Color Picker [frame]
Color Popup [frame]
Rating [frame]
Editable [frame]
Field [frame]
Radio Group [frame]
Date Picker [frame]
Link [frame]
Nav Item [frame]
Brand [frame]
Breadcrumbs [frame]
Sidebar Item [frame]
Top Navigation [frame]
Tab [frame]
Accordion Item [frame]
Menu Item [frame]
Menu [frame]
Step [frame]
Tree Item [frame]
Carousel [frame]
Pagination [frame]
Context Menu [frame]
Icon [frame]
Avatar [frame]
Card [frame]
Card Plain [frame]
Card Compact [frame]
Statistic [frame]
List Item [frame]
Timeline Item [frame]
Table Row [frame]
List [frame]
Timeline [frame]
Data Table [frame]
Clipboard [frame]
Code Block [frame]
Scroll Area [frame]
Splitter [frame]
Media Placeholder [frame]
QR Code [frame]
Divider [rectangle]
Tooltip [frame]
Popover [frame]
Hover Card [frame]
Dialog [frame]
Alert Dialog [frame]
Drawer [frame]
Sheet [frame]
Floating Panel [frame]
Tour [frame]
Alert [frame]
Toast [frame]
Badge [frame]
Tag [frame]
Progress [frame]
Progress Ring [frame]
Skeleton [rectangle]
Spinner [frame]
Empty State [frame]
Status Indicator [frame]
```

## Theme contexts

- `GetVariables().themes` (document theme axes): `{ "theme": ["light", "dark"] }`.
- Explicit node `theme` property usage: `{ "theme": "light" }` on 115 nodes,
  `{ "theme": "dark" }` on 116 nodes (231 total).
- `GetVariables().variables` count: `587`.
- No other theme axes were returned.

## `ctx.problems` (clipping / collapsed layout)

- Count: `0`.
- Entries: `[]`.

## Scope note

Task 3 Steps 1, 2, 4 and 5 (GPT code-system audit, evidence verification,
structural review and state/commit) are owned by the `deepseek/deepseek-flash`
orchestrator and are not recorded here. This file contains only the raw
read-only baseline facts for the copied artifact.
