import { definePreset, } from "@pandacss/dev";

import { globalCss, } from "./global-css";

export const settingsPreset = definePreset({
    name: "@no-launchpad/settings",
    globalCss,
});
