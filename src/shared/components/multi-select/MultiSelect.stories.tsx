import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import type { MultiSelectOption, MultiSelectProps, } from "./multi-select";
import { MultiSelect, } from "./multi-select";

import { css, } from "@shared/styled-system/css";

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

const renderIn = (theme: "light" | "dark") => (args: MultiSelectProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <MultiSelect {...args} />
        </div>
    </ThemeShell>
);

const options: readonly MultiSelectOption[] = [
    { value: "foundation", label: "foundation", },
    { value: "semantic", label: "semantic", },
    { value: "components", label: "components", },
    { value: "patterns", label: "patterns", },
];

// The PEN reference (`Multi Select`, id `f985P`) with its chips and overflow counter.
const reference: MultiSelectProps = {
    label: "ТЕГИ",
    maxVisible: 2,
    defaultValue: [ "foundation", "semantic", "components", ],
    options,
};

const meta = {
    title: "Components/Forms & selection/Multi Select",
    component: MultiSelect,
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
    args: { options, },
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "ТЕГИ",
        placeholder: "Выберите теги",
        options,
        invalid: false,
        error: "Выберите тег",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "ТЕГИ options", })).toHaveAttribute("aria-expanded", "false");
        await expect(canvas.getByText("foundation")).toBeTruthy();
        await expect(canvas.getByText("+1")).toBeTruthy();
    },
};

export const Interactive: Story = {
    args: { ...reference, defaultValue: [], placeholder: "Выберите теги", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole("button", { name: "ТЕГИ options", });

        await fireEvent.click(toggle);
        await expect(toggle).toHaveAttribute("aria-expanded", "true");

        const listbox = canvas.getByRole("listbox");
        const option = within(listbox).getByRole("option", { name: "patterns", });

        await fireEvent.click(option);
        await expect(option).toHaveAttribute("aria-selected", "true");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
    },
};

export const RemoveChip: Story = {
    args: { ...reference, defaultValue: [ "foundation", ], maxVisible: 3, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const remove = canvas.getByRole("button", { name: "Remove foundation", });

        await fireEvent.click(remove);
        await expect(canvas.queryByRole("button", { name: "Remove foundation", })).toBeNull();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Выберите тег", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole("button", { name: "ТЕГИ options", });

        await expect(toggle).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Выберите тег");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "ТЕГИ options", })).toBeDisabled();
        await expect(canvas.queryByRole("button", { name: "Remove foundation", })).toBeNull();
    },
};

const assertThemeControl = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const control = canvasElement.querySelector(".multiSelect__control") as Element;

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
