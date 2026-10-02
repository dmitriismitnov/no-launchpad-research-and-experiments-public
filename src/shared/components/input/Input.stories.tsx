import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Input, type InputProps, } from "./input";

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

const renderIn = (theme: "light" | "dark") => (args: InputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Input {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Input / Text`, id `YknUp`) expressed as an ordinary
// composition. Its field copy stays in the story, never in the public API.
const reference: InputProps = {
    label: "ИМЯ",
    placeholder: "Как к вам обращаться",
};

const meta = {
    title: "Components/Input",
    component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ИМЯ",
        placeholder: "Как к вам обращаться",
        invalid: false,
        error: "Заполните поле",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });

        await expect(input).toHaveAttribute("placeholder", "Как к вам обращаться");
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
    args: { label: "ИМЯ", invalid: true, error: "Заполните поле", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });
        const describedBy = input.getAttribute("aria-describedby");

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(describedBy).not.toBeNull();
        await expect(describedBy === null ? null : document.getElementById(describedBy)).not.toBeNull();
        await expect(canvasElement.textContent).toContain("Заполните поле");
    },
};

export const Disabled: Story = {
    args: { label: "ИМЯ", placeholder: "Как к вам обращаться", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ИМЯ", });

        await expect(( input as HTMLInputElement ).disabled).toBe(true);
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "ИМЯ", });

    await expect(getComputedStyle(input).backgroundColor).toBe(background);
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
