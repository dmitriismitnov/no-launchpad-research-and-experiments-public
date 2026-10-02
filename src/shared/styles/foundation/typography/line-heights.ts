import { defineTokens, } from "@pandacss/dev";

/**
 * Line height foundation.
 * Declares no system axis. Unitless ratios so a component can pair them with
 * any font size without recalculating.
 * Values follow Pen `Foundation — Typography` (01 Foundation): 1.15 / 1.4 / 1.6.
 * `snug` is a retained legacy alias for the pre-migration name of the Pen
 * `normal` step (1.4); it resolves identically and is documented here rather
 * than being silently dropped, so old consumers keep a meaningful token.
 */
export const lineHeights = defineTokens.lineHeights({
    tight: { value: 1.15, },
    snug: { value: 1.4, },
    normal: { value: 1.4, },
    relaxed: { value: 1.6, },
});
