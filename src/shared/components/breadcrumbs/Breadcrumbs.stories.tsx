import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Breadcrumbs, } from "./breadcrumbs";

const trail = [
    { label: "Foundation", href: "#", },
    { label: "Components", href: "#", },
    { label: "Button", },
] as const;

const meta = {
    title: "Components/Navigation & disclosure/Breadcrumbs",
    component: Breadcrumbs,
    args: { items: trail, },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCrumb: Story = {
    args: { items: [ { label: "Home", }, ], },
};

export const CustomSeparator: Story = {
    args: { items: trail, separatorIcon: "arrow-right", },
};
