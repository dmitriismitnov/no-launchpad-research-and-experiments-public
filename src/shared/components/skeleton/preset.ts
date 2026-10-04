import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Skeleton visual projection: a muted block that stands in for content.
 *
 * Pen `qfUOu` master fills the block with `semantic/surface/sunken`
 * (neutral.100 light / neutral.950 dark); the shared recipe keeps that role.
 *
 * Size is intentionally not a variant. The defaults keep an unstyled Skeleton
 * visible; consumers set the real width and height through props, `className`
 * or `style`.
 */
export const skeletonRecipe = defineRecipe({
    className: "skeleton",
    base: {
        display: "block",
        flexShrink: "0",
        width: "100%",
        height: "x6",
        borderRadius: "sm",
        backgroundColor: "semantic.surface.sunken",
    },
});

export const skeletonPreset = definePreset({
    name: "@no-launchpad/skeleton",
    theme: { recipes: { skeleton: skeletonRecipe, }, },
});
