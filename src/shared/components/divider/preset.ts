import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Divider visual projection.
 *
 * Pen `vZUUG` master / `Uyuv7` documentation: a single 1px rule painted from the
 * quiet divider role `common/200/divider`; orientation only swaps the axis and
 * never the colour. Pen documents `subtle` / `strong` and a labelled variant,
 * plus decorative-vs-separator ARIA; those are recorded BLOCKED, not implemented
 * here.
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
