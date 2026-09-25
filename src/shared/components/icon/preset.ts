import { definePreset, defineRecipe, } from "@pandacss/dev";

import { ICON_FONT_FAMILY, } from "./constants";

/**
 * Icon visual projection.
 *
 * Single-part anatomy: one root element carries the glyph, so a slot recipe
 * would add slots with no consumer.
 *
 * Colour is deliberately absent: an icon font paints with the element's
 * `color`, so the glyph inherits `currentColor` from whatever it sits in and
 * `Button` and others keep ownership of their own colour.
 */
export const iconRecipe = defineRecipe({
    className: "icon",
    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
        fontFamily: ICON_FONT_FAMILY,
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "1",
        // A glyph is an image, not text to select.
        userSelect: "none",
    },
    variants: {
        // Sizes reuse the shared `xN` scale. `fontSize` drives the glyph size;
        // the box matches it so the icon participates in layout predictably.
        size: {
            sm: { fontSize: "{sizes.x8}", width: "x8", height: "x8", },
            md: { fontSize: "{sizes.x10}", width: "x10", height: "x10", },
            lg: { fontSize: "{sizes.x12}", width: "x12", height: "x12", },
        },
    },
    defaultVariants: { size: "md", },
});

export const iconPreset = definePreset({
    name: "@no-launchpad/icon",
    theme: { recipes: { icon: iconRecipe, }, },
});
