import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { CalendarProps, } from "./calendar";
import { Calendar, } from "./calendar";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: CalendarProps) => (
    <ThemeShell theme={theme}>
        <Calendar {...args} />
    </ThemeShell>
);

const march = new Date(2025, 2, 1);

// The PEN reference (`Calendar`, id `zh2sP`) with a selected day.
const reference: CalendarProps = {
    month: march,
    value: new Date(2025, 2, 16),
    today: new Date(2025, 2, 10),
    weekStartsOn: 1,
};

const meta = {
    title: "Components/Forms & selection/Calendar",
    component: Calendar,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "monthLabel", "weekStartsOn", "surface", ],
        },
    },
    argTypes: {
        monthLabel: { control: { type: "text", }, },
        weekStartsOn: { control: { type: "number", }, },
        surface: { control: { type: "select", options: [ "overlay", "embedded", ], }, },
    },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: reference,
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText("March 2025")).toBeTruthy();
        await expect(canvasElement.querySelector('[data-date="2025-03-16"]')).toHaveAttribute(
            "aria-selected",
            "true",
        );
    },
};

export const Range: Story = {
    args: {
        month: march,
        today: new Date(2025, 2, 10),
        rangeStart: new Date(2025, 2, 10),
        rangeEnd: new Date(2025, 2, 14),
        weekStartsOn: 1,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const day = canvasElement.querySelector('[data-date="2025-03-12"]') as Element;

        await expect(day.className).toContain("calendar__day--inRange_true");
    },
};

export const DisabledDays: Story = {
    args: {
        month: march,
        today: new Date(2025, 2, 10),
        min: new Date(2025, 2, 10),
        max: new Date(2025, 2, 20),
        weekStartsOn: 1,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const disabled = canvasElement.querySelector('[data-date="2025-03-05"]') as HTMLButtonElement;

        await expect(disabled.disabled).toBe(true);
    },
};

export const NextMonth: Story = {
    args: { defaultMonth: march, today: new Date(2025, 2, 10), weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Next month", }));
        await expect(canvas.getByText("April 2025")).toBeTruthy();
    },
};

export const SelectDay: Story = {
    args: { month: march, today: new Date(2025, 2, 10), weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const day = canvasElement.querySelector('[data-date="2025-03-20"]') as HTMLButtonElement;

        await fireEvent.click(day);
        await expect(day).toHaveAttribute("aria-selected", "true");
    },
};

const assertThemeRoot = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const root = canvasElement.querySelector(".calendar__root") as Element;

    await expect(getComputedStyle(root).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeRoot(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeRoot(context, "rgb(2, 6, 23)"),
};
