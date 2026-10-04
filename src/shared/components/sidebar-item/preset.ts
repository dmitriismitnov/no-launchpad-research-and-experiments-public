import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Sidebar Item visual projection. Slots: root / icon / label.
 *
 * A vertical navigation entry that fills its rail. It shares the Nav Item colour
 * contract but uses the sidebar's geometry: a 10px glyph gap and 10px inline
 * padding, with the label stretching to the remaining width.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`):
 * - surface/selected -> brand.50.background (exact, both themes)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - text/secondary -> common.700.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step brighter)
 * - text/disabled -> common.400.background (exact, both themes)
 *
 * Approximations: Pen fixes the item at 200px; the component stretches to its
 * rail (`width: 100%`). Pen's 16px glyph is `Icon` `sm` (`x8`, exact). Group
 * labels, nested items and the collapse control from the master are out of
 * scope. The focus indicator uses the shared `focus/ring` role (`uhiC3`), not
 * the brand fill.
 */
export const sidebarItemRecipe = defineSlotRecipe({
    className: "sidebarItem",
    slots: [ "root", "icon", "label", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "x5",
            paddingBlock: "x4",
            paddingInline: "x5",
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
            flex: "1",
            minWidth: "0",
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

export const sidebarItemPreset = definePreset({
    name: "@no-launchpad/sidebar-item",
    theme: { slotRecipes: { sidebarItem: sidebarItemRecipe, }, },
});
