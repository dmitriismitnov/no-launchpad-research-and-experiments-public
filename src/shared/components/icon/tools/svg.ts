/**
 * Canonical icon SVG contract.
 *
 * The pipeline has two explicit steps and never hides a fix:
 * - `normalizeSvg` turns a raw export into the canonical form and is expected to
 *   be run before validation; it only removes known export noise and colour
 *   literals.
 * - `validateSvg` then enforces the strict contract. Anything it rejects is a
 *   real problem the author has to resolve, not something to paper over.
 *
 * Canonical form: a single root `<svg>` with `xmlns` and `viewBox`, no
 * provenance or presentation attributes, and monochrome fill-based geometry
 * (`fill="currentColor"`). Stroke-based geometry is rejected: an icon font
 * renders fills, so outline geometry must be flattened to filled paths first.
 */

export const ICON_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const ALLOWED_ELEMENTS = new Set([
    "svg",
    "g",
    "path",
    "circle",
    "ellipse",
    "rect",
    "line",
    "polyline",
    "polygon",
]);

const ALLOWED_ATTRIBUTES = new Set([
    "xmlns",
    "viewBox",
    "fill",
    "fill-rule",
    "clip-rule",
    "d",
    "points",
    "cx",
    "cy",
    "r",
    "rx",
    "ry",
    "x",
    "y",
    "width",
    "height",
    "x1",
    "y1",
    "x2",
    "y2",
    "transform",
    "opacity",
]);

const DRAWING_ELEMENTS = new Set([ "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", ]);

/** Attributes removed from raw exports because they carry no geometry. */
const REMOVED_ATTRIBUTES = [ "style", "class", "id", "preserveAspectRatio", ];

const ROOT_ONLY_REMOVALS = [ "width", "height", ];

const TAG_PATTERN = /<[^>]+>/g;
const ATTRIBUTE_PATTERN = /([\w:-]+)\s*=\s*"([^"]*)"/g;

export const isValidIconName = (name: string): boolean => ICON_NAME_PATTERN.test(name);

/**
 * Collapses insignificant whitespace inside a single tag while preserving the
 * contents of quoted attribute values.
 */
const collapseTagWhitespace = (tag: string): string => {
    let result = "";
    let quote: string | null = null;
    let pendingSpace = false;

    for ( const char of tag ) {
        if ( quote !== null ) {
            result += char;

            if ( char === quote ) {
                quote = null;
            }

            continue;
        }

        if ( char === `"` || char === `'` ) {
            if ( pendingSpace && result.length > 1 ) {
                result += " ";
            }

            pendingSpace = false;
            quote = char;
            result += char;
            continue;
        }

        if ( /\s/.test(char) ) {
            pendingSpace = true;
            continue;
        }

        if ( pendingSpace && result.length > 1 ) {
            result += " ";
        }

        pendingSpace = false;
        result += char;
    }

    return result.replace(/\s+\/?>$/, ">");
};

const normalizeColorValue = (value: string): string => {
    const trimmed = value.trim();

    if ( trimmed === "none" || trimmed === "currentColor" ) {
        return trimmed;
    }

    return "currentColor";
};

const compareAttributeNames = (a: string, b: string): number => {
    const aIsNamespace = a === "xmlns" || a.startsWith("xmlns:");
    const bIsNamespace = b === "xmlns" || b.startsWith("xmlns:");

    if ( aIsNamespace !== bIsNamespace ) {
        return aIsNamespace ? -1 : 1;
    }

    return a < b ? -1 : a > b ? 1 : 0;
};

const normalizeAttributes = (
    attributes: { name: string; value: string; }[],
    isRoot: boolean,
): { name: string; value: string; }[] =>
    attributes
        .filter((attribute) => {
            if ( attribute.name.startsWith("data-") ) {
                return false;
            }

            if ( REMOVED_ATTRIBUTES.includes(attribute.name) ) {
                return false;
            }

            if ( isRoot && ROOT_ONLY_REMOVALS.includes(attribute.name) ) {
                return false;
            }

            return true;
        })
        .map((attribute) =>
            attribute.name === "fill" || attribute.name === "stroke"
                ? { name: attribute.name, value: normalizeColorValue(attribute.value), }
                : attribute
        )
        .sort((a, b) => compareAttributeNames(a.name, b.name));

const normalizeTag = (tag: string): string => {
    const collapsed = collapseTagWhitespace(tag);
    const match = collapsed.match(/^<(\/?)([\w:-]+)([\s\S]*?)(\/?)>$/);

    if ( match === null ) {
        return collapsed;
    }

    const [ , closing, name = "", , selfClosing, ] = match;

    if ( closing === "/" ) {
        return `</${name}>`;
    }

    const attributes = normalizeAttributes(collectAttributes(collapsed), name === "svg");
    const serialized = attributes
        .map((attribute) => `${attribute.name}="${attribute.value}"`)
        .join(" ");

    if ( serialized === "" ) {
        return selfClosing === "/" ? `<${name}/>` : `<${name}>`;
    }

    return `<${name} ${serialized}${selfClosing === "/" ? "/" : ""}>`;
};

/**
 * Turns a raw SVG export into the canonical form.
 * Idempotent: normalizing an already canonical SVG returns the same string.
 */
export const normalizeSvg = (source: string): string => {
    const withoutComments = source
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<\?[\s\S]*?\?>/g, "")
        .replace(/<!DOCTYPE[^>]*>/gi, "")
        .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/gi, "");

    const withNormalizedTags = withoutComments.replace(TAG_PATTERN, normalizeTag);

    return withNormalizedTags
        .replace(/<([\w:-]+)([^>]*[^/])><\/\1>/g, "<$1$2/>")
        .replace(/>\s+</g, "><")
        .trim();
};

const collectAttributes = (tag: string): { name: string; value: string; }[] => {
    const attributes: { name: string; value: string; }[] = [];
    const inner = tag.replace(/^<\/?[\w:-]+/, "").replace(/\/?>$/, "");
    let match: RegExpExecArray | null;

    ATTRIBUTE_PATTERN.lastIndex = 0;
    while ( ( match = ATTRIBUTE_PATTERN.exec(inner) ) !== null ) {
        attributes.push({ name: match[1] ?? "", value: match[2] ?? "", });
    }

    return attributes;
};

/**
 * Enforces the canonical contract and returns human-readable issues.
 * An empty array means the SVG is valid.
 */
export const validateSvg = (svg: string): string[] => {
    const issues: string[] = [];
    const tags = svg.match(TAG_PATTERN) ?? [];

    const rootOpens = tags.filter((tag) => /^<svg\b/.test(tag));

    if ( rootOpens.length !== 1 ) {
        issues.push(`expected exactly one root <svg>, found ${rootOpens.length}`);
    }

    const rootViewBox = rootOpens[0]?.match(/\bviewBox\s*=\s*"([^"]*)"/)?.[1];

    if ( rootViewBox === undefined ) {
        issues.push("root <svg> must declare a viewBox");
    } else {
        const numbers = rootViewBox.trim().split(/[\s,]+/);
        const isValid = numbers.length === 4
            && numbers.every((value) => Number.isFinite(Number(value)));

        if ( !isValid ) {
            issues.push(`root viewBox must be four finite numbers, got "${rootViewBox}"`);
        }
    }

    let drawingElements = 0;

    for ( const tag of tags ) {
        const name = tag.match(/^<\/?([\w:-]+)/)?.[1];

        if ( name === undefined ) {
            continue;
        }

        if ( !ALLOWED_ELEMENTS.has(name) ) {
            issues.push(`element <${name}> is not allowed`);
            continue;
        }

        if ( DRAWING_ELEMENTS.has(name) ) {
            drawingElements += 1;
        }

        for ( const attribute of collectAttributes(tag) ) {
            if ( attribute.name.startsWith("data-") ) {
                issues.push(`<${name}> carries provenance attribute "${attribute.name}"; run normalize`);
                continue;
            }

            if ( !ALLOWED_ATTRIBUTES.has(attribute.name) ) {
                issues.push(`<${name}> attribute "${attribute.name}" is not allowed`);
            }

            if ( attribute.name.startsWith("stroke") ) {
                issues.push(`<${name}> uses stroke-based geometry; flatten it to filled paths`);
            }

            if ( attribute.name === "fill" ) {
                const value = attribute.value.trim();

                if ( value !== "currentColor" && value !== "none" ) {
                    issues.push(`<${name}> fill "${value}" must be "currentColor" or "none"; run normalize`);
                }
            }

            if ( attribute.name !== "xmlns" && /url\(|https?:|javascript:/i.test(attribute.value) ) {
                issues.push(`<${name}> attribute "${attribute.name}" references external content`);
            }
        }
    }

    if ( drawingElements === 0 ) {
        issues.push("svg has no drawing elements");
    }

    return issues;
};
