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
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
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
            // Primary feedback is opacity-only; it never swaps hue.
            primary: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: { base: "semantic.common.50.text", },
                    color: { base: "semantic.common.50.background", },
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    // `_enabled` guards the interaction states so a disabled
                    // button cannot be re-tinted by `:hover` / `:active`.
                    opacity: {
                        base: 1,
                        _enabled: { _hover: 0.85, _active: 0.7, },
                        _disabled: 0.45,
                    },
                },
            },

            // Secondary/Ghost use surface-feedback: only the fill changes.
            secondary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        base: "transparent",
                        _enabled: {
                            _hover: "semantic.common.100.background",
                            _active: "semantic.common.200.background",
                        },
                    },
                    borderColor: "semantic.common.700.background",
                    color: { base: "semantic.common.50.text", },
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    opacity: { base: 1, _disabled: 0.45, },
                },
            },

            ghost: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    backgroundColor: {
                        base: "semantic.common.50.background",
                        _enabled: {
                            _hover: "semantic.common.100.background",
                            _active: "semantic.common.200.background",
                        },
                    },
                    borderColor: "semantic.common.200.divider",
                    color: { base: "semantic.common.600.background", },
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    opacity: { base: 1, _disabled: 0.45, },
                },
            },
        },

        // `sm` is a code-only extension; PEN specifies the 50px `md` Button.
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
