import { defineTokens, } from "@pandacss/dev";

/**
 * Primitive color palette (opaque layer).
 * Families are named by color only; a step is an immutable opaque value and
 * never changes with the theme. `.500` is the family pivot.
 *
 * Scales are generated from their pivots in OKLCH by
 * `outputs/experiments/semantic-color-foundation/tools/generate-palette.ts`.
 * See `outputs/experiments/semantic-color-foundation/notes/palette-rules.md`.
 */
export const PALETTE_STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ] as const;

export const PALETTE_FAMILIES = [ "neutral", "blue", "green", "red", "sky", "cyan", ] as const;

export type PaletteFamily = typeof PALETTE_FAMILIES[number];

export const paletteValues: Record<PaletteFamily, Record<number, string>> = {
    neutral: {
        50: "#FFFFFF",
        100: "#E9EBEE",
        200: "#D0D4DA",
        300: "#B0B5BE",
        400: "#888F98",
        500: "#676E78",
        600: "#535963",
        700: "#424851",
        800: "#33383F",
        900: "#212429",
        950: "#000000",
    },
    blue: {
        50: "#F7FFFF",
        100: "#DFF2FF",
        200: "#BDE5FF",
        300: "#96D3FF",
        400: "#6BB7EC",
        500: "#4A9FD8",
        600: "#2780B7",
        700: "#076293",
        800: "#02486E",
        900: "#062C43",
        950: "#031320",
    },
    green: {
        50: "#F7FFFB",
        100: "#DBF5E4",
        200: "#B5E9C9",
        300: "#87D7A7",
        400: "#51B981",
        500: "#1E9E63",
        600: "#00834A",
        700: "#006835",
        800: "#004E27",
        900: "#003119",
        950: "#01170A",
    },
    red: {
        50: "#FFFAF7",
        100: "#FFE1DA",
        200: "#FFC0B3",
        300: "#FF9584",
        400: "#E16353",
        500: "#C0392B",
        600: "#A61D12",
        700: "#8B0903",
        800: "#6D0B05",
        900: "#460D07",
        950: "#240604",
    },
    sky: {
        50: "#FAFFFF",
        100: "#E6F4FF",
        200: "#CEE9FF",
        300: "#B4DCFF",
        400: "#95C5F7",
        500: "#7FB3E8",
        600: "#5C8FC2",
        700: "#3F6C98",
        800: "#2A4C6F",
        900: "#182E43",
        950: "#07121E",
    },
    cyan: {
        50: "#F9FFFF",
        100: "#E8F7FE",
        200: "#D2F0FF",
        300: "#BDE9FF",
        400: "#A1D8F3",
        500: "#8FCBE8",
        600: "#68A3BE",
        700: "#457A92",
        800: "#2C5568",
        900: "#19323D",
        950: "#071319",
    },
};

const family = (values: Record<number, string>) =>
    Object.fromEntries(
        PALETTE_STEPS.map((step) => [ `${step}`, { value: values[step]!, }, ]),
    );

export const staticPalette = defineTokens.colors({
    palette: {
        neutral: family(paletteValues.neutral),
        blue: family(paletteValues.blue),
        green: family(paletteValues.green),
        red: family(paletteValues.red),
        sky: family(paletteValues.sky),
        cyan: family(paletteValues.cyan),
    },
});
