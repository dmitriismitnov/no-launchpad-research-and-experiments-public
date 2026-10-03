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
const day = (value: number) => new Date(2025, 2, value);

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
            include: [ "placeholder", "invalid", "error", "disabled", "selectionMode", ],
        },
    },
    argTypes: {
        placeholder: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
        selectionMode: { control: { type: "select", options: [ "single", "range", ], }, },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const cell = (canvasElement: HTMLElement, iso: string): HTMLButtonElement =>
    canvasElement.querySelector(`[data-date="${iso}"]`) as HTMLButtonElement;

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

        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await fireEvent.click(cell(canvasElement, "2025-03-20"));
        await expect(canvas.queryByRole("dialog")).toBeNull();
        await expect(canvasElement.textContent).toContain("2025-03-20");
    },
};

export const RangeFlow: Story = {
    args: { selectionMode: "range", today, defaultOpen: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.click(cell(canvasElement, "2025-03-10"));
        await expect(canvas.getByRole("dialog")).toBeTruthy();
        await expect(canvasElement.textContent).toContain("2025-03-10");

        await fireEvent.click(cell(canvasElement, "2025-03-14"));
        await expect(canvas.queryByRole("dialog")).toBeNull();
        await expect(canvasElement.textContent).toContain("2025-03-10 – 2025-03-14");
    },
};

export const DarkRangeFlow: Story = {
    args: { selectionMode: "range", today, defaultOpen: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(cell(canvasElement, "2025-03-10"));
        await expect(canvas.getByRole("dialog")).toBeTruthy();

        await fireEvent.click(cell(canvasElement, "2025-03-14"));
        await expect(canvas.queryByRole("dialog")).toBeNull();
        await expect(canvasElement.textContent).toContain("2025-03-10 – 2025-03-14");
    },
};

export const RangeControlled: Story = {
    args: { selectionMode: "range", value: { start: day(10), end: day(14), }, today, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "2025-03-10 – 2025-03-14", })).toBeTruthy();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Укажите дату.", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: "2025-03-16", });
        const describedBy = trigger.getAttribute("aria-describedby");

        await expect(trigger).toHaveAttribute("aria-invalid", "true");
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
        const trigger = canvas.getByRole("button", { name: "2025-03-16", });

        await fireEvent.click(trigger);
        await expect(canvas.queryByRole("dialog")).toBeNull();
    },
};

export const DisabledSurface: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const field = canvasElement.querySelector(".datePicker__field") as Element;
        const value = canvasElement.querySelector(".datePicker__value") as Element;

        await expect(getComputedStyle(field).backgroundColor).toBe("rgb(241, 245, 249)");
        await expect(getComputedStyle(value).color).toBe("rgb(148, 163, 184)");
    },
};

export const DarkDisabledSurface: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const field = canvasElement.querySelector(".datePicker__field") as Element;
        const value = canvasElement.querySelector(".datePicker__value") as Element;

        await expect(getComputedStyle(field).backgroundColor).toBe("rgb(15, 23, 42)");
        await expect(getComputedStyle(value).color).toBe("rgb(71, 85, 105)");
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
