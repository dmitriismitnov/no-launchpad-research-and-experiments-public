import { defineConfig, } from "@pandacss/dev";
import { buttonRecipe, } from "./src/theme/button.recipe";

export default defineConfig({
    conditions: {
        extend: {
            light: '[data-theme="light"] &',
            dark: '[data-theme="dark"] &',
        },
    },
    theme: {
        tokens: {
            colors: {
                surface: { light: { value: "#FFFFFF", }, dark: { value: "#0D1016", }, },
                surfaceRaised: { light: { value: "#F7F8FA", }, dark: { value: "#151A22", }, },
                ink: { light: { value: "#1A1A1A", }, dark: { value: "#F3F5F8", }, },
                ink2: { light: { value: "#666666", }, dark: { value: "#A8B0BB", }, },
                line: { light: { value: "#1A1A1A", }, dark: { value: "#4A5462", }, },
                lineSoft: { light: { value: "#EDEFF2", }, dark: { value: "#212831", }, },
                accent: { light: { value: "#4A9FD8", }, dark: { value: "#5AB0EA", }, },
                accentDeep: { light: { value: "#1B5FA8", }, dark: { value: "#1E6BB8", }, },
                danger: { light: { value: "#C0392B", }, dark: { value: "#F87171", }, },
                white: { value: "#FFFFFF", },
                shadow1: { light: { value: "#1018280F", }, dark: { value: "#00000029", }, },
                shadow2: { light: { value: "#10182812", }, dark: { value: "#0000002E", }, },
                shadow3: { light: { value: "#10182814", }, dark: { value: "#00000033", }, },
                shadow4: { light: { value: "#1018281A", }, dark: { value: "#0000003D", }, },
                shadow5: { light: { value: "#1018281F", }, dark: { value: "#00000047", }, },
                shadow6: { light: { value: "#10182824", }, dark: { value: "#0000004D", }, },
                shadow7: { light: { value: "#10182826", }, dark: { value: "#00000052", }, },
                shadow8: { light: { value: "#1018282E", }, dark: { value: "#0000005C", }, },
            },
            spacing: {
                x10: { value: "10px", },
                x22: { value: "22px", },
                x24: { value: "24px", },
            },
            sizes: {
                x16: { value: "16px", },
                x32: { value: "32px", },
                x50: { value: "50px", },
            },
            radii: {
                control: { value: "6px", },
                surface: { value: "10px", },
            },
            fontSizes: {
                button: { value: "15px", },
            },
            fontWeights: {
                medium: { value: 500, },
            },
            fonts: {
                body: { value: "Geist", },
            },
            borderWidths: {
                x1: { value: "1px", },
            },
        },
        slotRecipes: {
            button: buttonRecipe,
        },
    },
});
