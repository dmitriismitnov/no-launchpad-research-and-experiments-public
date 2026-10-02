import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { DatePickerProps, } from "./date-picker";
import { DatePicker, } from "./date-picker";

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

const renderIn = (theme: "light" | "dark") => (args: DatePickerProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <DatePicker {...args} />
        </div>
    </ThemeShell>
);

const march = new Date(2025, 2, 16);
const today = new Date(2025, 2, 10);

// The PEN reference (`Date Picker`, id `bpCbJ`) in its closed state.
const reference: DatePickerProps = {
    defaultValue: march,
    today,
};

const meta = {
    title: "Components/Forms & selection/Date Picker",
    component: DatePicker,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "placeholder", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        placeholder: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        defaultValue: march,
        today,
        placeholder: "Select date",
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

        await expect(canvas.getByRole("button", { name: "2025-03-16", })).toBeTruthy();
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

export const OpenAndSelect: Story = {
    args: { defaultValue: march, today, defaultOpen: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const day = canvasElement.querySelector('[data-date="2025-03-20"]') as HTMLButtonElement;

        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await fireEvent.click(day);
        await expect(canvas.queryByRole("dialog")).toBeNull();
        await expect(canvasElement.textContent).toContain("2025-03-20");
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.textContent).toContain("Укажите дату.");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "2025-03-16", });

        await fireEvent.click(trigger);
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

const assertThemeField = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const field = canvasElement.querySelector(".datePicker__field") as Element;

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
