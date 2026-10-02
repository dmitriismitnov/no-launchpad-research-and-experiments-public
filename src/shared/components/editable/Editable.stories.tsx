import type { Meta, StoryObj, } from "@storybook/react-vite";
import { type ReactNode, useState, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { EditableProps, } from "./editable";
import { Editable, } from "./editable";

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

const StatefulEditable = (args: EditableProps) => {
    const [ value, setValue, ] = useState(args.value);

    return <Editable {...args} value={value} onSave={setValue} />;
};

const renderIn = (theme: "light" | "dark") => (args: EditableProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <StatefulEditable {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Editable`, id `zoEMh`).
const reference: EditableProps = {
    value: "Workspace name",
};

const meta = {
    title: "Components/Forms & selection/Editable",
    component: Editable,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "value", "placeholder", "affordance", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        value: { control: { type: "text", }, },
        placeholder: { control: { type: "text", }, },
        affordance: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        value: "Workspace name",
        placeholder: "Без названия",
        affordance: true,
        invalid: false,
        error: "Слишком длинное имя.",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Edit Workspace name", })).toBeTruthy();
    },
};

export const EditAndSave: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Edit Workspace name", }));

        const input = canvas.getByRole("textbox", { name: "Edit value", });

        await fireEvent.change(input, { target: { value: "Релиз", }, });
        await fireEvent.keyDown(input, { key: "Enter", });
        await expect(canvas.getByRole("button", { name: "Edit Релиз", })).toBeTruthy();
    },
};

export const CancelWithEscape: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Edit Workspace name", }));

        const input = canvas.getByRole("textbox", { name: "Edit value", });

        await fireEvent.change(input, { target: { value: "Черновик", }, });
        await fireEvent.keyDown(input, { key: "Escape", });
        await expect(canvas.getByRole("button", { name: "Edit Workspace name", })).toBeTruthy();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Слишком длинное имя.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.textContent).toContain("Слишком длинное имя.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Edit Workspace name", })).toBeDisabled();
    },
};

const assertThemeValue = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    color: string,
): Promise<void> => {
    const value = canvasElement.querySelector(".editable__value") as Element;

    await expect(getComputedStyle(value).color).toBe(color);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeValue(context, "rgb(15, 23, 42)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeValue(context, "rgb(248, 250, 252)"),
};
