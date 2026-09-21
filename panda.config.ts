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
    presets,
});
