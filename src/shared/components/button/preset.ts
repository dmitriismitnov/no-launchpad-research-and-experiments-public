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
            boxShadow: {
                _light: "0 2px 8px {colors.shadow3.light}",
                _dark: "0 2px 8px {colors.shadow3.dark}",
            },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "{borderWidths.thin}", },
            outlineColor: {
                _light: { _focusVisible: "accent.base.light", },
                _dark: { _focusVisible: "accent.base.dark", },
            },
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
                        _light: { base: "ink.strong.light", _hover: "accent.deep.light", },
                        _dark: { base: "ink.strong.dark", _hover: "accent.base.dark", },
                    },
                    borderColor: {
                        _light: { base: "ink.strong.light", _hover: "accent.deep.light", },
                        _dark: { base: "ink.strong.dark", _hover: "accent.base.dark", },
                    },
                    color: {
                        _light: "surface.base.light",
                        _dark: "ink.strong.light",
                    },
                },
            },

            secondary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: { base: "transparent", _hover: "surface.raised.light", },
                        _dark: { base: "transparent", _hover: "surface.raised.dark", },
                    },
                    borderColor: {
                        _light: "line.strong.light",
                        _dark: "line.strong.dark",
                    },
                    color: {
                        _light: "ink.strong.light",
                        _dark: "ink.strong.dark",
                    },
                },
            },

            ghost: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: { base: "surface.base.light", _hover: "surface.raised.light", },
                        _dark: { base: "surface.base.dark", _hover: "surface.raised.dark", },
                    },
                    borderColor: {
                        _light: "line.soft.light",
                        _dark: "line.soft.dark",
                    },
                    color: {
                        _light: "ink.soft.light",
                        _dark: "ink.soft.dark",
                    },
                },
            },

            icon: {
                root: {
                    width: "x16",
                    height: "x16",
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        _light: { base: "transparent", _hover: "surface.raised.light", },
                        _dark: { base: "transparent", _hover: "surface.raised.dark", },
                    },
                    color: {
                        _light: "ink.soft.light",
                        _dark: "ink.soft.dark",
                    },
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
