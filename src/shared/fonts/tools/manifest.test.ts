import { describe, expect, test, } from "bun:test";
import { mkdtempSync, readFileSync, writeFileSync, } from "node:fs";
import { tmpdir, } from "node:os";
import { join, } from "node:path";

import {
    buildFontAssets,
    type BuiltFontAsset,
    type BuiltTextAsset,
    checkFontAssets,
    type FontAssetBuild,
    fontCssPath,
    fontFaces,
    manifestPath,
    nodeFontAssetIo,
} from "./assets";
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

        expect(second.files).toEqual(first.files);
        expect(second.textFiles).toEqual(first.textFiles);
    }, 60_000);

    test("targets the committed generated artifact paths", async () => {
        const built = await buildFontAssets();

        expect(built.textFiles.map((text) => text.path)).toEqual([ manifestPath, fontCssPath, ]);
    }, 60_000);
});

describe("checkFontAssets", () => {
    const dir = mkdtempSync(join(tmpdir(), "nl-font-check-"));
    const fontPath = join(dir, "inter-normal.woff2");
    const manifestFile = join(dir, "manifest.generated.ts");
    const cssFile = join(dir, "font.generated.css");

    const build = (): FontAssetBuild => ( {
        faces: [],
        files: [
            {
                faceId: "inter-normal",
                path: fontPath,
                bytes: Buffer.from([ 0x77, 0x4F, 0x46, 0x32, 1, 2, 3, ]),
            } satisfies BuiltFontAsset,
        ],
        textFiles: [
            {
                kind: "manifest",
                path: manifestFile,
                source: "export const WEB_FONT_FACES = [];\n",
            } satisfies BuiltTextAsset,
            {
                kind: "css",
                path: cssFile,
                source: '@font-face { font-family: "Inter"; }\n',
            } satisfies BuiltTextAsset,
        ],
    } );

    test("reports a changed generated woff2 and does not rewrite it", () => {
        const altered = Buffer.from([ 0x77, 0x4F, 0x46, 0x32, 9, 9, 9, ]);

        writeFileSync(fontPath, altered);
        writeFileSync(manifestFile, build().textFiles[0]!.source);
        writeFileSync(cssFile, build().textFiles[1]!.source);

        const problems = checkFontAssets(build());

        expect(problems.some((problem) => /stale generated font/.test(problem))).toBe(true);
        // The check must be read-only: the altered bytes survive untouched.
        expect(readFileSync(fontPath)).toEqual(altered);
    });

    test("reports a changed generated manifest", () => {
        writeFileSync(fontPath, build().files[0]!.bytes);
        writeFileSync(manifestFile, "// different\n");
        writeFileSync(cssFile, build().textFiles[1]!.source);

        const problems = checkFontAssets(build());

        expect(problems.some((problem) => /stale generated manifest/.test(problem))).toBe(true);
    });

    test("reports a changed generated CSS file and does not rewrite it", () => {
        const altered = "@font-face { font-family: wrong; }\n";

        writeFileSync(cssFile, altered);
        writeFileSync(manifestFile, build().textFiles[0]!.source);
        writeFileSync(fontPath, build().files[0]!.bytes);

        const problems = checkFontAssets(build(), nodeFontAssetIo);

        expect(problems.some((problem) => /stale generated css/.test(problem))).toBe(true);
        expect(readFileSync(cssFile, "utf8")).toBe(altered);
    });
});
