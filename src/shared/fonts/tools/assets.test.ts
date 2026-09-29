import { describe, expect, test, } from "bun:test";
import { existsSync, readFileSync, } from "node:fs";

import { FONT_FAMILY, } from "../constants";
import { fontFaces, licencePath, rawDir, webDir, } from "./assets";

describe("font asset contract", () => {
    test("defines Inter's two variable faces and no static face", () => {
        expect(FONT_FAMILY).toBe("Inter");
        expect(fontFaces).toEqual([
            expect.objectContaining({ id: "inter-normal", style: "normal", weightRange: "100 900", }),
            expect.objectContaining({ id: "inter-italic", style: "italic", weightRange: "100 900", }),
        ]);
        expect(fontFaces).toHaveLength(2);
    });

    test("keeps both canonical raw inputs and the OFL licence outside public", () => {
        expect(rawDir.includes("/public/")).toBe(false);
        expect(existsSync(licencePath)).toBe(true);
        expect(readFileSync(licencePath, "utf8")).toContain("SIL OPEN FONT LICENSE");
        for ( const face of fontFaces ) {
            expect(existsSync(face.sourcePath)).toBe(true);
        }
        expect(webDir.includes("/public/")).toBe(false);
    });
});
