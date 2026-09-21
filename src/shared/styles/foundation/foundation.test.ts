import { describe, expect, test, } from "bun:test";

import { colors, themeConditions, } from "./colors";
import { sizes, spacing, } from "./layout";
import { SCALE_STEP_REM, } from "./layout/scale";

describe("foundation", () => {
    test("spacing scale is regular: xN = N * step", () => {
        for ( const [ key, token, ] of Object.entries(spacing) ) {
            const index = Number(key.slice(1));
            const expected = Number(( index * SCALE_STEP_REM ).toFixed(3));

            expect(token).toEqual({ value: `${expected}rem`, });
        }
    });

    test("spacing and sizes share the same scale", () => {
        expect(Object.keys(spacing)).toEqual(Object.keys(sizes));
    });

    test("colors declares the theme axis", () => {
        expect(Object.keys(themeConditions)).toEqual([ "light", "dark", ]);
        expect(themeConditions.dark).toContain("[data-theme");
    });

    test("color values exist for both theme branches", () => {
        for ( const token of Object.values(colors) ) {
            expect(Object.keys(token)).toEqual([ "light", "dark", ]);
        }
    });
});
