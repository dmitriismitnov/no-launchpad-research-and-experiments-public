import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Status Indicator visual projection. Slots: root / dot / label.
 *
 * Pen `a4r4Y` master / `x8pveA` documentation: the neutral dot reads the
 * functional boundary role `border/strong`; the positive and negative dots read
 * `positive/700/background` and `negative/700/background`; the label reads
 * `text/secondary`. The `brand` tone is an INFO extension kept from the prior
 * slice (`brand/600/background`); Pen documents `warning` / `inactive` tones
 * that are recorded BLOCKED, not implemented here.
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
            backgroundColor: "semantic.border.strong",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },
    },

    variants: {
        tone: {
            neutral: {},
            positive: { dot: { backgroundColor: "semantic.positive.700.background", }, },
            negative: { dot: { backgroundColor: "semantic.negative.700.background", }, },
            brand: { dot: { backgroundColor: "semantic.brand.600.background", }, },
        },
    },

    defaultVariants: { tone: "neutral", },
});

export const statusIndicatorPreset = definePreset({
    name: "@no-launchpad/status-indicator",
    theme: { slotRecipes: { statusIndicator: statusIndicatorRecipe, }, },
});
