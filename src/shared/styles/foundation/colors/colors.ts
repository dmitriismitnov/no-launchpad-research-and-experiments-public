/**
 * Color foundation: declares the `theme` system axis through `_light` /
 * `_dark` conditions. Primitive palette, opacity and semantic tokens own the
 * values; this module owns only the axis itself.
 */
export const themeConditions = {
    light: '[data-theme="light"] &',
    dark: '[data-theme="dark"] &',
};
