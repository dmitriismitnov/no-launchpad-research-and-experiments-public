import { defineTokens, } from "@pandacss/dev";

/**
 * Letter spacing foundation.
 * Declares no system axis. Relative units so tracking stays proportional.
 */
export const letterSpacings = defineTokens.letterSpacings({
    tight: { value: "-0.01em", },
    normal: { value: "0", },
    wide: { value: "0.02em", },
});
