import type { Meta, StoryObj, } from "@storybook/react-vite";

import { expect, within, } from "storybook/test";

import { AccordionItem, } from "./accordion-item";

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
