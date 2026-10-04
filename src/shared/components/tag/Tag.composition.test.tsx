import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { tagRecipe, } from "./preset";
import { Tag, } from "./tag";

describe("tag composition", () => {
    test("renders the label without a close button by default", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" />);

        expect(markup).toContain("tag__root");
        expect(markup).toContain("tag__label");
        expect(markup).toContain("Design");
        expect(markup).not.toContain("tag__close");
        expect(markup).not.toContain("<button");
    });

    test("renders a dismiss button when onClose is provided", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" onClose={() => {}} />);

        expect(markup).toContain("tag__close");
        expect(markup).toContain("<button");
        expect(markup).toContain(`aria-label="Remove Design"`);
        expect(markup).toContain("icon--size_sm");
    });

    test("accepts a custom close label", () => {
        const markup = renderToStaticMarkup(
            <Tag label="Design" onClose={() => {}} closeLabel="Убрать" />,
        );

        expect(markup).toContain(`aria-label="Убрать"`);
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<Tag label="Design" data-testid="t" />);

        expect(markup).toContain(`data-testid="t"`);
    });

    // Pen `UyMqu` / `QIUyy` token contract: the chip is the raised surface with
    // the functional boundary role and a hover surface; the label reads the
    // secondary text role and the remove control the tertiary role. Surface and
    // hover are discriminating light values; border/label/close are value-equal
    // role renames (regression, asserted not claimed as RED).
    test("paints the chip surface, boundary and hover roles", () => {
        const root = tagRecipe.base?.["root"] as Record<string, unknown> | undefined;

        expect(root).toMatchObject({
            backgroundColor: "semantic.surface.raised",
            borderColor: "semantic.border.strong",
        });
        expect(root?.["_hover"]).toMatchObject({
            backgroundColor: "semantic.surface.hover",
        });
    });

    test("paints the label and close roles", () => {
        expect(tagRecipe.base?.["label"]).toMatchObject({ color: "semantic.text.secondary", });
        expect(tagRecipe.base?.["close"]).toMatchObject({ color: "semantic.text.tertiary", });
    });
});
