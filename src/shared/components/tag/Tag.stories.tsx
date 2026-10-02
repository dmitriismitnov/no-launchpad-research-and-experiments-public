import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Tag, } from "./tag";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x6",
});

const meta = {
    title: "Components/Data display/Tag",
    component: Tag,
    args: { label: "Design", },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dismissible: Story = {
    args: { onClose: () => {}, },
};

export const Group: Story = {
    render: () => (
        <div className={row}>
            <Tag label="Design" onClose={() => {}} />
            <Tag label="Engineering" onClose={() => {}} />
            <Tag label="Research" onClose={() => {}} />
        </div>
    ),
};
