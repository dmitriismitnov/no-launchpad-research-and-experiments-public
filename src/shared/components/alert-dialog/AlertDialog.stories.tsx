import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { AlertDialog, } from "./alert-dialog";

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
