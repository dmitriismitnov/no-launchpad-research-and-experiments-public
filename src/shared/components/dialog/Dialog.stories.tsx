import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { Dialog, type DialogProps, } from "./dialog";

const actions = (
    <>
        <Button tone="secondary">Not now</Button>
        <Button>Publish</Button>
    </>
);

const meta = {
    title: "Components/Overlays/Dialog",
    component: Dialog,
    args: {
        title: "Publish foundation v2.3?",
        description: "This updates 6 components and 480 tokens across every screen.",
        trigger: "Open dialog",
        actions,
    },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const Small: Story = {
    args: { defaultOpen: true, size: "sm", },
};

export const Large: Story = {
    args: { defaultOpen: true, size: "lg", },
};

export const Minimal: Story = {
    args: {
        defaultOpen: true,
        title: "Confirm",
        description: undefined,
        children: undefined,
        actions: undefined,
    },
};

export const Dismiss: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Open dialog", }));
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

const renderIn = (theme: "light" | "dark") => (args: DialogProps) => (
    <ThemeShell theme={theme}>
        <Dialog {...args} />
    </ThemeShell>
);

// Pen Dialog token contract: the trigger focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead of the
// brand fill. Light discriminates; dark is non-discriminating (brand.500 and
// focus.ring both resolve green.500) and is not claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Open dialog", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineStyle).toBe("solid");
        await expect(style.outlineWidth).toBe("2px");
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen Dialog token contract: the modal surface resolves
// `semantic.surface.overlay` + `semantic.border.subtle` — both discriminating
// in each theme (the old common.50.background / common.200.divider step ramp).
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const surface = canvas.getByRole("dialog");
        const style = getComputedStyle(surface);

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
