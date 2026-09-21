import { definePreset, } from "@pandacss/dev";

import { colors, themeConditions, } from "./colors";
import { shadowColors, } from "./effects";
import { sizes, spacing, } from "./layout";
import { borderWidths, radii, } from "./shape";
import { fonts, fontSizes, fontWeights, } from "./typography";

/**
 * Foundation preset.
 * Owns only tokens and the system conditions declared by its fragments.
 */
export const foundationPreset = definePreset({
    name: "@no-launchpad/foundation",
    conditions: { extend: themeConditions, },
    theme: {
        tokens: {
            colors: { ...colors, ...shadowColors, },
            spacing,
            sizes,
            radii,
            borderWidths,
            fontSizes,
            fontWeights,
            fonts,
        },
    },
});
