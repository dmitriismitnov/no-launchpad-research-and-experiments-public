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

    test("matches the Button action contract", () => {
        const primary = buttonIconRecipe.variants?.["tone"]?.["primary"]?.["root"];

        expect(primary).toMatchObject({
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: {
                base: "semantic.action.primary.background",
                _enabled: {
                    _hover: "semantic.action.primary.hover",
                    _active: "semantic.action.primary.active",
                },
                _disabled: "semantic.action.disabled.background",
            },
        });
        expect(primary).not.toHaveProperty("boxShadow");
        expect(primary).not.toHaveProperty("opacity");
    });

    test("secondary is a raised surface with a functional boundary", () => {
        const root = buttonIconRecipe.variants?.["tone"]?.["secondary"]?.["root"];

        expect(root).toMatchObject({
            backgroundColor: {
                base: "semantic.action.secondary.background",
                _enabled: {
                    _hover: "semantic.action.secondary.hover",
                    _active: "semantic.action.secondary.hover",
                },
                _disabled: "semantic.action.disabled.background",
            },
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.action.secondary.border",
        });
        expect(root).not.toHaveProperty("boxShadow");
        expect(root).not.toHaveProperty("opacity");
    });

    test("ghost is transparent with a hover surface and no boundary", () => {
        const root = buttonIconRecipe.variants?.["tone"]?.["ghost"]?.["root"];

        expect(root).toMatchObject({
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: {
                base: "transparent",
                _enabled: {
                    _hover: "semantic.action.ghost.hover",
                    _active: "semantic.surface.selected",
                },
                _disabled: "semantic.action.disabled.background",
            },
        });
        expect(root).not.toHaveProperty("boxShadow");
        expect(root).not.toHaveProperty("opacity");
    });

    test("declares no foreground colour on the base root", () => {
        expect(buttonIconRecipe.base?.["root"]).not.toHaveProperty("color");
    });

    // The button has no visible text, so the only foreground is the glyph. It
    // reads the same action foreground Pen paints the Button with.
    const iconColours = {
        primary: "semantic.action.primary.foreground",
        secondary: "semantic.action.secondary.foreground",
        ghost: "semantic.text.secondary",
    } as const;

    test("paints the glyph from the tone foreground", () => {
        for ( const [ tone, expected, ] of Object.entries(iconColours) ) {
            const variant = buttonIconRecipe.variants?.["tone"]?.[tone];
            const colour = ( variant?.["icon"] as { color?: { base?: string; }; } ).color?.base;

            expect(variant?.["root"]).not.toHaveProperty("color");
            expect(colour).toBe(expected);
        }
    });

    test("paints a disabled foreground from the shared disabled role", () => {
        for ( const tone of Object.keys(iconColours) ) {
            const variant = buttonIconRecipe.variants?.["tone"]?.[tone];

            expect(variant?.["icon"]).toMatchObject({
                color: { _disabled: "semantic.action.disabled.foreground", },
            });
        }
    });

    test("shares one focus ring and a disabled cursor", () => {
        const root = buttonIconRecipe.base?.["root"];

        expect(root).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
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
        // Pen `Icon Button` (L72UAx) is 40px; the documented 32px `Sm` is 32px.
        const sm = buttonIconRecipe.variants?.["size"]?.["sm"]?.["root"];
        const md = buttonIconRecipe.variants?.["size"]?.["md"]?.["root"];

        expect(sm).toMatchObject({ width: "x16", height: "x16", });
        expect(md).toMatchObject({ width: "x20", height: "x20", });
        expect(buttonIconRecipe.base?.["root"]).toMatchObject({ borderRadius: "md", });
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
