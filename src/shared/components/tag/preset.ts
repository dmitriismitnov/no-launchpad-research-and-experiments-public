import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tag visual projection. Slots: root / label / close.
 *
 * A bordered chip. The fill is the raised surface, the border the strong
 * boundary, and the label the muted foreground role.
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
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.700.background",
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
            color: "semantic.common.600.background",
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
