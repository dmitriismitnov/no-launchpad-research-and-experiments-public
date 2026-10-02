import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { Icon, } from "./icon";
import { ICON_CODEPOINTS, type IconName, } from "./manifest.generated";

const names = Object.keys(ICON_CODEPOINTS) as IconName[];
// The manifest is never empty: the build fails without at least one icon.
const defaultIcon = names[0]!;

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

const grid = css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(x25, 1fr))",
    gap: "x8",
});

const tile = css({
    display: "grid",
    justifyItems: "center",
    gap: "x2",
    fontSize: "sm",
    opacity: 0.8,
});

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const meta = {
    title: "Components/Icon",
    component: Icon,
    parameters: { layout: "fullscreen", },
    args: {
        name: defaultIcon,
        size: "md",
    },
    argTypes: {
        name: {
            control: { type: "select", },
            options: names,
        },
        size: {
            control: { type: "select", },
            options: [ "sm", "md", "lg", "xl", ],
        },
        label: {
            control: { type: "text", },
        },
    },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    render: (args) => (
        <ThemeShell theme="light">
            <div className={row}>
                <Icon {...args} />
            </div>
        </ThemeShell>
    ),
};

export const AllIcons: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={grid}>
                {names.map((name) => (
                    <div key={name} className={tile}>
                        <Icon name={name} size="lg" />
                        <span>{name}</span>
                    </div>
                ))}
            </div>
        </ThemeShell>
    ),
};

export const Sizes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Icon name={defaultIcon} size="sm" />
                <Icon name={defaultIcon} size="md" />
                <Icon name={defaultIcon} size="lg" />
                <Icon name={defaultIcon} size="xl" />
            </div>
        </ThemeShell>
    ),
};

export const LightAndDark: Story = {
    render: () => (
        <>
            <ThemeShell theme="light">
                <div className={row}>
                    <Icon name={defaultIcon} size="lg" />
                </div>
            </ThemeShell>
            <ThemeShell theme="dark">
                <div className={row}>
                    <Icon name={defaultIcon} size="lg" />
                </div>
            </ThemeShell>
        </>
    ),
};

export const DecorativeAndLabelled: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <div data-testid="decorative">
                    <Icon name={defaultIcon} />
                </div>
                <div data-testid="labelled">
                    <Icon name={defaultIcon} label="Next" />
                </div>
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const decorative = canvas.getByTestId("decorative").querySelector("span");
        const labelled = canvas.getByTestId("labelled").querySelector("span");

        await expect(decorative).toHaveAttribute("aria-hidden", "true");
        await expect(labelled).toHaveAttribute("role", "img");
        await expect(labelled).toHaveAttribute("aria-label", "Next");
    },
};
