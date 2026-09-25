import { readdirSync, readFileSync, writeFileSync, } from "node:fs";
import { basename, join, relative, resolve, } from "node:path";

import {
    componentDir,
    normalizeRawSvg,
    readCanonicalSvg,
    readManifest,
    removeCanonicalSvg,
    writeAssets,
    writeCanonicalSvg,
} from "./assets";
import { classifyChanges, type IconSource, migrateUsages, scanIconUsages, type UsageScan, } from "./diff";
import { isValidIconName, } from "./svg";

const repoRoot = resolve(componentDir, "../../../..");
const srcDir = join(repoRoot, "src");

type Options = {
    from: string;
    apply: boolean;
    allowGlyphChange: boolean;
    allowRemove: boolean;
    migrateUsage: { from: string; to: string; }[];
    keepAlias: { from: string; to: string; }[];
};

const parsePair = (value: string, flag: string): { from: string; to: string; } => {
    const [ from, to, ] = value.split("=");

    if ( from === undefined || from === "" || to === undefined || to === "" ) {
        throw new Error(`${flag} expects "old=new"`);
    }

    return { from, to, };
};

const parseArgs = (argv: readonly string[]): Options => {
    let from: string | undefined;
    let apply = false;
    let allowGlyphChange = false;
    let allowRemove = false;
    const migrateUsage: { from: string; to: string; }[] = [];
    const keepAlias: { from: string; to: string; }[] = [];

    for ( let index = 0; index < argv.length; index += 1 ) {
        const arg = argv[index];

        if ( arg === "--apply" ) {
            apply = true;
            continue;
        }

        if ( arg === "--allow-glyph-change" ) {
            allowGlyphChange = true;
            continue;
        }

        if ( arg === "--allow-remove" ) {
            allowRemove = true;
            continue;
        }

        if ( arg === "--from" || arg === "--migrate-usage" || arg === "--keep-alias" ) {
            index += 1;

            const value = argv[index];

            if ( value === undefined ) {
                throw new Error(`${arg} requires a value`);
            }

            if ( arg === "--from" ) {
                from = value;
            } else if ( arg === "--migrate-usage" ) {
                migrateUsage.push(parsePair(value, arg));
            } else {
                keepAlias.push(parsePair(value, arg));
            }

            continue;
        }

        throw new Error(`unknown option "${arg ?? ""}"`);
    }

    if ( from === undefined ) {
        throw new Error(`--from <dir> is required

usage: update.ts --from <dir> [--apply] [--allow-glyph-change] [--allow-remove]
                 [--migrate-usage old=new] [--keep-alias old=new]`);
    }

    return { from, apply, allowGlyphChange, allowRemove, migrateUsage, keepAlias, };
};

type Collision = {
    file: string;
    declared: string;
    expected: string;
};

/** Reads and normalizes the proposed set, collecting name collisions. */
const readProposed = (
    dir: string,
): { icons: IconSource[]; collisions: Collision[]; } => {
    const icons: IconSource[] = [];
    const collisions: Collision[] = [];

    for ( const file of readdirSync(dir).filter((entry) => entry.endsWith(".svg")).sort() ) {
        const expected = basename(file, ".svg");

        if ( !isValidIconName(expected) ) {
            throw new Error(`invalid icon name "${expected}" (file ${file})`);
        }

        const source = readFileSync(join(dir, file), "utf8");
        const declared = source.match(/\bdata-icon-name\s*=\s*"([^"]*)"/)?.[1];

        if ( declared !== undefined && declared !== expected ) {
            collisions.push({ file, declared, expected, });
        }

        icons.push({ name: expected, svg: normalizeRawSvg(file, source), });
    }

    return { icons, collisions, };
};

const listSourceFiles = (dir: string): { path: string; content: string; }[] => {
    const files: { path: string; content: string; }[] = [];

    const walk = (current: string): void => {
        for ( const entry of readdirSync(current, { withFileTypes: true, }) ) {
            const full = join(current, entry.name);

            if ( entry.isDirectory() ) {
                if ( full !== componentDir ) {
                    walk(full);
                }

                continue;
            }

            if ( !/\.tsx?$/.test(entry.name) || entry.name.endsWith(".generated.ts") ) {
                continue;
            }

            files.push({ path: relative(repoRoot, full), content: readFileSync(full, "utf8"), });
        }
    };

    walk(dir);

    return files;
};

const printUsages = (scan: UsageScan, keys: readonly string[]): void => {
    for ( const key of keys ) {
        const usages = scan.static.filter((usage) => usage.key === key);

        for ( const usage of usages ) {
            console.log(`    ${usage.file}:${usage.line}`);
        }
    }
};

const run = async (): Promise<number> => {
    const options = parseArgs(process.argv.slice(2));
    const { icons, collisions, } = readProposed(resolve(process.cwd(), options.from));
    const manifest = readManifest();

    const canonical: Record<string, string> = {};
    for ( const name of Object.keys(manifest) ) {
        const svg = readCanonicalSvg(name);

        if ( svg !== undefined ) {
            canonical[name] = svg;
        }
    }

    const diff = classifyChanges(icons, manifest, canonical);
    const scan = scanIconUsages(listSourceFiles(srcDir));
    const proposedByName = new Map(icons.map((icon) => [ icon.name, icon.svg, ]));

    const migrations = new Map(options.migrateUsage.map((pair) => [ pair.from, pair.to, ]));
    const aliases = new Map(options.keepAlias.map((pair) => [ pair.from, pair.to, ]));

    for ( const [ from, to, ] of [ ...migrations, ...aliases, ] ) {
        if ( !proposedByName.has(to) ) {
            throw new Error(`alias/migration target "${to}" is not in the proposed set`);
        }

        if ( manifest[from] === undefined ) {
            throw new Error(`alias/migration source "${from}" is not in the current set`);
        }
    }

    console.log(`proposed: ${icons.length} icons from ${options.from}`);
    console.log(`  added:     ${diff.added.join(", ") || "—"}`);
    console.log(`  changed:   ${diff.changed.join(", ") || "—"}`);
    console.log(`  unchanged: ${diff.unchanged.length > 0 ? `${diff.unchanged.length} icon(s)` : "—"}`);
    console.log(`  removed:   ${diff.removed.join(", ") || "—"}`);

    if ( diff.renames.length > 0 ) {
        console.log("  possible renames:");
        for ( const rename of diff.renames ) {
            console.log(`    ${rename.from} -> ${rename.to}`);
        }
    }

    if ( diff.removed.length > 0 ) {
        console.log("  usages of removed keys:");
        printUsages(scan, diff.removed);
    }

    if ( diff.changed.length > 0 ) {
        console.log("  usages of changed keys:");
        printUsages(scan, diff.changed);
    }

    if ( scan.dynamic.length > 0 ) {
        console.log("  dynamic usages (manual):");
        for ( const usage of scan.dynamic ) {
            console.log(`    ${usage.file}:${usage.line}`);
        }
    }

    const blockedRemovals = diff.removed.filter((name) =>
        !options.allowRemove && !migrations.has(name) && !aliases.has(name)
    );
    const blockedChanges = options.allowGlyphChange ? [] : diff.changed;

    if ( collisions.length > 0 ) {
        console.log("  collisions:");
        for ( const collision of collisions ) {
            console.log(`    ${collision.file}: declares "${collision.declared}", expected "${collision.expected}"`);
        }
    }

    const blocked = collisions.length > 0 || blockedRemovals.length > 0 || blockedChanges.length > 0;

    if ( blocked ) {
        console.log("blocked — no changes applied:");

        if ( collisions.length > 0 ) {
            console.log("  fix the name collisions first");
        }

        if ( blockedChanges.length > 0 ) {
            console.log(`  glyph changes need confirmation: --allow-glyph-change (${blockedChanges.join(", ")})`);
        }

        if ( blockedRemovals.length > 0 ) {
            console.log(
                `  removals need a decision: --allow-remove, --migrate-usage old=new or --keep-alias old=new (${
                    blockedRemovals.join(", ")
                })`,
            );
        }

        return 1;
    }

    if ( !options.apply ) {
        console.log("dry run — pass --apply to write these changes");

        return 0;
    }

    for ( const [ from, to, ] of migrations ) {
        for ( const file of listSourceFiles(srcDir) ) {
            const { content, count, } = migrateUsages(file.content, from, to);

            if ( count > 0 ) {
                writeFileSync(join(repoRoot, file.path), content);
                console.log(`migrated ${count} usage(s) in ${file.path}: ${from} -> ${to}`);
            }
        }
    }

    for ( const icon of icons ) {
        writeCanonicalSvg(icon.name, icon.svg);
    }

    for ( const [ from, to, ] of aliases ) {
        const svg = proposedByName.get(to);

        if ( svg !== undefined ) {
            writeCanonicalSvg(from, svg);
            console.log(`kept alias ${from} -> ${to}`);
        }
    }

    for ( const name of diff.removed ) {
        if ( !aliases.has(name) ) {
            removeCanonicalSvg(name);
            console.log(`removed ${name}`);
        }
    }

    const built = await writeAssets();

    console.log(`icons: ${built.count} total, ${built.added.length} new`);
    console.log(`font: ${built.woff2.length} B`);

    return 0;
};

try {
    process.exitCode = await run();
} catch ( error ) {
    console.error(`icons:update: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
}
