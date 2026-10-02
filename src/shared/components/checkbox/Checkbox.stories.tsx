import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Checkbox, type CheckboxProps, } from "./checkbox";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "260px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: CheckboxProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Checkbox {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Checkbox`, id `e2q2z`).
const reference: CheckboxProps = { label: "Checkbox", };

const meta = {
    title: "Components/Forms & selection/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "indeterminate", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        indeterminate: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { label: "Checkbox", indeterminate: false, invalid: false, error: "Required field", },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox", { name: "Checkbox", });

        await expect(checkbox).not.toBeChecked();
    },
};

export const Interactive: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox", { name: "Checkbox", });

        await fireEvent.click(checkbox);
        await expect(checkbox).toBeChecked();

        await fireEvent.click(checkbox);
        await expect(checkbox).not.toBeChecked();
    },
};

export const Checked: Story = {
    args: { ...reference, defaultChecked: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("checkbox", { name: "Checkbox", })).toBeChecked();
    },
};

export const Indeterminate: Story = {
    args: { ...reference, indeterminate: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox", { name: "Checkbox", });

        await expect(checkbox).toBePartiallyChecked();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Required field", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox", { name: "Checkbox", });

        await expect(checkbox).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Required field");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("checkbox", { name: "Checkbox", })).toBeDisabled();
    },
};

const assertThemeBox = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const box = canvasElement.querySelector(".checkbox__box") as Element;

    await expect(getComputedStyle(box).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: { ...reference, checked: false, onChange: () => {}, },
    render: renderIn("light"),
    play: async (context) => assertThemeBox(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: { ...reference, checked: false, onChange: () => {}, },
    render: renderIn("dark"),
    play: async (context) => assertThemeBox(context, "rgb(2, 6, 23)"),
};
