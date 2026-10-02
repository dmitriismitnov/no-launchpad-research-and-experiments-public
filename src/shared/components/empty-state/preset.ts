import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Empty State visual projection. Slots: root / icon / title / description /
 * action.
 *
 * A centred placeholder surface. The optional action is a consumer slot, so the
 * component stays free of behaviour beyond layout.
 *
 * Pen references the newer role layer (`semantic/surface/raised`,
 * `semantic/border/subtle`, `semantic/text/*`):
 * - surface/raised -> common.50.background (white exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/secondary -> common.700.background (exact)
 * - text/tertiary -> common.600.background (exact)
 * - radius/lg is 16px; the foundation ships only sm/md radii, so `1rem` is the
 *   literal equivalent.
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
            borderColor: "semantic.common.200.divider",
            borderRadius: "1rem",
            backgroundColor: "semantic.common.50.background",
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        title: {
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "tight",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        description: {
            maxWidth: "20rem",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.700.background",
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
