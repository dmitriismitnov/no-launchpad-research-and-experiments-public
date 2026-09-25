import { describe, expect, test, } from "bun:test";

import { buildIconFont, type IconGlyph, } from "./font";

const square = (codepoint: number, name = "square"): IconGlyph => ( {
    name,
    codepoint,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0h1v1h-1z" fill="currentColor"/></svg>`,
} );

describe("buildIconFont", () => {
    test("produces a woff2 font", async () => {
        const woff2 = await buildIconFont([ square(0xE001), ]);

        expect(woff2.subarray(0, 4).toString("ascii")).toBe("wOF2");
    });

    test("is deterministic for identical glyphs", async () => {
        const first = await buildIconFont([ square(0xE001), square(0xE002, "circle"), ]);
        const second = await buildIconFont([ square(0xE001), square(0xE002, "circle"), ]);

        expect(first.equals(second)).toBe(true);
    });

    test("changes output when a codepoint changes", async () => {
        const first = await buildIconFont([ square(0xE001), ]);
        const second = await buildIconFont([ square(0xE010), ]);

        expect(first.equals(second)).toBe(false);
    });
});
