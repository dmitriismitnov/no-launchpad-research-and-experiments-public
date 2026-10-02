import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Clipboard visual projection. Slots: root / value / copy.
 *
 * A single-line readonly field: a monospace value on a sunken surface with an
 * optional copy control. The component never touches the clipboard API; `onCopy`
 * is a consumer callback.
 *
 * Pen references the newer role layer (`semantic/surface/sunken`,
 * `semantic/border/subtle`, `semantic/text/*`):
 * - surface/sunken -> common.100.background (light exact; dark one step, the
 *   Skeleton/Spinner convention)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 *
 * Approximations: Pen's mono family (IBM Plex Mono) has no code token, so the
 * body family is used.
 */
export const clipboardRecipe = defineSlotRecipe({
    className: "clipboard",
    slots: [ "root", "value", "copy", ],

    base: {
        root: {
            display: "flex",
            alignItems: "center",
            gap: "x2",
            minHeight: "x20",
            paddingInline: "x6",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.100.background",
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        copy: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.700.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },
    },
});

export const clipboardPreset = definePreset({
    name: "@no-launchpad/clipboard",
    theme: { slotRecipes: { clipboard: clipboardRecipe, }, },
});
