import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import type { CalendarProps, DateRange, } from "./calendar";
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
const day = (value: number) => new Date(2025, 2, value);
const today = day(10);

// The PEN reference (`Calendar`, id `zh2sP`) with a selected day.
const reference: CalendarProps = {
    month: march,
    value: day(16),
    today,
    weekStartsOn: 1,
};

const inRange: DateRange = { start: day(10), end: day(14), };

const meta = {
    title: "Components/Forms & selection/Calendar",
    component: Calendar,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "monthLabel", "weekStartsOn", "surface", "selectionMode", ],
        },
    },
    argTypes: {
        monthLabel: { control: { type: "text", }, },
        weekStartsOn: { control: { type: "number", }, },
        surface: { control: { type: "select", options: [ "overlay", "embedded", ], }, },
        selectionMode: { control: { type: "select", options: [ "single", "range", ], }, },
    },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const cell = (canvasElement: HTMLElement, iso: string): HTMLButtonElement =>
    canvasElement.querySelector(`[data-date="${iso}"]`) as HTMLButtonElement;

const tabStops = (canvasElement: HTMLElement): HTMLButtonElement[] =>
    Array.from(canvasElement.querySelectorAll<HTMLButtonElement>(`[data-date][tabindex="0"]`));

const disabledDates = (...days: number[]) => (date: Date) => days.includes(date.getDate());

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
        await expect(cell(canvasElement, "2025-03-16")).toHaveAttribute("aria-selected", "true");
    },
};

export const Range: Story = {
    args: {
        month: march,
        today,
        selectionMode: "range",
        value: inRange,
        weekStartsOn: 1,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(cell(canvasElement, "2025-03-12").className).toContain("calendar__day--inRange_true");
        await expect(cell(canvasElement, "2025-03-10")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-14")).toHaveAttribute("aria-selected", "true");
    },
};

export const RangeSelect: Story = {
    args: { month: march, today, selectionMode: "range", weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await fireEvent.click(cell(canvasElement, "2025-03-10"));
        await expect(cell(canvasElement, "2025-03-10")).toHaveAttribute("aria-selected", "true");

        await fireEvent.click(cell(canvasElement, "2025-03-14"));
        await expect(cell(canvasElement, "2025-03-10")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-14")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-12").className).toContain("calendar__day--inRange_true");

        await fireEvent.click(cell(canvasElement, "2025-03-20"));
        await expect(cell(canvasElement, "2025-03-20")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-10")).not.toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-14")).not.toHaveAttribute("aria-selected", "true");
    },
};

export const RangeBackwards: Story = {
    args: { month: march, today, selectionMode: "range", weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await fireEvent.click(cell(canvasElement, "2025-03-14"));
        await fireEvent.click(cell(canvasElement, "2025-03-10"));

        await expect(cell(canvasElement, "2025-03-10")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-14")).toHaveAttribute("aria-selected", "true");
        await expect(cell(canvasElement, "2025-03-12").className).toContain("calendar__day--inRange_true");
    },
};

const ControlledRange = () => {
    const [ range, setRange, ] = useState<DateRange>({});

    return (
        <ThemeShell theme="light">
            <Calendar
                month={march}
                today={today}
                weekStartsOn={1}
                selectionMode="range"
                value={range}
                onChange={setRange}
            />
        </ThemeShell>
    );
};

export const RangeControlled: Story = {
    render: () => <ControlledRange />,
    play: async ({ canvasElement, }) => {
        await fireEvent.click(cell(canvasElement, "2025-03-10"));
        await expect(cell(canvasElement, "2025-03-10")).toHaveAttribute("aria-selected", "true");

        await fireEvent.click(cell(canvasElement, "2025-03-14"));
        await expect(cell(canvasElement, "2025-03-12").className).toContain("calendar__day--inRange_true");
    },
};

export const RangeControlledNoop: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Calendar
                month={march}
                today={today}
                weekStartsOn={1}
                selectionMode="range"
                value={{}}
                onChange={() => {}}
            />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        await fireEvent.click(cell(canvasElement, "2025-03-10"));
        await expect(cell(canvasElement, "2025-03-10")).not.toHaveAttribute("aria-selected", "true");
    },
};

export const DisabledDays: Story = {
    args: {
        month: march,
        today,
        min: day(10),
        max: day(20),
        weekStartsOn: 1,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const disabled = cell(canvasElement, "2025-03-05");

        await expect(disabled.disabled).toBe(true);
        await expect(disabled).toHaveAttribute("aria-disabled", "true");
        await expect(getComputedStyle(disabled).color).toBe("rgb(148, 163, 184)");
    },
};

export const DarkDisabledDays: Story = {
    args: {
        month: march,
        today,
        min: day(10),
        max: day(20),
        weekStartsOn: 1,
    },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const disabled = cell(canvasElement, "2025-03-05");

        await expect(disabled.disabled).toBe(true);
        await expect(getComputedStyle(disabled).color).toBe("rgb(71, 85, 105)");
    },
};

export const DisabledNoOp: Story = {
    args: {
        month: march,
        today,
        defaultValue: day(16),
        isDateDisabled: (date: Date) => date.getDate() === 20,
        weekStartsOn: 1,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const blocked = cell(canvasElement, "2025-03-20");

        await expect(blocked.disabled).toBe(true);
        await fireEvent.click(blocked);
        await expect(blocked).not.toHaveAttribute("aria-selected", "true");

        await fireEvent.click(cell(canvasElement, "2025-03-21"));
        await expect(cell(canvasElement, "2025-03-21")).toHaveAttribute("aria-selected", "true");
    },
};

export const NextMonth: Story = {
    args: { defaultMonth: march, today, weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await fireEvent.click(canvas.getByRole("button", { name: "Next month", }));
        await expect(canvas.getByText("April 2025")).toBeTruthy();
    },
};

export const SelectDay: Story = {
    args: { month: march, today, weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const target = cell(canvasElement, "2025-03-20");

        await fireEvent.click(target);
        await expect(target).toHaveAttribute("aria-selected", "true");
    },
};

export const Keyboard: Story = {
    args: { defaultMonth: march, defaultValue: day(16), today, weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        cell(canvasElement, "2025-03-16").focus();
        await user.keyboard("{ArrowRight}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-17"));

        await user.keyboard("{ArrowDown}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-24"));

        await user.keyboard("{PageDown}");
        await expect(within(canvasElement).getByText("April 2025")).toBeTruthy();
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-04-24"));

        await user.keyboard("{Enter}");
        await expect(cell(canvasElement, "2025-04-24")).toHaveAttribute("aria-selected", "true");
    },
};

export const SelectedColors: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(getComputedStyle(cell(canvasElement, "2025-03-16")).backgroundColor).toBe(
            "rgb(21, 128, 61)",
        );
    },
};

export const DarkSelectedColors: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        await expect(getComputedStyle(cell(canvasElement, "2025-03-16")).backgroundColor).toBe(
            "rgb(134, 239, 172)",
        );
    },
};

export const RangeColors: Story = {
    args: { month: march, today, selectionMode: "range", value: inRange, weekStartsOn: 1, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(getComputedStyle(cell(canvasElement, "2025-03-12")).backgroundColor).toBe(
            "rgb(220, 252, 231)",
        );
    },
};

export const DarkRangeColors: Story = {
    args: { month: march, today, selectionMode: "range", value: inRange, weekStartsOn: 1, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        await expect(getComputedStyle(cell(canvasElement, "2025-03-12")).backgroundColor).toBe(
            "rgb(20, 83, 45)",
        );
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

// --- Keyboard focus skips disabled days (B5 correction cycle 2/2) ---

export const KeyboardSkipsDisabled: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(16),
        today,
        weekStartsOn: 1,
        isDateDisabled: disabledDates(17, 18),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        cell(canvasElement, "2025-03-16").focus();
        await user.keyboard("{ArrowRight}");

        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-19"));
        await expect(cell(canvasElement, "2025-03-19").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-17").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-17").tabIndex).toBe(-1);
        await expect(cell(canvasElement, "2025-03-18").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-18").tabIndex).toBe(-1);
        await expect(tabStops(canvasElement).length).toBe(1);
        await expect(tabStops(canvasElement)[0]).toBe(cell(canvasElement, "2025-03-19"));

        await user.keyboard("{ArrowLeft}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-16"));
        await expect(cell(canvasElement, "2025-03-16").tabIndex).toBe(0);
    },
};

export const KeyboardVerticalSkip: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(16),
        today,
        weekStartsOn: 1,
        isDateDisabled: disabledDates(17, 23),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        // ArrowDown skips the disabled 23 and lands on the enabled 30.
        cell(canvasElement, "2025-03-16").focus();
        await user.keyboard("{ArrowDown}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-30"));
        await expect(cell(canvasElement, "2025-03-30").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-23").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-23").tabIndex).toBe(-1);

        // ArrowUp skips the disabled 17 and lands on the enabled 10.
        cell(canvasElement, "2025-03-24").focus();
        await user.keyboard("{ArrowUp}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-10"));
        await expect(cell(canvasElement, "2025-03-10").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-17").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-17").tabIndex).toBe(-1);
        await expect(tabStops(canvasElement).length).toBe(1);
    },
};

export const KeyboardMinMax: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(17),
        today,
        weekStartsOn: 1,
        min: day(15),
        max: day(20),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        cell(canvasElement, "2025-03-17").focus();
        await user.keyboard("{ArrowLeft}{ArrowLeft}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-15"));

        // ArrowLeft at the minimum: no enabled day exists to the left, so focus
        // and the roving tab stop stay on the current day.
        await user.keyboard("{ArrowLeft}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-15"));
        await expect(cell(canvasElement, "2025-03-15").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-14").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-14").tabIndex).toBe(-1);
        await expect(tabStops(canvasElement).length).toBe(1);

        // ArrowRight at the maximum behaves the same way.
        cell(canvasElement, "2025-03-20").focus();
        await user.keyboard("{ArrowRight}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-20"));
        await expect(cell(canvasElement, "2025-03-20").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-21").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-21").tabIndex).toBe(-1);
    },
};

export const KeyboardHomeEnd: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(13),
        today,
        weekStartsOn: 1,
        isDateDisabled: disabledDates(10, 11, 15, 16),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();

        cell(canvasElement, "2025-03-13").focus();
        await user.keyboard("{Home}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-12"));
        await expect(cell(canvasElement, "2025-03-12").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-10").disabled).toBe(true);
        await expect(cell(canvasElement, "2025-03-10").tabIndex).toBe(-1);
        await expect(cell(canvasElement, "2025-03-11").tabIndex).toBe(-1);

        await user.keyboard("{End}");
        await expect(document.activeElement).toBe(cell(canvasElement, "2025-03-14"));
        await expect(cell(canvasElement, "2025-03-14").tabIndex).toBe(0);
        await expect(cell(canvasElement, "2025-03-15").tabIndex).toBe(-1);
        await expect(cell(canvasElement, "2025-03-16").tabIndex).toBe(-1);
        await expect(tabStops(canvasElement).length).toBe(1);
    },
};

export const KeyboardNoEnabledCandidate: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(16),
        today,
        weekStartsOn: 1,
        isDateDisabled: () => true,
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const grid = canvasElement.querySelector(`[role="grid"]`) as HTMLElement;

        await fireEvent.keyDown(grid, { key: "ArrowRight", });
        await fireEvent.keyDown(grid, { key: "PageDown", });

        await expect(within(canvasElement).getByText("March 2025")).toBeTruthy();
        await expect(tabStops(canvasElement).length).toBe(0);
        await expect(cell(canvasElement, "2025-03-16").tabIndex).toBe(-1);
    },
};

export const InitialDisabledDefault: Story = {
    args: {
        defaultMonth: march,
        defaultValue: day(20),
        today,
        weekStartsOn: 1,
        isDateDisabled: disabledDates(20),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const disabled = cell(canvasElement, "2025-03-20");
        const stops = tabStops(canvasElement);

        await expect(disabled.disabled).toBe(true);
        await expect(disabled.tabIndex).toBe(-1);
        await expect(stops.length).toBe(1);
        await expect(stops[0]?.disabled).toBe(false);
        await expect(stops[0]?.getAttribute("data-date")).toBe("2025-02-24");
    },
};

export const InitialDisabledValue: Story = {
    args: {
        month: march,
        value: day(20),
        today,
        weekStartsOn: 1,
        isDateDisabled: disabledDates(20),
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const disabled = cell(canvasElement, "2025-03-20");
        const stops = tabStops(canvasElement);

        await expect(disabled).toHaveAttribute("aria-selected", "true");
        await expect(disabled.disabled).toBe(true);
        await expect(disabled.tabIndex).toBe(-1);
        await expect(stops.length).toBe(1);
        await expect(stops[0]?.disabled).toBe(false);
        await expect(stops[0]?.getAttribute("data-date")).toBe("2025-02-24");
    },
};

// --- Prop-driven focus reconciliation (B5 correction cycle 3/3) ---

const disabledTabStops = (canvasElement: HTMLElement): HTMLButtonElement[] =>
    Array.from(canvasElement.querySelectorAll<HTMLButtonElement>(`[data-date][disabled][tabindex="0"]`));

/** Starts with the enabled 2025-03-16 focused, then raises `min` so it becomes disabled. */
const MinChangeFocus = () => {
    const [ bounded, setBounded, ] = useState(false);

    return (
        <ThemeShell theme="light">
            <button type="button" onClick={() => setBounded(true)}>
                Apply minimum
            </button>
            <Calendar
                month={march}
                defaultValue={day(16)}
                today={today}
                weekStartsOn={1}
                min={bounded ? day(17) : undefined}
            />
        </ThemeShell>
    );
};

export const FocusReconcilesWhenMinChanges: Story = {
    render: () => <MinChangeFocus />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(cell(canvasElement, "2025-03-16").tabIndex).toBe(0);

        await fireEvent.click(canvas.getByRole("button", { name: "Apply minimum", }));

        const disabled = cell(canvasElement, "2025-03-16");
        const stops = tabStops(canvasElement);

        await expect(disabled.disabled).toBe(true);
        await expect(disabled.tabIndex).toBe(-1);
        await expect(disabledTabStops(canvasElement).length).toBe(0);
        await expect(stops.length).toBe(1);
        await expect(stops[0]?.disabled).toBe(false);
        await expect(stops[0]?.getAttribute("data-date")).toBe("2025-03-17");
    },
};

/** Starts with the enabled 2025-03-16 focused, then adds a predicate that disables it. */
const PredicateChangeFocus = () => {
    const [ blocked, setBlocked, ] = useState(false);

    return (
        <ThemeShell theme="light">
            <button type="button" onClick={() => setBlocked(true)}>
                Block the sixteenth
            </button>
            <Calendar
                month={march}
                defaultValue={day(16)}
                today={today}
                weekStartsOn={1}
                isDateDisabled={blocked ? disabledDates(16) : undefined}
            />
        </ThemeShell>
    );
};

export const FocusReconcilesWhenPredicateChanges: Story = {
    render: () => <PredicateChangeFocus />,
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(cell(canvasElement, "2025-03-16").tabIndex).toBe(0);

        await fireEvent.click(canvas.getByRole("button", { name: "Block the sixteenth", }));

        const disabled = cell(canvasElement, "2025-03-16");
        const stops = tabStops(canvasElement);

        await expect(disabled.disabled).toBe(true);
        await expect(disabled.tabIndex).toBe(-1);
        await expect(disabledTabStops(canvasElement).length).toBe(0);
        await expect(stops.length).toBe(1);
        await expect(stops[0]?.disabled).toBe(false);
        await expect(stops[0]?.getAttribute("data-date")).toBe("2025-02-24");
    },
};
