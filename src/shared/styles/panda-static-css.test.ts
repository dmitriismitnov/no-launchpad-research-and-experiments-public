import { afterAll, beforeAll, describe, expect, test, } from "bun:test";
import { mkdtemp, readFile, rm, } from "node:fs/promises";
import { tmpdir, } from "node:os";
import { join, } from "node:path";

import { cssgen, loadConfigAndCreateContext, } from "@pandacss/node";

import config from "../../../panda.config";

/**
 * The public recipe combinations are passed to Panda as runtime variables, so
 * the source extractor cannot see them; they must be declared in `staticCss`.
 *
 * These tests compile the real `panda.config.ts` with an empty `include`,
 * which means no source file is extracted. Whatever appears in the stylesheet
 * is therefore emitted purely from `staticCss`. This is the only way to prove a
 * destructive tone is a declared static combination rather than an accidental
 * by-product of a story that happens to spell `tone="destructive"`.
 */
describe("panda static css", () => {
    let directory: string;
    let css: string;

    beforeAll(async () => {
        directory = await mkdtemp(join(tmpdir(), "no-launchpad-static-css-"));

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

    test("emits every destructive Button selector without source extraction", () => {
        expect(css).toContain(".button__root--tone_destructive");
        expect(css).toContain(".button__label--tone_destructive");
        expect(css).toContain(".button__prefixIcon--tone_destructive");
        expect(css).toContain(".button__suffixIcon--tone_destructive");
        expect(css).toContain(".button__spinner--tone_destructive");
        expect(css).toContain("--colors-semantic-action-danger-background");
    });

    test("emits every destructive ButtonIcon selector without source extraction", () => {
        expect(css).toContain(".buttonIcon__root--tone_destructive");
        expect(css).toContain(".buttonIcon__icon--tone_destructive");
    });

    test("scopes the destructive fill and foreground to a non-loading disabled root", () => {
        const normalized = css.replace(/\s+/g, " ");

        expect(normalized).toContain(
            ".button__root--tone_destructive:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]):not([data-loading])",
        );
        expect(normalized).toContain(
            ".button__root--tone_destructive:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]):not([data-loading]) .button__label",
        );
    });
});
