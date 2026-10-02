import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, within, } from "storybook/test";

import { Menu, MenuDivider, MenuItem, } from "./menu";

const meta = {
    title: "Components/Navigation & disclosure/Menu",
    component: Menu,
    args: {
        label: "Actions",
        children: (
            <>
                <MenuItem label="Rename" shortcut="⌘R" />
                <MenuItem label="Duplicate" shortcut="⌘D" />
                <MenuItem label="Export" icon="file" submenu />
                <MenuDivider />
                <MenuItem label="Delete" tone="danger" />
            </>
        ),
    },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
    args: {
        label: undefined,
        children: (
            <>
                <MenuItem label="Default" shortcut="⌘D" />
                <MenuItem label="Checked" checked />
                <MenuItem label="With icon" icon="settings" />
                <MenuItem label="Submenu" submenu />
                <MenuItem label="Disabled" disabled />
            </>
        ),
    },
};

export const Grouped: Story = {
    args: {
        label: "Foundation",
        children: (
            <>
                <MenuItem label="Primitive tokens" />
                <MenuItem label="Semantic tokens" checked />
                <MenuDivider />
                <MenuItem label="Button" />
                <MenuItem label="Select" submenu />
            </>
        ),
    },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("menu")).toBeTruthy();
        await expect(canvas.getByRole("menuitem", { name: /Semantic tokens/, })).toBeTruthy();
    },
};
