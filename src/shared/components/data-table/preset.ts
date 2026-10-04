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
 * `semantic/text/*`), resolved against the Pen documentation frame `g02ukq` and
 * the masters `FZPkF` (Data Table) / `M2LZ59` (Table Row):
 * - card surface -> semantic.surface.raised (white light / neutral.900 dark)
 * - card boundary -> semantic.border.subtle (neutral.200/800)
 * - header band -> semantic.surface.sunken (neutral.100 light / neutral.950 dark)
 * - header label -> semantic.text.tertiary (neutral.600/400)
 * - body cell -> semantic.text.secondary (neutral.700/300)
 * - leading cell -> semantic.text.primary (neutral.900/50)
 * - header/row separators -> common.200.divider (Pen `common/200/divider`)
 *
 * The doc's focus rule belongs to the BLOCKED interactive row (focus-indicator
 * audit 0/0), so no focus ring is projected.
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
            borderColor: "semantic.border.subtle",
            borderRadius: "1rem",
            backgroundColor: "semantic.surface.raised",
        },

        head: {
            backgroundColor: "semantic.surface.sunken",
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
            color: "semantic.text.tertiary",
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
            color: "semantic.text.secondary",
            borderBottomWidth: "thin",
            borderBottomStyle: "solid",
            borderBottomColor: "semantic.common.200.divider",
        },

        cellLead: {
            fontWeight: "medium",
            color: "semantic.text.primary",
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
