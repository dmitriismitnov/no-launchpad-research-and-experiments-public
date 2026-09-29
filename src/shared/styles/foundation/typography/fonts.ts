import { defineTokens, } from "@pandacss/dev";

/**
 * Font family foundation.
 * Declares no system axis.
 */
export const fonts = defineTokens.fonts({
    body: { value: "Inter, system-ui, sans-serif", },
});
