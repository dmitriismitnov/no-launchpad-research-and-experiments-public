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
 * `semantic/brand/*`, `semantic/border/*`, `semantic/shadow/*`):
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - brand/100 background -> brand.100.background (exact)
 * - brand/100 text -> brand.100.text (exact)
 * - shadow/500 -> semantic.shadow.500 (Pen offsets 0 12px 32px)
 *
 * Approximations: Pen fixes the surface at 300px and the avatar at 36px; both
 * are literals because the `xN` scale cannot express them. The mono family is
 * unused here. The optional open delay and collision handling are out of scope.
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
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        surface: {
            position: "absolute",
            zIndex: "20",
            width: "300px",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
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
            color: "semantic.common.50.text",
        },

        role: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
        },

        bio: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
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
