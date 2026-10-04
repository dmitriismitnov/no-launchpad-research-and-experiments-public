import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { MenuDivider, MenuItem, } from "@shared/components/menu";
import { css, } from "@shared/styled-system/css";

import { ContextMenu, type ContextMenuProps, } from "./context-menu";

const meta = {
    title: "Components/Navigation & disclosure/Context Menu",
    component: ContextMenu,
    args: {
        label: "Actions",
        trigger: "Right-click area",
        children: (
            <>
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuItem label="Duplicate" shortcut="⌘D" />
                <MenuDivider />
                <MenuItem label="Delete" tone="danger" />
            </>
        ),
    },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, x: 24, y: 24, },
};

export const States: Story = {
    args: {
        defaultOpen: true,
        children: (
            <>
                <MenuItem label="Default" />
                <MenuItem label="Checked" checked />
                <MenuItem label="Submenu" submenu />
                <MenuItem label="Disabled" disabled />
            </>
        ),
    },
};

export const RightClick: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("Right-click area");

        await expect(canvas.queryByRole("menu")).toBeNull();
        await fireEvent.contextMenu(trigger);
        await expect(canvas.getByRole("menu")).toBeTruthy();
        await expect(canvas.getByRole("menuitem", { name: /Rename/, })).toBeTruthy();
    },
};

// Regression: `Escape` closes an open surface through the root key handler.
export const Escape: Story = {
    args: { defaultOpen: true, },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("menu")).toBeTruthy();
        await fireEvent.keyDown(canvas.getByRole("menu"), { key: "Escape", });
        await expect(canvas.queryByRole("menu")).toBeNull();
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

const renderIn = (theme: "light" | "dark") => (args: ContextMenuProps) => (
    <ThemeShell theme={theme}>
        <ContextMenu {...args} />
    </ThemeShell>
);

// Pen `rokhq` / doc `w7EbR`: the trigger chrome resolves `semantic.surface.raised`
// and `semantic.border.subtle` — both discriminating in each theme (the old
// common step ramp resolves neutral.50 / neutral.300 light and neutral.950 /
// neutral.700 dark).
const assertTriggerSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const trigger = canvasElement.querySelector(".contextMenu__trigger") as Element;
        const style = getComputedStyle(trigger);
        await expect(style.backgroundColor).toBe(background);
        await expect(style.borderColor).toBe(border);
    };

export const TriggerSurfaceLight: Story = {
    render: renderIn("light"),
    play: assertTriggerSurface("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const TriggerSurfaceDark: Story = {
    render: renderIn("dark"),
    play: assertTriggerSurface("rgb(15, 23, 42)", "rgb(30, 41, 59)"),
};
