import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Spinner visual projection: a rotating loader glyph.
 *
 * The component owns its rotation as a local `spin` keyframe pair. Reduced
 * motion stops the animation without swapping the glyph.
 */
export const spinnerRecipe = defineRecipe({
    className: "spinner",
    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
        width: "x12",
        height: "x12",
        color: "semantic.common.700.background",
        animation: "spin 1s linear infinite",
        "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
        },
    },
});

export const spinnerPreset = definePreset({
    name: "@no-launchpad/spinner",
    theme: {
        recipes: { spinner: spinnerRecipe, },
        keyframes: {
            spin: {
                from: { transform: "rotate(0deg)", },
                to: { transform: "rotate(360deg)", },
            },
        },
    },
});
