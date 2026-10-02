import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";

import { Dialog, } from "./dialog";

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
