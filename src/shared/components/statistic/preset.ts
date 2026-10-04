import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Statistic visual projection. Slots: root / label / value / delta /
 * deltaIcon / deltaText.
 *
 * A compact metric: a muted label, a prominent value and an optional delta line.
 * `tone` paints the value; `trend` paints the delta glyph and copy, which no
 * longer rely on `currentColor` inheritance from the delta frame.
 *
 * Pen `CjnzL` master / `gLCov` documentation / `FMXaz` anatomy bind the named
 * role layer; each role resolves to the closest semantic token:
 * - label text/tertiary -> semantic.text.tertiary (exact)
 * - value text/primary -> semantic.text.primary (exact)
 * - delta glyph text/secondary -> semantic.text.secondary (exact)
 * - delta copy text/primary -> semantic.text.primary (exact)
 * - trend up feedback/positive-fg -> positive.700.background (exact)
 * - trend down feedback/negative-fg -> negative.700.background (exact)
 * - brand -> brand.700.background (light exact; dark one step brighter)
 *
 * The named Foundation roles `feedback/positive-fg` and `feedback/negative-fg`
 * do not exist yet, so the value-equal matrix roles above are used and the
 * named feedback roles are recorded BLOCKED. Pen's `loading` and `disabled`
 * states and the `with icon` / `compact` variants are recorded BLOCKED too.
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
            color: "semantic.text.tertiary",
        },

        value: {
            fontFamily: "body",
            fontSize: "xl",
            fontWeight: "bold",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        delta: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
        },

        deltaIcon: {
            flexShrink: "0",
            color: "semantic.text.secondary",
        },

        deltaText: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },
    },

    variants: {
        tone: {
            neutral: { value: { color: "semantic.text.primary", }, },
            positive: { value: { color: "semantic.positive.700.background", }, },
            negative: { value: { color: "semantic.negative.700.background", }, },
            brand: { value: { color: "semantic.brand.700.background", }, },
        },
        trend: {
            neutral: {},
            up: {
                deltaIcon: { color: "semantic.positive.700.background", },
                deltaText: { color: "semantic.positive.700.background", },
            },
            down: {
                deltaIcon: { color: "semantic.negative.700.background", },
                deltaText: { color: "semantic.negative.700.background", },
            },
        },
    },

    defaultVariants: { tone: "neutral", trend: "neutral", },
});

export const statisticPreset = definePreset({
    name: "@no-launchpad/statistic",
    theme: { slotRecipes: { statistic: statisticRecipe, }, },
});
