import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { SidebarItem, } from "./sidebar-item";

const rail = css({
    display: "flex",
    flexDirection: "column",
    gap: "x1",
    width: "200px",
    padding: "x4",
    borderRadius: "md",
    backgroundColor: "semantic.common.50.background",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.common.200.divider",
});

const meta = {
    title: "Components/Navigation & disclosure/Sidebar Item",
    component: SidebarItem,
    args: { href: "#", label: "Dashboard", icon: "layout-grid", },
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
    render: () => (
        <div className={rail}>
            <SidebarItem href="#" label="Dashboard" icon="layout-grid" active />
            <SidebarItem href="#" label="Tokens" icon="sliders-horizontal" />
            <SidebarItem href="#" label="Components" icon="settings" />
            <SidebarItem href="#" label="Archived" icon="file" disabled />
        </div>
    ),
};
