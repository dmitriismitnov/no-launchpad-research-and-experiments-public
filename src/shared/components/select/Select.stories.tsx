import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";
import { useState, } from "react";

import { expect, fireEvent, userEvent, within, } from "storybook/test";

import type { SelectGroup, SelectOption, SelectProps, } from "./select";
import { Select, } from "./select";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ width: "260px", });

const anchoredBottom = css({
    position: "fixed",
    left: "x12",
    bottom: "x2",
    width: "260px",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: SelectProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Select {...args} />
        </div>
    </ThemeShell>
);

const options: readonly SelectOption[] = [
    { value: "starter", label: "Starter", },
    { value: "team", label: "Team", },
    { value: "enterprise", label: "Enterprise", disabled: true, },
];

const groups: readonly SelectGroup[] = [
    {
        label: "FOUNDATION",
        options: [
            { value: "colors", label: "Colors", },
            { value: "type", label: "Type", },
        ],
    },
    {
        label: "COMPONENTS",
        options: [
            { value: "button", label: "Button", },
        ],
    },
];

// The PEN reference (`Select`, id `tOLtR`) with its closed, empty trigger.
const reference: SelectProps = {
    label: "КОМАНДА",
    placeholder: "Выберите команду",
    options,
};

const meta = {
    title: "Components/Forms & selection/Select",
    component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "КОМАНДА",
        placeholder: "Выберите команду",
        options,
        invalid: false,
        error: "Выберите значение",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
        await expect(canvas.getByText("Выберите команду")).toBeTruthy();
        await expect(canvas.queryByRole("listbox")).toBeNull();
    },
};

export const Filled: Story = {
    args: { ...reference, defaultValue: "team", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toHaveTextContent("Team");
        await expect(canvas.queryByText("Выберите команду")).toBeNull();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Выберите значение", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await expect(trigger).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Выберите значение");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toBeDisabled();
    },
};

const assertThemeTrigger = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

    await expect(getComputedStyle(trigger).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeTrigger(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeTrigger(context, "rgb(2, 6, 23)"),
};

const openPopup = async (
    canvasElement: HTMLElement,
): Promise<{ trigger: HTMLElement; listbox: HTMLElement; popup: HTMLElement; }> => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

    await user.click(trigger);

    const listbox = canvas.getByRole("listbox");
    const popup = canvasElement.querySelector(".select__popup") as HTMLElement;

    return { trigger, listbox, popup, };
};

export const OpenPopup: Story = {
    args: { ...reference, defaultValue: "team", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const { trigger, listbox, popup, } = await openPopup(canvasElement);

        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length);
        await expect(within(listbox).getByRole("option", { name: "Team", })).toHaveAttribute(
            "aria-selected",
            "true",
        );
        await expect(within(listbox).getByRole("option", { name: "Enterprise", })).toBeDisabled();
        await expect(getComputedStyle(popup).backgroundColor).toBe("rgb(248, 250, 252)");
    },
};

export const DarkOpenPopup: Story = {
    args: { ...reference, defaultValue: "team", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const { listbox, popup, } = await openPopup(canvasElement);

        await expect(within(listbox).getByRole("option", { name: "Team", })).toHaveAttribute(
            "aria-selected",
            "true",
        );
        await expect(getComputedStyle(popup).backgroundColor).toBe("rgb(2, 6, 23)");
    },
};

export const GroupedOptions: Story = {
    args: { ...reference, groups, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const { listbox, } = await openPopup(canvasElement);
        const foundation = within(listbox).getByRole("group", { name: "FOUNDATION", });
        const components = within(listbox).getByRole("group", { name: "COMPONENTS", });

        await expect(within(foundation).getAllByRole("option").length).toBe(2);
        await expect(within(components).getByRole("option", { name: "Button", })).toBeTruthy();
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length + 3);
    },
};

export const DarkGroupedOptions: Story = {
    args: { ...reference, groups, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const { listbox, } = await openPopup(canvasElement);

        await expect(within(listbox).getByRole("group", { name: "FOUNDATION", })).toBeTruthy();
        await expect(within(listbox).getAllByRole("option").length).toBe(options.length + 3);
    },
};

export const PrefixIcon: Story = {
    args: { ...reference, prefixIcon: "folder", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const prefix = canvasElement.querySelector(".select__prefixIcon") as HTMLElement;

        await expect(prefix).toBeTruthy();
        await expect(prefix.querySelector("[aria-hidden='true']")).toBeTruthy();
        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toBeTruthy();
    },
};

export const DarkPrefixIcon: Story = {
    args: { ...reference, prefixIcon: "folder", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvasElement.querySelector(".select__prefixIcon")).toBeTruthy();
        await expect(canvas.getByRole("combobox", { name: "КОМАНДА", })).toBeTruthy();
    },
};

const activeOptionLabel = (trigger: HTMLElement): string | null => {
    const id = trigger.getAttribute("aria-activedescendant");

    if ( id === null ) {
        return null;
    }

    return document.getElementById(id)?.textContent ?? null;
};

export const KeyboardSkipsDisabled: Story = {
    args: { ...reference, defaultValue: "starter", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const { trigger, } = await openPopup(canvasElement);

        // First enabled option is the active one on open.
        await expect(activeOptionLabel(trigger)).toContain("Starter");

        // ArrowDown wraps past the disabled "Enterprise" back to "Starter".
        await user.keyboard("{ArrowDown}");
        await expect(activeOptionLabel(trigger)).toContain("Team");
        await user.keyboard("{ArrowDown}");
        await expect(activeOptionLabel(trigger)).toContain("Starter");
    },
};

export const KeyboardEnterSelects: Story = {
    args: { ...reference, defaultValue: "starter", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const { trigger, } = await openPopup(canvasElement);

        await user.keyboard("{ArrowDown}");
        await expect(activeOptionLabel(trigger)).toContain("Team");
        await user.keyboard("{Enter}");

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toHaveTextContent("Team");
        await expect(canvasElement.querySelector(".select__status")?.textContent).toContain("Team selected");
    },
};

export const EscapeCloses: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const { trigger, } = await openPopup(canvasElement);

        await user.keyboard("{Escape}");

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toHaveFocus();
    },
};

export const UncontrolledSelection: Story = {
    args: { ...reference, defaultValue: "starter", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const { trigger, listbox, } = await openPopup(canvasElement);

        await user.click(within(listbox).getByRole("option", { name: "Team", }));

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toHaveTextContent("Team");
    },
};

const ControlledProbe = ({ theme, }: { theme: "light" | "dark"; }) => {
    const [ last, setLast, ] = useState("");

    return (
        <ThemeShell theme={theme}>
            <div className={frame}>
                <Select label="КОМАНДА" value="starter" options={options} onChange={setLast} />
                <p data-testid="last">{last}</p>
            </div>
        </ThemeShell>
    );
};

export const ControlledSelection: Story = {
    render: () => <ControlledProbe theme="light" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);
        await user.click(within(canvas.getByRole("listbox")).getByRole("option", { name: "Team", }));

        await expect(trigger).toHaveTextContent("Starter");
        await expect(canvas.getByTestId("last")).toHaveTextContent("team");
    },
};

export const PopupMatchesTriggerWidth: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const { trigger, popup, } = await openPopup(canvasElement);
        const triggerWidth = trigger.getBoundingClientRect().width;
        const popupWidth = popup.getBoundingClientRect().width;

        await expect(Math.abs(popupWidth - triggerWidth)).toBeLessThanOrEqual(1);
    },
};

const FlipProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div className={anchoredBottom}>
            <Select label="КОМАНДА" placeholder="Выберите команду" options={options} />
        </div>
    </ThemeShell>
);

export const PopupFlipsTop: Story = {
    render: () => <FlipProbe theme="light" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const popup = canvasElement.querySelector(".select__popup") as HTMLElement;

        await expect(popup).toHaveAttribute("data-placement", "top");
        await expect(popup.getBoundingClientRect().bottom).toBeLessThanOrEqual(
            trigger.getBoundingClientRect().top + 1,
        );
    },
};

export const DarkPopupFlipsTop: Story = {
    render: () => <FlipProbe theme="dark" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const popup = canvasElement.querySelector(".select__popup") as HTMLElement;

        await expect(popup).toHaveAttribute("data-placement", "top");
    },
};

export const SearchableQuery: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);

        await user.click(canvas.getByRole("combobox", { name: "КОМАНДА", }));

        const search = canvas.getByRole("textbox", { name: "КОМАНДА search", });

        await user.type(search, "zzz");

        await expect(search).toHaveValue("zzz");
        // No local filtering: every option is still rendered.
        await expect(within(canvas.getByRole("listbox")).getAllByRole("option").length).toBe(options.length);
    },
};

export const DarkSearchableQuery: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);

        await user.click(canvas.getByRole("combobox", { name: "КОМАНДА", }));

        const search = canvas.getByRole("textbox", { name: "КОМАНДА search", });

        await user.type(search, "abc");

        await expect(search).toHaveValue("abc");
        await expect(within(canvas.getByRole("listbox")).getAllByRole("option").length).toBe(options.length);
    },
};

const ControlledQueryProbe = ({ theme, }: { theme: "light" | "dark"; }) => {
    const [ last, setLast, ] = useState("");

    return (
        <ThemeShell theme={theme}>
            <div className={frame}>
                <Select label="КОМАНДА" searchable query="" options={options} onQueryChange={setLast} />
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

        await user.click(canvas.getByRole("combobox", { name: "КОМАНДА", }));

        const search = canvas.getByRole("textbox", { name: "КОМАНДА search", });

        await fireEvent.change(search, { target: { value: "abc", }, });

        await expect(search).toHaveValue("");
        await expect(canvas.getByTestId("last")).toHaveTextContent("abc");
    },
};

// A multi-word query is the cheapest way to prove the search field owns the
// space key: with root key handling active it would select the active option.
export const SearchableQueryAlphaBeta: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const search = canvas.getByRole("textbox", { name: "КОМАНДА search", });

        await user.type(search, "alpha beta");

        await expect(search).toHaveValue("alpha beta");
        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(trigger).toHaveTextContent("Выберите команду");
        await expect(within(canvas.getByRole("listbox")).getAllByRole("option").length).toBe(
            options.length,
        );
    },
};

// Arrow keys stay in the text field: they never move the root active option.
export const SearchableArrowKeysStayLocal: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const search = canvas.getByRole("textbox", { name: "КОМАНДА search", });
        const activeBefore = activeOptionLabel(trigger);

        await user.keyboard("{ArrowDown}");
        await expect(activeOptionLabel(trigger)).toBe(activeBefore);

        await user.keyboard("{ArrowUp}");
        await expect(activeOptionLabel(trigger)).toBe(activeBefore);

        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(search).toHaveFocus();
    },
};

// Enter stays in the text field: it never selects the root active option.
export const SearchableEnterStaysLocal: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);
        await user.keyboard("{Enter}");

        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(trigger).toHaveTextContent("Выберите команду");
        await expect(canvasElement.querySelector(".select__status")?.textContent).toBe("");
    },
};

// Escape is the one key the search field forwards: it closes and refocuses.
export const SearchableEscapeClosesAndRefocuses: Story = {
    args: { ...reference, searchable: true, defaultQuery: "", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);
        await user.keyboard("{Escape}");

        await expect(trigger).toHaveAttribute("aria-expanded", "false");
        await expect(trigger).toHaveFocus();
    },
};

// A single grouped option keeps the legacy row estimate (1 x 36 + 12 = 48px)
// under the 60px gap, while the real popup (search row + group label + option)
// renders taller than 60px. Placement must follow the measured height.
const shortSpaceGroups: readonly SelectGroup[] = [
    {
        label: "ONLY",
        options: [
            { value: "single", label: "Single", },
        ],
    },
];

// Inline style keeps the 60px gap exact; the `bottom` utility drops raw px.
const anchoredShortSpace = {
    position: "fixed",
    left: "24px",
    bottom: "60px",
    width: "280px",
} as const;

const MeasuredFlipProbe = ({ theme, }: { theme: "light" | "dark"; }) => (
    <ThemeShell theme={theme}>
        <div style={anchoredShortSpace}>
            <Select label="КОМАНДА" searchable options={[]} groups={shortSpaceGroups} />
        </div>
    </ThemeShell>
);

export const SearchableGroupedPopupFlipsOnMeasuredHeight: Story = {
    render: () => <MeasuredFlipProbe theme="light" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const popup = canvasElement.querySelector(".select__popup") as HTMLElement;
        const renderedHeight = popup.getBoundingClientRect().height;
        const spaceBelow = window.innerHeight - trigger.getBoundingClientRect().bottom;
        const spaceAbove = trigger.getBoundingClientRect().top;

        await expect(renderedHeight).toBeGreaterThan(60);
        await expect(spaceBelow).toBeLessThanOrEqual(60);
        await expect(spaceAbove).toBeGreaterThanOrEqual(100);
        await expect(popup).toHaveAttribute("data-placement", "top");
    },
};

export const DarkSearchableGroupedPopupFlipsOnMeasuredHeight: Story = {
    render: () => <MeasuredFlipProbe theme="dark" />,
    play: async ({ canvasElement, }) => {
        const user = userEvent.setup();
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("combobox", { name: "КОМАНДА", });

        await user.click(trigger);

        const popup = canvasElement.querySelector(".select__popup") as HTMLElement;

        await expect(popup.getBoundingClientRect().height).toBeGreaterThan(60);
        await expect(popup).toHaveAttribute("data-placement", "top");
    },
};

// Both-theme computed surfaces for the invalid / disabled states.
export const InvalidSurfaceLight: Story = {
    args: { ...reference, invalid: true, error: "Выберите значение", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const trigger = canvasElement.querySelector(".select__trigger") as HTMLElement;

        await expect(getComputedStyle(trigger).borderColor).toBe("rgb(220, 38, 38)");
    },
};

export const InvalidSurfaceDark: Story = {
    args: { ...reference, invalid: true, error: "Выберите значение", },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const trigger = canvasElement.querySelector(".select__trigger") as HTMLElement;

        await expect(getComputedStyle(trigger).borderColor).toBe("rgb(248, 113, 113)");
    },
};

export const DisabledSurfaceLight: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const trigger = canvasElement.querySelector(".select__trigger") as HTMLElement;
        const style = getComputedStyle(trigger);

        await expect(style.backgroundColor).toBe("rgb(241, 245, 249)");
        await expect(style.color).toBe("rgb(148, 163, 184)");
        await expect(style.cursor).toBe("not-allowed");
    },
};

export const DisabledSurfaceDark: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const trigger = canvasElement.querySelector(".select__trigger") as HTMLElement;
        const style = getComputedStyle(trigger);

        await expect(style.backgroundColor).toBe("rgb(15, 23, 42)");
        await expect(style.color).toBe("rgb(71, 85, 105)");
        await expect(style.cursor).toBe("not-allowed");
    },
};
