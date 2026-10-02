import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";

import { Sheet, } from "./sheet";

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
