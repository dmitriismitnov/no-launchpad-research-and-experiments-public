import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Badge visual projection. Slots: root / dot / label.
 * Colours come from the semantic layer; the recipe never branches on theme.
 */
export const badgeRecipe = defineSlotRecipe({
    className: "badge",
    slots: [ "root", "dot", "label", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x3",
            paddingBlock: "x2",
            paddingInline: "x4",
            borderRadius: "full",
        },

        dot: {
            flexShrink: "0",
            width: "x3",
            height: "x3",
            borderRadius: "full",
            backgroundColor: "semantic.common.600.background",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
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

export const badgePreset = definePreset({
    name: "@no-launchpad/badge",
    theme: { slotRecipes: { badge: badgeRecipe, }, },
});
