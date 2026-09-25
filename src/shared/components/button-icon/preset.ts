import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * ButtonIcon visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / icon.
 *
 * Icon-only sibling of Button: same `tone`/`size` vocabulary and the same
 * semantic slot roles, but a square geometry and no `label` slot. The button
 * has no visible text, so `root` only describes what belongs to the button as
 * a whole (fill, border, shadow, opacity, focus) and the glyph paints from the
 * `icon` projection.
 *
 * Colors come from the semantic layer, which switches theme inside the token;
 * the recipe does not branch on `_light` / `_dark`.
 */
export const buttonIconRecipe = defineSlotRecipe({
    className: "buttonIcon",
    slots: [ "root", "icon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // The square is fixed by `size`, so any user-agent padding would
            // only squeeze the glyph.
            paddingInline: "x0",
            paddingBlock: "x0",
            borderRadius: "sm",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        icon: {
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
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    // `_enabled` guards the interaction states so a disabled
                    // button cannot be re-tinted by `:hover` / `:active`.
                    opacity: {
                        base: 1,
                        _enabled: { _hover: 0.85, _active: 0.7, },
                        _disabled: 0.45,
                    },
                },
                icon: { color: { base: "semantic.common.950.icon", }, },
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
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    opacity: { base: 1, _disabled: 0.45, },
                },
                icon: { color: { base: "semantic.common.50.icon", }, },
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
                    boxShadow: "0 2px 8px {colors.semantic.shadow.700}",
                    opacity: { base: 1, _disabled: 0.45, },
                },
                icon: { color: { base: "semantic.common.50.icon", }, },
            },
        },

        // The square matches the height of the same-sized Button, so the two
        // controls line up. The icon slot stays `x8` in both sizes.
        size: {
            sm: { root: { width: "x16", height: "x16", }, },
            md: { root: { width: "x25", height: "x25", }, },
        },
    },

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});

export const buttonIconPreset = definePreset({
    name: "@no-launchpad/button-icon",
    theme: {
        slotRecipes: {
            buttonIcon: buttonIconRecipe,
        },
    },
});
