import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Component-owned label size. Specific to the Button label with no other
 * consumer, so it lives in the component instead of the typography foundation.
 */
const LABEL_FONT_SIZE = "0.9375rem";

/**
 * Button visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / prefixIcon / label / suffixIcon.
 *
 * Colors come from the semantic layer, which switches theme inside the token;
 * the recipe no longer branches on `_light` / `_dark`.
 */
export const buttonRecipe = defineSlotRecipe({
    className: "button",
    slots: [ "root", "prefixIcon", "label", "suffixIcon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "x25",
            gap: "x5",
            borderRadius: "sm",
            fontFamily: "body",
            fontSize: LABEL_FONT_SIZE,
            fontWeight: "medium",
            cursor: "pointer",
            boxShadow: "0 2px 8px {colors.semantic.shadow.300}",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "{borderWidths.thin}", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        prefixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        label: {
            whiteSpace: "nowrap",
        },

        suffixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },
    },

    variants: {
        tone: {
            primary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        base: "semantic.primary.900.background",
                        _hover: "semantic.brand.700.background",
                    },
                    borderColor: {
                        base: "semantic.primary.900.border",
                        _hover: "semantic.brand.700.border",
                    },
                    color: {
                        base: "semantic.primary.900.text",
                        _hover: "semantic.brand.700.text",
                    },
                },
            },

            secondary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        base: "transparent",
                        _hover: "semantic.primary.100.background",
                    },
                    borderColor: "semantic.primary.700.background",
                    color: "semantic.primary.50.text",
                },
            },

            ghost: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        base: "semantic.primary.50.background",
                        _hover: "semantic.primary.100.background",
                    },
                    borderColor: "semantic.primary.200.background",
                    color: "semantic.primary.600.background",
                },
            },

            icon: {
                root: {
                    width: "x16",
                    height: "x16",
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "transparent",
                        _hover: "semantic.primary.100.background",
                    },
                    color: "semantic.primary.600.background",
                },
            },
        },

        size: {
            sm: {
                root: { height: "x16", paddingInline: "x5", },
                prefixIcon: { width: "x8", height: "x8", },
                suffixIcon: { width: "x8", height: "x8", },
            },
            md: {
                root: { paddingInline: "x12", },
            },
        },
    },

    // Real intersections only: size sets the regular padding, these two cases
    // cannot be expressed by an independent merge of public variants.
    compoundVariants: [
        {
            tone: "icon",
            size: "sm",
            css: { root: { paddingInline: "x0", }, },
        },
        {
            tone: "icon",
            size: "md",
            css: { root: { paddingInline: "x0", }, },
        },
        {
            tone: "secondary",
            size: "md",
            css: { root: { paddingInline: "x11", }, },
        },
    ],

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});

export const buttonPreset = definePreset({
    name: "@no-launchpad/button",
    theme: { slotRecipes: { button: buttonRecipe, }, },
});
