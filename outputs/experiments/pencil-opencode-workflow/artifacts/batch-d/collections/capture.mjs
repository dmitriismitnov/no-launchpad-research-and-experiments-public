import { writeFile, } from "node:fs/promises";
import { chromium, } from "playwright";

const base = "http://127.0.0.1:6006/iframe.html?id=";
const out = new URL("./", import.meta.url);
const dir = out.pathname;

const stories = [
    {
        name: "list-surface-tokens-light",
        id: "components-data-display-list--token-surface-light",
        wait: ".list__root",
        selectors: [ ".list__root", ".list__itemIcon", ".list__itemTitle", ".list__itemMeta", ".list__itemTrailing", ],
    },
    {
        name: "list-surface-tokens-dark",
        id: "components-data-display-list--token-surface-dark",
        wait: ".list__root",
        selectors: [ ".list__root", ".list__itemIcon", ".list__itemTitle", ".list__itemMeta", ".list__itemTrailing", ],
    },
    {
        name: "timeline-rail-tokens-light",
        id: "components-data-display-timeline--token-rail-light",
        wait: ".timeline__root",
        selectors: [ ".timeline__marker", ".timeline__line", ".timeline__title", ".timeline__meta", ],
    },
    {
        name: "timeline-rail-tokens-dark",
        id: "components-data-display-timeline--token-rail-dark",
        wait: ".timeline__root",
        selectors: [ ".timeline__marker", ".timeline__line", ".timeline__title", ".timeline__meta", ],
    },
    {
        name: "data-table-surface-tokens-light",
        id: "components-data-display-data-table--token-surface-light",
        wait: ".dataTable__root",
        selectors: [
            ".dataTable__root",
            ".dataTable__head",
            ".dataTable__headCell",
            ".dataTable__cell:not(.dataTable__cellLead)",
            ".dataTable__cellLead",
        ],
    },
    {
        name: "data-table-surface-tokens-dark",
        id: "components-data-display-data-table--token-surface-dark",
        wait: ".dataTable__root",
        selectors: [
            ".dataTable__root",
            ".dataTable__head",
            ".dataTable__headCell",
            ".dataTable__cell:not(.dataTable__cellLead)",
            ".dataTable__cellLead",
        ],
    },
];

const props = [
    "backgroundColor",
    "borderTopColor",
    "color",
    "borderWidth",
    "borderTopLeftRadius",
    "stroke",
];

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2, });
const page = await context.newPage();
const report = [];

for ( const story of stories ) {
    await page.goto(`${base}${story.id}&viewMode=story`, { waitUntil: "load", });
    await page.waitForSelector(story.wait, { timeout: 15000, });
    await page.waitForTimeout(400,);

    const styles = await page.evaluate(({ selectors, props, }) => {
        const result = {};
        for ( const selector of selectors ) {
            const nodes = Array.from(document.querySelectorAll(selector));
            result[selector] = nodes.map((node) => {
                const computed = getComputedStyle(node);
                return Object.fromEntries(props.map((prop) => [ prop, computed[prop], ]));
            });
        }
        return result;
    }, { selectors: story.selectors, props, });

    const root = page.locator("#storybook-root");
    await root.screenshot({ path: `${dir}${story.name}.png`, });

    report.push({ name: story.name, story: story.id, styles, });
    console.log("captured", story.name);
}

await writeFile(`${dir}computed-styles.json`, JSON.stringify(report, null, 4));
await browser.close();
console.log("done");
