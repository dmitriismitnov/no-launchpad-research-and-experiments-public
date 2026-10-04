import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Pagination, type PaginationProps, } from "./pagination";

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

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: PaginationProps) => (
    <ThemeShell theme={theme}>
        <Pagination {...args} />
    </ThemeShell>
);

// Pen `DdvJi` master / `yQPcK` token contract: the focus-visible specimen
// (`bPKuW`/`LLO1f`) resolves `focus/ring` — green.600 light (`rgb(22, 163, 74)`)
// and green.500 dark (`rgb(34, 197, 94)`) — with the shared 2px geometry. Only
// light is discriminating: in dark the old brand fill and `focus/ring` both
// resolve green.500, so `FocusVisibleDark` is non-discriminating.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const previous = canvas.getByRole("button", { name: "Previous page", });

    await user.tab();
    await expect(previous).toHaveFocus();

    const style = getComputedStyle(previous);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: assertFocusRing("rgb(22, 163, 74)"),
};

export const FocusVisibleDark: Story = {
    render: renderIn("dark"),
    play: assertFocusRing("rgb(34, 197, 94)"),
};
