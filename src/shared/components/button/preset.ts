import { definePreset, defineSlotRecipe, } from "@pandacss/dev";

/**
 * Button visual projection.
 * Anatomy, public variants and all visual rules live together.
 * Slots: root / prefixIcon / label / suffixIcon.
 *
 * Colours come from the semantic layer, which switches theme inside the token;
 * the recipe never branches on `_light` / `_dark`.
 *
 * The action roles are Pen's: `primary` is the green action fill, `secondary`
 * is a raised surface with a functional boundary, `ghost` is transparent with a
 * hover surface, and `destructive` is the danger-filled irreversible action.
 * Feedback is a colour swap, never an opacity fade or a shadow.
 * The label and both icon slots paint from one foreground per tone.
 */
/**
 * The shared disabled paint. It is skipped while loading: Pen `IcuBw` loading
 * (`chU7Q` / `bv3v1`) keeps the tone fill and only disables interaction, so the
 * loading state must not read as the muted disabled role.
 */
const disabledStateSelector = "&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]):not([data-loading])";

export const buttonRecipe = defineSlotRecipe({
    className: "button",
    slots: [ "root", "prefixIcon", "label", "suffixIcon", "spinner", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            // Pen `Button` (IcuBw): 40px control, 8px gap, 10px radius.
            height: "x20",
            gap: "x4",
            borderRadius: "md",
            paddingBlock: "x5",
            paddingInline: "x8",
            cursor: { base: "pointer", _disabled: "not-allowed", },
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        },

        prefixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        label: {
            whiteSpace: "nowrap",
            fontFamily: "body",
            fontSize: "sm",
            fontWeight: "medium",
            lineHeight: "tight",
            letterSpacing: "normal",
        },

        suffixIcon: {
            flexShrink: "0",
            width: "x8",
            height: "x8",
        },

        // Pen `IcuBw` anatomy (`utSXT`) names a `spinner` part. It is an
        // absolute overlay so the label and icons keep their layout box; only
        // the glyph rotates, and reduced motion stops it.
        spinner: {
            position: "absolute",
            inset: "0",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            "& .icon": {
                animation: "spin 1s linear infinite",
                "@media (prefers-reduced-motion: reduce)": { animation: "none", },
            },
        },
    },

    variants: {
        tone: {
            primary: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "semantic.action.primary.background",
                        _enabled: {
                            _hover: "semantic.action.primary.hover",
                            _active: "semantic.action.primary.active",
                        },
                    },
                    [disabledStateSelector]: {
                        backgroundColor: "semantic.action.disabled.background",
                    },
                },
                spinner: {
                    color: { base: "semantic.action.primary.foreground", },
                },
                label: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.action.primary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },

            secondary: {
                root: {
                    borderWidth: "thin",
                    borderStyle: "solid",
                    borderColor: "semantic.action.secondary.border",
                    backgroundColor: {
                        base: "semantic.action.secondary.background",
                        _enabled: {
                            _hover: "semantic.action.secondary.hover",
                            _active: "semantic.action.secondary.hover",
                        },
                    },
                    [disabledStateSelector]: {
                        backgroundColor: "semantic.action.disabled.background",
                    },
                },
                spinner: {
                    color: { base: "semantic.action.secondary.foreground", },
                },
                label: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.action.secondary.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },

            ghost: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "transparent",
                        _enabled: {
                            _hover: "semantic.action.ghost.hover",
                            _active: "semantic.surface.selected",
                        },
                    },
                    [disabledStateSelector]: {
                        backgroundColor: "semantic.action.disabled.background",
                    },
                },
                spinner: {
                    color: { base: "semantic.text.secondary", },
                },
                label: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.text.secondary",
                        _enabled: {
                            _hover: "semantic.action.ghost.foreground",
                            _active: "semantic.text.secondary",
                        },
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },

            // Pen `IcuBw` destructive (state contract `xw0yy`): red.600 resting
            // and loading, red.700 hover and active, white foreground. Disabled
            // falls back to the shared disabled role. Filled, so no boundary,
            // and feedback is colour-only (no shadow or opacity).
            destructive: {
                root: {
                    borderWidth: "none",
                    borderStyle: "none",
                    backgroundColor: {
                        base: "semantic.action.danger.background",
                        _enabled: {
                            _hover: "semantic.action.danger.hover",
                            _active: "semantic.action.danger.hover",
                        },
                    },
                    [disabledStateSelector]: {
                        backgroundColor: "semantic.action.disabled.background",
                    },
                },
                spinner: {
                    color: { base: "semantic.action.danger.foreground", },
                },
                label: {
                    color: {
                        base: "semantic.action.danger.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                prefixIcon: {
                    color: {
                        base: "semantic.action.danger.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
                suffixIcon: {
                    color: {
                        base: "semantic.action.danger.foreground",
                        _disabled: "semantic.action.disabled.foreground",
                    },
                },
            },
        },

        // Pen documents `md` (40px) and a 32px `sm`; both are supported.
        size: {
            sm: {
                root: { height: "x16", paddingBlock: "x3", paddingInline: "x6", },
            },
            md: {
                root: { paddingInline: "x8", },
            },
        },

        // Pen `IcuBw` public variants (`Z8OMS4`): width `hug · full`. `hug`
        // stays intrinsic; `full` is the `MboG8` / `GW4Jy` fill-container
        // override, so it spans its column instead of stretching in a row.
        width: {
            hug: {
                root: { width: "fit-content", },
            },
            full: {
                root: { width: "100%", },
            },
        },

        // Pen shared rules (`Qur3j`, `sxGsG`): loading disables interaction and
        // swaps in the indicator without changing geometry or the label width.
        loading: {
            true: {
                root: { position: "relative", },
                prefixIcon: { opacity: "0", },
                label: { opacity: "0", },
                suffixIcon: { opacity: "0", },
            },
        },
    },

    defaultVariants: {
        tone: "primary",
        size: "md",
        width: "hug",
        loading: false,
    },
});

export const buttonPreset = definePreset({
    name: "@no-launchpad/button",
    theme: { slotRecipes: { button: buttonRecipe, }, },
});
