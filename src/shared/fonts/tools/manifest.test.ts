import { describe, expect, test, } from "bun:test";
import { mkdtempSync, readFileSync, writeFileSync, } from "node:fs";
import { tmpdir, } from "node:os";
import { join, } from "node:path";

import { buildFontAssets, checkFontAssets, type FontAssetBuild, fontFaces, } from "./assets";
import { readAndValidateFace, } from "./font";
import { renderManifest, } from "./manifest";

const validatedFaces = await Promise.all(fontFaces.map((face) => readAndValidateFace(face)));

describe("renderManifest", () => {
    test("renders the canonical manifest in face order", () => {
        const source = renderManifest(validatedFaces);

        expect(source).toContain('id: "inter-normal"');
        expect(source).toContain('id: "inter-italic"');
        expect(source.indexOf('id: "inter-normal"')).toBeLessThan(source.indexOf('id: "inter-italic"'));
    });

    test("carries the CSS-relevant metadata and the relative file name", () => {
        const source = renderManifest(validatedFaces);

        expect(source).toContain('family: "Inter"');
        expect(source).toContain('weightRange: "100 900"');
        expect(source).toContain('fileName: "inter-normal.woff2"');
        expect(source).toContain('fileName: "inter-italic.woff2"');
    });
});

describe("buildFontAssets", () => {
    test("rebuilding from unchanged inputs returns byte-identical output", async () => {
        const first = await buildFontAssets();
        const second = await buildFontAssets();

        expect(second.manifestSource).toBe(first.manifestSource);
        expect(second.files).toEqual(first.files);
    }, 60_000);
});

describe("checkFontAssets", () => {
    const dir = mkdtempSync(join(tmpdir(), "nl-font-check-"));
    const fontPath = join(dir, "inter-normal.woff2");
    const manifest = join(dir, "manifest.generated.ts");

    const build = (): FontAssetBuild => ( {
        faces: [],
        files: [
            {
                faceId: "inter-normal",
                path: fontPath,
                bytes: Buffer.from([ 0x77, 0x4F, 0x46, 0x32, 1, 2, 3, ]),
            },
        ],
        manifestSource: "export const WEB_FONT_FACES = [];\n",
    } );

    test("reports a changed generated woff2 and does not rewrite it", () => {
        const altered = Buffer.from([ 0x77, 0x4F, 0x46, 0x32, 9, 9, 9, ]);

        writeFileSync(fontPath, altered);
        writeFileSync(manifest, build().manifestSource);

        const problems = checkFontAssets(build(), manifest);

        expect(problems.some((problem) => /stale generated font/.test(problem))).toBe(true);
        // The check must be read-only: the altered bytes survive untouched.
        expect(readFileSync(fontPath)).toEqual(altered);
    });

    test("reports a changed generated manifest", () => {
        writeFileSync(fontPath, build().files[0]!.bytes);
        writeFileSync(manifest, "// different\n");

        const problems = checkFontAssets(build(), manifest);

        expect(problems.some((problem) => /stale generated manifest/.test(problem))).toBe(true);
    });
});
