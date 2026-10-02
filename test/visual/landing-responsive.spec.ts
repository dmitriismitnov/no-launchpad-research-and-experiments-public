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
    },
];

// Section order from the Pen frames. `header` and `footer` bracket the page;
// the feature sections keep the desktop/tablet/mobile order.
const sectionOrder = [
    "landing-header",
    "landing-hero",
    "landing-product-preview",
    "landing-value-strip",
    "landing-features",
    "landing-feature-tokens",
    "landing-feature-components",
    "landing-feature-states",
    "landing-workflow",
    "landing-theme-preview",
    "landing-cta",
    "landing-footer",
];

const featureIds = [ "landing-feature-tokens", "landing-feature-components", "landing-feature-states", ] as const;

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

const themedRoot = (page: Page, theme: Theme): Locator => page.locator(`section[data-theme="${theme}"]`);

for ( const viewport of viewports ) {
    for ( const theme of viewport.themes ) {
        test(`landing ${viewport.name} ${theme} matches the Pen frame`, async ({ page, }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height, });
            await page.goto("/");

            const root = themedRoot(page, theme);

            // Every section from the Pen frame is present.
            for ( const id of sectionOrder ) {
                await expect(root.getByTestId(id)).toBeVisible();
            }

            // The sections keep the Pen order, including the feature sections.
            const sectionIdSet = new Set(sectionOrder);
            const renderedOrder = ( await root.locator("[data-testid]").evaluateAll((nodes) =>
                nodes.map((node) =>
                    node.getAttribute("data-testid")
                )
            ) ).filter((id) => id !== null && sectionIdSet.has(id));
            expect(renderedOrder).toEqual(sectionOrder);

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
