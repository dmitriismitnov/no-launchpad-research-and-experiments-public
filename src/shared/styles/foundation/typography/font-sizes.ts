import { defineTokens, } from "@pandacss/dev";

/**
 * Font size foundation.
 * Declares no system axis. Typography is not theme-dependent in v1.
 * Only reusable, non-component roles live here; component-owned sizes stay in
 * the component preset.
 */
export const fontSizes = defineTokens.fontSizes({
    xs: { value: "0.75rem", },
    sm: { value: "0.875rem", },
    md: { value: "1rem", },
    lg: { value: "1.25rem", },
    xl: { value: "1.5rem", },
});
