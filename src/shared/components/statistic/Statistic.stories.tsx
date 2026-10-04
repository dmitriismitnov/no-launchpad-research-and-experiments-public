import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Statistic, } from "./statistic";

const stack = css({
    display: "flex",
    gap: "x12",
    flexWrap: "wrap",
});

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

const meta = {
    title: "Components/Data display/Statistic",
    component: Statistic,
    args: {
        label: "Active users",
        value: "48.2K",
        delta: "+12.4% vs last week",
        trend: "up",
        deltaIcon: "trending-up",
    },
} satisfies Meta<typeof Statistic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDelta: Story = {
    args: { label: "Revenue", value: "$12.4K", delta: "+8% vs last month", },
};

export const Trends: Story = {
    render: () => (
        <div className={stack}>
            <Statistic
                label="Active users"
                value="48.2K"
                delta="+12.4%"
                trend="up"
                deltaIcon="trending-up"
            />
            <Statistic
                label="Churn"
                value="1.2%"
                delta="-0.4%"
                trend="down"
                deltaIcon="trending-up"
            />
            <Statistic label="Sessions" value="91.3K" delta="No change" trend="neutral" />
        </div>
    ),
};

export const Tones: Story = {
    render: () => (
        <div className={stack}>
            <Statistic label="Neutral" value="48.2K" tone="neutral" />
            <Statistic label="Positive" value="+12.4%" tone="positive" />
            <Statistic label="Negative" value="-3.1%" tone="negative" />
            <Statistic label="Brand" value="4.9" tone="brand" />
        </div>
    ),
};

// Pen `CjnzL` master / `gLCov` documentation / `FMXaz` anatomy token contract:
// label `text/tertiary`, value `text/primary`, delta glyph `text/secondary` and
// delta copy `text/primary`. The glyph/copy roles discriminate in both themes
// against the prior inherited `text/tertiary`; label and value are value-equal
// role renames captured as regression. The `positive delta` / `negative delta`
// states resolve `feedback/*-fg`, value-mapped to `positive|negative.700`.
const statisticColours = {
    label: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
    value: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    neutralIcon: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
    neutralText: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    up: { light: "rgb(21, 128, 61)", dark: "rgb(134, 239, 172)", },
    down: { light: "rgb(185, 28, 28)", dark: "rgb(252, 165, 165)", },
} as const;

const assertStatisticDelta =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("statistic-tokens");
        const label = root.querySelector(".statistic__label") as HTMLElement;
        const value = root.querySelector(".statistic__value") as HTMLElement;
        const deltaIcon = root.querySelector(".statistic__deltaIcon") as HTMLElement;
        const deltaText = root.querySelector(".statistic__deltaText") as HTMLElement;

        await expect(getComputedStyle(label).color).toBe(statisticColours.label[theme]);
        await expect(getComputedStyle(value).color).toBe(statisticColours.value[theme]);
        await expect(getComputedStyle(deltaIcon).color).toBe(statisticColours.neutralIcon[theme]);
        await expect(getComputedStyle(deltaText).color).toBe(statisticColours.neutralText[theme]);
    };

const statisticTokens = (
    <Statistic
        data-testid="statistic-tokens"
        label="Active users"
        value="48.2K"
        delta="+12.4% vs last week"
        deltaIcon="trending-up"
    />
);

export const TokenDeltaLight: Story = {
    render: () => <ThemeShell theme="light">{statisticTokens}</ThemeShell>,
    play: assertStatisticDelta("light"),
};

export const TokenDeltaDark: Story = {
    render: () => <ThemeShell theme="dark">{statisticTokens}</ThemeShell>,
    play: assertStatisticDelta("dark"),
};

const assertStatisticTrend =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const up = canvas.getByTestId("statistic-trend-up");
        const down = canvas.getByTestId("statistic-trend-down");
        const upIcon = up.querySelector(".statistic__deltaIcon") as HTMLElement;
        const upText = up.querySelector(".statistic__deltaText") as HTMLElement;
        const downIcon = down.querySelector(".statistic__deltaIcon") as HTMLElement;
        const downText = down.querySelector(".statistic__deltaText") as HTMLElement;

        await expect(getComputedStyle(upIcon).color).toBe(statisticColours.up[theme]);
        await expect(getComputedStyle(upText).color).toBe(statisticColours.up[theme]);
        await expect(getComputedStyle(downIcon).color).toBe(statisticColours.down[theme]);
        await expect(getComputedStyle(downText).color).toBe(statisticColours.down[theme]);
    };

const statisticTrends = (
    <div className={stack}>
        <Statistic
            data-testid="statistic-trend-up"
            label="Active users"
            value="48.2K"
            delta="+12.4%"
            trend="up"
            deltaIcon="trending-up"
        />
        <Statistic
            data-testid="statistic-trend-down"
            label="Churn"
            value="1.2%"
            delta="-0.4%"
            trend="down"
            deltaIcon="trending-up"
        />
    </div>
);

export const TokenTrendLight: Story = {
    render: () => <ThemeShell theme="light">{statisticTrends}</ThemeShell>,
    play: assertStatisticTrend("light"),
};

export const TokenTrendDark: Story = {
    render: () => <ThemeShell theme="dark">{statisticTrends}</ThemeShell>,
    play: assertStatisticTrend("dark"),
};
