import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Splitter, } from "./splitter";

const frame = css({ width: "360px", });

const paneLabel = css({
    fontFamily: "body",
    fontSize: "xs",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.text.tertiary",
});

const meta = {
    title: "Components/Layout/Splitter",
    component: Splitter,
    args: {
        start: <span className={paneLabel}>Editor</span>,
        end: <span className={paneLabel}>Preview</span>,
    },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Splitter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
    args: { orientation: "vertical", },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const tokenFrame = css({ width: "360px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

// Pen `U4KfQj` / `ZVJu8`: root `surface/raised` and boundary `border/subtle`
// discriminate in both themes; `paneStart` `surface/sunken` and grip
// `border/strong` discriminate in dark only (light steps are value-equal to the
// prior `common/100` / `common/50/border.strong`); `paneEnd` and handle
// `surface/raised` discriminate in both themes. The pane `text/tertiary` copy is
// a value-equal role rename. Pen's `focus/ring` specimen `GydgT` sits on the
// non-focusable root, so no focus role is projected.
const splitterColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    start: { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", },
    end: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    handle: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    grip: { light: "rgb(100, 116, 139)", dark: "rgb(148, 163, 184)", },
    pane: { light: "rgb(71, 85, 105)", dark: "rgb(148, 163, 184)", },
} as const;

const assertSplitterTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("splitter-tokens");
        const start = root.querySelector(".splitter__paneStart") as HTMLElement;
        const end = root.querySelector(".splitter__paneEnd") as HTMLElement;
        const handle = root.querySelector(".splitter__handle") as HTMLElement;
        const grip = root.querySelector(".splitter__grip") as HTMLElement;

        await expect(getComputedStyle(root).backgroundColor).toBe(splitterColours.surface[theme]);
        await expect(getComputedStyle(root).borderTopColor).toBe(splitterColours.border[theme]);
        await expect(getComputedStyle(start).backgroundColor).toBe(splitterColours.start[theme]);
        await expect(getComputedStyle(end).backgroundColor).toBe(splitterColours.end[theme]);
        await expect(getComputedStyle(handle).backgroundColor).toBe(splitterColours.handle[theme]);
        await expect(getComputedStyle(grip).backgroundColor).toBe(splitterColours.grip[theme]);
        await expect(getComputedStyle(start).color).toBe(splitterColours.pane[theme]);
    };

const splitterTokens = <Splitter data-testid="splitter-tokens" start="Editor" end="Preview" />;

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={tokenFrame}>{splitterTokens}</div>
        </ThemeShell>
    ),
    play: assertSplitterTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={tokenFrame}>{splitterTokens}</div>
        </ThemeShell>
    ),
    play: assertSplitterTokens("dark"),
};
