import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { Sheet, type SheetProps, } from "./sheet";

const actions = (
    <>
        <Button tone="secondary">Cancel</Button>
        <Button>Share</Button>
    </>
);

const meta = {
    title: "Components/Overlays/Sheet",
    component: Sheet,
    args: {
        title: "Share project",
        description: "Anyone with the link can view this project.",
        trigger: "Open sheet",
        actions,
    },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, handle: true, },
};

export const Right: Story = {
    args: { defaultOpen: true, side: "right", },
};

export const WithoutScrim: Story = {
    args: { defaultOpen: true, withScrim: false, },
};

export const Minimal: Story = {
    args: {
        defaultOpen: true,
        title: "Share",
        description: undefined,
        children: undefined,
        actions: undefined,
    },
};

export const Dismiss: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Open sheet", }));
        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Close", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
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

const renderIn = (theme: "light" | "dark") => (args: SheetProps) => (
    <ThemeShell theme={theme}>
        <Sheet {...args} />
    </ThemeShell>
);

// Pen Sheet token contract: the trigger focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead of the
// brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Open sheet", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen Sheet token contract: the panel resolves `semantic.surface.overlay` +
// `semantic.border.subtle` — both discriminating in each theme.
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const panel = canvas.getByRole("dialog");
        const style = getComputedStyle(panel);

        await expect(style.backgroundColor).toBe(background);
        await expect(style.borderColor).toBe(border);
    };

export const SurfaceLight: Story = {
    args: { defaultOpen: true, },
    render: renderIn("light"),
    play: assertSurface("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const SurfaceDark: Story = {
    args: { defaultOpen: true, },
    render: renderIn("dark"),
    play: assertSurface("rgb(30, 41, 59)", "rgb(30, 41, 59)"),
};

// Pen Sheet token contract: the grabber resolves `semantic.border.strong`
// (`rgb(148, 163, 184)` neutral.400 in dark). Dark discriminates (old
// neutral.500); light is value-equivalent (neutral.500 both) and is not
// claimed.
export const HandleDark: Story = {
    args: { defaultOpen: true, handle: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const handle = canvasElement.querySelector(".sheet__handle") as Element;
        const style = getComputedStyle(handle);

        await expect(style.backgroundColor).toBe("rgb(148, 163, 184)");
    },
};
