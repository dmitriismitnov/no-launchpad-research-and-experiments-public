import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Avatar, } from "./avatar";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
});

const meta = {
    title: "Components/Data display/Avatar",
    component: Avatar,
    args: { name: "Alice Ryder", },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Sizes: Story = {
    render: () => (
        <div className={row}>
            <Avatar name="Alice Ryder" size="sm" />
            <Avatar name="Alice Ryder" size="md" />
            <Avatar name="Alice Ryder" size="lg" />
        </div>
    ),
};

export const Image: Story = {
    args: {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2316A34A'/%3E%3C/svg%3E",
    },
};

export const Presence: Story = {
    render: () => (
        <div className={row}>
            <Avatar name="Alice Ryder" presence="online" />
            <Avatar name="Alice Ryder" presence="away" />
            <Avatar name="Alice Ryder" presence="busy" />
            <Avatar name="Alice Ryder" presence="offline" />
        </div>
    ),
};
