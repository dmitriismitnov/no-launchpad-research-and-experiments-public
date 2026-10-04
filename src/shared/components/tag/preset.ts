import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tag visual projection. Slots: root / label / close.
 *
 * Pen `UyMqu` master / `QIUyy` documentation: a bordered chip whose fill is the
 * raised surface `surface/raised`, whose functional boundary is `border/strong`
 * and whose hover surface is `surface/hover`; the label reads
 * `text/secondary` and the remove control `text/tertiary`. The remove focus ring
 * is left unchanged (not Pen-proven). Pen documents `selectable` / `selected`,
 * tone, size, a leading dot-icon and `disabled`; those are recorded BLOCKED, not
 * implemented here.
 */
export const tagRecipe = defineSlotRecipe({
    className: "tag",
    slots: [ "root", "label", "close", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x3",
            paddingBlock: "x2",
            paddingInline: "x5",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.strong",
            backgroundColor: "semantic.surface.raised",
            _hover: { backgroundColor: "semantic.surface.hover", },
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        close: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.text.tertiary",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },
    },
});

export const tagPreset = definePreset({
    name: "@no-launchpad/tag",
    theme: { slotRecipes: { tag: tagRecipe, }, },
});
