import { readFile, } from "node:fs/promises";

import { create, } from "fontkit";
import { compress, } from "wawoff2";

import { FONT_FAMILY, } from "../constants";
import type { FontFaceSource, } from "./assets";

type FontVariationAxis = "opsz" | "wght";

export type ValidatedFontFace = {
    id: FontFaceSource["id"];
    family: typeof FONT_FAMILY;
    style: FontFaceSource["style"];
    weightRange: FontFaceSource["weightRange"];
    axes: readonly FontVariationAxis[];
    source: Buffer;
};

/** The variable axes every canonical Inter face must expose. */
const REQUIRED_AXES = [ "opsz", "wght", ] as const;

/** The only weight range this experiment ships. */
const EXPECTED_WEIGHT = { min: 100, max: 900, };

type ParsedAxis = { min: number; max: number; };

type ParsedFont = {
    familyName?: string;
    italicAngle?: number;
    variationAxes?: Record<string, ParsedAxis>;
};

const parse = (bytes: Buffer): ParsedFont => create(bytes) as unknown as ParsedFont;

/**
 * Axis tags present in a font, sorted for a deterministic contract.
 * Works for both raw TTF and generated WOFF2 bytes.
 */
export const readVariationAxes = (bytes: Buffer): readonly string[] =>
    Object.keys(parse(bytes).variationAxes ?? {}).sort();

/**
 * Applies the canonical Inter contract to an already-parsed font.
 * Shared by the source and the converted WOFF2 so both are held to the same
 * rules; the stage only shapes the diagnostics.
 */
const validateParsedFont = (
    font: ParsedFont,
    face: FontFaceSource,
    stage: "source" | "woff2",
): readonly FontVariationAxis[] => {
    const where = `font face "${face.id}" ${stage} at ${face.sourcePath}`;

    if ( font.familyName !== FONT_FAMILY ) {
        throw new Error(
            `${where}: expected family ${FONT_FAMILY}, got "${font.familyName}"`,
        );
    }

    const actualStyle = font.italicAngle === 0 ? "normal" : "italic";

    if ( actualStyle !== face.style ) {
        throw new Error(
            `${where}: expected style ${face.style}, got "${actualStyle}" (italicAngle ${font.italicAngle})`,
        );
    }

    const axes = font.variationAxes ?? {};
    const missing = REQUIRED_AXES.filter((axis) => axes[axis] === undefined);

    if ( missing.length > 0 ) {
        throw new Error(
            `${where}: expected variable axes opsz and wght, missing ${missing.join(", ")}`,
        );
    }

    const weight = axes["wght"]!;

    if ( weight.min !== EXPECTED_WEIGHT.min || weight.max !== EXPECTED_WEIGHT.max ) {
        throw new Error(
            `${where}: expected wght range ${EXPECTED_WEIGHT.min} ${EXPECTED_WEIGHT.max}, got ${weight.min} ${weight.max}`,
        );
    }

    return REQUIRED_AXES;
};

/**
 * Reads and validates one canonical variable Inter source.
 * The contract is strict on purpose: a wrong family, a static face or a
 * non-standard weight range is a failure to fix at source, never a warning.
 */
export const readAndValidateFace = async (face: FontFaceSource): Promise<ValidatedFontFace> => {
    const source = await readFile(face.sourcePath);
    const axes = validateParsedFont(parse(source), face, "source");

    return {
        id: face.id,
        family: FONT_FAMILY,
        style: face.style,
        weightRange: face.weightRange,
        axes,
        source,
    };
};

/**
 * Converts one canonical source to WOFF2 without writing anything.
 * The compressed bytes are parsed again and re-validated, so a conversion that
 * silently drops the `opsz` or `wght` axis fails instead of shipping.
 */
export const buildWoff2 = async (face: FontFaceSource): Promise<Buffer> => {
    const validated = await readAndValidateFace(face);
    const woff2 = Buffer.from(await compress(validated.source));

    if ( woff2.subarray(0, 4).toString("ascii") !== "wOF2" ) {
        throw new Error(`font face "${face.id}": conversion output is not a WOFF2 file`);
    }

    validateParsedFont(parse(woff2), face, "woff2");

    return woff2;
};
