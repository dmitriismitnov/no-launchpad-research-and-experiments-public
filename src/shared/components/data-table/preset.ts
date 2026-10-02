import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Data Table visual projection. Slots: root / head / headCell / row / cell /
 * cellLead / cellEnd.
 *
 * A declarative table surface. The component owns the anatomy: it maps typed
 * `columns` and `rows` to a real `<table>`, so there are no child components and
 * the markup keeps native table semantics.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/border/*`,
 * `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - surface/sunken -> common.100.background (light exact; dark one step, the
 *   Skeleton/Spinner convention)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - dividers -> common.200.divider, matching the Pen row rule
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 *
 * Approximations: Pen's `radius/lg` (16px) has no foundation token, so `1rem` is
 * the literal equivalent (the EmptyState convention). Pen's 14px inline padding
 * has no `x7`; `x8` (16px) keeps the row rhythm. The master's toolbar, footer and
 * leading selection column are out of scope: there is no sorting, selection or
 * pagination behaviour.
 */
export const dataTableRecipe = defineSlotRecipe({
    className: "dataTable",
    slots: [ "root", "head", "headCell", "row", "cell", "cellLead", "cellEnd", ],

    base: {
        root: {
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "0",
            tableLayout: "fixed",
            overflow: "hidden",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "1rem",
            backgroundColor: "semantic.common.50.background",
        },

        head: {
            backgroundColor: "semantic.common.100.background",
        },

        headCell: {
            height: "44px",
            paddingInline: "x8",
            textAlign: "start",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.600.background",
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: "semantic.common.200.divider",
            // Tables do not reliably clip to `overflow: hidden`; round the
            // header ends explicitly so the surface reads as one card.
            "&:first-child": { borderTopLeftRadius: "1rem", },
            "&:last-child": { borderTopRightRadius: "1rem", },
        },

        // Pen rules every row; the final rule is dropped so the surface closes.
        row: {
            height: "52px",
            "&:last-child > *": {
                borderBottomWidth: "none",
            },
            "&:last-child > *:first-child": { borderBottomLeftRadius: "1rem", },
            "&:last-child > *:last-child": { borderBottomRightRadius: "1rem", },
        },

        cell: {
            paddingInline: "x8",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: "semantic.common.200.divider",
        },

        cellLead: {
            fontWeight: "medium",
            color: "semantic.common.50.text",
        },

        cellEnd: {
            textAlign: "end",
        },
    },
});

export const dataTablePreset = definePreset({
    name: "@no-launchpad/data-table",
    theme: { slotRecipes: { dataTable: dataTableRecipe, }, },
});
