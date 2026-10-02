import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Select visual projection. Slots: root / label / control / select / chevron /
 * hint / error.
 *
 * The simplest accessible choice: a styled **native `<select>`** inside a
 * relative control with a decorative chevron. Native semantics (keyboard,
 * type-ahead, form submission, screen-reader announcement of the selected
 * option) are preserved; the popup, option rows and search field from Pen are
 * therefore out of scope for this port.
 *
 * The field contract mirrors `Input`: label above, hint or error below, and the
 * component owns `aria-invalid` / `aria-describedby`.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - action/disabled-bg -> common.100.background
 * - action/disabled-fg -> common.400.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's 40px trigger is the `x20` step and its 12px inline
 * padding the `x6` step. Pen renders a `text/tertiary` placeholder that switches
 * to `text/primary` once a value is chosen; a native `<select>` cannot style its
 * own placeholder reliably across browsers, so the value always reads
 * `text/primary` and the dedicated placeholder row is a disabled empty option.
 * Pen's popup (overlay surface, subtle border, `shadow/500`) is replaced by the
 * platform dropdown.
 */
export const selectRecipe = defineSlotRecipe({
    className: "select",
    slots: [ "root", "label", "control", "select", "chevron", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        control: {
            position: "relative",
            width: "100%",
        },

        select: {
            width: "100%",
            height: "x20",
            paddingInlineStart: "x6",
            paddingInlineEnd: "x16",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            appearance: "none",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        chevron: {
            position: "absolute",
            top: "50%",
            right: "x6",
            transform: "translateY(-50%)",
            color: "semantic.common.600.background",
            pointerEvents: "none",
        },

        hint: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        error: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.600.background",
        },
    },

    variants: {
        invalid: {
            true: {
                select: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                select: {
                    backgroundColor: "semantic.common.100.background",
                    color: "semantic.common.400.background",
                },
                chevron: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const selectPreset = definePreset({
    name: "@no-launchpad/select",
    theme: { slotRecipes: { select: selectRecipe, }, },
});
