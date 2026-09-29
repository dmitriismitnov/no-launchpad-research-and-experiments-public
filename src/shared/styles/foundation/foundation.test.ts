import { describe, expect, test, } from "bun:test";

import { contrastRatio, } from "@shared/utils";

import {
    OPACITY_STEPS,
    PALETTE_FAMILIES,
    PALETTE_STEPS,
    paletteValues,
    SEMANTIC_GROUPS,
    SEMANTIC_PROJECTIONS,
    semanticColors,
    staticPalette,
    themeConditions,
} from "./colors";
import { sizes, spacing, } from "./layout";
import { SCALE_STEP_REM, } from "./layout/scale";
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights, } from "./typography";

type Token = { value: string; };
type PaletteTokens = Record<string, Record<string, Token>>;
type ThemePair = { value: { _light: string; _dark: string; }; };
type SemanticContexts = Record<string, Record<string, Record<string, ThemePair>>>;

const paletteTokens = ( staticPalette as unknown as { palette: PaletteTokens; } ).palette;
const semanticContexts = ( semanticColors as unknown as { semantic: SemanticContexts; } ).semantic;

const themes = [ "_light", "_dark", ] as const;

const paletteHex = (family: string, step: string): string => {
    const value = ( paletteValues as Record<string, Record<number, string>> )[family]?.[
        Number(step)
    ];

    if ( value === undefined ) {
        throw new Error(`Unknown palette token: ${family}.${step}`);
    }

    return value;
};

const refHex = (reference: string): string => {
    const match = /^\{colors\.palette\.([a-z]+)\.(\d+)\}$/.exec(reference);

    if ( match === null ) {
        throw new Error(`Unknown palette reference: ${reference}`);
    }

    return paletteHex(match[1]!, match[2]!);
};

// Canonical same-step pairs that intentionally miss the threshold.
// Every entry needs a reason; empty means none.
const CONTRAST_EXCEPTIONS: Record<string, string> = {};

const contrastThreshold = (projection: string): number => projection === "text" ? 4.5 : 3;

describe("foundation", () => {
    test("spacing scale is regular: xN = N * step", () => {
        for ( const [ key, token, ] of Object.entries(spacing) ) {
            const index = Number(key.slice(1));
            const expected = Number(( index * SCALE_STEP_REM ).toFixed(3));

            expect(token).toEqual({ value: `${expected}rem`, });
        }
    });

    test("spacing and sizes share the same scale", () => {
        expect(Object.keys(spacing)).toEqual(Object.keys(sizes));
    });

    test("colors declares the theme axis", () => {
        expect(Object.keys(themeConditions)).toEqual([ "light", "dark", ]);
        expect(themeConditions.dark).toContain("[data-theme");
    });

    test("palette has the declared families, each with the full step set", () => {
        expect(Object.keys(paletteTokens)).toEqual([ ...PALETTE_FAMILIES, ]);

        for ( const family of PALETTE_FAMILIES ) {
            const steps = paletteTokens[family]!;
            expect(Object.keys(steps)).toEqual(PALETTE_STEPS.map(String));

            for ( const step of PALETTE_STEPS ) {
                expect(steps[`${step}`]!.value).toMatch(/^#[0-9A-F]{6}$/);
                expect(paletteValues[family][step]).toBe(steps[`${step}`]!.value);
            }
        }
    });

    test("opacity uses the approved technical steps as percents", () => {
        const expected: number[] = [ 0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, ];
        const actual: number[] = [ ...OPACITY_STEPS, ];
        expect(actual).toEqual(expected);
    });

    test("semantic context groups expose the full matrix", () => {
        expect(Object.keys(semanticContexts)).toEqual([ ...SEMANTIC_GROUPS, "shadow", ]);

        for ( const group of SEMANTIC_GROUPS ) {
            const steps = semanticContexts[group]!;
            expect(Object.keys(steps)).toEqual(PALETTE_STEPS.map(String));

            for ( const step of PALETTE_STEPS ) {
                const projections = steps[`${step}`]!;
                expect(Object.keys(projections)).toEqual([ "background", "text", "icon", "border", "divider", ]);

                for ( const projection of SEMANTIC_PROJECTIONS ) {
                    const pair = projections[projection]!;
                    expect(Object.keys(pair.value)).toEqual([ "_light", "_dark", ]);

                    for ( const theme of themes ) {
                        expect(refHex(pair.value[theme])).toMatch(/^#[0-9A-F]{6}$/);
                    }
                }
            }
        }
    });

    test("canonical same-step pairs satisfy the contrast thresholds", () => {
        const failures: string[] = [];
        const seenFailures = new Set<string>();

        for ( const group of SEMANTIC_GROUPS ) {
            for ( const step of PALETTE_STEPS ) {
                for ( const theme of themes ) {
                    const projections = semanticContexts[group]![`${step}`]!;
                    const background = refHex(projections["background"]!.value[theme]);

                    for ( const projection of [ "text", "icon", "border", ] as const ) {
                        const foreground = refHex(projections[projection]!.value[theme]);
                        const ratio = contrastRatio(foreground, background);
                        const key = `${group}.${step}.${projection}.${theme}`;

                        if ( ratio + 0.001 < contrastThreshold(projection) ) {
                            seenFailures.add(key);

                            if ( CONTRAST_EXCEPTIONS[key] === undefined ) {
                                failures.push(`${key} -> ${ratio.toFixed(2)}`);
                            }
                        }
                    }
                }
            }
        }

        expect(failures).toEqual([]);

        // An exception that no longer fails is stale and must be removed.
        for ( const key of Object.keys(CONTRAST_EXCEPTIONS) ) {
            expect(seenFailures.has(key)).toBe(true);
        }
    });

    test("divider is always quieter than border on the same background", () => {
        const failures: string[] = [];

        for ( const group of SEMANTIC_GROUPS ) {
            for ( const step of PALETTE_STEPS ) {
                for ( const theme of themes ) {
                    const projections = semanticContexts[group]![`${step}`]!;
                    const background = refHex(projections["background"]!.value[theme]);
                    const border = contrastRatio(refHex(projections["border"]!.value[theme]), background);
                    const divider = contrastRatio(refHex(projections["divider"]!.value[theme]), background);

                    if ( divider >= border ) {
                        failures.push(
                            `${group}.${step}.${theme} -> divider ${divider.toFixed(2)} >= border ${border.toFixed(2)}`,
                        );
                    }
                }
            }
        }

        expect(failures).toEqual([]);
    });
});

describe("typography foundation", () => {
    test("exposes one atomic font family", () => {
        expect(fonts).toEqual({ body: { value: "Inter, system-ui, sans-serif", }, });
    });

    test("exposes the atomic size scale", () => {
        expect(fontSizes).toEqual({
            xs: { value: "0.75rem", },
            sm: { value: "0.875rem", },
            md: { value: "1rem", },
            lg: { value: "1.25rem", },
            xl: { value: "1.5rem", },
        });
    });

    test("exposes the atomic weight scale", () => {
        expect(fontWeights).toEqual({
            regular: { value: 400, },
            medium: { value: 500, },
            semibold: { value: 600, },
            bold: { value: 700, },
        });
    });

    test("exposes the atomic line-height scale", () => {
        expect(lineHeights).toEqual({
            tight: { value: 1.2, },
            normal: { value: 1.5, },
            relaxed: { value: 1.75, },
        });
    });

    test("exposes the atomic letter-spacing scale", () => {
        expect(letterSpacings).toEqual({
            tight: { value: "-0.01em", },
            normal: { value: "0", },
            wide: { value: "0.02em", },
        });
    });

    test("keeps typography token names free of component and CSS-property roles", () => {
        const forbidden = [ "button", "label", "heading", "root", "fontsize", "lineheight", ];
        const names = [
            ...Object.keys(fonts),
            ...Object.keys(fontSizes),
            ...Object.keys(fontWeights),
            ...Object.keys(lineHeights),
            ...Object.keys(letterSpacings),
        ];

        for ( const name of names ) {
            for ( const word of forbidden ) {
                expect(name.toLowerCase()).not.toContain(word);
            }
        }
    });
});
