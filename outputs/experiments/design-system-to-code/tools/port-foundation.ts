/**
 * One-off generator: ports the Pen design system color foundation into code.
 *
 * Source of truth (read-only): the Pen document
 * `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`.
 *
 * Produces:
 * - `src/shared/styles/foundation/colors/palette.ts`
 * - `src/shared/styles/foundation/colors/semantic.ts`
 *
 * The generated files are committed as source; this script is the record of the
 * mapping and can be re-run if Pen changes.
 */
import { readFileSync, writeFileSync, } from "node:fs";

const ROOT =
    "/Users/es/Shared/vm/no-vm-shared/no-launchpad/no-launchpad-landing";
const PEN = `${ROOT}/outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`;

const doc = JSON.parse(readFileSync(PEN, "utf8")) as {
    variables: Record<string, { value: unknown; }>;
};

const V = doc.variables;

const STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ];
const FAMILIES = [ "neutral", "blue", "green", "red", "sky", "cyan", ];
const GROUPS = [ "common", "occasional", "rare", "brand", "positive", "negative", ];

const toRef = (value: string): string =>
    value.startsWith("$palette/")
        ? `{colors.palette.${value.slice("$palette/".length).split("/").join(".")}}`
        : value;

const themeValue = (name: string, theme: "light" | "dark"): string => {
    const entry = V[name];
    if (entry === undefined) {
        throw new Error(`Missing Pen variable: ${name}`);
    }

    const list = entry.value as { value: string; theme: { theme: string; }; }[];
    const found = list.find((item) => item.theme?.theme === theme) ?? list[0]!;
    return toRef(found.value);
};

// ---------- palette.ts ----------

const paletteBody = FAMILIES.map((family) => {
    const rows = STEPS.map((step) => {
        const value = V[`palette/${family}/${step}`]!.value as string;
        return `        ${step}: "${value}",`;
    }).join("\n");
    return `    ${family}: {\n${rows}\n    },`;
}).join("\n");

const paletteFile = `import { defineTokens, } from "@pandacss/dev";

/**
 * Primitive color palette (opaque layer).
 *
 * Values are ported from the Pen design system (Pen is the source of truth;
 * see outputs/experiments/design-system-to-code/tools/port-foundation.ts).
 * \`base\` is the non-stepped white/black primitive.
 */
export const PALETTE_STEPS = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, ] as const;

export const PALETTE_FAMILIES = [ "neutral", "blue", "green", "red", "sky", "cyan", ] as const;

export type PaletteFamily = typeof PALETTE_FAMILIES[number];

export const paletteValues: Record<PaletteFamily, Record<number, string>> = {
${paletteBody}
};

const paletteBase = { white: "#FFFFFF", black: "#000000", } as const;

const family = (values: Record<number, string>) =>
    Object.fromEntries(
        PALETTE_STEPS.map((step) => [ \`\${step}\`, { value: values[step]!, }, ]),
    );

export const staticPalette = defineTokens.colors({
    palette: {
${FAMILIES.map((family) => `        ${family}: family(paletteValues.${family}),`).join("\n")}
        base: {
            white: { value: paletteBase.white, },
            black: { value: paletteBase.black, },
        },
    },
});
`;

// ---------- semantic.ts ----------

const groupBody = GROUPS.map((group) => {
    const steps = STEPS.map((step) => {
        const base = `semantic/${group}/${step}`;
        const leaf = (projection: string) =>
            `                ${projection}: { value: { _light: "${themeValue(`${base}/${projection}`, "light")}", _dark: "${themeValue(`${base}/${projection}`, "dark")}", }, },`;
        return `            ${step}: {
${leaf("background")}
${leaf("text")}
${leaf("icon")}
                border: {
                    subtle: { value: { _light: "${themeValue(`${base}/border/subtle`, "light")}", _dark: "${themeValue(`${base}/border/subtle`, "dark")}", }, },
                    strong: { value: { _light: "${themeValue(`${base}/border/strong`, "light")}", _dark: "${themeValue(`${base}/border/strong`, "dark")}", }, },
                },
${leaf("divider")}
            },`;
    }).join("\n");

    return `        ${group}: {\n${steps}\n        },`;
}).join("\n");

const shadowBody = [ 100, 200, 300, 400, 500, 600, 700, 800, ].map((step) =>
    `            ${step}: { value: { _light: "${themeValue(`semantic/shadow/${step}`, "light")}", _dark: "${themeValue(`semantic/shadow/${step}`, "dark")}", }, },`
).join("\n");

const semanticFile = `import { defineSemanticTokens, } from "@pandacss/dev";

/**
 * Semantic color layer.
 *
 * Context API: \`colors.semantic.<group>.<step>.<projection>\`.
 * Every context group carries the full \`11 x 5\` matrix.
 *
 * Boundaries are split: \`border.subtle\` is a structural boundary and
 * \`border.strong\` is a functional boundary (>= 3:1). \`divider\` is always
 * quieter than \`border.subtle\`.
 *
 * Values are ported from the Pen design system (Pen is the source of truth;
 * see outputs/experiments/design-system-to-code/tools/port-foundation.ts).
 */
export const SEMANTIC_GROUPS = [
    "common",
    "occasional",
    "rare",
    "brand",
    "positive",
    "negative",
] as const;

export const SEMANTIC_PROJECTIONS = [ "background", "text", "icon", "border", "divider", ] as const;

export const SEMANTIC_SHADOW_STEPS = [ 100, 200, 300, 400, 500, 600, 700, 800, ] as const;

export const semanticColors = defineSemanticTokens.colors({
    semantic: {
${groupBody}
        shadow: {
${shadowBody}
        },
    },
});
`;

writeFileSync(`${ROOT}/src/shared/styles/foundation/colors/palette.ts`, paletteFile);
writeFileSync(`${ROOT}/src/shared/styles/foundation/colors/semantic.ts`, semanticFile);
console.log("generated palette.ts and semantic.ts");
