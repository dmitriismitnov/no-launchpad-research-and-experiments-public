import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Toggle Group visual projection. Slots: root / item / label.
 *
 * A segmented strip of pressed-state buttons on a sunken surface. The selected
 * item lifts onto the raised surface with the strong boundary; unselected items
 * are transparent and read the secondary text role.
 *
 * Pen references the newer role layer:
 * - surface/sunken -> common.100.background (light exact; dark one step)
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/hover -> common.100.background
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/disabled -> common.400.background (exact)
 *
 * Approximations: Pen pads items 6px block / 16px inline and the root 2px; the
 * `xN` scale expresses both exactly (`x3` / `x8` / `x1`).
 */
export const toggleGroupRecipe = defineSlotRecipe({
    className: "toggleGroup",
    slots: [ "root", "item", "icon", "label", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x1",
            padding: "x1",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.100.background",
        },

        item: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "x2",
            paddingBlock: "x3",
            paddingInline: "x8",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "transparent",
            backgroundColor: "transparent",
            color: "semantic.common.700.background",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { backgroundColor: "semantic.common.50.background", },
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
                item: {
                    backgroundColor: "semantic.common.50.background",
                    borderColor: "semantic.common.50.border.strong",
                    color: "semantic.common.50.text",
                    _enabled: {
                        _hover: { backgroundColor: "semantic.common.50.background", },
                    },
                    // A disabled segment keeps the disabled group surface, never
                    // the raised selected surface, even when it is the effective
                    // selection. `_disabled` is more specific than the plain
                    // pressed selector, so it wins within the same layer.
                    _disabled: {
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        color: "semantic.common.400.background",
                        cursor: "not-allowed",
                    },
                },
                label: { fontWeight: "semibold", },
            },
        },

        disabled: {
            true: {
                item: {
                    color: "semantic.common.400.background",
                    cursor: "not-allowed",
                },
                label: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        pressed: false,
        disabled: false,
    },
});

export const toggleGroupPreset = definePreset({
    name: "@no-launchpad/toggle-group",
    theme: { slotRecipes: { toggleGroup: toggleGroupRecipe, }, },
});
