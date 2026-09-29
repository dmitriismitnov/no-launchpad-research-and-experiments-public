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
    sourcePath: string;
    outputPath: string;
    source: Buffer;
};

/** The variable axes every canonical Inter face must expose. */
const REQUIRED_AXES = [ "opsz", "wght", ] as const;

/** The only weight range this experiment ships. */
const EXPECTED_WEIGHT = { min: 100, max: 900, };

type ParsedAxis = { min: number; max: number; };

/** The subset of a parsed font the canonical contract inspects. */
export type ParsedFontDescriptor = {
    familyName?: string;
    italicAngle?: number;
    variationAxes?: Record<string, ParsedAxis>;
};

/** The face identity a diagnostic needs, without the file paths. */
export type CanonicalFaceIdentity = Pick<FontFaceSource, "id" | "style">;

/** Where a validation ran, so a diagnostic can name the right artifact. */
export type FontValidationLocation = {
    stage: "source" | "generated WOFF2";
    path: string;
};

const parse = (bytes: Buffer): ParsedFontDescriptor => create(bytes) as unknown as ParsedFontDescriptor;

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
 *
 * Exported so every rule is testable from a plain descriptor: the weight-range
 * rule cannot be produced by a generated fixture.
 */
export const assertCanonicalFont = (
    font: ParsedFontDescriptor,
    face: CanonicalFaceIdentity,
    location: FontValidationLocation,
): readonly FontVariationAxis[] => {
    const where = `font face "${face.id}" ${location.stage} at ${location.path}`;

    if ( font.familyName !== FONT_FAMILY ) {
        throw new Error(
            `${where}: expected family ${FONT_FAMILY}, got "${font.familyName}"`,
        );
    }

    if ( font.italicAngle === undefined ) {
        throw new Error(`${where}: missing italicAngle needed to validate style`);
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
    const axes = assertCanonicalFont(
        parse(source),
        face,
        { stage: "source", path: face.sourcePath, },
    );

    return {
        id: face.id,
        family: FONT_FAMILY,
        style: face.style,
        weightRange: face.weightRange,
        axes,
        sourcePath: face.sourcePath,
        outputPath: face.outputPath,
        source,
    };
};

/**
 * Converts one canonical source to WOFF2 without writing anything.
 * The compressed bytes are parsed again and re-validated, so a conversion that
 * silently drops the `opsz` or `wght` axis fails instead of shipping.
 */
export const buildWoff2 = async (face: ValidatedFontFace): Promise<Buffer> => {
    const woff2 = Buffer.from(await compress(face.source));

    if ( woff2.subarray(0, 4).toString("ascii") !== "wOF2" ) {
        throw new Error(`font face "${face.id}": conversion output is not a WOFF2 file`);
    }

    assertCanonicalFont(
        parse(woff2),
        face,
        { stage: "generated WOFF2", path: face.outputPath, },
    );

    return woff2;
};
