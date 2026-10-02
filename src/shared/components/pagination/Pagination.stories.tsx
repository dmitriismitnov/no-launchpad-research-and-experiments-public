import type { Meta, StoryObj, } from "@storybook/react-vite";
import { useState, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { Pagination, } from "./pagination";

const PaginationDemo = ({ totalPages = 8, }: { totalPages?: number; }) => {
    const [ page, setPage, ] = useState(1);

    return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
};

const meta = {
    title: "Components/Navigation & disclosure/Pagination",
    component: Pagination,
    args: { page: 2, totalPages: 8, },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
    args: { page: 1, },
};

export const LastPage: Story = {
    args: { page: 8, },
};

export const Compact: Story = {
    args: { page: 3, totalPages: 4, },
};

export const Interactive: Story = {
    render: () => <PaginationDemo />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Next page", }));

        await expect(canvas.getByText("2")).toHaveAttribute("aria-current", "page");
    },
};
