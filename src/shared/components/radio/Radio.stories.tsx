import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, fireEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Radio, type RadioProps, } from "./radio";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const frame = css({
    display: "flex",
    flexDirection: "column",
    gap: "x8",
    width: "260px",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: RadioProps) => (
    <ThemeShell theme={theme}>
        <div className={frame}>
            <Radio {...args} />
        </div>
    </ThemeShell>
);

// The PEN reference (`Radio`, id `UrFJz`).
const reference: RadioProps = { label: "Radio", name: "radio", value: "radio", };

const meta = {
    title: "Components/Forms & selection/Radio",
    component: Radio,
    parameters: {
        layout: "fullscreen",
        controls: {
            sort: "none",
            include: [ "label", "invalid", "error", "disabled", ],
        },
    },
    argTypes: {
        label: { control: { type: "text", }, },
        invalid: { control: { type: "boolean", }, },
        error: { control: { type: "text", }, },
        disabled: { control: { type: "boolean", }, },
    },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: { label: "Radio", name: "radio", value: "radio", invalid: false, error: "Select one option", },
    render: renderIn("light"),
};

export const Reference: Story = {
    args: reference,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "Radio", })).not.toBeChecked();
    },
};

export const Selected: Story = {
    args: { ...reference, defaultChecked: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "Radio", })).toBeChecked();
    },
};

export const Group: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={frame}>
                <Radio label="Starter" name="plan" value="starter" defaultChecked />
                <Radio label="Team" name="plan" value="team" />
                <Radio label="Enterprise" name="plan" value="enterprise" />
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const starter = canvas.getByRole("radio", { name: "Starter", });
        const team = canvas.getByRole("radio", { name: "Team", });

        await expect(starter).toBeChecked();

        await fireEvent.click(team);
        await expect(team).toBeChecked();
        await expect(starter).not.toBeChecked();
    },
};

export const Invalid: Story = {
    args: { ...reference, invalid: true, error: "Select one option", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const radio = canvas.getByRole("radio", { name: "Radio", });

        await expect(radio).toHaveAttribute("aria-invalid", "true");
        await expect(canvasElement.textContent).toContain("Select one option");
    },
};

export const Disabled: Story = {
    args: { ...reference, disabled: true, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByRole("radio", { name: "Radio", })).toBeDisabled();
    },
};

const assertThemeBox = async (
    { canvasElement, }: { canvasElement: HTMLElement; },
    background: string,
): Promise<void> => {
    const box = canvasElement.querySelector(".radio__box") as Element;

    await expect(getComputedStyle(box).backgroundColor).toBe(background);
};

export const Light: Story = {
    args: reference,
    render: renderIn("light"),
    play: async (context) => assertThemeBox(context, "rgb(248, 250, 252)"),
};

export const Dark: Story = {
    args: reference,
    render: renderIn("dark"),
    play: async (context) => assertThemeBox(context, "rgb(2, 6, 23)"),
};
