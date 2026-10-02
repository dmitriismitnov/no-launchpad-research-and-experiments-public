import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Progress visual projection. Slots: root / track / fill.
 *
 * A horizontal bar. The fill width is the only runtime value; it is set by the
 * component as an inline percentage so the recipe never branches on data.
 *
 * Pen references `semantic/surface/sunken` for the track and
 * `semantic/action/primary-bg` for the fill:
 * - sunken -> common.100.background (light exact; dark one step, the Skeleton /
 *   Spinner convention)
 * - primary-bg is green.700 in both themes; brand.700.background matches light
 *   and resolves to the brighter green.300 in dark, which keeps contrast on the
 *   sunken dark track.
 * - radius/pill has no foundation token; `9999px` is the equivalent.
 */
export const progressRecipe = defineSlotRecipe({
    className: "progress",
    slots: [ "root", "track", "fill", ],

    base: {
        root: {
            width: "100%",
        },

        track: {
            width: "100%",
            height: "x3",
            overflow: "hidden",
            borderRadius: "9999px",
            backgroundColor: "semantic.common.100.background",
        },

        fill: {
            height: "100%",
            borderRadius: "9999px",
            backgroundColor: "semantic.brand.700.background",
            transition: "width 200ms ease",
            "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
            },
        },
    },
});

export const progressPreset = definePreset({
    name: "@no-launchpad/progress",
    theme: { slotRecipes: { progress: progressRecipe, }, },
});
