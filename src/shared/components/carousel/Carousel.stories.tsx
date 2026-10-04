import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Carousel, type CarouselProps, } from "./carousel";

const slides = [
    { label: "Overview", icon: "image", },
    { label: "Tokens", icon: "image", },
    { label: "Components", icon: "image", },
] as const;

const meta = {
    title: "Components/Navigation & disclosure/Carousel",
    component: Carousel,
    args: { slides, },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("group", { name: /1 of 3/, })).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Next slide", }));
        await expect(canvas.getByRole("group", { name: /2 of 3/, })).toBeTruthy();
    },
};

export const LastSlide: Story = {
    args: { current: 2, },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

export const CustomContent: Story = {
    args: {
        slides: [
            { label: "Release notes", content: <strong>Version 2.0</strong>, },
            { label: "Roadmap", content: <strong>Semantic tokens</strong>, },
        ],
    },
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: CarouselProps) => (
    <ThemeShell theme={theme}>
        <Carousel {...args} />
    </ThemeShell>
);

// Pen `rm4a0` master / `hvrFF` token contract: the focus-visible specimen
// (`vQYgz`/`zqnW0`) resolves `focus/ring` on the controls and dots — green.600
// light (`rgb(22, 163, 74)`), green.500 dark (`rgb(34, 197, 94)`). Only light is
// discriminating: in dark the old brand fill and `focus/ring` both resolve
// green.500, so the dark stories are non-discriminating.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const previous = canvas.getByRole("button", { name: "Previous slide", });

    await user.tab();
    await expect(previous).toHaveFocus();

    const style = getComputedStyle(previous);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const FocusVisibleLight: Story = {
    args: { current: 1, },
    render: renderIn("light"),
    play: assertFocusRing("rgb(22, 163, 74)"),
};

export const FocusVisibleDark: Story = {
    args: { current: 1, },
    render: renderIn("dark"),
    play: assertFocusRing("rgb(34, 197, 94)"),
};

// The dots sit after the two controls in the tab order (previous, next, dot 1);
// walk the keyboard until the first dot holds focus, then read its ring. The dot
// carries the same `focus/ring` contract as the controls.
const assertDotFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const dot = canvas.getByRole("button", { name: "Go to slide 1: Overview", });

    for ( let step = 0; step < 6 && document.activeElement !== dot; step += 1 ) {
        await user.tab();
    }

    await expect(dot).toHaveFocus();

    const style = getComputedStyle(dot);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const DotFocusVisibleLight: Story = {
    args: { current: 1, },
    render: renderIn("light"),
    play: assertDotFocusRing("rgb(22, 163, 74)"),
};

export const DotFocusVisibleDark: Story = {
    args: { current: 1, },
    render: renderIn("dark"),
    play: assertDotFocusRing("rgb(34, 197, 94)"),
};
