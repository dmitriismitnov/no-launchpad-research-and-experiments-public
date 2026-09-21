import { defineSlotRecipe, } from "@pandacss/dev";

export const buttonRecipe = defineSlotRecipe({
    className: "button",
    slots: [ "root", "prefixIcon", "label", "suffixIcon", ],

    base: {
        root: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "x2",
            borderRadius: "md",
            borderWidth: "x1",
            borderStyle: "solid",
            fontWeight: "medium",
            cursor: "pointer",
            outlineWidth: {
                _focusVisible: "x2",
            },
            outlineStyle: {
                _focusVisible: "solid",
            },
            outlineOffset: {
                _focusVisible: "x1",
            },
            outlineColor: {
                _focusVisible: "blue.500",
            },
        },

        prefixIcon: {
            flexShrink: "0",
        },

        label: {
            whiteSpace: "nowrap",
        },

        suffixIcon: {
            flexShrink: "0",
        },
    },

    variants: {
        tone: {
            primary: {
                root: {
                    backgroundColor: {
                        _light: {
                            base: "blue.600",
                            _hover: "blue.700",
                        },
                        _dark: {
                            base: "blue.400",
                            _hover: "blue.300",
                        },
                    },
                    borderColor: {
                        _light: {
                            base: "blue.600",
                            _hover: "blue.700",
                        },
                        _dark: {
                            base: "blue.400",
                            _hover: "blue.300",
                        },
                    },
                    color: {
                        _light: "white",
                        _dark: "gray.950",
                    },
                },
            },

            secondary: {
                root: {
                    backgroundColor: {
                        _light: {
                            base: "gray.100",
                            _hover: "gray.200",
                        },
                        _dark: {
                            base: "gray.800",
                            _hover: "gray.700",
                        },
                    },
                    borderColor: {
                        _light: "gray.300",
                        _dark: "gray.700",
                    },
                    color: {
                        _light: "gray.900",
                        _dark: "gray.50",
                    },
                },
            },
        },

        size: {
            sm: {
                root: {
                    height: "x32",
                    paddingInline: "x3",
                    gap: "x1",
                    fontSize: "sm",
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

            md: {
                root: {
                    height: "x40",
                    paddingInline: "x4",
                    gap: "x2",
                    fontSize: "md",
                },
                prefixIcon: {
                    width: "x18",
                    height: "x18",
                },
                suffixIcon: {
                    width: "x18",
                    height: "x18",
                },
            },
        },
    },

    defaultVariants: {
        tone: "primary",
        size: "md",
    },
});
