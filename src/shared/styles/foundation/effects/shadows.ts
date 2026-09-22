import { defineTokens, } from "@pandacss/dev";

/**
 * Shadow color foundation.
 * Uses the `theme` axis conditions declared by `foundation/colors`; it does not
 * declare the axis itself. Values are colors, consumed by elevation shadows.
 */
export const shadowColors = defineTokens.colors({
    shadow1: { light: { value: "#1018280F", }, dark: { value: "#00000029", }, },
    shadow2: { light: { value: "#10182812", }, dark: { value: "#0000002E", }, },
    shadow3: { light: { value: "#10182814", }, dark: { value: "#00000033", }, },
    shadow4: { light: { value: "#1018281A", }, dark: { value: "#0000003D", }, },
    shadow5: { light: { value: "#1018281F", }, dark: { value: "#00000047", }, },
    shadow6: { light: { value: "#10182824", }, dark: { value: "#0000004D", }, },
    shadow7: { light: { value: "#10182826", }, dark: { value: "#00000052", }, },
    shadow8: { light: { value: "#1018282E", }, dark: { value: "#0000005C", }, },
});
