import { defineTokens, } from "@pandacss/dev";

/**
 * Radii foundation.
 * Declares no system axis. Values are expressed in rem.
 * Names are a neutral size scale, not component roles.
 */
export const radii = defineTokens.radii({
    sm: { value: "0.375rem", },
    md: { value: "0.625rem", },
    lg: { value: "1rem", },
    full: { value: "9999px", },
});
