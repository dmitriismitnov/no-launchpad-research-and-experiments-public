import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { type ButtonSize, type ButtonTone, } from "@shared/components/button";
import { ICON_CODEPOINTS, type IconName, } from "@shared/components/icon/manifest.generated";

import cardMediaFixture from "./assets/card-media.fixture.png";
import { Card, type CardProps, } from "./card";

const iconNames = Object.keys(ICON_CODEPOINTS) as IconName[];

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

const compactFrame = css({ width: "280px", });

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

type PlaygroundArgs = CardProps & {
    useSuppliedMedia: boolean;
    mediaSrc: string;
    mediaAlt: string;
    showHeader: boolean;
    headerLabel: string;
    headerIcon: IconName;
    showFooter: boolean;
    footerPrimaryNote: string;
    footerSecondaryNote: string;
    showAction: boolean;
    actionLabel: string;
    actionTone: ButtonTone;
    actionSize: ButtonSize;
};

const renderPlayground = ({
    useSuppliedMedia,
    mediaSrc,
    mediaAlt,
    showHeader,
    headerLabel,
    headerIcon,
    showFooter,
    footerPrimaryNote,
    footerSecondaryNote,
    showAction,
    actionLabel,
    actionTone,
    actionSize,
    media: _media,
    header: _header,
    footer: _footer,
    actionButton: _actionButton,
    ...cardProps
}: PlaygroundArgs) =>
    renderIn("light")({
        ...cardProps,
        media: useSuppliedMedia ? { src: mediaSrc, alt: mediaAlt, } : undefined,
        header: showHeader ? { label: headerLabel, icon: headerIcon, } : undefined,
        footer: showFooter
            ? { primaryNote: footerPrimaryNote, secondaryNote: footerSecondaryNote, }
            : undefined,
        actionButton: showAction ? { children: actionLabel, tone: actionTone, size: actionSize, } : undefined,
    });

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
    parameters: {
        layout: "fullscreen",
        controls: { sort: "none", },
        docs: { codePanel: true, },
    },
    argTypes: {
        variant: {
            control: { type: "select", },
            options: [ "default", "plain", "compact", ],
            table: { category: "Content", },
        },
        title: { control: { type: "text", }, table: { category: "Content", }, },
        description: { control: { type: "text", }, table: { category: "Content", }, },
        media: { control: false, },
        header: { control: false, },
        footer: { control: false, },
        actionButton: { control: false, },
        useSuppliedMedia: { control: { type: "boolean", }, table: { category: "Media", }, },
        mediaSrc: {
            control: { type: "text", },
            if: { arg: "useSuppliedMedia", },
            table: { category: "Media", },
        },
        mediaAlt: {
            control: { type: "text", },
            if: { arg: "useSuppliedMedia", },
            table: { category: "Media", },
        },
        showHeader: { control: { type: "boolean", }, table: { category: "Header", }, },
        headerLabel: {
            control: { type: "text", },
            if: { arg: "showHeader", },
            table: { category: "Header", },
        },
        headerIcon: {
            control: { type: "select", },
            options: iconNames,
            if: { arg: "showHeader", },
            table: { category: "Header", },
        },
        showFooter: { control: { type: "boolean", }, table: { category: "Footer", }, },
        footerPrimaryNote: {
            control: { type: "text", },
            if: { arg: "showFooter", },
            table: { category: "Footer", },
        },
        footerSecondaryNote: {
            control: { type: "text", },
            if: { arg: "showFooter", },
            table: { category: "Footer", },
        },
        showAction: { control: { type: "boolean", }, table: { category: "Action", }, },
        actionLabel: {
            control: { type: "text", },
            if: { arg: "showAction", },
            table: { category: "Action", },
        },
        actionTone: {
            control: { type: "select", },
            options: [ "primary", "secondary", "ghost", ],
            if: { arg: "showAction", },
            table: { category: "Action", },
        },
        actionSize: {
            control: { type: "select", },
            options: [ "sm", "md", ],
            if: { arg: "showAction", },
            table: { category: "Action", },
        },
    },
} satisfies Meta<PlaygroundArgs>;

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
    args: {
        variant: "default",
        title: "Card title",
        description: "Supporting description that explains the card's subject.",
        useSuppliedMedia: false,
        mediaSrc: cardMediaFixture,
        mediaAlt: "Card media fixture",
        showHeader: true,
        headerLabel: "01",
        headerIcon: "gauge",
        showFooter: true,
        footerPrimaryNote: "0…400 бар",
        footerSecondaryNote: "4…20 мА",
        showAction: true,
        actionLabel: "Details",
        actionTone: "primary",
        actionSize: "sm",
    },
    render: renderPlayground,
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

export const Plain: Story = {
    args: {
        variant: "plain",
        title: "Card title",
        description: "Supporting description that explains the card.",
        footer: { primaryNote: "Updated 2h ago", secondaryNote: "Open", },
    },
    render: renderIn("light"),
    play: async ({ canvasElement, }) => {
        const article = canvasElement.querySelector("article") as Element;
        const footer = canvasElement.querySelector(".card__footer") as Element;

        await expect(canvasElement.querySelector(".card__media")).toBeNull();
        await expect(canvasElement.querySelector(".card__title")).not.toBeNull();
        await expect(article.className).toContain("card__root--variant_plain");
        await expect(getComputedStyle(footer).borderTopWidth).toBe("0px");
    },
};

export const Compact: Story = {
    args: {
        variant: "compact",
        title: "Compact card",
        description: "Dense metadata only.",
    },
    render: (args: CardProps) => (
        <ThemeShell theme="light">
            <div className={stack}>
                <div className={compactFrame}>
                    <Card {...args} />
                </div>
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const article = canvasElement.querySelector("article") as Element;
        const title = canvasElement.querySelector(".card__title") as Element;

        await expect(canvasElement.querySelector(".card__media")).toBeNull();
        await expect(article.className).toContain("card__root--variant_compact");
        await expect(getComputedStyle(title).fontSize).toBe("14px");
        // Pen `Card Compact` (XqPjN) source geometry is 280px.
        await expect(Math.round(article.getBoundingClientRect().width)).toBe(280);
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
        await expect(getComputedStyle(title).color).toBe("rgb(15, 23, 42)");
        await expect(getComputedStyle(description).color).toBe("rgb(51, 65, 85)");
        // Pen Card description is `sm` (14px) on a 1.4 line height.
        await expect(getComputedStyle(description).lineHeight).toBe("19.6px");
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

        await expect(getComputedStyle(article).backgroundColor).toBe("rgb(15, 23, 42)");
        await expect(getComputedStyle(title).color).toBe("rgb(248, 250, 252)");
        await expect(getComputedStyle(description).color).toBe("rgb(203, 213, 225)");
        // Pen Card description is `sm` (14px) on a 1.4 line height.
        await expect(getComputedStyle(description).lineHeight).toBe("19.6px");
    },
};

// Pen `l3a7qL`: the resting roles (raised surface, subtle boundary,
// `text/primary` title, `text/secondary` description) are already captured by
// `Light`/`Dark`. The interactive card's `focus-visible` specimen (`fz3DO` /
// `q4UQZm` / `X3L3d2`) resolves a 2px outer `focus/ring` — green.600 light
// (`rgb(22, 163, 74)`) and green.500 dark (`rgb(34, 197, 94)`). The Card has no
// declared interactive variant, so the ring is observed by making the native
// article focusable; a declared interactive variant is BLOCKED.
const assertFocusRing = (ring: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const article = canvasElement.querySelector("article") as HTMLElement;

    await user.tab();
    await expect(article).toHaveFocus();

    const style = getComputedStyle(article);
    await expect(style.outlineStyle).toBe("solid");
    await expect(style.outlineWidth).toBe("2px");
    await expect(style.outlineColor).toBe(ring);
};

const renderFocus = (theme: "light" | "dark") => () => (
    <ThemeShell theme={theme}>
        <div className={stack}>
            <div className={frame}>
                <Card title="Focusable card" tabIndex={0} />
            </div>
        </div>
    </ThemeShell>
);

export const TokenFocusLight: Story = {
    args: { title: "Focusable card", },
    render: renderFocus("light"),
    play: assertFocusRing("rgb(22, 163, 74)"),
};

export const TokenFocusDark: Story = {
    args: { title: "Focusable card", },
    render: renderFocus("dark"),
    play: assertFocusRing("rgb(34, 197, 94)"),
};
