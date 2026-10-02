import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { DateInput, type DateInputProps, } from "./date-input";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "280px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: DateInputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <DateInput {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Date Input`, id `ivx6N`) as a typed field.
const reference: DateInputProps = {
    label: "ДАТА",
    placeholder: "ГГГГ-ММ-ДД",
    hint: "Формат ISO 8601.",
};

const meta = {
    title: "Components/Forms & selection/Date Input",
    component: DateInput,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "placeholder", "hint", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        hint: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ДАТА",
        placeholder: "ГГГГ-ММ-ДД",
        hint: "Формат ISO 8601.",
        invalid: false,
        error: "Укажите дату.",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ДАТА", });

        await expect(input).toHaveAttribute("placeholder", "ГГГГ-ММ-ДД");
        await expect(canvasElement.textContent).toContain("Формат ISO 8601.");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "ДАТА", });
        const describedBy = input.getAttribute("aria-describedby");

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(describedBy).not.toBeNull();
        await expect(describedBy === null ? null : document.getElementById(describedBy)).not.toBeNull();
        await expect(canvasElement.textContent).toContain("Укажите дату.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("textbox", { name: "ДАТА", })).toBeDisabled();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "ДАТА", });
    const control = input.closest(".dateInput__control") as Element;

    await expect(getComputedStyle(control).backgroundColor).toBe(background);
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
