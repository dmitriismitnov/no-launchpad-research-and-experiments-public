import { writeFile, } from "node:fs/promises";
import { chromium, } from "playwright";

const base = "http://127.0.0.1:6006/iframe.html?id=";
const out = new URL("./", import.meta.url);
const dir = out.pathname;

const stories = [
    {
        name: "toast-surface-tokens-light",
        id: "components-feedback-status-toast--token-surface-light",
        wait: ".toast__root",
        selectors: [ ".toast__root", ".toast__action", ".toast__title", ".toast__body", ".toast__dismiss", ],
    },
    {
        name: "toast-surface-tokens-dark",
        id: "components-feedback-status-toast--token-surface-dark",
        wait: ".toast__root",
        selectors: [ ".toast__root", ".toast__action", ".toast__title", ".toast__body", ".toast__dismiss", ],
    },
    {
        name: "empty-state-surface-tokens-light",
        id: "components-feedback-status-empty-state--token-surface-light",
        wait: ".emptyState__root",
        selectors: [ ".emptyState__root", ".emptyState__icon", ".emptyState__title", ".emptyState__description", ],
    },
    {
        name: "empty-state-surface-tokens-dark",
        id: "components-feedback-status-empty-state--token-surface-dark",
        wait: ".emptyState__root",
        selectors: [ ".emptyState__root", ".emptyState__icon", ".emptyState__title", ".emptyState__description", ],
    },
    {
        name: "skeleton-surface-tokens-light",
        id: "components-feedback-status-skeleton--token-surface-light",
        wait: ".skeleton",
        selectors: [ ".skeleton", ],
    },
    {
        name: "skeleton-surface-tokens-dark",
        id: "components-feedback-status-skeleton--token-surface-dark",
        wait: ".skeleton",
        selectors: [ ".skeleton", ],
    },
    {
        name: "spinner-color-tokens-light",
        id: "components-feedback-status-spinner--token-color-light",
        wait: ".spinner",
        selectors: [ ".spinner", ],
    },
    {
        name: "spinner-color-tokens-dark",
        id: "components-feedback-status-spinner--token-color-dark",
        wait: ".spinner",
        selectors: [ ".spinner", ],
    },
    {
        name: "progress-surface-tokens-light",
        id: "components-feedback-status-progress--token-surface-light",
        wait: ".progress__track",
        selectors: [ ".progress__track", ".progress__fill", ],
    },
    {
        name: "progress-surface-tokens-dark",
        id: "components-feedback-status-progress--token-surface-dark",
        wait: ".progress__track",
        selectors: [ ".progress__track", ".progress__fill", ],
    },
    {
        name: "progress-ring-surface-tokens-light",
        id: "components-feedback-status-progress-ring--token-surface-light",
        wait: ".progressRing__track",
        selectors: [ ".progressRing__track", ".progressRing__arc", ],
    },
    {
        name: "progress-ring-surface-tokens-dark",
        id: "components-feedback-status-progress-ring--token-surface-dark",
        wait: ".progressRing__track",
        selectors: [ ".progressRing__track", ".progressRing__arc", ],
    },
    {
        name: "alert-role-tokens-light",
        id: "components-feedback-status-alert--token-roles-light",
        wait: ".alert__root",
        selectors: [ ".alert__root", ".alert__icon", ".alert__title", ],
    },
    {
        name: "alert-role-tokens-dark",
        id: "components-feedback-status-alert--token-roles-dark",
        wait: ".alert__root",
        selectors: [ ".alert__root", ".alert__icon", ".alert__title", ],
    },
];

const props = [ "backgroundColor", "borderTopColor", "color", "borderWidth", "borderTopLeftRadius", "stroke", ];

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 2, });
const page = await context.newPage();
const report = [];

for ( const story of stories ) {
    await page.goto(`${base}${story.id}&viewMode=story`, { waitUntil: "load", });
    await page.waitForSelector(story.wait, { timeout: 15000, });
    await page.waitForTimeout(150);

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
