import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Pagination visual projection. Slots: root / item / itemCurrent / ellipsis.
 *
 * A row of 36px square page controls. `item` is the shared geometry for the
 * previous, next and numbered buttons; `itemCurrent` paints the marked page and
 * `ellipsis` is the static gap marker.
 *
 * Pen references the newer role layer (`semantic/action/*`, `semantic/text/*`,
 * `semantic/surface/*`):
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-fg -> common.50.background (inverse foreground pair)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact, both themes)
 *
 * Approximations: Pen fixes each control at 36px square with a 4px gap (`x2`,
 * exact); the square is a literal because the `xN` scale cannot express 36px.
 * Pen draws 16px chevrons (`Icon` `sm`, exact). The first/last, page-size and
 * compact variants from the master are out of scope.
 */
export const paginationRecipe = defineSlotRecipe({
    className: "pagination",
    slots: [ "root", "item", "itemCurrent", "ellipsis", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
        },

        item: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "36px",
            height: "36px",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.700.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
            _hover: { backgroundColor: "semantic.common.100.background", },
            _disabled: {
                cursor: "not-allowed",
                color: "semantic.common.400.background",
                backgroundColor: "transparent",
                _hover: { backgroundColor: "transparent", },
            },
        },

        itemCurrent: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "36px",
            height: "36px",
            borderRadius: "sm",
            backgroundColor: "semantic.brand.700.background",
            cursor: "default",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            color: "semantic.common.50.background",
        },

        ellipsis: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "36px",
            height: "36px",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },
    },
});

export const paginationPreset = definePreset({
    name: "@no-launchpad/pagination",
    theme: { slotRecipes: { pagination: paginationRecipe, }, },
});
