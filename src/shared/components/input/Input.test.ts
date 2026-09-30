import { describe, expect, test, } from "bun:test";

import { inputRecipe, } from "./preset";

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

describe("input recipe", () => {
    test("declares the anatomy", () => {
        expect(inputRecipe.slots).toEqual([ "root", "label", "control", "error", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(inputRecipe.variants ?? {})).toEqual([ "invalid", ]);
        expect(Object.keys(inputRecipe.variants?.["invalid"] ?? {})).toEqual([ "true", ]);
    });

    test("declares default variants", () => {
        expect(inputRecipe.defaultVariants).toEqual({ invalid: false, });
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(inputRecipe)).not.toMatch(/_(light|dark)\b/);
    });

    test("uses no shorthand property names", () => {
        const variantStyles = [
            ...Object.values(inputRecipe.variants?.["invalid"] ?? {}),
        ];
        const compoundStyles = ( inputRecipe.compoundVariants ?? [] ).map(
            (entry) => ( entry as { css: unknown; } ).css,
        );
        const keys = [
            ...collectKeys(inputRecipe.base),
            ...variantStyles.flatMap((style) => collectKeys(style)),
            ...compoundStyles.flatMap((style) => collectKeys(style)),
        ];
        const offenders = keys.filter((key) => bannedShorthands.has(key));

        expect(offenders).toEqual([]);
    });

    test("shares one focus ring with Button", () => {
        const control = inputRecipe.base?.["control"];

        expect(control).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        });
    });

    test("disabled control drops opacity and cursor", () => {
        const control = inputRecipe.base?.["control"];

        expect(control).toMatchObject({
            cursor: { _disabled: "not-allowed", },
            opacity: { _disabled: 0.45, },
        });
    });

    test("placeholder is muted via the background projection", () => {
        expect(inputRecipe.base?.["control"]?.["&::placeholder"]).toMatchObject({
            color: "semantic.common.500.background",
        });
    });

    test("invalid control uses the negative accent border", () => {
        const control = inputRecipe.variants?.["invalid"]?.["true"]?.["control"];

        expect(control).toMatchObject({ borderColor: "semantic.negative.600.background", });
    });

    test("composes label typography from foundation atoms", () => {
        expect(inputRecipe.base?.["label"]).toMatchObject({
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
        });
    });

    test("composes control typography from foundation atoms", () => {
        expect(inputRecipe.base?.["control"]).toMatchObject({
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
        });
    });

    test("keeps typography out of the root", () => {
        for ( const property of [ "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
            expect(inputRecipe.base?.["root"]).not.toHaveProperty(property);
        }
    });
});
