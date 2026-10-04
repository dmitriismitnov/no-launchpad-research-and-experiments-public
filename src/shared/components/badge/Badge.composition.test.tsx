import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { Badge, } from "./badge";
import { badgeRecipe, } from "./preset";

describe("badge composition", () => {
    test("renders the dot and the label in their slots", () => {
        const markup = renderToStaticMarkup(<Badge label="Active" />);

        expect(markup).toContain("badge__root");
        expect(markup).toContain("badge__dot");
        expect(markup).toContain("badge__label");
        expect(markup).toContain("Active");
    });

    test("omits the dot when withDot is false", () => {
        const markup = renderToStaticMarkup(<Badge label="Active" withDot={false} />);

        expect(markup).not.toContain("badge__dot");
    });

    test("accepts native span attributes", () => {
        const markup = renderToStaticMarkup(<Badge label="New" data-testid="b" />);

        expect(markup).toContain(`data-testid="b"`);
    });

    // Pen `as3xr` / `NT57b` token contract: Badge already paints its dot from
    // the documented tone roles and its label from the inverse text role. This
    // slice adds regression coverage only — no production change.
    test("paints the dot from the documented tone roles", () => {
        expect(badgeRecipe.base?.["dot"]).toMatchObject({
            backgroundColor: "semantic.common.600.background",
        });
        expect(badgeRecipe.variants?.["tone"]?.["positive"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.positive.600.background",
        });
        expect(badgeRecipe.variants?.["tone"]?.["negative"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.negative.600.background",
        });
        expect(badgeRecipe.variants?.["tone"]?.["brand"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.brand.600.background",
        });
        expect(badgeRecipe.base?.["label"]).toMatchObject({
            color: "semantic.common.50.text",
        });
    });
});
