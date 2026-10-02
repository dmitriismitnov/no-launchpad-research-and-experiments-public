import { definePreset, defineTokens, } from "@pandacss/dev";

import { opacity, staticPalette, themeConditions, } from "./colors";
import { semanticColors, } from "./colors/semantic";
import { sizes, spacing, } from "./layout";
import { borderWidths, radii, } from "./shape";
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights, } from "./typography";

/**
 * Foundation preset.
 * Owns primitive tokens, semantic tokens and the system conditions declared by
 * its fragments.
 */
export const foundationPreset = definePreset({
    name: "@no-launchpad/foundation",
    conditions: { extend: themeConditions, },
    theme: {
        // Pen composes desktop / tablet / mobile frames explicitly, so the
        // system exposes min-width breakpoints for responsive layout.
        breakpoints: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        // Only the primitive palette families are exposed as runtime
        // `colorPalette` values; semantic colors are consumed through explicit
        // tokens.
        colorPalette: { include: [ "palette.*", ], },
        tokens: defineTokens({
            colors: { ...staticPalette, },
            opacity,
            spacing,
            sizes,
            radii,
            borderWidths,
            fontSizes,
            fontWeights,
            fonts,
            letterSpacings,
            lineHeights,
        }),
        semanticTokens: { colors: semanticColors, },
    },
});
