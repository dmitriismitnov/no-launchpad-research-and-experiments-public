import { definePreset, defineRecipe, } from "@pandacss/dev";

/**
 * Asset Icon Tile visual projection: a square, centred frame for one `Icon`.
 *
 * Pen's `Asset Icon Tile` master (`pt3X0`) wraps its glyph in a 40px
 * (`x20`) `surface/sunken` box with an `sm` radius and a 22px glyph. The port
 * keeps that frame — 40px square, `common.100.background`, `border/subtle` —
 * and frames the shared `Icon` at its `md` (20px) step. Pen's surrounding
 * metadata rows (key, source, usage, consumers) belong to the icon inventory
 * composition, not to the tile itself.
 */
export const assetIconTileRecipe = defineRecipe({
    className: "assetIconTile",

    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
        width: "x20",
        height: "x20",
        borderRadius: "sm",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "semantic.common.200.divider",
        backgroundColor: "semantic.common.100.background",
        color: "semantic.common.50.text",
    },
});

export const assetIconTilePreset = definePreset({
    name: "@no-launchpad/asset-icon-tile",
    theme: { recipes: { assetIconTile: assetIconTileRecipe, }, },
});
