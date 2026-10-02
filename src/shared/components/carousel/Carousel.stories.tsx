import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Carousel, } from "./carousel";

const slides = [
    { label: "Overview", icon: "image", },
    { label: "Tokens", icon: "image", },
    { label: "Components", icon: "image", },
] as const;

const meta = {
    title: "Components/Navigation & disclosure/Carousel",
    component: Carousel,
    args: { slides, },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("group", { name: /1 of 3/, })).toBeTruthy();
        await fireEvent.click(canvas.getByRole("button", { name: "Next slide", }));
        await expect(canvas.getByRole("group", { name: /2 of 3/, })).toBeTruthy();
    },
};

export const LastSlide: Story = {
    args: { current: 2, },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

export const CustomContent: Story = {
    args: {
        slides: [
            { label: "Release notes", content: <strong>Version 2.0</strong>, },
            { label: "Roadmap", content: <strong>Semantic tokens</strong>, },
        ],
    },
};
