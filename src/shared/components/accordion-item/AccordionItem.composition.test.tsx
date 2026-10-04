import { afterAll, beforeAll, describe, expect, test, } from "bun:test";
import { mkdtemp, readFile, rm, } from "node:fs/promises";
import { tmpdir, } from "node:os";
import { join, } from "node:path";

import { cssgen, loadConfigAndCreateContext, } from "@pandacss/node";
import { renderToStaticMarkup, } from "react-dom/server";

import config from "../../../../panda.config";
import { AccordionItem, } from "./accordion-item";
import { accordionItemRecipe, } from "./preset";

describe("accordion item composition", () => {
    test("renders a trigger and a labelled panel when open by default", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="What are primitive tokens?" defaultOpen>
                Immutable raw values owned by the foundation layer.
            </AccordionItem>,
        );

        expect(markup).toContain("accordionItem__root");
        expect(markup).toContain("accordionItem__trigger");
        expect(markup).toContain("accordionItem__title");
        expect(markup).toContain("accordionItem__chevron");
        expect(markup).toContain("accordionItem__panel");
        expect(markup).toContain(`aria-expanded="true"`);
        expect(markup).toContain(`role="region"`);
        expect(markup).toContain("Immutable raw values");
    });

    test("omits the panel while closed", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="How do themes work?">Detail content.</AccordionItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("accordionItem__panel");
        expect(markup).not.toContain("Detail content.");
    });

    test("honours a controlled open state", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Controlled" open={false}>
                Hidden
            </AccordionItem>,
        );

        expect(markup).toContain(`aria-expanded="false"`);
        expect(markup).not.toContain("accordionItem__panel");
    });

    test("mutes and disables the trigger", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Deprecated" disabled>
                Hidden
            </AccordionItem>,
        );

        expect(markup).toContain("accordionItem__root--disabled_true");
        expect(markup).toContain("disabled");
    });

    test("forwards native attributes", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="Settings" data-testid="a" />,
        );

        expect(markup).toContain(`data-testid="a"`);
    });

    // Regression: the trigger already carries the open modifier at runtime; the
    // rotation itself lives in the generated stylesheet (guarded below).
    test("marks the chevron with the open modifier while open", () => {
        const markup = renderToStaticMarkup(
            <AccordionItem title="What are primitive tokens?" defaultOpen>
                Body.
            </AccordionItem>,
        );

        expect(markup).toContain("accordionItem__chevron--open_true");
    });

    // Pen `YGgyy` token contract `vswcF`: the focus-indicator uses `focus/ring`,
    // not the brand fill. Geometry stays the shared 2px ring with offset 0.
    test("paints the shared focus ring role", () => {
        expect(accordionItemRecipe.base?.["trigger"]).toMatchObject({
            outlineStyle: { _focusVisible: "solid", },
            outlineWidth: { _focusVisible: "{borderWidths.thick}", },
            outlineOffset: { _focusVisible: "0", },
            outlineColor: { _focusVisible: "semantic.focus.ring", },
        });
    });
});

/**
 * Mirrors `src/shared/styles/panda-static-css.test.ts`: compiling the real
 * config with an empty `include` proves the open-chevron rotation is emitted
 * purely from `staticCss` rather than a source file that spells the variant.
 */
describe("accordion item static css", () => {
    let directory: string;
    let css: string;

    beforeAll(async () => {
        directory = await mkdtemp(join(tmpdir(), "no-launchpad-accordion-static-css-"));

        const outfile = join(directory, "styles.css");
        const isolated = {
            ...config,
            include: [],
            outdir: directory,
        } as typeof config;
        const context = await loadConfigAndCreateContext({ config: isolated, });

        await cssgen(context, { cwd: process.cwd(), outfile, });
        css = await readFile(outfile, "utf8");
    });

    afterAll(async () => {
        await rm(directory, { recursive: true, force: true, });
    });

    test("emits the open chevron rotation without source extraction", () => {
        expect(css).toContain(".accordionItem__chevron--open_true");
    });
});
