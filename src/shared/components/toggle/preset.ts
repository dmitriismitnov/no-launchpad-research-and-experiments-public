import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Toggle visual projection. Slots: root / icon / label.
 *
 * A pressed-state button: the shared form-control focus ring, a raised resting
 * surface and a brand-tinted selected surface. Colors come from the semantic
 * layer; the recipe never branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - surface/selected -> brand.50.background (exact)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/secondary -> common.700.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/disabled-bg -> common.100.background
 * - action/disabled-fg -> common.400.background (exact)
 *
 * Approximations: Pen's 36px height and 14px inline padding are off the `xN`
 * scale, so they stay literals. Pen's selected label uses `text/link`
 * (green.700 / green.400); the nearest theme pair is `brand.700.background`
 * (green.700 / green.300).
 */
export const toggleRecipe = defineSlotRecipe({
    className: "toggle",
    slots: [ "root", "icon", "label", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "x4",
            height: "36px",
            paddingBlock: "x4",
            paddingInline: "14px",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.700.background",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { backgroundColor: "semantic.common.100.background", },
                _active: {
                    backgroundColor: "semantic.brand.700.background",
                    borderColor: "semantic.brand.700.background",
                    color: "semantic.brand.700.text",
                },
            },
        },

        icon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "currentColor",
        },
    },

    variants: {
        pressed: {
            true: {
                root: {
                    backgroundColor: "semantic.brand.50.background",
                    borderColor: "semantic.brand.700.background",
                    color: "semantic.brand.700.background",
                    _enabled: {
                        _hover: { backgroundColor: "semantic.brand.50.background", },
                    },
                },
            },
        },

        disabled: {
            true: {
                root: {
                    backgroundColor: "semantic.common.100.background",
                    color: "semantic.common.400.background",
                    cursor: "not-allowed",
                },
                icon: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        pressed: false,
        disabled: false,
    },
});

export const togglePreset = definePreset({
    name: "@no-launchpad/toggle",
    theme: { slotRecipes: { toggle: toggleRecipe, }, },
});
