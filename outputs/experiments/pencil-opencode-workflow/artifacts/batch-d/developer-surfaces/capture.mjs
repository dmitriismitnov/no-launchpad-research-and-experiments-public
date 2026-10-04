import { writeFile, } from "node:fs/promises";
import { chromium, } from "playwright";

const base = "http://127.0.0.1:6006/iframe.html?id=";
const out = new URL("./", import.meta.url);
const dir = out.pathname;

const stories = [
    {
        name: "clipboard-surface-tokens-light",
        id: "components-data-display-clipboard--token-surface-light",
        wait: ".clipboard__root",
        selectors: [ ".clipboard__root", ".clipboard__value", ".clipboard__copy", ],
    },
    {
        name: "clipboard-surface-tokens-dark",
        id: "components-data-display-clipboard--token-surface-dark",
        wait: ".clipboard__root",
        selectors: [ ".clipboard__root", ".clipboard__value", ".clipboard__copy", ],
    },
    {
        name: "clipboard-focus-light",
        id: "components-data-display-clipboard--token-focus-light",
        wait: ".clipboard__copy",
        focus: true,
        selectors: [ ".clipboard__copy", ],
    },
    {
        name: "clipboard-focus-dark",
        id: "components-data-display-clipboard--token-focus-dark",
        wait: ".clipboard__copy",
        focus: true,
        selectors: [ ".clipboard__copy", ],
    },
    {
        name: "code-block-focus-light",
        id: "components-data-display-code-block--token-focus-light",
        wait: ".codeBlock__copy",
        focus: true,
        selectors: [ ".codeBlock__copy" ],
    },
    {
        name: "code-block-focus-dark",
        id: "components-data-display-code-block--token-focus-dark",
        wait: ".codeBlock__copy",
        focus: true,
        selectors: [ ".codeBlock__copy" ],
    },
    {
        name: "scroll-area-surface-tokens-light",
        id: "components-layout-scroll-area--token-surface-light",
        wait: ".scrollArea__root",
        selectors: [ ".scrollArea__root", ".scrollArea__viewport", ],
    },
    {
        name: "scroll-area-surface-tokens-dark",
        id: "components-layout-scroll-area--token-surface-dark",
        wait: ".scrollArea__root",
        selectors: [ ".scrollArea__root", ".scrollArea__viewport", ],
    },
    {
        name: "scroll-area-focus-light",
        id: "components-layout-scroll-area--token-focus-light",
        wait: ".scrollArea__viewport",
        focus: true,
        selectors: [ ".scrollArea__viewport", ],
    },
    {
        name: "scroll-area-focus-dark",
        id: "components-layout-scroll-area--token-focus-dark",
        wait: ".scrollArea__viewport",
        focus: true,
        selectors: [ ".scrollArea__viewport", ],
    },
];

const props = [
    "backgroundColor",
    "borderTopColor",
    "color",
    "outlineStyle",
    "outlineWidth",
    "outlineColor",
    "outlineOffset",
    "scrollbarColor",
];

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2, });
const page = await context.newPage();
const report = [];

for ( const story of stories ) {
    await page.goto(`${base}${story.id}&viewMode=story`, { waitUntil: "load", });
    await page.waitForSelector(story.wait, { timeout: 15000, });
    await page.waitForTimeout(400,);

    if ( story.focus === true ) {
        // The story's first control is auto-focused on load, so one Tab wraps to
        // the body; a second Tab returns to the control with `:focus-visible`.
        await page.keyboard.press("Tab",);
        await page.keyboard.press("Tab",);
        await page.waitForTimeout(200,);
    }

    const styles = await page.evaluate(({ selectors, props, }) => {
        const result = {};
        for ( const selector of selectors ) {
            const nodes = Array.from(document.querySelectorAll(selector),);
            result[selector] = nodes.map((node) => {
                const computed = getComputedStyle(node,);
                const row = Object.fromEntries(props.map((prop) => [ prop, computed[prop], ]),);
                if ( selector.endsWith("viewport") ) {
                    row["thumbBackgroundColor"] = getComputedStyle(node, "::-webkit-scrollbar-thumb",).backgroundColor;
                }
                return row;
            });
        }
        return result;
    }, { selectors: story.selectors, props, });

    const root = page.locator("#storybook-root",);
    await root.screenshot({ path: `${dir}${story.name}.png`, });

    report.push({ name: story.name, story: story.id, styles, });
    console.log("captured", story.name,);
}

await writeFile(`${dir}computed-styles.json`, JSON.stringify(report, null, 4),);
await browser.close();
console.log("done",);
