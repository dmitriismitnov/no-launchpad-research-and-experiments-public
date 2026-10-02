import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { MenuDivider, MenuItem, } from "@shared/components/menu";

import { ContextMenu, } from "./context-menu";

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
