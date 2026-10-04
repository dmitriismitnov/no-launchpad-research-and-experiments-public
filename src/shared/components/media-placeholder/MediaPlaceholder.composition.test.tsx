import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "@shared/components/icon/manifest.generated";

import { MediaPlaceholder, } from "./media-placeholder";
import { mediaPlaceholderRecipe, } from "./preset";

describe("media placeholder composition", () => {
    test("renders the muted surface with the default image glyph and no caption", () => {
        const markup = renderToStaticMarkup(<MediaPlaceholder />);

        expect(markup).toContain("mediaPlaceholder__root");
        expect(markup).toContain("mediaPlaceholder__icon");
        expect(markup).toContain("icon--size_lg");
        expect(markup).not.toContain("mediaPlaceholder__label");
    });

    test("renders a caption when a label is supplied", () => {
        const markup = renderToStaticMarkup(<MediaPlaceholder label="16 : 9 media" />);

        expect(markup).toContain("mediaPlaceholder__label");
        expect(markup).toContain("16 : 9 media");
    });

    test("omits a blank caption", () => {
        const markup = renderToStaticMarkup(<MediaPlaceholder label="   " />);

        expect(markup).not.toContain("mediaPlaceholder__label");
    });

    test("accepts an alternative glyph", () => {
        const markup = renderToStaticMarkup(<MediaPlaceholder icon="waves" />);

        expect(markup).toContain(String.fromCodePoint(ICON_CODEPOINTS["waves"]));
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(<MediaPlaceholder data-testid="m" />);

        expect(markup).toContain(`data-testid="m"`);
    });

    // Pen `SX6Gf` master / `vUaGv` documentation: root fill `surface/sunken` with
    // a `border/subtle` boundary; the glyph and the caption both read
    // `text/tertiary`. The `image · video · avatar`, `with ratio` and `with label`
    // variants, the extra `frame` part and the quiet non-content ARIA policy are
    // BLOCKED (new props/parts/behaviour).
    test("paints the sunken surface, subtle boundary and tertiary glyph and caption", () => {
        const root = mediaPlaceholderRecipe.base?.["root"] as Record<string, unknown> | undefined;
        const icon = mediaPlaceholderRecipe.base?.["icon"] as Record<string, unknown> | undefined;
        const label = mediaPlaceholderRecipe.base?.["label"] as Record<string, unknown> | undefined;

        expect(root).toMatchObject({
            backgroundColor: "semantic.surface.sunken",
            borderColor: "semantic.border.subtle",
        });
        expect(icon?.["color"]).toBe("semantic.text.tertiary");
        expect(label?.["color"]).toBe("semantic.text.tertiary");
    });
});
