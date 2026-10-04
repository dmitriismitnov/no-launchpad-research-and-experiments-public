import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Tooltip, type TooltipProps, } from "./tooltip";

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

const renderIn = (theme: "light" | "dark") => (args: TooltipProps) => (
    <ThemeShell theme={theme}>
        <Tooltip {...args} />
    </ThemeShell>
);

// Pen `eEhwI` / doc `UO5oQ` token contract `EOGvS`: the trigger focus indicator
// resolves `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`) instead
// of the brand fill. Light discriminates; dark is non-discriminating and is not
// claimed.
export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByText("Copy");

        await user.tab();
        await expect(trigger).toHaveFocus();

        const style = getComputedStyle(trigger);
        await expect(style.outlineStyle).toBe("solid");
        await expect(style.outlineWidth).toBe("2px");
        await expect(style.outlineColor).toBe("rgb(22, 163, 74)");
    },
};
