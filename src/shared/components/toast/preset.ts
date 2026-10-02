import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Toast visual projection. Slots: root / icon / content / title / body /
 * action / dismiss.
 *
 * A compact notification surface raised above the page. The `tone` variant only
 * repaints the leading icon; the surface, boundary and copy keep the shared
 * role so a toast stays visually consistent across tones.
 *
 * Pen references the newer role layer (`semantic/surface/*`, `semantic/text/*`,
 * `semantic/action/*`). Each alias is resolved to the closest matrix token:
 * - surface/overlay -> common.50.background (white exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/link -> brand.700.background (light exact; dark one step brighter)
 */
export const toastRecipe = defineSlotRecipe({
    className: "toast",
    slots: [ "root", "icon", "content", "title", "body", "action", "dismiss", ],

    base: {
        root: {
            display: "flex",
            alignItems: "flex-start",
            gap: "x6",
            width: "100%",
            maxWidth: "25rem",
            padding: "x6",
            borderWidth: "thin",
            borderStyle: "solid",
            borderRadius: "md",
            backgroundColor: "semantic.common.50.background",
            borderColor: "semantic.common.200.divider",
            boxShadow: "0 8px 24px {colors.semantic.shadow.400}",
        },

        icon: {
            flexShrink: "0",
            marginBlockStart: "x1",
            color: "semantic.positive.700.background",
        },

        content: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
            flex: "1",
            minWidth: "0",
        },

        title: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            lineHeight: "normal",
            color: "semantic.common.50.text",
        },

        body: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
        },

        action: {
            flexShrink: "0",
            alignSelf: "center",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            color: "semantic.brand.700.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        dismiss: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            padding: "x0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "semantic.common.600.background",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },
    },

    variants: {
        tone: {
            neutral: { icon: { color: "semantic.common.50.icon", }, },
            positive: { icon: { color: "semantic.positive.700.background", }, },
            negative: { icon: { color: "semantic.negative.700.background", }, },
            brand: { icon: { color: "semantic.brand.700.background", }, },
        },
    },

    defaultVariants: { tone: "positive", },
});

export const toastPreset = definePreset({
    name: "@no-launchpad/toast",
    theme: { slotRecipes: { toast: toastRecipe, }, },
});
