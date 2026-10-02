import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import type { PinInputProps, } from "./pin-input";
import { PinInput, } from "./pin-input";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ display: "flex", flexDirection: "column", gap: "x8", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: PinInputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <PinInput {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Pin Input`, id `E3ZhdP`) with a partial code.
const reference: PinInputProps = {
    label: "КОД",
    length: 4,
    defaultValue: "482",
};

const meta = {
    title: "Components/Forms & selection/Pin Input",
    component: PinInput,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "length", "masked", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        length: { control: { type: "number", }, },
        masked: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "КОД",
        length: 4,
        defaultValue: "482",
        masked: false,
        invalid: false,
        error: "Неверный код",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvasElement.querySelectorAll(".pinInput__cell").length).toBeGreaterThan(0);
        await expect(canvas.getByLabelText("КОД character 1")).toHaveValue("4");
        await expect(canvas.getByLabelText("КОД character 2")).toHaveValue("8");
        await expect(canvas.getByLabelText("КОД character 4")).toHaveValue("");
    },
};

export const Interactive: Story = {
    args: { label: "КОД", length: 4, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const first = canvas.getByLabelText("КОД character 1");
        const second = canvas.getByLabelText("КОД character 2");

        await fireEvent.change(first, { target: { value: "1", }, });
        await expect(first).toHaveValue("1");
        await expect(second).toHaveFocus();
    },
};

export const Backspace: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const first = canvas.getByLabelText("КОД character 1");
        const second = canvas.getByLabelText("КОД character 2");
        const third = canvas.getByLabelText("КОД character 3");

        await fireEvent.keyDown(third, { key: "Backspace", });
        await expect(second).toHaveFocus();
        await expect(second).toHaveValue("");
        await expect(first).toHaveValue("4");
    },
};

export const Masked: Story = {
    args: { label: "КОД", length: 4, defaultValue: "482", masked: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByLabelText("КОД character 1")).toHaveAttribute("type", "password");
    },
};

export const Invalid: Story = {
    args: { label: "КОД", length: 4, invalid: true, error: "Неверный код", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByLabelText("КОД character 1")).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Неверный код");
    },
};

export const Disabled: Story = {
    args: { label: "КОД", length: 4, defaultValue: "482", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByLabelText("КОД character 1")).toBeDisabled();
    },
};

const assertThemeCell = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const cell = canvasElement.querySelector(".pinInput__cell") as Element;

    await expect(getComputedStyle(cell).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeCell(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeCell(context, "rgb(2, 6, 23)"),
};
