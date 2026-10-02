import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";

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

// A public Button is cloned in place: it stays the single interactive node and
// opens the surface. A pointer press on a sibling outside closes it.
export const ComposedTrigger: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", }}>
            <Popover
                trigger={<Button>Composed</Button>}
                title="Notifications"
                description="Choose what you want to hear about."
            >
                <p>Content</p>
            </Popover>
            <button type="button">Outside</button>
        </div>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Composed", });

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.pointerDown(canvas.getByRole("button", { name: "Outside", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

// A composed trigger keeps its own click behaviour; preventing the default
// stops the Popover from toggling.
export const PreventedTrigger: Story = {
    render: () => (
        <Popover trigger={<Button onClick={(event) => event.preventDefault()}>Blocked</Button>}>
            Body
        </Popover>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Blocked", }));
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

// A public ButtonIcon is composed the same way: one interactive node, named by
// its own label, that opens the surface.
export const ComposedIconTrigger: Story = {
    render: () => (
        <Popover trigger={<ButtonIcon icon="settings" label="Settings" />} title="Settings">
            <p>Content</p>
        </Popover>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Settings", });

        await expect(canvas.queryByRole("dialog")).toBeNull();
        await fireEvent.click(trigger);
        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    },
};

// Escape closes the open surface.
export const EscapeClose: Story = {
    args: { defaultOpen: true, },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await fireEvent.keyDown(canvas.getByRole("button", { name: "Open popover", }), {
            key: "Escape",
        });
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};
