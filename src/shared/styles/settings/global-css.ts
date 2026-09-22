/**
 * Global document-level styles.
 * Uses the `theme` axis conditions declared by `foundation/colors`.
 */
export const globalCss = {
    body: {
        margin: "0",
        fontFamily: "body",
        backgroundColor: {
            _light: "surface.raised.light",
            _dark: "surface.raised.dark",
        },
        color: {
            _light: "ink.strong.light",
            _dark: "ink.strong.dark",
        },
    },
};
