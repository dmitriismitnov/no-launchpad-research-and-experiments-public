import { defineTokens, } from "@pandacss/dev";

/**
 * Primitive color palette (opaque layer).
 *
 * Values are ported from the Pen design system (Pen is the source of truth;
 * see outputs/experiments/design-system-to-code/tools/port-foundation.ts).
 * `base` is the non-stepped white/black primitive.
 */
export const PALETTE_STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ] as const;

export const PALETTE_FAMILIES = [ "neutral", "blue", "green", "red", "sky", "cyan", ] as const;

export type PaletteFamily = typeof PALETTE_FAMILIES[number];

export const paletteValues: Record<PaletteFamily, Record<number, string>> = {
    neutral: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B",
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
        950: "#020617",
    },
    blue: {
        50: "#EFF6FF",
        100: "#DBEAFE",
        200: "#BFDBFE",
        300: "#93C5FD",
        400: "#60A5FA",
        500: "#3B82F6",
        600: "#2563EB",
        700: "#1D4ED8",
        800: "#1E40AF",
        900: "#1E3A8A",
        950: "#172554",
    },
    green: {
        50: "#F0FDF4",
        100: "#DCFCE7",
        200: "#BBF7D0",
        300: "#86EFAC",
        400: "#4ADE80",
        500: "#22C55E",
        600: "#16A34A",
        700: "#15803D",
        800: "#166534",
        900: "#14532D",
        950: "#052E16",
    },
    red: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
        950: "#450A0A",
    },
    sky: {
        50: "#F0F9FF",
        100: "#E0F2FE",
        200: "#BAE6FD",
        300: "#7DD3FC",
        400: "#38BDF8",
        500: "#0EA5E9",
        600: "#0284C7",
        700: "#0369A1",
        800: "#075985",
        900: "#0C4A6E",
        950: "#082F49",
    },
    cyan: {
        50: "#ECFEFF",
        100: "#CFFAFE",
        200: "#A5F3FC",
        300: "#67E8F9",
        400: "#22D3EE",
        500: "#06B6D4",
        600: "#0891B2",
        700: "#0E7490",
        800: "#155E75",
        900: "#164E63",
        950: "#083344",
    },
};

const paletteBase = { white: "#FFFFFF", black: "#000000", } as const;

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
        base: {
            white: { value: paletteBase.white, },
            black: { value: paletteBase.black, },
        },
    },
});
