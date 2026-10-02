import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Progress Ring visual projection. Slots: root / svg / track / arc.
 *
 * A circular progress indicator drawn with two SVG circles: a full track and an
 * arc whose `strokeDasharray` / `strokeDashoffset` are set by the component from
 * the current value. The whole svg is rotated so the arc starts at the top.
 *
 * Pen references `semantic/surface/sunken` for the track and
 * `semantic/action/primary-bg` for the arc; both resolve through the same
 * tokens as the horizontal Progress bar.
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
            stroke: "semantic.common.100.background",
        },

        arc: {
            fill: "none",
            stroke: "semantic.brand.700.background",
            strokeLinecap: "round",
        },
    },
});

export const progressRingPreset = definePreset({
    name: "@no-launchpad/progress-ring",
    theme: { slotRecipes: { progressRing: progressRingRecipe, }, },
});
