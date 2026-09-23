/**
 * WCAG color contrast utilities.
 *
 * Standalone helpers for tests, Storybook galleries and tooling. They are not
 * part of the design-system layer and do not depend on PandaCSS.
 */

/**
 * Parses a `#RRGGBB` hex color into its three sRGB channels (0–255).
 *
 * @example
 * hexToRgb("#4A9FD8"); // [74, 159, 216]
 * hexToRgb("#000000"); // [0, 0, 0]
 */
export const hexToRgb = (hex: string): [ number, number, number, ] => {
    const value = hex.replace("#", "");

    return [
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16),
    ];
};

const channelToLinear = (channel: number) => {
    const normalized = channel / 255;

    return normalized <= 0.03928
        ? normalized / 12.92
        : ( ( normalized + 0.055 ) / 1.055 ) ** 2.4;
};

/**
 * Computes the WCAG relative luminance of a `#RRGGBB` color.
 * The result is a number from `0` (black) to `1` (white).
 *
 * @example
 * relativeLuminance("#FFFFFF"); // 1
 * relativeLuminance("#000000"); // 0
 */
export const relativeLuminance = (hex: string): number => {
    const [ r, g, b, ] = hexToRgb(hex);

    return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g)
        + 0.0722 * channelToLinear(b);
};

/**
 * Computes the WCAG contrast ratio between two `#RRGGBB` colors.
 * The result is a number from `1` (no contrast) to `21` (black on white).
 *
 * @example
 * contrastRatio("#000000", "#FFFFFF"); // 21
 * contrastRatio("#FFFFFF", "#FFFFFF"); // 1
 */
export const contrastRatio = (foreground: string, background: string): number => {
    const a = relativeLuminance(foreground);
    const b = relativeLuminance(background);
    const lighter = Math.max(a, b);
    const darker = Math.min(a, b);

    return ( lighter + 0.05 ) / ( darker + 0.05 );
};
