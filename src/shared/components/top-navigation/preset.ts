import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Top Navigation visual projection. Slots: root / brand / nav / spacer /
 * actions.
 *
 * A full-width horizontal bar. It is a layout surface, not a router: the brand,
 * the nav entries and the trailing actions are consumer slots, so it composes
 * existing components without owning navigation behaviour.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/border/*`):
 * - surface/base -> common.50.background (exact, both themes)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 *
 * Approximations: Pen's bar is 64px tall, which the `xN` scale does not reach, so
 * the height is the literal `64px`. Side padding is `x8` (16px, exact) and the
 * major groups gap 24px (`x12`, exact); nav entries gap 4px (`x2`, exact). Pen
 * strokes all four edges and lets a screen override the fill; `surface` exposes
 * that as `base` / `transparent`. The mobile menu trigger and search/account
 * variants from the master are out of scope.
 */
export const topNavigationRecipe = defineSlotRecipe({
    className: "topNavigation",
    slots: [ "root", "brand", "nav", "spacer", "actions", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            gap: "x12",
            width: "100%",
            height: "64px",
            paddingInline: "x8",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
        },

        brand: {
            flexShrink: "0",
        },

        nav: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
        },

        spacer: {
            flex: "1",
            minWidth: "0",
        },

        actions: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            flexShrink: "0",
        },
    },

    variants: {
        // Pen paints the bar with the base surface and lets a screen drop the
        // fill while keeping the boundary. `transparent` keeps that override.
        surface: {
            base: {},
            transparent: { root: { backgroundColor: "transparent", }, },
        },
    },

    defaultVariants: { surface: "base", },
});

export const topNavigationPreset = definePreset({
    name: "@no-launchpad/top-navigation",
    theme: { slotRecipes: { topNavigation: topNavigationRecipe, }, },
});
