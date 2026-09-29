import { defineTokens, } from "@pandacss/dev";

/**
 * Font weight foundation.
 * Declares no system axis.
 */
export const fontWeights = defineTokens.fontWeights({
    regular: { value: 400, },
    medium: { value: 500, },
    semibold: { value: 600, },
    bold: { value: 700, },
});
