import { describe, expect, test, } from "bun:test";

import { PALETTE_STEPS, roles, staticPalette, themeConditions, } from "./colors";
import { sizes, spacing, } from "./layout";
import { SCALE_STEP_REM, } from "./layout/scale";

type Token = { value: string; };
type Palette = Record<string, Record<string, Token> | Token>;

const palette = staticPalette as Palette;

const paletteValue = (path: string): string => {
    const [ family, step, ] = path.split(".");
    const token = ( palette[family!] as Record<string, Token> | undefined )?.[step!];

    if ( token === undefined ) {
        throw new Error(`Unknown palette token: ${path}`);
    }

    return token.value;
};

const roleEntries = Object.entries(roles).flatMap(([ group, groupRoles, ]) =>
    Object.entries(groupRoles as Record<string, { light: Token; dark: Token; }>).map(
        ([ name, pair, ]) => ( { path: `${group}.${name}`, pair, } ),
    )
);

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

    test("static palette families share the full step set", () => {
        expect(Object.keys(staticPalette)).toEqual([ "neutral", "brand", "danger", ]);

        for ( const steps of Object.values(staticPalette) ) {
            expect(Object.keys(steps)).toEqual(PALETTE_STEPS.map(String));
            for ( const token of Object.values(steps) ) {
                expect(token.value).toMatch(/^#[0-9A-F]{6}$/);
            }
        }
    });

    test("roles reference palette tokens and keep both theme branches", () => {
        expect(roleEntries.length).toBeGreaterThan(0);

        for ( const { pair, } of roleEntries ) {
            expect(Object.keys(pair)).toEqual([ "light", "dark", ]);

            for ( const branch of [ "light", "dark", ] as const ) {
                const match = /^\{colors\.([a-z]+)\.(\d+)\}$/.exec(pair[branch].value);
                expect(match).not.toBeNull();
                expect(paletteValue(`${match![1]}.${match![2]}`)).toMatch(/^#[0-9A-F]{6}$/);
            }
        }
    });

    test("roles preserve the existing visual values", () => {
        const anchors: Record<string, { light: string; dark: string; }> = {
            "surface.base": { light: "#FFFFFF", dark: "#0D1016", },
            "surface.raised": { light: "#F7F8FA", dark: "#151A22", },
            "ink.strong": { light: "#1A1A1A", dark: "#F3F5F8", },
            "ink.soft": { light: "#666666", dark: "#A8B0BB", },
            "line.strong": { light: "#1A1A1A", dark: "#4A5462", },
            "line.soft": { light: "#EDEFF2", dark: "#212831", },
            "accent.base": { light: "#4A9FD8", dark: "#5AB0EA", },
            "accent.deep": { light: "#1B5FA8", dark: "#1E6BB8", },
            "status.danger": { light: "#C0392B", dark: "#F87171", },
        };

        for ( const { path, pair, } of roleEntries ) {
            const expected = anchors[path];
            expect(expected).toBeDefined();

            for ( const branch of [ "light", "dark", ] as const ) {
                const match = /^\{colors\.([a-z]+)\.(\d+)\}$/.exec(pair[branch].value);
                expect(paletteValue(`${match![1]}.${match![2]}`)).toBe(expected![branch]);
            }
        }
    });
});
