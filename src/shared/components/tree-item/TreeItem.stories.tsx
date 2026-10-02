import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { TreeItem, } from "./tree-item";

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
