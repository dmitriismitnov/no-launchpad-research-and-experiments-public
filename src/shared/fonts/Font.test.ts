import { describe, expect, test, } from "bun:test";
import { existsSync, readFileSync, } from "node:fs";

import { FONT_FAMILY, } from "./constants";
import { WEB_FONT_FACES, } from "./manifest.generated";

const fontCss = readFileSync(new URL("./font.css", import.meta.url), "utf8");

const fontFaceBlocks = fontCss
    .split("@font-face")
    .slice(1)
    .map((block) => block.slice(0, block.indexOf("}")));

describe("web font registration", () => {
    test("registers exactly one block per manifest face, with matching metadata", () => {
        expect(fontFaceBlocks).toHaveLength(WEB_FONT_FACES.length);

        for ( const face of WEB_FONT_FACES ) {
            const block = fontFaceBlocks.find((candidate) => candidate.includes(face.fileName));

            expect(block, `no @font-face block points at ${face.fileName}`).toBeDefined();
            expect(block).toContain(`font-family: "${FONT_FAMILY}"`);
            expect(block).toContain(`font-style: ${face.style}`);
            expect(block).toContain(`font-weight: ${face.weightRange}`);
            expect(block).toContain("font-display: swap");
        }
    });

    test("keeps CSS, manifest and generated files in one shared family contract", () => {
        expect(WEB_FONT_FACES.every((face) => face.family === FONT_FAMILY)).toBe(true);
        for ( const face of WEB_FONT_FACES ) {
            expect(existsSync(new URL(`./assets/web/inter/${face.fileName}`, import.meta.url))).toBe(true);
        }
    });
});
