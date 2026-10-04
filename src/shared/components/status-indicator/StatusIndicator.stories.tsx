import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { StatusIndicator, } from "./status-indicator";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x12",
});

const meta = {
    title: "Components/Feedback & status/Status Indicator",
    component: StatusIndicator,
    args: { label: "Online", },
} satisfies Meta<typeof StatusIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Positive: Story = { args: { tone: "positive", }, };
export const Neutral: Story = { args: { tone: "neutral", label: "Idle", }, };
export const Negative: Story = { args: { tone: "negative", label: "Offline", }, };
export const Brand: Story = { args: { tone: "brand", label: "New", }, };

export const Tones: Story = {
    render: () => (
        <div className={row}>
            <StatusIndicator label="Idle" tone="neutral" />
            <StatusIndicator label="Online" tone="positive" />
            <StatusIndicator label="Offline" tone="negative" />
            <StatusIndicator label="New" tone="brand" />
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

// Pen `a4r4Y` / `x8pveA` token contract: neutral dot -> `border/strong`;
// positive -> `positive/700/background`; negative -> `negative/700/background`;
// label -> `text/secondary`. Only the light values discriminate — in dark the
// step-700 green/red settle on green.300 / red.300 and the neutral boundary on
// neutral.400 — so both themes are captured and asserted.
const dotColours = {
    neutral: { light: "rgb(100, 116, 139)", dark: "rgb(148, 163, 184)", },
    positive: { light: "rgb(21, 128, 61)", dark: "rgb(134, 239, 172)", },
    negative: { light: "rgb(185, 28, 28)", dark: "rgb(252, 165, 165)", },
} as const;

const labelColour = { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", } as const;

const assertStatusTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);

    for ( const [ tone, colours, ] of Object.entries(dotColours) ) {
        const root = canvas.getByTestId(`status-${tone}`);
        const dot = root.querySelector(".statusIndicator__dot") as HTMLElement;
        const label = root.querySelector(".statusIndicator__label") as HTMLElement;

        await expect(getComputedStyle(dot).backgroundColor).toBe(colours[theme]);
        await expect(getComputedStyle(label).color).toBe(labelColour[theme]);
    }
};

const toneRow = (
    <div className={row}>
        <StatusIndicator label="Idle" tone="neutral" data-testid="status-neutral" />
        <StatusIndicator label="Online" tone="positive" data-testid="status-positive" />
        <StatusIndicator label="Offline" tone="negative" data-testid="status-negative" />
    </div>
);

export const ToneTokensLight: Story = {
    render: () => <ThemeShell theme="light">{toneRow}</ThemeShell>,
    play: assertStatusTokens("light"),
};

export const ToneTokensDark: Story = {
    render: () => <ThemeShell theme="dark">{toneRow}</ThemeShell>,
    play: assertStatusTokens("dark"),
};
