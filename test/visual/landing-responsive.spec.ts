import type { Locator, } from "@playwright/test";
import { expect, test, } from "@playwright/test";

const countTracks = async (root: Locator, testId: string): Promise<number> =>
    root.getByTestId(testId).evaluate((element) => {
        const value = getComputedStyle(element).gridTemplateColumns;

        return value.split(" ").filter((part) => part !== "").length;
    });

const fontSize = async (locator: Locator): Promise<number> =>
    locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

const viewports = [
    { name: "desktop", width: 1440, height: 900, stats: 3, steps: 4, features: 3, footer: 3, h1: 56, },
    { name: "tablet", width: 768, height: 1024, stats: 2, steps: 2, features: 1, footer: 3, h1: 40, },
    { name: "mobile", width: 390, height: 844, stats: 1, steps: 1, features: 1, footer: 1, h1: 32, },
] as const;

for ( const viewport of viewports ) {
    test(`landing is explicitly composed at ${viewport.name}`, async ({ page, }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height, });
        await page.goto("/");

        // App renders the landing once per theme; assert the light context.
        const root = page.locator('section[data-theme="light"]');

        await expect(root.getByTestId("landing-hero")).toBeVisible();
        await expect(root.getByTestId("landing-features")).toBeVisible();

        await expect(countTracks(root, "landing-stats")).resolves.toBe(viewport.stats);
        await expect(countTracks(root, "landing-steps")).resolves.toBe(viewport.steps);
        await expect(countTracks(root, "landing-features")).resolves.toBe(viewport.features);
        await expect(countTracks(root, "landing-footer-grid")).resolves.toBe(viewport.footer);

        await expect(fontSize(root.getByTestId("landing-hero").getByRole("heading", { level: 1, })))
            .resolves.toBe(viewport.h1);

        // No horizontal overflow at any breakpoint.
        const overflow = await page.evaluate(() =>
            document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow).toBeLessThanOrEqual(0);
    });
}
