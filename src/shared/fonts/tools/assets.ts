import { existsSync, mkdirSync, readFileSync, writeFileSync, } from "node:fs";
import { fileURLToPath, } from "node:url";

import { buildWoff2, readAndValidateFace, type ValidatedFontFace, } from "./font";
import { renderManifest, } from "./manifest";

/**
 * One web-font face owned by the font asset pipeline.
 * `sourcePath` is the canonical variable TTF input; `outputPath` is the
 * generated WOFF2 this pipeline writes. Paths are absolute and module-relative
 * so the build works from any shell directory.
 */
export type FontFaceSource = {
    id: "inter-normal" | "inter-italic";
    sourcePath: string;
    outputPath: string;
    style: "normal" | "italic";
    weightRange: "100 900";
};

const url = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

/** Canonical raw-font directory; never below Vite's `public/`. */
export const rawDir = url("../assets/raw/inter/");

/** Generated web-font directory; committed but written only by the pipeline. */
export const webDir = url("../assets/web/inter/");

/** Retained upstream OFL licence for the bundled family. */
export const licencePath = url("../assets/raw/inter/OFL.txt");

/** Committed, generated web-font manifest. */
export const manifestPath = url("../manifest.generated.ts");

export const fontFaces: readonly FontFaceSource[] = [
    {
        id: "inter-normal",
        sourcePath: url("../assets/raw/inter/Inter-VariableFont_opsz,wght.ttf"),
        outputPath: url("../assets/web/inter/inter-normal.woff2"),
        style: "normal",
        weightRange: "100 900",
    },
    {
        id: "inter-italic",
        sourcePath: url("../assets/raw/inter/Inter-Italic-VariableFont_opsz,wght.ttf"),
        outputPath: url("../assets/web/inter/inter-italic.woff2"),
        style: "italic",
        weightRange: "100 900",
    },
];

/** One generated WOFF2 file, paired with the face it came from. */
type BuiltFontAsset = {
    faceId: FontFaceSource["id"];
    path: string;
    bytes: Buffer;
};

/** The complete generated output for one build: fonts plus the manifest. */
export type FontAssetBuild = {
    faces: readonly ValidatedFontFace[];
    files: readonly BuiltFontAsset[];
    manifestSource: string;
};

/** Builds every face and the manifest in memory without touching the disk. */
export const buildFontAssets = async (): Promise<FontAssetBuild> => {
    const faces = await Promise.all(fontFaces.map((face) => readAndValidateFace(face)));
    const files = await Promise.all(faces.map(async (face) => ( {
        faceId: face.id,
        path: face.outputPath,
        bytes: await buildWoff2(face),
    } )));

    return { faces, files, manifestSource: renderManifest(faces), };
};

/** Writes the generated fonts and manifest. Only the build task calls this. */
export const writeFontAssets = (build: FontAssetBuild): void => {
    mkdirSync(webDir, { recursive: true, });

    for ( const file of build.files ) {
        writeFileSync(file.path, file.bytes);
    }

    writeFileSync(manifestPath, build.manifestSource);
};

/** Disk access used by the check, injectable so drift is testable in isolation. */
export type FontAssetIo = {
    exists: (path: string) => boolean;
    read: (path: string) => Buffer;
};

const nodeFontAssetIo: FontAssetIo = {
    exists: (path) => existsSync(path),
    read: (path) => readFileSync(path),
};

/**
 * Compares generated output with what is already committed.
 * Read-only by construction: a stale or missing file is reported, never
 * rewritten. Returns one actionable message per problem, empty when in sync.
 */
export const checkFontAssets = (
    build: FontAssetBuild,
    manifest: string = manifestPath,
    io: FontAssetIo = nodeFontAssetIo,
): readonly string[] => {
    const problems: string[] = [];

    for ( const file of build.files ) {
        if ( !io.exists(file.path) ) {
            problems.push(`missing generated font: ${file.path}`);
        } else if ( !io.read(file.path).equals(file.bytes) ) {
            problems.push(`stale generated font: ${file.path}`);
        }
    }

    if ( !io.exists(manifest) ) {
        problems.push(`missing generated manifest: ${manifest}`);
    } else if ( io.read(manifest).toString("utf8") !== build.manifestSource ) {
        problems.push(`stale generated manifest: ${manifest}`);
    }

    return problems;
};
