import { resolve, } from "node:path";

import { checkAssets, fontPath, importFromRawDir, manifestPath, svgDir, writeAssets, } from "./assets";

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

const run = async (): Promise<number> => {
    const options = parseArgs(process.argv.slice(2));
    const imported = options.from === undefined
        ? undefined
        : importFromRawDir(resolve(process.cwd(), options.from));

    if ( options.check ) {
        const result = await checkAssets();

        if ( !result.manifestMatches || !result.fontMatches ) {
            if ( !result.manifestMatches ) {
                console.error("✗ manifest.generated.ts is out of date");
            }

            if ( !result.fontMatches ) {
                console.error("✗ assets/font/icon.woff2 is out of date");
            }

            console.error("run `mise run icons:build`");

            return 1;
        }

        console.log(`✓ icons up to date (${result.count} icons)`);

        return 0;
    }

    const built = await writeAssets();

    if ( imported !== undefined ) {
        if ( imported.written.length > 0 ) {
            console.log(`imported: ${imported.written.join(", ")}`);
        }

        if ( imported.unchanged.length > 0 ) {
            console.log(`unchanged: ${imported.unchanged.join(", ")}`);
        }
    }

    const suffix = built.added.length > 0 ? ` (${built.added.join(", ")})` : "";
    console.log(`icons: ${built.count} total, ${built.added.length} new${suffix}`);
    console.log(`font: ${built.woff2.length} B -> ${fontPath}`);
    console.log(`manifest -> ${manifestPath}`);

    return 0;
};

try {
    process.exitCode = await run();
} catch ( error ) {
    console.error(`icons: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`sources: ${svgDir}`);
    process.exitCode = 1;
}
