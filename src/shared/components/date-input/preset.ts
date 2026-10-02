import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Date Input visual projection. Slots: root / label / control / icon / input /
 * hint / error.
 *
 * The typed date field from Pen. It reuses the `Input` field contract — label
 * above, hint or error below, the control owning `aria-invalid` /
 * `aria-describedby` — and adds the calendar affordance: a decorative glyph
 * inside the field, before the value. Typing stays the primary path; the glyph
 * is a visual cue, not a control.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - text/disabled -> common.400.background (exact)
 * - action/disabled-bg -> common.100.background
 * - focus/ring -> brand.500.background
 * - feedback/negative-border -> negative.600.background (light one step)
 *
 * Approximations: Pen's field is 40px (`x20`) tall with 12px (`x6`) inline
 * padding, an 8px (`x4`) gap and a `md` radius; the port keeps all of those.
 * Pen shows the empty value in `text/tertiary` and a filled value in
 * `text/primary`; a single native text input cannot restyle its own value by
 * emptiness, so the value always reads `text/primary` and the placeholder is
 * the muted cue. The date format hint and the mono face are out of scope; the
 * font-pipeline ships only `body`.
 */
export const dateInputRecipe = defineSlotRecipe({
    className: "dateInput",
    slots: [ "root", "label", "control", "icon", "input", "hint", "error", ],

    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "x3",
            width: "100%",
        },

        label: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        control: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
            height: "x20",
            paddingInline: "x6",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.50.border.strong",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            _focusWithin: {
                outlineStyle: "solid",
                outlineWidth: "{borderWidths.thick}",
                outlineOffset: "0",
                outlineColor: "semantic.brand.500.background",
            },
            cursor: { _disabled: "not-allowed", },
        },

        icon: {
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        input: {
            flex: "1",
            minWidth: "0",
            height: "100%",
            padding: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            outline: "none",
            cursor: { _disabled: "not-allowed", },
            "&::placeholder": {
                color: "semantic.common.500.background",
            },
        },

        hint: {
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "semantic.common.600.background",
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
                control: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                control: { backgroundColor: "semantic.common.100.background", },
                input: { color: "semantic.common.400.background", },
                icon: { color: "semantic.common.400.background", },
                label: { color: "semantic.common.400.background", },
                hint: { color: "semantic.common.400.background", },
                error: { color: "semantic.common.400.background", },
            },
        },
    },

    defaultVariants: {
        invalid: false,
        disabled: false,
    },
});

export const dateInputPreset = definePreset({
    name: "@no-launchpad/date-input",
    theme: { slotRecipes: { dateInput: dateInputRecipe, }, },
});
