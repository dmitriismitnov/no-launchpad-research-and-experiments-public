import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Button, } from "@shared/components/button";
import { css, } from "@shared/styled-system/css";

import { Brand, } from "@shared/components/brand";
import { NavItem, } from "@shared/components/nav-item";

import { TopNavigation, } from "./top-navigation";

const bar = css({
    display: "flex",
    flexDirection: "column",
    gap: "x4",
});

const wrap = css({ width: "100%", });

const meta = {
    title: "Components/Navigation & disclosure/Top Navigation",
    component: TopNavigation,
    args: {
        brand: <Brand />,
        nav: (
            <>
                <NavItem href="#" label="Overview" active />
                <NavItem href="#" label="Components" />
                <NavItem href="#" label="Pricing" />
            </>
        ),
        actions: (
            <>
                <NavItem href="#" label="Sign in" />
                <Button size="sm">Get started</Button>
            </>
        ),
    },
    decorators: [
        (Story) => (
            <div className={wrap}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TopNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Transparent: Story = {
    args: { surface: "transparent", },
};

export const WithoutActions: Story = {
    args: { actions: undefined, },
};

export const Stack: Story = {
    render: (args) => (
        <div className={bar}>
            <TopNavigation {...args} />
            <TopNavigation {...args} surface="transparent" />
        </div>
    ),
};
