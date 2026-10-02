import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Theme Switch Preview visual projection. Slots: root / panel / caption /
 * surface.
 *
 * Pen's `Theme Switch Preview` master (`q5xZR3`) is a preview block resolved
 * through theme context: `surface/raised` fill, `lg` radius, `border/subtle`
 * stroke and 20px padding. `Foundation — Theme comparison` (`YQ6kU`) renders
 * two instances, one `theme: light` and one `theme: dark`. The recipe therefore
 * projects a two-panel comparison: `root` lays the panels out, `panel` stacks a
 * visible caption over a themed surface, and `surface` paints the Pen block.
 * The theme itself is the `data-theme` attribute set by the component, never a
 * recipe variant or a component-local theme fork.
 */
export const themeSwitchPreviewRecipe = defineSlotRecipe({
    className: "themeSwitchPreview",
    slots: [ "root", "panel", "caption", "surface", ],

    base: {
        root: {
            display: "flex",
            flexWrap: "wrap",
            gap: "x12",
        },

        panel: {
            display: "flex",
            flexDirection: "column",
            flex: "1",
            minWidth: "0",
            gap: "x4",
        },

        caption: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "semibold",
            color: "semantic.text.secondary",
        },

        surface: {
            display: "flex",
            flexDirection: "column",
            flex: "1",
            gap: "x8",
            padding: "x10",
            borderRadius: "lg",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.border.subtle",
            backgroundColor: "semantic.surface.raised",
            color: "semantic.text.primary",
        },
    },
});

export const themeSwitchPreviewPreset = definePreset({
    name: "@no-launchpad/theme-switch-preview",
    theme: { slotRecipes: { themeSwitchPreview: themeSwitchPreviewRecipe, }, },
});
