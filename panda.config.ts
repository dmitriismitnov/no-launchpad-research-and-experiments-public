import { defineConfig, } from "@pandacss/dev";

import { preflight, presets, } from "./src/shared/styles";

/**
 * Technical PandaCS compilation only.
 * Visual rules, tokens and conditions live in presets under `src/shared/styles`.
 */
export default defineConfig({
    // `preflight` is a build-level option, so it is wired here from `settings`.
    preflight,
    include: [ "./src/**/*.{js,jsx,ts,tsx}", ],
    exclude: [],
    outdir: "src/shared/styled-system",
    jsxFramework: "react",
    importMap: "@shared/styled-system",
    // Public recipe combinations are also passed as runtime variables, which the
    // static extractor cannot resolve. Declare them here so every supported
    // tone/size pair is always emitted.
    staticCss: {
        recipes: {
            button: [
                {
                    tone: [ "primary", "secondary", "ghost", ],
                    size: [ "sm", "md", ],
                },
            ],
            buttonIcon: [
                {
                    tone: [ "primary", "secondary", "ghost", ],
                    size: [ "sm", "md", ],
                },
            ],
            icon: [
                {
                    size: [ "sm", "md", "lg", ],
                },
            ],
            // `menu` is also an HTML element name, so the extractor does not
            // resolve the runtime `menu({ tone, checked, disabled })` call.
            menu: [
                {
                    tone: [ "neutral", "danger", ],
                    checked: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            // Expanded/selected/disabled and current/disabled are passed as
            // runtime variables, which the static extractor cannot resolve.
            treeItem: [
                {
                    expanded: [ "true", ],
                    selected: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            carousel: [
                {
                    current: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            // Placement/size/boolean variants are passed as runtime variables,
            // which the static extractor cannot resolve.
            tooltip: [
                {
                    placement: [ "top", "right", "bottom", "left", ],
                },
            ],
            popover: [
                {
                    placement: [ "top", "right", "bottom", "left", ],
                },
            ],
            hoverCard: [
                {
                    placement: [ "top", "right", "bottom", "left", ],
                },
            ],
            dialog: [
                {
                    size: [ "sm", "md", "lg", ],
                },
            ],
            alertDialog: [
                {
                    destructive: [ "true", ],
                },
            ],
        },
    },
    presets,
});
