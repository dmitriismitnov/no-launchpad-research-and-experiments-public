import { describe, expect, test, } from "bun:test";
import { renderToStaticMarkup, } from "react-dom/server";

import { AssetIconTile, } from "./asset-icon-tile";
import { assetIconTileRecipe, } from "./preset";

describe("asset icon tile composition", () => {
    test("paints the Pen surface/sunken tile with no stroke", () => {
        // Pen `Asset Icon Tile` master (`pt3X0`): a 40px `surface/sunken`
        // glyph box, `sm` radius, `text/primary` glyph and no stroke.
        expect(assetIconTileRecipe.base).toMatchObject({
            width: "x20",
            height: "x20",
            borderRadius: "sm",
            backgroundColor: "semantic.surface.sunken",
            color: "semantic.text.primary",
        });
        expect(assetIconTileRecipe.base).not.toHaveProperty("borderWidth");
        expect(assetIconTileRecipe.base).not.toHaveProperty("borderStyle");
        expect(assetIconTileRecipe.base).not.toHaveProperty("borderColor");
    });

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
