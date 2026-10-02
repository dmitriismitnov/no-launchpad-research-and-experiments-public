import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import type { FieldProps, } from "./field";
import { Field, } from "./field";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "320px", });

const control = css({
    width: "100%",
    height: "x20",
    paddingInline: "x6",
    borderRadius: "sm",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "semantic.common.50.border.strong",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
    fontFamily: "body",
    fontSize: "sm",
    fontWeight: "regular",
    lineHeight: "normal",
    outlineStyle: { _focusVisible: "solid", },
    outlineWidth: { _focusVisible: "{borderWidths.thick}", },
    outlineOffset: { _focusVisible: "0", },
    outlineColor: { _focusVisible: "semantic.brand.500.background", },
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: FieldProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Field {...args}>
                <input className={control} name="workspace" defaultValue="acme-design" />
            </Field>
        </div>
    </ThemeShell>
);

// The PEN reference (`Field`, id `pHfEy`).
const reference: FieldProps = {
    label: "Рабочая область",
    required: true,
    hint: "Строчные буквы, без пробелов.",
};

const meta = {
    title: "Components/Forms & selection/Field",
    component: Field,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "required", "hint", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        required: { control: { type: "boolean", }, },
        hint: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "Рабочая область",
        required: false,
        hint: "Строчные буквы, без пробелов.",
        invalid: false,
        error: "Обязательное поле",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText("Рабочая область");

        await expect(input).toBeRequired();
        await expect(canvasElement.textContent).toContain("Строчные буквы, без пробелов.");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Обязательное поле", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByLabelText("Рабочая область");
        const describedBy = input.getAttribute("aria-describedby");

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(describedBy).not.toBeNull();
        await expect(describedBy === null ? null : document.getElementById(describedBy)).not.toBeNull();
        await expect(canvasElement.textContent).toContain("Обязательное поле");
        await expect(canvasElement.textContent).not.toContain("Строчные буквы, без пробелов.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByLabelText("Рабочая область")).toBeDisabled();
    },
};

export const WithoutLabel: Story = {
    args: { hint: "Только контрол.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelectorAll("label").length).toBe(0);
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Рабочая область");

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
