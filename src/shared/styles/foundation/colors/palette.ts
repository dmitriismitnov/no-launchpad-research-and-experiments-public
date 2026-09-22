import { defineTokens, } from "@pandacss/dev";

/**
 * Static color palette (primitive layer).
 * Each family has the same fixed step set `50…950`; a step is an immutable
 * value and never changes with the theme. Roles reference these tokens.
 *
 * Values are anchored to the colors already used by roles/design and the gaps
 * are interpolated in OKLCH with monotonic lightness. See
 * `outputs/experiments/color-foundation-palette/notes/palette-rules.md`.
 */
export const PALETTE_STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ] as const;

const family = (values: Record<number, string>) =>
    Object.fromEntries(
        PALETTE_STEPS.map((step) => [ `${step}`, { value: values[step]!, }, ]),
    );

export const staticPalette = defineTokens.colors({
    neutral: family({
        50: "#FFFFFF",
        100: "#F7F8FA",
        200: "#F3F5F8",
        300: "#EDEFF2",
        400: "#A8B0BB",
        500: "#666666",
        600: "#4A5462",
        700: "#212831",
        800: "#1A1A1A",
        900: "#151A22",
        950: "#0D1016",
    }),
    brand: family({
        50: "#EFF8FF",
        100: "#DAEEFD",
        200: "#B2DAF7",
        300: "#88C5F1",
        400: "#5AB0EA",
        500: "#4A9FD8",
        600: "#3285C8",
        700: "#1E6BB8",
        800: "#1B5FA8",
        900: "#002754",
        950: "#000D2E",
    }),
    danger: family({
        50: "#FFF2F1",
        100: "#FFD9D6",
        200: "#FFA7A3",
        300: "#F87171",
        400: "#EA6360",
        500: "#DC554F",
        600: "#CE473E",
        700: "#C0392B",
        800: "#82170E",
        900: "#480000",
        950: "#2D0000",
    }),
});
