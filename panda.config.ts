import { defineConfig, } from "@pandacss/dev";

import { theme, } from "./src/shared/styles/panda";

export default defineConfig({
    preflight: true,
    include: [ "./src/**/*.{js,jsx,ts,tsx}", ],
    exclude: [],
    outdir: "src/shared/styled-system",
    jsxFramework: "react",
    importMap: "@shared/styled-system",
    theme: {
        extend: theme,
    },
});
