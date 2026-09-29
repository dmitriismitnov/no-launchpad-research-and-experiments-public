import { describe, expect, test, } from "bun:test";

import { fontCssPath, fontFaces, } from "./assets";
import { CSS_HEADER, renderFontCss, } from "./css";
import { readAndValidateFace, } from "./font";

const validatedFaces = await Promise.all(fontFaces.map((face) => readAndValidateFace(face)));

describe("renderFontCss", () => {
    test("renders one relative @font-face block per validated face", () => {
        const source = renderFontCss(validatedFaces, fontCssPath);

        expect(source.startsWith(CSS_HEADER)).toBe(true);
        expect(source.match(/@font-face/g)).toHaveLength(validatedFaces.length);
        expect(source).toContain('url("./assets/web/inter/inter-normal.woff2") format("woff2")');
        expect(source).toContain('url("./assets/web/inter/inter-italic.woff2") format("woff2")');
        expect(source).toContain('font-family: "Inter"');
        expect(source).toContain("font-style: normal");
        expect(source).toContain("font-style: italic");
        expect(source.match(/font-display: swap/g)).toHaveLength(validatedFaces.length);
        expect(source).not.toContain(process.cwd());
    });
});
