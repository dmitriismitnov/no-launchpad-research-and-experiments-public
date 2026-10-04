import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Clipboard, } from "./clipboard";

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x6",
    width: "320px",
});

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.surface.base",
    color: "semantic.text.primary",
});

const frame = css({ width: "320px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const meta = {
    title: "Components/Data display/Clipboard",
    component: Clipboard,
    args: { value: "npm i @nolaunchpad/tokens", },
} satisfies Meta<typeof Clipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCopy: Story = {
    args: { onCopy: () => {}, },
};

export const Values: Story = {
    render: () => (
        <div className={stack}>
            <Clipboard value="npm i @nolaunchpad/tokens" onCopy={() => {}} />
            <Clipboard value="pnpm add @nolaunchpad/core" onCopy={() => {}} />
            <Clipboard value="bun add @nolaunchpad/icons" onCopy={() => {}} />
        </div>
    ),
};

// Pen `Jfhu9` / `wsiFp`: root `surface/sunken` is dark-only RED (the light step
// matches `common/100`), the `border/subtle` boundary discriminates in both
// themes, and the value `text/primary` / copy `text/secondary` are value-equal
// role renames. The copy `focus/ring` discriminates in light only (green.600 vs
// green.500; dark is green.500 either way).
const clipboardColours = {
    surface: { light: "rgb(241, 245, 249)", dark: "rgb(2, 6, 23)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    value: { light: "rgb(15, 23, 42)", dark: "rgb(248, 250, 252)", },
    copy: { light: "rgb(51, 65, 85)", dark: "rgb(203, 213, 225)", },
} as const;

const assertClipboardTokens =
    (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId("clipboard-tokens");
        const value = root.querySelector(".clipboard__value") as HTMLElement;
        const copy = root.querySelector(".clipboard__copy") as HTMLElement;

        await expect(getComputedStyle(root).backgroundColor).toBe(clipboardColours.surface[theme]);
        await expect(getComputedStyle(root).borderTopColor).toBe(clipboardColours.border[theme]);
        await expect(getComputedStyle(value).color).toBe(clipboardColours.value[theme]);
        await expect(getComputedStyle(copy).color).toBe(clipboardColours.copy[theme]);
    };

const clipboardTokens = (
    <Clipboard
        data-testid="clipboard-tokens"
        value="npm i @nolaunchpad/tokens"
        onCopy={() => {}}
    />
);

export const TokenSurfaceLight: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>{clipboardTokens}</div>
        </ThemeShell>
    ),
    play: assertClipboardTokens("light"),
};

export const TokenSurfaceDark: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>{clipboardTokens}</div>
        </ThemeShell>
    ),
    play: assertClipboardTokens("dark"),
};

const assertClipboardFocus = (ring: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const copy = canvasElement.querySelector(".clipboard__copy") as HTMLElement;

    await user.tab();
    await expect(copy).toHaveFocus();

    const style = getComputedStyle(copy);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(ring);
};

const renderFocus = (theme: "light" | "dark") => () => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Clipboard value="npm i @nolaunchpad/tokens" onCopy={() => {}} />
        </div>
    </ThemeShell>
);

export const TokenFocusLight: Story = {
    args: {},
    render: renderFocus("light"),
    play: assertClipboardFocus("rgb(22, 163, 74)"),
};

export const TokenFocusDark: Story = {
    args: {},
    render: renderFocus("dark"),
    play: assertClipboardFocus("rgb(34, 197, 94)"),
};
