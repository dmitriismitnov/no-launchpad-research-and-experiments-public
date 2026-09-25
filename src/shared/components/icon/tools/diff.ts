import type { IconCodepoints, } from "./manifest";

export type IconSource = {
    name: string;
    svg: string;
};

export type SetDiff = {
    added: string[];
    changed: string[];
    unchanged: string[];
    removed: string[];
    renames: { from: string; to: string; }[];
};

/**
 * Compares a proposed icon set against the committed state.
 *
 * Every list is sorted, and the comparison is by normalized SVG content, so it
 * does not depend on whitespace or attribute order.
 */
export const classifyChanges = (
    proposed: readonly IconSource[],
    current: IconCodepoints,
    canonical: Readonly<Record<string, string>>,
): SetDiff => {
    const proposedByName = new Map(proposed.map((icon) => [ icon.name, icon.svg, ]));
    const added: string[] = [];
    const changed: string[] = [];
    const unchanged: string[] = [];

    for ( const name of [ ...proposedByName.keys(), ].sort() ) {
        if ( current[name] === undefined ) {
            added.push(name);
            continue;
        }

        if ( canonical[name] === proposedByName.get(name) ) {
            unchanged.push(name);
        } else {
            changed.push(name);
        }
    }

    const removed = Object.keys(current)
        .filter((name) => !proposedByName.has(name))
        .sort();

    // A rename is a removal whose glyph reappears under a new key. This is a
    // hint for the human, never an automatic action.
    const renames: { from: string; to: string; }[] = [];
    const renamed = new Set<string>();

    for ( const from of removed ) {
        const to = added.find(
            (candidate) => !renamed.has(candidate) && proposedByName.get(candidate) === canonical[from],
        );

        if ( to !== undefined ) {
            renames.push({ from, to, });
            renamed.add(to);
        }
    }

    return { added, changed, unchanged, removed, renames, };
};

type StaticUsage = {
    key: string;
    file: string;
    line: number;
};

export type UsageScan = {
    static: StaticUsage[];
    dynamic: { file: string; line: number; }[];
};

// Naive on purpose: it reads one JSX opening tag. An attribute value containing
// a literal `>` (for example, a comparison inside an expression) is out of
// scope for icon `name` props.
const ICON_ELEMENT = /<Icon\b([^>]*)>/g;

const staticNamePatterns = [
    /\bname\s*=\s*"([^"]+)"/,
    /\bname\s*=\s*\{\s*["']([^"']+)["']\s*\}/,
];

/**
 * Finds `<Icon name="…">` usages. Literal names are migratable; anything else
 * is reported as dynamic and must be handled by hand.
 */
export const scanIconUsages = (
    files: readonly { path: string; content: string; }[],
): UsageScan => {
    const staticUsages: StaticUsage[] = [];
    const dynamic: { file: string; line: number; }[] = [];

    for ( const file of files ) {
        ICON_ELEMENT.lastIndex = 0;

        let match: RegExpExecArray | null;
        while ( ( match = ICON_ELEMENT.exec(file.content) ) !== null ) {
            const attributes = match[1] ?? "";
            const line = file.content.slice(0, match.index).split("\n").length;
            let key: string | undefined;

            for ( const pattern of staticNamePatterns ) {
                key = attributes.match(pattern)?.[1];

                if ( key !== undefined ) {
                    break;
                }
            }

            if ( key === undefined ) {
                dynamic.push({ file: file.path, line, });
            } else {
                staticUsages.push({ key, file: file.path, line, });
            }
        }
    }

    return { static: staticUsages, dynamic, };
};

/** Rewrites static `<Icon name="old">` usages to the new key. */
export const migrateUsages = (
    content: string,
    from: string,
    to: string,
): { content: string; count: number; } => {
    const pattern = new RegExp(
        `(<Icon\\b[^>]*\\bname\\s*=\\s*)(?:"${from}"|\\{\\s*["']${from}["']\\s*\\})`,
        "g",
    );

    let count = 0;
    const migrated = content.replace(pattern, (_match, prefix: string) => {
        count += 1;

        return `${prefix}"${to}"`;
    });

    return { content: migrated, count, };
};
