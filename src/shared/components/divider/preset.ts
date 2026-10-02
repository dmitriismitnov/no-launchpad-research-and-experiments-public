import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Divider visual projection.
 *
 * A single 1px rule. Paint comes from the quiet boundary role; orientation only
 * swaps the axis and never the colour.
 */
export const dividerRecipe = defineRecipe({
    className: "dividerRule",
    base: {
        flexShrink: "0",
        backgroundColor: "semantic.common.200.divider",
    },
    variants: {
        orientation: {
            horizontal: {
                width: "100%",
                height: "{borderWidths.thin}",
            },
            vertical: {
                width: "{borderWidths.thin}",
                height: "100%",
                alignSelf: "stretch",
            },
        },
    },
    defaultVariants: { orientation: "horizontal", },
});

// Named `dividerRule` because Panda already ships a `divider` pattern; the
// `divider` vocabulary is reserved for that pattern.
export const dividerPreset = definePreset({
    name: "@no-launchpad/divider",
    theme: { recipes: { dividerRule: dividerRecipe, }, },
});
