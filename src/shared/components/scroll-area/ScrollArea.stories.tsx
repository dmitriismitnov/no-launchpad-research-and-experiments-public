import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ScrollArea, } from "./scroll-area";

const frame = css({ width: "260px", });

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

const line = css({
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.700.background",
});

const lines = [
    "Scrollable content line 1",
    "Scrollable content line 2",
    "Scrollable content line 3",
    "Scrollable content line 4",
    "Scrollable content line 5",
    "Scrollable content line 6",
    "Scrollable content line 7",
    "Scrollable content line 8",
];

const stack = Array.from({ length: 8, },
    (_, index) => <p key={index} className={line}>{lines[index] ?? `Scrollable content line ${index + 1}`}</p>);

const meta = {
    title: "Components/Layout/Scroll Area",
    component: ScrollArea,
    args: { children: stack, },
    decorators: [
        (Story) => (
            <div className={frame}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Labelled: Story = {
    args: { label: "Release notes", },
};

export const Tall: Story = {
    args: { maxHeight: "20rem", },
};

// Pen `pHjwJ` / `EbeiJ`: root `surface/raised` and `border/subtle` discriminate
// in both themes; the scrollbar thumb `border/strong` discriminates in dark
// only (neutral.500 vs neutral.400; light is neutral.500 either way); the
// viewport `focus/ring` discriminates in light only. The vertical/horizontal,
// inset and always-visible/on-hover variants and the hover/dragging states are
// BLOCKED (new props or a JavaScript scrollbar).
const scrollColours = {
    surface: { light: "rgb(255, 255, 255)", dark: "rgb(15, 23, 42)", },
    border: { light: "rgb(226, 232, 240)", dark: "rgb(30, 41, 59)", },
    thumb: { light: "rgb(100, 116, 139)", dark: "rgb(148, 163, 184)", },
} as const;

const assertScrollTokens = (theme: "light" | "dark") => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const root = canvasElement.querySelector(".scrollArea__root") as HTMLElement;
    const viewport = canvasElement.querySelector(".scrollArea__viewport") as HTMLElement;

    await expect(getComputedStyle(root).backgroundColor).toBe(scrollColours.surface[theme]);
    await expect(getComputedStyle(root).borderTopColor).toBe(scrollColours.border[theme]);
    await expect(getComputedStyle(viewport).scrollbarColor).toContain(scrollColours.thumb[theme]);
    await expect(getComputedStyle(viewport, "::-webkit-scrollbar-thumb").backgroundColor)
        .toBe(scrollColours.thumb[theme]);
};

const scrollTokens = <ScrollArea maxHeight="4rem">{stack}</ScrollArea>;

export const TokenSurfaceLight: Story = {
    args: {},
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>{scrollTokens}</div>
        </ThemeShell>
    ),
    play: assertScrollTokens("light"),
};

export const TokenSurfaceDark: Story = {
    args: {},
    render: () => (
        <ThemeShell theme="dark">
            <div className={frame}>{scrollTokens}</div>
        </ThemeShell>
    ),
    play: assertScrollTokens("dark"),
};

const assertScrollFocus = (ring: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const viewport = canvasElement.querySelector(".scrollArea__viewport") as HTMLElement;

    await user.tab();
    await expect(viewport).toHaveFocus();

    const style = getComputedStyle(viewport);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(ring);
};

const renderFocus = (theme: "light" | "dark") => () => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <ScrollArea maxHeight="4rem">{stack}</ScrollArea>
        </div>
    </ThemeShell>
);

export const TokenFocusLight: Story = {
    args: {},
    render: renderFocus("light"),
    play: assertScrollFocus("rgb(22, 163, 74)"),
};

export const TokenFocusDark: Story = {
    args: {},
    render: renderFocus("dark"),
    play: assertScrollFocus("rgb(34, 197, 94)"),
};
