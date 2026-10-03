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
                    tone: [ "primary", "secondary", "ghost", "destructive", ],
                    size: [ "sm", "md", ],
                    width: [ "hug", "full", ],
                    loading: [ "true", ],
                },
            ],
            buttonIcon: [
                {
                    tone: [ "primary", "secondary", "ghost", "destructive", ],
                    size: [ "sm", "md", ],
                    loading: [ "true", ],
                },
            ],
            // Card variants are selected at runtime by the `variant` prop.
            card: [
                {
                    variant: [ "plain", "compact", ],
                },
            ],
            // The theme control resolves its active glyph at runtime.
            themeSwitchPreview: [
                {
                    theme: [ "light", "dark", ],
                    disabled: [ "true", ],
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
            drawer: [
                {
                    side: [ "left", "right", ],
                },
            ],
            sheet: [
                {
                    side: [ "top", "right", "bottom", "left", ],
                },
            ],
            floatingPanel: [
                {
                    placement: [ "top-left", "top-right", "bottom-left", "bottom-right", ],
                },
            ],
            tour: [
                {
                    placement: [ "top", "right", "bottom", "left", ],
                    current: [ "true", ],
                },
            ],
            // Boolean state and runtime selection are passed as variables.
            toggle: [
                {
                    pressed: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            toggleGroup: [
                {
                    pressed: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            textarea: [
                {
                    invalid: [ "true", ],
                },
            ],
            numberInput: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            checkbox: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            radio: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            switchControl: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            slider: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            field: [
                {
                    disabled: [ "true", ],
                },
            ],
            select: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            multiSelect: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                    selected: [ "true", ],
                },
            ],
            radioGroup: [
                {
                    orientation: [ "vertical", "horizontal", ],
                    disabled: [ "true", ],
                },
            ],
            pinInput: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            dateInput: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            calendar: [
                {
                    surface: [ "overlay", "embedded", ],
                    selected: [ "true", ],
                    today: [ "true", ],
                    inRange: [ "true", ],
                    outsideMonth: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            datePicker: [
                {
                    open: [ "true", ],
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            fileUpload: [
                {
                    dragging: [ "true", ],
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            colorPicker: [
                {
                    open: [ "true", ],
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                    selected: [ "true", ],
                },
            ],
            rating: [
                {
                    filled: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
            editable: [
                {
                    invalid: [ "true", ],
                    disabled: [ "true", ],
                },
            ],
        },
    },
    presets,
});
