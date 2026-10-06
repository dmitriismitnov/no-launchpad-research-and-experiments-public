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
                    // Browser stories that drive real input through the provider's
                    // CDP session (for example the Slider keyboard stepping) pay a
                    // one-off multi-second CDP warm-up that spikes under the
                    // parallel suite; the default browser timeout is too tight for
                    // that environment latency, not for the test's own work.
                    testTimeout: 30_000,
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
