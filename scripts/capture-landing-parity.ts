/**
 * Capture the current code landing in light/dark across desktop/tablet/mobile
 * as visual-parity evidence.
 *
 * Scope contract:
 * - writes only inside `artifacts/landing-parity/code/`;
 * - never touches `test/visual/__snapshots__` or `test/visual/landing-pen-evidence.ts`;
 * - screenshots are evidence for review, not acceptance baselines. Acceptance is
 *   defined by the explicit geometry assertions in `landing-responsive.spec.ts`.
 *
 * Run with the dev server up: `bun run scripts/capture-landing-parity.ts`.
 */

import { mkdir, } from "node:fs/promises";

import { chromium, type Page, } from "playwright";

const BASE_URL = process.env["APP_URL"] ?? "http://127.0.0.1:5173";
const OUTPUT_DIR = "outputs/experiments/pencil-opencode-workflow/artifacts/landing-parity/code";

const viewports = [
    { name: "desktop", width: 1440, height: 900, },
    { name: "tablet", width: 768, height: 1024, },
    { name: "mobile", width: 390, height: 844, },
] as const;

const themes = [ "light", "dark", ] as const;

const waitForFonts = async (page: Page): Promise<void> => {
    await page.evaluate(async () => {
        await document.fonts.load('500 14px "Inter"');
        await document.fonts.load('italic 600 14px "Inter"');
        await document.fonts.ready;
    });
};

await mkdir(OUTPUT_DIR, { recursive: true, });

const browser = await chromium.launch();

try {
    for ( const viewport of viewports ) {
        const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height, }, });

        await page.goto(BASE_URL, { waitUntil: "load", });
        await waitForFonts(page);

        for ( const theme of themes ) {
            const section = page.locator(`section[data-theme="${theme}"]`);

            await section.waitFor({ state: "visible", });
            await section.screenshot({
                path: `${OUTPUT_DIR}/landing-${viewport.name}-${theme}.png`,
                animations: "disabled",
            });
        }

        await page.close();
    }
} finally {
    await browser.close();
}

console.log(`Captured code landing evidence in ${OUTPUT_DIR}`);
