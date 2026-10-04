import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { RatingProps, } from "./rating";
import { Rating, } from "./rating";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: RatingProps) => (
    <ThemeShell theme={theme}>
        <Rating {...args} />
    </ThemeShell>
);

// The PEN reference (`Rating`, id `qIRY3`).
const reference: RatingProps = {
    defaultValue: 4,
    showValue: true,
};

const meta = {
    title: "Components/Forms & selection/Rating",
    component: Rating,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "max", "size", "showValue", "readOnly", "disabled", ],
        },
    },
    argTypes: {
        max: { control: { type: "number", }, },
        size: { control: { type: "select", options: [ "sm", "md", "lg", ], }, },
        showValue: { control: { type: "boolean", }, },
        readOnly: { control: { type: "boolean", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        defaultValue: 4,
        max: 5,
        size: "md",
        showValue: true,
        readOnly: false,
        disabled: false,
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "4 of 5", })).toHaveAttribute(
            "aria-checked",
            "true",
        );
    },
};

export const Interactive: Story = {
    args: { defaultValue: 4, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const second = canvas.getByRole("radio", { name: "2 of 5", });

        await fireEvent.click(second);
        await expect(second).toHaveAttribute("aria-checked", "true");
        await expect(canvas.getByRole("radio", { name: "4 of 5", })).toHaveAttribute(
            "aria-checked",
            "false",
        );
    },
};

export const HoverPreview: Story = {
    args: { defaultValue: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const third = canvas.getByRole("radio", { name: "3 of 5", });

        await fireEvent.mouseOver(third);
        await expect(third).toHaveClass(/rating__star--filled_true/);
    },
};

export const Keyboard: Story = {
    args: { defaultValue: 2, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const second = canvas.getByRole("radio", { name: "2 of 5", });

        second.focus();
        await fireEvent.keyDown(second, { key: "ArrowRight", });
        await expect(canvas.getByRole("radio", { name: "3 of 5", })).toHaveAttribute(
            "aria-checked",
            "true",
        );
    },
};

export const ReadOnly: Story = {
    args: { value: 4, readOnly: true, showValue: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("img", { name: "4 out of 5", })).toBeTruthy();
    },
};

export const Disabled: Story = {
    args: { value: 4, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("img", { name: "4 out of 5", })).toBeTruthy();
    },
};

// Regression coverage of the documented semantics (Pen `PxfEf`): score and
// maximum, arrow keys, value label and the read-only text projection. The
// Rating implementation is untouched this cycle.
export const Semantics: Story = {
    args: { defaultValue: 4, max: 5, showValue: true, label: "Оценка", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const fourth = canvas.getByRole("radio", { name: "4 of 5", });

        await expect(fourth).toHaveAttribute("aria-checked", "true");
        await expect(canvasElement.textContent).toContain("4 / 5");

        fourth.focus();
        await user.keyboard("{ArrowRight}");
        await expect(canvas.getByRole("radio", { name: "5 of 5", })).toHaveAttribute(
            "aria-checked",
            "true",
        );
        await expect(canvasElement.textContent).toContain("5 / 5");
    },
};

export const DarkSemantics: Story = {
    args: { defaultValue: 4, max: 5, showValue: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "4 of 5", })).toHaveAttribute(
            "aria-checked",
            "true",
        );
        await expect(canvasElement.textContent).toContain("4 / 5");
    },
};

const assertThemeStar = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    color: string,
): Promise<void> => {
    const filled = canvasElement.querySelector("[class*='rating__star--filled_true']") as Element;

    await expect(getComputedStyle(filled).color).toBe(color);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeStar(context, "rgb(15, 23, 42)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeStar(context, "rgb(248, 250, 252)"),
};
