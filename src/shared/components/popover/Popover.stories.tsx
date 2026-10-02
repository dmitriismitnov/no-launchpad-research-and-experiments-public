import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";

import { Popover, } from "./popover";

const meta = {
    title: "Components/Overlays/Popover",
    component: Popover,
    args: {
        trigger: "Open popover",
        title: "Notifications",
        description: "Choose what you want to hear about.",
    },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const WithContent: Story = {
    args: {
        defaultOpen: true,
        title: "Subscribe",
        description: "Get the changelog in your inbox.",
        children: (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", }}>
                <input defaultValue="name@acme.dev" aria-label="Email" />
                <Button size="sm">Subscribe</Button>
            </div>
        ),
    },
};

export const Placements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "12rem", padding: "8rem", }}>
            <Popover trigger="Bottom" placement="bottom" title="Bottom" defaultOpen>Body</Popover>
            <Popover trigger="Right" placement="right" title="Right" defaultOpen>Body</Popover>
        </div>
    ),
};

export const Toggle: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Open popover", });

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await fireEvent.click(trigger);
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};
