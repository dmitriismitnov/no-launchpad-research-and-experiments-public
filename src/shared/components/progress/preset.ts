import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Progress visual projection. Slots: root / track / fill.
 *
 * A horizontal bar. The fill width is the only runtime value; it is set by the
 * component as an inline percentage so the recipe never branches on data.
 *
 * Pen `tTGQi` master names the resolved roles:
 * - surface/sunken -> semantic.surface.sunken (track; neutral.100 light /
 *   neutral.950 dark)
 * - action/primary-bg -> semantic.action.primary.background (fill; green.700 in
 *   both themes)
 * - radius/pill -> semantic radius `full` (`9999px`), value-equal to the prior
 *   literal.
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
            borderRadius: "full",
            backgroundColor: "semantic.surface.sunken",
        },

        fill: {
            height: "100%",
            borderRadius: "full",
            backgroundColor: "semantic.action.primary.background",
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
