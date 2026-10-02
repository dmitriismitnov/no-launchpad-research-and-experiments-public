import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";

import { Drawer, } from "./drawer";

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
