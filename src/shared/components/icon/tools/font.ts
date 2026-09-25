import { Readable, } from "node:stream";

import svg2ttf from "svg2ttf";
import { SVGIcons2SVGFontStream, type SVGIconStream, } from "svgicons2svgfont";
import { compress, } from "wawoff2";

import { ICON_FONT_FAMILY, } from "../constants";

export type IconGlyph = {
    name: string;
    svg: string;
    codepoint: number;
};

const FONT_HEIGHT = 1000;

/**
 * Fixed creation timestamp. Without it `svg2ttf` stamps the current time and
 * the build stops being reproducible.
 */
const FIXED_TIMESTAMP = 0;

const buildSvgFont = (glyphs: readonly IconGlyph[]): Promise<string> =>
    new Promise((resolve, reject) => {
        const stream = new SVGIcons2SVGFontStream({
            fontName: ICON_FONT_FAMILY,
            fontId: ICON_FONT_FAMILY,
            normalize: true,
            fontHeight: FONT_HEIGHT,
            centerHorizontally: true,
        });

        const chunks: Buffer[] = [];

        stream.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        stream.on("error", reject);

        for ( const glyph of glyphs ) {
            const readable = Readable.from([ glyph.svg, ]) as unknown as SVGIconStream;
            readable.metadata = {
                name: glyph.name,
                unicode: [ String.fromCodePoint(glyph.codepoint), ],
            };
            stream.write(readable);
        }

        stream.end();
    });

/**
 * Builds a WOFF2 icon font from glyphs.
 * Deterministic: identical glyphs produce identical bytes.
 */
export const buildIconFont = async (
    glyphs: readonly IconGlyph[],
): Promise<Buffer> => {
    const svgFont = await buildSvgFont(glyphs);
    const ttf = Buffer.from(svg2ttf(svgFont, { ts: FIXED_TIMESTAMP, }).buffer);
    const woff2 = await compress(ttf);

    return Buffer.from(woff2);
};
