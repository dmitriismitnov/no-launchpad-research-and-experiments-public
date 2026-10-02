import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Skeleton, } from "./skeleton";

const stack = css({ display: "flex", flexDirection: "column", gap: "x6", width: "240px", });

const meta = {
    title: "Components/Feedback & status/Skeleton",
    component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Paragraph: Story = {
    render: () => (
        <div className={stack}>
            <Skeleton style={{ width: "100%", height: "0.75rem", }} />
            <Skeleton style={{ width: "100%", height: "0.75rem", }} />
            <Skeleton style={{ width: "60%", height: "0.75rem", }} />
        </div>
    ),
};

export const Avatar: Story = {
    render: () => <Skeleton style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", }} />,
};
