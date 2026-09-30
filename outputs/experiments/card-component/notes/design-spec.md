# Card v1 Design Specification

## Goal

Add a reusable, non-interactive `Card` component to the shared design system. It uses the `Card / Catalog` reference from `outputs/shared/pen-design-system-integration/design/design_raw_1.pen` as its visual source, while keeping the API independent of the reference's sensor-specific data.

## Scope

### Included

- One `Card` React component in `src/shared/components/card/`.
- A PandaCSS slot recipe and registration in the shared component preset.
- 16:9 media rendering with the existing SVG skeleton as the no-media state.
- Declarative props for title, description, header marker/icon, footer notes, and a Button-based footer action.
- Unit, composition, and Storybook coverage following Button conventions.

### Excluded

- `onClick`, hover, keyboard activation, links, or a clickable-card API.
- `children`, arbitrary ReactNode slots, compound subcomponents, and custom media renderers.
- Visual variants, size variants, responsive typography, loading states, and image-error fallbacks.
- A new image asset pipeline. The SVG remains a standalone component asset.

## Public API

`Card` renders a native `<article>`. It accepts native article attributes except `children` and `dangerouslySetInnerHTML`; Card owns the complete internal structure.

```ts
export type CardMedia = {
    src: string;
    alt: string;
};

export type CardHeader = {
    label?: string;
    icon?: IconName;
};

export type CardFooter = {
    primaryNote?: string;
    secondaryNote?: string;
};

export type CardProps = Omit<ComponentProps<"article">, "children" | "dangerouslySetInnerHTML"> & {
    title: string;
    description?: string;
    media?: CardMedia;
    header?: CardHeader;
    footer?: CardFooter;
    actionButton?: ButtonProps;
};
```

`title` renders as an `h3`; callers must place Card in a document whose heading outline makes that level appropriate. `description` is ordinary descriptive text.

`media` is all-or-nothing: it requires both `src` and `alt`. Supplied media renders as an `<img>` with the caller's `alt`. Without `media`, Card renders the bundled monochrome skeleton **inlined** (via a `?raw` import and `dangerouslySetInnerHTML`), not as an `<img alt="">`: an image boundary blocks `currentColor`, so the inlined form is what lets the skeleton inherit the media slot's colour in both themes. The skeleton wrapper is marked decorative with `aria-hidden`; the asset is a trusted, local, id-free constant.

Optional text is present only when it contains non-whitespace content. Blank strings (`""`, `"   "`) must not create a region, so a blank `description`, `header.label`, or footer note is treated as absent. `media.alt` is deliberately exempt: an empty `alt` is meaningful.

`header` renders only when it has a label or icon. The label is a compact secondary marker. The icon uses the existing decorative `Icon` component.

`footer` renders only when it has a `primaryNote`, a `secondaryNote`, or `actionButton` is also present. `primaryNote` is visually dominant and left-aligned; `secondaryNote` is quieter and right-aligned.

`actionButton` is passed to a Card-created `Button`. Card normalizes its size as `actionButton.size ?? "sm"`, so an explicit Button size wins while an explicit `undefined` retains Card's small default. This deliberately reuses `ButtonProps` rather than creating a reduced Card-specific copy of Button's API.

## Rendered Anatomy

The Panda recipe uses this internal anatomy:

```text
root
├── media
└── body
    ├── header
    ├── title
    ├── description
    └── footer
        ├── footerPrimary
        ├── footerSecondary
        └── actionButton
```

Only `root`, `media`, `body`, `title`, and supplied optional regions occur in the DOM. Empty header, description, footer-note, and action-button wrappers must not render.

## Visual Contract

- Match the reference's single light surface: padded root, thin semantic divider, surface radius, and soft shadow. Do not add public `tone` or `size` variants.
- Use only existing foundation and semantic tokens. Recipes must not branch on `_light` or `_dark`; semantic tokens own theme switching.
- `media` has a 16:9 aspect ratio, clips image content, and uses the control radius. The skeleton's `currentColor` styling inherits its media-slot colour, which is why the asset is inlined rather than loaded through an `<img>`.
- `body` vertically arranges header, title, description, and footer with the spacing hierarchy of `Card / Catalog`.
- `footer` has a top divider and anchors the note pair at opposite edges: `footerPrimary` at the start, `footerSecondary` at the end. The trailing group (secondary note and action button) packs to the end, so a lone secondary note stays at the trailing edge and a notes-plus-action footer keeps the secondary note adjacent to the action.
- Muted text (header marker, description, footer secondary note) uses `semantic.common.<step>.background` projections, mirroring the PEN reference. The semantic layer has no dedicated "quiet on surface" text role yet; substituting a `.text` step would select a foreground intended for a different surface.
- Typography and colour belong to visual slots, not `root`; use the existing semantic `.text` and `.icon` projections where applicable.

## Behavior and Failure Boundaries

Card is static: it creates no Card-level click, pointer or keyboard behavior, and has no hover/active/focus style contract. Supported native article attributes — including caller-owned event callbacks, `aria-label`, `id`, `data-*`, and `className` — pass to the root article. This is not a clickable-card API.

Card does not maintain image state. A supplied broken URL remains a normal broken `<img>`; it never switches to the skeleton. The skeleton is only the absence-of-media branch. No loading indicator, retry, or `aria-busy` state belongs to v1.

Blank optional text is treated as absent, so an empty or whitespace-only `description`, `header.label`, or footer note never creates an empty region or a divider with nothing under it. `media.alt` is exempt because an empty `alt` is meaningful.

## Integration and Verification

Copy the existing SVG unchanged from `outputs/experiments/card-media-skeleton/card-media.skeleton.svg` to `src/shared/components/card/assets/card-media.skeleton.svg`; retain the experiment copy in `outputs/`. Vite imports the component-local file as raw text (`?raw`), because the skeleton is inlined to inherit `currentColor`.

Register `cardPreset` with `componentPresetSources` in `src/shared/styles/index.ts`, then run `mise run gen`. Never hand-edit `src/shared/styled-system`.

Stories cover a reference-like catalog composition, a minimal title-only card, supplied media versus skeleton, an action-button footer, footer geometry, and light/dark shells. The supplied-media story uses a local square PNG fixture and verifies decoding, `object-fit: cover`, and exact fill of the 16:9 slot. Tests prove the public render contract, recipe anatomy, no theme branches/shorthands, visible light/dark token projection, default-versus-overridden action-button sizing (including `undefined`), and safe article attribute forwarding.
