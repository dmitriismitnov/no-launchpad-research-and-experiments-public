import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * List visual projection. Slots: root / item / itemIcon / itemText /
 * itemTitle / itemMeta / itemTrailing.
 *
 * A vertical collection of rows. Each row carries an optional leading glyph, a
 * title with optional metadata and an optional trailing value. The list is data
 * driven: the component maps a typed `items` array rather than accepting
 * children, which keeps the anatomy closed.
 *
 * Pen references the newer role layer (`semantic/surface/raised`,
 * `semantic/border/subtle`, `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.600.background (exact)
 * - text/tertiary -> common.600.background (exact)
 *
 * Approximations: Pen pads each row 14px inline; the scale has no x7, so `x6`
 * (12px) is used. Pen's mono trailing value falls back to the body family
 * because the code foundation ships no mono token.
 */
export const listRecipe = defineSlotRecipe({
    className: "list",
    slots: [ "root", "item", "itemIcon", "itemText", "itemTitle", "itemMeta", "itemTrailing", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            margin: "0",
            padding: "x6",
            listStyleType: "none",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
        },

        item: {
            display: "flex",
            alignItems: "center",
            gap: "x6",
            paddingBlock: "x6",
            paddingInline: "x6",
            borderRadius: "md",
        },

        itemIcon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        itemText: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            flex: "1",
            minWidth: "0",
        },

        itemTitle: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        itemMeta: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
        },

        itemTrailing: {
            flexShrink: "0",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
        },
    },
});

export const listPreset = definePreset({
    name: "@no-launchpad/list",
    theme: { slotRecipes: { list: listRecipe, }, },
});
