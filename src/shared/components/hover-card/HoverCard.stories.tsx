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

// Consumer pointer and focus handlers compose with the internal open/close
// boundary instead of being overwritten.
const HandlersProbe = () => {
    const [ counts, setCounts, ] = useState({ enter: 0, leave: 0, focus: 0, blur: 0, });
    const bump = (key: keyof typeof counts) => setCounts((previous) => ( { ...previous, [key]: previous[key] + 1, } ));

    return (
        <div className={shell}>
            <HoverCard
                name="Ada Rivera"
                role="Design Systems Lead"
                bio="Maintains the foundation layer and reviews component proposals."
                onPointerEnter={() => bump("enter")}
                onPointerLeave={() => bump("leave")}
                onFocus={() => bump("focus")}
                onBlur={() => bump("blur")}
            >
                @adarivera
            </HoverCard>
            <span data-testid="enter-count">{counts.enter}</span>
            <span data-testid="leave-count">{counts.leave}</span>
            <span data-testid="focus-count">{counts.focus}</span>
            <span data-testid="blur-count">{counts.blur}</span>
        </div>
    );
};

export const ComposedHandlers: Story = {
    render: () => <HandlersProbe />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await fireEvent.pointerOver(trigger);
        await expect(canvas.getByTestId("enter-count")).toHaveTextContent("1");
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.pointerOut(trigger);
        await expect(canvas.getByTestId("leave-count")).toHaveTextContent("1");
        await expect(canvas.queryByRole("dialog")).toBeNull();

        await fireEvent.focusIn(trigger);
        await expect(canvas.getByTestId("focus-count")).toHaveTextContent("1");
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.focusOut(trigger);
        await expect(canvas.getByTestId("blur-count")).toHaveTextContent("1");
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

// Escape hides the open preview.
export const EscapeClose: Story = {
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("@adarivera");

        await fireEvent.pointerOver(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.keyDown(trigger, { key: "Escape", });
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};
