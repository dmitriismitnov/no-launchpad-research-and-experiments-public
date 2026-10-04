import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Skeleton, } from "./skeleton";

const stack = css({ display: "flex", flexDirection: "column", gap: "x6", width: "240px", });

const meta = {
    title: "Components/Feedback & status/Skeleton",
    component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Paragraph: Story = {
    render: () => (
        <div className={stack}>
            <Skeleton style={{ width: "100%", height: "0.75rem", }} />
            <Skeleton style={{ width: "100%", height: "0.75rem", }} />
            <Skeleton style={{ width: "60%", height: "0.75rem", }} />
        </div>
    ),
};

export const Avatar: Story = {
    render: () => <Skeleton style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", }} />,
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

// Pen `qfUOu` token contract: the sunken surface role is value-equal in light
// and discriminates in dark (neutral.950 vs the prior neutral.900).
const skeletonColours = { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", } as const;

const assertSkeletonTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("skeleton-tokens");

        await expect(getComputedStyle(root).backgroundColor).toBe(skeletonColours[theme]);
    };

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Skeleton data-testid="skeleton-tokens" />
        </ThemeShell>
    ),
    play: assertSkeletonTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <Skeleton data-testid="skeleton-tokens" />
        </ThemeShell>
    ),
    play: assertSkeletonTokens("dark"),
};
