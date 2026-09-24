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

    test("matches the PEN primary state contract", () => {
        const root = buttonRecipe.variants?.["tone"]?.["primary"]?.["root"];

        expect(root).toMatchObject({
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: { base: "semantic.common.50.text", },
            color: { base: "semantic.common.50.background", },
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: {
                base: 1,
                _enabled: { _hover: 0.85, _active: 0.7, },
                _disabled: 0.45,
            },
        });
    });

    test("secondary follows the surface-feedback policy", () => {
        const root = buttonRecipe.variants?.["tone"]?.["secondary"]?.["root"];

        expect(root).toMatchObject({
            backgroundColor: {
                base: "transparent",
                _enabled: {
                    _hover: "semantic.common.100.background",
                    _active: "semantic.common.200.background",
                },
            },
            borderColor: "semantic.common.700.background",
            color: { base: "semantic.common.50.text", },
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: { base: 1, _disabled: 0.45, },
        });
    });

    test("ghost uses the divider border and surface-feedback policy", () => {
        const root = buttonRecipe.variants?.["tone"]?.["ghost"]?.["root"];

        expect(root).toMatchObject({
            backgroundColor: {
                base: "semantic.common.50.background",
                _enabled: {
                    _hover: "semantic.common.100.background",
                    _active: "semantic.common.200.background",
                },
            },
            borderColor: "semantic.common.200.divider",
            color: { base: "semantic.common.600.background", },
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: { base: 1, _disabled: 0.45, },
        });
    });

    test("icon keeps no shadow and uses the surface-feedback policy", () => {
        const root = buttonRecipe.variants?.["tone"]?.["icon"]?.["root"];

        expect(root).toMatchObject({
            width: "x16",
            height: "x16",
            boxShadow: "none",
            backgroundColor: {
                base: "transparent",
                _enabled: {
                    _hover: "semantic.common.100.background",
                    _active: "semantic.common.200.background",
                },
            },
            color: { base: "semantic.common.600.background", },
            opacity: { base: 1, _disabled: 0.45, },
        });
    });

    test("shares one focus ring and a disabled cursor", () => {
        const root = buttonRecipe.base?.["root"];

        expect(root).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            cursor: { base: "pointer", _disabled: "not-allowed", },
        });
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(buttonRecipe)).not.toMatch(/_(light|dark)\b/);
    });
});
