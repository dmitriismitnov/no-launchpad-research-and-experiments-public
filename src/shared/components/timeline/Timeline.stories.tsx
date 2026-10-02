import type { Meta, StoryObj, } from "@storybook/react-vite";

import { Timeline, } from "./timeline";

const meta = {
    title: "Components/Data display/Timeline",
    component: Timeline,
    args: {
        items: [
            { title: "Foundation published", meta: "Mar 2", },
            { title: "Components in review", meta: "In progress", },
            { title: "States catalogue", meta: "Upcoming", },
            { title: "Contrast audit", meta: "Failed", },
        ],
    },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Short: Story = {
    args: {
        items: [
            { title: "Draft created", meta: "Owner: Ada", },
            { title: "Ready to merge", meta: "All checks green", },
        ],
    },
};

export const Single: Story = {
    args: { items: [ { title: "Release cut", meta: "v1.0.0", }, ], },
};
