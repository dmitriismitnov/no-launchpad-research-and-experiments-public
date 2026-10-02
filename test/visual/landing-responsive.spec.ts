import type { Locator, Page, } from "@playwright/test";
import { expect, test, } from "@playwright/test";

type Theme = "light" | "dark";

type Viewport = {
    name: string;
    width: number;
    height: number;
    h1: number;
    valueStripTracks: number;
    workflowTracks: number;
    footerTracks: number;
    copiesBesideVisual: boolean;
    sidebar: boolean;
    themes: Theme[];
    /** Mobile frame `T4klu9` opens with the expanded menu under the header. */
    mobileMenu: boolean;
    /** Desktop frame `DsHK8` keeps the feature section header (`vaCHO`). */
    featuresHeader: boolean;
};

// Pen frames: 10 Landing — desktop (DsHK8) 1440, 11 Landing — tablet (XiPDu)
// 768, 12 Landing — mobile (T4klu9) 390.
const viewports: Viewport[] = [
    {
        name: "desktop",
        width: 1440,
        height: 900,
        h1: 56,
        valueStripTracks: 4,
        workflowTracks: 4,
        footerTracks: 4,
        copiesBesideVisual: true,
        sidebar: true,
        themes: [ "light", "dark", ],
        mobileMenu: false,
        featuresHeader: true,
    },
    {
        name: "tablet",
        width: 768,
        height: 1024,
        h1: 40,
        valueStripTracks: 2,
        workflowTracks: 2,
        footerTracks: 3,
        copiesBesideVisual: false,
        sidebar: true,
        themes: [ "light", "dark", ],
        mobileMenu: false,
        featuresHeader: false,
    },
    {
        name: "mobile",
        width: 390,
        height: 844,
        h1: 32,
        valueStripTracks: 1,
        workflowTracks: 1,
        footerTracks: 1,
        copiesBesideVisual: false,
        sidebar: false,
        themes: [ "light", "dark", ],
        mobileMenu: true,
        featuresHeader: false,
    },
];

// Visible Pen anatomy per frame. The desktop frame keeps the feature section
// header (`vaCHO`); tablet and mobile drop it. The mobile frame inserts the
// expanded menu directly below the header. The product preview stays nested in
// the hero, so it is not part of the top-level anatomy list.
const anatomyFor = (viewport: Viewport): string[] => [
    "landing-header",
    ...( viewport.mobileMenu ? [ "landing-mobile-menu", ] : [] ),
    "landing-hero",
    "landing-value-strip",
    ...( viewport.featuresHeader ? [ "landing-features-header", ] : [] ),
    "landing-feature-tokens",
    "landing-feature-components",
    "landing-feature-states",
    "landing-workflow",
    "landing-theme-preview",
    "landing-cta",
    "landing-footer",
];

const featureIds = [ "landing-feature-tokens", "landing-feature-components", "landing-feature-states", ] as const;

// Pen mobile menu `M2D0g`, top to bottom.
const menuLabels = [ "Overview", "Foundations", "Components", "States", "Pricing", ] as const;

const expandedMenuStatus = "expanded mobile menu";

const countTracks = (locator: Locator): Promise<number> =>
    locator.evaluate((element) =>
        getComputedStyle(element).gridTemplateColumns.split(" ").filter((part) => part !== "").length
    );

const fontSize = (locator: Locator): Promise<number> =>
    locator.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));

const rect = (locator: Locator): Promise<{ x: number; y: number; width: number; height: number; }> =>
    locator.evaluate((element) => {
        const box = element.getBoundingClientRect();

        return { x: box.x, y: box.y, width: box.width, height: box.height, };
    });

const visibleTestIds = (locator: Locator): Promise<string[]> =>
    locator.evaluateAll((nodes) =>
        nodes
            .filter((node) => node.getClientRects().length > 0)
            .map((node) => node.getAttribute("data-testid"))
            .filter((id): id is string => id !== null)
    );

const themedRoot = (page: Page, theme: Theme): Locator => page.locator(`section[data-theme="${theme}"]`);

for ( const viewport of viewports ) {
    for ( const theme of viewport.themes ) {
        test(`landing ${viewport.name} ${theme} matches the Pen frame`, async ({ page, }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height, });
            await page.goto("/");

            const root = themedRoot(page, theme);
            const anatomy = anatomyFor(viewport);
            const anatomySet = new Set(anatomy);

            // Every section from the Pen frame is present and visible.
            for ( const id of anatomy ) {
                await expect(root.getByTestId(id)).toBeVisible();
            }

            // Only the visible Pen anatomy renders, and it keeps the Pen order.
            const renderedOrder = ( await visibleTestIds(root.locator("[data-testid]")) )
                .filter((id) => anatomySet.has(id));
            expect(renderedOrder).toEqual(anatomy);

            // The feature section header is a desktop-only Pen section.
            expect(await root.getByTestId("landing-features-header").isVisible()).toBe(viewport.featuresHeader);

            // The expanded menu is a mobile-only Pen section.
            expect(await root.getByTestId("landing-mobile-menu").isVisible()).toBe(viewport.mobileMenu);

            // The feature sections keep the Pen order at every viewport.
            const featureOrder = ( await visibleTestIds(root.locator("[data-testid]")) )
                .filter((id) => ( featureIds as readonly string[] ).includes(id));
            expect(featureOrder).toEqual([ ...featureIds, ]);

            if ( viewport.mobileMenu ) {
                const menu = root.getByTestId("landing-mobile-menu");

                // Pen order: Overview, Foundations, Components, States, Pricing.
                await expect(menu.getByRole("link")).toHaveText([ ...menuLabels, ]);

                // Pen's primary action spans the full menu column.
                const cta = menu.getByRole("button", { name: "Get the tokens", });
                await expect(cta).toBeVisible();

                const itemBox = await rect(menu.getByRole("link").first());
                const ctaBox = await rect(cta);

                expect(Math.abs(ctaBox.width - itemBox.width)).toBeLessThanOrEqual(1);
                expect(ctaBox.width).toBeGreaterThan(0);

                await expect(menu.getByText(expandedMenuStatus)).toBeVisible();
            }

            // Pen H1: 56 / 40 / 32.
            expect(await fontSize(root.getByTestId("landing-hero").getByRole("heading", { level: 1, }))).toBe(
                viewport.h1,
            );

            // Pen responsive tracks.
            expect(await countTracks(root.getByTestId("landing-value-strip"))).toBe(viewport.valueStripTracks);
            expect(await countTracks(root.getByTestId("landing-workflow-steps"))).toBe(viewport.workflowTracks);
            expect(await countTracks(root.getByTestId("landing-footer-grid"))).toBe(viewport.footerTracks);

            // Features are two-up on desktop and stacked below.
            for ( const id of featureIds ) {
                const feature = root.getByTestId(id);
                const copy = feature.locator('[data-slot="copy"]');
                const visual = feature.locator('[data-slot="visual"]');

                await expect(copy).toBeVisible();
                await expect(visual).toBeVisible();

                const copyBox = await rect(copy);
                const visualBox = await rect(visual);

                if ( viewport.copiesBesideVisual ) {
                    // Side by side on one row.
                    expect(Math.abs(copyBox.y - visualBox.y)).toBeLessThan(80);

                    // Pen alternates the sides: only the components feature puts
                    // the visual first.
                    if ( id === "landing-feature-components" ) {
                        expect(copyBox.x).toBeGreaterThan(visualBox.x);
                    } else {
                        expect(copyBox.x).toBeLessThan(visualBox.x);
                    }
                } else {
                    // Stacked: the visual drops below the copy.
                    expect(visualBox.y).toBeGreaterThan(copyBox.y + 80);
                }
            }

            // The product preview and feature previews keep real geometry.
            const preview = await rect(root.getByTestId("landing-product-preview"));
            expect(preview.width).toBeGreaterThan(0);
            expect(preview.height).toBeGreaterThan(0);

            for ( const id of featureIds ) {
                const visual = await rect(root.getByTestId(id).locator('[data-slot="visual"]'));
                expect(visual.width).toBeGreaterThan(0);
                expect(visual.height).toBeGreaterThan(0);
            }

            // Pen shows the preview sidebar from tablet up.
            const sidebarVisible = await root.getByTestId("landing-product-preview-sidebar").isVisible();
            expect(sidebarVisible).toBe(viewport.sidebar);

            // Header reflows: nav from tablet, the menu trigger below desktop.
            const navVisible = await root.getByTestId("landing-header").getByRole("link", { name: "Product", })
                .isVisible();
            expect(navVisible).toBe(viewport.width >= 768);

            // No horizontal overflow anywhere in the page.
            const overflow = await page.evaluate(() =>
                document.documentElement.scrollWidth - document.documentElement.clientWidth
            );
            expect(overflow).toBeLessThanOrEqual(0);

            // The real WOFF2 faces must be loaded before the screenshot is
            // taken, otherwise a fallback-font frame could be captured.
            await expect.poll(async () =>
                page.evaluate(async () => {
                    await document.fonts.load('500 14px "Inter"');
                    await document.fonts.load('italic 600 14px "Inter"');
                    await document.fonts.ready;

                    return document.fonts.check('500 14px "Inter"')
                        && document.fonts.check('italic 600 14px "Inter"');
                })
            ).toBe(true);

            // One themed-root screenshot per viewport and theme.
            await expect(root).toHaveScreenshot(`landing-${viewport.name}-${theme}.png`, {
                animations: "disabled",
            });
        });
    }
}
