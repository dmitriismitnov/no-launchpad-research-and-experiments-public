import { defineConfig, devices, } from "@playwright/test";

const baseURL = process.env["APP_URL"] ?? "http://127.0.0.1:5173";

export default defineConfig({
    testDir: "./test/visual",
    snapshotDir: "./test/visual/__snapshots__",
    fullyParallel: true,
    forbidOnly: false,
    retries: 0,
    reporter: [ [ "html", { open: "never", }, ], ],
    use: {
        baseURL,
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"], },
        },
    ],
});
