import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { TreeItem, type TreeItemProps, } from "./tree-item";

const tree = css({
    display: "flex",
    flexDirection: "column",
    width: "280px",
});

const meta = {
    title: "Components/Navigation & disclosure/Tree Item",
    component: TreeItem,
    decorators: [
        (Story) => (
            <div role="tree" className={tree}>
                <Story />
            </div>
        ),
    ],
    args: {
        label: "Foundation",
        icon: "folder",
    },
} satisfies Meta<typeof TreeItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Leaf: Story = {
    args: { label: "Button", icon: "layout-grid", },
};

export const Tree: Story = {
    render: () => (
        <TreeItem label="Foundation" icon="folder" defaultExpanded>
            <TreeItem label="Primitive tokens" icon="palette" />
            <TreeItem label="Semantic tokens" icon="palette" selected />
            <TreeItem label="Components" icon="folder">
                <TreeItem label="Button" icon="layout-grid" />
                <TreeItem label="Select" icon="layout-grid" disabled />
            </TreeItem>
        </TreeItem>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const selected = canvas.getByText("Semantic tokens").closest('[role="treeitem"]');

        await expect(canvas.getByRole("button", { name: "Collapse Foundation", })).toBeTruthy();
        await expect(selected?.getAttribute("aria-selected")).toBe("true");
    },
};

export const Collapsed: Story = {
    render: () => (
        <TreeItem label="Components" icon="folder">
            <TreeItem label="Button" icon="layout-grid" />
        </TreeItem>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const expander = canvas.getByRole("button", { name: "Expand Components", });

        await expect(canvas.queryByRole("button", { name: "Button", })).toBeNull();
        await fireEvent.click(expander);
        await expect(canvas.getByRole("button", { name: "Button", })).toBeTruthy();
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

const renderIn = (theme: "light" | "dark") => (args: TreeItemProps) => (
    <ThemeShell theme={theme}>
        <TreeItem {...args} />
    </ThemeShell>
);

// Pen `RFehj` token contract `f4wq6`: focus/ring resolves green.600 light
// (`rgb(22, 163, 74)`) and green.500 dark (`rgb(34, 197, 94)`) on the row's
// `:focus-within` ring. Only light is discriminating: in dark the old brand
// fill and focus/ring both resolve green.500, so `FocusVisibleDark` is
// non-discriminating.
const assertRowFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const content = canvas.getByRole("button", { name: "Button", });
    const row = content.closest(".treeItem__row") as HTMLElement;

    await user.tab();
    await expect(content).toHaveFocus();

    const style = getComputedStyle(row);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const FocusVisibleLight: Story = {
    args: { label: "Button", icon: "layout-grid", },
    render: renderIn("light"),
    play: assertRowFocusRing("rgb(22, 163, 74)"),
};

export const FocusVisibleDark: Story = {
    args: { label: "Button", icon: "layout-grid", },
    render: renderIn("dark"),
    play: assertRowFocusRing("rgb(34, 197, 94)"),
};
