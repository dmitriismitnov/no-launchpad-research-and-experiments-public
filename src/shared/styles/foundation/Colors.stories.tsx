import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { css, cx, } from "@shared/styled-system/css";

import { PALETTE_STEPS, roles, staticPalette, } from "./colors";

type Token = { value: string; };
type Palette = Record<string, Record<string, Token>>;

const palette = staticPalette as unknown as Palette;

const resolve = (value: string): string => {
    const match = /^\{colors\.([a-z]+)\.(\d+)\}$/.exec(value);

    return match === null ? value : palette[match[1]!]![match[2]!]!.value;
};

// Gallery-only label size. The foundation has no generic UI text size yet.
const GALLERY_LABEL_SIZE = "0.9375rem";

const familyNames = Object.keys(staticPalette);

const roleRows = Object.entries(roles).flatMap(([ group, groupRoles, ]) =>
    Object.entries(groupRoles as Record<string, { light: Token; dark: Token; }>).map(
        ([ name, pair, ]) => ( {
            name: `${group}.${name}`,
            light: resolve(pair.light.value),
            dark: resolve(pair.dark.value),
        } ),
    )
);

const shell = css({
    display: "grid",
    gap: "x12",
    padding: "x12",
    backgroundColor: {
        _light: "surface.raised.light",
        _dark: "surface.raised.dark",
    },
    color: {
        _light: "ink.strong.light",
        _dark: "ink.strong.dark",
    },
});

const block = css({ display: "grid", gap: "x6", });

const title = css({
    fontSize: "heading",
    fontWeight: "semibold",
});

const family = css({ display: "grid", gap: "x3", });

const stepRow = css({
    display: "grid",
    gridTemplateColumns: "{sizes.x25} {sizes.x25} 1fr",
    alignItems: "center",
    gap: "x4",
});

const swatch = css({
    width: "x16",
    height: "x16",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: {
        _light: "line.soft.light",
        _dark: "line.soft.dark",
    },
    borderRadius: "sm",
});

const bigSwatch = css({
    width: "x25",
    height: "x16",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: {
        _light: "line.soft.light",
        _dark: "line.soft.dark",
    },
    borderRadius: "sm",
});

const label = css({
    fontSize: GALLERY_LABEL_SIZE,
    opacity: 0.8,
});

const mono = css({
    fontFamily: "body",
    fontSize: GALLERY_LABEL_SIZE,
    opacity: 0.6,
});

const roleRow = css({
    display: "grid",
    gridTemplateColumns: "{sizes.x25} {sizes.x16} 1fr {sizes.x16} 1fr",
    alignItems: "center",
    gap: "x4",
});

const paletteDemo = css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "x4",
});

const paletteCard = css({
    padding: "x6",
    borderRadius: "sm",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "colorPalette.300",
    backgroundColor: "colorPalette.50",
    color: "colorPalette.700",
});

// Native `colorPalette` requires a static value for CSS generation.
const paletteNeutral = css({ colorPalette: "neutral", });
const paletteBrand = css({ colorPalette: "brand", });
const paletteDanger = css({ colorPalette: "danger", });

const colorPaletteCards = [
    { name: "neutral", className: paletteNeutral, },
    { name: "brand", className: paletteBrand, },
    { name: "danger", className: paletteDanger, },
];

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const ColorsGallery = () => (
    <>
        <div className={block}>
            <h2 className={title}>Static palette</h2>
            {familyNames.map((name) => (
                <div key={name} className={family}>
                    <span className={label}>{name}</span>
                    {PALETTE_STEPS.map((step) => {
                        const hex = palette[name]![`${step}`]!.value;

                        return (
                            <div key={step} className={stepRow}>
                                <span className={label}>{step}</span>
                                <span className={swatch} style={{ backgroundColor: hex, }} />
                                <span className={mono}>{hex}</span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>

        <div className={block}>
            <h2 className={title}>System roles</h2>
            {roleRows.map((row) => (
                <div key={row.name} className={roleRow}>
                    <span className={label}>{row.name}</span>
                    <span className={bigSwatch} style={{ backgroundColor: row.light, }} />
                    <span className={mono}>{row.light}</span>
                    <span className={bigSwatch} style={{ backgroundColor: row.dark, }} />
                    <span className={mono}>{row.dark}</span>
                </div>
            ))}
        </div>

        <div className={block}>
            <h2 className={title}>colorPalette</h2>
            <div className={paletteDemo}>
                {colorPaletteCards.map(({ name, className, }) => (
                    <div key={name} className={cx(paletteCard, className)}>
                        {name}
                    </div>
                ))}
            </div>
        </div>
    </>
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
            <ColorsGallery />
        </ThemeShell>
    ),
};

export const Dark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <ColorsGallery />
        </ThemeShell>
    ),
};
