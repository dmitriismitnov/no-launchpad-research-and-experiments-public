import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Textarea, type TextareaProps, } from "./textarea";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "320px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: TextareaProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Textarea {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Textarea`, id `w6oNZ7`) with its counter footer.
const reference: TextareaProps = {
    label: "ОПИСАНИЕ",
    placeholder: "Write a short description",
    maxLength: 200,
};

const meta = {
    title: "Components/Forms & selection/Textarea",
    component: Textarea,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "placeholder", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ОПИСАНИЕ",
        placeholder: "Write a short description",
        invalid: false,
        error: "Fill this field",
        maxLength: 200,
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const textarea = canvas.getByRole("textbox", { name: "ОПИСАНИЕ", });

        await expect(textarea).toHaveAttribute("placeholder", "Write a short description");
        await expect(canvasElement.textContent).toContain("0 / 200");
    },
};

export const Minimal: Story = {
    args: { placeholder: "Без лейбла", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("textbox")).toBeTruthy();
        await expect(canvasElement.querySelectorAll("label").length).toBe(0);
    },
};

export const Invalid: Story = {
    args: { label: "ОПИСАНИЕ", invalid: true, error: "Too long.", maxLength: 200, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const textarea = canvas.getByRole("textbox", { name: "ОПИСАНИЕ", });

        await expect(textarea).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Too long.");
    },
};

export const Disabled: Story = {
    args: { label: "ОПИСАНИЕ", placeholder: "Write a short description", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const textarea = canvas.getByRole("textbox", { name: "ОПИСАНИЕ", });

        await expect(textarea).toBeDisabled();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", { name: "ОПИСАНИЕ", });

    await expect(getComputedStyle(textarea).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeControl(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeControl(context, "rgb(2, 6, 23)"),
};

// Pen `N0ymEX` public variant `rows`.
export const Rows: Story = {
    args: { label: "ОПИСАНИЕ", rows: 6, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const textarea = canvas.getByRole("textbox", { name: "ОПИСАНИЕ", });

        await expect(textarea).toHaveAttribute("rows", "6");
    },
};

// Pen `N0ymEX` accessibility: "Announce remaining characters when a limit exists."
const assertCounterAnnouncement = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const counter = canvasElement.querySelector(".textarea__counter") as Element;

    await expect(counter.getAttribute("role")).toBe("status");
    await expect(counter.getAttribute("aria-live")).toBe("polite");
    await expect(canvasElement.textContent).toContain("197 characters remaining");
    await expect(canvasElement.textContent).toContain("3 / 200");
};

export const CounterAnnouncement: Story = {
    args: { label: "ОПИСАНИЕ", maxLength: 200, defaultValue: "abc", },
    render: renderIn("light"),
    play: assertCounterAnnouncement,
};

export const DarkCounterAnnouncement: Story = {
    args: { label: "ОПИСАНИЕ", maxLength: 200, defaultValue: "abc", },
    render: renderIn("dark"),
    play: assertCounterAnnouncement,
};
