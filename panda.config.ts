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
                    tone: [ "primary", "secondary", "ghost", "icon", ],
                    size: [ "sm", "md", ],
                },
            ],
            icon: [
                {
                    size: [ "sm", "md", "lg", ],
                },
            ],
        },
    },
    presets,
});
