import { defineConfig, } from "@pandacss/dev";
import { buttonRecipe, } from "./src/theme/button.recipe";

export default defineConfig({
    preflight: true,
    include: [ "./src/**/*.{ts,tsx}", ],
    outdir: "styled-system",

    conditions: {
        extend: {
            light: '[data-theme="light"] &',
            dark: '[data-theme="dark"] &',
        },
    },

    theme: {
        tokens: {
            colors: {
                white: { value: "#ffffff", },
                black: { value: "#000000", },
                blue: {
                    300: { value: "#93c5fd", },
                    400: { value: "#60a5fa", },
                    500: { value: "#3b82f6", },
                    600: { value: "#2563eb", },
                    700: { value: "#1d4ed8", },
                },
                gray: {
                    50: { value: "#f9fafb", },
                    100: { value: "#f3f4f6", },
                    200: { value: "#e5e7eb", },
                    300: { value: "#d1d5db", },
                    500: { value: "#6b7280", },
                    700: { value: "#374151", },
                    800: { value: "#1f2937", },
                    900: { value: "#111827", },
                    950: { value: "#030712", },
                },
            },
            spacing: {
                x1: { value: "0.25rem", },
                x2: { value: "0.5rem", },
                x3: { value: "0.75rem", },
                x4: { value: "1rem", },
            },
            sizes: {
                x16: { value: "1rem", },
                x18: { value: "1.125rem", },
                x32: { value: "2rem", },
                x40: { value: "2.5rem", },
            },
            radii: {
                sm: { value: "0.25rem", },
                md: { value: "0.375rem", },
            },
            fontSizes: {
                sm: { value: "0.875rem", },
                md: { value: "1rem", },
            },
            fontWeights: {
                medium: { value: 500, },
            },
            borderWidths: {
                x1: { value: "1px", },
                x2: { value: "2px", },
            },
        },
        slotRecipes: {
            button: buttonRecipe,
        },
    },
});
