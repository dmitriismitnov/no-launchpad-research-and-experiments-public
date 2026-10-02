import { describe, expect, test, } from "bun:test";

import { contrastRatio, } from "@shared/utils";

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

    test("exposes only the variant axis", () => {
        expect(Object.keys(cardRecipe.variants ?? {})).toEqual([ "variant", ]);
        expect(Object.keys(cardRecipe.variants?.["variant"] ?? {})).toEqual([
            "default",
            "plain",
            "compact",
        ]);
    });

    test("plain and compact drop the media and tighten the body", () => {
        expect(cardRecipe.variants?.["variant"]?.["plain"]).toMatchObject({
            body: { gap: "x5", },
        });
        expect(cardRecipe.variants?.["variant"]?.["compact"]).toMatchObject({
            body: { gap: "x3", },
            title: { fontSize: "sm", },
            description: { fontSize: "xs", color: "semantic.text.tertiary", },
        });
    });

    test("matches the PEN Card geometry", () => {
        // Pen `Card` (ziJHM): raised surface, subtle boundary, 16px radius,
        // flush media, 16px body padding and 10px body gap.
        expect(cardRecipe.base?.["root"]).toMatchObject({
            gap: "x0",
            padding: "x0",
            borderRadius: "lg",
            borderColor: "semantic.border.subtle",
            backgroundColor: "semantic.surface.raised",
            overflow: "hidden",
        });
        expect(cardRecipe.base?.["root"]).not.toHaveProperty("boxShadow");
        expect(cardRecipe.base?.["body"]).toMatchObject({ gap: "x5", padding: "x8", });
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

    test("uses CSS-valid axis values, not PEN's snake_case names", () => {
        // PEN writes `space_between`; that is invalid CSS and is silently
        // dropped by the browser, so the header icon would not reach the far
        // edge.
        expect(cardRecipe.base?.["header"]).toMatchObject({ justifyContent: "space-between", });
        expect(JSON.stringify(cardRecipe)).not.toMatch(/space_(between|around)/);
    });

    test("anchors the note pair at opposite edges and the action at the end", () => {
        // The primary note's automatic end margin pins it to the start; the
        // trailing group packs to the end. Without this, a lone secondary note
        // would sit at the start and a notes-plus-action footer would leave a
        // gap between the notes and the action.
        expect(cardRecipe.base?.["footer"]).toMatchObject({ justifyContent: "flex-end", });
        expect(cardRecipe.base?.["footerPrimary"]).toMatchObject({ marginInlineEnd: "auto", });
        expect(cardRecipe.base?.["actionButton"]).not.toHaveProperty("marginInlineStart");
    });

    test("paints text and icons from explicit slots, never the root", () => {
        const root = cardRecipe.base?.["root"] ?? {};

        for ( const property of [ "color", "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", ] ) {
            expect(root).not.toHaveProperty(property);
        }

        expect(cardRecipe.base?.["title"]).toMatchObject({
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "tight",
            color: "semantic.text.primary",
        });
    });

    test("matches the PEN media surface", () => {
        // Pen media is a flush 140px sunken surface, clipped by the Card root.
        expect(cardRecipe.base?.["media"]).toMatchObject({
            flexShrink: "0",
            width: "100%",
            height: "140px",
            overflow: "hidden",
            backgroundColor: "semantic.surface.sunken",
            color: "semantic.text.tertiary",
        });
        expect(cardRecipe.base?.["media"]).not.toHaveProperty("aspectRatio");
        expect(cardRecipe.base?.["media"]).not.toHaveProperty("borderRadius");
    });

    test("keeps muted card text readable on both semantic surfaces", () => {
        expect(contrastRatio("#535963", "#FFFFFF")).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio("#888F98", "#000000")).toBeGreaterThanOrEqual(4.5);
    });

    test("gives the footer no divider in any variant", () => {
        const footer = cardRecipe.base?.["footer"] ?? {};

        // Pen's Card footer is an undivided metadata row.
        expect(footer).toMatchObject({ gap: "x5", });
        expect(footer).not.toHaveProperty("borderTopWidth");
        expect(footer).not.toHaveProperty("borderTopStyle");
        expect(footer).not.toHaveProperty("borderTopColor");
        expect(footer).not.toHaveProperty("paddingTop");
    });
});
