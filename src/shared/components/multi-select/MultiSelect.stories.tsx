import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

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
        await expect(canvas.getByRole("button", { name: "Remove foundation", })).toBeTruthy();
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

const openList = async (
    canvasElement: HTMLElement,
): Promise<{ toggle: HTMLElement; listbox: HTMLElement; }> => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", { name: "ТЕГИ options", });

    await user.click(toggle);

    return { toggle, listbox: canvas.getByRole("listbox"), };
};

export const StayOpenToggles: Story = {
    args: { ...reference, defaultValue: [], placeholder: "Выберите теги", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { toggle, listbox, } = await openList(canvasElement);
        const option = within(listbox).getByRole("option", { name: "patterns", });

        await user.click(option);

        await expect(option).toHaveAttribute("aria-selected", "true");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(canvas.getByRole("status")).toHaveTextContent("1 selected");
    },
};

export const DarkStayOpenToggles: Story = {
    args: { ...reference, defaultValue: [], placeholder: "Выберите теги", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const { toggle, listbox, } = await openList(canvasElement);

        await user.click(within(listbox).getByRole("option", { name: "patterns", }));

        await expect(toggle).toHaveAttribute("aria-expanded", "true");
    },
};

export const RemoveDoesNotOpen: Story = {
    args: { ...reference, defaultValue: [ "foundation", ], maxVisible: 3, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole("button", { name: "ТЕГИ options", });
        const remove = canvas.getByRole("button", { name: "Remove foundation", });

        await user.click(remove);

        await expect(canvas.queryByRole("button", { name: "Remove foundation", })).toBeNull();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(canvas.queryByRole("listbox")).toBeNull();
    },
};

export const SelectedCountAnnouncement: Story = {
    args: { ...reference, defaultValue: [ "foundation", ], maxVisible: 3, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { listbox, } = await openList(canvasElement);

        await expect(canvas.getByRole("status")).toHaveTextContent("1 selected");

        await user.click(within(listbox).getByRole("option", { name: "semantic", }));

        await expect(canvas.getByRole("status")).toHaveTextContent("2 selected");
    },
};

export const DarkSelectedCountAnnouncement: Story = {
    args: { ...reference, defaultValue: [ "foundation", ], maxVisible: 3, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("status")).toHaveTextContent("1 selected");
    },
};

export const MaxSelectedBlocksAdditions: Story = {
    args: {
        ...reference,
        maxVisible: 3,
        maxSelected: 2,
        defaultValue: [ "foundation", "semantic", ],
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { listbox, } = await openList(canvasElement);
        const components = within(listbox).getByRole("option", { name: "components", });
        const foundation = within(listbox).getByRole("option", { name: "foundation", });

        await expect(components).toHaveAttribute("aria-disabled", "true");
        await expect(canvas.getByRole("status")).toHaveTextContent("2 of 2 selected");

        // A new addition is blocked at the cap.
        await user.click(components);
        await expect(components).toHaveAttribute("aria-selected", "false");
        await expect(canvas.getByRole("status")).toHaveTextContent("2 of 2 selected");

        // An existing selection stays removable.
        await user.click(foundation);
        await expect(foundation).toHaveAttribute("aria-selected", "false");
        await expect(canvas.getByRole("status")).toHaveTextContent("1 of 2 selected");

        // Once below the cap, the blocked option becomes addable.
        await user.click(components);
        await expect(components).toHaveAttribute("aria-selected", "true");
        await expect(canvas.getByRole("status")).toHaveTextContent("2 of 2 selected");
    },
};

export const SearchableQuery: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", defaultValue: [], },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { listbox, } = await openList(canvasElement);
        const search = canvas.getByRole("textbox", { name: "ТЕГИ search", });

        await user.type(search, "zzz");

        await expect(search).toHaveValue("zzz");
        // No local filtering: every option is still rendered.
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length);
    },
};

export const DarkSearchableQuery: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", defaultValue: [], },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { listbox, } = await openList(canvasElement);
        const search = canvas.getByRole("textbox", { name: "ТЕГИ search", });

        await user.type(search, "abc");

        await expect(search).toHaveValue("abc");
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length);
    },
};

const ControlledQueryProbe = ({ theme, }: { theme: "light" | "dark"; }) => {
    const [ last, setLast, ] = useState("");

    return (
        <ThemeShell theme={theme}>
            <div className={frame}>
                <MultiSelect label="ТЕГИ" searchable query="" options={options} onQueryChange={setLast} />
                <p data-testid="last">{last}</p>
            </div>
        </ThemeShell>
    );
};

export const ControlledQuery: Story = {
    render: () => <ControlledQueryProbe theme="light" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);

        await user.click(canvas.getByRole("button", { name: "ТЕГИ options", }));

        const search = canvas.getByRole("textbox", { name: "ТЕГИ search", });

        await fireEvent.change(search, { target: { value: "abc", }, });

        await expect(search).toHaveValue("");
        await expect(canvas.getByTestId("last")).toHaveTextContent("abc");
    },
};

// A multi-word query must not toggle any root option; the search field owns it.
export const SearchableQueryAlphaBeta: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", defaultValue: [], },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { toggle, listbox, } = await openList(canvasElement);
        const search = canvas.getByRole("textbox", { name: "ТЕГИ search", });

        await user.type(search, "alpha beta");

        await expect(search).toHaveValue("alpha beta");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length);
        await expect(canvas.queryByRole("button", { name: "Remove foundation", })).toBeNull();
    },
};

// Arrow keys and Enter stay in the text field and never toggle the root list.
export const SearchableKeysDoNotSelect: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", defaultValue: [], },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { toggle, listbox, } = await openList(canvasElement);
        const search = canvas.getByRole("textbox", { name: "ТЕГИ search", });

        await user.keyboard("{ArrowDown}");
        await user.keyboard("{Enter}");

        await expect(search).toHaveFocus();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(within(listbox).queryAllByRole("option", { selected: true, }).length).toBe(0);
    },
};

// Escape closes from the search field.
export const SearchableEscapeCloses: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", defaultValue: [], },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const { toggle, } = await openList(canvasElement);

        await user.keyboard("{Escape}");

        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(canvas.queryByRole("listbox")).toBeNull();
    },
};

// Both-theme computed surfaces for the invalid / disabled states.
export const InvalidSurfaceLight: Story = {
    args: { ...reference, invalid: true, error: "Выберите тег", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".multiSelect__control") as HTMLElement;

        await expect(getComputedStyle(control).borderColor).toBe("rgb(220, 38, 38)");
    },
};

export const InvalidSurfaceDark: Story = {
    args: { ...reference, invalid: true, error: "Выберите тег", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".multiSelect__control") as HTMLElement;

        await expect(getComputedStyle(control).borderColor).toBe("rgb(248, 113, 113)");
    },
};

export const DisabledSurfaceLight: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".multiSelect__control") as HTMLElement;
        const toggle = canvasElement.querySelector(".multiSelect__toggle") as HTMLElement;

        await expect(getComputedStyle(control).backgroundColor).toBe("rgb(241, 245, 249)");
        await expect(getComputedStyle(control).cursor).toBe("not-allowed");
        await expect(getComputedStyle(toggle).color).toBe("rgb(148, 163, 184)");
    },
};

export const DisabledSurfaceDark: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const control = canvasElement.querySelector(".multiSelect__control") as HTMLElement;
        const toggle = canvasElement.querySelector(".multiSelect__toggle") as HTMLElement;

        await expect(getComputedStyle(control).backgroundColor).toBe("rgb(15, 23, 42)");
        await expect(getComputedStyle(control).cursor).toBe("not-allowed");
        await expect(getComputedStyle(toggle).color).toBe("rgb(71, 85, 105)");
    },
};
