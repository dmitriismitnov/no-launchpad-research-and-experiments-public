import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Scroll Area visual projection. Slots: root / viewport.
 *
 * A clipped surface with a styled scrollbar region. The approach is CSS-only:
 * the root paints the boundary and clips, the viewport owns real `overflow-y:
 * auto` scrolling and styles the platform scrollbar through the
 * `::-webkit-scrollbar` pseudo-elements (Chrome/Safari) and the standard
 * `scrollbar-width` / `scrollbar-color` pair (Firefox). There is no JavaScript
 * scrollbar simulation.
 *
 * Pen `pHjwJ` (master) / `EbeiJ` (documentation): named parts `root · viewport ·
 * content · track · thumb`; state contract `default · hover · dragging ·
 * focus-visible`. Resolved roles:
 * - root fill `surface/raised` -> `semantic.surface.raised`
 * - root stroke `border/subtle` -> `semantic.border.subtle`
 * - scrollbar thumb `border/strong` -> `semantic.border.strong`
 * - viewport focus ring `focus/ring` (2px) -> `semantic.focus.ring`
 *
 * Pen's `vertical · horizontal / with inset / always visible / on hover`
 * variants and the `hover` / `dragging` states need new public props or a
 * JavaScript scrollbar; the content text role is a consumer concern (the recipe
 * sets no viewport colour). They are recorded BLOCKED, not implemented.
 *
 * Approximations: Pen's scrollbar is a 10px track with a 4px inset thumb; the
 * webkit thumb reproduces that with a 3px transparent border and
 * `background-clip: padding-box`. Pen pads its content 14px; the scale has no
 * `x7`, so `x6` (12px) is used. Pen fixes the surface at 260x170; the viewport is
 * height-constrained by the consumer instead (see the component's `maxHeight`).
 */
export const scrollAreaRecipe = defineSlotRecipe({
    className: "scrollArea",
    slots: [ "root", "viewport", ],

    base: {
        root: {
            overflow: "hidden",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.raised",
        },

        viewport: {
            overflowY: "auto",
            padding: "x6",
            scrollbarWidth: "thin",
            scrollbarColor: "{colors.semantic.border.strong} transparent",
            "&::-webkit-scrollbar": {
                width: "x5",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: "transparent",
                borderRadius: "9999px",
                backgroundColor: "semantic.border.strong",
                backgroundClip: "padding-box",
            },
            "&:focus-visible": {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "-2px",
                outlineColor: "semantic.focus.ring",
            },
        },
    },
});

export const scrollAreaPreset = definePreset({
    name: "@no-launchpad/scroll-area",
    theme: { slotRecipes: { scrollArea: scrollAreaRecipe, }, },
});
