import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Progress, } from "./progress";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x8",
    width: "320px",
});

const meta = {
    title: "Components/Feedback & status/Progress",
    component: Progress,
    args: { value: 60, label: "Progress", },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0, }, };

export const Complete: Story = { args: { value: 100, }, };

export const CustomMax: Story = { args: { value: 3, max: 4, }, };

export const Values: Story = {
    render: () => (
        <div className={stack}>
            <Progress value={10} label="10%" />
            <Progress value={40} label="40%" />
            <Progress value={75} label="75%" />
            <Progress value={100} label="100%" />
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

// Pen `tTGQi` token contract: the sunken track and the primary fill are
// value-equal in light and discriminate in dark (track neutral.950, fill the
// opaque green.700). The `full` radius is value-equal in both themes.
const progressTrack = { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", } as const;
const progressFill = { light: "rgb(21, 128, 61)", dark: "rgb(21, 128, 61)", } as const;

const assertProgressTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("progress-tokens");
        const track = root.querySelector(".progress__track") as HTMLElement;
        const fill = root.querySelector(".progress__fill") as HTMLElement;

        await expect(getComputedStyle(track).backgroundColor).toBe(progressTrack[theme]);
        await expect(getComputedStyle(fill).backgroundColor).toBe(progressFill[theme]);
        await expect(getComputedStyle(track).borderTopLeftRadius).toBe("9999px");
        await expect(getComputedStyle(fill).borderTopLeftRadius).toBe("9999px");
    };

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Progress data-testid="progress-tokens" value={60} label="Progress" />
        </ThemeShell>
    ),
    play: assertProgressTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <Progress data-testid="progress-tokens" value={60} label="Progress" />
        </ThemeShell>
    ),
    play: assertProgressTokens("dark"),
};
