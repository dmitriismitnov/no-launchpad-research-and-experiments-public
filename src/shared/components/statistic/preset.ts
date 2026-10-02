import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Statistic visual projection. Slots: root / label / value / delta /
 * deltaIcon / deltaText.
 *
 * A compact metric: a muted label, a prominent value and an optional delta line.
 * `tone` paints the value; `trend` paints the delta and therefore the optional
 * trend glyph, which inherits `currentColor`.
 *
 * Pen references the newer role layer (`semantic/text/*`,
 * `semantic/feedback/*`). Each alias is resolved to the closest matrix token:
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - feedback/positive-fg -> positive.700.background (exact)
 * - feedback/negative-fg -> negative.700.background (exact)
 * - brand -> brand.700.background (light exact; dark one step brighter)
 *
 * Approximations: Pen uses font-size/2xl (32px) for the value; the foundation
 * tops out at `xl` (24px), so the value steps down one size. Pen tracking/wide
 * (0.6px at 12px) is approximated by the relative `wide` letter spacing.
 */
export const statisticRecipe = defineSlotRecipe({
    className: "statistic",
    slots: [ "root", "label", "value", "delta", "deltaIcon", "deltaText", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
            letterSpacing: "wide",
            color: "semantic.common.600.background",
        },

        value: {
            fontFamily: "body",
            fontSize: "xl",
            fontWeight: "bold",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        delta: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
            color: "semantic.common.600.background",
        },

        deltaIcon: {
            flexShrink: "0",
        },

        deltaText: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
        },
    },

    variants: {
        tone: {
            neutral: { value: { color: "semantic.common.50.text", }, },
            positive: { value: { color: "semantic.positive.700.background", }, },
            negative: { value: { color: "semantic.negative.700.background", }, },
            brand: { value: { color: "semantic.brand.700.background", }, },
        },
        trend: {
            neutral: { delta: { color: "semantic.common.600.background", }, },
            up: { delta: { color: "semantic.positive.700.background", }, },
            down: { delta: { color: "semantic.negative.700.background", }, },
        },
    },

    defaultVariants: { tone: "neutral", trend: "neutral", },
});

export const statisticPreset = definePreset({
    name: "@no-launchpad/statistic",
    theme: { slotRecipes: { statistic: statisticRecipe, }, },
});
