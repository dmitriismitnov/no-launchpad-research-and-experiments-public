import type { Meta, StoryObj, } from "@storybook/react-vite";

import { css, } from "@shared/styled-system/css";

import { Link, } from "./link";

const row = css({
    display: "flex",
    alignItems: "center",
    gap: "x8",
    flexWrap: "wrap",
});

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
