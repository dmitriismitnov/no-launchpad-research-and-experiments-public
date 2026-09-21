import { defineSlotRecipe, } from "@pandacss/dev";

export const buttonRecipe = defineSlotRecipe({
    className: "button",
    slots: [ "root", "prefixIcon", "label", "suffixIcon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "x50",
            gap: "x10",
            borderRadius: "control",
            fontFamily: "body",
            fontSize: "button",
            fontWeight: "medium",
            cursor: "pointer",
            boxShadow: {
                _light: "0 2px 8px {colors.shadow3.light}",
                _dark: "0 2px 8px {colors.shadow3.dark}",
            },
            outlineWidth: {
                _focusVisible: "2px",
            },
            outlineStyle: {
                _focusVisible: "solid",
            },
            outlineColor: {
                _light: {
                    _focusVisible: "{colors.accent.light}",
                },
                _dark: {
                    _focusVisible: "{colors.accent.dark}",
                },
            },
            outlineOffset: {
                _focusVisible: "{borderWidths.x1}",
            },
        },
        prefixIcon: {
            flexShrink: 0,
            width: "x16",
            height: "x16",
        },
        label: {
            whiteSpace: "nowrap",
        },
        suffixIcon: {
            flexShrink: 0,
            width: "x16",
            height: "x16",
        },
    },

    variants: {
        tone: {
            primary: {
                root: {
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: {
                            base: "{colors.ink.light}",
                            _hover: "{colors.accentDeep.light}",
                        },
                        _dark: {
                            base: "{colors.ink.dark}",
                            _hover: "{colors.accent.dark}",
                        },
                    },
                    borderColor: {
                        _light: {
                            base: "{colors.ink.light}",
                            _hover: "{colors.accentDeep.light}",
                        },
                        _dark: {
                            base: "{colors.ink.dark}",
                            _hover: "{colors.accent.dark}",
                        },
                    },
                    color: "{colors.white}",
                },
            },
            secondary: {
                root: {
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: {
                            base: "transparent",
                            _hover: "{colors.surfaceRaised.light}",
                        },
                        _dark: {
                            base: "transparent",
                            _hover: "{colors.surfaceRaised.dark}",
                        },
                    },
                    borderColor: {
                        _light: "{colors.line.light}",
                        _dark: "{colors.line.dark}",
                    },
                    color: {
                        _light: "{colors.ink.light}",
                        _dark: "{colors.ink.dark}",
                    },
                },
            },
            ghost: {
                root: {
                    borderWidth: "x1",
                    borderStyle: "solid",
                    backgroundColor: {
                        _light: {
                            base: "{colors.surface.light}",
                            _hover: "{colors.surfaceRaised.light}",
                        },
                        _dark: {
                            base: "{colors.surface.dark}",
                            _hover: "{colors.surfaceRaised.dark}",
                        },
                    },
                    borderColor: {
                        _light: "{colors.lineSoft.light}",
                        _dark: "{colors.lineSoft.dark}",
                    },
                    color: {
                        _light: "{colors.ink2.light}",
                        _dark: "{colors.ink2.dark}",
                    },
                },
            },
            icon: {
                root: {
                    width: "x32",
                    height: "x32",
                    borderWidth: 0,
                    borderStyle: "none",
                    backgroundColor: {
                        _light: {
                            base: "transparent",
                            _hover: "{colors.surfaceRaised.light}",
                        },
                        _dark: {
                            base: "transparent",
                            _hover: "{colors.surfaceRaised.dark}",
                        },
                    },
                    color: {
                        _light: "{colors.ink2.light}",
                        _dark: "{colors.ink2.dark}",
                    },
                },
            },
        },
        size: {
            sm: {
                root: {
                    height: "x32",
                },
                prefixIcon: {
                    width: "x16",
                    height: "x16",
                },
                suffixIcon: {
                    width: "x16",
                    height: "x16",
                },
            },
            md: {},
        },
    },

    compoundVariants: [
        {
            tone: "primary",
            size: "sm",
            css: {
                root: {
                    paddingLeft: "x10",
                    paddingRight: "x10",
                },
            },
        },
        {
            tone: "secondary",
            size: "sm",
            css: {
                root: {
                    paddingLeft: "x10",
                    paddingRight: "x10",
                },
            },
        },
        {
            tone: "ghost",
            size: "sm",
            css: {
                root: {
                    paddingLeft: "x10",
                    paddingRight: "x10",
                },
            },
        },
        {
            tone: "primary",
            size: "md",
            css: {
                root: {
                    paddingLeft: "x24",
                    paddingRight: "x24",
                },
            },
        },
        {
            tone: "secondary",
            size: "md",
            css: {
                root: {
                    paddingLeft: "x22",
                    paddingRight: "x22",
                },
            },
        },
        {
            tone: "ghost",
            size: "md",
            css: {
                root: {
                    paddingLeft: "x24",
                    paddingRight: "x24",
                },
            },
        },
    ],

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});
