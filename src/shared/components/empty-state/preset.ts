import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Empty State visual projection. Slots: root / icon / title / description /
 * action.
 *
 * A centred placeholder surface. The optional action is a consumer slot, so the
 * component stays free of behaviour beyond layout.
 *
 * Pen `Kj5Nm` master names the resolved roles:
 * - surface/raised -> semantic.surface.raised (white light / neutral.900 dark)
 * - border/subtle -> semantic.border.subtle (neutral.200/800)
 * - text/primary -> semantic.text.primary (title; neutral.900/50)
 * - text/secondary -> semantic.text.secondary (description; neutral.700/300)
 * - text/tertiary -> semantic.text.tertiary (icon; neutral.600/400)
 * - radius/lg -> semantic radius `lg` (1rem / 16px), value-equal to the prior
 *   literal.
 */
export const emptyStateRecipe = defineSlotRecipe({
    className: "emptyState",
    slots: [ "root", "icon", "title", "description", "action", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "x6",
            width: "100%",
            padding: "x16",
            textAlign: "center",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            borderRadius: "lg",
            backgroundColor: "semantic.surface.raised",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.text.tertiary",
        },

        title: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.text.primary",
        },

        description: {
            maxWidth: "20rem",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.text.secondary",
        },

        action: {
            marginBlockStart: "x2",
        },
    },
});

export const emptyStatePreset = definePreset({
    name: "@no-launchpad/empty-state",
    theme: { slotRecipes: { emptyState: emptyStateRecipe, }, },
});
