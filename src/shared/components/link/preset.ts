import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Link visual projection. Slots: root / leadingIcon / label / trailingIcon.
 *
 * An inline anchor. The anatomy is open at the ends so a consumer can attach a
 * leading or trailing glyph; colour always reads the `link`/`text` role.
 *
 * Pen references the newer role layer (`semantic/text/*`):
 * - text/link -> brand.700.background (light exact; dark one step brighter)
 * - text/secondary -> common.700.background (exact)
 * - text/primary -> common.50.text (exact)
 * - text/disabled -> common.400.background (exact, both themes)
 *
 * Approximations: Pen's trailing external glyph is 14px; `Icon` sizes step in
 * the shared scale, so `sm` (16px) is used. Pen paints the hover specimen with
 * `text/primary`; the component keeps the tone colour and marks hover with an
 * underline, as the task requires. The visited state is not modelled. The
 * focus indicator uses the shared `focus/ring` role (`Z4EDge`), not the brand
 * fill. The `visuallyHidden` slot carries the external-link announcement
 * required by `DTTTs`.
 */
export const linkRecipe = defineSlotRecipe({
    className: "link",
    slots: [ "root", "leadingIcon", "label", "trailingIcon", "visuallyHidden", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x2",
            borderRadius: "sm",
            textDecorationLine: "none",
            cursor: "pointer",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "2px", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        leadingIcon: {
            flexShrink: "0",
        },

        label: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "normal",
        },

        trailingIcon: {
            flexShrink: "0",
        },

        // Screen-reader-only external-link announcement. Mirrors the shared
        // visually-hidden treatment used by `Textarea`.
        visuallyHidden: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
        },
    },

    variants: {
        tone: {
            link: { root: { color: "semantic.brand.700.background", }, },
            subtle: { root: { color: "semantic.common.700.background", }, },
            primary: { root: { color: "semantic.common.50.text", }, },
        },

        underline: {
            hover: { root: { _hover: { textDecorationLine: "underline", }, }, },
            always: { root: { textDecorationLine: "underline", }, },
            none: {},
        },

        disabled: {
            true: {
                root: {
                    color: "semantic.common.400.background",
                    cursor: "not-allowed",
                    pointerEvents: "none",
                },
            },
        },
    },

    defaultVariants: { tone: "link", underline: "hover", },
});

export const linkPreset = definePreset({
    name: "@no-launchpad/link",
    theme: { slotRecipes: { link: linkRecipe, }, },
});
