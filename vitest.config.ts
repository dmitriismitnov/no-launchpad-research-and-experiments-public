import { storybookTest, } from "@storybook/addon-vitest/vitest-plugin";
import { playwright, } from "@vitest/browser-playwright";
import { defineConfig, } from "vitest/config";

const alias = {
    "@app": new URL("./src/app", import.meta.url).pathname,
    "@shared": new URL("./src/shared", import.meta.url).pathname,
};

export default defineConfig({
    resolve: { alias, },
    test: {
        passWithNoTests: true,
        projects: [
            {
                extends: true,
                plugins: [ storybookTest({ configDir: "./.storybook", }), ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        headless: true,
                        instances: [ { browser: "chromium", }, ],
                    },
                },
            },
        ],
    },
});
