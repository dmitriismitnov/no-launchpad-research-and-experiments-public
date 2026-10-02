import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { HoverCard, } from "./hover-card";

const meta = {
    title: "Components/Overlays/Hover Card",
    component: HoverCard,
    args: {
        name: "Ada Rivera",
        role: "Design Systems Lead",
        bio: "Maintains the foundation layer and reviews component proposals.",
        children: "@adarivera",
    },
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
};

export const WithActions: Story = {
    args: {
        defaultOpen: true,
        actions: <button type="button">Follow</button>,
    },
};

export const Placements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "4rem", padding: "8rem", }}>
            <HoverCard name="Ada Rivera" placement="right" defaultOpen>@adarivera</HoverCard>
            <HoverCard name="Kai Nakamura" placement="top" defaultOpen>@kainakamura</HoverCard>
        </div>
    ),
};

export const Hover: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await expect(canvas.queryByRole("tooltip")).toBeNull();
        await fireEvent.mouseOver(trigger);
        await expect(canvas.getByRole("tooltip")).toBeTruthy();
        await expect(canvas.getByText("Ada Rivera")).toBeTruthy();
    },
};
