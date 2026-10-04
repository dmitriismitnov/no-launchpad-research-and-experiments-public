import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Timeline, } from "./timeline";

const meta = {
    title: "Components/Data display/Timeline",
    component: Timeline,
    args: {
        items: [
            { title: "Foundation published", meta: "Mar 2", },
            { title: "Components in review", meta: "In progress", },
            { title: "States catalogue", meta: "Upcoming", },
            { title: "Contrast audit", meta: "Failed", },
        ],
    },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Short: Story = {
    args: {
        items: [
            { title: "Draft created", meta: "Owner: Ada", },
            { title: "Ready to merge", meta: "All checks green", },
        ],
    },
};

export const Single: Story = {
    args: { items: [ { title: "Release cut", meta: "v1.0.0", }, ], },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const frame = css({ width: "360px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `z4hUE9` / `d5pll` (docs `K7WV8o`): the marker `surface/raised` and the
// connector `border/subtle` discriminate in both themes; the marker
// `border/strong` discriminates in dark only (neutral.500 both themes vs
// neutral.400 dark). Title `text/primary` and metadata `text/secondary` are
// value-equal role renames (asserted, not claimed RED). The static timeline has
// no focusable slot (focus-indicator audit 0/0).
const timelineColours = {
    markerSurface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    markerBorder: { light: "rgb(100, 116, 139)", dark: "rgb(148, 163, 184)", },
    line: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    title: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    meta: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
} as const;

const assertTimelineTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("timeline-tokens");
        const marker = root.querySelector(".timeline__marker") as HTMLElement;
        const line = root.querySelector(".timeline__line") as HTMLElement;
        const title = root.querySelector(".timeline__title") as HTMLElement;
        const meta = root.querySelector(".timeline__meta") as HTMLElement;

        await expect(getComputedStyle(marker).backgroundColor).toBe(timelineColours.markerSurface[theme]);
        await expect(getComputedStyle(marker).borderTopColor).toBe(timelineColours.markerBorder[theme]);
        await expect(getComputedStyle(line).backgroundColor).toBe(timelineColours.line[theme]);
        await expect(getComputedStyle(title).color).toBe(timelineColours.title[theme]);
        await expect(getComputedStyle(meta).color).toBe(timelineColours.meta[theme]);
    };

const timelineTokens = (
    <Timeline
        data-testid="timeline-tokens"
        items={[
            { title: "Foundation published", meta: "Mar 2", },
            { title: "Components in review", meta: "In progress", },
            { title: "States catalogue", meta: "Upcoming", },
        ]}
    />
);

export const TokenRailLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>{timelineTokens}</div>
        </ThemeShell>
    ),
    play: assertTimelineTokens("light"),
};

export const TokenRailDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>{timelineTokens}</div>
        </ThemeShell>
    ),
    play: assertTimelineTokens("dark"),
};
