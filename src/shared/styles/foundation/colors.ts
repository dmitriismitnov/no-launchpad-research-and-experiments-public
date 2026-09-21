/**
 * Color foundation.
 * Declares the `theme` system axis through `_light` / `_dark` conditions.
 * Color names are system roles, never component parts or CSS properties.
 */
export const themeConditions = {
    light: '[data-theme="light"] &',
    dark: '[data-theme="dark"] &',
};

export const colors = {
    surface: { light: { value: "#FFFFFF", }, dark: { value: "#0D1016", }, },
    surfaceRaised: { light: { value: "#F7F8FA", }, dark: { value: "#151A22", }, },
    ink: { light: { value: "#1A1A1A", }, dark: { value: "#F3F5F8", }, },
    ink2: { light: { value: "#666666", }, dark: { value: "#A8B0BB", }, },
    line: { light: { value: "#1A1A1A", }, dark: { value: "#4A5462", }, },
    lineSoft: { light: { value: "#EDEFF2", }, dark: { value: "#212831", }, },
    accent: { light: { value: "#4A9FD8", }, dark: { value: "#5AB0EA", }, },
    accentDeep: { light: { value: "#1B5FA8", }, dark: { value: "#1E6BB8", }, },
    danger: { light: { value: "#C0392B", }, dark: { value: "#F87171", }, },
};
