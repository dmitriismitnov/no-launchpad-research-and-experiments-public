import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Theme Switch Preview visual projection. Slots: root / sun / moon.
 *
 * Pen's `Theme Switch Preview` master (`q5xZR3`) is a theme-comparison preview
 * whose head pairs a moon glyph with a `theme` badge. The port keeps the
 * control itself small: a raised pill with a sun glyph, the shared `Switch`,
 * and a moon glyph. The active glyph paints from the brand role and the
 * inactive one from `text/tertiary`; the `Switch` still owns the checked state.
 *
 * Approximations: Pen's preview block is a full showcase surface (buttons,
 * input, badges, card, tabs) documented as "one reusable preview block resolved
 * through theme context". That composition belongs to the landing, not to the
 * control, so the port exposes the reusable control and lets the consumer own
 * the previewed surface. Pen encodes no light/dark glyph colours, so active /
 * inactive use the shared brand and tertiary roles.
 */
export const themeSwitchPreviewRecipe = defineSlotRecipe({
    className: "themeSwitchPreview",
    slots: [ "root", "sun", "moon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            paddingBlock: "x2",
            paddingInline: "x4",
            borderRadius: "full",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
        },

        sun: { flexShrink: "0", },
        moon: { flexShrink: "0", },
    },

    variants: {
        theme: {
            light: {
                sun: { color: "semantic.brand.700.background", },
                moon: { color: "semantic.common.500.background", },
            },
            dark: {
                sun: { color: "semantic.common.500.background", },
                moon: { color: "semantic.brand.700.background", },
            },
        },

        disabled: {
            true: { root: { opacity: 0.45, }, },
        },
    },

    defaultVariants: { theme: "light", disabled: false, },
});

export const themeSwitchPreviewPreset = definePreset({
    name: "@no-launchpad/theme-switch-preview",
    theme: { slotRecipes: { themeSwitchPreview: themeSwitchPreviewRecipe, }, },
});
