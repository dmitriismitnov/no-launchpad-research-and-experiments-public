import { buildFontAssets, checkFontAssets, writeFontAssets, } from "./assets";

const parseArgs = (argv: readonly string[]): { check: boolean; } => {
    let check = false;

    for ( const arg of argv ) {
        if ( arg === "--check" ) {
            check = true;
            continue;
        }

        throw new Error(`unknown option "${arg}"`);
    }

    return { check, };
};

const run = async (): Promise<number> => {
    const { check, } = parseArgs(process.argv.slice(2));
    const built = await buildFontAssets();

    if ( check ) {
        const problems = checkFontAssets(built);

        if ( problems.length > 0 ) {
            for ( const problem of problems ) {
                console.error(`✗ ${problem}`);
            }

            console.error("run `mise run fonts:build`");

            return 1;
        }

        console.log(`✓ web fonts up to date (${built.files.length} faces)`);

        return 0;
    }

    writeFontAssets(built);

    for ( const file of built.files ) {
        console.log(`font: ${file.faceId} ${file.bytes.length} B -> ${file.path}`);
    }

    for ( const text of built.textFiles ) {
        console.log(`${text.kind} -> ${text.path}`);
    }

    return 0;
};

try {
    process.exitCode = await run();
} catch ( error ) {
    console.error(`fonts: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
}
