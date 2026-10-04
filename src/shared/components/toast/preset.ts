import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Toast visual projection. Slots: root / icon / content / title / body /
 * action / dismiss.
 *
 * A compact notification surface raised above the page. The `tone` variant only
 * repaints the leading icon; the surface, boundary and copy keep the shared
 * role so a toast stays visually consistent across tones.
 *
 * Pen `F1P1XX` master names the resolved roles:
 * - surface/overlay -> semantic.surface.overlay (white light / neutral.800 dark)
 * - border/subtle -> semantic.border.subtle (neutral.200/800)
 * - text/primary -> semantic.text.primary (title; neutral.900/50)
 * - text/secondary -> semantic.text.secondary (body; neutral.700/300)
 * - text/tertiary -> semantic.text.tertiary (dismiss; neutral.600/400)
 * - text/link -> semantic.text.link (action; green.700/400)
 * The leading icon stays on the tone-tinted matrix alias, which is value-equal
 * to Pen `feedback/positive-fg` / `negative-fg` (regression, not renamed).
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
            backgroundColor: "semantic.surface.overlay",
            borderColor: "semantic.border.subtle",
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
            color: "semantic.text.primary",
        },

        body: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
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
            color: "semantic.text.link",
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
            color: "semantic.text.tertiary",
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
