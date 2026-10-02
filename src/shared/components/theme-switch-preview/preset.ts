import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Theme Switch Preview visual projection. Slots: root / head / title /
 * actions / badges.
 *
 * Pen's `Theme Switch Preview` master (`q5xZR3`) is one fixed 420x383 passive
 * preview block, not a theme controller: vertical, 20px padding, 14px root gap,
 * `surface/raised` fill, `lg` radius and a `border/subtle` stroke. Its Head
 * (moon + "Theme preview" + `theme` badge), Buttons, Input, Badges, Card and
 * Tabs anatomy is owned by the component. The theme is never a recipe variant
 * or a component-local fork: `Foundation — Theme comparison` (`YQ6kU`) renders
 * two instances of the master, one `theme: light` and one `theme: dark`, so the
 * two-theme composition lives in the Storybook `TwoThemes` story.
 */
export const themeSwitchPreviewRecipe = defineSlotRecipe({
    className: "themeSwitchPreview",
    slots: [ "root", "head", "title", "actions", "badges", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x7",
            width: "420px",
            height: "383px",
            padding: "x10",
            borderRadius: "lg",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            backgroundColor: "semantic.surface.raised",
            color: "semantic.text.primary",
        },

        head: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
        },

        title: {
            flex: "1",
            fontFamily: "body",
            fontSize: "md",
            fontWeight: "semibold",
            lineHeight: "tight",
            color: "semantic.text.primary",
        },

        actions: {
            display: "flex",
            alignItems: "center",
            gap: "x5",
        },

        badges: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
        },
    },
});

export const themeSwitchPreviewPreset = definePreset({
    name: "@no-launchpad/theme-switch-preview",
    theme: { slotRecipes: { themeSwitchPreview: themeSwitchPreviewRecipe, }, },
});
