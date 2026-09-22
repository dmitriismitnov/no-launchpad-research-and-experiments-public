import { defineTokens, } from "@pandacss/dev";

/**
 * Color foundation.
 * Declares the `theme` system axis through `_light` / `_dark` conditions.
 * Color names are system roles, never component parts or CSS properties.
 * Every role is a static theme pair that references `staticPalette`.
 */
export const themeConditions = {
    light: '[data-theme="light"] &',
    dark: '[data-theme="dark"] &',
};

const pair = (light: string, dark: string) => ( {
    light: { value: `{colors.${light}}`, },
    dark: { value: `{colors.${dark}}`, },
} );

export const roles = defineTokens.colors({
    surface: {
        base: pair("neutral.50", "neutral.950"),
        raised: pair("neutral.100", "neutral.900"),
    },
    ink: {
        strong: pair("neutral.800", "neutral.200"),
        soft: pair("neutral.500", "neutral.400"),
    },
    line: {
        strong: pair("neutral.800", "neutral.600"),
        soft: pair("neutral.300", "neutral.700"),
    },
    accent: {
        base: pair("brand.500", "brand.400"),
        deep: pair("brand.800", "brand.700"),
    },
    status: {
        danger: pair("danger.700", "danger.300"),
    },
});
