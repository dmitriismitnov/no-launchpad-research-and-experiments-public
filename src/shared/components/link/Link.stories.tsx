import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, userEvent, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Link, type LinkProps, } from "./link";

const shell = css({
    padding: "x12",
    backgroundColor: "semantic.common.100.background",
    color: "semantic.common.100.text",
});

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
    flexWrap: "wrap",
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const renderIn = (theme: "light" | "dark") => (args: LinkProps) => (
    <ThemeShell theme={theme}>
        <div className={row}>
            <Link {...args} />
        </div>
    </ThemeShell>
);

const meta = {
    title: "Components/Navigation & disclosure/Link",
    component: Link,
    args: { href: "#", children: "Read the docs", },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
    render: () => (
        <div className={row}>
            <Link href="#">Link</Link>
            <Link href="#" tone="subtle">Subtle</Link>
            <Link href="#" tone="primary">Primary</Link>
        </div>
    ),
};

export const AlwaysUnderlined: Story = {
    args: { underline: "always", },
};

export const WithLeadingIcon: Story = {
    args: { leadingIcon: "file", children: "Design tokens", },
};

export const External: Story = {
    args: { external: true, children: "Open changelog", href: "https://example.com", },
};

export const Disabled: Story = {
    args: { disabled: true, },
};

// Pen `QWV5n` accessibility contract `DTTTs`: "External links announce that
// they leave the site." The glyph stays decorative and the sr-only phrase
// carries the meaning; no `target`/`rel` is added.
const assertExternalAnnouncement = async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /Open changelog/, });

    const hidden = link.querySelector(".link__visuallyHidden") as HTMLElement;
    await expect(hidden).not.toBeNull();
    await expect(hidden.textContent).toBe("External link");

    const glyph = link.querySelector(".link__trailingIcon") as Element;
    await expect(glyph).toHaveAttribute("aria-hidden", "true");
    await expect(link).not.toHaveAttribute("target");
};

export const ExternalAnnouncement: Story = {
    args: { external: true, children: "Open changelog", href: "https://example.com", },
    render: renderIn("light"),
    play: assertExternalAnnouncement,
};

export const DarkExternalAnnouncement: Story = {
    args: { external: true, children: "Open changelog", href: "https://example.com", },
    render: renderIn("dark"),
    play: assertExternalAnnouncement,
};

// Pen `QWV5n` token contract `Z4EDge`: the focus indicator resolves
// `semantic.focus.ring` — green.600 light (`rgb(22, 163, 74)`), green.500 dark
// (`rgb(34, 197, 94)`) — with the shared 2px geometry.
const assertFocusRing = (outline: string) => async ({ canvasElement, }: { canvasElement: HTMLElement; }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: /Read the docs/, });

    await user.tab();
    await expect(link).toHaveFocus();

    const style = getComputedStyle(link);
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
