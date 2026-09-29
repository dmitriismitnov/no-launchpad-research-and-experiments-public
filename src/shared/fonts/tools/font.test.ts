import { describe, expect, test, } from "bun:test";
import { mkdtempSync, writeFileSync, } from "node:fs";
import { tmpdir, } from "node:os";
import { join, } from "node:path";

import svg2ttf from "svg2ttf";

import { fontFaces, } from "./assets";
import { assertCanonicalFont, buildWoff2, readAndValidateFace, readVariationAxes, } from "./font";

const [ normalFace, italicFace, ] = fontFaces as [ typeof fontFaces[number], typeof fontFaces[number], ];

/**
 * Test-only non-variable fixture generator.
 *
 * The failure cases need a real font whose family is wrong and a real font
 * without variable axes. `svg2ttf` is already a pinned devDependency, so the
 * fixtures are generated instead of committing artificial binary fonts that
 * could be mistaken for production assets.
 */
const svgFont = (family: string): string =>
    `<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg"><defs>`
    + `<font id="${family}" horiz-adv-x="1000"><font-face font-family="${family}" units-per-em="1000" `
    + `ascent="800" descent="-200"/><missing-glyph horiz-adv-x="1000"/>`
    + `<glyph unicode="A" d="M0 0L500 1000L1000 0Z" horiz-adv-x="1000"/></font></defs></svg>`;

const fixtureDir = mkdtempSync(join(tmpdir(), "nl-font-fixtures-"));

const writeFixture = (name: string, family: string): string => {
    const path = join(fixtureDir, `${name}.ttf`);
    writeFileSync(path, Buffer.from(svg2ttf(svgFont(family), { ts: 0, }).buffer));

    return path;
};

const wrongFamilyPath = writeFixture("not-inter", "Not Inter");
const staticFacePath = writeFixture("static-inter", "Inter");

/**
 * Resolves with the rejection reason, or throws if the promise resolved.
 * `expect(...).rejects` is typed as `void` by `bun-types`, so awaiting it trips
 * `@typescript-eslint/await-thenable`; this keeps the assertion explicit.
 */
const rejection = async (promise: Promise<unknown>): Promise<Error> => {
    try {
        await promise;
    } catch ( error ) {
        return error as Error;
    }

    throw new Error("expected the promise to reject, but it resolved");
};

describe("readAndValidateFace", () => {
    test("reads the canonical metadata of a variable Inter face", async () => {
        const validated = await readAndValidateFace(normalFace);

        expect(validated).toMatchObject({
            id: "inter-normal",
            family: "Inter",
            style: "normal",
            weightRange: "100 900",
            axes: [ "opsz", "wght", ],
        });
    });

    test("rejects a source whose family differs from the canonical Inter contract", async () => {
        const error = await rejection(readAndValidateFace({ ...normalFace, sourcePath: wrongFamilyPath, }));

        expect(error.message).toMatch(/expected family Inter/i);
    });

    test("rejects a source without both opsz and wght axes", async () => {
        const error = await rejection(readAndValidateFace({ ...normalFace, sourcePath: staticFacePath, }));

        expect(error.message).toMatch(/variable axes.*opsz.*wght/i);
    });

    test("rejects a source whose style does not match the declared face", async () => {
        const error = await rejection(
            readAndValidateFace({ ...normalFace, sourcePath: italicFace.sourcePath, }),
        );

        expect(error.message).toMatch(/expected style normal/i);
    });
});

describe("buildWoff2", () => {
    test("keeps Inter's variable axes in each generated WOFF2", async () => {
        for ( const face of fontFaces ) {
            const result = await buildWoff2(face);

            expect(result.subarray(0, 4).toString("ascii")).toBe("wOF2");
            expect(readVariationAxes(result)).toEqual([ "opsz", "wght", ]);
        }
    }, 30_000);
});

/**
 * The contract is checked on a pure descriptor as well as on real files, so
 * every rule — including the weight range, which no generated fixture can
 * exercise — is pinned by its own test.
 */
describe("assertCanonicalFont", () => {
    const canonical = {
        familyName: "Inter",
        italicAngle: 0,
        variationAxes: {
            opsz: { min: 14, max: 32, },
            wght: { min: 100, max: 900, },
        },
    };

    test("accepts a descriptor matching the canonical Inter contract", () => {
        expect(() => assertCanonicalFont(canonical, normalFace, "source")).not.toThrow();
    });

    test("rejects a source whose wght range is not the canonical 100 900", () => {
        expect(() =>
            assertCanonicalFont(
                {
                    ...canonical,
                    variationAxes: {
                        opsz: { min: 14, max: 32, },
                        wght: { min: 200, max: 800, },
                    },
                },
                normalFace,
                "source",
            )
        ).toThrow(/expected wght range 100 900/i);
    });
});
