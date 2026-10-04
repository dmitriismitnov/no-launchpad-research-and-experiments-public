import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Popover visual projection. Slots: root / trigger / surface / content / title /
 * description.
 *
 * A light overlay surface anchored to a trigger. The trigger is the positioning
 * root and the surface is placed by `placement`; `title` and `description` are
 * the optional header, and any remaining content is rendered after them.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/border/*`, `semantic/focus/*`, `semantic/shadow/*`):
 * - surface/overlay -> semantic.surface.overlay (white light; neutral.800 dark)
 * - border/subtle -> semantic.border.subtle (structural boundary)
 * - radius/lg -> lg (16px; Pen fixes the overlay card at `radius/lg`)
 * - text/primary -> semantic.text.primary (title)
 * - text/secondary -> semantic.text.secondary (description)
 * - focus/ring -> semantic.focus.ring (trigger focus indicator)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the surface at 280px; the component exposes it as a
 * literal `minWidth`. The arrow, with header, modal/non-modal modes and
 * close-control variant are out of scope; a consumer composes menu or form
 * content through `children`.
 */
export const popoverRecipe = defineSlotRecipe({
    className: "popover",
    slots: [ "root", "trigger", "surface", "content", "title", "description", ],

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

        surface: {
            position: "absolute",
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            minWidth: "280px",
            maxWidth: "320px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "lg",
            backgroundColor: "semantic.surface.overlay",
            boxShadow: "0 12px 32px {colors.semantic.shadow.500}",
        },

        content: {
            display: "flex",
            flexDirection: "column",
            gap: "x4",
            padding: "x8",
        },

        title: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        description: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },
    },

    variants: {
        placement: {
            bottom: { surface: { top: "calc(100% + 0.5rem)", left: "0", }, },
            top: { surface: { bottom: "calc(100% + 0.5rem)", left: "0", }, },
            right: { surface: { left: "calc(100% + 0.5rem)", top: "0", }, },
            left: { surface: { right: "calc(100% + 0.5rem)", top: "0", }, },
        },
    },

    defaultVariants: { placement: "bottom", },
});

export const popoverPreset = definePreset({
    name: "@no-launchpad/popover",
    theme: { slotRecipes: { popover: popoverRecipe, }, },
});
