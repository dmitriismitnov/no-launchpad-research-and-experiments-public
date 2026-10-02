import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { AssetIconTile, } from "./asset-icon-tile";

describe("asset icon tile composition", () => {
    test("frames a decorative glyph on the tile surface", () => {
        const markup = renderToStaticMarkup(<AssetIconTile name="gauge" />);

        expect(markup).toContain("assetIconTile");
        expect(markup).toContain("icon--size_md");
        expect(markup).toContain('aria-hidden="true"');
    });

    test("promotes the glyph to an image when labelled", () => {
        const markup = renderToStaticMarkup(<AssetIconTile name="moon" label="Dark theme" />);

        expect(markup).toContain('role="img"');
        expect(markup).toContain('aria-label="Dark theme"');
        expect(markup).not.toContain('aria-hidden="true"');
    });

    test("accepts native span attributes", () => {
        const markup = renderToStaticMarkup(<AssetIconTile name="sun" data-testid="tile" title="Sun" />);

        expect(markup).toContain('data-testid="tile"');
        expect(markup).toContain('title="Sun"');
    });
});
