import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { AlertDialog, type AlertDialogProps, } from "./alert-dialog";

const meta = {
    title: "Components/Overlays/Alert Dialog",
    component: AlertDialog,
    args: {
        title: "Delete component?",
        description: "Instances will lose their links to the master. This action cannot be undone.",
        trigger: "Delete component",
        confirmLabel: "Delete",
    },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const Destructive: Story = {
    args: {
        defaultOpen: true,
        destructive: true,
        title: "Delete component?",
        confirmLabel: "Delete",
    },
};

export const CustomIcon: Story = {
    args: { defaultOpen: true, icon: "shield-check", confirmLabel: "Continue", },
};

export const Cancel: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("alertdialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Delete component", }));
        await expect(canvas.getByRole("alertdialog")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Cancel", }));
        await expect(canvas.queryByRole("alertdialog")).toBeNull();
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

const renderIn = (theme: "light" | "dark") => (args: AlertDialogProps) => (
    <ThemeShell theme={theme}>
        <AlertDialog {...args} />
    </ThemeShell>
);

// Pen Alert Dialog token contract: the trigger focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead of the
// brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Delete component", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen Alert Dialog token contract: the modal surface resolves
// `semantic.surface.overlay` + `semantic.border.subtle` — both discriminating
// in each theme.
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const surface = canvas.getByRole("alertdialog");
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

// Pen Alert Dialog token contract: the destructive confirm resolves
// `action/danger-bg` (red.600 `rgb(220, 38, 38)`) + `action/danger-fg`
// (`rgb(255, 255, 255)`). The dark pair discriminates (old red.400 fill and
// red.950 text); the light fill does not (red.600 both) and is not claimed.
export const DestructiveDark: Story = {
    args: { defaultOpen: true, destructive: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const confirm = canvas.getByRole("button", { name: "Delete", });
        const style = getComputedStyle(confirm);

        await expect(style.backgroundColor).toBe("rgb(220, 38, 38)");
        await expect(style.color).toBe("rgb(255, 255, 255)");
    },
};

// Pen Alert Dialog token contract: the cancel action resolves
// `action/secondary-border` + `action/secondary-fg` — discriminating in each
// theme (old common.700.background border and common.50.text foreground).
const assertCancel = (border: string, color: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const cancel = canvas.getByRole("button", { name: "Cancel", });
    const style = getComputedStyle(cancel);

    await expect(style.borderColor).toBe(border);
    await expect(style.color).toBe(color);
};

export const CancelRolesLight: Story = {
    args: { defaultOpen: true, },
    render: renderIn("light"),
    play: assertCancel("rgb(100, 116, 139)", "rgb(30, 41, 59)"),
};

export const CancelRolesDark: Story = {
    args: { defaultOpen: true, },
    render: renderIn("dark"),
    play: assertCancel("rgb(148, 163, 184)", "rgb(241, 245, 249)"),
};
