import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Tree Item visual projection. Slots: root / row / expander / expanderIcon /
 * expanderSpacer / content / icon / label / group.
 *
 * One node of a tree: an expander hit area, an optional leading glyph and a
 * label inside a selectable row, plus a nested group when expanded. The row and
 * the expander are separate hit areas, as Pen requires. Nesting is expressed by
 * the `group` slot: every level adds a fixed inline indent, so depth is carried
 * by structure rather than a depth prop.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/action/*`):
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - surface/selected -> brand.50.background (exact, both themes)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step brighter)
 * - text/disabled -> common.400.background (exact, both themes)
 * - focus/ring -> brand.500.background (shared focus convention)
 *
 * Approximations: Pen pads the row 6px block / 10px inline (`x3` / `x5`,
 * exact) and steps the indent by 18px; the `xN` scale cannot express 18px, so
 * the group indent is the literal `18px`. Pen's 14px expander steps up to the
 * `x8` (16px) expander box. The selected node paints both its glyph and label
 * with `text/link`.
 */
export const treeItemRecipe = defineSlotRecipe({
    className: "treeItem",
    slots: [
        "root",
        "row",
        "expander",
        "expanderIcon",
        "expanderSpacer",
        "content",
        "icon",
        "label",
        "group",
    ],

    base: {
        root: {
            width: "100%",
        },

        row: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            paddingBlock: "x3",
            paddingInline: "x5",
            borderRadius: "sm",
            cursor: "pointer",
            _hover: { backgroundColor: "semantic.common.100.background", },
            _focusWithin: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        expander: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x8",
            height: "x8",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: "none",
        },

        expanderIcon: {
            transitionProperty: "transform",
            transitionDuration: "150ms",
            transitionTimingFunction: "ease",
        },

        expanderSpacer: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        content: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            flex: "1",
            minWidth: "0",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "left",
            outlineStyle: "none",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.700.background",
        },

        label: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        group: {
            display: "flex",
            flexDirection: "column",
            margin: "0",
            padding: "0",
            paddingInlineStart: "18px",
        },
    },

    variants: {
        expanded: {
            true: {
                expanderIcon: { transform: "rotate(90deg)", },
            },
        },

        selected: {
            true: {
                row: {
                    backgroundColor: "semantic.brand.50.background",
                    _hover: { backgroundColor: "semantic.brand.50.background", },
                },
                icon: { color: "semantic.brand.700.background", },
                label: { color: "semantic.brand.700.background", },
            },
        },

        disabled: {
            true: {
                row: {
                    cursor: "not-allowed",
                    pointerEvents: "none",
                    _hover: { backgroundColor: "transparent", },
                },
                expander: {
                    cursor: "not-allowed",
                    color: "semantic.common.400.background",
                },
                content: { cursor: "not-allowed", },
                icon: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        expanded: false,
        selected: false,
        disabled: false,
    },
});

export const treeItemPreset = definePreset({
    name: "@no-launchpad/tree-item",
    theme: { slotRecipes: { treeItem: treeItemRecipe, }, },
});
