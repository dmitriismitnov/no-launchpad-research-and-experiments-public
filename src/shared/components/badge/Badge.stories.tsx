import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Badge, } from "./badge";

const meta = {
    title: "Components/Feedback & status/Badge",
    component: Badge,
    args: { label: "Active", },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: "neutral", }, };
export const Positive: Story = { args: { tone: "positive", label: "Healthy", }, };
export const Negative: Story = { args: { tone: "negative", label: "Failed", }, };
export const Brand: Story = { args: { tone: "brand", label: "New", }, };
export const WithoutDot: Story = { args: { withDot: false, }, };

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x6",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `as3xr` / `NT57b` token contract: Badge already paints its dot from the
// documented tone roles (neutral `common/600/background`, positive
// `positive/600/background`, negative `negative/600/background`, brand
// `brand/600/background`) and its label from the inverse text role. Both-theme
// regression evidence only; no production change in this slice.
const dotColours = {
    neutral: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    positive: { light: "rgb(22, 163, 74)", dark: "rgb(74, 222, 128)", },
    negative: { light: "rgb(220, 38, 38)", dark: "rgb(248, 113, 113)", },
    brand: { light: "rgb(22, 163, 74)", dark: "rgb(74, 222, 128)", },
} as const;

const labelColour = { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", } as const;

const assertBadgeTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);

    for ( const [ tone, colours, ] of Object.entries(dotColours) ) {
        const root = canvas.getByTestId(`badge-${tone}`);
        const dot = root.querySelector(".badge__dot") as HTMLElement;
        const label = root.querySelector(".badge__label") as HTMLElement;

        await expect(getComputedStyle(dot).backgroundColor).toBe(colours[theme]);
        await expect(getComputedStyle(label).color).toBe(labelColour[theme]);
    }
};

const toneRow = (
    <div className={row}>
        <Badge label="Active" tone="neutral" data-testid="badge-neutral" />
        <Badge label="Healthy" tone="positive" data-testid="badge-positive" />
        <Badge label="Failed" tone="negative" data-testid="badge-negative" />
        <Badge label="New" tone="brand" data-testid="badge-brand" />
    </div>
);

export const ToneTokensLight: Story = {
    render: () => <ThemeShell theme="light">{toneRow}</ThemeShell>,
    play: assertBadgeTokens("light"),
};

export const ToneTokensDark: Story = {
    render: () => <ThemeShell theme="dark">{toneRow}</ThemeShell>,
    play: assertBadgeTokens("dark"),
};
