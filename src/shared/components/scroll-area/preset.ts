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
 * Pen references the newer role layer (`semantic/surface/raised`,
 * `semantic/border/*`, `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (the Pen thumb colour)
 * - text/tertiary -> common.600.background (exact)
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
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
        },

        viewport: {
            overflowY: "auto",
            padding: "x6",
            scrollbarWidth: "thin",
            scrollbarColor: "{colors.semantic.common.50.border.strong} transparent",
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
                backgroundColor: "semantic.common.50.border.strong",
                backgroundClip: "padding-box",
            },
            "&:focus-visible": {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "-2px",
                outlineColor: "semantic.brand.500.background",
            },
        },
    },
});

export const scrollAreaPreset = definePreset({
    name: "@no-launchpad/scroll-area",
    theme: { slotRecipes: { scrollArea: scrollAreaRecipe, }, },
});
