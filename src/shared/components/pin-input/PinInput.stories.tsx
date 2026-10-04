import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import type { PinInputProps, } from "./pin-input";
import { PinInput, } from "./pin-input";

import { css, } from "@shared/styled-system/css";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({ display: "flex", flexDirection: "column", gap: "x8", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: PinInputProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <PinInput {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Pin Input`, id `K8gNTw`) with a partial code.
const reference: PinInputProps = {
    label: "КОД",
    length: 4,
    defaultValue: "482",
};

const cells = (canvasElement: HTMLElement): Array<Element> =>
    Array.from(canvasElement.querySelectorAll(".pinInput__cell"));

const activeCellIndex = (canvasElement: HTMLElement): number =>
    cells(canvasElement).findIndex((cell) => cell.getAttribute("data-active") === "true");

const meta = {
    title: "Components/Forms & selection/Pin Input",
    component: PinInput,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "length", "masked", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        length: { control: { type: "number", }, },
        masked: { control: { type: "boolean", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: "КОД",
        length: 4,
        defaultValue: "482",
        masked: false,
        invalid: false,
        error: "Неверный код",
    },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "КОД", });

        await expect(input).toHaveValue("482");
        await expect(input).toHaveAttribute("autocomplete", "one-time-code");
        await expect(cells(canvasElement).length).toBe(4);
    },
};

export const SingleAccessibleInput: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const inputs = canvasElement.querySelectorAll(".pinInput__input");

        await expect(inputs.length).toBe(1);
        await expect(canvas.getByRole("textbox", { name: "КОД", })).toHaveAttribute(
            "autocomplete",
            "one-time-code",
        );
        await expect(cells(canvasElement).every((cell) => cell.getAttribute("aria-hidden") === "true"))
            .toBe(true);
        await expect(
            canvas.getByRole("status").textContent,
        ).toBe("1 character remaining");
    },
};

export const TypingAdvances: Story = {
    args: { label: "КОД", length: 4, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        input.focus();
        await user.keyboard("1");
        await expect(input).toHaveValue("1");
        await expect(activeCellIndex(canvasElement)).toBe(1);

        await user.keyboard("2");
        await expect(input).toHaveValue("12");
        await expect(activeCellIndex(canvasElement)).toBe(2);
    },
};

export const BackspaceStepsBack: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        input.focus();
        await user.keyboard("{Backspace}");
        await expect(input).toHaveValue("4");
        await expect(activeCellIndex(canvasElement)).toBe(1);
        await expect(cells(canvasElement)[1]?.textContent).toBe("");
    },
};

export const ArrowKeysMoveMarker: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        input.focus();
        await user.keyboard("{ArrowLeft}");
        await expect(activeCellIndex(canvasElement)).toBe(1);
        await user.keyboard("{ArrowRight}");
        await expect(activeCellIndex(canvasElement)).toBe(2);
    },
};

export const ArrowThenType: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        input.focus();
        await user.keyboard("{ArrowLeft}");
        await expect(activeCellIndex(canvasElement)).toBe(1);

        await user.keyboard("9");
        await expect(input).toHaveValue("498");
        await expect(activeCellIndex(canvasElement)).toBe(2);
    },
};

export const PasteFillsCode: Story = {
    args: { label: "КОД", length: 4, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        input.focus();
        await user.paste("13-57");
        await expect(input).toHaveValue("1357");
        await expect(activeCellIndex(canvasElement)).toBe(3);
    },
};

export const LiveRemaining: Story = {
    args: { label: "КОД", length: 6, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();
        const input = canvas.getByRole("textbox", { name: "КОД", });

        await expect(canvas.getByRole("status").textContent).toBe("6 characters remaining");
        input.focus();
        await user.keyboard("12");
        await expect(canvas.getByRole("status").textContent).toBe("4 characters remaining");
    },
};

export const SixCells: Story = {
    args: { label: "КОД", length: 6, defaultValue: "135790", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(cells(canvasElement).length).toBe(6);
        await expect(canvas.getByRole("textbox", { name: "КОД", })).toHaveAttribute(
            "maxlength",
            "6",
        );
    },
};

export const Masked: Story = {
    args: { label: "КОД", length: 4, defaultValue: "482", masked: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const input = canvasElement.querySelector(".pinInput__input") as HTMLInputElement;

        await expect(input.getAttribute("type")).toBe("password");
        await expect(cells(canvasElement).map((cell) => cell.textContent).join("")).toBe("•••");
    },
};

const assertActiveRing = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
): Promise<void> => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: "КОД", });

    input.focus();
    await user.keyboard("{ArrowLeft}");

    const active = canvasElement.querySelector('[data-active="true"]') as Element;

    await expect(getComputedStyle(active).outlineStyle).toBe("solid");
    await expect(getComputedStyle(active).outlineWidth).toBe("2px");
    await expect(getComputedStyle(active).outlineColor).toBe("rgb(34, 197, 94)");
};

export const ActiveCellRing: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("light"),
    play: assertActiveRing,
};

export const DarkActiveCellRing: Story = {
    args: { label: "КОД", length: 4, defaultValue: "48", },
    render: renderIn("dark"),
    play: assertActiveRing,
};

export const Invalid: Story = {
    args: { label: "КОД", length: 4, invalid: true, error: "Неверный код", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox", { name: "КОД", });

        await expect(input).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Неверный код");
    },
};

export const Disabled: Story = {
    args: { label: "КОД", length: 4, defaultValue: "482", disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("textbox", { name: "КОД", })).toBeDisabled();
    },
};

const assertThemeCell = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const cell = canvasElement.querySelector(".pinInput__cell") as Element;

    await expect(getComputedStyle(cell).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeCell(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeCell(context, "rgb(2, 6, 23)"),
};
