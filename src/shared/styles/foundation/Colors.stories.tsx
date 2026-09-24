import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { css, } from "@shared/styled-system/css";
import { contrastRatio, } from "@shared/utils";

import {
    OPACITY_STEPS,
    PALETTE_FAMILIES,
    PALETTE_STEPS,
    paletteValues,
    SEMANTIC_GROUPS,
    SEMANTIC_SHADOW_STEPS,
    semanticColors,
} from "./colors";

type Theme = "light" | "dark";
type ThemePair = { value: { _light: string; _dark: string; }; };
type SemanticContexts = Record<string, Record<string, Record<string, ThemePair>>>;

const semanticContexts = ( semanticColors as unknown as { semantic: SemanticContexts; } ).semantic;

const paletteHex = (family: string, step: string): string =>
    ( paletteValues as Record<string, Record<number, string>> )[family]![Number(step)]!;

const refHex = (reference: string): string => {
    const match = /^\{colors\.palette\.([a-z]+)\.(\d+)\}$/.exec(reference);

    return match === null ? reference : paletteHex(match[1]!, match[2]!);
};

const themeKey = (theme: Theme): "_light" | "_dark" => theme === "light" ? "_light" : "_dark";

// Gallery-only label size. The foundation has no generic UI text size yet.
const GALLERY_LABEL_SIZE = "0.9375rem";

const shell = css({
    display: "grid",
    gap: "x12",
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const block = css({ display: "grid", gap: "x6", });

const title = css({ fontSize: "heading", fontWeight: "semibold", });

const subtitle = css({ fontSize: GALLERY_LABEL_SIZE, opacity: 0.7, });

const row = css({
    display: "grid",
    gridTemplateColumns: "{sizes.x25} {sizes.x16} 1fr",
    alignItems: "center",
    gap: "x4",
});

const swatch = css({
    width: "x16",
    height: "x16",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.common.300.background",
    borderRadius: "sm",
});

const label = css({ fontSize: GALLERY_LABEL_SIZE, opacity: 0.8, });

const mono = css({
    fontFamily: "body",
    fontSize: GALLERY_LABEL_SIZE,
    opacity: 0.6,
});

const semanticTable = css({
    display: "grid",
    gap: "x2",
});

const semanticRow = css({
    display: "grid",
    gridTemplateColumns: "{sizes.x25} {sizes.x16} 1fr {sizes.x16} {sizes.x16} {sizes.x16} 1fr",
    alignItems: "center",
    gap: "x3",
});

const swatchCell = (background: string) => <span className={swatch} style={{ backgroundColor: background, }} />;

const textPreview = (background: string, color: string) => (
    <span
        className={label}
        style={{ backgroundColor: background, color, padding: "0.125rem 0.25rem", }}
    >
        Aa
    </span>
);

const PaletteSection = () => (
    <div className={block}>
        <h2 className={title}>Primitive palette</h2>
        <span className={subtitle}>Opaque, theme-independent. `.500` is the pivot.</span>
        {PALETTE_FAMILIES.map((family) => (
            <div key={family} className={block}>
                <span className={label}>{family}</span>
                {PALETTE_STEPS.map((step) => {
                    const value = paletteValues[family][step]!;

                    return (
                        <div key={step} className={row}>
                            <span className={label}>{step}</span>
                            <span className={swatch} style={{ backgroundColor: value, }} />
                            <span className={mono}>{value}</span>
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

const OpacitySection = () => (
    <div className={block}>
        <h2 className={title}>Opacity</h2>
        <span className={subtitle}>Technical scale, percent opacity.</span>
        <div className={row}>
            {OPACITY_STEPS.map((step) => (
                <span
                    key={step}
                    className={swatch}
                    style={{ backgroundColor: `rgba(0, 0, 0, ${step / 100})`, }}
                    title={`${step}%`}
                />
            ))}
        </div>
    </div>
);

const CanonicalRow = (
    { group, step, theme, }: { group: string; step: number; theme: Theme; },
) => {
    const projections = semanticContexts[group]![`${step}`]!;
    const key = themeKey(theme);
    const background = refHex(projections["background"]!.value[key]);
    const text = refHex(projections["text"]!.value[key]);
    const icon = refHex(projections["icon"]!.value[key]);
    const border = refHex(projections["border"]!.value[key]);
    const divider = refHex(projections["divider"]!.value[key]);

    return (
        <div className={semanticRow}>
            <span className={label}>{step}</span>
            {swatchCell(background)}
            {textPreview(background, text)}
            {swatchCell(icon)}
            {swatchCell(border)}
            {swatchCell(divider)}
            <span className={mono}>
                t {contrastRatio(text, background).toFixed(2)} · i {contrastRatio(icon, background).toFixed(2)} · b{" "}
                {contrastRatio(border, background).toFixed(2)} · d {contrastRatio(divider, background).toFixed(2)}
            </span>
        </div>
    );
};

const DiagnosticMatrix = ({ group, theme, }: { group: string; theme: Theme; }) => {
    const steps = semanticContexts[group]!;
    const key = themeKey(theme);

    return (
        <div className={block}>
            <span className={label}>{group}: mixed-step diagnostic (text × background)</span>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${PALETTE_STEPS.length}, 20px)`,
                    gap: "2px",
                }}
            >
                {PALETTE_STEPS.map((textStep) =>
                    PALETTE_STEPS.map((backgroundStep) => {
                        const text = refHex(steps[`${textStep}`]!["text"]!.value[key]);
                        const background = refHex(steps[`${backgroundStep}`]!["background"]!.value[key]);
                        const ratio = contrastRatio(text, background);

                        return (
                            <span
                                key={`${textStep}-${backgroundStep}`}
                                title={`text ${textStep} / bg ${backgroundStep} · ${ratio.toFixed(2)}`}
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: background,
                                    color: text,
                                    fontSize: "10px",
                                    lineHeight: "20px",
                                    textAlign: "center",
                                }}
                            >
                                A
                            </span>
                        );
                    })
                )}
            </div>
        </div>
    );
};

const SemanticSection = ({ theme, }: { theme: Theme; }) => (
    <div className={block}>
        <h2 className={title}>Semantic contexts</h2>
        <span className={subtitle}>
            Canonical same-step sets. Ratios: text, icon, border, divider vs background. Divider stays quieter than
            border. Solid swatches for icon, border and divider.
        </span>
        {SEMANTIC_GROUPS.map((group) => (
            <div key={group} className={semanticTable}>
                <span className={label}>{group}</span>
                {PALETTE_STEPS.map((step) => <CanonicalRow key={step} group={group} step={step} theme={theme} />)}
            </div>
        ))}
    </div>
);

const ShadowSection = () => (
    <div className={block}>
        <h2 className={title}>Specialized domain: shadow</h2>
        <span className={subtitle}>Theme-aware technical scale.</span>
        <div className={row}>
            {SEMANTIC_SHADOW_STEPS.map((step) => (
                <span
                    key={step}
                    className={swatch}
                    style={{ boxShadow: `0 4px 12px var(--colors-semantic-shadow-${step})`, }}
                    title={`shadow.${step}`}
                />
            ))}
        </div>
    </div>
);

const ColorsGallery = ({ theme, }: { theme: Theme; }) => (
    <>
        <PaletteSection />
        <OpacitySection />
        <SemanticSection theme={theme} />
        <div className={block}>
            {SEMANTIC_GROUPS.map((group) => <DiagnosticMatrix key={group} group={group} theme={theme} />)}
        </div>
        <ShadowSection />
    </>
);

const ThemeShell = ({ theme: themeName, children, }: { theme: Theme; children: ReactNode; }) => (
    <div data-theme={themeName}>
        <div className={shell}>{children}</div>
    </div>
);

const meta = {
    title: "Foundation/Colors",
    parameters: { layout: "fullscreen", },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
    render: () => (
        <ThemeShell theme="light">
            <ColorsGallery theme="light" />
        </ThemeShell>
    ),
};

export const Dark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <ColorsGallery theme="dark" />
        </ThemeShell>
    ),
};
