/**
 * Fresh read-only Pen evidence for the landing visual-parity cycle.
 *
 * Source of truth: the active Pencil document
 * `outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen`.
 * Read with the Pencil MCP `Get(..., { resolveVariables: true })` visitor and
 * `Export` only; the document was never mutated by this capture.
 *
 * Artifact identity:
 * - capturedAt: 2026-10-02T22:21:57Z
 * - sha256: 45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa
 * - sizeBytes: 9294654
 *
 * Landing frames (single-theme; no `theme` property):
 * - desktop `DsHK8` "10 Landing — desktop" (1440 wide)
 * - tablet  `XiPDu` "11 Landing — tablet"  (768 wide)
 * - mobile  `T4klu9` "12 Landing — mobile" (390 wide)
 *
 * Dark Pen landing frames do not exist in this document. The three landing
 * frames carry no `theme` property; the `… — Dark` roots elsewhere in the
 * document belong to the theme-comparison/library frames, not to the landing
 * screen. Dark is exercised in code through `data-theme` only.
 *
 * This module is the single evidence input for
 * `test/visual/landing-responsive.spec.ts`; the test reads its acceptance
 * geometry from here and never hardcodes Pen facts inline.
 */

export type LandingViewportName = "desktop" | "tablet" | "mobile";

export type PenButtonEvidence = {
    id: string;
    label: string;
    width: number;
    height: number;
    y: number;
};

export type PenHeroActionsEvidence = {
    frameId: string;
    name: string;
    width: number;
    height: number;
    gap: number;
    layout: "vertical" | "horizontal";
    buttons: readonly [ PenButtonEvidence, PenButtonEvidence, ];
};

export type PenFeatureAnatomyEvidence = {
    paddingBlock: number;
    paddingInline: number;
    gap: number;
    visualHeight: number;
    /** Pen keeps the bullet list and the secondary action on desktop only. */
    retainsBullets: boolean;
    retainsAction: boolean;
    title: { fontFamily: string; fontSize: number; fontWeight: number; lineHeight: number; fill: string; };
    description: { fontFamily: string; fontSize: number; lineHeight: number; fill: string; };
};

export type PenLandingFrameEvidence = {
    frameId: string;
    frameName: string;
    width: number;
    featureIds: readonly string[];
};

export const PEN_EVIDENCE = {
    source: {
        path: "outputs/experiments/pencil-opencode-workflow/artifacts/ex_2.pen",
        sha256: "45916e357faed0c64fffb9a7eba7ca898da7f63c8a1f4a3bdde7874217daf7fa",
        capturedAt: "2026-10-02T22:21:57Z",
        sizeBytes: 9294654,
    },

    frames: {
        desktop: {
            frameId: "DsHK8",
            frameName: "10 Landing — desktop",
            width: 1440,
            featureIds: [ "M2zLU", "v9iF0", "V7lQbB", ],
        },
        tablet: {
            frameId: "XiPDu",
            frameName: "11 Landing — tablet",
            width: 768,
            featureIds: [ "vzXfY", "tVuSG", "m6tsN3", ],
        },
        mobile: {
            frameId: "T4klu9",
            frameName: "12 Landing — mobile",
            width: 390,
            featureIds: [ "pRsS2", "oLr23", "qGeM3", ],
        },
    } satisfies Record<LandingViewportName, PenLandingFrameEvidence>,

    /**
     * Hero action group. The mobile frame names the group `CTA` (`P6A8Xm`) even
     * though it holds the hero actions; desktop `bambL` and tablet `L1Xf4m` are
     * the horizontal counterparts. Pen stacks the mobile buttons full width.
     */
    heroActions: {
        desktop: {
            frameId: "bambL",
            name: "CTA",
            width: 392,
            height: 48,
            gap: 12,
            layout: "horizontal",
            buttons: [
                { id: "xVDkZ", label: "Get the tokens", width: 179, height: 48, y: 0, },
                { id: "WA9Ty", label: "Explore components", width: 201, height: 48, y: 0, },
            ],
        },
        tablet: {
            frameId: "L1Xf4m",
            name: "CTA",
            width: 392,
            height: 48,
            gap: 12,
            layout: "horizontal",
            buttons: [
                { id: "fMEoc", label: "Get the tokens", width: 179, height: 48, y: 0, },
                { id: "A4jcn", label: "Explore components", width: 201, height: 48, y: 0, },
            ],
        },
        mobile: {
            frameId: "P6A8Xm",
            name: "CTA",
            width: 350,
            height: 108,
            gap: 12,
            layout: "vertical",
            buttons: [
                { id: "gPvdL", label: "Get the tokens", width: 350, height: 48, y: 0, },
                { id: "Up935", label: "Explore components", width: 350, height: 48, y: 60, },
            ],
        },
    } satisfies Record<LandingViewportName, PenHeroActionsEvidence>,

    /**
     * Feature-section anatomy. Desktop `M2zLU` keeps `Bullets` (`LjRvF`) and the
     * secondary action (`Df1Dk`); tablet `vzXfY` and mobile `pRsS2` drop both and
     * keep only Tag / H2 / P / Visual.
     */
    featureAnatomy: {
        desktop: {
            paddingBlock: 64,
            paddingInline: 64,
            gap: 72,
            visualHeight: 380,
            retainsBullets: true,
            retainsAction: true,
            title: { fontFamily: "Inter", fontSize: 40, fontWeight: 700, lineHeight: 1.15, fill: "#0F172A", },
            description: { fontFamily: "Inter", fontSize: 16, lineHeight: 1.6, fill: "#334155", },
        },
        tablet: {
            paddingBlock: 48,
            paddingInline: 32,
            gap: 32,
            visualHeight: 300,
            retainsBullets: false,
            retainsAction: false,
            title: { fontFamily: "Inter", fontSize: 32, fontWeight: 700, lineHeight: 1.15, fill: "#0F172A", },
            description: { fontFamily: "Inter", fontSize: 16, lineHeight: 1.6, fill: "#334155", },
        },
        mobile: {
            paddingBlock: 36,
            paddingInline: 20,
            gap: 16,
            visualHeight: 260,
            retainsBullets: false,
            retainsAction: false,
            title: { fontFamily: "Inter", fontSize: 24, fontWeight: 700, lineHeight: 1.15, fill: "#0F172A", },
            description: { fontFamily: "Inter", fontSize: 14, lineHeight: 1.6, fill: "#334155", },
        },
    } satisfies Record<LandingViewportName, PenFeatureAnatomyEvidence>,

    /** Exported Pen frame renders and the code screenshots captured from them. */
    artifacts: {
        penDir: "outputs/experiments/pencil-opencode-workflow/artifacts/landing-parity/pen",
        codeDir: "outputs/experiments/pencil-opencode-workflow/artifacts/landing-parity/code",
        pen: {
            desktop: "landing-desktop-DsHK8.png",
            tablet: "landing-tablet-XiPDu.png",
            mobile: "landing-mobile-T4klu9.png",
        },
    },
} as const;
