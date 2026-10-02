import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { NavItem, } from "./nav-item";

const bar = css({
    display: "flex",
    alignItems: "center",
    gap: "x2",
    padding: "x4",
    borderRadius: "sm",
    backgroundColor: "semantic.common.50.background",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.common.200.divider",
});

const column = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "x2",
});

const meta = {
    title: "Components/Navigation & disclosure/Nav Item",
    component: NavItem,
    args: { href: "#", label: "Overview", },
} satisfies Meta<typeof NavItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States: Story = {
    render: () => (
        <div className={column}>
            <NavItem href="#" label="Default" />
            <NavItem href="#" label="Current" active />
            <NavItem href="#" label="With icon" icon="gauge" />
            <NavItem href="#" label="Disabled" disabled />
        </div>
    ),
};

export const InBar: Story = {
    render: () => (
        <div className={bar}>
            <NavItem href="#" label="Overview" active />
            <NavItem href="#" label="Components" />
            <NavItem href="#" label="Pricing" />
        </div>
    ),
};
