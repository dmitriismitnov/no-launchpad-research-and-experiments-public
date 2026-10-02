import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Tour, } from "./tour";

const steps = [
    { title: "Welcome to No Launchpad", body: "This short tour covers the three essentials.", },
    { title: "Compose from tokens", body: "Every component reads foundation variables.", },
    { title: "Publish with confidence", body: "The same tokens drive light and dark.", },
] as const;

const meta = {
    title: "Components/Overlays/Tour",
    component: Tour,
    args: {
        steps,
        trigger: "Start tour",
    },
} satisfies Meta<typeof Tour>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, defaultStep: 1, },
};

export const FinalStep: Story = {
    args: { defaultOpen: true, defaultStep: 2, },
};

export const Right: Story = {
    args: { defaultOpen: true, placement: "right", },
};

export const Advance: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(canvas.getByRole("button", { name: "Start tour", }));
        await expect(canvas.getByText("Step 1 of 3")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Next", }));
        await expect(canvas.getByText("Step 2 of 3")).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Skip tour", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};
