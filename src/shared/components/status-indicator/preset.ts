import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Status Indicator visual projection. Slots: root / dot / label.
 *
 * The dot paints from the same tone roles as Badge; the label reads the muted
 * foreground role.
 */
export const statusIndicatorRecipe = defineSlotRecipe({
    className: "statusIndicator",
    slots: [ "root", "dot", "label", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x3",
        },

        dot: {
            flexShrink: "0",
            width: "x4",
            height: "x4",
            borderRadius: "full",
            backgroundColor: "semantic.common.600.background",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        tone: {
            neutral: {},
            positive: { dot: { backgroundColor: "semantic.positive.600.background", }, },
            negative: { dot: { backgroundColor: "semantic.negative.600.background", }, },
            brand: { dot: { backgroundColor: "semantic.brand.600.background", }, },
        },
    },

    defaultVariants: { tone: "neutral", },
});

export const statusIndicatorPreset = definePreset({
    name: "@no-launchpad/status-indicator",
    theme: { slotRecipes: { statusIndicator: statusIndicatorRecipe, }, },
});
