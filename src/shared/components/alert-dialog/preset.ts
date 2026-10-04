import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Alert Dialog visual projection. Slots: root / trigger / overlay / surface /
 * header / icon / title / close / body / description / footer / cancel / confirm.
 *
 * A centered modal surface over a scrim for destructive or irreversible
 * decisions. The `destructive` variant repaints only the confirm action; the
 * cancel action stays the quieter secondary control and takes focus first.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/focus/*`, `semantic/shadow/*`,
 * `semantic/feedback/*`, `semantic/action/*`):
 * - overlay/scrim -> a fixed literal (the foundation has no scrim token)
 * - surface/overlay -> semantic.surface.overlay
 * - border/subtle -> semantic.border.subtle
 * - focus/ring -> semantic.focus.ring (trigger, close, cancel, confirm)
 * - text/primary -> semantic.text.primary
 * - text/secondary -> semantic.text.secondary
 * - text/tertiary -> semantic.text.tertiary
 * - feedback/negative-fg -> negative.700.background (exact, icon)
 * - action/secondary-* -> semantic.action.secondary.*
 * - action/danger-* -> semantic.action.danger.*
 * - shadow/600 -> semantic.shadow.600 (Pen offsets 0 12px 32px)
 *
 * Approximations: as in `Dialog`, the scrim is a fixed literal and the surface
 * uses `md` for Pen's `radius/lg`, fixed at 420px. The cancel/confirm buttons are
 * owned here rather than by `Button`, because `Button` has no danger tone. The
 * code `Action` master geometry (40px tall, 16px inline padding) is reproduced
 * with the `xN` scale. Pen's `action/danger-bg` is red.600 in both themes, which
 * `semantic.action.danger.background` now matches exactly. Focus trapping, focus
 * return and scroll locking are out of scope; focus starts on the cancel action.
 */
export const alertDialogRecipe = defineSlotRecipe({
    className: "alertDialog",
    slots: [
        "root",
        "trigger",
        "overlay",
        "surface",
        "header",
        "icon",
        "title",
        "close",
        "body",
        "description",
        "footer",
        "cancel",
        "confirm",
    ],

    base: {
        root: {
            position: "relative",
            display: "inline-flex",
        },

        trigger: {
            display: "inline-flex",
            alignItems: "center",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "inherit",
            color: "inherit",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        overlay: {
            position: "fixed",
            inset: "0",
            zIndex: "30",
            backgroundColor: "rgba(15, 23, 42, 0.72)",
        },

        surface: {
            position: "fixed",
            zIndex: "31",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            width: "420px",
            maxHeight: "calc(100vh - 2rem)",
            maxWidth: "calc(100vw - 2rem)",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.overlay",
            boxShadow: "0 12px 32px {colors.semantic.shadow.600}",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x6",
            paddingBlockStart: "x10",
            paddingInline: "x10",
            paddingBlockEnd: "x6",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.negative.700.background",
        },

        title: {
            flex: "1",
            minWidth: "0",
            fontFamily: "body",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        close: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.text.tertiary",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        body: {
            paddingInline: "x10",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        footer: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "x6",
            padding: "x10",
        },

        cancel: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "x20",
            gap: "x4",
            paddingInline: "x8",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.action.secondary.border",
            borderRadius: "sm",
            backgroundColor: {
                base: "transparent",
                _hover: "semantic.action.secondary.hover",
            },
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            color: "semantic.action.secondary.foreground",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        confirm: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "x20",
            gap: "x4",
            paddingInline: "x8",
            borderWidth: "none",
            borderStyle: "none",
            borderRadius: "sm",
            backgroundColor: "semantic.common.50.text",
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            color: "semantic.common.950.text",
            opacity: { base: 1, _hover: 0.85, },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },
    },

    variants: {
        destructive: {
            true: {
                confirm: {
                    backgroundColor: "semantic.action.danger.background",
                    color: "semantic.action.danger.foreground",
                },
            },
        },
    },

    defaultVariants: { destructive: false, },
});

export const alertDialogPreset = definePreset({
    name: "@no-launchpad/alert-dialog",
    theme: { slotRecipes: { alertDialog: alertDialogRecipe, }, },
});
