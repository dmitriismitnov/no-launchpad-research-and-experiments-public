import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, } from "node:fs";
import { basename, join, resolve, } from "node:path";

import { buildIconFont, type IconGlyph, } from "./font";
import { assignCodepoints, type IconCodepoints, parseManifest, renderManifest, } from "./manifest";
import { isValidIconName, normalizeSvg, validateSvg, } from "./svg";

const componentDir = resolve(import.meta.dir, "..");
const svgDir = join(componentDir, "assets", "svg");
const fontDir = join(componentDir, "assets", "font");
const fontPath = join(fontDir, "icon.woff2");
const manifestPath = join(componentDir, "manifest.generated.ts");

type Options = {
    check: boolean;
    from?: string;
};

const parseArgs = (argv: readonly string[]): Options => {
    let check = false;
    let from: string | undefined;

    for ( let index = 0; index < argv.length; index += 1 ) {
        const arg = argv[index];

        if ( arg === "--check" ) {
            check = true;
            continue;
        }

        if ( arg === "--from" ) {
            index += 1;
            from = argv[index];

            if ( from === undefined ) {
                throw new Error("--from requires a directory");
            }

            continue;
        }

        throw new Error(`unknown option "${arg ?? ""}"`);
    }

    return { check, from, };
};

const listSvgs = (dir: string): string[] =>
    readdirSync(dir)
        .filter((file) => file.endsWith(".svg"))
        .sort();

const assertValid = (file: string, svg: string): void => {
    const issues = validateSvg(svg);

    if ( issues.length > 0 ) {
        throw new Error(`invalid svg "${file}":\n  ${issues.join("\n  ")}`);
    }
};

/**
 * Normalizes raw exports into the canonical source directory and reports which
 * files changed.
 */
const importFrom = (rawDir: string): { written: string[]; unchanged: string[]; } => {
    mkdirSync(svgDir, { recursive: true, });

    const written: string[] = [];
    const unchanged: string[] = [];

    for ( const file of listSvgs(rawDir) ) {
        const name = basename(file, ".svg");

        if ( !isValidIconName(name) ) {
            throw new Error(`invalid icon name "${name}"`);
        }

        const canonical = normalizeSvg(readFileSync(join(rawDir, file), "utf8"));
        assertValid(file, canonical);

        const target = join(svgDir, file);
        const serialized = `${canonical}\n`;
        const isUnchanged = existsSync(target) && readFileSync(target, "utf8") === serialized;

        writeFileSync(target, serialized);
        ( isUnchanged ? unchanged : written ).push(name);
    }

    return { written, unchanged, };
};

const readCanonical = (): Omit<IconGlyph, "codepoint">[] =>
    listSvgs(svgDir).map((file) => {
        const name = basename(file, ".svg");

        if ( !isValidIconName(name) ) {
            throw new Error(`invalid icon name "${name}"`);
        }

        const svg = readFileSync(join(svgDir, file), "utf8").trim();
        assertValid(file, svg);

        return { name, svg, };
    });

const requireCodepoint = (codepoints: IconCodepoints, name: string): number => {
    const codepoint = codepoints[name];

    if ( codepoint === undefined ) {
        throw new Error(`missing codepoint for "${name}"`);
    }

    return codepoint;
};

const run = async (): Promise<number> => {
    const options = parseArgs(process.argv.slice(2));
    const imported = options.from === undefined
        ? undefined
        : importFrom(resolve(process.cwd(), options.from));

    const glyphs = readCanonical();

    if ( glyphs.length === 0 ) {
        throw new Error(`no svg files found in ${svgDir}`);
    }

    const previous = existsSync(manifestPath)
        ? parseManifest(readFileSync(manifestPath, "utf8"))
        : {};
    const { codepoints, added, } = assignCodepoints(previous, glyphs.map((glyph) => glyph.name));
    const withCodepoints: IconGlyph[] = glyphs.map((glyph) => ( {
        ...glyph,
        codepoint: requireCodepoint(codepoints, glyph.name),
    } ));

    const manifestSource = renderManifest(codepoints);
    const woff2 = await buildIconFont(withCodepoints);

    if ( options.check ) {
        const manifestMatches = existsSync(manifestPath)
            && readFileSync(manifestPath, "utf8") === manifestSource;
        const fontMatches = existsSync(fontPath) && readFileSync(fontPath).equals(woff2);

        if ( !manifestMatches || !fontMatches ) {
            if ( !manifestMatches ) {
                console.error("✗ manifest.generated.ts is out of date");
            }

            if ( !fontMatches ) {
                console.error("✗ assets/font/icon.woff2 is out of date");
            }

            console.error("run `mise run icons:build`");

            return 1;
        }

        console.log(`✓ icons up to date (${glyphs.length} icons)`);

        return 0;
    }

    mkdirSync(fontDir, { recursive: true, });
    writeFileSync(fontPath, woff2);
    writeFileSync(manifestPath, manifestSource);

    if ( imported !== undefined ) {
        if ( imported.written.length > 0 ) {
            console.log(`imported: ${imported.written.join(", ")}`);
        }

        if ( imported.unchanged.length > 0 ) {
            console.log(`unchanged: ${imported.unchanged.join(", ")}`);
        }
    }

    console.log(
        `icons: ${glyphs.length} total, ${added.length} new${added.length > 0 ? ` (${added.join(", ")})` : ""}`,
    );
    console.log(`font: ${woff2.length} B -> ${fontPath}`);
    console.log(`manifest -> ${manifestPath}`);

    return 0;
};

try {
    process.exitCode = await run();
} catch ( error ) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
