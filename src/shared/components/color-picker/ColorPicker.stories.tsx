import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { ColorPickerProps, } from "./color-picker";
import { ColorPicker, } from "./color-picker";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "240px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: ColorPickerProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <ColorPicker {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Color Picker`, id `Ecy07`) with its blue swatch.
const reference: ColorPickerProps = {
    defaultValue: "#2563EB",
    hint: "Hex-значение.",
};

const meta = {
    title: "Components/Forms & selection/Color Picker",
    component: ColorPicker,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "hint", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        hint: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof ColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        ...reference,
        invalid: false,
        error: "Некорректный цвет.",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "#2563EB", })).toBeTruthy();
        await expect(canvas.queryByRole("listbox")).toBeNull();
    },
};

export const OpenAndSelect: Story = {
    args: { ...reference, defaultOpen: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const option = canvas.getByRole("option", { name: "#DC2626", });

        await fireEvent.click(option);
        await expect(canvas.queryByRole("listbox")).toBeNull();
        await expect(canvas.getByRole("button", { name: "#DC2626", })).toBeTruthy();
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "#2563EB", });

        await fireEvent.click(trigger);
        await expect(canvas.queryByRole("listbox")).toBeNull();
    },
};

const assertThemeField = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const field = canvasElement.querySelector(".colorPicker__field") as Element;

    await expect(getComputedStyle(field).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeField(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeField(context, "rgb(2, 6, 23)"),
};
