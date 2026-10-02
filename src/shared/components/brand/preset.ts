import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Brand visual projection. Slots: root / mark / wordmark.
 *
 * The product lockup: a solid rounded mark followed by the wordmark. The mark is
 * a simple shape, not a glyph, so the lockup renders without depending on the
 * icon set.
 *
 * Pen references the newer role layer (`semantic/action/*`, `semantic/text/*`):
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 *
 * Approximations: Pen draws a 24px mark (`x12`, exact) with `radius/sm` (exact)
 * and a 16px wordmark gap (`x4`, exact). The wordmark uses the body family at
 * `md` semibold with tight tracking, exactly as the master.
 */
export const brandRecipe = defineSlotRecipe({
    className: "brand",
    slots: [ "root", "mark", "wordmark", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            color: "semantic.common.50.text",
        },

        mark: {
            flexShrink: "0",
            width: "x12",
            height: "x12",
            borderRadius: "sm",
            backgroundColor: "semantic.brand.700.background",
        },

        wordmark: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "tight",
            color: "semantic.common.50.text",
        },
    },
});

export const brandPreset = definePreset({
    name: "@no-launchpad/brand",
    theme: { slotRecipes: { brand: brandRecipe, }, },
});
