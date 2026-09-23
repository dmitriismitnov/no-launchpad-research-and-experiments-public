import { defineSemanticTokens, } from "@pandacss/dev";

/**
 * Semantic color layer.
 *
 * Context API: `colors.semantic.<group>.<step>.<projection>`.
 * Every context group carries the full `11 x 4` matrix; the same step is a
 * canonical compatible set, but components may mix steps.
 *
 * Plain literal data: each leaf is a theme pair that references
 * `colors.palette.*`. `shadow` is a specialized technical domain.
 */
export const SEMANTIC_GROUPS = [
    "primary",
    "secondary",
    "tertiary",
    "brand",
    "positive",
    "negative",
] as const;

export const SEMANTIC_PROJECTIONS = [ "background", "text", "icon", "border", ] as const;

export const SEMANTIC_SHADOW_STEPS = [ 100, 200, 300, 400, 500, 600, 700, 800, ] as const;

export const semanticColors = defineSemanticTokens.colors({
    semantic: {
        primary: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.300}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.300}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.900}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.50}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.600}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
        },
        secondary: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.100}", _dark: "{colors.palette.neutral.900}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.300}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.300}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.900}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.50}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.600}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
        },
        tertiary: {
            50: {
                background: {
                    value: { _light: "{colors.palette.neutral.200}", _dark: "{colors.palette.neutral.800}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            100: {
                background: {
                    value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.700}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.300}", }, },
            },
            200: {
                background: {
                    value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.600}", },
                },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.300}", }, },
            },
            300: {
                background: {
                    value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.900}", }, },
            },
            400: {
                background: {
                    value: { _light: "{colors.palette.neutral.600}", _dark: "{colors.palette.neutral.400}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.50}", }, },
            },
            500: {
                background: {
                    value: { _light: "{colors.palette.neutral.700}", _dark: "{colors.palette.neutral.300}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.300}", _dark: "{colors.palette.neutral.600}", }, },
            },
            600: {
                background: {
                    value: { _light: "{colors.palette.neutral.800}", _dark: "{colors.palette.neutral.200}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.400}", _dark: "{colors.palette.neutral.500}", }, },
            },
            700: {
                background: {
                    value: { _light: "{colors.palette.neutral.900}", _dark: "{colors.palette.neutral.100}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.500}", }, },
            },
            800: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            900: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
            950: {
                background: {
                    value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", },
                },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.neutral.500}", _dark: "{colors.palette.neutral.400}", }, },
            },
        },
        brand: {
            50: {
                background: { value: { _light: "{colors.palette.blue.50}", _dark: "{colors.palette.blue.950}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.600}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.blue.100}", _dark: "{colors.palette.blue.900}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.600}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.blue.200}", _dark: "{colors.palette.blue.800}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.500}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.blue.300}", _dark: "{colors.palette.blue.700}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.blue.700}", _dark: "{colors.palette.blue.400}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.blue.400}", _dark: "{colors.palette.blue.600}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.700}", _dark: "{colors.palette.blue.200}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.blue.500}", _dark: "{colors.palette.blue.500}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.800}", _dark: "{colors.palette.blue.800}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.400}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.200}", _dark: "{colors.palette.blue.700}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.blue.700}", _dark: "{colors.palette.blue.300}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.400}", _dark: "{colors.palette.blue.700}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.blue.800}", _dark: "{colors.palette.blue.200}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.500}", _dark: "{colors.palette.blue.600}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.blue.900}", _dark: "{colors.palette.blue.100}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.600}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.blue.950}", _dark: "{colors.palette.blue.50}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.blue.600}", _dark: "{colors.palette.blue.600}", }, },
            },
        },
        positive: {
            50: {
                background: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.950}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.green.100}", _dark: "{colors.palette.green.900}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.500}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.50}", _dark: "{colors.palette.green.50}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.400}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.200}", _dark: "{colors.palette.green.800}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.green.700}", _dark: "{colors.palette.green.300}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.300}", _dark: "{colors.palette.green.700}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.green.800}", _dark: "{colors.palette.green.200}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.400}", _dark: "{colors.palette.green.600}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.green.900}", _dark: "{colors.palette.green.100}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.500}", _dark: "{colors.palette.green.600}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.green.950}", _dark: "{colors.palette.green.50}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.green.600}", _dark: "{colors.palette.green.500}", }, },
            },
        },
        negative: {
            50: {
                background: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.950}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.500}", }, },
            },
            100: {
                background: { value: { _light: "{colors.palette.red.100}", _dark: "{colors.palette.red.900}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.400}", }, },
            },
            200: {
                background: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.800}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.400}", }, },
            },
            300: {
                background: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.700}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.300}", }, },
            },
            400: {
                background: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.600}", }, },
                text: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.950}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.50}", _dark: "{colors.palette.red.300}", }, },
            },
            500: {
                background: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.500}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.50}", }, },
                border: { value: { _light: "{colors.palette.red.200}", _dark: "{colors.palette.red.200}", }, },
            },
            600: {
                background: { value: { _light: "{colors.palette.red.600}", _dark: "{colors.palette.red.400}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.50}", }, },
            },
            700: {
                background: { value: { _light: "{colors.palette.red.700}", _dark: "{colors.palette.red.300}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.red.300}", _dark: "{colors.palette.red.600}", }, },
            },
            800: {
                background: { value: { _light: "{colors.palette.red.800}", _dark: "{colors.palette.red.200}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.500}", }, },
            },
            900: {
                background: { value: { _light: "{colors.palette.red.900}", _dark: "{colors.palette.red.100}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.red.400}", _dark: "{colors.palette.red.500}", }, },
            },
            950: {
                background: { value: { _light: "{colors.palette.red.950}", _dark: "{colors.palette.red.50}", }, },
                text: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                icon: { value: { _light: "{colors.palette.neutral.50}", _dark: "{colors.palette.neutral.950}", }, },
                border: { value: { _light: "{colors.palette.red.500}", _dark: "{colors.palette.red.400}", }, },
            },
        },
        shadow: {
            100: { value: { _light: "#1018280F", _dark: "#00000029", }, },
            200: { value: { _light: "#10182812", _dark: "#0000002E", }, },
            300: { value: { _light: "#10182814", _dark: "#00000033", }, },
            400: { value: { _light: "#1018281A", _dark: "#0000003D", }, },
            500: { value: { _light: "#1018281F", _dark: "#00000047", }, },
            600: { value: { _light: "#10182824", _dark: "#0000004D", }, },
            700: { value: { _light: "#10182826", _dark: "#00000052", }, },
            800: { value: { _light: "#1018282E", _dark: "#0000005C", }, },
        },
    },
});
