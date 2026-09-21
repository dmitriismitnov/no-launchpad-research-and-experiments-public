import { describe, expect, test, } from "bun:test";

import { buttonRecipe, } from "./preset";

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

describe("button recipe", () => {
    test("declares the anatomy", () => {
        expect(buttonRecipe.slots).toEqual([ "root", "prefixIcon", "label", "suffixIcon", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(buttonRecipe.variants ?? {})).toEqual([ "tone", "size", ]);
        expect(Object.keys(buttonRecipe.variants?.["tone"] ?? {})).toEqual([
            "primary",
            "secondary",
            "ghost",
            "icon",
        ]);
        expect(Object.keys(buttonRecipe.variants?.["size"] ?? {})).toEqual([ "sm", "md", ]);
    });

    test("uses no shorthand property names", () => {
        const variantStyles = [
            ...Object.values(buttonRecipe.variants?.["tone"] ?? {}),
            ...Object.values(buttonRecipe.variants?.["size"] ?? {}),
        ];
        const compoundStyles = ( buttonRecipe.compoundVariants ?? [] ).map(
            (entry) => ( entry as { css: unknown; } ).css,
        );
        const keys = [
            ...collectKeys(buttonRecipe.base),
            ...variantStyles.flatMap((style) => collectKeys(style)),
            ...compoundStyles.flatMap((style) => collectKeys(style)),
        ];
        const offenders = keys.filter((key) => bannedShorthands.has(key));

        expect(offenders).toEqual([]);
    });

    test("declares default variants", () => {
        expect(buttonRecipe.defaultVariants).toEqual({ tone: "primary", size: "md", });
    });
});
