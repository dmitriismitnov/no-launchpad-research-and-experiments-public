import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Nav Item visual projection. Slots: root / icon / label.
 *
 * A horizontal navigation entry. The active entry paints the selected surface
 * and switches both glyph and label to the link role; hover uses the quiet
 * surface role and selection wins over it.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`):
 * - surface/selected -> brand.50.background (exact, both themes)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - text/secondary -> common.700.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step brighter)
 * - text/disabled -> common.400.background (exact, both themes)
 *
 * Approximations: Pen pads 8px block / 12px inline and gaps 8px; those are exact
 * on the `xN` scale (`x4` / `x6` / `x4`). Pen's optional glyph is 14px; `Icon`
 * uses `sm` (16px). The active indicator is the selected background rather than
 * a separate bar, matching the master. The focus indicator uses the shared
 * `focus/ring` role (`iosjR`), not the brand fill.
 */
export const navItemRecipe = defineSlotRecipe({
    className: "navItem",
    slots: [ "root", "icon", "label", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            paddingBlock: "x4",
            paddingInline: "x6",
            borderRadius: "sm",
            textDecorationLine: "none",
            cursor: "pointer",
            backgroundColor: "transparent",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _hover: { backgroundColor: "semantic.common.100.background", },
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.700.background",
        },

        label: {
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
        },
    },

    variants: {
        active: {
            true: {
                root: {
                    backgroundColor: "semantic.brand.50.background",
                    _hover: { backgroundColor: "semantic.brand.50.background", },
                },
                icon: { color: "semantic.brand.700.background", },
                label: { color: "semantic.brand.700.background", },
            },
        },

        disabled: {
            true: {
                root: {
                    cursor: "not-allowed",
                    pointerEvents: "none",
                },
                icon: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
            },
        },
    },
});

export const navItemPreset = definePreset({
    name: "@no-launchpad/nav-item",
    theme: { slotRecipes: { navItem: navItemRecipe, }, },
});
