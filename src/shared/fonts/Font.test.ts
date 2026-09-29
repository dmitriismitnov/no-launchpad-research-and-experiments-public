import { describe, expect, test, } from "bun:test";
import { existsSync, readFileSync, } from "node:fs";

import { FONT_FAMILY, } from "./constants";
import { WEB_FONT_FACES, } from "./manifest.generated";

const fontCss = readFileSync(new URL("./font.css", import.meta.url), "utf8");

describe("web font registration", () => {
    test("registers normal and italic Inter variable faces from generated WOFF2", () => {
        expect(fontCss).toContain('font-family: "Inter"');
        expect(fontCss).toContain('url("./assets/web/inter/inter-normal.woff2") format("woff2")');
        expect(fontCss).toContain('url("./assets/web/inter/inter-italic.woff2") format("woff2")');
        expect(fontCss.match(/font-weight: 100 900/g)).toHaveLength(2);
        expect(fontCss).toContain("font-style: normal");
        expect(fontCss).toContain("font-style: italic");
        expect(fontCss.match(/font-display: swap/g)).toHaveLength(2);
    });

    test("keeps CSS, manifest and generated files in one shared family contract", () => {
        expect(WEB_FONT_FACES.every((face) => face.family === FONT_FAMILY)).toBe(true);
        for ( const face of WEB_FONT_FACES ) {
            expect(existsSync(new URL(`./assets/web/inter/${face.fileName}`, import.meta.url))).toBe(true);
        }
    });
});
