import { expect, test, } from "@playwright/test";

test("landing page renders", async ({ page, }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/No Launchpad/);

    // The Inter specimen must be present, and the real WOFF2 faces must be
    // loaded, before the screenshot is taken. Otherwise a fallback-font frame
    // could be captured as the baseline.
    await expect(page.getByTestId("inter-specimen")).toBeVisible();
    await expect.poll(async () =>
        page.evaluate(async () => {
            await document.fonts.ready;

            return document.fonts.check('500 14px "Inter"') && document.fonts.check('italic 600 14px "Inter"');
        })
    ).toBe(true);

    await expect(page).toHaveScreenshot("landing.png", { fullPage: true, });
});
