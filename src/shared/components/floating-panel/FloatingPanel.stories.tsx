import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { FloatingPanel, type FloatingPanelProps, } from "./floating-panel";

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

const renderIn = (theme: "light" | "dark") => (args: FloatingPanelProps) => (
    <ThemeShell theme={theme}>
        <FloatingPanel {...args} />
    </ThemeShell>
);

// Pen `J3VmmT` / doc `y3lqjy`: the panel surface resolves
// `semantic.surface.overlay` + `semantic.border.subtle` at the `lg` (16px)
// radius. Both discriminate light and dark (old common.50 / common.200.divider +
// `md`).
const assertPanel =
    (background: string, border: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
        const canvas = within(canvasElement);
        const panel = canvas.getByRole("region");
        const style = getComputedStyle(panel);

        await expect(style.backgroundColor).toBe(background);
        await expect(style.borderColor).toBe(border);
        await expect(style.borderRadius).toBe("16px");
    };

export const PanelLight: Story = {
    args: { defaultOpen: true, children: <p>Light panel.</p>, },
    render: renderIn("light"),
    play: assertPanel("rgb(255, 255, 255)", "rgb(226, 232, 240)"),
};

export const PanelDark: Story = {
    args: { defaultOpen: true, children: <p>Dark panel.</p>, },
    render: renderIn("dark"),
    play: assertPanel("rgb(30, 41, 59)", "rgb(30, 41, 59)"),
};

// Pen `J3VmmT` / doc `y3lqjy` token contract `yt0ku`: the trigger, collapse and
// close focus indicators resolve `semantic.focus.ring` — green.600 light
// (`rgb(22, 163, 74)`) instead of the brand fill. Light discriminates; dark is
// non-discriminating and is not claimed.
const assertFocus = (name: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const control = canvas.getByRole("button", { name, });

    await user.tab();
    await expect(control).toHaveFocus();

    const style = getComputedStyle(control);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
};

export const TriggerFocusVisibleLight: Story = {
    render: renderIn("light"),
    play: assertFocus("Open panel"),
};

export const CollapseFocusVisibleLight: Story = {
    args: { defaultOpen: true, collapsible: true, children: <p>Body.</p>, },
    render: (args: FloatingPanelProps) => (
        <ThemeShell theme="light">
            <FloatingPanel {...args} trigger={undefined} />
        </ThemeShell>
    ),
    play: assertFocus("Collapse panel"),
};

export const CloseFocusVisibleLight: Story = {
    args: { defaultOpen: true, children: <p>Body.</p>, },
    render: (args: FloatingPanelProps) => (
        <ThemeShell theme="light">
            <FloatingPanel {...args} trigger={undefined} />
        </ThemeShell>
    ),
    play: assertFocus("Close"),
};
