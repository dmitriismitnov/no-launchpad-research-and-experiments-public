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

`Card` renders a native `<article>`. It accepts native article attributes except `children`; Card owns the complete internal structure.

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

export type CardProps = Omit<ComponentProps<"article">, "children"> & {
    title: string;
    description?: string;
    media?: CardMedia;
    header?: CardHeader;
    footer?: CardFooter;
    actionButton?: ButtonProps;
};
```

`title` renders as an `h3`; callers must place Card in a document whose heading outline makes that level appropriate. `description` is ordinary descriptive text.

`media` is all-or-nothing: it requires both `src` and `alt`. Card renders it as an `<img>`. Without `media`, Card renders the local skeleton asset as `<img alt="">`; the skeleton is decorative.

`header` renders only when it has a label or icon. The label is a compact secondary marker. The icon uses the existing decorative `Icon` component.

`footer` renders only when it has a `primaryNote`, a `secondaryNote`, or `actionButton` is also present. `primaryNote` is visually dominant and left-aligned; `secondaryNote` is quieter and right-aligned.

`actionButton` is passed to a Card-created `Button`. Card supplies `size="sm"` before spreading the supplied props, so an explicit `actionButton.size` overrides that default. This deliberately reuses `ButtonProps` rather than creating a reduced Card-specific copy of Button's API.

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
- `media` has a 16:9 aspect ratio, clips image content, and uses the control radius. The skeleton's `currentColor` styling inherits its media-slot colour.
- `body` vertically arranges header, title, description, and footer with the spacing hierarchy of `Card / Catalog`.
- `footer` has a top divider and aligns present notes as a pair. An action button is in the same footer row after the note group without making Card interactive.
- Typography and colour belong to visual slots, not `root`; use the existing semantic `.text` and `.icon` projections where applicable.

## Behavior and Failure Boundaries

Card is static. It has no Card-level `onClick`, pointer or keyboard behavior, or hover/active/focus style contract. Native article attributes including `aria-label`, `id`, `data-*`, and `className` pass to the root article.

Card does not maintain image state. A supplied broken URL remains a normal broken `<img>`; it never switches to the skeleton. The skeleton is only the absence-of-media branch. No loading indicator, retry, or `aria-busy` state belongs to v1.

## Integration and Verification

Copy the existing SVG unchanged from `outputs/experiments/card-media-skeleton/card-media.skeleton.svg` to `src/shared/components/card/assets/card-media.skeleton.svg`; retain the experiment copy in `outputs/`. Vite imports the component-local file as an asset URL.

Register `cardPreset` with `componentPresetSources` in `src/shared/styles/index.ts`, then run `mise run gen`. Never hand-edit `src/shared/styled-system`.

Stories cover a reference-like catalog composition, a minimal title-only card, supplied media versus skeleton, an action-button footer, and light/dark shells. Tests prove the public render contract, recipe anatomy, no theme branches/shorthands, default-versus-overridden action-button sizing, and native article attribute forwarding.
