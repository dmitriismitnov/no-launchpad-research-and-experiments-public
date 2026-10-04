import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { Button, } from "@shared/components/button";
import { ButtonIcon, } from "@shared/components/button-icon";
import { css, } from "@shared/styled-system/css";

import { Popover, type PopoverProps, } from "./popover";

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

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: PopoverProps) => (
    <ThemeShell theme={theme}>
        <Popover {...args} />
    </ThemeShell>
);

// Pen `Qwced` / doc `H8KJm` token contract `q36Cjg`: the trigger focus indicator
// resolves `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead
// of the brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "Open popover", });

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineStyle).toBe("solid");
        await expect(style.outlineWidth).toBe("2px");
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};

// Pen `Qwced` / doc `H8KJm`: the light overlay surface resolves
// `semantic.surface.overlay` + `semantic.border.subtle` at the `lg` (16px)
// radius. Both discriminate light and dark (old common.50 / common.200.divider +
// `md`).
const assertSurface =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const surface = canvas.getByRole("dialog");
        const style = getComputedStyle(surface);

        await expect(style.backgroundColor).toBe(background);
        await expect(style.borderColor).toBe(border);
        await expect(style.borderRadius).toBe("16px");
    };

export const SurfaceLight: Story = {
    args: { defaultOpen: true, },
    render: renderIn("light"),
    play: assertSurface("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const SurfaceDark: Story = {
    args: { defaultOpen: true, },
    render: renderIn("dark"),
    play: assertSurface("rgb(30, 41, 59)", "rgb(30, 41, 59)"),
};
