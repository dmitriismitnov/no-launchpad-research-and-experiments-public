import { defineTokens, } from "@pandacss/dev";

/**
 * Line height foundation.
 * Declares no system axis. Unitless ratios so a component can pair them with
 * any font size without recalculating.
 */
export const lineHeights = defineTokens.lineHeights({
    tight: { value: 1.2, },
    snug: { value: 1.4, },
    normal: { value: 1.5, },
    relaxed: { value: 1.75, },
});
