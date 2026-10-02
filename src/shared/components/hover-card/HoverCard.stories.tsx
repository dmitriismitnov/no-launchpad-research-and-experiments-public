import type { Meta, StoryObj, } from "@storybook/react-vite";
import { useState, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { HoverCard, } from "./hover-card";

const shell = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "x8",
    padding: "x12",
});

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

// The trigger and the surface share one pointer boundary, so leaving the trigger
// for the surface must keep the card open.
const BoundaryProbe = () => (
    <div className={shell}>
        <HoverCard
            name="Ada Rivera"
            role="Design Systems Lead"
            bio="Maintains the foundation layer and reviews component proposals."
        >
            @adarivera
        </HoverCard>
        <button type="button">Outside</button>
    </div>
);

export const PointerBoundary: Story = {
    render: () => <BoundaryProbe />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.pointerOver(trigger);

        const surface = canvas.getByRole("dialog");

        // Moving onto the surface is still inside the root interaction boundary.
        await fireEvent.pointerOut(trigger, { relatedTarget: surface, });
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        // A pointer press outside the root closes it.
        await fireEvent.pointerDown(canvas.getByRole("button", { name: "Outside", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

// Focusing the trigger opens the card, and an action inside the interactive
// surface stays open and remains clickable.
const FocusProbe = () => {
    const [ followed, setFollowed, ] = useState(false);

    return (
        <div className={shell}>
            <HoverCard
                name="Ada Rivera"
                role="Design Systems Lead"
                bio="Maintains the foundation layer and reviews component proposals."
                actions={
                    <button type="button" onClick={() => setFollowed(true)}>
                        {followed ? "Following" : "Follow"}
                    </button>
                }
            >
                @adarivera
            </HoverCard>
        </div>
    );
};

export const FocusAndAction: Story = {
    render: () => <FocusProbe />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await fireEvent.focusIn(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.click(canvas.getByRole("button", { name: "Follow", }));
        await expect(canvas.getByRole("button", { name: "Following", })).toBeTruthy();
        await expect(canvas.getByRole("dialog")).toBeTruthy();
    },
};

export const Hover: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.pointerOver(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await expect(canvas.getByText("Ada Rivera")).toBeTruthy();
    },
};
