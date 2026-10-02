import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Brand, } from "./brand";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x12",
    flexWrap: "wrap",
});

const meta = {
    title: "Components/Navigation & disclosure/Brand",
    component: Brand,
} satisfies Meta<typeof Brand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomName: Story = {
    args: { name: "Acme", },
};

export const Pair: Story = {
    render: () => (
        <div className={row}>
            <Brand />
            <Brand name="Acme" />
        </div>
    ),
};
