// Palette generator for the semantic color foundation experiment.
// Builds regular 50-950 scales around a pivot (.500) in OKLCH.
// Run: bun run generate-palette.ts

type Rgb = { r: number; g: number; b: number; };
type Oklch = { l: number; c: number; h: number; };

const STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ];

// Fixed regular lightness targets: near-white at 50, near-black at 950.
// The pivot shifts only the middle of the scale.
const L_FIXED: Record<number, number> = {
    50: 1.0,
    100: 0.945,
    200: 0.885,
    300: 0.805,
    400: 0.695,
    500: 0.60,
    600: 0.515,
    700: 0.435,
    800: 0.36,
    900: 0.27,
    950: 0.18,
};

// How strongly the pivot's lightness pulls each step; 1 at .500, 0 at extremes.
const L_WEIGHT: Record<number, number> = {
    50: 0,
    100: 0.10,
    200: 0.25,
    300: 0.50,
    400: 0.75,
    500: 1,
    600: 0.80,
    700: 0.55,
    800: 0.32,
    900: 0.15,
    950: 0,
};

// Chroma multiplier per step: saturated around the pivot, muted at extremes.
const C_FACTOR: Record<number, number> = {
    50: 0.12,
    100: 0.25,
    200: 0.50,
    300: 0.75,
    400: 0.92,
    500: 1,
    600: 1,
    700: 0.92,
    800: 0.75,
    900: 0.50,
    950: 0.30,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toLinear = (channel: number) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const toSrgb = (channel: number) =>
    channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;

const hexToRgb = (hex: string): Rgb => {
    const value = hex.replace("#", "");
    return {
        r: parseInt(value.slice(0, 2), 16) / 255,
        g: parseInt(value.slice(2, 4), 16) / 255,
        b: parseInt(value.slice(4, 6), 16) / 255,
    };
};

const rgbToHex = ({ r, g, b, }: Rgb): string => {
    const part = (channel: number) =>
        Math.round(clamp(channel, 0, 1) * 255).toString(16).padStart(2, "0").toUpperCase();
    return `#${part(r)}${part(g)}${part(b)}`;
};

const rgbToOklch = (rgb: Rgb): Oklch => {
    const l = toLinear(rgb.r);
    const m = toLinear(rgb.g);
    const s = toLinear(rgb.b);

    const l_ = Math.cbrt(0.4122214708 * l + 0.5363325363 * m + 0.0514459929 * s);
    const m_ = Math.cbrt(0.2119034982 * l + 0.6806995451 * m + 0.1073969566 * s);
    const s_ = Math.cbrt(0.0883024619 * l + 0.2817188376 * m + 0.6299787005 * s);

    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

    return { l: L, c: Math.sqrt(a * a + b * b), h: Math.atan2(b, a), };
};

const oklchToRgb = ({ l, c, h, }: Oklch): Rgb => {
    const a = c * Math.cos(h);
    const b = c * Math.sin(h);

    const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s_ = (l - 0.0894841775 * a - 1.2914855480 * b) ** 3;

    const lr = 4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
    const lg = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
    const lb = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.7076147010 * s_;

    return { r: toSrgb(lr), g: toSrgb(lg), b: toSrgb(lb), };
};

const oklchToHex = (color: Oklch) => rgbToHex(oklchToRgb(color));

const scaleFromPivot = (pivot: Oklch): Record<number, string> =>
    Object.fromEntries(
        STEPS.map((step) => {
            const lightness = L_FIXED[step]! + ( pivot.l - L_FIXED[500]! ) * L_WEIGHT[step]!;
            const color: Oklch = {
                l: clamp(lightness, 0, 1),
                c: pivot.c * C_FACTOR[step]!,
                h: pivot.h,
            };
            return [ step, oklchToHex(color), ];
        }),
    );

// Pivots for .500. Neutral is a cool mid derived from the design's cool-neutral
// ramp (PEN uses #666666 for mid text and #4A5462/#A8B0BB for cool neutrals).
const PIVOTS: Record<string, Oklch | string> = {
    neutral: { l: 0.535, c: 0.018, h: ( 258 * Math.PI ) / 180, },
    blue: "#4A9FD8",
    green: "#1E9E63",
    red: "#C0392B",
    sky: "#7FB3E8",
    cyan: "#8FCBE8",
};

const resolvePivot = (pivot: Oklch | string): Oklch =>
    typeof pivot === "string" ? rgbToOklch(hexToRgb(pivot)) : pivot;

// The achromatic family must span the full range so foreground pairs can always
// reach the WCAG thresholds on mid-lightness backgrounds.
const OVERRIDES: Record<string, Record<number, string>> = {
    neutral: { 50: "#FFFFFF", 950: "#000000", },
};

const lines: string[] = [];

for ( const [ name, pivot, ] of Object.entries(PIVOTS) ) {
    const scale = { ...scaleFromPivot(resolvePivot(pivot)), ...OVERRIDES[name], };
    lines.push(`    ${name}: family({`);
    for ( const step of STEPS ) {
        lines.push(`        ${step}: "${scale[step]}",`);
    }
    lines.push("    }),");
}

console.log(lines.join("\n"));
