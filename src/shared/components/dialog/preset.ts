import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Dialog visual projection. Slots: root / trigger / overlay / surface / header /
 * title / close / body / description / footer.
 *
 * A centered modal surface over a scrim. It is rendered in place: the overlay
 * and surface are viewport-fixed rather than portaled, and the consumer passes
 * the footer actions as nodes. `size` selects the surface width.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/focus/*`, `semantic/shadow/*`):
 * - overlay/scrim -> a fixed literal (the foundation has no scrim token)
 * - surface/overlay -> semantic.surface.overlay
 * - border/subtle -> semantic.border.subtle
 * - focus/ring -> semantic.focus.ring (trigger, close)
 * - text/primary -> semantic.text.primary
 * - text/secondary -> semantic.text.secondary
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: the scrim is a literal `rgba(15, 23, 42, 0.72)` because there
 * is no semantic scrim token; it matches Pen's light value and stays dark in the
 * dark theme. Pen fixes the surface at 440px and radius `lg` (the code radii stop
 * at `md`). Focus trapping, focus return and scroll locking are out of scope; the
 * close control receives `autoFocus`.
 */
export const dialogRecipe = defineSlotRecipe({
    className: "dialog",
    slots: [
        "root",
        "trigger",
        "overlay",
        "surface",
        "header",
        "title",
        "close",
        "body",
        "description",
        "footer",
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
            maxHeight: "calc(100vh - 2rem)",
            maxWidth: "calc(100vw - 2rem)",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "md",
            backgroundColor: "semantic.surface.overlay",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        header: {
            display: "flex",
            alignItems: "center",
            gap: "x8",
            paddingBlockStart: "x10",
            paddingInline: "x10",
            paddingBlockEnd: "x6",
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
    },

    variants: {
        size: {
            sm: { surface: { width: "360px", }, },
            md: { surface: { width: "440px", }, },
            lg: { surface: { width: "560px", }, },
        },
    },

    defaultVariants: { size: "md", },
});

export const dialogPreset = definePreset({
    name: "@no-launchpad/dialog",
    theme: { slotRecipes: { dialog: dialogRecipe, }, },
});
