import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Tab, TabList, } from "./tab";

const panel = css({
    paddingBlock: "x6",
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    color: "semantic.common.700.background",
});

const meta = {
    title: "Components/Navigation & disclosure/Tab",
    component: Tab,
    args: { label: "Overview", },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
    args: { active: true, },
};

export const WithIcon: Story = {
    args: { icon: "layout-grid", },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

export const Row: Story = {
    render: () => (
        <div>
            <TabList>
                <Tab label="Overview" active />
                <Tab label="Tokens" />
                <Tab label="Components" icon="settings" />
                <Tab label="Archived" disabled />
            </TabList>
            <p className={panel}>Panel content for the active tab.</p>
        </div>
    ),
};
