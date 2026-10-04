import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Tag, } from "./tag";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x6",
});

const meta = {
    title: "Components/Data display/Tag",
    component: Tag,
    args: { label: "Design", },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dismissible: Story = {
    args: { onClose: () => {}, },
};

export const Group: Story = {
    render: () => (
        <div className={row}>
            <Tag label="Design" onClose={() => {}} />
            <Tag label="Engineering" onClose={() => {}} />
            <Tag label="Research" onClose={() => {}} />
        </div>
    ),
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `UyMqu` / `QIUyy` token contract: the chip is `surface/raised` with the
// functional `border/strong` boundary; the label reads `text/secondary` and the
// remove control `text/tertiary`. Surface is a discriminating light value; the
// boundary is light-value-equal but discriminates in dark; label/close are
// value-equal role renames, covered as
// regression. The hover surface is documented at recipe level only — headless
// Chromium does not apply `:hover` (Batch C INFO).
const surfaceColour = { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", } as const;
const boundaryColour = { light: "rgb(100, 116, 139)", dark: "rgb(148, 163, 184)", } as const;
const labelColour = { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", } as const;
const closeColour = { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", } as const;

const assertTagTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId("tag-chip");
    const label = root.querySelector(".tag__label") as HTMLElement;
    const close = root.querySelector(".tag__close") as HTMLElement;
    const rootStyle = getComputedStyle(root);

    await expect(rootStyle.backgroundColor).toBe(surfaceColour[theme]);
    await expect(rootStyle.borderColor).toBe(boundaryColour[theme]);
    await expect(getComputedStyle(label).color).toBe(labelColour[theme]);
    await expect(getComputedStyle(close).color).toBe(closeColour[theme]);
};

const chip = <Tag label="Design" onClose={() => {}} data-testid="tag-chip" />;

export const SurfaceTokensLight: Story = {
    render: () => <ThemeShell theme="light">{chip}</ThemeShell>,
    play: assertTagTokens("light"),
};

export const SurfaceTokensDark: Story = {
    render: () => <ThemeShell theme="dark">{chip}</ThemeShell>,
    play: assertTagTokens("dark"),
};
