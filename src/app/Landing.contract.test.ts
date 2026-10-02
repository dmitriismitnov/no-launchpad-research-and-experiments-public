import { describe, expect, test, } from "bun:test";
import { readFileSync, } from "node:fs";

import { lineHeights, } from "@shared/styles/foundation/typography";

const landingSource = readFileSync(new URL("./Landing.tsx", import.meta.url), "utf8");

const codeSurfaceLineHeight = (): string | undefined => {
    const block = /const codeSurface\s*=\s*\{([\s\S]*?)\n\};/.exec(landingSource)?.[1];

    return block === undefined ? undefined : /lineHeight:\s*"([^"]+)"/.exec(block)?.[1];
};

describe("landing code-surface contract", () => {
    // Guards the Batch A correction: `3c8f9a1` moved `codeSurface.lineHeight`
    // from the legacy `snug` alias to `normal` and refreshed the visual
    // baselines; the corrected Landing keeps `snug`, which resolves to the same
    // Pen `normal` step (1.4). `scripts/assert-landing-snug.ts --ref 3c8f9a1`
    // is the reproducible RED for the historical state.
    test("Landing codeSurface keeps the legacy snug alias", () => {
        expect(codeSurfaceLineHeight()).toBe("snug");
    });

    test("foundation keeps snug and normal at the Pen 1.4 step", () => {
        expect(lineHeights.snug).toEqual({ value: 1.4, });
        expect(lineHeights.normal).toEqual({ value: 1.4, });
    });
});
