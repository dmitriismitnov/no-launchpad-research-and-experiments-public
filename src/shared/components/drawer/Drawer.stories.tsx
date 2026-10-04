import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { Drawer, type DrawerProps, } from "./drawer";

const actions = (
    <>
        <Button tone="secondary">Cancel</Button>
        <Button>Apply</Button>
    </>
);

const meta = {
    title: "Components/Overlays/Drawer",
    component: Drawer,
    args: {
        title: "Filter components",
        description: "Narrow the list by status, owner or release.",
        trigger: "Open drawer",
        actions,
    },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const Left: Story = {
    args: { defaultOpen: true, side: "left", },
};

export const WithoutScrim: Story = {
    args: { defaultOpen: true, withScrim: false, },
};

export const Minimal: Story = {
    args: {
        defaultOpen: true,
        title: "Filters",
        description: undefined,
        children: undefined,
        actions: undefined,
    },
};

export const Dismiss: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Open drawer", }));
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

const renderIn = (theme: "light" | "dark") => (args: DrawerProps) => (
    <ThemeShell theme={theme}>
        <Drawer {...args} />
    </ThemeShell>
);

// Pen Drawer token contract: the trigger focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead of the
// brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Open drawer", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen Drawer token contract: the panel resolves `semantic.surface.overlay` +
// `semantic.border.subtle`, and the footer separator resolves
// `semantic.border.subtle` — all discriminating in each theme.
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const panel = canvas.getByRole("dialog");
        const panelStyle = getComputedStyle(panel);
        const footer = canvasElement.querySelector(".drawer__footer") as Element;
        const footerStyle = getComputedStyle(footer);

        await expect(panelStyle.backgroundColor).toBe(background);
        await expect(panelStyle.borderColor).toBe(border);
        await expect(footerStyle.borderTopColor).toBe(border);
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
