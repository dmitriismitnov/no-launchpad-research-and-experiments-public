/**
 * Reproducible Batch A assertion for the Landing `codeSurface` line-height.
 *
 * Checks, against the current working tree by default:
 * - `src/app/Landing.tsx` `codeSurface.lineHeight === "snug"`;
 * - foundation `snug === 1.4` and `normal === 1.4` (the Pen `normal` step and
 *   its retained legacy alias).
 *
 * `--ref <git-revision>` reads `src/app/Landing.tsx` from that revision with
 * `git show`, so the historical `3c8f9a1` state (`lineHeight: "normal"`) is a
 * reproducible RED:
 *
 *   bun run scripts/assert-landing-snug.ts                  # exit 0
 *   bun run scripts/assert-landing-snug.ts --ref 3c8f9a1    # exit 1
 *
 * The script depends only on the Node/Bun standard library and the repository
 * itself; it adds no package or temporary fixture dependency.
 */

import { execFileSync, } from "node:child_process";
import { readFileSync, } from "node:fs";
import { resolve, } from "node:path";

const REPO_ROOT = resolve(import.meta.dir, "..");
const LANDING_PATH = "src/app/Landing.tsx";
const FOUNDATION_PATH = "src/shared/styles/foundation/typography/line-heights.ts";

type Source = { text: string; origin: string; };
type Check = { label: string; ok: boolean; detail: string; };

const parseRef = (argv: string[]): string | undefined => {
    const index = argv.indexOf("--ref");

    if ( index === -1 ) {
        return undefined;
    }

    const value = argv[index + 1];

    if ( value === undefined || value.startsWith("--") ) {
        throw new Error("--ref requires a git revision");
    }

    return value;
};

const readSource = (ref: string | undefined, relativePath: string): Source => {
    if ( ref === undefined ) {
        return { text: readFileSync(resolve(REPO_ROOT, relativePath), "utf8"), origin: relativePath, };
    }

    const text = execFileSync("git", [ "show", `${ref}:${relativePath}`, ], {
        cwd: REPO_ROOT,
        encoding: "utf8",
    });

    return { text, origin: `${ref}:${relativePath}`, };
};

const codeSurfaceLineHeight = (source: string): string | undefined => {
    const block = /const codeSurface\s*=\s*\{([\s\S]*?)\n\};/.exec(source)?.[1];

    return block === undefined ? undefined : /lineHeight:\s*"([^"]+)"/.exec(block)?.[1];
};

const lineHeightToken = (source: string, token: string): string | undefined => {
    const pattern = new RegExp(`\\b${token}:\\s*\\{\\s*value:\\s*([0-9.]+)`);

    return pattern.exec(source)?.[1];
};

const ref = parseRef(process.argv.slice(2));
const landing = readSource(ref, LANDING_PATH);
const foundation = readSource(undefined, FOUNDATION_PATH);

const landingValue = codeSurfaceLineHeight(landing.text);
const snugValue = lineHeightToken(foundation.text, "snug");
const normalValue = lineHeightToken(foundation.text, "normal");

const checks: Check[] = [
    {
        label: `Landing codeSurface.lineHeight === "snug"`,
        ok: landingValue === "snug",
        detail: `origin=${landing.origin} value=${JSON.stringify(landingValue)}`,
    },
    {
        label: "foundation snug === 1.4",
        ok: snugValue === "1.4",
        detail: `value=${JSON.stringify(snugValue)}`,
    },
    {
        label: "foundation normal === 1.4",
        ok: normalValue === "1.4",
        detail: `value=${JSON.stringify(normalValue)}`,
    },
];

for ( const check of checks ) {
    console.log(`${check.ok ? "PASS" : "FAIL"} ${check.label} ${check.detail}`);
}

const passed = checks.filter((check) => check.ok).length;
const allOk = passed === checks.length;

console.log(`landing-snug: ref=${ref ?? "worktree"} ${passed}/${checks.length} passed`);

process.exit(allOk ? 0 : 1);
