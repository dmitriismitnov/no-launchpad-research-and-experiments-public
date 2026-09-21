import { expect, test, } from "@playwright/test";

test("landing page renders", async ({ page, }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/No Launchpad/);
    await expect(page).toHaveScreenshot("landing.png", { fullPage: true, });
});
