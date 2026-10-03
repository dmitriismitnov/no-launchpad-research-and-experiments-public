import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Select visual projection. Slots: root / label / control / trigger / value /
 * placeholder / prefixIcon / chevron / popup / search / searchInput / listbox /
 * group / groupLabel / option / optionLabel / optionCheck / status / hint / error.
 *
 * The trigger is a combobox button; the popup is an inline `role="listbox"`
 * surface (no portal) matching the trigger width and flipping above when space
 * is short. The keyboard-active option is marked with `data-active`; the
 * selected option paints itself and reveals its check through `aria-selected`
 * and `data-selected`, so no runtime recipe variant is required beyond the
 * existing `invalid` / `disabled` pair.
 *
 * Pen references the newer role layer:
 * - surface/raised -> common.50.background (light near-exact; dark one step)
 * - surface/overlay -> common.50.background (white near-exact; dark one step)
 * - surface/hover -> common.100.background (light exact; dark one step)
 * - surface/selected -> brand.50.background (exact)
 * - border/strong -> common.50.border.strong (light exact; dark one step)
 * - border/subtle -> common.200.divider (nearest structural boundary)
 * - text/primary -> common.50.text (exact)
 * - text/tertiary -> common.600.background (exact)
 * - focus/ring -> brand.500.background
 * - action/disabled-bg -> common.100.background
 * - shadow/500 -> semantic.shadow.500
 * - feedback/negative-border -> negative.600.background (light one step)
 */
export const selectRecipe = defineSlotRecipe({
    className: "select",
    slots: [
        "root",
        "label",
        "control",
        "trigger",
        "value",
        "placeholder",
        "prefixIcon",
        "chevron",
        "popup",
        "search",
        "searchInput",
        "listbox",
        "group",
        "groupLabel",
        "option",
        "optionLabel",
        "optionCheck",
        "status",
        "hint",
        "error",
    ],

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
            position: "relative",
            width: "100%",
        },

        trigger: {
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
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            textAlign: "left",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            boxShadow: "0 1px 2px {colors.semantic.shadow.200}",
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
        },

        value: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "semantic.common.50.text",
        },

        placeholder: {
            flex: "1",
            minWidth: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "semantic.common.600.background",
        },

        prefixIcon: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            width: "x8",
            height: "x8",
            color: "semantic.common.600.background",
        },

        chevron: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: "0",
            color: "semantic.common.600.background",
        },

        popup: {
            position: "absolute",
            zIndex: "20",
            top: "calc(100% + {spacing.x2})",
            left: "0",
            width: "100%",
            padding: "x3",
            borderRadius: "md",
            borderWidth: "thin",
            borderStyle: "solid",
            borderColor: "semantic.common.200.divider",
            backgroundColor: "semantic.common.50.background",
            boxShadow: "0 10px 28px {colors.semantic.shadow.500}",
            "&[data-placement='top']": {
                top: "auto",
                bottom: "calc(100% + {spacing.x2})",
            },
        },

        search: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            marginBottom: "x2",
            paddingBlock: "x3",
            paddingInline: "x5",
            borderRadius: "sm",
            backgroundColor: "semantic.common.100.background",
        },

        searchInput: {
            flex: "1",
            minWidth: "0",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.50.text",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            outlineStyle: "none",
            "&::placeholder": {
                color: "semantic.common.500.background",
            },
        },

        listbox: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
        },

        group: {
            display: "flex",
            flexDirection: "column",
            gap: "x1",
        },

        groupLabel: {
            paddingBlock: "x2",
            paddingInline: "x5",
            fontFamily: "body",
            fontSize: "xs",
            fontWeight: "medium",
            lineHeight: "normal",
            letterSpacing: "wide",
            textTransform: "uppercase",
            color: "semantic.common.600.background",
        },

        option: {
            display: "flex",
            alignItems: "center",
            gap: "x4",
            width: "100%",
            paddingBlock: "x4",
            paddingInline: "x5",
            borderRadius: "sm",
            borderWidth: "none",
            borderStyle: "none",
            backgroundColor: "transparent",
            color: "semantic.common.50.text",
            textAlign: "left",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.brand.500.background", },
            _enabled: {
                _hover: { backgroundColor: "semantic.common.100.background", },
            },
            "&[data-active='true']": {
                backgroundColor: "semantic.common.100.background",
            },
            "&[aria-selected='true']": {
                backgroundColor: "semantic.brand.50.background",
                _enabled: {
                    _hover: { backgroundColor: "semantic.brand.50.background", },
                },
            },
        },

        optionLabel: {
            flex: "1",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "regular",
            lineHeight: "normal",
            color: "currentColor",
        },

        optionCheck: {
            flexShrink: "0",
            color: "semantic.brand.700.background",
            opacity: "0",
            "&[data-selected='true']": {
                opacity: "1",
            },
        },

        // The selected announcement is announced, never painted.
        status: {
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
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
                trigger: { borderColor: "semantic.negative.600.background", },
            },
        },

        disabled: {
            true: {
                trigger: {
                    backgroundColor: "semantic.common.100.background",
                    color: "semantic.common.400.background",
                },
                value: { color: "semantic.common.400.background", },
                placeholder: { color: "semantic.common.400.background", },
                prefixIcon: { color: "semantic.common.400.background", },
                chevron: { color: "semantic.common.400.background", },
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

export const selectPreset = definePreset({
    name: "@no-launchpad/select",
    theme: { slotRecipes: { select: selectRecipe, }, },
});
