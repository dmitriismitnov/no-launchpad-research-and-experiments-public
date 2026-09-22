import { defineTokens, } from "@pandacss/dev";

/**
 * Border width foundation.
 * Declares no system axis. Border widths stay in px: they are a physical
 * line thickness, not a layout size. Names describe thickness, not scale index.
 */
export const borderWidths = defineTokens.borderWidths({
    none: { value: "0", },
    thin: { value: "1px", },
    thick: { value: "2px", },
});
