import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { AccordionItem, type AccordionItemProps, } from "./accordion-item";

const meta = {
    title: "Components/Navigation & disclosure/Accordion Item",
    component: AccordionItem,
    args: {
        title: "What are primitive tokens?",
        children: "Immutable raw values owned by the foundation layer.",
    },
} satisfies Meta<typeof AccordionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
    args: { defaultOpen: true, },
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole("button", { name: /What are primitive tokens/, });

        await expect(trigger).toHaveAttribute("aria-expanded", "true");
        await expect(within(canvasElement).getByRole("region")).toBeTruthy();
    },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

export const Stack: Story = {
    render: () => (
        <div>
            <AccordionItem title="What are primitive tokens?" defaultOpen>
                Immutable raw values owned by the foundation layer.
            </AccordionItem>
            <AccordionItem title="How do themes work?">
                Themes map the same semantic roles to light and dark values.
            </AccordionItem>
            <AccordionItem title="Can I override a component?">
                Component presets own their recipe; overrides belong to the consumer.
            </AccordionItem>
            <AccordionItem title="Deprecated" disabled>
                Hidden.
            </AccordionItem>
        </div>
    ),
};

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.50.background",
    color: "semantic.common.50.text",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: AccordionItemProps) => (
    <ThemeShell theme={theme}>
        <AccordionItem {...args} />
    </ThemeShell>
);

// Pen `YGgyy` token contract `vswcF`: focus/ring resolves green.600 light
// (`rgb(22, 163, 74)`) and green.500 dark (`rgb(34, 197, 94)`) with the shared
// 2px ring. Only light is discriminating: in dark the old brand fill and
// focus/ring both resolve green.500, so `FocusVisibleDark` is non-discriminating.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /What are primitive tokens/, });

    await user.tab();
    await expect(trigger).toHaveFocus();

    const style = getComputedStyle(trigger);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(outline);
};

export const FocusVisibleLight: Story = {
    render: renderIn("light"),
    play: assertFocusRing("rgb(22, 163, 74)"),
};

export const FocusVisibleDark: Story = {
    render: renderIn("dark"),
    play: assertFocusRing("rgb(34, 197, 94)"),
};
