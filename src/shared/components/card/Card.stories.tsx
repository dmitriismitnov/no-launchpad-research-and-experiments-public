import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, waitFor, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import cardMediaFixture from "./assets/card-media.fixture.png";
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
            src: cardMediaFixture,
            alt: "Card media fixture",
        },
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const image = canvas.getByRole("img", { name: "Card media fixture", });
        const media = image.closest(".card__media");

        if ( !( image instanceof HTMLImageElement ) ) {
            throw new Error("Supplied Card media must render as an HTML image");
        }

        if ( media === null ) {
            throw new Error("Supplied image must render inside the Card media slot");
        }

        await expect(canvasElement.querySelectorAll("svg").length).toBe(0);
        await waitFor(() => expect(image.complete).toBe(true));
        await waitFor(() => expect(image.naturalWidth).toBeGreaterThan(0));
        await expect(getComputedStyle(image).objectFit).toBe("cover");

        const imageRect = image.getBoundingClientRect();
        const mediaRect = media.getBoundingClientRect();

        await expect(Math.abs(imageRect.width - mediaRect.width)).toBeLessThan(1);
        await expect(Math.abs(imageRect.height - mediaRect.height)).toBeLessThan(1);
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

export const FooterAlignments: Story = {
    args: { title: "Footer alignments", },
    parameters: { controls: { disable: true, }, },
    render: () => (
        <ThemeShell theme="light">
            <div className={stack}>
                <div className={frame} data-case="notes">
                    <Card title="Notes" footer={{ primaryNote: "0…400 бар", secondaryNote: "4…20 мА", }} />
                </div>
                <div className={frame} data-case="secondary">
                    <Card title="Secondary only" footer={{ secondaryNote: "4…20 мА", }} />
                </div>
                <div className={frame} data-case="notes-action">
                    <Card
                        title="Notes and action"
                        footer={{ primaryNote: "0…400 бар", secondaryNote: "4…20 мА", }}
                        actionButton={{ children: "Details", }}
                    />
                </div>
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const rect = (root: Element, selector: string): DOMRect =>
            ( root.querySelector(selector) as Element ).getBoundingClientRect();
        const caseOf = (name: string): Element => canvasElement.querySelector(`[data-case="${name}"]`) as Element;

        const near = (a: number, b: number): boolean => Math.abs(a - b) < 2;

        // Notes only: primary anchored start, secondary anchored end.
        const notes = caseOf("notes");
        const notesFooter = rect(notes, ".card__footer");
        await expect(rect(notes, ".card__footerPrimary").left).toBeLessThan(
            rect(notes, ".card__footerSecondary").left,
        );
        await expect(near(rect(notes, ".card__footerSecondary").right, notesFooter.right)).toBe(true);

        // Secondary only: it stays at the trailing edge.
        const secondary = caseOf("secondary");
        await expect(
            near(rect(secondary, ".card__footerSecondary").right, rect(secondary, ".card__footer").right),
        ).toBe(true);

        // Notes plus action: the note group and the action share the trailing edge.
        const withAction = caseOf("notes-action");
        const actionFooter = rect(withAction, ".card__footer");
        const action = rect(withAction, ".card__actionButton");
        const trailingNote = rect(withAction, ".card__footerSecondary");
        await expect(near(action.right, actionFooter.right)).toBe(true);
        await expect(trailingNote.right).toBeLessThanOrEqual(action.left);
        await expect(action.left - trailingNote.right).toBeLessThan(20);
        await expect(rect(withAction, ".card__footerPrimary").left).toBeLessThan(trailingNote.left);
    },
};

export const Light: Story = {
    args: { ...catalog, actionButton: { children: "Details", }, },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const article = canvasElement.querySelector("article");
        const title = canvasElement.querySelector(".card__title");
        const description = canvasElement.querySelector(".card__description");

        if ( article === null || title === null || description === null ) {
            throw new Error("Light Card story must render its surface and text slots");
        }

        await expect(getComputedStyle(article).backgroundColor).toBe("rgb(255, 255, 255)");
        await expect(getComputedStyle(title).color).toBe("rgb(0, 0, 0)");
        await expect(getComputedStyle(description).color).toBe("rgb(83, 89, 99)");
    },
};

export const Dark: Story = {
    args: { ...catalog, actionButton: { children: "Details", }, },
    render: renderIn("dark"),
    play: async ({ canvasElement, }) => {
        const article = canvasElement.querySelector("article");
        const title = canvasElement.querySelector(".card__title");
        const description = canvasElement.querySelector(".card__description");

        if ( article === null || title === null || description === null ) {
            throw new Error("Dark Card story must render its surface and text slots");
        }

        await expect(getComputedStyle(article).backgroundColor).toBe("rgb(0, 0, 0)");
        await expect(getComputedStyle(title).color).toBe("rgb(255, 255, 255)");
        await expect(getComputedStyle(description).color).toBe("rgb(136, 143, 152)");
    },
};
