import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

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
            borderRadius: "control",
            fontFamily: "body",
            fontSize: "button",
            fontWeight: "medium",
            cursor: "pointer",
            boxShadow: {
                _light: "0 2px 8px {colors.shadow3.light}",
                _dark: "0 2px 8px {colors.shadow3.dark}",
            },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.x2}", },
            outlineOffset: { _focusVisible: "{borderWidths.x1}", },
            outlineColor: {
                _light: { _focusVisible: "accent.light", },
                _dark: { _focusVisible: "accent.dark", },
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
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: { base: "ink.light", _hover: "accentDeep.light", },
                        _dark: { base: "ink.dark", _hover: "accent.dark", },
                    },
                    borderColor: {
                        _light: { base: "ink.light", _hover: "accentDeep.light", },
                        _dark: { base: "ink.dark", _hover: "accent.dark", },
                    },
                    color: {
                        _light: "surface.light",
                        _dark: "ink.light",
                    },
                },
            },

            secondary: {
                root: {
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: { base: "transparent", _hover: "surfaceRaised.light", },
                        _dark: { base: "transparent", _hover: "surfaceRaised.dark", },
                    },
                    borderColor: {
                        _light: "line.light",
                        _dark: "line.dark",
                    },
                    color: {
                        _light: "ink.light",
                        _dark: "ink.dark",
                    },
                },
            },

            ghost: {
                root: {
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: { base: "surface.light", _hover: "surfaceRaised.light", },
                        _dark: { base: "surface.dark", _hover: "surfaceRaised.dark", },
                    },
                    borderColor: {
                        _light: "lineSoft.light",
                        _dark: "lineSoft.dark",
                    },
                    color: {
                        _light: "ink2.light",
                        _dark: "ink2.dark",
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
                        _light: { base: "transparent", _hover: "surfaceRaised.light", },
                        _dark: { base: "transparent", _hover: "surfaceRaised.dark", },
                    },
                    color: {
                        _light: "ink2.light",
                        _dark: "ink2.dark",
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
