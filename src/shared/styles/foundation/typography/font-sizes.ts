import { defineTokens, } from "@pandacss/dev";

/**
 * Font size foundation.
 * Declares no system axis. Typography is not theme-dependent in v1.
 * Only reusable, non-component roles live here; component-owned sizes stay in
 * the component preset.
 */
export const fontSizes = defineTokens.fontSizes({
    heading: { value: "1.5rem", },
});
