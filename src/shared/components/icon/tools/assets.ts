import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, } from "node:fs";
import { basename, join, resolve, } from "node:path";

import { buildIconFont, type IconGlyph, } from "./font";
import { assignCodepoints, type IconCodepoints, parseManifest, renderManifest, } from "./manifest";
import { isValidIconName, normalizeSvg, validateSvg, } from "./svg";

export const componentDir = resolve(import.meta.dir, "..");
export const svgDir = join(componentDir, "assets", "svg");

const fontDir = join(componentDir, "assets", "font");

export const fontPath = join(fontDir, "icon.woff2");
export const manifestPath = join(componentDir, "manifest.generated.ts");

type CanonicalIcon = {
    name: string;
    svg: string;
};

const listSvgs = (dir: string): string[] =>
    readdirSync(dir)
        .filter((file) => file.endsWith(".svg"))
        .sort();

const assertValidSvg = (file: string, svg: string): void => {
    const issues = validateSvg(svg);

    if ( issues.length > 0 ) {
        throw new Error(`invalid svg "${file}":\n  ${issues.join("\n  ")}`);
    }
};

/** Normalizes a raw export and rejects it when the result breaks the contract. */
export const normalizeRawSvg = (file: string, source: string): string => {
    const canonical = normalizeSvg(source);
    assertValidSvg(file, canonical);

    return canonical;
};

const requireNameFromFile = (file: string): string => {
    const name = basename(file, ".svg");

    if ( !isValidIconName(name) ) {
        throw new Error(`invalid icon name "${name}"`);
    }

    return name;
};

const readCanonicalIcons = (): CanonicalIcon[] =>
    listSvgs(svgDir).map((file) => {
        const name = requireNameFromFile(file);
        const svg = readFileSync(join(svgDir, file), "utf8").trim();
        assertValidSvg(file, svg);

        return { name, svg, };
    });

export const readCanonicalSvg = (name: string): string | undefined => {
    const path = join(svgDir, `${name}.svg`);

    return existsSync(path) ? readFileSync(path, "utf8").trim() : undefined;
};

export const writeCanonicalSvg = (name: string, svg: string): void => {
    mkdirSync(svgDir, { recursive: true, });
    writeFileSync(join(svgDir, `${name}.svg`), `${svg}\n`);
};

export const removeCanonicalSvg = (name: string): void => {
    rmSync(join(svgDir, `${name}.svg`), { force: true, });
};

export const readManifest = (): IconCodepoints =>
    existsSync(manifestPath) ? parseManifest(readFileSync(manifestPath, "utf8")) : {};

export type ImportResult = {
    written: string[];
    unchanged: string[];
};

/** Normalizes raw exports into the canonical source directory. */
export const importFromRawDir = (rawDir: string): ImportResult => {
    const written: string[] = [];
    const unchanged: string[] = [];

    for ( const file of listSvgs(rawDir) ) {
        const name = requireNameFromFile(file);
        const canonical = normalizeRawSvg(file, readFileSync(join(rawDir, file), "utf8"));
        const exists = readCanonicalSvg(name) === canonical;

        writeCanonicalSvg(name, canonical);
        ( exists ? unchanged : written ).push(name);
    }

    return { written, unchanged, };
};

const requireCodepoint = (codepoints: IconCodepoints, name: string): number => {
    const codepoint = codepoints[name];

    if ( codepoint === undefined ) {
        throw new Error(`missing codepoint for "${name}"`);
    }

    return codepoint;
};

export type BuiltAssets = {
    count: number;
    added: string[];
    codepoints: IconCodepoints;
    woff2: Buffer;
    manifestSource: string;
};

/** Builds the font and manifest in memory without writing anything. */
const buildAssets = async (): Promise<BuiltAssets> => {
    const icons = readCanonicalIcons();

    if ( icons.length === 0 ) {
        throw new Error(`no svg files found in ${svgDir}`);
    }

    const { codepoints, added, } = assignCodepoints(readManifest(), icons.map((icon) => icon.name));
    const glyphs: IconGlyph[] = icons.map((icon) => ( {
        name: icon.name,
        svg: icon.svg,
        codepoint: requireCodepoint(codepoints, icon.name),
    } ));
    const manifestSource = renderManifest(codepoints);
    const woff2 = await buildIconFont(glyphs);

    return { count: icons.length, added, codepoints, woff2, manifestSource, };
};

export const writeAssets = async (): Promise<BuiltAssets> => {
    const built = await buildAssets();

    mkdirSync(fontDir, { recursive: true, });
    writeFileSync(fontPath, built.woff2);
    writeFileSync(manifestPath, built.manifestSource);

    return built;
};

export type AssetCheck = {
    count: number;
    manifestMatches: boolean;
    fontMatches: boolean;
};

export const checkAssets = async (): Promise<AssetCheck> => {
    const built = await buildAssets();

    return {
        count: built.count,
        manifestMatches: existsSync(manifestPath) && readFileSync(manifestPath, "utf8") === built.manifestSource,
        fontMatches: existsSync(fontPath) && readFileSync(fontPath).equals(built.woff2),
    };
};
