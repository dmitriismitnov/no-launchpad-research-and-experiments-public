import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { MediaPlaceholder, } from "./media-placeholder";

const frame = css({ width: "220px", });

const meta = {
    title: "Components/Data display/Media Placeholder",
    component: MediaPlaceholder,
    args: { label: "16 : 9 media", },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MediaPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = {
    args: { label: undefined, },
};

export const AlternativeGlyph: Story = {
    args: { icon: "waves", label: "Animated media", },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const tokenFrame = css({ width: "220px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `SX6Gf` / `vUaGv`: the root `border/subtle` boundary discriminates in both
// themes; the `surface/sunken` root discriminates in dark only (light is
// value-equal to the prior `common/100`); the glyph and caption `text/tertiary`
// are value-equal role renames. Pen's audit reports `focus-indicator 0/0`.
const mediaPlaceholderColours = {
    surface: { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    glyph: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
} as const;

const assertMediaPlaceholderTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("media-placeholder-tokens");
        const icon = root.querySelector(".mediaPlaceholder__icon") as HTMLElement;
        const label = root.querySelector(".mediaPlaceholder__label") as HTMLElement;

        await expect(getComputedStyle(root).backgroundColor).toBe(mediaPlaceholderColours.surface[theme]);
        await expect(getComputedStyle(root).borderTopColor).toBe(mediaPlaceholderColours.border[theme]);
        await expect(getComputedStyle(icon).color).toBe(mediaPlaceholderColours.glyph[theme]);
        await expect(getComputedStyle(label).color).toBe(mediaPlaceholderColours.glyph[theme]);
    };

const mediaPlaceholderTokens = <MediaPlaceholder data-testid="media-placeholder-tokens" label="16 : 9 media" />;

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={tokenFrame}>{mediaPlaceholderTokens}</div>
        </ThemeShell>
    ),
    play: assertMediaPlaceholderTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={tokenFrame}>{mediaPlaceholderTokens}</div>
        </ThemeShell>
    ),
    play: assertMediaPlaceholderTokens("dark"),
};
