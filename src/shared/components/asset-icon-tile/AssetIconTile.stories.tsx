import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ICON_CODEPOINTS, type IconName, } from "@shared/components/icon/manifest.generated";

import { AssetIconTile, } from "./asset-icon-tile";

const iconNames = Object.keys(ICON_CODEPOINTS) as IconName[];

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const grid = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(x25, 1fr))",
    gap: "x8",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// The PEN reference (`Asset Icon Tile`, id `pt3X0`): a 40px sunken frame for
// one glyph. The inventory composition supplies the surrounding metadata.
const inventory: IconName[] = [ "gauge", "loader", "check", "sun", "moon", "palette", ];

const meta = {
    title: "Components/Content & data/Asset Icon Tile",
    component: AssetIconTile,
    parameters: { layout: "fullscreen", },
    args: {
        name: "gauge",
        label: "Gauge",
    },
    argTypes: {
        name: {
            control: { type: "select", },
            options: iconNames,
        },
        label: { control: { type: "text", }, },
    },
} satisfies Meta<typeof AssetIconTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: (args) => (
        <ThemeShell theme="light">
            <AssetIconTile {...args} />
        </ThemeShell>
    ),
};

export const Inventory: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={grid}>
                {inventory.map((name) => <AssetIconTile key={name} name={name} label={name} />)}
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelectorAll(".assetIconTile").length).toBe(inventory.length);
    },
};

export const LightAndDark: Story = {
    render: () => (
        <>
            <ThemeShell theme="light">
                <div data-case="light">
                    <AssetIconTile name="gauge" />
                </div>
            </ThemeShell>
            <ThemeShell theme="dark">
                <div data-case="dark">
                    <AssetIconTile name="gauge" />
                </div>
            </ThemeShell>
        </>
    ),
    play: async ({ canvasElement, }) => {
        const light = canvasElement.querySelector('[data-case="light"] .assetIconTile') as Element;
        const dark = canvasElement.querySelector('[data-case="dark"] .assetIconTile') as Element;

        await expect(getComputedStyle(light).backgroundColor).toBe("rgb(241, 245, 249)");
        await expect(getComputedStyle(dark).backgroundColor).toBe("rgb(15, 23, 42)");
    },
};
