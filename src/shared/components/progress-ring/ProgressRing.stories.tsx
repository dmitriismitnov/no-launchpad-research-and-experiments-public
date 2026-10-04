import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ProgressRing, } from "./progress-ring";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Feedback & status/Progress Ring",
    component: ProgressRing,
    args: { value: 60, label: "Progress", },
} satisfies Meta<typeof ProgressRing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0, }, };

export const Complete: Story = { args: { value: 100, }, };

export const Sizes: Story = {
    render: () => (
        <div className={row}>
            <ProgressRing value={40} size={32} thickness={3} label="40%" />
            <ProgressRing value={60} size={40} thickness={4} label="60%" />
            <ProgressRing value={80} size={64} thickness={6} label="80%" />
        </div>
    ),
};

export const Values: Story = {
    render: () => (
        <div className={row}>
            <ProgressRing value={0} label="0%" />
            <ProgressRing value={25} label="25%" />
            <ProgressRing value={50} label="50%" />
            <ProgressRing value={75} label="75%" />
            <ProgressRing value={100} label="100%" />
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

// Pen `yz7HH` token contract: the sunken track stroke and the primary arc
// stroke are value-equal in light and discriminate in dark (track neutral.950,
// arc the opaque green.700).
const ringTrack = { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", } as const;
const ringArc = { light: "rgb(21, 128, 61)", dark: "rgb(21, 128, 61)", } as const;

const assertProgressRingTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("progress-ring-tokens");
        const track = root.querySelector(".progressRing__track") as SVGElement;
        const arc = root.querySelector(".progressRing__arc") as SVGElement;

        await expect(getComputedStyle(track).stroke).toBe(ringTrack[theme]);
        await expect(getComputedStyle(arc).stroke).toBe(ringArc[theme]);
    };

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <ProgressRing data-testid="progress-ring-tokens" value={60} label="Progress" />
        </ThemeShell>
    ),
    play: assertProgressRingTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <ProgressRing data-testid="progress-ring-tokens" value={60} label="Progress" />
        </ThemeShell>
    ),
    play: assertProgressRingTokens("dark"),
};
