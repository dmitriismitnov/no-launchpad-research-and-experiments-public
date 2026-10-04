import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Progress Ring visual projection. Slots: root / svg / track / arc.
 *
 * A circular progress indicator drawn with two SVG circles: a full track and an
 * arc whose `strokeDasharray` / `strokeDashoffset` are set by the component from
 * the current value. The whole svg is rotated so the arc starts at the top.
 *
 * Pen `yz7HH` master names the resolved roles; both resolve through the same
 * tokens as the horizontal Progress bar:
 * - surface/sunken -> semantic.surface.sunken (track stroke; neutral.100 light
 *   / neutral.950 dark)
 * - action/primary-bg -> semantic.action.primary.background (arc stroke;
 *   green.700 in both themes)
 */
export const progressRingRecipe = defineSlotRecipe({
    className: "progressRing",
    slots: [ "root", "svg", "track", "arc", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
        },

        svg: {
            display: "block",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
        },

        track: {
            fill: "none",
            stroke: "semantic.surface.sunken",
        },

        arc: {
            fill: "none",
            stroke: "semantic.action.primary.background",
            strokeLinecap: "round",
        },
    },
});

export const progressRingPreset = definePreset({
    name: "@no-launchpad/progress-ring",
    theme: { slotRecipes: { progressRing: progressRingRecipe, }, },
});
