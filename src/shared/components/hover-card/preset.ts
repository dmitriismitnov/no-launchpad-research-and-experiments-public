import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Hover Card visual projection. Slots: root / trigger / surface / content / user
 * / avatar / initials / meta / name / role / bio / actions.
 *
 * A rich preview surface shown on hover or focus. The trigger is the positioning
 * root and the surface is placed by `placement`; the user row (avatar, name,
 * role), the bio and an optional actions row are the composed parts.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/brand/*`, `semantic/border/*`, `semantic/focus/*`,
 * `semantic/shadow/*`):
 * - surface/overlay -> semantic.surface.overlay (white light; neutral.800 dark)
 * - border/subtle -> semantic.border.subtle (structural boundary)
 * - radius/lg -> lg (16px; Pen fixes the overlay card at `radius/lg`)
 * - text/primary -> semantic.text.primary (name)
 * - text/secondary -> semantic.text.secondary (bio)
 * - text/tertiary -> semantic.text.tertiary (role)
 * - brand/100 background -> brand.100.background (avatar)
 * - brand/100 text -> brand.100.text (initials)
 * - focus/ring -> semantic.focus.ring (trigger focus indicator)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the surface at 300px and the avatar at 36px; both
 * are literals because the `xN` scale cannot express them. The mono family is
 * unused here. The optional open delay, with-avatar/with-actions variants,
 * trigger composition and collision handling are out of scope.
 */
export const hoverCardRecipe = defineSlotRecipe({
    className: "hoverCard",
    slots: [
        "root",
        "trigger",
        "surface",
        "content",
        "user",
        "avatar",
        "initials",
        "meta",
        "name",
        "role",
        "bio",
        "actions",
    ],

    base: {
        root: {
            position: "relative",
            display: "inline-flex",
        },

        trigger: {
            display: "inline-flex",
            alignItems: "center",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        surface: {
            position: "absolute",
            zIndex: "20",
            width: "300px",
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
            gap: "x5",
            padding: "x8",
        },

        user: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
        },

        avatar: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "36px",
            height: "36px",
            borderRadius: "full",
            backgroundColor: "semantic.brand.100.background",
        },

        initials: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.brand.100.text",
        },

        meta: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            minWidth: "0",
        },

        name: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        role: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.tertiary",
        },

        bio: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        actions: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "x4",
        },
    },

    variants: {
        placement: {
            // The trigger and surface share one pointer boundary, so they sit
            // flush: any physical gap would be outside the root and close the
            // card while the pointer crosses it.
            top: {
                surface: { bottom: "100%", left: "50%", transform: "translateX(-50%)", },
            },
            bottom: {
                surface: { top: "100%", left: "50%", transform: "translateX(-50%)", },
            },
            left: {
                surface: { right: "100%", top: "0", },
            },
            right: {
                surface: { left: "100%", top: "0", },
            },
        },
    },

    defaultVariants: { placement: "bottom", },
});

export const hoverCardPreset = definePreset({
    name: "@no-launchpad/hover-card",
    theme: { slotRecipes: { hoverCard: hoverCardRecipe, }, },
});
