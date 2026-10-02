import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { ICON_CODEPOINTS, } from "@shared/components/icon/manifest.generated";

import { MediaPlaceholder, } from "./media-placeholder";

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
});
