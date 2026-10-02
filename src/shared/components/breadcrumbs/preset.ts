import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Breadcrumbs visual projection. Slots: root / list / item / link / separator /
 * current.
 *
 * An ordered list of ancestor links ending at the current page. The last entry
 * is rendered as the current crumb (`aria-current="page"`), never as a link.
 *
 * Pen references the newer role layer (`semantic/text/*`):
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/primary -> common.50.text (exact)
 *
 * Approximations: Pen gaps every part 8px (`x4`, exact) and draws a 14px
 * chevron; `Icon` steps to `sm` (16px). The overflow control and compact variant
 * from the master are out of scope: the component renders the full trail.
 */
export const breadcrumbsRecipe = defineSlotRecipe({
    className: "breadcrumbs",
    slots: [ "root", "list", "item", "link", "separator", "current", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
        },

        list: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            margin: "0",
            padding: "0",
            listStyleType: "none",
        },

        item: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
        },

        link: {
            borderRadius: "sm",
            textDecorationLine: "none",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.700.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "2px", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _hover: { textDecorationLine: "underline", },
        },

        separator: {
            display: "inline-flex",
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        current: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },
    },
});

export const breadcrumbsPreset = definePreset({
    name: "@no-launchpad/breadcrumbs",
    theme: { slotRecipes: { breadcrumbs: breadcrumbsRecipe, }, },
});
