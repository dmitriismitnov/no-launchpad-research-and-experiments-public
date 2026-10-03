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

/** Resolves the shared disabled paint on a tone root, which excludes loading. */
const disabledBackground = (root: Record<string, unknown> | undefined): unknown => {
    const selector = Object.keys(root ?? {}).find(
        (candidate) => candidate.includes(":disabled") && candidate.includes(":not([data-loading])"),
    );

    return selector === undefined
        ? undefined
        : ( root as Record<string, { backgroundColor?: unknown; }> )[selector]?.backgroundColor;
};

describe("buttonIcon recipe", () => {
    test("declares the icon-only anatomy", () => {
        expect(buttonIconRecipe.slots).toEqual([ "root", "icon", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(buttonIconRecipe.variants ?? {})).toEqual([ "tone", "size", "loading", ]);
        expect(Object.keys(buttonIconRecipe.variants?.["tone"] ?? {})).toEqual([
            "primary",
            "secondary",
            "ghost",
            "destructive",
        ]);
        expect(Object.keys(buttonIconRecipe.variants?.["size"] ?? {})).toEqual([ "sm", "md", ]);
        expect(Object.keys(buttonIconRecipe.variants?.["loading"] ?? {})).toEqual([ "true", ]);
        // Pen `L2cyL` documents no width axis for the square control.
        expect(buttonIconRecipe.variants).not.toHaveProperty("width");
    });

    test("uses no shorthand property names", () => {
        const variantStyles = [
            ...Object.values(buttonIconRecipe.variants?.["tone"] ?? {}),
            ...Object.values(buttonIconRecipe.variants?.["size"] ?? {}),
            ...Object.values(buttonIconRecipe.variants?.["loading"] ?? {}),
        ];
        const keys = [
            ...collectKeys(buttonIconRecipe.base),
            ...variantStyles.flatMap((style) => collectKeys(style)),
        ];
        const offenders = keys.filter((key) => bannedShorthands.has(key));

        expect(offenders).toEqual([]);
    });

    test("declares default variants", () => {
        expect(buttonIconRecipe.defaultVariants).toEqual({
            tone: "primary",
            size: "md",
            loading: false,
        });
    });

    test("rotates the glyph while loading without changing the square", () => {
        // Pen `R3LwyT` (`ib-Loading`) swaps `Or7zW` to the loader glyph at the
        // same 18px slot, so the accessible square never changes size.
        const loading = buttonIconRecipe.variants?.["loading"]?.["true"];

        expect(( loading?.["icon"] as Record<string, unknown> | undefined )?.["& .icon"]).toMatchObject({
            animation: "spin 1s linear infinite",
        });
        expect(loading?.["root"]).toBeUndefined();
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
            },
        });
        expect(disabledBackground(primary)).toBe("semantic.action.disabled.background");
        expect(primary?.["backgroundColor"]).not.toHaveProperty("_disabled");
        expect(primary).not.toHaveProperty("boxShadow");
        expect(primary).not.toHaveProperty("opacity");
    });

    test("matches the Button destructive action contract", () => {
        // Pen `Icon Button` (L72UAx) destructive (specimen `LVKWA`): red.600
        // fill with a white glyph, mirroring the Button's danger role in both
        // themes. Disabled falls back to the shared disabled role.
        const root = buttonIconRecipe.variants?.["tone"]?.["destructive"]?.["root"];

        expect(root).toMatchObject({
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: {
                base: "semantic.action.danger.background",
                _enabled: {
                    _hover: "semantic.action.danger.hover",
                    _active: "semantic.action.danger.hover",
                },
            },
        });
        // Pen `R3LwyT` keeps the tone fill while the loader spins.
        expect(disabledBackground(root)).toBe("semantic.action.disabled.background");
        expect(root?.["backgroundColor"]).not.toHaveProperty("_disabled");
        expect(root).not.toHaveProperty("boxShadow");
        expect(root).not.toHaveProperty("opacity");
        expect(root).not.toHaveProperty("borderColor");
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
            },
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.action.secondary.border",
        });
        expect(disabledBackground(root)).toBe("semantic.action.disabled.background");
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
            },
        });
        expect(disabledBackground(root)).toBe("semantic.action.disabled.background");
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
        destructive: "semantic.action.danger.foreground",
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

    test("keeps the sm glyph at x8 and sizes the md glyph at x9", () => {
        expect(buttonIconRecipe.base?.["icon"]).toMatchObject({ width: "x8", height: "x8", });
        expect(buttonIconRecipe.variants?.["size"]?.["sm"]?.["icon"]).toBeUndefined();
        expect(buttonIconRecipe.variants?.["size"]?.["md"]?.["icon"]).toMatchObject({
            width: "x9",
            height: "x9",
        });
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
