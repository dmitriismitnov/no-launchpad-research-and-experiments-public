import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { FloatingPanel, } from "./floating-panel";

const meta = {
    title: "Components/Overlays/Floating Panel",
    component: FloatingPanel,
    args: {
        title: "Canvas controls",
        trigger: "Open panel",
    },
} satisfies Meta<typeof FloatingPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: {
        defaultOpen: true,
        children: <p>Snap to grid and show rulers live here.</p>,
    },
};

export const Collapsible: Story = {
    args: {
        defaultOpen: true,
        collapsible: true,
        children: <p>Collapse hides this body.</p>,
    },
};

export const TopLeft: Story = {
    args: {
        defaultOpen: true,
        placement: "top-left",
        children: <p>Pinned to the top-left corner.</p>,
    },
};

export const Collapse: Story = {
    args: {
        collapsible: true,
        children: <p>Collapse hides this body.</p>,
    },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("region")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Open panel", }));
        await expect(canvas.getByRole("region")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Collapse panel", }));
        await expect(canvas.getByRole("button", { name: "Expand panel", })).toBeTruthy();
    },
};
