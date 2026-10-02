import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Checkbox visual projection. Slots: root / label / control / box / mark /
 * text / error.
 *
 * A native `<input type="checkbox">` under a custom 18px box. The box and the
 * glyph style themselves through Panda's `peer` conditions, so they follow the
 * native `:checked` / `:indeterminate` / `:focus-visible` / `:disabled` state
 * without JavaScript. Colors come from the semantic layer; the recipe never
 * branches on `_light` / `_dark`.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/primary-bg -> brand.700.background (light exact; dark one step)
 * - action/primary-fg -> brand.700.text (theme-aware pair)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 *
 * Approximations: Pen's 18px box and 12px glyph are off the `xN` scale and stay
 * literals. Pen's check / dash are icon-font glyphs, so the mark uses the
 * `check` / `minus` icons. `action/primary-fg` is white in both Pen themes; the
 * nearest theme-safe foreground is the foreground of the same brand step.
 */
export const checkboxRecipe = defineSlotRecipe({
    className: "checkbox",
    slots: [ "root", "label", "control", "input", "box", "mark", "text", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
        },

        label: {
            display: "inline-flex",
            alignItems: "center",
            gap: "x4",
            cursor: { base: "pointer", _disabled: "not-allowed", },
        },

        control: {
            position: "relative",
            flexShrink: "0",
            width: "18px",
            height: "18px",
        },

        input: {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            margin: "0",
            opacity: "0",
            cursor: "inherit",
        },

        box: {
            position: "absolute",
            inset: "0",
            display: "block",
            borderRadius: "sm",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            // One combined selector for checked + indeterminate: two `peer`
            // conditions writing the same property are merged by Panda into a
            // rule that also matches the base class, which would paint every box.
            ".peer:is(:checked, :indeterminate) ~ &": {
                backgroundColor: "semantic.brand.700.background",
            },
            _peerFocusVisible: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
        },

        mark: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "x8",
            height: "x8",
            color: "semantic.brand.700.text",
            opacity: "0",
            ".peer:is(:checked, :indeterminate) ~ &": { opacity: "1", },
        },

        text: {
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: "semantic.common.50.text",
        },

        error: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.negative.600.background",
        },
    },

    variants: {
        invalid: {
            true: {
                box: {
                    borderColor: "semantic.negative.600.background",
                },
            },
        },

        disabled: {
            true: {
                box: {
                    backgroundColor: "semantic.common.100.background",
                    cursor: "not-allowed",
                },
                text: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const checkboxPreset = definePreset({
    name: "@no-launchpad/checkbox",
    theme: { slotRecipes: { checkbox: checkboxRecipe, }, },
});
