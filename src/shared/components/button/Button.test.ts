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

/** Resolves the shared disabled paint on a tone root, which excludes loading. */
const disabledBackground = (root: Record<string, unknown> | undefined): unknown => {
    const selector = Object.keys(root ?? {}).find(
        (candidate) => candidate.includes(":disabled") && candidate.includes(":not([data-loading])"),
    );

    return selector === undefined
        ? undefined
        : ( root as Record<string, { backgroundColor?: unknown; }> )[selector]?.backgroundColor;
};

describe("button recipe", () => {
    test("declares the anatomy", () => {
        expect(buttonRecipe.slots).toEqual([ "root", "prefixIcon", "label", "suffixIcon", "spinner", ]);
    });

    test("declares public variants only", () => {
        expect(Object.keys(buttonRecipe.variants ?? {})).toEqual([ "tone", "size", "width", "loading", ]);
        expect(Object.keys(buttonRecipe.variants?.["tone"] ?? {})).toEqual([
            "primary",
            "secondary",
            "ghost",
            "destructive",
        ]);
        expect(Object.keys(buttonRecipe.variants?.["size"] ?? {})).toEqual([ "sm", "md", ]);
        expect(Object.keys(buttonRecipe.variants?.["width"] ?? {})).toEqual([ "hug", "full", ]);
        expect(Object.keys(buttonRecipe.variants?.["loading"] ?? {})).toEqual([ "true", ]);
    });

    test("keeps no icon tone: icon-only buttons get a dedicated component", () => {
        const compoundTones = ( buttonRecipe.compoundVariants ?? [] )
            .map((entry) => ( entry as { tone?: string; } ).tone);

        expect(compoundTones).not.toContain("icon");
    });

    test("uses no shorthand property names", () => {
        const variantStyles = [
            ...Object.values(buttonRecipe.variants?.["tone"] ?? {}),
            ...Object.values(buttonRecipe.variants?.["size"] ?? {}),
            ...Object.values(buttonRecipe.variants?.["width"] ?? {}),
            ...Object.values(buttonRecipe.variants?.["loading"] ?? {}),
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
        expect(buttonRecipe.defaultVariants).toEqual({
            tone: "primary",
            size: "md",
            width: "hug",
            loading: false,
        });
    });

    test("maps width hug to content sizing and full to the PEN fill container", () => {
        // Pen `IcuBw` public variants (`Z8OMS4`): width `hug · full`. `hug` is
        // intrinsic; `full` is the `MboG8` / `GW4Jy` fill-container override
        // inside the 280px `K4pyRx` column. It is not a layout stretch variant.
        expect(buttonRecipe.variants?.["width"]?.["hug"]?.["root"]).toMatchObject({
            width: "fit-content",
        });
        expect(buttonRecipe.variants?.["width"]?.["full"]?.["root"]).toMatchObject({
            width: "100%",
        });
    });

    test("preserves geometry and exposes the spinner while loading", () => {
        // Pen `IcuBw` shared rules (`Qur3j`): "loading keeps the label width and
        // swaps in the indicator so layout never shifts". The spinner is an
        // absolute, non-interactive overlay; the content keeps its layout box
        // (opacity 0 removes paint, never width).
        const loading = buttonRecipe.variants?.["loading"]?.["true"];

        expect(loading?.["root"]).toMatchObject({ position: "relative", });
        for ( const slot of [ "prefixIcon", "label", "suffixIcon", ] as const ) {
            expect(loading?.[slot]).toMatchObject({ opacity: "0", });
        }

        const spinner = buttonRecipe.base?.["spinner"];
        expect(spinner).toMatchObject({
            position: "absolute",
            pointerEvents: "none",
        });
        expect(( spinner as Record<string, unknown> | undefined )?.["& .icon"]).toMatchObject({
            animation: "spin 1s linear infinite",
        });
    });

    test("matches the PEN control geometry", () => {
        // Pen `Button` (IcuBw): 40px control, 8px gap, 10px radius, [10, 16]
        // padding. Pen `Sm` is 32px with [6, 12] padding.
        expect(buttonRecipe.base?.["root"]).toMatchObject({
            height: "x20",
            gap: "x4",
            borderRadius: "md",
            paddingBlock: "x5",
            paddingInline: "x8",
        });
        expect(buttonRecipe.variants?.["size"]?.["md"]?.["root"]).toMatchObject({
            paddingInline: "x8",
        });
        expect(buttonRecipe.variants?.["size"]?.["sm"]?.["root"]).toMatchObject({
            height: "x16",
            paddingBlock: "x3",
            paddingInline: "x6",
        });
    });

    test("matches the PEN primary action contract", () => {
        const root = buttonRecipe.variants?.["tone"]?.["primary"]?.["root"];

        expect(root).toMatchObject({
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
        // The shared disabled paint is skipped while loading so the tone fill
        // (and the Pen loading indicator) stays.
        expect(disabledBackground(root)).toBe("semantic.action.disabled.background");
        expect(root?.["backgroundColor"]).not.toHaveProperty("_disabled");
        // Pen paints primary feedback with colour, never a shadow or opacity.
        expect(root).not.toHaveProperty("boxShadow");
        expect(root).not.toHaveProperty("opacity");
    });

    test("matches the PEN destructive action contract", () => {
        // Pen `IcuBw` destructive (IcuBw + state contract `xw0yy`): red.600
        // resting/loading, red.700 hover and active, white foreground; disabled
        // falls back to the shared disabled role. Filled, so no boundary.
        const root = buttonRecipe.variants?.["tone"]?.["destructive"]?.["root"];

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
        // Destructive loading (`chU7Q` / `bv3v1`) keeps the danger fill.
        expect(disabledBackground(root)).toBe("semantic.action.disabled.background");
        expect(root?.["backgroundColor"]).not.toHaveProperty("_disabled");
        expect(root).not.toHaveProperty("boxShadow");
        expect(root).not.toHaveProperty("opacity");
        expect(root).not.toHaveProperty("borderColor");
    });

    test("secondary is a raised surface with a functional boundary", () => {
        const root = buttonRecipe.variants?.["tone"]?.["secondary"]?.["root"];

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
        const root = buttonRecipe.variants?.["tone"]?.["ghost"]?.["root"];

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
        expect(buttonRecipe.base?.["root"]).not.toHaveProperty("color");
    });

    // Pen paints the label and both icon slots from one action foreground per
    // tone; the ghost default reads the shared `text.secondary` role.
    const slotColours = {
        primary: "semantic.action.primary.foreground",
        secondary: "semantic.action.secondary.foreground",
        ghost: "semantic.text.secondary",
        destructive: "semantic.action.danger.foreground",
    } as const;

    test("paints both the label and the icons from the tone foreground", () => {
        for ( const [ tone, expected, ] of Object.entries(slotColours) ) {
            const variant = buttonRecipe.variants?.["tone"]?.[tone];

            expect(variant?.["root"]).not.toHaveProperty("color");
            for ( const slot of [ "label", "prefixIcon", "suffixIcon", ] as const ) {
                expect(variant?.[slot]).toMatchObject({ color: { base: expected, }, });
            }
        }
    });

    test("paints the loading spinner from the tone foreground", () => {
        // Pen `chU7Q`: the destructive loading indicator keeps `danger-fg`; the
        // spinner never falls back to the shared disabled foreground.
        for ( const [ tone, expected, ] of Object.entries(slotColours) ) {
            const spinner = buttonRecipe.variants?.["tone"]?.[tone]?.["spinner"];

            expect(spinner).toMatchObject({ color: { base: expected, }, });
            expect(spinner?.["color"]).not.toHaveProperty("_disabled");
        }
    });

    test("paints disabled foregrounds from the shared disabled role", () => {
        for ( const tone of Object.keys(slotColours) ) {
            const variant = buttonRecipe.variants?.["tone"]?.[tone];

            for ( const slot of [ "label", "prefixIcon", "suffixIcon", ] as const ) {
                expect(variant?.[slot]).toMatchObject({
                    color: { _disabled: "semantic.action.disabled.foreground", },
                });
            }
        }
    });

    test("shares one focus ring and a disabled cursor", () => {
        const root = buttonRecipe.base?.["root"];

        expect(root).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            cursor: { base: "pointer", _disabled: "not-allowed", },
        });
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(buttonRecipe)).not.toMatch(/_(light|dark)\b/);
    });

    test("composes label typography from foundation atoms", () => {
        expect(buttonRecipe.base?.["label"]).toMatchObject({
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            letterSpacing: "normal",
        });
    });

    test("keeps typography out of the button root", () => {
        const root = buttonRecipe.base?.["root"] ?? {};

        for ( const property of [ "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
            expect(root).not.toHaveProperty(property);
        }
    });
});
