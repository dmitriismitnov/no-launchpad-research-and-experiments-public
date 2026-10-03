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
        expect(inputRecipe.slots).toEqual([
            "root",
            "label",
            "control",
            "input",
            "prefixIcon",
            "suffixIcon",
            "error",
        ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(inputRecipe.variants ?? {})).toEqual([ "invalid", "disabled", ]);
        expect(Object.keys(inputRecipe.variants?.["invalid"] ?? {})).toEqual([ "true", ]);
        expect(Object.keys(inputRecipe.variants?.["disabled"] ?? {})).toEqual([ "true", ]);
    });

    test("declares default variants", () => {
        expect(inputRecipe.defaultVariants).toEqual({ invalid: false, disabled: false, });
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(inputRecipe)).not.toMatch(/_(light|dark)\b/);
    });

    test("uses no shorthand property names", () => {
        const variantStyles = Object.values(inputRecipe.variants ?? {}).flatMap(
            (variant) => Object.values(variant ?? {}),
        );
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
            outlineStyle: { _focusWithin: "solid", },
            outlineWidth: { _focusWithin: "{borderWidths.thick}", },
            outlineOffset: { _focusWithin: "0", },
            outlineColor: { _focusWithin: "semantic.brand.500.background", },
        });
    });

    test("disabled control drops opacity and cursor", () => {
        const control = inputRecipe.variants?.["disabled"]?.["true"]?.["control"];

        expect(control).toMatchObject({
            cursor: "not-allowed",
            opacity: 0.45,
        });
    });

    test("placeholder is muted via the background projection", () => {
        expect(inputRecipe.base?.["input"]?.["&::placeholder"]).toMatchObject({
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
        expect(inputRecipe.base?.["input"]).toMatchObject({
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
        });
    });

    test("composes the icon slots from the tertiary text role", () => {
        for ( const slot of [ "prefixIcon", "suffixIcon", ] ) {
            expect(inputRecipe.base?.[slot]).toMatchObject({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
                color: "semantic.common.600.background",
            });
        }
    });

    test("keeps typography out of the root", () => {
        for ( const property of [ "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
            expect(inputRecipe.base?.["root"]).not.toHaveProperty(property);
        }
    });
});
