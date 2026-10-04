import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { statusIndicatorRecipe, } from "./preset";
import { StatusIndicator, } from "./status-indicator";

describe("status indicator composition", () => {
    test("renders the dot and the label in their slots", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" />);

        expect(markup).toContain("statusIndicator__root");
        expect(markup).toContain("statusIndicator__dot");
        expect(markup).toContain("statusIndicator__label");
        expect(markup).toContain("Online");
    });

    test("paints the dot from the tone", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" tone="positive" />);

        expect(markup).toContain("statusIndicator__dot--tone_positive");
    });

    test("accepts native span attributes", () => {
        const markup = renderToStaticMarkup(<StatusIndicator label="Online" data-testid="s" />);

        expect(markup).toContain(`data-testid="s"`);
    });

    // Pen `a4r4Y` / `x8pveA` token contract: the dot paints from the tone's
    // feedback role — positive and negative at step 700 — and the neutral dot
    // from the functional boundary role; the label reads the muted foreground
    // role. The step-700 dots and the neutral boundary are the discriminating
    // light values (the label role is value-equal, regression only).
    test("paints the dot and label token roles", () => {
        expect(statusIndicatorRecipe.base?.["dot"]).toMatchObject({
            backgroundColor: "semantic.border.strong",
        });
        expect(statusIndicatorRecipe.variants?.["tone"]?.["positive"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.positive.700.background",
        });
        expect(statusIndicatorRecipe.variants?.["tone"]?.["negative"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.negative.700.background",
        });
        expect(statusIndicatorRecipe.base?.["label"]).toMatchObject({
            color: "semantic.text.secondary",
        });
    });

    // Pen `a4r4Y` documents tone `positive · warning · negative · neutral ·
    // inactive`. This slice keeps the existing `brand` tone as an INFO
    // extension; `warning` / `inactive` are recorded BLOCKED, not implemented.
    test("keeps the brand tone as an INFO extension", () => {
        expect(statusIndicatorRecipe.variants?.["tone"]?.["brand"]?.["dot"]).toMatchObject({
            backgroundColor: "semantic.brand.600.background",
        });
    });
});
