import { fileURLToPath, } from "node:url";

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
