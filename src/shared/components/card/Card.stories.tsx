import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Card, type CardProps, } from "./card";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const stack = css({
    display: "flex",
    flexDirection: "column",
    gap: "x8",
    alignItems: "flex-start",
});

const frame = css({ width: "320px", });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: CardProps) => (
    <ThemeShell theme={theme}>
        <div className={stack}>
            <div className={frame}>
                <Card {...args} />
            </div>
        </div>
    </ThemeShell>
);

// The PEN reference (`Card / Catalog`) expressed as an ordinary composition.
// Its domain data stays in the story, never in the public Card API.
const catalog: CardProps = {
    title: "Датчики давления",
    description: "Измерение давления жидкостей и газов в трубопроводах и резервуарах.",
    header: { label: "01", icon: "gauge", },
    footer: { primaryNote: "0…400 бар", secondaryNote: "4…20 мА", },
};

const meta = {
    title: "Components/Card",
    component: Card,
    parameters: { layout: "fullscreen", },
    argTypes: {
        title: { control: { type: "text", }, },
        description: { control: { type: "text", }, },
        header: { control: { type: "object", }, },
        footer: { control: { type: "object", }, },
        media: { control: { type: "object", }, },
        actionButton: { control: { type: "object", }, },
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        ...catalog,
        title: "Card title",
        description: "Supporting description that explains the card's subject.",
        actionButton: { children: "Details", },
    },
    render: renderIn("light"),
};

export const CatalogReference: Story = {
    args: catalog,
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelectorAll("article").length).toBe(1);
        await expect(canvasElement.textContent).toContain("Датчики давления");
        await expect(canvasElement.querySelector(".card__footerPrimary")).not.toBeNull();
    },
};

export const Minimal: Story = {
    args: { title: "Only a title", },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        // A title-only card keeps the media slot and drops every other region.
        await expect(canvasElement.querySelectorAll("article").length).toBe(1);
        await expect(canvasElement.querySelectorAll("h3").length).toBe(1);
        await expect(canvasElement.querySelectorAll("svg").length).toBe(1);
        await expect(canvasElement.querySelectorAll("img").length).toBe(0);

        for ( const slot of [ ".card__header", ".card__description", ".card__footer", ] ) {
            await expect(canvasElement.querySelector(slot)).toBeNull();
        }
    },
};

export const Media: Story = {
    args: {
        title: "Supplied media",
        description: "A supplied source replaces the bundled skeleton.",
        media: {
            src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=640&q=70&auto=format&fit=crop",
            alt: "A green sofa in a living room",
        },
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const image = canvas.getByRole("img", { name: "A green sofa in a living room", });

        await expect(image.getAttribute("src")).toContain("unsplash");
        await expect(canvasElement.querySelectorAll("svg").length).toBe(0);
    },
};

export const ActionButton: Story = {
    args: {
        ...catalog,
        title: "Pressure sensors",
        description: "The footer action is a Card-created Button.",
        actionButton: { children: "Details", },
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: "Details", });

        await expect(button.className).toContain("button__root--size_sm");
    },
};

export const Light: Story = {
    args: { ...catalog, actionButton: { children: "Details", }, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector("article")).not.toBeNull();
    },
};

export const Dark: Story = {
    args: { ...catalog, actionButton: { children: "Details", }, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        await expect(canvasElement.querySelector("article")).not.toBeNull();
    },
};
