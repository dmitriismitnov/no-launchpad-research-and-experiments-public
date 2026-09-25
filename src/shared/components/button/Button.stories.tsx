import type { Meta, StoryObj, } from "@storybook/react-vite";
import type { ReactNode, } from "react";

import { useEffect, useRef, useState, } from "react";

import { expect, within, } from "storybook/test";

import { css, } from "@shared/styled-system/css";

import { ICON_CODEPOINTS, type IconName, } from "../icon/manifest.generated";
import type { ButtonProps, } from "./button";
import { Button, } from "./button";

const iconNames = Object.keys(ICON_CODEPOINTS) as IconName[];

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

const matrix = css({
    display: "grid",
    gap: "x8",
});

const matrixRow = css({
    display: "grid",
    gridTemplateColumns: "1fr repeat(5, auto)",
    alignItems: "center",
    gap: "x8",
});

const cell = css({
    display: "grid",
    justifyItems: "center",
    gap: "x2",
});

const stateLabel = css({ fontSize: "sm", opacity: 0.6, });

const ThemeShell = ({ theme, children, }: { theme: "light" | "dark"; children: ReactNode; }) => (
    <div data-theme={theme}>
        <div className={shell}>{children}</div>
    </div>
);

const tones = [ "primary", "secondary", "ghost", ] as const;

// Storybook-only state metadata. Uses data attributes so interaction states are
// deterministic and independent of pointer timing.
const states = [ "default", "hover", "active", "focus", "disabled", ] as const;

const stateProps: Record<typeof states[number], ButtonProps> = {
    default: {},
    hover: { "data-hover": "", } as ButtonProps,
    active: { "data-active": "", } as ButtonProps,
    focus: { "data-focus-visible": "", } as ButtonProps,
    disabled: { disabled: true, },
};

const renderSample = (tone: typeof tones[number], state: typeof states[number], key: string) => (
    <Button key={key} tone={tone} {...stateProps[state]}>{tone}</Button>
);

const Matrix = () => (
    <div className={matrix}>
        {tones.map((tone) => (
            <div key={tone} className={matrixRow}>
                <span className={stateLabel}>{tone}</span>
                {states.map((state) => (
                    <div key={`${tone}-${state}`} className={cell}>
                        {renderSample(tone, state, `${tone}-${state}`)}
                        <span className={stateLabel}>{state}</span>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: { layout: "fullscreen", },
    argTypes: {
        tone: {
            control: { type: "select", },
            options: [ "primary", "secondary", "ghost", ],
        },
        size: {
            control: { type: "select", },
            options: [ "sm", "md", ],
        },
        prefixIcon: {
            control: { type: "select", },
            options: iconNames,
        },
        suffixIcon: {
            control: { type: "select", },
            options: iconNames,
        },
        children: {
            control: { type: "text", },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        children: "Button",
        tone: "primary",
        size: "md",
        prefixIcon: "check",
        suffixIcon: "arrow-right",
    },
    render: (args) => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button {...args} />
            </div>
        </ThemeShell>
    ),
};

export const AllTones: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                {tones.map((tone) => <Button key={tone} tone={tone}>{tone}</Button>)}
            </div>
        </ThemeShell>
    ),
};

export const Sizes: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button size="sm" prefixIcon="check">Small</Button>
                <Button size="md" prefixIcon="check">Medium</Button>
            </div>
        </ThemeShell>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <ThemeShell theme="light">
            <div className={row}>
                <Button tone="secondary" prefixIcon="check" suffixIcon="arrow-right">
                    Continue
                </Button>
            </div>
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole("button", { name: "Continue", });
        const icons = button.querySelectorAll(".icon");

        // Both slots render an icon, and the button keeps a single accessible
        // name from its label; the icons stay decorative.
        await expect(icons.length).toBe(2);
        for ( const icon of icons ) {
            await expect(icon).toHaveAttribute("aria-hidden", "true");
        }

        // Colour is inherited: the glyph paints with the button colour.
        await expect(getComputedStyle(icons[0] as Element).color).toBe(getComputedStyle(button).color);
    },
};

const RefProbe = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [ tag, setTag, ] = useState("pending");

    useEffect(() => {
        setTag(ref.current?.tagName ?? "none");
    }, []);

    return (
        <div className={row}>
            <Button ref={ref} prefixIcon="check">Ref</Button>
            <span data-testid="ref-tag">{tag}</span>
        </div>
    );
};

export const RefForwarding: Story = {
    render: () => (
        <ThemeShell theme="light">
            <RefProbe />
        </ThemeShell>
    ),
    play: async ({ canvasElement, }) => {
        const canvas = within(canvasElement);

        // The ref reaches the native button, not the wrapper.
        await expect(canvas.getByTestId("ref-tag")).toHaveTextContent("BUTTON");
    },
};

export const LightStateMatrix: Story = {
    render: () => (
        <ThemeShell theme="light">
            <Matrix />
        </ThemeShell>
    ),
};

export const DarkStateMatrix: Story = {
    render: () => (
        <ThemeShell theme="dark">
            <Matrix />
        </ThemeShell>
    ),
};
