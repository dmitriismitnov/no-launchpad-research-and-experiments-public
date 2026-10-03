import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ToggleGroup, type ToggleGroupOption, } from "./toggle-group";

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

const stack = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "x8",
});

const options: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", },
    { value: "list", label: "List", },
    { value: "board", label: "Board", },
];

const optionsWithDisabled: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", },
    { value: "list", label: "List", disabled: true, },
    { value: "board", label: "Board", },
];

const iconOptions: readonly ToggleGroupOption[] = [
    { value: "grid", icon: "layout-grid", "aria-label": "Grid view", },
    { value: "list", icon: "menu", "aria-label": "List view", },
    { value: "board", icon: "image", "aria-label": "Board view", },
];

const twoOptions: readonly ToggleGroupOption[] = [
    { value: "day", label: "Day", },
    { value: "week", label: "Week", },
];

const fourOptions: readonly ToggleGroupOption[] = [
    { value: "one", label: "One", },
    { value: "two", label: "Two", },
    { value: "three", label: "Three", },
    { value: "four", label: "Four", },
];

// The PEN reference (`Toggle Group`, id `e5ySA`) with its "List" segment on.
const renderReference = (theme: "light" | "dark") => (
    <ThemeShell theme={theme}>
        <ToggleGroup options={options} defaultValue={[ "list", ]} aria-label="View" />
    </ThemeShell>
);

const meta = {
    title: "Components/Actions/Toggle Group",
    component: ToggleGroup,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "disabled", ],
        },
    },
    argTypes: {
        disabled: { control: { type: "boolean", }, },
    },
    args: {
        options,
        "aria-label": "View",
    },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { options, "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
};

export const ReferenceLight: Story = {
    render: () => renderReference("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "List", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const ReferenceDark: Story = {
    render: () => renderReference("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "List", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const MultiSelect: Story = {
    args: { options, "aria-label": "View", defaultValue: [ "grid", "board", ], },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Grid", })).toHaveAttribute("aria-pressed", "true");
        await expect(canvas.getByRole("button", { name: "Board", })).toHaveAttribute("aria-pressed", "true");
    },
};

export const Interactive: Story = {
    args: { options, "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const list = canvas.getByRole("button", { name: "List", });

        await fireEvent.click(list);
        await expect(list).toHaveAttribute("aria-pressed", "true");

        await fireEvent.click(list);
        await expect(list).toHaveAttribute("aria-pressed", "false");
    },
};

export const Disabled: Story = {
    args: { options, "aria-label": "View", disabled: true, },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("button", { name: "Grid", })).toBeDisabled();
    },
};

export const MultipleIndependent: Story = {
    args: { options, "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const grid = canvas.getByRole("button", { name: "Grid", });
        const list = canvas.getByRole("button", { name: "List", });

        await user.click(grid);
        await user.click(list);
        await expect(grid).toHaveAttribute("aria-pressed", "true");
        await expect(list).toHaveAttribute("aria-pressed", "true");
    },
};

export const SingleExclusive: Story = {
    args: { options, selectionMode: "single", "aria-label": "View", defaultValue: [ "list", ], },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const group = canvas.getByRole("radiogroup", { name: "View", });
        const list = canvas.getByRole("radio", { name: "List", });

        await expect(group).toBeTruthy();
        await expect(canvas.getAllByRole("radio").length).toBe(options.length);
        await expect(list).toHaveAttribute("aria-checked", "true");
        await expect(canvas.getByRole("radio", { name: "Grid", })).toHaveAttribute("aria-checked", "false");
    },
};

export const DarkSingleExclusive: Story = {
    args: { options, selectionMode: "single", "aria-label": "View", defaultValue: [ "list", ], },
    render: (args) => (
        <ThemeShell theme="dark">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "List", })).toHaveAttribute("aria-checked", "true");
    },
};

export const SingleKeyboard: Story = {
    args: { options: optionsWithDisabled, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const grid = canvas.getByRole("radio", { name: "Grid", });
        const board = canvas.getByRole("radio", { name: "Board", });

        grid.focus();
        await user.keyboard("{ArrowRight}");
        await expect(board).toHaveFocus();
        await expect(board).toHaveAttribute("aria-checked", "false");
        await user.keyboard("{Enter}");
        await expect(board).toHaveAttribute("aria-checked", "true");
        await expect(grid).toHaveAttribute("aria-checked", "false");
    },
};

export const SingleDisabledNoOp: Story = {
    args: { options, selectionMode: "single", "aria-label": "View", disabled: true, defaultValue: [ "grid", ], },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const grid = canvas.getByRole("radio", { name: "Grid", });
        const list = canvas.getByRole("radio", { name: "List", });

        list.click();
        await expect(grid).toHaveAttribute("aria-checked", "true");
        await expect(list).toHaveAttribute("aria-checked", "false");
    },
};

export const IconOnly: Story = {
    args: { options: iconOptions, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radiogroup", { name: "View", })).toBeTruthy();
        await expect(canvas.getByRole("radio", { name: "Grid view", })).toBeTruthy();
        await expect(canvas.getByRole("radio", { name: "Board view", })).toBeTruthy();
        await expect(canvasElement.querySelectorAll(".toggleGroup__icon").length).toBe(iconOptions.length);
        await expect(canvasElement.querySelector(".toggleGroup__label")).toBeNull();
    },
};

export const DarkIconOnly: Story = {
    args: { options: iconOptions, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="dark">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "Grid view", })).toBeTruthy();
    },
};

export const SegmentCounts: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={stack}>
                <ToggleGroup selectionMode="single" options={twoOptions} aria-label="Two" />
                <ToggleGroup selectionMode="single" options={options} aria-label="Three" />
                <ToggleGroup selectionMode="single" options={fourOptions} aria-label="Four" />
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getAllByRole("radiogroup").length).toBe(3);
        await expect(canvas.getAllByRole("radio").length).toBe(2 + 3 + 4);
    },
};

export const DarkSegmentCounts: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <div className={stack}>
                <ToggleGroup selectionMode="single" options={twoOptions} aria-label="Two" />
                <ToggleGroup selectionMode="single" options={fourOptions} aria-label="Four" />
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getAllByRole("radio").length).toBe(2 + 4);
    },
};

// The focus ring must be real: reach the first radio through the keyboard and
// read the painted outline. `semantic.brand.500.background` is green.500 in
// both themes.
const assertFocusRing = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const grid = canvas.getByRole("radio", { name: "Grid", });

    await user.tab();
    await expect(grid).toHaveFocus();

    const style = getComputedStyle(grid);

    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe("rgb(34, 197, 94)");
};

export const FocusVisibleLight: Story = {
    args: { options, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: assertFocusRing,
};

export const FocusVisibleDark: Story = {
    args: { options, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="dark">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: assertFocusRing,
};

const disabledSelectedOptions: readonly ToggleGroupOption[] = [
    { value: "grid", label: "Grid", disabled: true, },
    { value: "list", label: "List", },
    { value: "board", label: "Board", disabled: true, },
];

const assertDisabledSelectedSurface = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    foreground: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const selected = canvas.getByRole("radio", { name: "Grid", });
    const unselected = canvas.getByRole("radio", { name: "Board", });
    const selectedStyle = getComputedStyle(selected);
    const unselectedStyle = getComputedStyle(unselected);

    // The disabled first option is still the effective selection...
    await expect(selected).toBeDisabled();
    await expect(selected).toHaveAttribute("aria-checked", "true");
    // ...but it paints the disabled group surface, never the raised selected one.
    await expect(selectedStyle.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    await expect(selectedStyle.borderColor).toBe("rgba(0, 0, 0, 0)");
    await expect(selectedStyle.backgroundColor).toBe(unselectedStyle.backgroundColor);
    await expect(selectedStyle.borderColor).toBe(unselectedStyle.borderColor);
    await expect(selectedStyle.color).toBe(foreground);
    await expect(selectedStyle.color).toBe(unselectedStyle.color);
    await expect(selectedStyle.cursor).toBe("not-allowed");
};

export const DisabledSelectedSurfaceLight: Story = {
    args: { options: disabledSelectedOptions, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="light">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async (context) => assertDisabledSelectedSurface(context, "rgb(148, 163, 184)"),
};

export const DisabledSelectedSurfaceDark: Story = {
    args: { options: disabledSelectedOptions, selectionMode: "single", "aria-label": "View", },
    render: (args) => (
        <ThemeShell theme="dark">
            <ToggleGroup {...args} />
        </ThemeShell>
    ),
    play: async (context) => assertDisabledSelectedSurface(context, "rgb(71, 85, 105)"),
};
