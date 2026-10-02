import { defineSemanticTokens, } from "@pandacss/dev";

/**
 * Semantic color layer.
 *
 * Context API: `colors.semantic.<group>.<step>.<projection>`.
 * Every context group carries the full `11 x 5` matrix.
 *
 * Boundaries are split: `border.subtle` is a structural boundary and
 * `border.strong` is a functional boundary (>= 3:1). `divider` is always
 * quieter than `border.subtle`.
 *
 * Values are ported from the Pen design system (Pen is the source of truth;
 * see outputs/experiments/design-system-to-code/tools/port-foundation.ts).
 */
export const SEMANTIC_GROUPS = [
    "common",
    "occasional",
    "rare",
    "brand",
    "positive",
    "negative",
] as const;

export const SEMANTIC_PROJECTIONS = [ "background", "text", "icon", "border", "divider", ] as const;

export const SEMANTIC_SHADOW_STEPS = [ 100, 200, 300, 400, 500, 600, 700, 800, ] as const;

export const semanticColors = defineSemanticTokens.colors({
    semantic: {
        common: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.300}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.700}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.800}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
        },
        occasional: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.300}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.700}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.800}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
        },
        rare: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.300}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.700}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.800}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.900}", }, },
                icon: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.700}", }, },
                border: {
                    subtle: {
                        value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                    },
                    strong: {
                        value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                    },
                },
                divider: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
            },
        },
        brand: {
            50: {
                background: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.950}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.900}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.900}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.950}", }, },
                    strong: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.950}", }, },
                icon: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.950}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.900}", }, },
                    strong: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.100}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.500}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.500}", }, },
                text: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.950}", }, },
                icon: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.800}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.800}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
                text: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.800}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.800}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.700}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.100}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.100}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
                    strong: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.500}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
            },
        },
        positive: {
            50: {
                background: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.950}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.900}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.900}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.50}", }, },
                icon: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.950}", }, },
                    strong: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
                text: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.950}", }, },
                icon: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.950}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.900}", }, },
                    strong: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.100}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.500}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.500}", }, },
                text: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.950}", }, },
                icon: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.800}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.800}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
                text: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.800}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.700}", }, },
                    strong: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.800}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                    strong: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.700}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.100}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.100}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
                    strong: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
                text: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.900}", }, },
                icon: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.500}", }, },
                    strong: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
            },
        },
        negative: {
            50: {
                background: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.950}", }, },
                text: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.50}", }, },
                icon: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.700}", }, },
                    strong: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.100}", _dark: "{colors.palette.red.900}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.red.100}", _dark: "{colors.palette.red.900}", }, },
                text: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.50}", }, },
                icon: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.500}", }, },
                    strong: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.400}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.800}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.800}", }, },
                text: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.50}", }, },
                icon: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.500}", }, },
                    strong: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.400}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.700}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.700}", }, },
                text: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.50}", }, },
                icon: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.950}", }, },
                    strong: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.300}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.600}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.600}", }, },
                text: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.red.800}", _dark: "{colors.palette.red.200}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.300}", }, },
                    strong: { value: { _light: "{colors.palette.red.800}", _dark: "{colors.palette.red.200}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.500}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.500}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.950}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.900}", }, },
                    strong: { value: { _light: "{colors.palette.red.100}", _dark: "{colors.palette.red.100}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.400}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.400}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.red.950}", }, },
                icon: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.800}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.50}", }, },
                    strong: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.800}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.300}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.300}", }, },
                text: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.900}", }, },
                icon: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.600}", }, },
                    strong: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.700}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.800}", _dark: "{colors.palette.red.200}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.red.800}", _dark: "{colors.palette.red.200}", }, },
                text: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.900}", }, },
                icon: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.500}", }, },
                    strong: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.600}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.100}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.100}", }, },
                text: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.900}", }, },
                icon: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.400}", }, },
                    strong: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.50}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.50}", }, },
                text: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.900}", }, },
                icon: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.700}", }, },
                border: {
                    subtle: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.400}", }, },
                    strong: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.500}", }, },
                },
                divider: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.50}", }, },
            },
        },
        // Named role tokens from the Pen foundation. They sit beside the numeric
        // context matrix: the matrix answers "what is step N on this context",
        // these answer "what surface/action/text/border role is this". Pen is
        // the source of truth; see `outputs/experiments/pencil-opencode-workflow`.
        surface: {
            base: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
            raised: { value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.neutral.900}", }, },
            sunken: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.950}", }, },
            overlay: { value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.neutral.800}", }, },
            hover: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.800}", }, },
            selected: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.950}", }, },
        },
        text: {
            primary: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.50}", }, },
            secondary: { value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", }, },
            tertiary: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", }, },
            disabled: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", }, },
            inverse: { value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.neutral.950}", }, },
            link: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.400}", }, },
        },
        border: {
            default: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", }, },
            subtle: { value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", }, },
            strong: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
        },
        focus: {
            ring: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
        },
        action: {
            primary: {
                background: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.700}", }, },
                hover: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.800}", }, },
                active: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.900}", }, },
                foreground: {
                    value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.base.white}", },
                },
            },
            secondary: {
                background: {
                    value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.neutral.800}", },
                },
                hover: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.700}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
                foreground: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.100}", },
                },
            },
            ghost: {
                hover: { value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.800}", }, },
                foreground: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.200}", },
                },
            },
            danger: {
                background: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.600}", }, },
                hover: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.700}", }, },
                foreground: {
                    value: { _light: "{colors.palette.base.white}", _dark: "{colors.palette.base.white}", },
                },
                border: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.500}", }, },
            },
            disabled: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.800}", },
                },
                foreground: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", },
                },
            },
        },
        shadow: {
            100: { value: { _light: "#0F172A0D", _dark: "#00000040", }, },
            200: { value: { _light: "#0F172A14", _dark: "#00000052", }, },
            300: { value: { _light: "#0F172A1C", _dark: "#00000066", }, },
            400: { value: { _light: "#0F172A26", _dark: "#0000007A", }, },
            500: { value: { _light: "#0F172A30", _dark: "#0000008F", }, },
            600: { value: { _light: "#0F172A3D", _dark: "#000000A3", }, },
            700: { value: { _light: "#0F172A4A", _dark: "#000000B8", }, },
            800: { value: { _light: "#0F172A59", _dark: "#000000CC", }, },
        },
    },
});
