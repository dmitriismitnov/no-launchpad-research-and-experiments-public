import type { Meta, StoryObj, } from "@storybook/react-vite";
import { type ReactNode, useState, } from "react";

import { expect, fireEvent, userEvent, waitFor, within, } from "storybook/test";

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

export const ConfirmCancelControls: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        await fireEvent.click(canvas.getByRole("button", { name: "Edit Workspace name", }));

        const confirm = canvas.getByRole("button", { name: "Confirm", });
        const cancel = canvas.getByRole("button", { name: "Cancel", });

        await expect(confirm).toBeTruthy();
        await expect(cancel).toBeTruthy();

        const input = canvas.getByRole("textbox", { name: "Edit value", });

        await fireEvent.change(input, { target: { value: "Релиз", }, });
        await user.click(confirm);
        await expect(canvas.getByRole("button", { name: "Edit Релиз", })).toBeTruthy();
    },
};

export const CancelControl: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Edit Workspace name", }));

        const input = canvas.getByRole("textbox", { name: "Edit value", });

        await fireEvent.change(input, { target: { value: "Черновик", }, });
        await fireEvent.click(canvas.getByRole("button", { name: "Cancel", }));
        await expect(canvas.getByRole("button", { name: "Edit Workspace name", })).toBeTruthy();
    },
};

const assertSaving = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "Edit value", })).toBeTruthy();
    await expect(canvas.queryByRole("button", { name: "Edit Workspace name", })).toBeNull();
    await expect(canvasElement.querySelector('[aria-busy="true"]')).not.toBeNull();
    await expect(canvas.getByLabelText("Saving")).toBeTruthy();

    const input = canvasElement.querySelector(".editable__input") as Element;
    const savingIcon = canvas.getByLabelText("Saving");

    await expect(getComputedStyle(input).width).not.toBe("0px");
    await expect(getComputedStyle(savingIcon).animationName).toBe("spin");
    await expect(canvas.getByRole("button", { name: "Confirm", })).toBeDisabled();
    await expect(canvas.getByRole("button", { name: "Cancel", })).toBeDisabled();
};

export const SavingKeepsField: Story = {
    args: { ...reference, saving: true, },
    render: renderIn("light"),
    play: assertSaving,
};

export const DarkSavingKeepsField: Story = {
    args: { ...reference, saving: true, },
    render: renderIn("dark"),
    play: assertSaving,
};

const readIcon = (canvasElement: HTMLElement): Element => canvasElement.querySelector(".editable__icon") as Element;

const waitForIconOpacity = async (canvasElement: HTMLElement, value: string): Promise<void> => {
    await waitFor(() => expect(getComputedStyle(readIcon(canvasElement)).opacity).toBe(value));
};

export const AffordanceReveal: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".editable__control") as Element;
        const user = userEvent.setup();

        await expect(getComputedStyle(readIcon(canvasElement)).opacity).toBe("0");

        control.setAttribute("data-hover", "true");
        await waitForIconOpacity(canvasElement, "1");
        control.removeAttribute("data-hover");
        await waitForIconOpacity(canvasElement, "0");

        await user.tab();
        await expect(control).toHaveFocus();
        await waitForIconOpacity(canvasElement, "1");
    },
};

export const DarkAffordanceReveal: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".editable__control") as Element;

        await expect(getComputedStyle(readIcon(canvasElement)).opacity).toBe("0");
        control.setAttribute("data-hover", "true");
        await waitForIconOpacity(canvasElement, "1");
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
