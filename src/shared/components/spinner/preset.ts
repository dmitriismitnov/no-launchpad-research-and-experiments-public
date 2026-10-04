import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Spinner visual projection: a rotating loader glyph.
 *
 * Pen `lpijt` master paints the glyph with `semantic/text/secondary`
 * (neutral.700 light / neutral.300 dark) — value-equal to the prior
 * `common.700.background` alias.
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
        color: "semantic.text.secondary",
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
