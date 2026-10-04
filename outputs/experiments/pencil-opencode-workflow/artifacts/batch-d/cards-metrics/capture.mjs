import { writeFile, } from "node:fs/promises";
import { chromium, } from "playwright";

const base = "http://127.0.0.1:6006/iframe.html?id=";
const out = new URL("./", import.meta.url);
const dir = out.pathname;

const stories = [
    {
        name: "card-surface-tokens-light",
        id: "components-card--light",
        wait: ".card__root",
        selectors: [ ".card__root", ".card__media", ".card__title", ".card__description", ".card__footerSecondary" ],
    },
    {
        name: "card-surface-tokens-dark",
        id: "components-card--dark",
        wait: ".card__root",
        selectors: [ ".card__root", ".card__media", ".card__title", ".card__description", ".card__footerSecondary" ],
    },
    {
        name: "card-focus-ring-light",
        id: "components-card--token-focus-light",
        wait: ".card__root",
        selectors: [ ".card__root" ],
    },
    {
        name: "card-focus-ring-dark",
        id: "components-card--token-focus-dark",
        wait: ".card__root",
        selectors: [ ".card__root" ],
    },
    {
        name: "statistic-delta-tokens-light",
        id: "components-data-display-statistic--token-delta-light",
        wait: ".statistic__root",
        selectors: [ ".statistic__label", ".statistic__value", ".statistic__deltaIcon", ".statistic__deltaText" ],
    },
    {
        name: "statistic-delta-tokens-dark",
        id: "components-data-display-statistic--token-delta-dark",
        wait: ".statistic__root",
        selectors: [ ".statistic__label", ".statistic__value", ".statistic__deltaIcon", ".statistic__deltaText" ],
    },
    {
        name: "statistic-trend-tokens-light",
        id: "components-data-display-statistic--token-trend-light",
        wait: ".statistic__root",
        selectors: [ ".statistic__deltaIcon", ".statistic__deltaText" ],
    },
    {
        name: "statistic-trend-tokens-dark",
        id: "components-data-display-statistic--token-trend-dark",
        wait: ".statistic__root",
        selectors: [ ".statistic__deltaIcon", ".statistic__deltaText" ],
    },
];

const props = [
    "backgroundColor",
    "borderTopColor",
    "color",
    "borderWidth",
    "borderTopLeftRadius",
    "stroke",
    "outlineStyle",
    "outlineWidth",
    "outlineColor",
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
