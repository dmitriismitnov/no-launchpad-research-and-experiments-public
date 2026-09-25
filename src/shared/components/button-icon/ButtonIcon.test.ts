import { describe, expect, test, } from "bun:test";

import { buttonIconRecipe, } from "./preset";

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

describe("buttonIcon recipe", () => {
    test("declares the icon-only anatomy", () => {
        expect(buttonIconRecipe.slots).toEqual([ "root", "icon", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(buttonIconRecipe.variants ?? {})).toEqual([ "tone", "size", ]);
        expect(Object.keys(buttonIconRecipe.variants?.["tone"] ?? {})).toEqual([
            "primary",
            "secondary",
            "ghost",
        ]);
        expect(Object.keys(buttonIconRecipe.variants?.["size"] ?? {})).toEqual([ "sm", "md", ]);
    });

    test("uses no shorthand property names", () => {
        const variantStyles = [
            ...Object.values(buttonIconRecipe.variants?.["tone"] ?? {}),
            ...Object.values(buttonIconRecipe.variants?.["size"] ?? {}),
        ];
        const keys = [
            ...collectKeys(buttonIconRecipe.base),
            ...variantStyles.flatMap((style) => collectKeys(style)),
        ];
        const offenders = keys.filter((key) => bannedShorthands.has(key));

        expect(offenders).toEqual([]);
    });

    test("declares default variants", () => {
        expect(buttonIconRecipe.defaultVariants).toEqual({ tone: "primary", size: "md", });
    });

    test("matches the Button primary state contract", () => {
        const root = buttonIconRecipe.variants?.["tone"]?.["primary"]?.["root"];

        expect(root).toMatchObject({
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: { base: "semantic.common.50.text", },
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: {
                base: 1,
                _enabled: { _hover: 0.85, _active: 0.7, },
                _disabled: 0.45,
            },
        });
    });

    test("secondary follows the surface-feedback policy", () => {
        const root = buttonIconRecipe.variants?.["tone"]?.["secondary"]?.["root"];

        expect(root).toMatchObject({
            backgroundColor: {
                base: "transparent",
                _enabled: {
                    _hover: "semantic.common.100.background",
                    _active: "semantic.common.200.background",
                },
            },
            borderColor: "semantic.common.700.background",
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: { base: 1, _disabled: 0.45, },
        });
    });

    test("ghost uses the divider border and surface-feedback policy", () => {
        const root = buttonIconRecipe.variants?.["tone"]?.["ghost"]?.["root"];

        expect(root).toMatchObject({
            backgroundColor: {
                base: "semantic.common.50.background",
                _enabled: {
                    _hover: "semantic.common.100.background",
                    _active: "semantic.common.200.background",
                },
            },
            borderColor: "semantic.common.200.divider",
            boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
            opacity: { base: 1, _disabled: 0.45, },
        });
    });

    test("declares no foreground colour on the base root", () => {
        expect(buttonIconRecipe.base?.["root"]).not.toHaveProperty("color");
    });

    // The button has no visible text, so the only foreground is the glyph. It
    // reads the `icon` role; the recipe must never fall back to the `text` role.
    const iconColours = {
        primary: "semantic.common.950.icon",
        secondary: "semantic.common.50.icon",
        ghost: "semantic.common.50.icon",
    } as const;

    test("paints the glyph from the icon role and never the text role", () => {
        for ( const [ tone, expected, ] of Object.entries(iconColours) ) {
            const variant = buttonIconRecipe.variants?.["tone"]?.[tone];
            const colour = ( variant?.["icon"] as { color?: { base?: string; }; } ).color?.base;

            expect(variant?.["root"]).not.toHaveProperty("color");
            expect(colour).toBe(expected);
            expect(colour).toMatch(/\.icon$/);
            expect(colour).not.toMatch(/\.text$/);
        }
    });

    test("shares one focus ring and a disabled cursor", () => {
        const root = buttonIconRecipe.base?.["root"];

        expect(root).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            cursor: { base: "pointer", _disabled: "not-allowed", },
        });
    });

    test("zeroes the user-agent padding so the square stays square", () => {
        const root = buttonIconRecipe.base?.["root"];

        expect(root).toMatchObject({ paddingInline: "x0", paddingBlock: "x0", });
    });

    test("keeps the icon slot at x8 in both sizes", () => {
        expect(buttonIconRecipe.base?.["icon"]).toMatchObject({ width: "x8", height: "x8", });
        expect(buttonIconRecipe.variants?.["size"]?.["sm"]?.["icon"]).toBeUndefined();
        expect(buttonIconRecipe.variants?.["size"]?.["md"]?.["icon"]).toBeUndefined();
    });

    test("declares a square geometry per size", () => {
        const sm = buttonIconRecipe.variants?.["size"]?.["sm"]?.["root"];
        const md = buttonIconRecipe.variants?.["size"]?.["md"]?.["root"];

        expect(sm).toMatchObject({ width: "x16", height: "x16", });
        expect(md).toMatchObject({ width: "x25", height: "x25", });
    });

    // `tone` (colour) and `size` (geometry) are independent, so no intersection
    // needs a compound variant.
    test("needs no compound variants", () => {
        expect(buttonIconRecipe.compoundVariants ?? []).toEqual([]);
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(buttonIconRecipe)).not.toMatch(/_(light|dark)\b/);
    });
});
