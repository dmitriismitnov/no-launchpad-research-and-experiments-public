import { describe, expect, test, } from "bun:test";
import { readFileSync, } from "node:fs";

import { ICON_FONT_FAMILY, } from "./constants";
import { ICON_CODEPOINTS, } from "./manifest.generated";
import { iconRecipe, } from "./preset";

const bannedShorthands = new Set([
    "bg",
    "p",
    "px",
    "py",
    "pt",
    "pr",
    "pb",
    "pl",
    "m",
    "mx",
    "my",
    "mt",
    "mr",
    "mb",
    "ml",
    "w",
    "h",
    "size",
]);

const collectKeys = (value: unknown, keys: string[] = []): string[] => {
    if ( value === null || typeof value !== "object" ) {
        return keys;
    }

    for ( const [ key, nested, ] of Object.entries(value as Record<string, unknown>) ) {
        keys.push(key);
        collectKeys(nested, keys);
    }

    return keys;
};

const styleKeys = [
    ...collectKeys(iconRecipe.base),
    ...Object.values(iconRecipe.variants?.["size"] ?? {}).flatMap((style) => collectKeys(style)),
];

const fontFace = readFileSync(new URL("./icon.css", import.meta.url), "utf8");

describe("icon recipe", () => {
    test("declares public variants only", () => {
        expect(Object.keys(iconRecipe.variants ?? {})).toEqual([ "size", ]);
        expect(Object.keys(iconRecipe.variants?.["size"] ?? {})).toEqual([ "sm", "md", "lg", "xl", ]);
    });

    test("declares default variants", () => {
        expect(iconRecipe.defaultVariants).toEqual({ size: "md", });
    });

    test("uses no shorthand property names", () => {
        expect(styleKeys.filter((key) => bannedShorthands.has(key))).toEqual([]);
    });

    test("uses the shared font family", () => {
        expect(iconRecipe.base?.["fontFamily"]).toBe(ICON_FONT_FAMILY);
    });

    test("sizes map onto the shared xN scale", () => {
        // Pen `Icon size scale` (`YpWB5`): icon/sm 16 · md 20 · lg 24 · xl 32.
        expect(iconRecipe.variants?.["size"]).toEqual({
            sm: { fontSize: "{sizes.x8}", width: "x8", height: "x8", },
            md: { fontSize: "{sizes.x10}", width: "x10", height: "x10", },
            lg: { fontSize: "{sizes.x12}", width: "x12", height: "x12", },
            xl: { fontSize: "{sizes.x16}", width: "x16", height: "x16", },
        });
    });

    test("sets no colour so glyphs inherit currentColor", () => {
        expect(styleKeys).not.toContain("color");
    });
});

describe("icon font registration", () => {
    test("registers the generated woff2 under the shared family", () => {
        expect(fontFace).toContain(`font-family: "${ICON_FONT_FAMILY}"`);
        expect(fontFace).toContain(`url("./assets/font/icon.woff2")`);
    });

    test("points at an existing woff2 font", () => {
        const woff2 = readFileSync(new URL("./assets/font/icon.woff2", import.meta.url));

        expect(woff2.subarray(0, 4).toString("ascii")).toBe("wOF2");
    });
});

describe("icon manifest", () => {
    test("exposes at least one key", () => {
        expect(Object.keys(ICON_CODEPOINTS).length).toBeGreaterThan(0);
    });

    test("uses unique private-use codepoints", () => {
        const codepoints = Object.values(ICON_CODEPOINTS);

        for ( const codepoint of codepoints ) {
            expect(codepoint).toBeGreaterThanOrEqual(0xE001);
            expect(codepoint).toBeLessThanOrEqual(0xF8FF);
        }
        expect(new Set(codepoints).size).toBe(codepoints.length);
    });
});
