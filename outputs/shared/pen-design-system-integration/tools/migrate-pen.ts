/**
 * Step-1 migration draft for the PEN design-system integration track.
 *
 * It:
 * - adds the primitive palette variables (`ds/palette/<family>/<step>`);
 * - renames the system role variables to the structured role names and updates
 *   every reference in place;
 * - preserves node ids, geometry and composition (pure string rewrite of names
 *   plus a single insertion into the `variables` block).
 *
 * It does NOT add aliases, component tokens or foundation scale groups.
 *
 * Run from the repository root:
 *   bun outputs/shared/pen-design-system-integration/tools/migrate-pen.ts
 */
import { readFileSync, writeFileSync, } from "node:fs";

const SOURCE = "raw/migration/design_system_v1_panda_pen_example/design_raw.pen";
const TARGET = "outputs/shared/pen-design-system-integration/design/design_raw.migrated.pen";

const RENAMES: [ RegExp, string, ][] = [
    [ /ds\/ink-2(?![\w-])/g, "ds/ink-soft", ],
    [ /ds\/ink(?![\w-])/g, "ds/ink-strong", ],
    [ /ds\/surface(?![\w-])/g, "ds/surface-base", ],
    [ /ds\/line(?![\w-])/g, "ds/line-strong", ],
    [ /ds\/accent(?![\w-])/g, "ds/accent-base", ],
    [ /ds\/danger(?![\w-])/g, "ds/status-danger", ],
];

const PALETTE: Record<string, Record<string, string>> = {
    neutral: {
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
    },
    brand: {
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
    },
    danger: {
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
    },
};

type Json = null | boolean | number | string | Json[] | { [ key: string ]: Json; };

const collectIds = (node: Json, acc: string[] = []): string[] => {
    if ( Array.isArray(node) ) {
        for ( const item of node ) collectIds(item, acc);
        return acc;
    }

    if ( node !== null && typeof node === "object" ) {
        const id = node["id"];
        if ( typeof id === "string" ) acc.push(id);
        for ( const value of Object.values(node) ) collectIds(value, acc);
    }

    return acc;
};

const collectReferences = (node: Json, acc: string[] = []): string[] => {
    if ( typeof node === "string" ) {
        for ( const match of node.matchAll(/\$([A-Za-z0-9_/-]+)/g) ) {
            acc.push(match[1]!);
        }
        return acc;
    }

    if ( Array.isArray(node) ) {
        for ( const item of node ) collectReferences(item, acc);
        return acc;
    }

    if ( node !== null && typeof node === "object" ) {
        for ( const value of Object.values(node) ) collectReferences(value, acc);
    }

    return acc;
};

const originalText = readFileSync(SOURCE, "utf8");
let migratedText = originalText;

for ( const [ pattern, replacement, ] of RENAMES ) {
    migratedText = migratedText.replace(pattern, replacement);
}

let paletteBlock = "";
for ( const [ family, steps, ] of Object.entries(PALETTE) ) {
    for ( const [ step, hex, ] of Object.entries(steps) ) {
        paletteBlock += `    "ds/palette/${family}/${step}": {\n`;
        paletteBlock += `      "type": "color",\n`;
        paletteBlock += `      "value": "${hex}"\n`;
        paletteBlock += `    },\n`;
    }
}

const marker = `  "variables": {\n`;
const markerIndex = migratedText.indexOf(marker);
if ( markerIndex === -1 ) {
    throw new Error("Could not find the variables block in the PEN file.");
}

migratedText =
    migratedText.slice(0, markerIndex + marker.length)
    + paletteBlock
    + migratedText.slice(markerIndex + marker.length);

const original = JSON.parse(originalText) as Json;
const migrated = JSON.parse(migratedText) as Json;

const originalIds = collectIds(original);
const migratedIds = collectIds(migrated);
if ( JSON.stringify(originalIds) !== JSON.stringify(migratedIds) ) {
    throw new Error("Node ids changed during migration.");
}

const originalVariables = ( original as { variables: Record<string, Json>; } ).variables;
const migratedVariables = ( migrated as { variables: Record<string, Json>; } ).variables;
const defined = new Set(Object.keys(migratedVariables));

const references = [ ...new Set(collectReferences(migrated)), ];
const missing = references.filter((reference) => !defined.has(reference));

if ( missing.length > 0 ) {
    throw new Error(`Unresolved variable references: ${missing.join(", ")}`);
}

const renamedKeys = Object.keys(migratedVariables).length - Object.keys(originalVariables).length;
if ( renamedKeys !== Object.keys(PALETTE).reduce((sum, family) => sum + Object.keys(PALETTE[family]!).length, 0) ) {
    throw new Error("Palette variable count mismatch.");
}

writeFileSync(TARGET, migratedText, "utf8");

console.log(`Migration written to ${TARGET}`);
console.log(`Node ids: ${originalIds.length} (unchanged)`);
console.log(`Variables: ${Object.keys(originalVariables).length} -> ${Object.keys(migratedVariables).length}`);
console.log(`Resolved references: ${references.length}`);
console.log(`Palette variables added: ${Object.keys(PALETTE).reduce((sum, family) => sum + Object.keys(PALETTE[family]!).length, 0)}`);
