import { definePreset, defineTokens, } from "@pandacss/dev";

import { opacity, staticPalette, themeConditions, } from "./colors";
import { semanticColors, } from "./colors/semantic";
import { sizes, spacing, } from "./layout";
import { borderWidths, radii, } from "./shape";
import { fonts, fontSizes, fontWeights, } from "./typography";

/**
 * Foundation preset.
 * Owns primitive tokens, semantic tokens and the system conditions declared by
 * its fragments.
 */
export const foundationPreset = definePreset({
    name: "@no-launchpad/foundation",
    conditions: { extend: themeConditions, },
    theme: {
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
        }),
        semanticTokens: { colors: semanticColors, },
    },
});
