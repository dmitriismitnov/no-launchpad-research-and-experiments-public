import { writeFile, } from "node:fs/promises";
import { chromium, } from "playwright";

const base = "http://127.0.0.1:6006/iframe.html?id=";
const out = new URL("./", import.meta.url);
const dir = out.pathname;

const stories = [
    {
        name: "splitter-surface-tokens-light",
        id: "components-layout-splitter--token-surface-light",
        wait: ".splitter__root",
        selectors: [ ".splitter__root", ".splitter__paneStart", ".splitter__paneEnd", ".splitter__handle", ".splitter__grip", ],
    },
    {
        name: "splitter-surface-tokens-dark",
        id: "components-layout-splitter--token-surface-dark",
        wait: ".splitter__root",
        selectors: [ ".splitter__root", ".splitter__paneStart", ".splitter__paneEnd", ".splitter__handle", ".splitter__grip", ],
    },
    {
        name: "media-placeholder-surface-tokens-light",
        id: "components-data-display-media-placeholder--token-surface-light",
        wait: ".mediaPlaceholder__root",
        selectors: [ ".mediaPlaceholder__root", ".mediaPlaceholder__icon", ".mediaPlaceholder__label", ],
    },
    {
        name: "media-placeholder-surface-tokens-dark",
        id: "components-data-display-media-placeholder--token-surface-dark",
        wait: ".mediaPlaceholder__root",
        selectors: [ ".mediaPlaceholder__root", ".mediaPlaceholder__icon", ".mediaPlaceholder__label", ],
    },
    {
        name: "qr-code-surface-tokens-light",
        id: "components-data-display-qr-code--token-surface-light",
        wait: ".qrCode__root",
        selectors: [ ".qrCode__root", ".qrCode__cellFilled", ],
    },
    {
        name: "qr-code-surface-tokens-dark",
        id: "components-data-display-qr-code--token-surface-dark",
        wait: ".qrCode__root",
        selectors: [ ".qrCode__root", ".qrCode__cellFilled", ],
    },
];

const props = [
    "backgroundColor",
    "borderTopColor",
    "color",
    "borderWidth",
    "borderTopLeftRadius",
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
