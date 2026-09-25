import { describe, expect, test, } from "bun:test";

import { assignCodepoints, FIRST_CODEPOINT, MANIFEST_HEADER, parseManifest, renderManifest, } from "./manifest";

describe("assignCodepoints", () => {
    test("assigns the first codepoint to a single new icon", () => {
        const { codepoints, added, } = assignCodepoints({}, [ "arrow-right", ]);

        expect(codepoints).toEqual({ "arrow-right": FIRST_CODEPOINT, });
        expect(added).toEqual([ "arrow-right", ]);
    });

    test("keeps existing codepoints regardless of name order", () => {
        const current = { "arrow-right": 0xE005, "plus": 0xE002, };
        const { codepoints, added, } = assignCodepoints(current, [ "plus", "arrow-right", ]);

        expect(codepoints).toEqual(current);
        expect(added).toEqual([]);
    });

    test("continues after the highest used codepoint for new names", () => {
        const current = { "arrow-right": 0xE005, };
        const { codepoints, added, } = assignCodepoints(current, [ "chevron-up", "arrow-right", "plus", ]);

        expect(codepoints).toEqual({ "arrow-right": 0xE005, "chevron-up": 0xE006, "plus": 0xE007, });
        expect(added).toEqual([ "chevron-up", "plus", ]);
    });

    test("reuses a removed codepoint for a new key", () => {
        // Documented trade-off: a removed key leaves the manifest, so its
        // codepoint is free again. Font and manifest are always rebuilt
        // together, so this cannot pair a glyph with a stale mapping.
        const current = { "old-icon": 0xE009, };
        const { codepoints, } = assignCodepoints(current, [ "new-icon", ]);

        expect(codepoints).toEqual({ "new-icon": FIRST_CODEPOINT, });
    });

    test("continues after the highest assigned codepoint", () => {
        const current = { "a": 0xE001, "b": 0xE005, };
        const { codepoints, } = assignCodepoints(current, [ "a", "b", "c", ]);

        expect(codepoints).toEqual({ "a": 0xE001, "b": 0xE005, "c": 0xE006, });
    });

    test("rejects duplicate names", () => {
        expect(() => assignCodepoints({}, [ "plus", "plus", ])).toThrow("icon names must be unique");
    });

    test("throws when the range is exhausted", () => {
        const current = { "a": 0xE001, };
        expect(() => assignCodepoints(current, [ "a", "b", ], { first: 0xE001, last: 0xE001, })).toThrow(
            "ran out of codepoints",
        );
    });
});

describe("renderManifest", () => {
    test("is sorted by name and byte-stable", () => {
        const rendered = renderManifest({ "plus": 0xE002, "arrow-right": 0xE001, });

        expect(rendered).toBe(`${MANIFEST_HEADER}

/** Public icon keys. Each key is the name of a source SVG file. */
export const ICON_CODEPOINTS = {
    "arrow-right": 0xE001,
    "plus": 0xE002,
} as const;

export type IconName = keyof typeof ICON_CODEPOINTS;
`);
    });
});

describe("parseManifest", () => {
    test("round-trips a rendered manifest", () => {
        const codepoints = { "arrow-right": 0xE001, "plus": 0xF8FF, };
        const parsed = parseManifest(renderManifest(codepoints));

        expect(parsed).toEqual(codepoints);
    });
});
