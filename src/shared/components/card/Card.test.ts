import { describe, expect, test, } from "bun:test";

import { cardRecipe, } from "./preset";

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

describe("card recipe", () => {
    test("declares the complete card anatomy", () => {
        expect(cardRecipe.slots).toEqual([
            "root",
            "media",
            "body",
            "header",
            "title",
            "description",
            "footer",
            "footerPrimary",
            "footerSecondary",
            "actionButton",
        ]);
    });

    test("has no public variants", () => {
        expect(Object.keys(cardRecipe.variants ?? {})).toEqual([]);
    });

    test("uses no shorthand property names", () => {
        const keys = [
            ...collectKeys(cardRecipe.base),
            ...collectKeys(cardRecipe.variants ?? {}),
            ...( cardRecipe.compoundVariants ?? [] ).flatMap((entry) => collectKeys(entry)),
        ];
        const offenders = keys.filter((key) => bannedShorthands.has(key));

        expect(offenders).toEqual([]);
    });

    test("does not branch on theme inside the recipe", () => {
        expect(JSON.stringify(cardRecipe)).not.toMatch(/_(light|dark)\b/);
    });

    test("paints text and icons from explicit slots, never the root", () => {
        const root = cardRecipe.base?.["root"] ?? {};

        for ( const property of [ "color", "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
            expect(root).not.toHaveProperty(property);
        }

        expect(cardRecipe.base?.["title"]).toMatchObject({
            fontFamily: "body",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "tight",
            color: "semantic.common.50.text",
        });
    });

    test("keeps the media slot at 16:9 and clipped", () => {
        expect(cardRecipe.base?.["media"]).toMatchObject({
            flexShrink: "0",
            width: "full",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: "sm",
        });
    });

    test("gives the footer a top divider only, with no side or bottom border", () => {
        const footer = cardRecipe.base?.["footer"] ?? {};

        expect(footer).toMatchObject({
            borderTopWidth: "thin",
            borderTopStyle: "solid",
            borderTopColor: "semantic.common.200.divider",
        });

        for ( const property of [ "borderBottomWidth", "borderLeftWidth", "borderRightWidth", ] ) {
            expect(footer).not.toHaveProperty(property);
        }
    });
});
