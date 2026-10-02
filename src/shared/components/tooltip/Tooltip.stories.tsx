import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Tooltip, } from "./tooltip";

const meta = {
    title: "Components/Overlays/Tooltip",
    component: Tooltip,
    args: {
        label: "Duplicate",
        children: "Copy",
    },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithShortcut: Story = {
    args: { label: "Command palette", shortcut: "⌘K", },
};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const Placements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "4rem", padding: "4rem", }}>
            <Tooltip label="Top" placement="top" defaultOpen>Top</Tooltip>
            <Tooltip label="Right" placement="right" defaultOpen>Right</Tooltip>
            <Tooltip label="Bottom" placement="bottom" defaultOpen>Bottom</Tooltip>
            <Tooltip label="Left" placement="left" defaultOpen>Left</Tooltip>
        </div>
    ),
};

export const Hover: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("Copy");

        await expect(canvas.queryByRole("tooltip")).toBeNull();
        await fireEvent.mouseOver(trigger);
        await expect(canvas.getByRole("tooltip")).toBeTruthy();
        await fireEvent.mouseOut(trigger);
        await expect(canvas.queryByRole("tooltip")).toBeNull();
    },
};
